<script>
  import { createEventDispatcher } from "svelte";

  import BtnPanel from "./BtnPanel.svelte";
  import Loader from "./Loader.svelte";

  export let text;
  export let fontSize = 6.4;
  export let pannelHeight = 25;
  export let clipVar = "secondary";
  export let loading = false;

  const dispatch = createEventDispatcher();
</script>

<style>
  .bigBtn {
    padding: 0.8rem 0;
    margin: 0;
    grid-column: 1 / 3;
    border: none;
    text-decoration: none;
    background: transparent;
    cursor: pointer;
    text-align: center;
    z-index: 20;
    font-family: var(--font-primary);
    font-weight: 700;
    font-size: 6.4rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    color: var(--color-text-primary);
  }

  .loaderWrapper {
    grid-column: span 2;
  }
</style>

<BtnPanel {pannelHeight} {clipVar}>
  {#if !loading}
    <button
      class="bigBtn"
      style="font-size: {fontSize}rem;"
      on:click={e => {
        dispatch('bigbtnclick', e);
      }}>
      {text}
    </button>
  {:else}
    <div class="loaderWrapper">
      <Loader />
    </div>
  {/if}
</BtnPanel>
