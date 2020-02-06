<script>
  import { onMount } from "svelte";
  import { gql } from "apollo-boost";
  import { getClient, mutate } from "svelte-apollo";

  import { appStore, eventDataStore, todoStore } from "../stores";
  import { removeMessage, addMessage } from "../utils/errorHandler.js";
  import PersonImg from "./PersonImg.svelte";
  import PersonAddBtn from "./PersonAddBtn.svelte";
  import RemoveBtn from "./BtnRemove.svelte";
  import Message from "../components/Message.svelte";

  export let todo;
  export let index;

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

  const ADDUSERTOTODO = gql`
    mutation($input: AddUserToTodoInput!) {
      addUserToTodo(input: $input) {
        todo {
          requiredPersons
          text
          users {
            name
          }
        }
      }
    }
  `;

  const DELETETODO = gql`
    mutation($input: DeleteTodoInput!) {
      deleteTodo(input: $input) {
        success
      }
    }
  `;

  const handlePersonAddBtn = async e => {
    // --- Check if currentUser doesn't exists ---
    if (!$eventDataStore.currentUser) {
      // Set currentUser.unknown true
      // This is required to handle the AddPersonProfile DoneBtn
      $eventDataStore.currentUser = {};
      $eventDataStore.currentUser.unknown = true;
    }

    // check if currentUser didn't accapted the invite
    if (!$eventDataStore.currentUser.accepted) {
      // Show error message
      $appStore.messages = addMessage(
        $appStore.messages,
        "Error",
        `addPersonToTodo-${index}`,
        "Pleas accapted your invite to help with this thing."
      );

      console.log($appStore);

      // Show responder
      $appStore.showFullResponder = true;

      return;
    } else {
      $appStore.messages = removeMessage($appStore.messages, "inputEventName");
    }

    // add user in todoStore
    const todo = $todoStore[index];
    console.log(todo);

    // save user to todo in DB
    const input = { id: todo.id, user: $eventDataStore.currentUser.id };
    await mutate(client, {
      mutation: ADDUSERTOTODO,
      variables: { input }
    });
  };

  const handleTodoRemove = async () => {
    // Delete thing from todo store
    todoStore.update(currentValue => {
      let newValue = [...currentValue];
      newValue.splice(index, 1);
      return newValue;
    });

    if ($appStore.currentPage !== "addEvent") {
      // delete Todo in DB
      const deleteTodo = await mutate(client, {
        mutation: DELETETODO,
        variables: { input: { id: todo.id } }
      });
    }
  };
</script>

<style>
  .todo {
    display: flex;
    align-items: center;
  }

  .todo:first-child {
    margin-top: 2rem;
  }
  .text {
    background-color: var(--color-primary-light);
    padding: 0.5rem 1.5rem;
    margin-left: -1rem;
    border-radius: 2px;
    font-family: var(--font-primary);
    font-weight: 700;
    font-size: 1.6rem;
    color: var(--color-text-primary);
  }
</style>

<li class="todo">
  <PersonAddBtn
    photo={$eventDataStore.currentUser && $eventDataStore.currentUser.photo !== 'default.jpg' ? $eventDataStore.currentUser.photo : undefined}
    name={$eventDataStore.currentUser ? $eventDataStore.currentUser.name : undefined}
    imgStyle={'addPersonThing'}
    on:personaddbtnclick={handlePersonAddBtn}
    {index} />

  <!-- PersonImgs -->
  {#each todo.users as { photo, name }, i}
    <!-- If more then 5 people are required, render 4 imgs, else render 5 -->
    {#if i < (todo.requiredPersons > 5 ? 4 : 5)}
      <PersonImg {photo} {name} />
    {/if}
    <!-- If more then 5 people are required, render last img with counter -->
    {#if todo.requiredPersons > 5 && i === 4}
      <PersonImg {photo} {name} count={todo.requiredPersons - 4} />
    {/if}
  {/each}

  <!-- Thing / Todo text -->
  <p class="text">{todo.text}</p>

</li>

<!-- Error Message -->
{#if $appStore.messages.filter(message => message.location === `addPersonToTodo-${index}`)[0]}
  <Message location={`addPersonToTodo-${index}`} />
{/if}

<!-- Remove Btn on edit / add page -->
{#if $appStore.currentPage === 'editEvent' || $appStore.currentPage === 'addEvent'}
  <RemoveBtn
    width={20}
    height={20}
    marginLeft={1}
    marginTop={-2.2}
    on:removebtnclick={handleTodoRemove} />
{/if}
