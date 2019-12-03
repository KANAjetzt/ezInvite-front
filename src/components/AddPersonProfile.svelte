<script>
  import { createEventDispatcher } from "svelte";
  import { getClient, mutate } from "svelte-apollo";
  import { gql } from "apollo-boost";

  import { eventDataStore } from "../stores";

  import DescriptionBox from "./DescriptionBox.svelte";
  import AddPersonInput from "./AddPerson.svelte";
  import AddPersonImg from "./AddPersonImg.svelte";
  import PersonCard from "./PersonCard.svelte";
  import LinkBox from "./LinkBox.svelte";
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

  const QUERYEVENT = gql`
    query($input: QueryEventInput!) {
      event(input: $input) {
        id
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

  const CREATEUSER = gql`
    mutation($input: CreateUserInput!) {
      createUser(input: $input) {
        user {
          id
          name
          photo
          link
        }
      }
    }
  `;

  const handlePersonName = e => {
    console.log($eventDataStore);
    $eventDataStore.currentUser.name = e.detail;
    console.log($eventDataStore);
  };

  const handleDoneBtn = async () => {
    if ($eventDataStore.currentUser.unknown) {
      // --- Handle unkonwn user ---
      console.log("--- handling unknown user ---");
      // get Event ID
      const event = await client.query({
        query: QUERYEVENT,
        variables: {
          input: { link: $eventDataStore.link, slug: $eventDataStore.slug }
        }
      });
      console.log(event);

      // create new user
      const input = {
        name: $eventDataStore.currentUser.name,
        event: event.data.event.id,
        photo: $eventDataStore.purePersonImg
      };

      const createdUser = await mutate(client, {
        mutation: CREATEUSER,
        variables: { input }
      });
      console.log(createdUser);

      // set createdUser to currentUser
      delete createdUser.data.createUser.user.id;
      $eventDataStore.currentUser = createdUser.data.createUser.user;
      $eventDataStore.currentUser.unknown = true;

      // show personal Link

      // navigate to personal Link

      return;
    }

    // --- Handle known user ---
    console.log("--- handling known user ---");
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

  .linkBox {
    padding: 0 1rem;
    margin-bottom: 2rem;
  }

  .linkBox > {
    text-align: center;
  }
</style>

<section class="personProfile">

  <!-- DescriptionBox: Current user is unknown -->
  {#if !$eventDataStore.currentUser.name}
    <div class="DescriptionBox">
      <DescriptionBox
        title={'Welcome!'}
        text={'Add your name and a profile picture, to answer this invite.'} />
    </div>

    <!-- DescriptionBox: Current user is known -->
  {:else}
    <div class="DescriptionBox">
      <DescriptionBox
        title={`Hi ${$eventDataStore.currentUser.name.split(' ')[0]}!`}
        text={'Add a picture so its easyer to recognise you.'} />
    </div>
  {/if}

  <!-- personCard: user enterd his name - render PersonCard Comp with photo prop to update later. -->
  {#if $eventDataStore.currentUser && $eventDataStore.currentUser.name}
    <section class="personCard">
      <div class="btnRemove">
        <BtnRemove
          width={15}
          height={15}
          on:removebtnclick={() => {
            $eventDataStore.currentUser.name = undefined;
            $eventDataStore.personImgPreview = undefined;
            $eventDataStore.purePersonImg = undefined;
          }} />
      </div>
      <PersonCard
        name={$eventDataStore.currentUser.name}
        photo={$eventDataStore.personImgPreview} />
    </section>
  {/if}

  <!-- PersonNameInput: Current user is unknown - show addPersonInput -->
  {#if !$eventDataStore.currentUser.name}
    <div class="addPersonInput">
      <AddPersonInput on:addperson={handlePersonName} />
    </div>
  {/if}

  <!-- PersonImg: Current user has no Img - show Add profile picture comp -->
  {#if !$eventDataStore.personImgPreview}
    <AddPersonImg />
  {/if}

  <!-- LinkBox: Show this if user was unknow and got his private link -->
  {#if $eventDataStore.currentUser.unknown && $eventDataStore.currentUser.link}
    <div class="linkBox">
      <LinkBox
        value={`http://localhost:5000/${$eventDataStore.slug}/${$eventDataStore.link}/${$eventDataStore.currentUser.link}`} />
    </div>
  {/if}

  <BtnBig
    text={'Done !'}
    clipVar={'tertiary'}
    fontSize={5.4}
    on:bigbtnclick={handleDoneBtn} />

</section>
