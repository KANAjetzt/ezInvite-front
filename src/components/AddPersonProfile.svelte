<script>
  import { createEventDispatcher } from "svelte";
  import { getClient, mutate } from "svelte-apollo";
  import { gql } from "apollo-boost";
  import { navigate } from "svelte-routing";

  import { appStore, eventDataStore } from "../stores";

  import DescriptionBox from "./DescriptionBox.svelte";
  import AddPersonInput from "./AddPerson.svelte";
  import AddPersonImg from "./AddPersonImg.svelte";
  import PersonCard from "./PersonCard.svelte";
  import LinkBox from "./LinkBox.svelte";
  import BtnPanel from "./BtnPanel.svelte";
  import NormalBtn from "./NormalBtn.svelte";
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
          accepted
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
          accepted
        }
      }
    }
  `;

  const handlePersonName = e => {
    $eventDataStore.currentUser.name = e.detail;
  };

  const handleDoneBtn = async () => {
    if ($eventDataStore.currentUser.unknown) {
      // --- Handle unkonwn user ---
      // get Event ID
      const event = await client.query({
        query: QUERYEVENT,
        variables: {
          input: { link: $eventDataStore.link, slug: $eventDataStore.slug }
        }
      });

      // create new user
      const input = {
        name: $eventDataStore.currentUser.name,
        event: event.data.event.id,
        photo: $eventDataStore.purePersonImg,
        accepted: $eventDataStore.currentUser.accepted
      };

      const createdUser = await mutate(client, {
        mutation: CREATEUSER,
        variables: { input }
      });

      // set createdUser to currentUser
      delete createdUser.data.createUser.user.id;
      $eventDataStore.currentUser = createdUser.data.createUser.user;
      $eventDataStore.currentUser.unknown = true;

      // add createdUser to users Array
      eventDataStore.update(currentData => {
        const newData = { ...currentData };
        newData.users.push($eventDataStore.currentUser);
        return newData;
      });

      return;
    }
    // --- Handle known user ---
    const user = await client.query({
      query: QUERYUSERBYLINK,
      variables: { link: $eventDataStore.currentUser.link }
    });
    const input = {
      user: user.data.userByLink.id,
      photo: $eventDataStore.purePersonImg,
      accepted: $eventDataStore.currentUser.accepted
    };
    const updatedUser = await mutate(client, {
      mutation: UPDATEUSER,
      variables: { input }
    });

    // update currentUser photo
    $eventDataStore.currentUser.photo = updatedUser.data.updateUser.user.photo;

    // Hide Overlay
    dispatch("donebtnclick");

    // close Respond section
    $appStore.showFullResponder = !$appStore.showFullResponder;
  };

  const handleLinkBtn = () => {
    navigate(
      `/${$eventDataStore.slug}/${$eventDataStore.link}/${$eventDataStore.currentUser.link}`
    );

    // Hide Overlay
    dispatch("donebtnclick");

    // close Respond section
    $appStore.showFullResponder = !$appStore.showFullResponder;
  };

  const handleBackBtn = () => {
    // clear currentUser
    if ($eventDataStore.currentUser.unknown) {
      $eventDataStore.currentUser.name = undefined;
    }
    $eventDataStore.personImgPreview = undefined;
    $eventDataStore.purePersonImg = undefined;

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
  {#if $eventDataStore.currentUser && !$eventDataStore.currentUser.name}
    <div class="DescriptionBox">
      <DescriptionBox
        title={'Welcome!'}
        text={'Add your name and a profile picture, to answer this invite.'} />
    </div>

    <!-- DescriptionBox: User got created -->
  {:else if $eventDataStore.currentUser.unknown && $eventDataStore.currentUser.link}
    <div class="DescriptionBox">
      <DescriptionBox
        title={`Thanks ${$eventDataStore.currentUser.name.split(' ')[0]}!`}
        text={`Use this link to communikate within this event.`} />
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
  {#if ($eventDataStore.currentUser && $eventDataStore.currentUser.unknown && $eventDataStore.currentUser.name) || $eventDataStore.personImgPreview}
    <section class="personCard">
      {#if (!$eventDataStore.currentUser.link && $eventDataStore.currentUser.unknown) || (!$eventDataStore.currentUser.unknown && $eventDataStore.personImgPreview)}
        <div class="btnRemove">
          <BtnRemove
            width={15}
            height={15}
            on:removebtnclick={() => {
              if ($eventDataStore.currentUser.unknown) {
                $eventDataStore.currentUser.name = undefined;
              }
              $eventDataStore.personImgPreview = undefined;
              $eventDataStore.purePersonImg = undefined;
            }} />
        </div>
      {/if}
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
  {#if (!$eventDataStore.currentUser.unknown && !$eventDataStore.personImgPreview) || ($eventDataStore.currentUser.unknown && !$eventDataStore.currentUser.link && !$eventDataStore.personImgPreview)}
    <AddPersonImg />
  {/if}

  <!-- LinkBox: Show this if user was unknow and got his private link -->
  {#if $eventDataStore.currentUser.unknown && $eventDataStore.currentUser.link}
    <div class="linkBox">
      <LinkBox
        value={`http://localhost:5000/${$eventDataStore.slug}/${$eventDataStore.link}/${$eventDataStore.currentUser.link}`} />
    </div>
  {/if}

  {#if $eventDataStore.currentUser.unknown && $eventDataStore.currentUser.link}
    <BtnBig
      text={'go to your personal event page'}
      clipVar={'tertiary'}
      fontSize={2.8}
      on:bigbtnclick={handleLinkBtn} />
  {:else}
    <BtnPanel clipVar={'tertiary'}>
      <NormalBtn
        text={'go back'}
        type={'normal'}
        on:normalbtnclick={handleBackBtn} />
      <NormalBtn text={'Done !'} type={'cta'} on:ctabtnclick={handleDoneBtn} />
    </BtnPanel>
  {/if}

</section>
