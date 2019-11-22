<script>
  import DescriptionBox from "./DescriptionBox.svelte";
  import BtnRespond from "./BtnRespond.svelte";
</script>

<style>
  .respond {
    position: fixed;
    bottom: 10rem;
    z-index: 200;
    display: grid;
    grid-template-rows: min-content 1fr;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .descriptionBox {
    grid-row: 1 / 2;
    grid-column: 1 / 3;
  }
</style>

<div class="respond">
  <div class="descriptionBox">
    <DescriptionBox title={'Respond to your invite'} />
  </div>
  <BtnRespond />
</div>
