<script>
  //TODO: - Maybe add something to adjust heigh of box when Browser size changes
  //TODO: - Add something to calculate a negative margin so 2 Rotate Components dont get
  //        seperated to muche.

  import { afterUpdate } from "svelte";

  export let child;
  export let minusMargin = 0;
  let childHeight;
  let ready = false;

  // Sets the height of the parent Box according to the height of the rotated child
  // let ready is used to animate the Image Stripe in when the with is set
  // The Timeout is required - images need to load bevor the height can be acquired
  afterUpdate(() => {
    setTimeout(() => {
      childHeight = document.querySelector(child).getBoundingClientRect()
        .height;
      ready = true;
    }, 100);
  });
</script>

<style>
  .rotateBox {
    display: flex;
    align-items: center;
    overflow: hidden;
    opacity: 0;
    transition: all 0.3s ease-in;
  }
</style>

<div
  class="rotateBox"
  style="height:{childHeight}px; opacity:{ready ? 1 : 0}; margin-bottom: {`-${minusMargin}rem`}">
  <slot />
</div>
