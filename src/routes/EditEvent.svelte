<script>
  import { getClient, mutate } from "svelte-apollo";
  import { gql } from "apollo-boost";
  import { Router, Route, navigate } from "svelte-routing";
  import Datepicker from "svelte-calendar";
  import { onMount } from "svelte";

  import { appStore, eventDataStore, todoStore } from "../stores.js";
  import { saveLocalStorage } from "../utils/localStorageHandler.js";
  import { removeMessage, addMessage } from "../utils/errorHandler.js";
  import { send, receive } from "../utils/crossfade.js";
  import AddHeroImg from "../components/AddHeroImg.svelte";
  import Hero from "../components/Hero.svelte";
  import RemoveBtn from "../components/BtnRemove.svelte";
  import SimpleField from "../components/SimpleField.svelte";
  import BtnPanel from "../components/BtnPanel.svelte";
  import NormalBtn from "../components/NormalBtn.svelte";
  import AddStartEndTime from "../components/AddStartEndTime.svelte";
  import AddDescription from "../components/AddDescription.svelte";
  import AddImgs from "../components/AddImgs.svelte";
  import ImageStripe from "../components/ImageStripe.svelte";
  import LocationPicker from "../components/AddLocationPicker.svelte";
  import WidgetPicker from "../components/AddSelectWidget.svelte";
  import AddWidgets from "../components/AddWidget.svelte";
  import BtnBig from "../components/BtnBig.svelte";
  import Message from "../components/Message.svelte";

  const client = getClient();

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
          description
          address
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

  let moreVisible = false;
  let listWidgetVisible = false;

  let eventData = handleData();
  let todos;
  let newTodos;
  let heroImgPreview;
  let imgStripe;
  let formattedSelected;
  let selectedDate;
  let dateChosen;

  $appStore.currentPage = "editEvent";

  $: if (dateChosen) {
    $eventDataStore.startDate = `${selectedDate.getTime()}`;
  }

  eventDataStore.subscribe(newData => {
    eventData = newData;
  });

  todoStore.subscribe(newData => {
    todos = newData;
  });

  const UPDATEEVENT = gql`
    mutation($input: UpdateEventInput!) {
      updateEvent(input: $input) {
        event {
          id
          name
          startDate
          startTime
          endTime
          description
          link
          slug
          location {
            name
            coordinates
            description
          }
          widgets {
            id
            type
          }
        }
      }
    }
  `;

  const CREATETODOS = gql`
    mutation($input: CreateTodosInput!) {
      createTodos(input: $input) {
        todos {
          id
          text
          requiredPersons
        }
      }
    }
  `;

  // HANDLE DATA
  async function handleData() {
    const data = await queryEventData();
    // if no envet was found return
    if (!data) return;
    const widgets = data.data.event.widgets;
    if (widgets && widgets[0]) {
      queryTodoData(
        widgets[widgets.findIndex(widget => widget.type === "todo")].id
      );
    }

    // set event date in date picker
    selectedDate = new Date(data.data.event.startDate * 1);
  }

  // --- Query Event Data ---
  async function queryEventData() {
    // construct input object for mutation
    // index 4 = slug | index 5 = event link
    const pathArr = window.location.href.split("/");

    try {
      // Query for event
      const data = await client.query({
        query: GETEVENT,
        variables: { input: { editLink: pathArr[5], slug: pathArr[4] } }
      });

      // Update Event Data Store with queryed event Data
      eventDataStore.set(data.data.event);
      return data;
    } catch (err) {
      navigate("/notFound");
    }
  }

  // --- Query Todo Data ---
  async function queryTodoData(widgetId) {
    const id = widgetId;
    // Query for todos with specific widget id
    const data = await client.query({ query: GETTODOS, variables: { id } });

    const todos = data.data.todosForWidget;

    // Update Todo Store with queryed todo Data
    todoStore.set(todos);
  }

  // Render all Form Fields not shown by default
  const handleNormalBtnClick = e => {
    e.detail.preventDefault();
    moreVisible = true;
  };

  // Remove Hero Img Preview
  const handleHeroImgRemove = e => {
    eventDataStore.update(currentData => {
      const currentEventData = { ...currentData };
      currentEventData.heroImg = null;
      currentEventData.heroImgPreview = null;
      return currentEventData;
    });
  };

  const handleImgStripeRemove = e => {
    eventDataStore.update(currentData => {
      const currentEventData = { ...currentData };
      currentEventData.imgs = null;
      return currentEventData;
    });
  };

  const handlelistBtnClick = async e => {
    // onlistbtnclick --> create new widget with type "todo"
    // This will need more work when we add more widgets
    e.detail.preventDefault();

    listWidgetVisible = !listWidgetVisible;

    listWidgetVisible
      ? (eventData.widgetTypes = ["todo"])
      : (eventData.widgetTypes = []);

    // Add Widget to Event in DB
    const updatedEvent = await mutate(client, {
      mutation: UPDATEEVENT,
      variables: {
        input: { id: eventData.id, widgetTypes: eventData.widgetTypes }
      }
    });
  };

  const handleTodoData = async eventData => {
    const widgets = eventData.data.updateEvent.event.widgets;
    const WidgetID =
      widgets[widgets.findIndex(widget => widget.type === "todo")].id;

    // TODO: Add multiple todos in one go to DB
    const newTodos = await mutate(client, {
      mutation: CREATETODOS,
      variables: { input: { todos: newTodos } }
    });
  };

  const handleEventData = async () => {
    const allowed = [
      "id",
      "name",
      "startDate",
      "startTime",
      "endTime",
      "description",
      "pureHeroImg",
      "heroImg",
      "pureImgs",
      "imgs",
      "location",
      "widgetTypes"
    ];

    const input = Object.keys(eventData)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: eventData[key]
        };
      }, {});

    if (!input.name) {
      $appStore.messages = addMessage(
        $appStore.messages,
        "Error",
        "inputEventName",
        "Pleas provide a name for your event."
      );
    } else {
      $appStore.messages = removeMessage($appStore.messages, "inputEventName");
    }

    if (!input.startDate) {
      $appStore.messages = addMessage(
        $appStore.messages,
        "Error",
        "inputStartDate",
        "Pleas select a start date for your event."
      );
    } else {
      $appStore.messages = removeMessage($appStore.messages, "inputStartDate");
    }

    if (input.pureHeroImg) {
      input.heroImg = input.pureHeroImg;
      delete input.pureHeroImg;
      delete input.heroImgPreview;
    }

    if (input.pureImgs) {
      delete input.imgs;
      input.imgs = input.pureImgs;
      delete input.pureImgs;
    }

    if (input.location) {
      delete input.location.__typename;
    }

    // if no messages are in store
    if (!$appStore.messages[0]) {
      // Send tilte and date to backend return new Event Document
      return await mutate(client, {
        mutation: UPDATEEVENT,
        variables: { input }
      });
    }
  };

  // Deal with form data
  const handleCTABtnClick = async e => {
    e.detail.preventDefault();

    const newEventData = await handleEventData();
    if (!newEventData) {
      return;
    }

    // Only add stuff I need from the new event document
    eventData.id = newEventData.data.updateEvent.event.id;
    eventData.slug = newEventData.data.updateEvent.event.slug;
    eventData.link = newEventData.data.updateEvent.event.link;
    eventData.editLink = newEventData.data.updateEvent.event.editLink;

    saveLocalStorage(eventData, "eventData");
    saveLocalStorage(todos, "todos");

    // Navigate back to the event page
    navigate(`${svelteEnv.frontUrl}/${eventData.slug}/${eventData.link}`);
  };
