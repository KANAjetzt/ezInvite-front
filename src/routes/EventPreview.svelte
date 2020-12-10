<script>
  import { navigate } from "svelte-routing";
  import { fly } from "svelte/transition";
  import { eventDataStore, todoStore, appStore } from "../stores.js";
  import {
    getLocalStorage,
    deleteLocalStorage
  } from "../utils/localStorageHandler.js";
  import Head from "../components/Head.svelte";
  import PageTransition from "../components/PageTransition.svelte";
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

<Head
  title={eventData.name ? `Corrogo - Preview ${eventData.name}` : `Corrogo - Preview`} />

<PageTransition>

  <BtnShare on:sharebtnclick={handleShareBtn} />
  <section class="hero" transition:fly|local={{ duration: 250, y: -100 }}>
    <Hero bgImage={eventData.heroImgPreview} />
  </section>
  <QuickFacts />
  {#if eventData.description}
    <Description />
  {/if}
  {#if eventData.imgs}
    <ImageStripe />
  {/if}
  {#if eventData.location && eventData.location.coordinates && eventData.location.coordinates[0]}
    <Map />
  {/if}
  {#if todos.length}
    <Widget />
  {/if}

  <Answers />

</PageTransition>
