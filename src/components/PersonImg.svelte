<script>
  export let photo = `${svelteEnv.frontUrl}/img/default.jpg`;
  export let name = "unknown user";
  export let count = undefined;
  export let imgStyle = "";
</script>

<style>
  .imgBox {
    display: grid;
    grid-template-columns: 4.5rem;
    grid-template-rows: 4.5rem;
    align-items: center;
    justify-items: center;
    border: solid 4px var(--color-primary);
    border-radius: 100%;
    overflow: hidden;
    z-index: 2;
    margin-left: -1rem;
  }

  .img {
    width: 110%;
    object-fit: cover;
    z-index: 200;
  }

  .img--addPersonThing {
    filter: brightness(0.6);
    grid-row: 1 / 2;
    grid-column: 1 / 2;
  }

  .count {
    font-size: 1.5rem;
    font-family: var(--font-primary);
    font-weight: 700;
    color: var(--color-text-primary);
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    text-align: center;
    z-index: 250;
  }
</style>

<div class="imgBox">
  <img
    class={`img img--${imgStyle}`}
    src={photo === null || photo === undefined ? `${svelteEnv.frontUrl}/img/default.jpg` : photo}
    alt={`Profile image of ${name}`} />
  {#if count}
    <span class="count">{count}..</span>
  {/if}
</div>
