<script>
  //TODO: Maybe add something to adjust heigh of box when Browser size changes
  import { beforeUpdate, afterUpdate } from "svelte";

  import { getEventData } from "../stores";

  let eventData = getEventData();
  let imageStripeHeight;
  let ready = false;

  // Sets the height of the Image Stripe parent Box
  // ready is used to animate the Image Stripe in when the with is set
  // The Timeout is required - images need to load bevor the height can be acquired
  afterUpdate(() => {
    setTimeout(() => {
      imageStripeHeight = document
        .querySelector(".imageStripe")
        .getBoundingClientRect().height;
      console.log(imageStripeHeight);
      ready = true;
    }, 10);
  });
</script>

<style>
  .box {
    display: flex;
    align-items: center;
    overflow: hidden;
    opacity: 0;
    transition: all 0.3s ease-in;
  }

  .imageStripe {
    display: grid;
    grid-template-columns: 1fr 1fr;
    transform: rotate(-9deg) scale(1.2);
    box-shadow: -8px -5px 7px 0px hsl(206, 95%, 15%), -4px -5px 0px 0px #000,
      8px 4px 11px 0px hsl(206, 95%, 15%), inset -13px -20px 0px 0px #000,
      2px 4px 0px 0px #000;
  }
  .img {
    width: 100%;
    height: 110%;
    object-fit: cover;
  }
</style>

<div class="box" style="height:{imageStripeHeight}px; opacity:{ready ? 1 : 0}">
  <section class="imageStripe">
    {#each eventData.imgs as img}
      <div class="imgBox">
        <img
          class="img"
          src="http://localhost:3000/img/{img}"
          alt="Will be added later via API" />
      </div>
    {/each}
  </section>
</div>
