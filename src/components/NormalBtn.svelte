<script>
  import { createEventDispatcher } from "svelte";

  export let text;
  export let type = "normal";

  const dispatch = createEventDispatcher();
</script>

<style>
  .normalBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.8rem 0;
    margin: 0;
    border: none;
    text-decoration: none;
    cursor: pointer;
    text-align: center;
    z-index: 20;
    font-family: var(--font-primary);
    font-weight: 300;
    font-size: 2rem;
    color: var(--color-text-primary);
    background: #0964aa;
    border-radius: 2px;
  }

  .normalCTABtn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0.8rem 0;
    margin: 0;
    border: none;
    text-decoration: none;
    background: transparent;
    cursor: pointer;
    text-align: center;
    z-index: 20;
    font-family: var(--font-primary);
    font-weight: 700;
    font-size: 2rem;
    color: var(--color-text-primary);
    background: #035696;
    border-radius: 2px;
  }
</style>

{#if type.toLowerCase() === 'normal'}
  <button
    class="normalBtn"
    on:click={e => {
      dispatch('normalbtnclick', e);
    }}>
    {text}
  </button>
{:else if type.toLowerCase() === 'cta'}
  <button
    class="normalCTABtn"
    on:click={e => {
      dispatch('ctabtnclick', e);
    }}>
    {text}
  </button>
{:else}{console.error('Types are: normal / CTA')}{/if}
