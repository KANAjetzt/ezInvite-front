<script>
  import { getClient } from "svelte-apollo";
  import { gql } from "apollo-boost";
  import { Router, Link, Route } from "svelte-routing";

  import { eventDataStore, getEventData } from "../stores.js";
  import Hero from "../components/Hero.svelte";
  import QuickFacts from "../components/QuickFacts.svelte";
  import Description from "../components/Description.svelte";
  import ImageStripe from "../components/ImageStripe.svelte";
  import Map from "../components/Map.svelte";
  import Widget from "../components/Widget.svelte";
  import Answers from "../components/Answers.svelte";

  let eventData;

  const GETEVENT = gql`
    query($id: ID!) {
      event(id: $id) {
        name
        startDate
        startTime
        endTime
        description
        imgs
        location {
          name
          coordinates
        }
        users {
          name
          photo
          accepted
        }
        widgets {
          id
        }
      }
    }
  `;

  const client = getClient();

  export const queryEventData = async () => {
    console.log("querying event data");

    //! I need to get the id from somewhere when the event is not just created (URL params?!)
    const id = "5dba882e576cb85f4c3ea3d1";

    // Query  for event with specific id
    const data = await client.query({ query: GETEVENT, variables: { id } });

    // Update Event Data Store with queryed event Data
    eventDataStore.set(data.data.event);
    eventData = data.data.event;
  };

  //TODO: Check if if something is in store otherwise query event id
  eventData = getEventData();
  // eventData = queryEventData();
</script>

<Router>
  {#await eventData}
    <p>loading</p>
  {:then event}
    <Hero />
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
    {#if eventData.widgets && eventData.widgets[0]}
      <Widget />
    {/if}
    {#if eventData.users && eventData.users[0]}
      <Answers />
    {/if}
  {/await}
</Router>
