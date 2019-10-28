<script>
  //:TODO Add some animations - zoom in - Marker hover animation
  //:TODO Add Info Box popup on Marker "click"

  import { onMount } from "svelte";
  import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
  import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

  import Rotate from "./Rotate.svelte";

  onMount(async () => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia2FuYWpldHp0IiwiYSI6ImNrMDZjcmxmeDM2eGkzY3BrNHFtZDJtZncifQ.y_6ulnsUXBO36UyjTWmzlA";
    var map = new mapboxgl.Map({
      container: "mapbox",
      style: "mapbox://styles/kanajetzt/ck06cxang246d1dpirijqxubs",
      scrollZoom: false
    });

    // Add geolocate control to the map.
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        }
      }),
      "bottom-left"
    );

    // Add location search
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: map
    });

    document.getElementById("geocoder").appendChild(geocoder.onAdd(map));
  });
</script>

<style>
  .mapWrapper {
    overflow: hidden;
    transform: rotate(-9deg) scale(1.2);
    box-shadow: -8px -5px 7px 0px hsl(206, 95%, 15%), -4px -5px 0px 0px #000,
      8px 4px 11px 0px hsl(206, 95%, 15%), inset -13px -20px 0px 0px #000,
      2px 4px 0px 0px #000;
  }

  #mapbox {
    width: 100vw;
    height: 30rem;
    box-shadow: -8px -5px 7px 0px hsl(206, 95%, 15%), -4px -5px 0px 0px #000,
      8px 4px 11px 0px hsl(206, 95%, 15%), inset -13px -20px 0px 0px #000,
      2px 4px 0px 0px #000;
  }

  .overlay {
    margin-bottom: -7rem;
  }
  .geocoderBG {
    width: 100vw;
    height: 12rem;
    background: var(--color-primary);
    z-index: 20;
    transform: rotate(-9deg) scale(1.1);
  }

  :global(.marker) {
    background-image: url("img/LocationPin.svg");
    background-size: cover;
    width: 15px;
    height: 21px;
    cursor: pointer;
  }

  :global(.mapboxgl-ctrl-logo),
  :global(.mapboxgl-ctrl-attrib) {
    display: none !important;
  }

  :global(.geocoder) {
    margin-top: -7rem;
    z-index: 20;
  }

  :global(.mapboxgl-ctrl-geocoder) {
    display: grid;
    grid-template-rows: min-content min-content;
    grid-template-columns: min-content 1fr min-content;
    align-items: center;
    margin-top: 2rem;
    border-bottom: solid 1px var(--color-secondary);
  }

  :global(.mapboxgl-ctrl-geocoder--icon) {
    fill: #eee;
    width: 2.5rem;
    height: 2.5rem;
  }

  :global(.mapboxgl-ctrl-geocoder--icon-search) {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    padding-left: 1.5rem;
  }

  :global(.mapboxgl-ctrl-geocoder--pin-right) {
    grid-row: 1 / 2;
    grid-column: 3 / 4;
    padding-right: 1.5rem;
  }

  :global(.mapboxgl-ctrl-geocoder--icon-loading) {
    display: none;
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
    padding: 1rem 0 1rem 0.7rem;
    font-family: var(--font-primary);
    font-weight: 300;
    font-size: 1.8rem;
    color: var(--color-text-primary);
    background-color: transparent;
    border: none;
    transition: all 0.05s ease-in-out;
  }

  :global(.mapboxgl-ctrl-geocoder--input)::placeholder {
    color: var(--color-text-primary);
    opacity: 0.95;
  }

  :global(.mapboxgl-ctrl-geocoder--input):focus {
    outline: none;
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

<div class="overlay">
  <Rotate child={'.geocoderBG'}>
    <div class="geocoderBG" />
  </Rotate>
</div>

<div id="geocoder" class="geocoder" />
<div id="mapbox" class="mapbox" />
