<script>
  import { ApolloClient } from "apollo-client";
  import { InMemoryCache } from "apollo-cache-inmemory";
  import { createUploadLink } from "apollo-upload-client";
  import { setClient } from "svelte-apollo";
  import { Router, Link, Route } from "svelte-routing";

  import EventPreview from "./routes/EventPreview.svelte";
  import Event from "./routes/Event.svelte";
  import AddEvent from "./routes/AddEvent.svelte";

  // Used for SSR. A falsy value is ignored by the Router.
  export let url = "";

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createUploadLink({ uri: "http://localhost:3000/graphql" })
  });

  setClient(client);
</script>

<Router {url}>
  <Route path="/" component={AddEvent} />
  <Route path="event" component={Event} />
  <Route path="eventPreview" component={EventPreview} />
</Router>
