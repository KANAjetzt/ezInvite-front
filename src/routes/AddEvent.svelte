<script>
  import { getClient, mutate } from "svelte-apollo";
  import { gql } from "apollo-boost";
  import { navigate } from "svelte-routing";
  import Datepicker from "svelte-calendar";
  import { slide, fly } from "svelte/transition";

  import { appStore, eventDataStore, todoStore } from "../stores.js";
  import { saveLocalStorage } from "../utils/localStorageHandler.js";
  import { removeMessage, addMessage } from "../utils/messageHandler.js";
  import getStr from "../utils/getLanguageStr.js";
  import Head from "../components/Head.svelte";
  import PageTransition from "../components/PageTransition.svelte";
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
  import Loader from "../components/Loader.svelte";
  import LanguageStr from "../components/LanguageStr.svelte";

  let section1 = true;
  let section2 = false;
  let addHeroImg = true;
  let heroImg = false;
  let listWidgetVisible = false;
  let loading = false;

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
          editLink
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

  // Render all Form Fields not shown by default
  const handleNormalBtnClick = e => {
    e.detail.preventDefault();
    section1
      ? (section1 = !section1)
      : section2
      ? (section2 = !section2)
      : null;
  };

  // Handle Add Hero Img
  const handleAddHeroImg = e => {
    addHeroImg
      ? (addHeroImg = !addHeroImg)
      : heroImg
      ? (heroImg = !heroImg)
      : null;
  };

  // Remove Hero Img Preview
  const handleHeroImgRemove = e => {
    eventDataStore.update(currentData => {
      const currentEventData = { ...currentData };
      currentEventData.heroImgPreview = undefined;
      return currentEventData;
    });

    addHeroImg
      ? (addHeroImg = !addHeroImg)
      : heroImg
      ? (heroImg = !heroImg)
      : null;
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
    const input = { ...eventData };

    if (!input.name) {
      $appStore.messages = addMessage(
        $appStore.messages,
        "Error",
        "inputEventName",
        "Please provide a name for your event.",
        6,
        false
      );
    } else {
      $appStore.messages = removeMessage($appStore.messages, "inputEventName");
    }

    if (!input.startDate) {
      $appStore.messages = addMessage(
        $appStore.messages,
        "Error",
        "inputStartDate",
        "Please select a start date for your event.",
        6,
        false
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

    // if no messages are in store
    if (!$appStore.messages[0]) {
      // Send tilte and date to backend return new Event Document
      return await mutate(client, {
        mutation: CREATEEVENT,
        variables: { input }
      });
    } else {
      loading = false;
    }
  };

  // Deal with form data
  const handleCTABtnClick = async e => {
    e.detail.preventDefault();

    loading = true;

    const newEventData = await handleEventData();
    if (!newEventData) return;
    if (
      newEventData.data.createEvent.event.widgets.findIndex(
        widget => widget.type === "todo"
      ) !== -1
    ) {
      await handleTodoData(newEventData);
    }

    // Only add stuff I need from the new event document
    eventData.id = newEventData.data.createEvent.event.id;
    eventData.slug = newEventData.data.createEvent.event.slug;
    eventData.link = newEventData.data.createEvent.event.link;
    eventData.editLink = newEventData.data.createEvent.event.editLink;

    saveLocalStorage(eventData, "eventData");
    saveLocalStorage(todos, "todos");

    navigate("/eventPreview");
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
  }

  .datePickerBtn--isChosen {
    box-shadow: 0 1px 0 var(--color-secondary);
  }
  .datePickerBtn--isNotChosen {
    box-shadow: 0 1px 0 red;
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

  .loaderWrapper {
    grid-column: span 2;
  }
</style>

<Head
  title={eventData.name ? `Corrogo - Creating ${eventData.name}` : `Corrogo - Create Event`} />

<PageTransition>
  {#if !heroImgPreview}
    <div class="topBar" />
  {/if}
  <form class="form">
    <section class="heroImg" transition:fly|local={{ duration: 250, y: -100 }}>
      {#if addHeroImg}
        <AddHeroImg
          on:imgadded={handleAddHeroImg}
          on:outroend={() => (heroImg = true)} />
      {:else if heroImg}
        <Hero
          bgImage={eventData.heroImgPreview}
          on:removebtnclick={handleHeroImgRemove}
          on:outroend={() => (addHeroImg = true)} />
      {/if}

    </section>
    {#if section1}
      <section
        transition:fly|local={{ duration: 250, x: -30 }}
        on:outroend={() => (section2 = true)}>
        <div class="FormFields">
          <div class="title">
            <SimpleField
              name={'Title'}
              heading={$appStore.languages[0] ? getStr($appStore.languages, 'a219a3') : ''}
              required={true}
              placeholder={$appStore.languages[0] ? getStr($appStore.languages, '5da77b') : ''}
              bind:value={eventData.name} />
          </div>
          {#if $appStore.messages.filter(message => message.location === 'inputEventName')[0]}
            <Message location={'inputEventName'} />
          {/if}
          <div class="date">
            <span class="labelDatepicker">
              <LanguageStr id={'b7220c'} />
            </span>
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
                class={`datePickerBtn datePickerBtn--isChosen`}
                on:click={e => e.preventDefault()}>
                {#if dateChosen}
                  {formattedSelected}
                {:else}
                  <LanguageStr id={'c0d7b0'} />
                {/if}
              </button>
            </Datepicker>
            {#if $appStore.messages.filter(message => message.location === 'inputStartDate')[0]}
              <Message location={'inputStartDate'} />
            {/if}
          </div>
        </div>
      </section>

      <section
        transition:fly|local={{ duration: 250, y: 30 }}
        class="selectBtns">
        <BtnPanel clipVar={'secondary-fixed'}>
          {#if !loading}
            <NormalBtn
              text={$appStore.languages[0] ? getStr($appStore.languages, '5546a7') : ''}
              type={'normal'}
              on:normalbtnclick={handleNormalBtnClick} />
            <NormalBtn
              text={$appStore.languages[0] ? getStr($appStore.languages, 'f994f3') : ''}
              type={'cta'}
              on:ctabtnclick={handleCTABtnClick} />
          {:else}
            <div class="loaderWrapper">
              <Loader />
            </div>
          {/if}
        </BtnPanel>
      </section>
    {:else if section2}
      <div class="FormFields" transition:fly|local={{ duration: 250, x: -30 }}>
        <div class="title">
          <SimpleField
            name={'Title'}
            heading={$appStore.languages[0] ? getStr($appStore.languages, 'a219a3') : ''}
            required={true}
            placeholder={$appStore.languages[0] ? getStr($appStore.languages, '5da77b') : ''}
            bind:value={eventData.name} />
        </div>
        {#if $appStore.messages.filter(message => message.location === 'inputEventName')[0]}
          <Message location={'inputEventName'} />
        {/if}
        <div class="date">
          <span class="labelDatepicker">
            <LanguageStr id={'b7220c'} />
          </span>
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
              class={`datePickerBtn datePickerBtn--isChosen`}
              on:click={e => e.preventDefault()}>
              {#if dateChosen}
                {formattedSelected}
              {:else}
                <LanguageStr id={'c0d7b0'} />
              {/if}
            </button>
          </Datepicker>
          {#if $appStore.messages.filter(message => message.location === 'inputStartDate')[0]}
            <Message location={'inputStartDate'} />
          {/if}
        </div>
      </div>

      <section
        class="startEndTime"
        transition:fly|local={{ duration: 250, x: -30 }}>
        <AddStartEndTime
          bind:startTime={eventData.startTime}
          bind:endTime={eventData.endTime} />
      </section>
      <section
        class="description"
        transition:fly|local={{ duration: 250, x: -30 }}>
        <AddDescription bind:value={eventData.description} />
      </section>
      <section
        class="imgsUpload"
        transition:fly|local={{ duration: 250, x: -30 }}>
        {#if $appStore.addImgs}
          <section
            transition:fly|local={{ duration: 250, x: -30 }}
            on:outroend={() => ($appStore.imgs = true)}>
            <AddImgs bind:imgStripe />
          </section>
        {:else if $appStore.imgs}
          <section
            transition:fly|local={{ duration: 250, x: -300 }}
            on:outroend={() => ($appStore.addImgs = true)}>
            <ImageStripe />
            <div transition:fly|local={{ duration: 250, x: -300 }} />
          </section>
        {/if}
      </section>
      <section
        class="locationPicker"
        transition:fly|local={{ duration: 250, x: -30 }}>
        <LocationPicker />
      </section>
      <section
        class="widgetPicker"
        transition:fly|local={{ duration: 250, x: -30 }}>
        <WidgetPicker on:listbtnclick={handlelistBtnClick} />
      </section>
      {#if listWidgetVisible}
        <section class="widgets" transition:slide|local={{ duration: 250 }}>
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
        <BtnBig
          text={$appStore.languages[0] ? getStr($appStore.languages, 'f994f3') : ''}
          on:bigbtnclick={handleCTABtnClick}
          clipVar={'tertiary-fixed'}
          bind:loading />
      </section>
    {/if}
  </form>
</PageTransition>
