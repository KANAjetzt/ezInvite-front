<script>
  import { gql } from "apollo-boost";
  import { getClient, mutate } from "svelte-apollo";

  import { appStore, eventDataStore, todoStore } from "../stores";
  import { addMessage } from "../utils/messageHandler.js";
  import PersonAddBtn from "./PersonAddBtn.svelte";
  import PersonCountIcon from "./Icons/AddPerson.svelte";

  let text;
  let requiredPersons;
  let errorMessages;

  appStore.subscribe(newData => {
    errorMessages = newData.messages;
  });

  const client = getClient();

  const QUERYUSERBYLINK = gql`
    query($link: String!) {
      userByLink(link: $link) {
        id
        name
        photo
      }
    }
  `;

  const CREATETODO = gql`
    mutation($input: CreateTodoInput!) {
      createTodo(input: $input) {
        todo {
          id
          requiredPersons
          text
          users {
            name
          }
        }
      }
    }
  `;

  const addToTodoStore = (text, requiredPersons) => {
    $todoStore = [
      ...$todoStore,
      {
        text,
        requiredPersons
      }
    ];
    $todoStore = $todoStore;
  };

  const updateTodoStore = (index, key, value) => {
    $todoStore[index][key] = value;
  };

  const saveToDB = async (text, requiredPersons, userId) => {
    // prepare input object
    const input = {
      widget:
        $eventDataStore.widgets[
          $eventDataStore.widgets.findIndex(widget => widget.type === "todo")
        ].id,
      text,
      requiredPersons
    };

    if (userId) {
      input.users = [userId];
    }

    // save new todo to DB
    return await mutate(client, {
      mutation: CREATETODO,
      variables: { input }
    });
  };

  // ########################################
  // #########--- ADD EVENT PAGE ---#########
  // ########################################

  const handleAddEvnetPage = () => {
    // 1) Add thing to store
    addToTodoStore(text, requiredPersons);
  };

  // ######################################
  // #########--- PREVIEW PAGE ---#########
  // ######################################

  const handlePreviewPage = () => {
    // 1) Show Error Message
    $appStore.messages = addMessage(
      $appStore.messages,
      "Error",
      "inputAddTodo",
      "You can add / edit things later on the edit page."
    );
    return;
  };

  // ####################################
  // #########--- EVENT PAGE ---#########
  // ####################################

  const handleEventPage = async () => {
    // Check if currentUser doesn't exists
    if (!$eventDataStore.currentUser) {
      // Set currentUser.unknown true
      // This is required to handle the AddPersonProfile DoneBtn
      $eventDataStore.currentUser = {};
      $eventDataStore.currentUser.unknown = true;
    }

    // check if currentUser enterd a name already
    if (!$eventDataStore.currentUser.name) {
      // Render AddPersonProfile
      $appStore.showAddPersonProfile = !$appStore.showAddPersonProfile;
      return;
    }

    // check if currentUser didn't accapted the invite
    if (!$eventDataStore.currentUser.accepted) {
      // Show responder
      $appStore.showFullResponder = !$appStore.showFullResponder;

      return;
    }

    // Add thing to Store
    addToTodoStore(text, requiredPersons);

    // Save new thing to DB
    const newTodo = await saveToDB(
      text,
      requiredPersons
      // $eventDataStore.currentUser.id
    );

    // add ID to thing in todoStore
    updateTodoStore(
      $todoStore.length - 1,
      "id",
      newTodo.data.createTodo.todo.id
    );
  };

  //##########################################
  // #########--- EDIT EVENT PAGE ---#########
  //##########################################

  const handleEditPage = async () => {
    addToTodoStore(text, requiredPersons);

    if (
      $eventDataStore.widgets.findIndex(widget => widget.type === "todo") !== -1
    ) {
      // Save new thing to DB
      const newTodo = await saveToDB(text, requiredPersons);

      // add ID to thing in todoStore
      updateTodoStore(
        $todoStore.length - 1,
        "id",
        newTodo.data.createTodo.todo.id
      );
    }
  };

  const handlePersonAddBtnClick = async e => {
    e.preventDefault();

    // Error if no text or requiredPerson count
    if (!text || !requiredPersons) {
      $appStore.messages = addMessage(
        $appStore.messages,
        "Error",
        "inputAddTodo",
        "Please provide text and person count."
      );
      return;
    }

    // Error if requiredPerson count is over 1000
    if (requiredPersons > 1000) {
      $appStore.messages = addMessage(
        $appStore.messages,
        "Error",
        "inputAddTodo",
        "Sorry max. person count is 1000."
      );
      return;
    }

    // decide on witch page we are
    switch ($appStore.currentPage) {
      case "addEvent":
        handleAddEvnetPage();
        break;
      case "eventPreview":
        handlePreviewPage();
        break;
      case "event":
        handleEventPage();
        break;
      case "editEvent":
        handleEditPage();
        break;
      default:
        console.log("wait what?");
    }

    // Reset input fields
    const textInput = document.getElementById("thingText");
    const personCountInput = document.getElementById("personCount");

    text = null;
    textInput.value = null;
    requiredPersons = null;
    personCountInput.value = null;
    textInput.focus();
  };
</script>

<style>
  .inputWrapper {
    display: flex;
    align-items: center;
    margin: 5rem 0 2rem 0;
    padding: 0 1.5rem;
  }

  .inputBox {
    display: inline;
    width: 100%;
    padding: 0.5rem 1.5rem;
    margin: 0;
    margin-left: -1rem;
    margin-right: -1rem;
    border: none;
    border-radius: 2px;
    font-family: var(--font-primary);
    font-weight: 300;
    font-size: 1.6rem;
    color: var(--color-text-primary);
    background-color: var(--color-primary-light);
  }

  .inputBox::placeholder {
    color: var(--color-text-primary);
    opacity: 0.5;
  }
  .inputPersonCount {
    display: inline-block;
    width: 16%;
    margin-left: -1rem;
    padding-left: 2rem;
    font-family: var(--font-primary);
    font-weight: 300;
    font-size: 1.8rem;
    color: var(--color-text-primary);
    background-color: var(--color-primary-light);
    border: none;
    transition: all 0.05s ease-in-out;
  }

  .inputPersonCount::placeholder {
    color: var(--color-text-primary);
    opacity: 0.5;
  }
</style>

<div class="inputWrapper">
  <PersonAddBtn
    on:personaddbtnclick={handlePersonAddBtnClick}
    iconStyle="z-index: 250; opacity: 0.8; transform: translateX(-0.6rem);
    grid-column: 1 / 2; grid-row: 1 / 2;" />
  <input
    required
    id="thingText"
    class="inputBox"
    type="text"
    placeholder="Add something.."
    bind:value={text}
    on:keydown={e => {
      if (e.keyCode === 13) handlePersonAddBtnClick(e);
    }} />
  <label for="personCount">
    <PersonCountIcon
      width={25}
      height={25}
      fill={'#f9fafb'}
      bg={true}
      border={true} />
  </label>
  <input
    required
    class="inputPersonCount"
    id="personCount"
    type="number"
    min="1"
    max="1000"
    placeholder="1"
    name="personCount"
    bind:value={requiredPersons}
    on:keydown={e => {
      if (e.keyCode === 13) handlePersonAddBtnClick(e);
    }} />
</div>
