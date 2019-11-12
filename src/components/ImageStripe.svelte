<script>
  import { eventDataStore } from "../stores";
  import Rotate from "./Rotate.svelte";

  let eventData;

  eventDataStore.subscribe(newData => {
    eventData = newData;
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

  .imageStripe {
    display: grid;
    grid-template-columns: 1fr 1fr;
    transform: rotate(-9deg) scale(1.2);
    box-shadow: -8px -5px 7px 0px hsl(206, 95%, 15%), -4px -5px 0px 0px #000,
      8px 4px 11px 0px hsl(206, 95%, 15%), inset -13px -20px 0px 0px #000,
      2px 4px 0px 0px #000;
  }

  :global(.imageStripe > .removeBtn) {
    position: absolute;
    bottom: -1rem;
    left: 2.5rem;
    transform: rotate(9deg);
  }

  .imgBox {
    overflow: hidden;
  }
  .img {
    width: 100%;
    height: 110%;
    object-fit: cover;
  }
</style>

{#if eventData.imgs}
  <Rotate child={'.imageStripe'}>
    <section class="imageStripe">

      {#each eventData.imgs as img}
        <div class="imgBox">
          <img
            class="img"
            src={img.startsWith('data:') ? img : `${img}`}
            alt="Will be added later via API" />
        </div>
      {/each}
    </section>
  </Rotate>
{/if}
