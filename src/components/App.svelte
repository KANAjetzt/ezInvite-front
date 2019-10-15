<script>
  import ApolloClient from "apollo-boost";
  import { setClient } from "svelte-apollo";
  import { gql } from "apollo-boost";

  import Hero from "./Hero.svelte";

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
        location {
          name
        }
      }
    }
  `;

  export const queryEventData = async () => {
    const data = await client.query({ query: GETEVENT });
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
{/await}
