<script>
  import { getClient, mutate } from "svelte-apollo";
  import { gql } from "apollo-boost";

  import { eventDataStore } from "../stores";
  import DescriptionBox from "./DescriptionBox.svelte";
  import BtnMinified from "./BtnMinified.svelte";
  import BtnRespond from "./BtnRespond.svelte";

  export let showAddPersonProfile = false;

  const handleVisibility = () => {
    // ! can't access $eventDataStore right here right now !
    console.log($eventDataStore);
    return $eventDataStore.currentUser &&
      $eventDataStore.currentUser.accepted === null
      ? true
      : false;
  };

  let visible = handleVisibility();

  const TOGGLEUSERACCEPTED = gql`
    mutation($input: ToggleUserAcceptedInput!) {
      toggleUserAccepted(input: $input) {
        user {
          id
          name
          accepted
          events
        }
      }
    }
  `;

  const client = getClient();

  const handleRespons = async e => {
    // Check if currentUser exists
    console.log($eventDataStore);
    if (
      !$eventDataStore.currentUser ||
      $eventDataStore.currentUser.photo === "default.jpg"
    ) {
      // If not render AddUserProfile Component
      showAddPersonProfile = !showAddPersonProfile;
      return;
    }

    // If so set currentUser accepted state to false ore true

    // Assamble input object
    const input = {
      link: $eventDataStore.currentUser.link,
      accepted: e.detail.accepted
    };

    // send to backend
    await mutate(client, {
      mutation: TOGGLEUSERACCEPTED,
      variables: { input }
    });

    // update eventDataStore
    $eventDataStore.currentUser.accepted = e.detail.accepted;

    // close Respond slection
    visible = !visible;
  };
</script>

<style>
  .respond {
    position: fixed;
    bottom: 10rem;
    z-index: 200;
    display: grid;
    grid-template-rows: min-content 1fr min-content;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100vw;
  }

  .descriptionBox {
    grid-row: 1 / 2;
    grid-column: 1 / 3;
  }
</style>

<div class="respond">
  {#if !visible}
    <BtnMinified
      on:minifiedbtnclick={() => {
        visible = !visible;
      }} />
  {:else}
    <div class="descriptionBox">
      <DescriptionBox title={'Respond to your invite'} />
    </div>
    <BtnRespond
      on:confirmbtnclick={handleRespons}
      on:declinebtnclick={handleRespons}
      on:minifibtnclick={() => {
        visible = !visible;
      }} />
  {/if}
</div>
