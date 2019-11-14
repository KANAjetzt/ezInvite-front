<script>
  import { Router, Link, Route } from "svelte-routing";

  import { eventDataStore, todoStore } from "../stores.js";
  import { getLocalStorage } from "../utils/localStorageHandler.js";
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
</script>

<Router>
  <BtnShare />
  <Hero bgImage={eventData.heroImgPreview} />
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

</Router>
