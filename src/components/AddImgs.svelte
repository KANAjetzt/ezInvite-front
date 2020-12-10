<script>
  import { createEventDispatcher } from "svelte";
  import asyncMap from "../utils/asyncMap.js";
  import compressImg from "../utils/compressImage.js";
  import { eventDataStore, appStore } from "../stores";
  import ImgAddIcon from "./Icons/ImgAdd.svelte";
  import LanguageStr from "../components/LanguageStr.svelte";

  const dispatch = createEventDispatcher();

  const handleImgs = async () => {
    const imgs = document.getElementById("imgs").files;

    // Compress img
    const compressedImgs = await asyncMap(imgs, async img => {
      const [imgCompressed, imgCompressedDataUrl] = await compressImg(
        img,
        1280
      );

      return { imgCompressed, imgCompressedDataUrl };
    });

    // Save File
    $eventDataStore.imgs = compressedImgs.map(img => img.imgCompressedDataUrl);
    $eventDataStore.pureImgs = compressedImgs.map(img => img.imgCompressed);

    // Trigger transition
    $appStore.addImgs
      ? ($appStore.addImgs = !$appStore.addImgs)
      : $appStore.imgs
      ? ($appStore.imgs = !$appStore.imgs)
      : null;

    dispatch("imgsadded");
  };
</script>

<style>
  /* .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  } */

  .imgsUpload {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .imgsUploadBtn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 25vw;
    position: relative;
    padding: 6.5rem 0;
    background-image: linear-gradient(
      130.02deg,
      #0476d0 12.41%,
      #047dd9 88.27%
    );
    background-size: cover;
    cursor: pointer;
    clip-path: var(--clip-primary);
  }

  .imgsUploadBtn span {
    cursor: pointer;
    padding: 0.5rem 2rem;
    margin-top: 2rem;
    border-radius: 24px;
    background-color: var(--color-primary-light);
    font-family: var(--font-primary);
    font-weight: 400;
    font-size: 1.4rem;
    color: var(--color-text-primary);
  }
</style>

<input
  class="imgsUpload"
  type="file"
  multiple
  accept="image/*"
  id="imgs"
  name="imgs"
  on:change={() => handleImgs()} />

<label class="imgsUploadBtn" for="imgs">
  <ImgAddIcon height={50} width={50} fill={'#f9fafb'} />
  <span>
    <LanguageStr id={'b79b6c'} />
  </span>
</label>
