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
    z-index: 200;
    backdrop-filter: blur(5px);
  }

  .element {
    z-index: 500;
  }
</style>

<div class="overlay">
  <slot class="element" />
</div>
