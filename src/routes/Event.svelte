<script>
  import { getClient } from "svelte-apollo";
  import { gql } from "apollo-boost";
  import { navigate } from "svelte-routing";

  import { appStore, eventDataStore, todoStore } from "../stores.js";
  import Head from "../components/Head.svelte";
  import PageTransition from "../components/PageTransition.svelte";
  import Hero from "../components/Hero.svelte";
  import QuickFacts from "../components/QuickFacts.svelte";
  import Description from "../components/Description.svelte";
  import ImageStripe from "../components/ImageStripe.svelte";
  import Map from "../components/Map.svelte";
  import Widget from "../components/Widget.svelte";
  import Answers from "../components/Answers.svelte";
  import EventOverlay from "../components/EventOverlay.svelte";
  import AddPersonProfile from "../components/AddPersonProfile.svelte";
  import AddRespond from "../components/AddRespond.svelte";
  import Loader from "../components/Loader.svelte";

  let appData;
  let eventData;
  let todos;
  let loading = true;

  $appStore.currentPage = "event";

  appStore.subscribe(newData => {
    appData = newData;
  });

  eventDataStore.subscribe(newData => {
    eventData = newData;
  });

  todoStore.subscribe(newData => {
    todos = newData;
  });

  const GETEVENT = gql`
    query($input: QueryEventInput!) {
      event(input: $input) {
        id
        name
        startDate
        startTime
        endTime
        description
        heroImg
        imgs
        link
        slug
        location {
          name
          coordinates
        }
        users {
          id
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

  // returns true if the person didn't responded, true if he did.
  const handleResponder = () => {
    return ($eventDataStore.currentUser &&
      $eventDataStore.currentUser.accepted === null) ||
      $eventDataStore.currentUser === undefined
      ? true
      : false;
  };

  const queryTodos = async widgetId => {
    const id = widgetId;

    // Query for todos with specific widget id
    const data = await client.query({ query: GETTODOS, variables: { id } });

    // Update Todos Store
    todoStore.set(data.data.todosForWidget);

    return data;
  };

  const queryEventData = async input => {
    // Query for event
    try {
      const data = await client.query({
        query: GETEVENT,
        variables: { input }
      });

      // Update Event Data Store with queryed event Data
      eventDataStore.set(data.data.event);
      return data;
    } catch (err) {
      navigate("/notFound");
    }
  };

  const handleData = async () => {
    // construct input object for mutation
    // index 4 = event link | index 5 = user link
    const pathArr = window.location.href.split("/");
    const input = { link: pathArr[4], slug: pathArr[3] };

    // query for event with the right link and slug
    const newEventData = await queryEventData(input);
    // return if no event was found
    if (!newEventData) return;

    // grab widgets and users from the queryed event
    const widgets = newEventData.data.event.widgets;
    const users = newEventData.data.event.users;

    // Search the Widget Array for type todo
    // grab the id from the entry and query for all event todos with that
    if (widgets && widgets[0]) {
      await queryTodos(
        widgets[widgets.findIndex(widget => widget.type === "todo")].id
      );
    }

    // set current user if the user link is given
    if (pathArr[5])
      $eventDataStore.currentUser =
        users[users.findIndex(user => user.link === pathArr[5])];

    // ceck if current user responded already
    $appStore.showFullResponder = handleResponder();

    // set loading to false
    loading = false;
  };

  // Check if something is in store otherwise query for the data
  if (Object.keys(eventData).length === 0 && eventData.constructor === Object) {
    handleData();
  } else {
    loading = false;
  }
</script>

<Head title={eventData.name ? `Corrogo - ${eventData.name}` : `Corrogo -`} />

{#if loading}
  <Loader style={'fullPageCentered'} />
{:else}
  <PageTransition>
    <Hero
      bgImage={eventData.heroImg ? eventData.heroImg : eventData.heroImgPreview} />
    <QuickFacts />
    {#if eventData.description}
      <Description />
    {/if}
    {#if eventData.imgs && eventData.imgs[0]}
      <ImageStripe />
    {/if}
    {#if eventData.location && eventData.location.coordinates && eventData.location.coordinates[0]}
      <Map />
    {/if}
    {#if (eventData.widgetTypes && eventData.widgetTypes[0]) || (eventData.widgets && eventData.widgets[0])}
      <Widget />
    {/if}
    {#if eventData.users && eventData.users[0]}
      <Answers />
    {/if}
    {#if $appStore.showAddPersonProfile}
      <EventOverlay
        ignoreClickClasses={'.personProfile, .respond, .btnConfirm, .btnDecline,  .removeBtn, .personAddBtn, .addBtn'}
        on:clickoutside={() => {
          $appStore.showAddPersonProfile = !$appStore.showAddPersonProfile;
        }}>
        <AddPersonProfile
          on:donebtnclick={() => {
            $appStore.showAddPersonProfile = !$appStore.showAddPersonProfile;
          }} />
      </EventOverlay>
    {/if}
    <AddRespond />

  </PageTransition>
{/if}
