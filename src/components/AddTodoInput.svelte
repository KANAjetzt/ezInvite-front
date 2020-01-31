<script>
  import { gql } from "apollo-boost";
  import { getClient, mutate } from "svelte-apollo";

  import { appStore, eventDataStore, todoStore } from "../stores";
  import { removeMessage, addMessage } from "../utils/errorHandler.js";
  import PersonAddBtn from "./PersonAddBtn.svelte";
  import PersonCountIcon from "./Icons/AddPerson.svelte";
  import Message from "./Message.svelte";

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

  const generateErrorMessage = (text, requiredPersons) => {
    if (!text || !requiredPersons) {
      $appStore.messages = addMessage(
        $appStore.messages,
        "Error",
        "inputAddTodo",
        "Please provide text and person count."
      );
      return;
    } else {
      $appStore.messages = removeMessage($appStore.messages, "inputAddTodo");
    }
  };

  const handleAddEvnetPage = () => {};

  const handlePreviewPage = () => {
    $appStore.messages = addMessage(
      $appStore.messages,
      "Error",
      "inputAddTodo",
      "You can add / edit things later on the edit page."
    );
    return;
  };

  const handleEventPage = () => {};

  const handleEditPage = () => {};

  const handlePersonAddBtnClick = async e => {
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

    // e.detail.originalEvent.preventDefault();

    // --- ERROR HANDLING ---

    // --- If we are on the addEvent or editEvent page ---
    if (
      $appStore.currentPage === "addEvent" ||
      $appStore.currentPage === "editEvent"
    ) {
      // Update todoStore with new thing
      todoStore.update(current => {
        let newTodos = [...current];
        newTodos = [
          ...newTodos,
          {
            text: text,
            requiredPersons: requiredPersons
          }
        ];
        return newTodos;
      });
    }

    // --- If we are on the edit event page and
    //     if there is allready a todo widget ---
    if (
      $appStore.currentPage === "editEvent" &&
      $eventDataStore.widgets.findIndex(widget => widget.type === "todo") !== -1
    ) {
      // save new todo to DB
      const newTodo = await mutate(client, {
        mutation: CREATETODO,
        variables: {
          input: {
            widget:
              $eventDataStore.widgets[
                $eventDataStore.widgets.findIndex(
                  widget => widget.type === "todo"
                )
              ].id,
            text,
            requiredPersons
          }
        }
      });

      // add ID to thing in todoStore
      $todoStore[$todoStore.length - 1].id = newTodo.data.createTodo.todo.id;
    }

    // --- If we are on the event page ---
    if ($appStore.currentPage === "event") {
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
        console.log("TODO: Add Mesageboard to show Error / Warings / Infos");
        console.log("accapted your invite to help with this thing!");

        // Show responder
        $appStore.showFullResponder = !$appStore.showFullResponder;

        return;
      }

      // Add thing to Store
      todoStore.update(current => {
        let newTodos = [...current];
        newTodos = [
          ...newTodos,
          {
            text: text,
            requiredPersons: requiredPersons,
            users: [$eventDataStore.currentUser]
          }
        ];
        return newTodos;
      });

      // Save new thing to DB

      // query user id
      const user = await client.query({
        query: QUERYUSERBYLINK,
        variables: { link: $eventDataStore.currentUser.link }
      });

      const input = {
        widget:
          $eventDataStore.widgets[
            $eventDataStore.widgets.findIndex(widget => widget.type === "todo")
          ].id,
        text,
        requiredPersons,
        users: [user.data.userByLink.id]
      };

      const newTodo = await mutate(client, {
        mutation: CREATETODO,
        variables: { input }
      });

      // update todoStore with todo id
      $todoStore[$todoStore.length - 1] = {
        ...$todoStore[$todoStore.length - 1],
        id: newTodo.data.createTodo.todo.id
      };
      $todoStore = $todoStore;
      console.log($todoStore);
    }

    // Reset input fields

    const textInput = document.getElementById("thingText");
    const personCountInput = document.getElementById("personCount");

    text = null;
    textInput.value = null;
    requiredPersons = null;
    personCountInput.value = null;
  };
</script>

<style>
  .inputWrapper {
    display: flex;
    align-items: center;
    margin: 5rem 0 2rem 0;
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
    iconStyle="z-index: 20; opacity: 0.8; transform: translateX(-0.6rem);
    grid-column: 1 / 2; grid-row: 1 / 2;" />
  <input
    required
    id="thingText"
    class="inputBox"
    type="text"
    placeholder="Add something.."
    bind:value={text}
    on:keydown={e => {
      if (e.keyCode === 13) handlePersonAddBtnClick();
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
    placeholder="1"
    name="personCount"
    bind:value={requiredPersons}
    on:keydown={e => {
      if (e.keyCode === 13) handlePersonAddBtnClick();
    }} />
</div>

{#if errorMessages.filter(message => message.location === 'inputAddTodo')[0]}
  <Message
    messageBoxStyle={'todoInput'}
    messages={errorMessages.filter(message => message.location === 'inputAddTodo')} />
{/if}
