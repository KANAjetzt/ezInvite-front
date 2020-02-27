<script>
  import { fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  import { eventDataStore, appStore } from "../stores";
  import CalendarIcon from "./Icons/Calendar.svelte";
  import LocationPinIcon from "./Icons/LocationPin.svelte";
  import Date from "./Date.svelte";
  import RemoveBtn from "./BtnRemove.svelte";

  export let bgImage =
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80";

  const dispatch = createEventDispatcher();

  let eventData;

  eventDataStore.subscribe(newValue => {
    eventData = newValue;
  });
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
</style>

{#if $appStore.currentPage === 'event'}
  <div class="topBar" />
{/if}

<header
  class="hero"
  style="background-image: linear-gradient( 89.87deg, hsla(206, 96%, 25%, 0.85)
  -2.53%, hsla(206, 96%, 25%, 0.85) 112.27% ), url('{bgImage}')"
  transition:fly={{ duration: 250, y: -300 }}
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
  <RemoveBtn
    marginLeft={1}
    marginTop={-2.9}
    on:removebtnclick={() => dispatch('removebtnclick')} />
{/if}
