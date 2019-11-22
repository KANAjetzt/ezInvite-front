<script>
  import DescriptionBox from "./DescriptionBox.svelte";
  import BtnMinified from "./BtnMinified.svelte";
  import BtnRespond from "./BtnRespond.svelte";

  let visible = false;
</script>

<style>
  .respond {
    position: fixed;
    bottom: 10rem;
    z-index: 200;
    display: grid;
    grid-template-rows: min-content 1fr min-content;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100vw;
  }

  .descriptionBox {
    grid-row: 1 / 2;
    grid-column: 1 / 3;
  }
</style>

<div class="respond">
  {#if !visible}
    <BtnMinified
      on:minifiedbtnclick={() => {
        visible = !visible;
      }} />
  {:else}
    <div class="descriptionBox">
      <DescriptionBox title={'Respond to your invite'} />
    </div>
    <BtnRespond
      on:minifibtnclick={() => {
        visible = !visible;
      }} />
  {/if}
</div>