</script>

<style>
  .topBar {
    width: 100%;
    height: 0.5rem;
    background-image: linear-gradient(
      89.87deg,
      #022c4d -2.53%,
      #045595 112.27%
    );
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
  }

  .form:last-child {
    margin-bottom: -5rem;
  }

  .title {
    margin-top: 5rem;
  }

  .date {
    margin-top: 2rem;
    font-family: var(--font-primary);
  }

  .labelDatepicker {
    display: block;
    font-weight: 700;
    font-size: 1.4rem;
    letter-spacing: 0.5px;
    color: var(--color-text-primary);
    margin-bottom: 0.75rem;
    padding-left: 1.5rem;
  }

  .datePickerBtn {
    width: 100vw;
    display: flex;
    align-items: center;
    padding: 0 1.5rem 1rem 1.5rem;
    margin: 0;
    border: none;
    text-decoration: none;
    cursor: pointer;
    text-align: center;
    z-index: 20;
    font-family: var(--font-primary);
    font-weight: 300;
    font-size: 1.8rem;
    color: var(--color-text-primary);
    background: transparent;
    box-shadow: 0 1px 0 var(--color-secondary);
  }

  .imgsUpload {
    margin-top: 2rem;
  }

  .widgetPicker {
    margin-top: 2rem;
  }

  .widgets {
    margin-top: 2rem;
  }
