<script>
  import { createEventDispatcher } from "svelte";

  import PersonImg from "./PersonImg.svelte";
  import PlusIcon from "./Icons/Plus.svelte";

  export let photo = "default.jpg";
  export let name = "unknown user";
  export let iconStyle =
    "z-index: 20; transform: translateX(135%); opacity: 0.7;";

  const dispatch = createEventDispatcher();
</script>

<style>
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
  class="addBtn"
  on:click={e => {
    dispatch('personaddbtnclick', e);
  }}>
  <PlusIcon style={iconStyle} width={20} height={20} fill={'#f9fafb'} />
  <PersonImg />
</button>
