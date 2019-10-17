<script>
  //:TODO Add some animations - zoom in - Marker hover animation
  //:TODO Add Info Box popup on Marker "click"

  import { onMount } from "svelte";
  import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";

  import { getEventData } from "../stores";
  import Rotate from "./Rotate.svelte";

  let location = getEventData().location;

  onMount(async () => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia2FuYWpldHp0IiwiYSI6ImNrMDZjbHE1ZjBmZ3UzY3FpeHdieTR6cmEifQ.P4335T1qsOc_NhjN_Mfd-g";
    var map = new mapboxgl.Map({
      container: "mapbox",
      style: "mapbox://styles/kanajetzt/ck06cxang246d1dpirijqxubs",
      center: location.coordinates,
      zoom: 12,
      scrollZoom: false
    });

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
    transform: rotate(9deg) scale(1.3);
    width: 100vw;
    height: 20rem;
  }

  :global(.marker) {
    background-image: url("img/LocationPin.svg");
    background-size: cover;
    width: 15px;
    height: 21px;
    cursor: pointer;
  }
</style>

<Rotate child={'.mapWrapper'}>
  <div class="mapWrapper">
    <div id="mapbox" />
  </div>
</Rotate>
