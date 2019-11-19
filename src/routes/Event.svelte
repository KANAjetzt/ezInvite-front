<script>
  import { getClient } from "svelte-apollo";
  import { gql } from "apollo-boost";
  import { Router, Link, Route } from "svelte-routing";

  import { eventDataStore, todoStore } from "../stores.js";
  import Hero from "../components/Hero.svelte";
  import QuickFacts from "../components/QuickFacts.svelte";
  import Description from "../components/Description.svelte";
  import ImageStripe from "../components/ImageStripe.svelte";
  import Map from "../components/Map.svelte";
  import Widget from "../components/Widget.svelte";
  import Answers from "../components/Answers.svelte";

  let eventData;
  let todos;
  let currentUser;

  eventDataStore.subscribe(newData => {
    eventData = newData;
  });

  todoStore.subscribe(newData => {
    todos = newData;
  });

  const GETEVENT = gql`
    query($input: QueryEventInput!) {
      event(input: $input) {
        name
        startDate
        startTime
        endTime
        description
        heroImg
        imgs
        link
        location {
          name
          coordinates
        }
        users {
          name
          photo
          accepted
          link
        }
        widgets {
          id
          type
        }
      }
    }
  `;

  const GETTODOS = gql`
    query($id: ID!) {
      todosForWidget(id: $id) {
        id
        text
        requiredPersons
        users {
          name
          photo
        }
      }
    }
  `;

  const client = getClient();

  const queryEventData = async () => {
    const queryTodos = async widgetId => {
      const id = widgetId;

      // Query for todos with specific widget id
      const data = await client.query({ query: GETTODOS, variables: { id } });

      // Update Todos Store with queryed Todos Data
      todoStore.set(data.data.todosForWidget);
    };

    // index 4 = event link | index 5 = user link
    const pathArr = window.location.href.split("/");
    console.log(pathArr);

    // if no user link query for event only
    const input = { link: pathArr[4], slug: pathArr[3] };
    console.log(input);

    // Query for event
    const data = await client.query({ query: GETEVENT, variables: { input } });
    const widgets = data.data.event.widgets;
    const users = data.data.event.users;

    await queryTodos(
      widgets[widgets.findIndex(widget => widget.type === "todo")].id
    );

    // If user link is given
    if (pathArr[5]) {
      currentUser = users[users.findIndex(user => user.link === pathArr[5])];
      console.log(currentUser);
    }

    // Update Event Data Store with queryed event Data
    eventDataStore.set(data.data.event);
  };

  // Check if if something is in store otherwise query event id
  if (Object.keys(eventData).length === 0 && eventData.constructor === Object) {
    queryEventData();
  }
</script>

<Router>
  {#await eventData}
    <p>loading</p>
  {:then event}
    <Hero bgImage={event.heroImg} />
    <QuickFacts />
    {#if event.description}
      <Description />
    {/if}
    {#if event.imgs}
      <ImageStripe />
    {/if}
    {#if event.location && event.location.coordinates[0]}
      <Map />
    {/if}
    {#if event.widgets && event.widgets[0]}
      <Widget />
    {/if}
    {#if event.users && event.users[0]}
      <Answers />
    {/if}
  {/await}
</Router>
