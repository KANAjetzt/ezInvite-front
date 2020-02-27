<script>
  import { fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  import { eventDataStore } from "../stores";
  import ImgAddIcon from "./Icons/ImgAdd.svelte";

  const dispatch = createEventDispatcher();

  // ! Handle Img upload after submitting the form in AddEvent Route !
  const handleImg = () => {
    const img = document.getElementById("heroImg").files[0];

    const reader = new FileReader();

    // When img is loaded set result to heroImgPreview
    // heroImgPreview is bound in AddEvent to heroImgPreview
    // heroImgPreview is send to Hero.svelte as backgroundImg prop
    reader.onload = e => {
      const imgData = reader.result;

      eventDataStore.update(currentData => {
        const currentEventData = { ...currentData };
        currentEventData.heroImgPreview = imgData;
        currentEventData.pureHeroImg = img;
        return currentEventData;
      });
    };

    const dataUrl = reader.readAsDataURL(img);

    dispatch("imgadded");
  };
</script>

<style>
  .imgUpload {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  .imgUploadBtn {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 5rem 0 8rem 0;
    clip-path: polygon(0 0, 100% 0, 100% 85%, 0% 100%);
    background-image: linear-gradient(
      130.02deg,
      #0476d0 12.41%,
      #047dd9 88.27%
    );
    background-size: cover;
    cursor: pointer;
  }

  .imgUploadBtn span {
    cursor: pointer;
    padding: 0.5rem 2rem;
    margin-top: 2rem;
    border-radius: 24px;
    background-color: var(--color-primary-light);
    font-family: var(--font-primary);
    font-weight: 400;
    font-size: 1.6rem;
    color: var(--color-text-primary);
  }
</style>

<input
  class="imgUpload"
  type="file"
  accept="image/*"
  id="heroImg"
  name="heroImg"
  on:change={() => handleImg()} />

<label
  class="imgUploadBtn"
  for="heroImg"
  transition:fly={{ duration: 250, y: -350 }}
  on:outroend={() => dispatch('outroend')}>
  <ImgAddIcon height={80} width={80} fill={'#f9fafb'} />
  <span>Add a hero image</span>
</label>
