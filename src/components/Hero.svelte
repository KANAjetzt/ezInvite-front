<script>
  import { fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  import handleImgSrc from "../utils/handleImgSrc.js";
  import rotateImg from "../utils/rotateImage.js";
  import { eventDataStore, appStore } from "../stores";
  import CalendarIcon from "./Icons/Calendar.svelte";
  import LocationPinIcon from "./Icons/LocationPin.svelte";
  import Date from "./Date.svelte";
  import RemoveBtn from "./BtnRemove.svelte";
  import RotateBtn from "../components/BtnRotateImg.svelte";

  export let bgImage;

  const dispatch = createEventDispatcher();

  let eventData;

  eventDataStore.subscribe(newValue => {
    eventData = newValue;
  });

  const handleRotateBtn = async () => {
    const [file, dataUrl] = await rotateImg($eventDataStore.pureHeroImg);
    $eventDataStore.pureHeroImg = file;
    $eventDataStore.heroImgPreview = dataUrl;
  };
</script>

<style>
  .hero {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    padding-bottom: 10rem;
    clip-path: polygon(0 0, 100% 0, 100% 85%, 0% 100%);
    background-size: cover;
    min-height: 20vh;
    height: 20vw;
  }

  .topBar {
    width: 100%;
    height: 0.5rem;
    background-image: linear-gradient(
      89.87deg,
      #0476d0 -2.53%,
      #047dd9 112.27%
    );
  }
  h1,
  p {
    font-family: var(--font-primary);
    font-weight: 400;
    color: var(--color-text-primary);
    margin: 0;
  }

  h1 {
    text-transform: uppercase;
    text-align: center;
    padding: 1rem 4rem;
  }

  .title {
    align-self: center;
    background-image: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.2) 0%,
        rgba(255, 255, 255, 0) 100%
      ),
      linear-gradient(
        180deg,
        rgba(4, 118, 208, 0) 0%,
        rgba(4, 118, 208, 0.5) 100%
      );
  }

  p {
    font-size: 1.6rem;
    margin-left: 0.5rem;
  }

  .info {
    margin-top: 2rem;
    display: flex;
    justify-content: space-evenly;
  }

  .box {
    display: flex;
    align-items: center;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    padding: 0 1.5rem;
  }
</style>

{#if $appStore.currentPage === 'event'}
  <div class="topBar" />
{/if}

<header
  class="hero"
  style="background-image: linear-gradient( 89.87deg, hsla(206, 96%, 25%, 0.85)
  -2.53%, hsla(206, 96%, 25%, 0.85) 112.27% ), url('{handleImgSrc(bgImage)}')"
  transition:fly={$appStore.currentPage === 'addEvent' ? { duration: 250, y: -300 } : { duration: 0 }}
  on:outroend={() => dispatch('outroend')}>

  {#if eventData.name}
    <div class="title">
      <h1>{eventData.name}</h1>
    </div>
  {/if}
  {#if eventData.startDate || (eventData.location && eventData.location.name)}
    <div class="info">
      <div class="box">
        <CalendarIcon width={16} height={16} fill={'#f9fafb'} />
        {#if eventData.startDate}
          <p>
            <Date timeStamp={eventData.startDate} />
          </p>
        {/if}
      </div>
      {#if eventData.location && eventData.location.name}
        <div class="box">
          <LocationPinIcon width={16} height={16} fill={'#f9fafb'} />
          <p>{eventData.location.name}</p>
        </div>
      {/if}
    </div>
  {/if}
</header>

<!-- If on AddEvent or EditEvent Page show RemoveBtn -->
{#if $appStore.currentPage === 'editEvent' || $appStore.currentPage === 'addEvent'}
  <div class="buttons">
    <RemoveBtn
      marginTop={-2.9}
      on:removebtnclick={() => dispatch('removebtnclick')} />
    <RotateBtn marginTop={-9.5} on:rotatebtnclick={handleRotateBtn} />
  </div>
{/if}
