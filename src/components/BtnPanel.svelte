<script>
  export let clipVar = "";
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
    min-height: 9rem;
    margin-bottom: -3rem;
    padding-top: 4.5rem;
    background: linear-gradient(112.82deg, #0364af 7.85%, #0d8ff2 96.54%);
    clip-path: var(--clip-secondary);
  }

  .pannel--tertiary {
    clip-path: var(--clip-tertiary);
  }

  @media only screen and (min-width: 24em) {
    .pannel {
      clip-path: var(--clip-secondary-fixed);
    }

    .pannel--tertiary-fixed {
      clip-path: var(--clip-tertiary-fixed);
    }
  }

  .btnWrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 3rem;
    width: 90%;
  }
</style>

<div class="pannelWrapper">
  <div class="pannel pannel--{clipVar}">
    <div class="btnWrapper">
      <slot />
    </div>
  </div>
</div>
