<script>
  //:TODO Add some animations - zoom in - Marker hover animation
  //:TODO Add Info Box popup on Marker "click"

  import { onMount } from "svelte";
  import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
  import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

  import { eventDataStore } from "../stores.js";
  import Rotate from "./Rotate.svelte";
  import SimpleField from "./SimpleField.svelte";

  let location = $eventDataStore.location;

  // Load all the Map / Geocoder stuff
  onMount(async () => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia2FuYWpldHp0IiwiYSI6ImNrMDZjcmxmeDM2eGkzY3BrNHFtZDJtZncifQ.y_6ulnsUXBO36UyjTWmzlA";

    var map = new mapboxgl.Map({
      container: "mapbox",
      style: "mapbox://styles/kanajetzt/ck06cxang246d1dpirijqxubs",
      scrollZoom: false
    });

    const bounds = new mapboxgl.LngLatBounds();

    // Create marker
    const el = document.createElement("div");
    el.className = "marker";

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: "bottom"
    })
      .setLngLat(location.coordinates)
      .addTo(map);

    // Extend map boudns to include current location
    bounds.extend(location.coordinates);

    map.fitBounds(bounds, {
      maxZoom: 12,
      padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100
      }
    });
  });
</script>

<style>
  #mapbox {
    width: 100vw;
    height: 40rem;
    box-shadow: -8px -5px 7px 0px hsl(206, 95%, 15%), -4px -5px 0px 0px #000,
      8px 4px 11px 0px hsl(206, 95%, 15%), inset -13px -20px 0px 0px #000,
      2px 4px 0px 0px #000;
    clip-path: polygon(0 15%, 100% 0, 100% 85%, 0% 100%);
  }

  :global(.marker) {
    background-image: url("img/LocationPin.svg");
    background-size: cover;
    width: 25px;
    height: 36px;
    cursor: pointer;
  }
</style>

<div id="mapbox" class="mapbox" />
