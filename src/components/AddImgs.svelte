<script>
  import { eventDataStore } from "../stores";
  import Rotate from "./Rotate.svelte";
  import ImgAddIcon from "./Icons/ImgAdd.svelte";

  const handleImgs = () => {
    const imgs = document.getElementById("imgs").files;
    let imgsData = [];
    const reader = new FileReader();

    // read File
    const readFile = img => {
      return reader.readAsDataURL(img);
    };

    // Save File
    reader.onload = e => {
      // Add File to imgsArray when its loaded
      imgsData = [...imgsData, reader.result];
      // Check if there are more imgs
      if (imgsData.length < imgs.length) {
        // if so run readFile again
        readFile(imgs[imgsData.length]);
      } else {
        eventDataStore.update(currentData => {
          const currentEventData = { ...currentData };
          currentEventData.imgs = imgsData;
          currentEventData.pureImgs = imgs;
          return currentEventData;
        });
      }
    };
    readFile(imgs[0]);
  };
</script>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: rotate(9deg);
  }

  .imgsUpload {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .imgsUploadBtn {
    width: 100vw;
    position: relative;
    padding: 2.5rem 0;
    background-image: linear-gradient(
      130.02deg,
      #0476d0 12.41%,
      #047dd9 88.27%
    );
    background-size: cover;
    cursor: pointer;
    transform: rotate(-9deg) scale(1.1);
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

<Rotate child={'.imgsUploadBtn'}>

  <label class="imgsUploadBtn" for="imgs">
    <div class="wrapper">
      <ImgAddIcon height={50} width={50} fill={'#f9fafb'} />
      <span>Add more Images</span>
    </div>
  </label>

</Rotate>
