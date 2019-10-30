<script>
  import { getClient } from "svelte-apollo";
  import { gql } from "apollo-boost";
  import { Router, Link, Route } from "svelte-routing";

  import { getEventData } from "../stores.js";
  import Hero from "../components/Hero.svelte";
  import QuickFacts from "../components/QuickFacts.svelte";
  import Description from "../components/Description.svelte";
  import ImageStripe from "../components/ImageStripe.svelte";
  import Map from "../components/Map.svelte";
  import Widget from "../components/Widget.svelte";
  import Answers from "../components/Answers.svelte";

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
    //! I need to get the id from somewhere when the event is not just created (URL params?!)
    const data = await client.query({ query: GETEVENT, variables: {} });
    // Update Event Data Store with queryed event Data
    eventDataStore.update(d => (d = data));
    eventData = data.data.event;
  };

  //TODO: Check if if something is in store otherwise query event id
  let eventData = getEventData();
  if (eventData) queryEventData();
  console.log(eventData);
</script>

<Router>
  {#await eventData}
    <p>loading</p>
  {:then event}
    <Hero />
    <QuickFacts />
    <Description />
    <ImageStripe />
    <Map />
    <Widget />
    <Answers />
  {/await}
</Router>
