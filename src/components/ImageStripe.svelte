<script>
  //TODO: Add some JS to calculate the height vor the Image Stripe.

  import { getEventData } from "../stores";

  let eventData = getEventData();
  console.log(eventData);
</script>

<style>
  .box {
    display: flex;
    align-items: center;
    height: 30vh;
    overflow: hidden;
  }
  .imageStripe {
    display: grid;
    grid-template-columns: 1fr 1fr;
    transform: rotate(-9deg) scale(1.2);
  }
  .img {
    width: 100%;
    height: 110%;
    object-fit: cover;
  }
</style>

<div class="box">
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
