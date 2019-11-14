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

  eventDataStore.subscribe(newData => {
    eventData = newData;
  });

  todoStore.subscribe(newData => {
    todos = newData;
  });

  const GETEVENT = gql`
    query($id: ID!) {
      event(id: $id) {
        name
        startDate
        startTime
        endTime
        description
        heroImg
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

    //! I need to get the id from somewhere when the event is not just created (URL params?!)
    const id = "5dcd5322c44d0874c41f1e3e";

    // Query  for event with specific id
    const data = await client.query({ query: GETEVENT, variables: { id } });
    const widgets = data.data.event.widgets;

    await queryTodos(
      widgets[widgets.findIndex(widget => widget.type === "todo")].id
    );
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
