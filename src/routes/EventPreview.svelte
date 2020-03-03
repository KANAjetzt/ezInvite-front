<script>
  import { Router, navigate } from "svelte-routing";

  import { eventDataStore, todoStore, appStore } from "../stores.js";
  import {
    getLocalStorage,
    deleteLocalStorage
  } from "../utils/localStorageHandler.js";
  import { send, receive } from "../utils/crossfade.js";
  import BtnShare from "../components/BtnShare.svelte";
  import Hero from "../components/Hero.svelte";
  import QuickFacts from "../components/QuickFacts.svelte";
  import Description from "../components/Description.svelte";
  import ImageStripe from "../components/ImageStripe.svelte";
  import Map from "../components/Map.svelte";
  import Widget from "../components/Widget.svelte";
  import Answers from "../components/Answers.svelte";

  if (Object.keys($eventDataStore).length === 0) {
    eventDataStore.set(getLocalStorage("eventData"));
  }
  if ($todoStore.length === 0) {
    todoStore.set(getLocalStorage("todos"));
  }

  let eventData = $eventDataStore;
  let todos = $todoStore;

  $appStore.currentPage = "eventPreview";

  const handleShareBtn = () => {
    // delete users from local storage
    deleteLocalStorage("users");

    navigate("/share");
  };
</script>

<Router>
  <main out:send={{ key: 'main' }} in:receive={{ key: 'main' }}>

    <BtnShare on:sharebtnclick={handleShareBtn} />
    <section
      class="hero"
      out:send={{ key: 'hero' }}
      in:receive={{ key: 'hero' }}>
      <Hero bgImage={eventData.heroImgPreview} />
    </section>
    <QuickFacts />
    {#if eventData.description}
      <Description />
    {/if}
    {#if eventData.imgs}
      <ImageStripe />
    {/if}
    {#if eventData.location && eventData.location.coordinates[0]}
      <Map />
    {/if}
    {#if todos.length}
      <Widget />
    {/if}

    <Answers />

  </main>
</Router>
