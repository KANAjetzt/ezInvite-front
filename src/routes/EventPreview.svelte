<script>
  import { Router, Link, Route } from "svelte-routing";

  import { eventDataStore } from "../stores.js";
  import Hero from "../components/Hero.svelte";
  import QuickFacts from "../components/QuickFacts.svelte";
  import Description from "../components/Description.svelte";
  import ImageStripe from "../components/ImageStripe.svelte";
  import Map from "../components/Map.svelte";
  import Widget from "../components/Widget.svelte";
  import Answers from "../components/Answers.svelte";

  let eventData;
  let todos;

  eventDataStore.subscribe(newData => {
    console.log(newData);
    eventData = newData;
  });
</script>

<Router>
  {#await eventData}
    <p>loading</p>
  {:then event}
    <Hero bgImage={event.heroImgPreview} />
    <QuickFacts />
    {#if event.description}
      <Description />
    {/if}
    {#if event.imgs}
      <ImageStripe />
    {/if}
    {#if event.location && event.location.coordinates[0]}
      <Map />
    {/if}
    {#if event.widgets && event.widgets[0]}
      <Widget />
    {/if}

    <Answers />

  {/await}
</Router>