</style>

<Router>
  <main out:send={{ key: 'main' }} in:receive={{ key: 'main' }}>
    {#await eventData}
      ..loading...
    {:then eventData}
      {#if !eventData.heroImgPreview && !eventData.heroImg}
        <div class="topBar" />
      {/if}
      <form class="form">
        <section class="heroImg">
          {#if !eventData.heroImgPreview && (!eventData.heroImg || eventData.heroImg === 'defaultHero.jpg')}
            <AddHeroImg />
          {:else}
            <Hero
              bgImage={!eventData.heroImg || eventData.heroImg === 'defaultHero.jpg' ? eventData.heroImgPreview : eventData.heroImg} />
          {/if}

        </section>
        <section class="simpleFields">
          <div class="FormFields">
            <div class="title">
              <SimpleField
                name={'Title'}
                heading={'Title'}
                placeholder={'What are you planing?'}
                bind:value={$eventDataStore.name} />
            </div>
            {#if $appStore.messages.filter(message => message.location === 'inputEventName')[0]}
              <Message location={'inputEventName'} />
            {/if}
            <div class="date">
              <span class="labelDatepicker">Date</span>
              <Datepicker
                start={new Date()}
                end={new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30 * 13)}
                format={'#{l}, #{F} #{j}, #{Y}'}
                highlightColor="#047bd7"
                dayBackgroundColor="#efefef"
                dayTextColor="#333"
                dayHighlightedBackgroundColor="#047bd7"
                dayHighlightedTextColor="#fff"
                bind:selected={selectedDate}
                bind:formattedSelected
                bind:dateChosen>
                <button
                  type="button"
                  class="datePickerBtn"
                  on:click={e => e.preventDefault()}>
                  {formattedSelected}
                </button>
              </Datepicker>
              {#if $appStore.messages.filter(message => message.location === 'inputStartDate')[0]}
                <Message location={'inputStartDate'} />
              {/if}
            </div>
          </div>
        </section>

        <section class="startEndTime">
          <AddStartEndTime
            bind:startTime={$eventDataStore.startTime}
            bind:endTime={$eventDataStore.endTime} />
        </section>
        <section class="description">
          <AddDescription bind:value={$eventDataStore.description} />
        </section>
        <section class="imgsUpload">
          {#if !eventData.imgs || !eventData.imgs[0]}
            <AddImgs bind:imgStripe />
          {:else}
            <ImageStripe />
            <RemoveBtn
              width={20}
              height={20}
              marginLeft={1}
              marginTop={-2.2}
              on:removebtnclick={() => handleImgStripeRemove()} />
          {/if}
        </section>
        <section class="locationPicker">
          <LocationPicker />
        </section>
        <section class="widgetPicker">
          <WidgetPicker on:listbtnclick={handlelistBtnClick} />
        </section>
        {#if listWidgetVisible || $todoStore[0]}
          <section class="widgets">
            <AddWidgets />
            <RemoveBtn
              width={25}
              height={25}
              marginLeft={1}
              marginTop={-2.5}
              on:removebtnclick={() => {
                listWidgetVisible = false;
                $todoStore = [];
              }} />
          </section>
        {/if}
        <section>
          <BtnBig
            text={'GO !'}
            on:bigbtnclick={handleCTABtnClick}
            clipVar={'tertiary'} />
        </section>
      </form>
    {/await}
  </main>
</Router>
