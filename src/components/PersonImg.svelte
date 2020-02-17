<script>
  export let photo = `${svelteEnv.frontUrl}/img/default.jpg`;
  export let name = "unknown user";
  export let count = undefined;
  export let imgStyle = "";
</script>

<style>
  .imgBox {
    max-width: 4.5rem;
    max-height: 4.5rem;
    border: solid 4px var(--color-primary);
    border-radius: 100%;
    overflow: hidden;
    z-index: 2;
    margin-left: -1rem;
  }

  .img {
    width: 100%;
    object-fit: cover;
  }

  .img--addPersonThing {
    filter: brightness(0.6);
  }

  .count {
    position: absolute;
    transform: translate(-135%, 78%);
    font-size: 1.5rem;
    font-family: var(--font-primary);
    font-weight: 700;
    color: var(--color-text-primary);
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
