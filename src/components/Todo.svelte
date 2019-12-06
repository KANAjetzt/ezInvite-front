<script>
  import { onMount } from "svelte";
  import { gql } from "apollo-boost";
  import { getClient, mutate } from "svelte-apollo";

  import { appStore, eventDataStore } from "../stores";
  import PersonImg from "./PersonImg.svelte";
  import PersonAddBtn from "./PersonAddBtn.svelte";

  export let data;

  let shortenPersonImgs = false;

  const client = getClient();

  onMount(() => {
    if (data.requiredPersons > 5) shortenPersonImgs = true;
  });

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

  const handlePersonAddBtn = async () => {
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
    if (data.users.length >= data.requiredPersons) {
      console.log("TODO: Visualize that this todo is done");
      return;
    }

    // add currentUser to the thing
    // query user id
    const user = await client.query({
      query: QUERYUSERBYLINK,
      variables: { link: $eventDataStore.currentUser.link }
    });
    // add user to thing
    const input = { id: data.id, user: user.data.userByLink.id };
    const newTodo = await mutate(client, {
      mutation: ADDUSERTOTODO,
      variables: { input }
    });
  };
</script>

<style>
  .todo {
    display: flex;
    align-items: center;
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
  <!-- PersonAddBtn - when the current viewing person is not partaking on this todo -->
  {#if data.users.length < data.requiredPersons}
    <PersonAddBtn on:personaddbtnclick={handlePersonAddBtn} />
  {/if}
  {#each data.users as { photo, name }, i}
    {#if i < 4}
      <PersonImg {photo} {name} />
    {/if}
  {/each}
  {#if shortenPersonImgs}
    <PersonImg count={data.requiredPersons - 4} />
  {/if}
  <p class="text">{data.text}</p>
</li>
