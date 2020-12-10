<script>
  import { getClient, mutate } from "svelte-apollo";
  import { gql } from "apollo-boost";
  import { onMount } from "svelte";

  import { appStore } from "../stores";
  import {
    getLocalStorage,
    saveLocalStorage,
    deleteLocalStorage
  } from "../utils/localStorageHandler";
  import getStr from "../utils/getLanguageStr.js";
  import SmileyIcon from "./Icons/Smiley.svelte";
  import NormalBtn from "./NormalBtn.svelte";

  const client = getClient();

  const CREATEFEEDBACK = gql`
    mutation($input: CreateFeedbackInput!) {
      createFeedback(input: $input) {
        feedback {
          id
          page
          date
        }
      }
    }
  `;

  onMount(() => {
    // update appStore
    $appStore.feedbackGiven = getLocalStorage("feedback");
  });

  const handleFeedback = async () => {
    // Save Feedback in DB
    try {
      const savedFeedback = await mutate(client, {
        mutation: CREATEFEEDBACK,
        variables: {
          input: { page: $appStore.currentPage, date: `${Date.now()}` }
        }
      });

      // Say thanks
      text = "thanks! :D";

      setTimeout(() => {
        // update appStore
        $appStore.feedbackGiven = true;

        // save Feedback given in Local Storage
        saveLocalStorage($appStore.feedbackGiven, "feedback");
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };
</script>

<style>
  .feedback {
    width: 100vw;
    margin: 0;
    margin-top: 10rem;
    background-color: var(--color-primary);
  }
</style>

{#if !$appStore.feedbackGiven}
  <div class="feedback">
    <NormalBtn
      text={$appStore.languages[0] ? getStr($appStore.languages, '166e58') : ''}
      type={'cta'}
      on:ctabtnclick={handleFeedback} />
  </div>
{/if}
