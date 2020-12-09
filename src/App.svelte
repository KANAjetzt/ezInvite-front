<script>
  import { ApolloClient } from "apollo-client";
  import { InMemoryCache } from "apollo-cache-inmemory";
  import { createUploadLink } from "apollo-upload-client";
  import { setClient } from "svelte-apollo";
  import { Router, Link, Route } from "svelte-routing";

  import { appStore } from "./stores";
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
    navigator.language === "de"
      ? ($appStore.currentLanguage = "de")
      : ($appStore.currentLanguage = "en");
  };

  const filterCurrentLanguage = languagesArray => {
    return languagesArray.map(str => {
      if (!str) return;
      if ($appStore.currentLanguage === "en") {
        delete str.DE;
        str.str = str.EN;
        delete str.EN;
        return str;
      } else if ($appStore.currentLanguage === "de") {
        delete str.EN;
        str.str = str.DE;
        delete str.DE;
        return str;
      }
    });
  };

  const fetchLanguages = async () => {
    const response = await fetch("/languages.json");
    const data = await response.json();

    const filteredData = filterCurrentLanguage(data);

    $appStore.languages = filteredData;
  };

  setCurrentLanguage();
  fetchLanguages();
</script>

<style>
  .btnSettings {
    position: fixed;
    top: 2rem;
    z-index: 1000;
    filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.3));
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
