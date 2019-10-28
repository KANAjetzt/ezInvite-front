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
    height: 20rem;
    box-shadow: -8px -5px 7px 0px hsl(206, 95%, 15%), -4px -5px 0px 0px #000,
      8px 4px 11px 0px hsl(206, 95%, 15%), inset -13px -20px 0px 0px #000,
      2px 4px 0px 0px #000;
  }

  :global(.marker) {
    background-image: url("img/LocationPin.svg");
    background-size: cover;
    width: 15px;
    height: 21px;
    cursor: pointer;
  }
</style>

<div id="geocoder" class="geocoder" />
<div id="mapbox" class="mapbox" />
