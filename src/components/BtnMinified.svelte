<script>
  import { createEventDispatcher } from "svelte";

  import ArrowIcon from "./Icons/Arrow.svelte";

  const dispatch = createEventDispatcher();
</script>

<style>
  .btnMinified {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    border: none;
    cursor: pointer;
    text-decoration: none;
    background: rgba(4, 103, 179, 0.5);
    clip-path: polygon(0 0, 100% 0, 0% 100%, 0 100%);
    padding: 1rem 3rem 6rem 1.5rem;
    width: 56%;
  }
</style>

<button
  class="btnMinified"
  on:click={e => {
    dispatch('minifiedbtnclick', e);
  }}>
  <ArrowIcon height={30} width={30} fill={'#000'} fillOpacity={0.4} />
</button>
