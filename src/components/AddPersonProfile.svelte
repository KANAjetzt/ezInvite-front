<script>
  import { createEventDispatcher } from "svelte";
  import { getClient, mutate } from "svelte-apollo";
  import { gql } from "apollo-boost";

  import { eventDataStore } from "../stores";

  import DescriptionBox from "./DescriptionBox.svelte";
  import AddPersonInput from "./AddPerson.svelte";
  import AddPersonImg from "./AddPersonImg.svelte";
  import PersonCard from "./PersonCard.svelte";
  import BtnBig from "./BtnBig.svelte";
  import BtnRemove from "./BtnRemove.svelte";

  const dispatch = createEventDispatcher();
  const client = getClient();

  const QUERYUSERBYLINK = gql`
    query($link: String!) {
      userByLink(link: $link) {
        id
        name
        photo
      }
    }
  `;

  const UPDATEUSER = gql`
    mutation($input: UpdateUserInput!) {
      updateUser(input: $input) {
        user {
          id
          name
          photo
        }
      }
    }
  `;

  const handleDoneBtn = async () => {
    const user = await client.query({
      query: QUERYUSERBYLINK,
      variables: { link: $eventDataStore.currentUser.link }
    });
    const input = {
      user: user.data.userByLink.id,
      photo: $eventDataStore.purePersonImg
    };
    const updatedUser = await mutate(client, {
      mutation: UPDATEUSER,
      variables: { input }
    });

    // update currentUser photo
    $eventDataStore.currentUser.photo = updatedUser.data.updateUser.user.photo;

    // Hide Overlay
    dispatch("donebtnclick");
  };
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

  .personCard {
    display: flex;
    justify-content: center;
  }

  .btnRemove {
    margin-top: 4.8rem;
    margin-right: -1rem;
    z-index: 200;
    opacity: 0.8;
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
  {#if !$eventDataStore.personImgPreview}
    <AddPersonImg />
  {/if}
  {#if $eventDataStore.personImgPreview}
    <section class="personCard">
      <div class="btnRemove">
        <BtnRemove
          width={15}
          height={15}
          on:removebtnclick={() => {
            $eventDataStore.personImgPreview = undefined;
            $eventDataStore.purePersonImg = undefined;
          }} />
      </div>
      <PersonCard
        name={$eventDataStore.currentUser.name}
        photo={$eventDataStore.personImgPreview} />
    </section>
  {/if}
  <BtnBig
    text={'Done !'}
    clipVar={'tertiary'}
    fontSize={5.4}
    on:bigbtnclick={handleDoneBtn} />
</section>
