<script>
  //:TODO Add some animations - zoom in - Marker hover animation
  //:TODO Add Info Box popup on Marker "click"

  import { onMount } from "svelte";
  import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
  import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

  import { eventDataStore } from "../stores.js";
  import SimpleField from "./SimpleField.svelte";

  let location = $eventDataStore.location;

  // Load all the Map / Geocoder stuff
  onMount(async () => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia2FuYWpldHp0IiwiYSI6ImNrNmhsM2g0ZzB4MnIzcW9qdjlnYWg5YXcifQ.NmnlSZKrvSC24BCFL-JmXA";

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
      maxZoom: 14,
      padding: {
        top: 20,
        bottom: 15,
        left: 10,
        right: 10
      }
    });

    map.dragPan.disable();
    map.scrollZoom.disable();

    map.on("touchstart", event => {
      const e = event.originalEvent;
      if (e && "touches" in e) {
        if (e.touches.length > 1) {
          map.dragPan.enable();
        } else {
          map.dragPan.disable();
        }
      }
    });
  });
</script>

<style>
  #mapbox {
    width: 100vw;
    height: 40vw;
    min-height: 33rem;
    box-shadow: -8px -5px 7px 0px hsl(206, 95%, 15%), -4px -5px 0px 0px #000,
      8px 4px 11px 0px hsl(206, 95%, 15%), inset -13px -20px 0px 0px #000,
      2px 4px 0px 0px #000;
    clip-path: var(--clip-primary);
  }

  @media only screen and (min-width: 64em) {
    #mapbox {
      margin-bottom: -9vw;
    }
  }

  :global(.marker) {
    background-image: url("/img/LocationPin.svg");
    background-size: cover;
    width: 25px;
    height: 36px;
    cursor: pointer;
  }
</style>

<div id="mapbox" class="mapbox" />
