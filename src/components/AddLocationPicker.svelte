<script>
  //:TODO Add some animations - zoom in - Marker hover animation
  //:TODO Add Info Box popup on Marker "click"

  import { onMount } from "svelte";
  import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
  import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

  import { eventDataStore } from "../stores.js";
  import SimpleField from "./SimpleField.svelte";

  let mounted = false;
  let geocoder;
  let initQuery = false;

  $: if (
    $eventDataStore.location &&
    $eventDataStore.location.address &&
    !initQuery &&
    mounted
  ) {
    geocoder.query($eventDataStore.location.address);
    initQuery = true;
  }

  const updateStore = (key, newValue) => {
    eventDataStore.update(currentData => {
      const newEventData = { ...currentData };
      if (!newEventData.location) newEventData.location = {};
      newEventData.location[key] = newValue;

      return newEventData;
    });
  };

  const handleLocationCustomNameChange = e => {
    // update Store on Value change
    updateStore("name", e.detail);
  };

  const handleLocationDescriptionChange = e => {
    // update Store on Value change
    updateStore("description", e.detail);
  };

  // Load all the Map / Geocoder stuff
  onMount(async () => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia2FuYWpldHp0IiwiYSI6ImNrMDZjcmxmeDM2eGkzY3BrNHFtZDJtZncifQ.y_6ulnsUXBO36UyjTWmzlA";
    var map = new mapboxgl.Map({
      container: "addLocationMapbox",
      style: "mapbox://styles/kanajetzt/ck06cxang246d1dpirijqxubs",
      scrollZoom: false
    });

    // Add location search
    geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Where is your event?"
    });

    document.getElementById("geocoder").appendChild(geocoder.onAdd(map));

    geocoder.on("result", e => {
      // ! 🤠 Updating the store with bouth values in one go would be nice 🤠 !
      // cordinates
      updateStore("coordinates", e.result.center);
      // location Name
      updateStore("address", e.result.place_name);
    });

    // add button type to "clear" button (that one is invisible any way)
    // this is needed so the enter key is not attracted to the gecodoer
    document
      .querySelector(".mapboxgl-ctrl-geocoder--button")
      .setAttribute("type", "button");

    mounted = true;
  });
</script>

<style>
  #addLocationMapbox {
    width: 100vw;
    height: 40vw;
    min-height: 40rem;
    box-shadow: -8px -5px 7px 0px hsl(206, 95%, 15%), -4px -5px 0px 0px #000,
      8px 4px 11px 0px hsl(206, 95%, 15%), inset -13px -20px 0px 0px #000,
      2px 4px 0px 0px #000;
    clip-path: var(--clip-primary);
  }

  @media only screen and (min-width: 64em) {
    #addLocationMapbox {
      /* Breaks stuff when imgs get added to imgstripe */
      /* margin-top: -9vw; */
    }
  }

  .title {
    font-family: var(--font-primary);
    font-weight: 700;
    font-size: 1.4rem;
    letter-spacing: 0.5px;
    color: var(--color-text-primary);
    padding-left: 1.5rem;
  }

  .geocoder {
    position: relative;
    width: 100vw;
    margin-top: 1.5rem;
    background: var(--color-primary);
    z-index: 20;
  }

  .locationName,
  .locationDescription {
    margin-top: 2rem;
  }

  :global(.mapboxgl-ctrl-logo),
  :global(.mapboxgl-ctrl-attrib) {
    display: none !important;
  }

  :global(.mapboxgl-ctrl-geocoder) {
    position: relative;
    display: grid;
    grid-template-rows: min-content min-content;
    grid-template-columns: min-content 1fr min-content;
    align-items: center;
    margin-top: 0.75rem;
    z-index: 25;
  }

  :global(.mapboxgl-ctrl-geocoder--icon) {
    fill: #eee;
    width: 2.5rem;
    height: 2.5rem;
  }

  :global(.mapboxgl-ctrl-geocoder--icon-search) {
    /* grid-row: 1 / 2;
    grid-column: 1 / 2;
    padding-left: 1.5rem; */

    display: none;
  }

  :global(.mapboxgl-ctrl-geocoder--pin-right) {
    display: none !important;
    /* grid-row: 1 / 2;
    grid-column: 3 / 4;
    padding-right: 1.5rem;
    padding-bottom: 1rem; */
  }

  :global(.mapboxgl-ctrl-geocoder--icon-loading) {
    display: none !important;
  }

  :global(.mapboxgl-ctrl-geocoder--button) {
    padding: 0;
    margin: 0;
    border: none;
    cursor: pointer;
    background: transparent;
    line-height: 1;
  }

  :global(.mapboxgl-ctrl-geocoder--button):focus {
    outline: none;
    fill: hsl(0, 0%, 80%);
  }

  :global(.mapboxgl-ctrl-geocoder--input) {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    width: calc(100% - 3rem);
    padding: 0 1.5rem 1rem 1.5rem;
    font-family: var(--font-primary);
    font-weight: 300;
    font-size: 1.8rem;
    color: var(--color-text-primary);
    background-color: transparent;
    border: none;
    box-shadow: 0 1px 0 var(--color-secondary);
    transition: all 0.05s ease-in-out;
  }

  :global(.mapboxgl-ctrl-geocoder--input)::placeholder {
    color: var(--color-text-primary);
    opacity: 0.95;
  }

  :global(.mapboxgl-ctrl-geocoder--input):focus {
    outline: none;
    box-shadow: 0 3px 0 var(--color-secondary);
  }

  :global(.suggestions-wrapper) {
    grid-row: 2 / 3;
    grid-column: 1 / 4;
  }

  :global(.suggestions) {
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1.5rem 1fr 1.5rem;
    list-style: none;
    position: absolute;
    width: 100vw;
    background: var(--color-primary);
  }

  :global(.mapboxgl-ctrl-geocoder--suggestion) {
    padding: 1rem 2rem;
  }

  :global(.mapboxgl-ctrl-geocoder--suggestion-title) {
    font-family: var(--font-primary);
    font-weight: 700;
    font-size: 1.6rem;
    color: var(--color-text-primary);
  }
  :global(.mapboxgl-ctrl-geocoder--suggestion-address) {
    font-family: var(--font-primary);
    font-weight: 300;
    font-size: 1.6rem;
    color: var(--color-text-primary);
  }
</style>

<div id="addLocationMapbox" class="mapbox" />
<div id="geocoder" class="geocoder">
  <span class="title">Location Address</span>
</div>

<div class="locationName">
  <SimpleField
    name={'locationCustomName'}
    heading={'Location Name'}
    placeholder={$eventDataStore.location && $eventDataStore.location.name ? $eventDataStore.location.name : 'Name your location..'}
    on:simplefieldchange={handleLocationCustomNameChange} />
</div>
<div class="locationDescription">
  <SimpleField
    name={'locationDescription'}
    heading={'Location Description'}
    placeholder={$eventDataStore.location && $eventDataStore.location.description ? $eventDataStore.location.description : 'Describe your location..'}
    on:simplefieldchange={handleLocationDescriptionChange} />
</div>
