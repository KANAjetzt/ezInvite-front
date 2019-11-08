<script>
  export let photo = "http://localhost:3000/img/user/default.jpg";
  export let name = "unknown user";
  export let count = undefined;
</script>

<style>
  .imgBox {
    width: 4.5rem;
    height: 4.5rem;
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
  <img class="img" src={photo} alt={`Profile image of ${photo}`} />
  {#if count}
    <span class="count">{count}..</span>
  {/if}
</div>
