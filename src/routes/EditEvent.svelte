<script>
  import { getClient, mutate } from "svelte-apollo";
  import { gql } from "apollo-boost";
  import { Router, Route, navigate } from "svelte-routing";
  import Datepicker from "svelte-calendar";
  import { onMount } from "svelte";

  import { appStore, eventDataStore, todoStore } from "../stores.js";
  import { saveLocalStorage } from "../utils/localStorageHandler.js";
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

  let moreVisible = false;
  let listWidgetVisible = false;

  let eventData = {};
  let todos;
  let heroImgPreview;
  let imgStripe;
  let formattedSelected;
  let selectedDate;
  let dateChosen;

  $appStore.currentPage = "addEvent";

  $: if (dateChosen) {
    eventData.startDate = `${selectedDate.getTime()}`;
    eventDataStore.set(eventData);
  }

  eventDataStore.subscribe(newData => {
    eventData = newData;
  });

  todoStore.subscribe(newData => {
    todos = newData;
  });

  const client = getClient();

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

  const CREATEEVENT = gql`
    mutation($input: CreateEventInput!) {
      createEvent(input: $input) {
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
          }
          widgets {
            id
            type
          }
        }
      }
    }
  `;

  const CREATETODO = gql`
    mutation($input: CreateTodoInput!) {
      createTodo(input: $input) {
        todo {
          id
          text
          requiredPersons
        }
      }
    }
  `;

  // Handle Event Data
  const queryEventData = async input => {
    console.log("--- querying Event Data ---");
    // construct input object for mutation
    // index 4 = slug | index 5 = event link
    const pathArr = window.location.href.split("/");
    console.log(pathArr);

    // Query for event
    const data = await client.query({
      query: GETEVENT,
      variables: { input: { editLink: pathArr[5], slug: pathArr[4] } }
    });

    // Update Event Data Store with queryed event Data
    eventDataStore.set(data.data.event);
    return data;
  };

  // Render all Form Fields not shown by default
  const handleNormalBtnClick = e => {
    e.detail.preventDefault();
    moreVisible = true;
  };

  // Remove Hero Img Preview
  const handleHeroImgRemove = e => {
    eventDataStore.update(currentData => {
      const currentEventData = { ...currentData };
      currentEventData.heroImgPreview = undefined;
      return currentEventData;
    });
  };

  const handleImgStripeRemove = e => {
    eventDataStore.update(currentData => {
      const currentEventData = { ...currentData };
      currentEventData.imgs = undefined;
      return currentEventData;
    });
  };

  const handlelistBtnClick = e => {
    // onlistbtnclick --> create new widget with type "todo"
    // This will need more work when we add more widgets
    e.detail.preventDefault();

    listWidgetVisible = !listWidgetVisible;

    listWidgetVisible
      ? (eventData.widgetTypes = ["todo"])
      : (eventData.widgetTypes = []);
  };

  const handleTodoData = async eventData => {
    const widgets = eventData.data.createEvent.event.widgets;
    const WidgetID =
      widgets[widgets.findIndex(widget => widget.type === "todo")].id;

    // TODO: Add multiple todos in one go to DB
    todos.forEach(async todo => {
      const input = {
        widget: WidgetID,
        text: todo.text,
        requiredPersons: todo.requiredPersons
      };

      const savedTodo = await mutate(client, {
        mutation: CREATETODO,
        variables: { input }
      });
    });
  };

  const handleEventData = async () => {
    const currentInput = { ...eventData };
    // prepare input Data
    const input = {
      name: currentInput.name,
      startDate: currentInput.startDate,
      startTime: currentInput.startTime,
      endTime: currentInput.endTime,
      description: currentInput.description,
      location: {
        address: currentInput.location.address,
        coordinates: currentInput.location.coordinates,
        description: currentInput.location.description,
        name: currentInput.location.name
      },
      widgetTypes: currentInput.widgetTypes,
      heroImg: currentInput.pureHeroImg,
      imgs: currentInput.pureImgs
    };

    // Send tilte and date to backend return new Event Document
    return await mutate(client, {
      mutation: CREATEEVENT,
      variables: { input }
    });
  };

  // Deal with form data
  const handleCTABtnClick = async e => {
    e.detail.preventDefault();

    const newEventData = await handleEventData();
    await handleTodoData(newEventData);

    // Only add stuff I need from the new event document
    eventData.id = newEventData.data.createEvent.event.id;
    eventData.slug = newEventData.data.createEvent.event.slug;
    eventData.link = newEventData.data.createEvent.event.link;

    saveLocalStorage(eventData, "eventData");
    saveLocalStorage(todos, "todos");

    navigate("/eventPreview");
  };

  queryEventData();
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
  {#if !heroImgPreview}
    <div class="topBar" />
  {/if}
  <h1>Edit Page</h1>
  <form class="form">
    <section class="heroImg">
      {#if !eventData.heroImgPreview}
        <AddHeroImg />
      {:else}
        <Hero bgImage={eventData.heroImgPreview} />
        <RemoveBtn
          marginLeft={1}
          marginTop={-2.9}
          on:removebtnclick={() => handleHeroImgRemove()} />
      {/if}

    </section>
    <section class="simpleFields">
      <div class="FormFields">
        <div class="title">
          <SimpleField
            name={'Title'}
            heading={'Title'}
            placeholder={'What are you planing?'}
            bind:value={eventData.name} />
        </div>
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
            <button class="datePickerBtn" on:click={e => e.preventDefault()}>
              {#if dateChosen}{formattedSelected}{:else}When does it start?{/if}
            </button>
          </Datepicker>
        </div>
      </div>
    </section>
    {#if !moreVisible}
      <section class="selectBtns">
        <BtnPanel>
          <NormalBtn
            text={'Add more'}
            type={'normal'}
            on:normalbtnclick={handleNormalBtnClick} />
          <NormalBtn
            text={'GO !'}
            type={'cta'}
            on:ctabtnclick={handleCTABtnClick} />
        </BtnPanel>
      </section>
    {:else}
      <section class="startEndTime">
        <AddStartEndTime
          bind:startTime={eventData.startTime}
          bind:endTime={eventData.endTime} />
      </section>
      <section class="description">
        <AddDescription bind:value={eventData.description} />
      </section>
      <section class="imgsUpload">
        {#if !eventData.imgs}
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
      {#if listWidgetVisible}
        <section class="widgets">
          <AddWidgets />
          <RemoveBtn
            width={25}
            height={25}
            marginLeft={1}
            marginTop={-2.5}
            on:removebtnclick={() => {
              listWidgetVisible = !listWidgetVisible;
            }} />
        </section>
      {/if}
      <section>
        <BtnBig text={'GO !'} on:bigbtnclick={handleCTABtnClick} />
      </section>
    {/if}
  </form>
</Router>