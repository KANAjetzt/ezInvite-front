<script>
  export let minusMargin;
  export let pannelHeight = 13;
  export let clipVar = "secondary";
</script>

<style>
  .pannelWrapper {
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25));
    /* I think on AddEvent this fixed something */
    /* height: 100%; */
  }
  .pannel {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: -3rem;
    padding-top: 3.5rem;
    background: linear-gradient(112.82deg, #0364af 7.85%, #0d8ff2 96.54%);
  }

  .btnWrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 3rem;
    width: 90%;
  }
</style>

<div class="pannelWrapper">
  <div
    class="pannel"
    style="height: {pannelHeight}rem; clip-path: var(--clip-{clipVar});">
    <div class="btnWrapper">
      <slot />
    </div>
  </div>
</div>
