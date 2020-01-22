<script>
  import { getClient } from "svelte-apollo";
  import { gql } from "apollo-boost";
  import { Router, Link, Route } from "svelte-routing";

  import { appStore, eventDataStore, todoStore } from "../stores.js";
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

  let appData;
  let eventData;
  let todos;

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
    // generate Users to feed the Todo component with them
    const generateDummyUsers = count => {
      let dummyUsers = [];
      if (count > 5) count = 4;
      for (let i = 0; i < count; i++) {
        dummyUsers = [
          ...dummyUsers,
          {
            name: "unkown user",
            photo: "http://localhost:3000/img/user/default.jpg"
          }
        ];
      }
      return dummyUsers;
    };

    // Add Dummys Users to data if needed
    const prepareData = todo => {
      let newTodo = { ...todo };
      // if there are no partacing users on that thing yet
      if (!todo.users || todo.users.length === 0) {
        // If more than 5 people are required add 5 dummy users
        if (todo.requiredPersons > 5) newTodo.users = generateDummyUsers(5);

        // If less then 5 people are required add the ammount of requiredPersons in dummy Users
        newTodo.users = generateDummyUsers(todo.requiredPersons);
      }

      // if this thing allready has some partacing users
      if (todo.users && todo.users[0]) {
        const partacer = todo.users.length;
        const requiredPersons = todo.requiredPersons;

        // if the thing is done
        if (partacer >= requiredPersons) {
          // add done property to todo
          newTodo.done = true;
        }

        // add partacer count to todo
        newTodo.partacerCount = partacer;

        // get an Array of dummy users
        const dummyUsers = generateDummyUsers(requiredPersons - partacer);

        // Add the dummy users to the existing users
        newTodo.users = newTodo.users.concat(dummyUsers);
      }
      return newTodo;
    };

    const id = widgetId;

    // Query for todos with specific widget id
    const data = await client.query({ query: GETTODOS, variables: { id } });

    const todos = data.data.todosForWidget;

    // Update Todos Store
    todoStore.set(
      todos
        .map(todo => prepareData(todo))
        // sort Todos by done or not
        .sort((a, b) => {
          // a and b bouth done = 0
          // a done = false --> a,b
          // else --> b,a
          return a.done === b.done ? 0 : a.done ? -1 : 1;
        })
    );

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
    <Hero bgImage={event.heroImg ? event.heroImg : event.heroImgPreview} />
    <QuickFacts />
    {#if event.description}
      <Description />
    {/if}
    {#if event.imgs && event.imgs[0]}
      <ImageStripe />
    {/if}
    {#if event.location && event.location.coordinates[0]}
      <Map />
    {/if}
    {#if (event.widgetTypes && event.widgetTypes[0]) || (event.widgets && event.widgets[0])}
      <Widget />
    {/if}
    {#if event.users && event.users[0]}
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
  {/await}
</Router>
