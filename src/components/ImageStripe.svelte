<script>
  import { fly } from "svelte/transition";
  import { eventDataStore, appStore } from "../stores";
  import handleImgSrc from "../utils/handleImgSrc.js";
  import rotateImg from "../utils/rotateImage.js";

  import RemoveBtn from "../components/BtnRemove.svelte";
  import RotateBtn from "../components/BtnRotateImg.svelte";

  let eventData;

  eventDataStore.subscribe(newData => {
    eventData = newData;
  });

  const handleImgStripeRemove = e => {
    $appStore.imgs
      ? ($appStore.imgs = !$appStore.imgs)
      : $appStore.addImgs
      ? ($appStore.addImgs = !$appStore.addImgs)
      : null;
    $appStore.addImgs;

    eventDataStore.update(currentData => {
      const currentEventData = { ...currentData };
      currentEventData.imgs = undefined;
      return currentEventData;
    });
  };

  const handleRotateBtn = async () => {
    const [file, dataUrl] = await rotateImg($eventDataStore.pureImgs);
    $eventDataStore.pureImgs = file;
    $eventDataStore.imgs = dataUrl;
  };
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
  .imgBox {
    position: relative;
    overflow: hidden;
  }
  .img {
    width: 100%;
    height: 110%;
    object-fit: cover;
  }

  .rotateBtn {
    position: absolute;
    top: -11px;
    right: 12px;
  }

  .rotateBtn-0 {
    transform: translateY(13vw);
  }

  .rotateBtn-1 {
    transform: translateY(6vw);
  }

  .removeBtnWrapper {
    display: flex;
    justify-content: space-between;
    transform: rotate(-8.3deg) translateY(-9vw);
    padding: 0 1rem;
  }

  .removeBtn {
    transform: rotate(8.3deg);
  }

  @media only screen and (min-width: 36em) {
    .rotateBtn-0 {
      transform: translateY(11vw);
    }

    .rotateBtn-1 {
      transform: translateY(4vw);
    }
  }
</style>

{#if eventData.imgs}
  <section
    class="imageStripeWrapper"
    transition:fly|local={$appStore.currentPage === 'addEvent' ? { duration: 250, x: -300 } : { duration: 0 }}>
    <section class="imageStripe">

      {#each eventData.imgs as img, index}
        <div class="imgBox">
          <div class={`rotateBtn rotateBtn-${index}`}>
            <RotateBtn
              width={20}
              height={20}
              marginTop={0}
              on:rotatebtnclick={handleRotateBtn} />
          </div>
          <img
            class="img"
            src={handleImgSrc(img)}
            alt="Will be added later via API" />
        </div>
      {/each}
    </section>
  </section>
  <div class="removeBtnWrapper">
    <div class="removeBtn">
      <RemoveBtn
        width={20}
        height={20}
        marginLeft={0}
        marginTop={0}
        on:removebtnclick={handleImgStripeRemove} />
    </div>
  </div>
{/if}
