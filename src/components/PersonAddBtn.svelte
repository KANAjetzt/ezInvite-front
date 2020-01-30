<script>
  import { createEventDispatcher } from "svelte";

  import PersonImg from "./PersonImg.svelte";
  import PlusIcon from "./Icons/Plus.svelte";

  export let photo = undefined;
  export let name = undefined;
  export let iconStyle =
    "z-index: 20; opacity: 0.7; transform: translateX(-0.6rem); grid-column: 1 / 2; grid-row: 1 / 2;";
  export let imgStyle = "";
  export let index;

  const dispatch = createEventDispatcher();
</script>

<style>
  .btnContent {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    align-items: center;
    justify-items: center;
  }

  .imgWrapper {
    width: 4.5rem;
    height: auto;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }

  .addBtn {
    display: flex;
    align-items: center;
    border: none;
    padding: 0;
    margin: 0;
    text-decoration: none;
    background: transparent;
    cursor: pointer;
    text-align: center;
    z-index: 20;
  }
</style>

<button
  type="button"
  class="addBtn"
  on:click={e => {
    dispatch('personaddbtnclick', { index: index, originalEvent: e });
  }}>
  <div class="btnContent">
    <PlusIcon style={iconStyle} width={20} height={20} fill={'#f9fafb'} />
    <div class="imgWrapper">
      <PersonImg {photo} {name} {imgStyle} />
    </div>
  </div>
</button>
