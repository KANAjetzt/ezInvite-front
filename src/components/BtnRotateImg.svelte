<script>
  import { createEventDispatcher } from "svelte";

  import CrossIcon from "./Icons/Cross.svelte";
  import RotateIcon from "../components/Icons/RotateLeft.svelte";

  export let marginTop = 0;
  export let marginLeft = 0;
  export let width = 25;
  export let height = 25;

  const dispatch = createEventDispatcher();

  // Remove Preview Img --> simple dispatch an event and handle it where it get used.
  const handleRotateBtn = e => {
    e.preventDefault();
    dispatch("rotatebtnclick");
  };
</script>

<style>
  .rotateBtn {
    display: flex;
    align-items: center;
    border: none;
    padding: 0;
    text-decoration: none;
    background: transparent;
    cursor: pointer;
    text-align: center;
    z-index: 20;
  }
</style>

<button
  type="button"
  class="rotateBtn"
  on:click={e => handleRotateBtn(e)}
  style={`margin-top: ${marginTop}rem; margin-left: ${marginLeft}rem`}>

  <RotateIcon {width} {height} fill={'#f9fafb'} bg={true} />
</button>
