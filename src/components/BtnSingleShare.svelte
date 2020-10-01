<script>
  import { createEventDispatcher } from "svelte";

  import ShareIcon from "./Icons/Share.svelte";

  export let marginTop = 0;
  export let marginLeft = 0;
  export let width = 25;
  export let height = 25;

  const dispatch = createEventDispatcher();

  // Remove Preview Img --> simple dispatch an event and handle it where it get used.
  const handleSingleShareBtn = e => {
    e.preventDefault();
    dispatch("singlesharebtnclick");
  };
</script>

<style>
  .singleShareBtn {
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
  class="singleShareBtn"
  on:click={e => handleSingleShareBtn(e)}
  style={`margin-top: ${marginTop}rem; margin-left: ${marginLeft}rem`}>
  <ShareIcon {width} {height} fill={'#f9fafb'} bg={true} />
</button>
