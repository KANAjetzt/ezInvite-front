<script>
  import DescriptionBox from "./DescriptionBox.svelte";
  import AddPersonInput from "./AddPerson.svelte";
  import AddPersonImg from "./AddPersonImg.svelte";
  import BtnBig from "./BtnBig.svelte";
</script>

<style>
  .personProfile {
    background: var(--color-primary);
  }
  .DescriptionBox {
    max-width: 70ch;
    margin-top: -1rem;
    margin-bottom: 4rem;
  }
  .addPersonInput {
    margin-bottom: 2rem;
  }
</style>

<section class="personProfile">
  <div class="DescriptionBox">
    <DescriptionBox
      title={'Welcome!'}
      text={'Add your name and a profile picture, to answer this invite.'} />
  </div>
  <div class="addPersonInput">
    <AddPersonInput />
  </div>
  <AddPersonImg />
  <BtnBig text={'Done !'} clipVar={'tertiary'} fontSize={5.4} />
</section>
