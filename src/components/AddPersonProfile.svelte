<script>
  import { eventDataStore } from "../stores";

  import DescriptionBox from "./DescriptionBox.svelte";
  import AddPersonInput from "./AddPerson.svelte";
  import AddPersonImg from "./AddPersonImg.svelte";
  import BtnBig from "./BtnBig.svelte";

  console.log($eventDataStore);
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
  {#if !$eventDataStore.currentUser}
    <div class="DescriptionBox">
      <DescriptionBox
        title={'Welcome!'}
        text={'Add your name and a profile picture, to answer this invite.'} />
    </div>
  {:else}
    <div class="DescriptionBox">
      <DescriptionBox
        title={`Hi ${$eventDataStore.currentUser.name.split(' ')[0]}!`}
        text={'Add a picture so its easyer to recognise you.'} />
    </div>
  {/if}
  {#if !$eventDataStore.currentUser}
    <div class="addPersonInput">
      <AddPersonInput />
    </div>
  {/if}
  <AddPersonImg />
  <BtnBig text={'Done !'} clipVar={'tertiary'} fontSize={5.4} />
</section>
