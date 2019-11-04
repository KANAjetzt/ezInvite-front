<script>
  import { getClient, mutate } from "svelte-apollo";
  import { gql } from "apollo-boost";

  import Rotate from "./Rotate.svelte";
  import ImgAddIcon from "./Icons/ImgAdd.svelte";

  const client = getClient();

  const UPLOADFILE = gql`
    mutation($files: Upload!) {
      uploadImgs(files: $files) {
        imgs
      }
    }
  `;

  const handleImgUpload = async () => {
    const files = [...document.getElementById("imgs").files];
    console.log(files);

    // ! I definitely should change this at some point, so I dont have 1 request for every Img 🥶 !
    const upload = await mutate(client, {
      mutation: UPLOADFILE,
      variables: { files }
    });

    console.log(upload);
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
  on:change={() => handleImgUpload()} />

<Rotate child={'.imgsUploadBtn'}>

  <label class="imgsUploadBtn" for="imgs">
    <div class="wrapper">
      <ImgAddIcon height={50} width={50} fill={'#f9fafb'} />
      <span>Add more Images</span>
    </div>
  </label>

</Rotate>
