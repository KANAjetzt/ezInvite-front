<style>
  .pannel {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 13rem;
    margin-bottom: -3rem;
    background: linear-gradient(112.82deg, #0364af 7.85%, #0d8ff2 96.54%);
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  }

  .btnWrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    width: 75%;
    transform: rotate(9deg);
  }
</style>

<div class="pannel">
  <div class="btnWrapper">
    <slot />
  </div>
</div>
