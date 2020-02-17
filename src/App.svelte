<script>
  import { ApolloClient } from "apollo-client";
  import { InMemoryCache } from "apollo-cache-inmemory";
  import { createUploadLink } from "apollo-upload-client";
  import { setClient } from "svelte-apollo";
  import { Router, Link, Route } from "svelte-routing";

  import EventPreview from "./routes/EventPreview.svelte";
  import Event from "./routes/Event.svelte";
  import AddEvent from "./routes/AddEvent.svelte";
  import EditEvent from "./routes/EditEvent.svelte";
  import Share from "./routes/Share.svelte";
  import NotFound from "./routes/404.svelte";

  // Used for SSR. A falsy value is ignored by the Router.
  export let url = "";

  console.log(svelteEnv.isProd);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createUploadLink({
      uri: `${
        svelteEnv.isProd
          ? "https://ezinvite.herokuapp.com/graphql"
          : "http://localhost:3000/graphql"
      }`
    })
  });

  setClient(client);
</script>

<Router {url}>
  <Route path="/" component={AddEvent} />
  <Route path="/edit/*eventSlug/*eventEditLink" component={EditEvent} />
  <Route path="/*eventSlug/*eventLink/*userLink" component={Event} />
  <Route path="eventPreview" component={EventPreview} />
  <Route path="share" component={Share} />
  <Route path="/notFound" component={NotFound} />
</Router>
