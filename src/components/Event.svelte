<script>
  import { getClient } from "svelte-apollo";
  import { gql } from "apollo-boost";

  import { eventDataStore } from "../stores.js";
  import Hero from "./Hero.svelte";
  import QuickFacts from "./QuickFacts.svelte";
  import Description from "./Description.svelte";
  import ImageStripe from "./ImageStripe.svelte";
  import Map from "./Map.svelte";
  import Widget from "./Widget.svelte";
  import Answers from "./Answers.svelte";

  const GETEVENT = gql`
    {
      event(id: "5d9f25cc4f5859672464ef42") {
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
    const data = await client.query({ query: GETEVENT });
    // Update Event Data Store with queryed event Data
    eventDataStore.update(d => (d = data));
    eventData = data.data.event;
  };

  let eventData = queryEventData();
</script>

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
