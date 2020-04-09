<script>
  export let photo = `${svelteEnv.frontUrl}/img/default.jpg`;
  export let name = "unknown user";
  export let count = undefined;
  export let imgStyle = "";

  const handleImgSrc = photo => {
    // default img
    if (
      photo === null ||
      photo === undefined ||
      photo.split("/")[photo.split("/").length - 1] === "default.jpg"
    ) {
      return `${svelteEnv.frontUrl}/img/default.jpg`;
    }

    // data base64 stored img
    if (photo.startsWith("data:")) return photo;

    // cloudinary img
    return `${svelteEnv.cloudinaryUrl}w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1586436644/${photo}`;
  };
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
    src={handleImgSrc(photo)}
    alt={`Profile image of ${name}`} />
  {#if count}
    <span class="count">{count}..</span>
  {/if}
</div>
