<script>
  import { fly } from "svelte/transition";
  import { eventDataStore, appStore } from "../stores";
  import handleImgSrc from "../utils/handleImgSrc.js";

  let eventData;

  eventDataStore.subscribe(newData => {
    eventData = newData;
  });
</script>

<style>
  .imageStripeWrapper {
    filter: drop-shadow(2px 4px 0px #022c4d99)
      drop-shadow(-2px 2px 0px rgba(0, 0, 0, 0.5))
      drop-shadow(-10px 2px 0px black) drop-shadow(1px -5px 0px #022c4d99)
      drop-shadow(2px -1px 0px rgba(0, 0, 0, 0.3))
      drop-shadow(2px -1px 0px black);
  }

  .imageStripe {
    display: grid;
    grid-template-columns: 1fr 1fr;
    clip-path: var(--clip-primary);
    min-height: 18rem;
  }

  @media only screen and (min-width: 64em) {
    .imageStripeWrapper {
      /* Breaks remove Btn on add/edit page */
      /* margin-bottom: -9vw; */
    }
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
  <section
    class="imageStripeWrapper"
    transition:fly|local={$appStore.currentPage === 'addEvent' ? { duration: 250, x: -300 } : { duration: 0 }}>
    <section class="imageStripe">

      {#each eventData.imgs as img}
        <div class="imgBox">
          <img
            class="img"
            src={handleImgSrc(img)}
            alt="Will be added later via API" />
        </div>
      {/each}

    </section>
  </section>
{/if}
