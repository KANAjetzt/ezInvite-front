<script>
  import { onMount } from "svelte";
  import { gql } from "apollo-boost";
  import { getClient, mutate } from "svelte-apollo";

  import { appStore, eventDataStore, todoStore } from "../stores";
  import PersonImg from "./PersonImg.svelte";
  import PersonAddBtn from "./PersonAddBtn.svelte";
  import RemoveBtn from "./BtnRemove.svelte";

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
    console.log("--- handling PersonAddBtn ---");
    // --- Check if currentUser doesn't exists ---
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

    // check if requiredPersons count is met
    if (todo.partacerCount >= todo.requiredPersons) {
      console.log("TODO: Visualize that this todo is done");
      return;
    }

    // add currentUser to the thing
    // add user in todoStore
    todoStore.update(currentData => {
      const newData = [...currentData];
      if (
        newData[e.detail.index].users.findIndex(
          user => user.name === "unkown user"
        ) !== -1
      ) {
        newData[e.detail.index].users[
          newData[e.detail.index].users.findIndex(
            user => user.name === "unkown user"
          )
        ] = $eventDataStore.currentUser;
      }

      newData[e.detail.index].users = [
        ...newData[e.detail.index].users,
        $eventDataStore.currentUser
      ];

      return newData;
    });

    // query user id
    const user = await client.query({
      query: QUERYUSERBYLINK,
      variables: { link: $eventDataStore.currentUser.link }
    });
    // save user to thing in DB
    const input = { id: todo.id, user: user.todo.userByLink.id };
    const newTodo = await mutate(client, {
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

  console.log(todo);
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
    photo={$eventDataStore.currentUser && $eventDataStore.currentUser.photo ? $eventDataStore.currentUser.photo : undefined}
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

<!-- Remove Btn on edit / add page -->
{#if $appStore.currentPage === 'editEvent' || 'addEvent'}
  <RemoveBtn
    width={20}
    height={20}
    marginLeft={1}
    marginTop={-2.2}
    on:removebtnclick={handleTodoRemove} />
{/if}
