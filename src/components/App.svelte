<script>
  import { ApolloClient } from "apollo-client";
  import { InMemoryCache } from "apollo-cache-inmemory";
  import { createUploadLink } from "apollo-upload-client";
  import { setClient } from "svelte-apollo";

  import Event from "./Event.svelte";
  import AddEvent from "./AddEvent.svelte";

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createUploadLink({ uri: "http://localhost:3000/graphql" })
  });

  setClient(client);
</script>

<AddEvent />
