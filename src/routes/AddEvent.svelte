<script>
  import { getClient, mutate } from "svelte-apollo";
  import { gql } from "apollo-boost";
  import { Router, Route, navigate } from "svelte-routing";

  import { eventDataStore } from "../stores.js";
  import AddHeroImg from "../components/AddHeroImg.svelte";
  import Hero from "../components/Hero.svelte";
  import RemoveBtn from "../components/BtnRemove.svelte";
  import SimpleField from "../components/SimpleField.svelte";
  import Rotate from "../components/Rotate.svelte";
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

  let eventData = {};
  let heroImgPreview;
  let imgStripe;

  eventDataStore.subscribe(newData => {
    console.log(newData);
    eventData = newData;
    console.log(eventData);
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
        }
      }
    }
  `;

  // Render all Form Fields not shown by default
  const handleNormalBtnClick = e => {
    e.detail.preventDefault();
    moreVisible = true;
  };

  // Remove Hero Img Preview
  const handleHeroImgRemove = e => {
    heroImgPreview = undefined;
  };

  // Deal with form data
  const handleCTABtnClick = async e => {
    e.detail.preventDefault();

    const currentInput = { ...eventData };

    // prepare input Data
    const input = {
      name: currentInput.name,
      startDate: currentInput.startDate,
      startTime: `${currentInput.startHoure}:${currentInput.startMinute}`,
      endTime: `${currentInput.endHoure}:${currentInput.endMinute}`,
      description: currentInput.description
    };

    console.log(input);

    // Send tilte and date to backend
    const newEventData = await mutate(client, {
      mutation: CREATEEVENT,
      variables: { input }
    });

    // Update Event Data store
    eventDataStore.set(newEventData.data.createEvent.event);

    navigate("/event");
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
    /* With fields over one Page space-between doesen't work well */
    /* justify-content: space-between; */
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
  }

  .selectBtns {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100vw;
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
  <form class="form">
    <section class="heroImg">
      {#if !heroImgPreview}
        <AddHeroImg bind:heroImgPreview />
      {:else}
        <Hero bgImage={heroImgPreview} />
        <RemoveBtn
          marginLeft={1}
          marginTop={-2.9}
          on:heroimgremove={() => handleHeroImgRemove()} />
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
          <SimpleField
            name={'Date'}
            heading={'Date'}
            placeholder={'When does it start?'}
            bind:value={eventData.startDate} />
        </div>
      </div>
    </section>
    {#if !moreVisible}
      <section class="selectBtns">
        <BtnPanel minusMargin={2.5}>
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
          bind:startHoure={eventData.startHoure}
          bind:startMinute={eventData.startMinute}
          bind:endHoure={eventData.endHoure}
          bind:endMinute={eventData.endMinute} />
      </section>
      <section class="description">
        <AddDescription bind:value={eventData.description} />
      </section>
      <section class="imgsUpload">
        <AddImgs bind:imgStripe />
        {#if eventData.imgs}
          <ImageStripe />
        {/if}
      </section>
      <section class="locationPicker">
        <LocationPicker />
      </section>
      <section class="widgetPicker">
        <WidgetPicker />
      </section>
      <section class="widgets">
        <AddWidgets />
      </section>
      <section>
        <BtnBig text={'GO !'} on:bigbtnclick={handleCTABtnClick} />
      </section>
    {/if}

  </form>
</Router>
