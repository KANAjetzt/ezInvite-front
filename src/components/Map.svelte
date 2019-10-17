<script>
  import { onMount } from "svelte";
  import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";

  import { getEventData } from "../stores";
  import Rotate from "./Rotate.svelte";

  let location = getEventData().location;

  onMount(async () => {
    console.log(location.coordinates);

    mapboxgl.accessToken =
      "pk.eyJ1Ijoia2FuYWpldHp0IiwiYSI6ImNrMDZjbHE1ZjBmZ3UzY3FpeHdieTR6cmEifQ.P4335T1qsOc_NhjN_Mfd-g";
    var map = new mapboxgl.Map({
      container: "mapbox",
      style: "mapbox://styles/kanajetzt/ck06cxang246d1dpirijqxubs",
      center: location.coordinates,
      zoom: 12,
      scrollZoom: false
    });

    // const bounds = new mapboxgl.LngLatBounds();

    // Create marker
    const el = document.createElement("div");
    el.className = "marker";

    // const SvgEl = document.createElement("svg");
    // SvgEl.setAttribute("viewBox", "0 0 21 31");
    // SvgEl.setAttribute("width", "21");
    // SvgEl.setAttribute("height", "31");
    // SvgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    // const PathEl = document.createElementNS(
    //   "http://www.w3.org/2000/svg",
    //   "path"
    // );
    // PathEl.setAttribute("fill-rule", "evenodd");
    // PathEl.setAttribute("clip-rule", "evenodd");
    // PathEl.setAttribute("fill", "url(#paint0_linear)");
    // PathEl.setAttribute(
    //   "d",
    //   "M10.5 0.916656C4.85621 0.916656 0.291626 5.48124 0.291626 11.125C0.291626 18.7812 10.5 30.0833 10.5 30.0833C10.5 30.0833 20.7083 18.7812 20.7083 11.125C20.7083 5.48124 16.1437 0.916656 10.5 0.916656ZM3.20827 11.125C3.20827 7.09999 6.47493 3.83332 10.4999 3.83332C14.5249 3.83332 17.7916 7.09999 17.7916 11.125C17.7916 15.325 13.5916 21.6104 10.4999 25.5333C7.4666 21.6396 3.20827 15.2812 3.20827 11.125ZM6.85413 11.125C6.85413 9.11145 8.48642 7.47916 10.5 7.47916C11.8025 7.47916 13.0061 8.17405 13.6573 9.30207C14.3086 10.4301 14.3086 11.8199 13.6573 12.9479C13.0061 14.0759 11.8025 14.7708 10.5 14.7708C8.48642 14.7708 6.85413 13.1385 6.85413 11.125Z"
    // );
    // SvgEl.appendChild(PathEl);

    // const defsEl = document.createElementNS(
    //   "http://www.w3.org/2000/svg",
    //   "defs"
    // );
    // SvgEl.appendChild(defsEl);

    // const linearGradientEl = document.createElementNS(
    //   "http://www.w3.org/2000/svg",
    //   "linearGradient"
    // );

    // linearGradientEl.setAttribute("id", "paint0_linear");
    // linearGradientEl.setAttribute("x1", "10.5");
    // linearGradientEl.setAttribute("y1", "0.916656");
    // linearGradientEl.setAttribute("x2", "10.5");
    // linearGradientEl.setAttribute("y2", "30.0833");
    // linearGradientEl.setAttribute("gradientUnits", "userSpaceOnUse");
    // defsEl.appendChild(linearGradientEl);

    // const stopEl1 = document.createElementNS(
    //   "http://www.w3.org/2000/svg",
    //   "stop"
    // );
    // stopEl1.setAttribute("stop-color", "#0476D0");
    // linearGradientEl.appendChild(stopEl1);

    // const stopEl2 = document.createElementNS(
    //   "http://www.w3.org/2000/svg",
    //   "stop"
    // );
    // stopEl2.setAttribute("offset", "1");
    // stopEl2.setAttribute("stop-color", "#047DD9");
    // stopEl2.setAttribute("stop-opacity", "0.62");
    // linearGradientEl.appendChild(stopEl2);

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: "bottom"
    })
      .setLngLat(location.coordinates)
      .addTo(map);

    // // Extend map boudns to include current location
    // bounds.extend(location.coordinates);

    // map.fitBounds(bounds, {
    //   padding: {
    //     top: 200,
    //     bottom: 150,
    //     left: 100,
    //     right: 100
    //   }
    // });
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
