<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import {
    disableBodyScroll,
    enableBodyScroll,
    clearAllBodyScrollLocks
  } from "body-scroll-lock";

  export let ignoreClickClasses;

  const dispatch = createEventDispatcher();

  const clickOutsideHandler = e => {
    if (e.target.closest(ignoreClickClasses)) return;
    dispatch("clickoutside");
  };

  onMount(() => {
    document.addEventListener("click", clickOutsideHandler);

    const overlay = document.querySelector(".overlay");
    // disableBodyScroll(overlay);

    return () => {
      document.removeEventListener("click", clickOutsideHandler);
      // enableBodyScroll(overlay);
    };
  });
</script>

<style>
  .overlay {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 6666;
    backdrop-filter: blur(5px);
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  @media only screen and (min-width: 36em) {
    .overlay {
      align-items: center;
    }
  }
</style>

<div transition:fade={{ duration: 200 }} class="overlay">
  <slot />
</div>
