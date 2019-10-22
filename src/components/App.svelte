<script>
  import { ApolloClient } from "apollo-client";
  import { InMemoryCache } from "apollo-cache-inmemory";
  import { HttpLink } from "apollo-link-http";
  import { onError } from "apollo-link-error";
  import { ApolloLink } from "apollo-link";
  import { createUploadLink } from "apollo-upload-client";
  import { setClient } from "svelte-apollo";
  import { Router, Link, Route } from "svelte-routing";

  import Event from "./Event.svelte";
  import AddEvent from "./AddEvent.svelte";

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createUploadLink({ uri: "http://localhost:3000/graphql" })
  });

  // const client = new ApolloClient({
  //   uri: "http://localhost:3000/graphql",

  //   onError: ({ networkError, graphQLErrors }) => {
  //     console.log("graphQLErrors", graphQLErrors);
  //     console.log("networkError", networkError);
  //   }
  // });

  setClient(client);
</script>

<AddEvent />
