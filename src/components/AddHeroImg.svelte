<script>
  import { getClient, mutate } from "svelte-apollo";
  import { gql } from "apollo-boost";

  import ImgAddIcon from "./Icons/ImgAdd.svelte";

  const client = getClient();

  const UPLOADFILE = gql`
    mutation($file: Upload!) {
      uploadHeroImg(file: $file) {
        heroImg
      }
    }
  `;

  const handleImgUpload = async () => {
    const file = document.getElementById("heroImg").files[0];
    console.log(file);

    await mutate(client, {
      mutation: UPLOADFILE,
      variables: { file }
    });
  };
</script>

<style>
  .heroImg {
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 10rem;
    clip-path: polygon(0 0, 100% 0, 100% 85%, 0% 100%);
    background-image: linear-gradient(
      130.02deg,
      #0476d0 12.41%,
      #047dd9 88.27%
    );
    background-size: cover;
    cursor: pointer;
  }

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
  on:change={() => handleImgUpload()} />

<label class="imgUploadBtn" for="heroImg">
  <ImgAddIcon height={80} width={80} fill={'#f9fafb'} />
  <span>Add a hero image</span>
</label>
