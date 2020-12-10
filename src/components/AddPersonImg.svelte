<script>
  import { eventDataStore, appStore } from "../stores";
  import compressImg from "../utils/compressImage.js";
  import AddPhotoIcon from "./Icons/AddPhoto.svelte";
  import LanguageStr from "../components/LanguageStr.svelte";

  const handlePersonImg = async () => {
    const img = document.getElementById("personImgUpload").files[0];

    // compress image
    const [compressedImg, compressedImgDataUrl] = await compressImg(img, 128);

    // save compressed image to event data store
    $eventDataStore.personImgPreview = compressedImgDataUrl;
    $eventDataStore.purePersonImg = compressedImg;
  };
</script>

<style>
  .personImgUpload {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .personImgUploadBtn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 20rem;
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

  @media only screen and (min-width: 24em) {
    .personImgUploadBtn {
      clip-path: var(--clip-primary-fixed);
    }
  }

  .personImgUploadBtn span {
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
  class="personImgUpload"
  type="file"
  multiple
  accept="image/*"
  id="personImgUpload"
  name="personImgUpload"
  on:change={handlePersonImg} />

<label class="personImgUploadBtn" for="personImgUpload">
  <AddPhotoIcon height={50} width={50} fill={'#f9fafb'} />
  <span>
    <LanguageStr id={'08ed81'} />
  </span>
</label>
