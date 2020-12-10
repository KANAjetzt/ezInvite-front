<script>
  import { ApolloClient } from "apollo-client";
  import { InMemoryCache } from "apollo-cache-inmemory";
  import { createUploadLink } from "apollo-upload-client";
  import { setClient } from "svelte-apollo";
  import { Router, Link, Route } from "svelte-routing";

  import { appStore } from "./stores";
  import {
    saveLocalStorage,
    getLocalStorage
  } from "./utils/localStorageHandler.js";
  import getLangauge from "./utils/getLanguage.js";
  import EventPreview from "./routes/EventPreview.svelte";
  import Event from "./routes/Event.svelte";
  import AddEvent from "./routes/AddEvent.svelte";
  import EditEvent from "./routes/EditEvent.svelte";
  import Share from "./routes/Share.svelte";
  import NotFound from "./routes/404.svelte";
  import TostMessage from "./components/ToastMessage.svelte";
  import Feedback from "./components/Feedback.svelte";
  import Settings from "./components/Settings.svelte";
  import BtnSettings from "./components/BtnSettings.svelte";

  // Used for SSR. A falsy value is ignored by the Router.
  export let url = "";

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createUploadLink({
      uri: svelteEnv.APIUrl
    })
  });

  setClient(client);

  const setCurrentLanguage = () => {
    // check LS for language settings
    const lsAppStore = getLocalStorage("appStore");
    if (lsAppStore && lsAppStore.currentLanguage) {
      $appStore.currentLanguage = lsAppStore.currentLanguage;
    } else {
      navigator.language === "de"
        ? ($appStore.currentLanguage = "de")
        : ($appStore.currentLanguage = "en");
    }
  };

  const setLanguage = async () => {
    $appStore.languages = await getLangauge($appStore.currentLanguage);
  };

  setCurrentLanguage();
  setLanguage();
</script>

<style>
  .btnSettings {
    position: fixed;
    top: 2rem;
    width: 7.5rem;
    height: 10rem;
    z-index: 1000;
    filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.3));
  }

  :global(.btnSettings--scaleDown) {
    animation: scaleDown 2s ease-out 3s;
    animation-fill-mode: forwards;
  }

  @keyframes scaleDown {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(-5rem);
    }
  }
</style>

{#if $appStore.messages[0]}
  {#each $appStore.messages as message}
    {#if message.toast}
      <TostMessage {message} />
    {/if}
  {/each}
{/if}
<Router {url}>
  <Route path="/" component={AddEvent} />
  <Route path="/edit/*eventSlug/*eventEditLink" component={EditEvent} />
  <Route path="/*eventSlug/*eventLink/*userLink" component={Event} />
  <Route path="eventPreview" component={EventPreview} />
  <Route path="share" component={Share} />
  <Route path="/notFound" component={NotFound} />
</Router>

<div class="btnSettings">
  <BtnSettings />
</div>
<Feedback />
