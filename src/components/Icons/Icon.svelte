<script>
  export let width;
  export let height;
  export let bg = false;
</script>

<style>
  .bg {
    display: flex;
    align-items: center;
    justify-content: center;

    background-image: linear-gradient(
      155.22deg,
      #0476d0 -3.82%,
      #047dd9 104.08%
    );
    border-radius: 100%;
  }
</style>

{#if bg}
  <div
    class="bg"
    style="width: {width < 50 ? width + 10 : width + 20}px; height: {width < 50 ? width + 10 : width + 20}px;">
    <slot />
  </div>
{:else}
  <slot />
{/if}
