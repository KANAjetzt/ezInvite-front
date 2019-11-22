<script>
  let visible = true;
  let clickCounter = 0;

  const outsideClickListener = e => {
    console.log(e.target.closest(".personProfile"));
    console.log(clickCounter);
    if (e.target.closest(".personProfile")) return;
    if (clickCounter > 0) visible = false;
    clickCounter++;
  };

  $: if (!visible && clickCounter > 0) clickCounter = 0;

  // TODO: Figure out if this is a good idear
  // Maybe it's better to handle this in the component that uses
  // the overlay.
  document.addEventListener("click", outsideClickListener);
</script>

<style>
  .overlay {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 300;
    backdrop-filter: blur(5px);
  }

  .element {
    z-index: 500;
  }
</style>

{console.log(visible)}
{#if visible}
  <div class="overlay">
    <slot class="element" />
  </div>
{/if}
