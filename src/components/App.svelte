<script>
  import ApolloClient from "apollo-boost";
  import { setClient } from "svelte-apollo";
  import { gql } from "apollo-boost";

  import { eventDataStore } from "../stores.js";
  import Hero from "./Hero.svelte";
  import QuickFacts from "./QuickFacts.svelte";

  const client = new ApolloClient({
    uri: "http://localhost:3000/graphql",

    onError: ({ networkError, graphQLErrors }) => {
      console.log("graphQLErrors", graphQLErrors);
      console.log("networkError", networkError);
    }
  });

  setClient(client);

  const GETEVENT = gql`
    {
      event(id: "5d9f25cc4f5859672464ef42") {
        name
        startDate
        startTime
        endTime
        location {
          name
        }
        users {
          accepted
        }
      }
    }
  `;

  export const queryEventData = async () => {
    const data = await client.query({ query: GETEVENT });
    eventDataStore.update(d => (d = data));
    eventData = data.data.event;
  };

  let eventData = queryEventData();
</script>

{#await eventData}
  <p>loading</p>
{:then event}
  <Hero
    name={event.name}
    locationName={event.location.name}
    startDate={event.startDate} />
  <QuickFacts />
{/await}
