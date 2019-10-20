<script>
  import { getEventData } from "../stores";
  import Rotate from "./Rotate.svelte";

  let eventData = getEventData();
</script>

<style>
  .rotateBox {
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

<Rotate child={'.imageStripe'}>
  <section class="imageStripe">
    {#each eventData.imgs as img}
      <div class="imgBox">
        <img
          class="img"
          src={`http://localhost:3000/img/${img}`}
          alt="Will be added later via API" />
      </div>
    {/each}
  </section>
</Rotate>
