<script>
  import { createEventDispatcher } from "svelte";

  import CrossIcon from "./Icons/Cross.svelte";

  export let marginTop = 0;
  export let marginLeft = 0;

  const dispatch = createEventDispatcher();

  // Remove Preview Img --> simple dispatch an event and handle it on AddEvent Component.
  const handleremoveBtn = () => {
    dispatch("heroimgremove");
  };
</script>

<style>
  .removeBtn {
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
  class="removeBtn"
  on:click={() => handleremoveBtn()}
  style={`margin-top: ${marginTop}rem; margin-left: ${marginLeft}rem`}>
  <CrossIcon width={25} height={25} fill={'#f9fafb'} bg={true} />
</button>
