<script>
  import ApolloClient from "apollo-boost";
  import { setClient } from "svelte-apollo";
  import { Router, Link, Route } from "svelte-routing";

  import Event from "./Event.svelte";
  import AddEvent from "./AddEvent.svelte";

  const client = new ApolloClient({
    uri: "http://localhost:3000/graphql",

    onError: ({ networkError, graphQLErrors }) => {
      console.log("graphQLErrors", graphQLErrors);
      console.log("networkError", networkError);
    }
  });

  setClient(client);
</script>

<AddEvent />
