<script>
  import AddPhotoIcon from "./Icons/AddPhoto.svelte";

  const handlePersonImgUpload = () => {
    console.log("upload img to cloudinary!");
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
    width: 100%;
    position: relative;
    padding: 4.5rem 0;
    background-image: linear-gradient(
      130.02deg,
      #0476d0 12.41%,
      #047dd9 88.27%
    );
    background-size: cover;
    cursor: pointer;
    clip-path: polygon(0 15%, 100% 0, 100% 85%, 0% 100%);
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
  on:change={handlePersonImgUpload} />

<label class="personImgUploadBtn" for="personImgUpload">
  <AddPhotoIcon height={50} width={50} fill={'#f9fafb'} />
  <span>Add profile picture</span>
</label>
