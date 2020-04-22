<script>
  import { onMount } from "svelte";
  import { gql } from "apollo-boost";
  import { getClient, mutate } from "svelte-apollo";
  import { slide } from "svelte/transition";

  import {
    appStore,
    eventDataStore,
    todoStore,
    sortedTodoStore
  } from "../stores";
  import { addMessage } from "../utils/errorHandler.js";
  import PersonImg from "./PersonImg.svelte";
  import PersonAddBtn from "./PersonAddBtn.svelte";
  import RemoveBtn from "./BtnRemove.svelte";
  import ToastMessage from "./ToastMessage.svelte";

  export let todo;
  console.log(todo);
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

    // --- check if currentUser didn't accapted the invite ---
    if (!$eventDataStore.currentUser.accepted) {
      // Show error message
      $appStore.messages = addMessage(
        $appStore.messages,
        "Error",
        `addPersonToTodo-${index}`,
        "Please accapted your invite to help with this thing."
      );

      // Show responder
      $appStore.showFullResponder = true;

      return;
    }

    // --- check if currentUser has no img ---
    if (!$eventDataStore.currentUser.photo) {
      $appStore.messages = addMessage(
        $appStore.messages,
        "Error",
        `addPersonToTodoImg-${index}`,
        "Please add an image to help with this thing.",
        6
      );
      $appStore.showAddPersonProfile = true;
      return;
    }

    // --- update todoStore ---
    const todo = $sortedTodoStore[e.detail.index];
    const unsortedTodoIndex = $todoStore.findIndex(
      unsortedTodo => unsortedTodo.id === todo.id
    );

    // If no unknown persons left
    if (todo.requiredPersons <= 0) {
      // just add current user to todo users
      $todoStore[unsortedTodoIndex].users = [
        ...$todoStore[unsortedTodoIndex].users,
        $eventDataStore.currentUser
      ];
    } else {
      // Else replace unknown person with current user
      const unknownPersonIndex = $todoStore[unsortedTodoIndex].users.findIndex(
        user => user.name === "unknown person"
      );

      $todoStore[unsortedTodoIndex].users[unknownPersonIndex] =
        $eventDataStore.currentUser;
    }

    // update requiredPersons count
    $todoStore[unsortedTodoIndex].requiredPersons -= 1;

    // --- update todo in DB ---
    await mutate(client, {
      mutation: ADDUSERTOTODO,
      variables: {
        input: { id: todo.id, user: $eventDataStore.currentUser.id }
      }
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

  // --- Handles the counter that is shown
  //     if not all requiredPersons can fit as img ---
  const handleCounter = todo => {
    console.log(todo);
    const counter = todo.requiredPersons;
    console.log(todo.users.filter(user => user.name !== "unknown person"));
    const aktivPersons = todo.users.filter(
      user => user.name !== "unknown person"
    ).length;

    // if no aktiv person and requiredPersons === 5 --> counter 0
    if (!aktivPersons && counter === 5) {
      return counter - 5;
    }

    // if 5 aktiv persons
    if (todo.users.length === 5) {
      return null;
    }

    // if no aktiv person counter -4
    if (!aktivPersons) {
      return counter - 4;
    }

    // if aktiv persons <= 4 --> 4 - aktiv persons
    if (aktivPersons <= 4) {
      console.log("I'm aktive now!");
      return counter - (4 - aktivPersons);
    }
    if (counter <= 0) {
      return aktivPersons - 4;
    }
    // if aktiv persons > 4 --> requiredPersons
    return counter;
  };
</script>

<style>
  .todo:first-child {
    margin-top: 2rem;
  }
  .personImgs {
    display: flex;
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

  .messagebox {
    width: 100%;
  }
</style>

<div class="personImgs">
  <PersonAddBtn
    photo={$eventDataStore.currentUser && $eventDataStore.currentUser.photo !== 'default.jpg' ? $eventDataStore.currentUser.photo : undefined}
    name={$eventDataStore.currentUser ? $eventDataStore.currentUser.name : undefined}
    imgStyle={'addPersonThing'}
    on:personaddbtnclick={handlePersonAddBtn}
    {index} />

  <!-- PersonImgs -->
  {#each todo.users as { photo, name }, i}
    {#if i <= 4}
      <!-- If the img is not the last one -->
      {#if i === 4}
        <PersonImg
          photo={todo.requiredPersons <= 0 ? todo.users[4].photo : undefined}
          imgStyle={todo.users.length > 5 ? 'addPersonThing' : ''}
          {name}
          count={handleCounter(todo)} />
      {:else}
        <PersonImg {photo} {name} />
      {/if}
      <!-- If the img is the last one -->
    {/if}
  {/each}
</div>

<!-- Thing / Todo text -->
<p class="text">{todo.text}</p>

<!-- Remove Btn on edit / add page -->
{#if $appStore.currentPage === 'editEvent' || $appStore.currentPage === 'addEvent'}
  <RemoveBtn
    width={20}
    height={20}
    marginLeft={-1}
    marginTop={-2.2}
    on:removebtnclick={handleTodoRemove} />
{/if}
