<script>
  import { getClient, mutate } from "svelte-apollo";
  import { gql } from "apollo-boost";

  import getStr from "../utils/getLanguageStr.js";
  import { appStore, eventDataStore } from "../stores";
  import DescriptionBox from "./DescriptionBox.svelte";
  import BtnMinified from "./BtnMinified.svelte";
  import BtnRespond from "./BtnRespond.svelte";

  export let showFullResponder = true;

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
    // --- Check if currentUser doesn't exists ---
    if (!$eventDataStore.currentUser) {
      // Set currentUser.unknown true
      // This is required to handle the AddPersonProfile DoneBtn
      $eventDataStore.currentUser = {};
      $eventDataStore.currentUser.unknown = true;
    }

    // --- Check if currentUser.name doesn't exists or default img is set ---
    if (
      !$eventDataStore.currentUser ||
      !$eventDataStore.currentUser.name ||
      $eventDataStore.currentUser.photo === null
    ) {
      // render AddUserProfile Component / Overlay
      $appStore.showAddPersonProfile = !$appStore.showAddPersonProfile;

      // Set currentUser accepted state to false ore true
      $eventDataStore.currentUser.accepted = e.detail.accepted;
      return;
    }

    // Set currentUser accepted state to false ore true
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

    // close Respond section
    $appStore.showFullResponder = !$appStore.showFullResponder;
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
    max-width: 47rem;
  }

  .respond--min {
    grid-template-columns: 22%;
    pointer-events: none;
  }

  .descriptionBox {
    grid-row: 1 / 2;
    grid-column: 1 / 3;
  }
</style>

<div class={$appStore.showFullResponder ? 'respond' : 'respond respond--min'}>
  {#if !$appStore.showFullResponder}
    <BtnMinified
      on:minifiedbtnclick={() => {
        $appStore.showFullResponder = !$appStore.showFullResponder;
      }} />
  {:else}
    <div class="descriptionBox">
      <DescriptionBox
        title={$appStore.languages[0] ? getStr($appStore.languages, 'bc97fe') : ''} />
    </div>
    <BtnRespond
      on:confirmbtnclick={handleRespons}
      on:declinebtnclick={handleRespons}
      on:minifibtnclick={() => {
        $appStore.showFullResponder = !$appStore.showFullResponder;
      }} />
  {/if}
</div>
