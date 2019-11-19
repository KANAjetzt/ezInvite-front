<script>
  import Rotate from "./Rotate.svelte";

  export let minusMargin;
  export let pannelHeight = 13;
</script>

<style>
  .pannel {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: -3rem;
    background: linear-gradient(112.82deg, #0364af 7.85%, #0d8ff2 96.54%);
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    transform: rotate(-9deg) scale(1.1);
  }

  .btnWrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    width: 75%;
    transform: rotate(9deg);
  }
</style>

<Rotate child={'.pannel'} {minusMargin}>
  <div class="pannel" style="height: {pannelHeight}rem;">
    <div class="btnWrapper">
      <slot />
    </div>
  </div>
</Rotate>
