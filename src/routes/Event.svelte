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
  import EventOverlay from "../components/EventOverlay.svelte";
  import AddPersonProfile from "../components/AddPersonProfile.svelte";

  let eventData;
  let todos;
  let currentUser;
  let btnClick = false;

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

  const queryTodos = async widgetId => {
    const id = widgetId;

    // Query for todos with specific widget id
    const data = await client.query({ query: GETTODOS, variables: { id } });

    // Update Todos Store with queryed Todos Data
    todoStore.set(data.data.todosForWidget);

    return data;
  };

  const queryEventData = async input => {
    // Query for event
    const data = await client.query({ query: GETEVENT, variables: { input } });

    // Update Event Data Store with queryed event Data
    eventDataStore.set(data.data.event);

    return data;
  };

  const handleData = async () => {
    // construct input object for mutation
    // index 4 = event link | index 5 = user link
    const pathArr = window.location.href.split("/");
    const input = { link: pathArr[4], slug: pathArr[3] };

    // query for event with the right link and slug
    const newEventData = await queryEventData(input);

    // grab widgets and users from the queryed event
    const widgets = newEventData.data.event.widgets;
    const users = newEventData.data.event.users;

    // Search the Widget Array for type todo
    // grab the id from the entry and query for all event todos with that
    await queryTodos(
      widgets[widgets.findIndex(widget => widget.type === "todo")].id
    );

    // set current user if the user link is given
    if (pathArr[5])
      currentUser = users[users.findIndex(user => user.link === pathArr[5])];
  };

  // Check if something is in store otherwise query for the data
  if (Object.keys(eventData).length === 0 && eventData.constructor === Object) {
    handleData();
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
    {#if btnClick}
      <EventOverlay>
        <AddPersonProfile />
      </EventOverlay>
    {/if}
    <button on:click={() => (btnClick = !btnClick)}>click</button>
  {/await}
</Router>
