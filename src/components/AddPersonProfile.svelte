<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { getClient, mutate } from "svelte-apollo";
  import { gql } from "apollo-boost";
  import { navigate } from "svelte-routing";
  import { fly } from "svelte/transition";
  import {
    disableBodyScroll,
    enableBodyScroll,
    clearAllBodyScrollLocks
  } from "body-scroll-lock";

  import { appStore, eventDataStore } from "../stores";
  import { addMessage } from "../utils/messageHandler.js";
  import rotateImg from "../utils/rotateImage.js";
  import getStr from "../utils/getLanguageStr.js";
  import DescriptionBox from "./DescriptionBox.svelte";
  import AddPersonInput from "./AddPerson.svelte";
  import AddPersonImg from "./AddPersonImg.svelte";
  import PersonCard from "./PersonCard.svelte";
  import LinkBox from "./LinkBox.svelte";
  import BtnPanel from "./BtnPanel.svelte";
  import NormalBtn from "./NormalBtn.svelte";
  import BtnBig from "./BtnBig.svelte";
  import BtnRotate from "./BtnRotateImg.svelte";
  import Message from "./Message.svelte";

  const dispatch = createEventDispatcher();
  const client = getClient();

  onMount(() => {
    const overlay = document.querySelector(".personProfile");
    disableBodyScroll(overlay);

    return () => {
      enableBodyScroll(overlay);
    };
  });

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
    if (!e.detail.personName) {
      $appStore.messages = addMessage(
        $appStore.messages,
        "Error",
        "inputPersonName",
        "Please enter your name. (Maybe you missed the button on the left?)"
      );
    }

    $eventDataStore.currentUser.name = e.detail.personName;
  };

  const handleRotateBtn = async () => {
    const [file, dataUrl] = await rotateImg($eventDataStore.purePersonImg);
    $eventDataStore.purePersonImg = file;
    $eventDataStore.personImgPreview = dataUrl;
  };

  const handleDoneBtn = async () => {
    if (!$eventDataStore.currentUser.name) {
      $appStore.messages = addMessage(
        $appStore.messages,
        "Error",
        "inputPersonName",
        "Please enter your name. ( Maybe you missed the button on the left? )",
        10
      );
      return;
    }

    // --- Handle unkonwn user ---
    if ($eventDataStore.currentUser.unknown) {
      // create new user
      const input = {
        name: $eventDataStore.currentUser.name,
        event: $eventDataStore.id,
        photo: $eventDataStore.purePersonImg,
        accepted: $eventDataStore.currentUser.accepted
      };

      const createdUser = await mutate(client, {
        mutation: CREATEUSER,
        variables: { input }
      });

      // set createdUser to currentUser
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
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    transform: translate3d(0, 0, 0);
  }

  @media only screen and (min-width: 36em) {
    .personProfile {
      width: 55rem;
      overflow-y: unset;
    }
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

  .btnRotate {
    margin-top: 4.8rem;
    margin-right: -1rem;
    z-index: 200;
    opacity: 0.95;
  }

  .linkBox {
    padding: 0 1rem;
    margin-bottom: 2rem;
  }

  .linkBox > {
    text-align: center;
  }

  .btns {
    padding-bottom: 10rem;
  }

  @media only screen and (min-width: 36em) {
    .btns {
      padding-bottom: unset;
    }
  }
</style>

<section
  transition:fly={{ x: -200, duration: 200, delay: 50 }}
  class="personProfile">

  <!-- DescriptionBox: Current user is unknown -->
  {#if $eventDataStore.currentUser && !$eventDataStore.currentUser.name}
    <div class="DescriptionBox">
      <DescriptionBox
        title={$appStore.languages[0] ? getStr($appStore.languages, '032a13') : ''}
        text={$appStore.languages[0] ? getStr($appStore.languages, '4ba477') : ''} />
    </div>

    <!-- DescriptionBox: User got created -->
  {:else if $eventDataStore.currentUser.unknown && $eventDataStore.currentUser.link}
    <div class="DescriptionBox">
      <DescriptionBox
        title={`${$appStore.languages[0] ? getStr($appStore.languages, '04e476') : ''} ${$eventDataStore.currentUser.name.split(' ')[0]}!`}
        text={$appStore.languages[0] ? getStr($appStore.languages, 'd42fd9') : ''} />
    </div>

    <!-- DescriptionBox: Current user is known -->
  {:else}
    <div class="DescriptionBox">
      <DescriptionBox
        title={`Hi ${$eventDataStore.currentUser.name.split(' ')[0]}!`}
        text={$appStore.languages[0] ? getStr($appStore.languages, '06c37f') : ''} />
    </div>
  {/if}
  <section class="inputs">
    <!-- personCard: user enterd his name - render PersonCard Comp with photo prop to update later. -->
    {#if ($eventDataStore.currentUser && $eventDataStore.currentUser.unknown && $eventDataStore.currentUser.name) || $eventDataStore.personImgPreview}
      <section class="personCard">
        {#if (!$eventDataStore.currentUser.link && $eventDataStore.currentUser.unknown) || (!$eventDataStore.currentUser.unknown && $eventDataStore.personImgPreview)}
          <div class="btnRotate">
            <BtnRotate
              width={15}
              height={15}
              on:rotatebtnclick={handleRotateBtn} />
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
          value={`${svelteEnv.frontUrl}/${$eventDataStore.slug}/${$eventDataStore.link}/${$eventDataStore.currentUser.link}`} />
      </div>
    {/if}
  </section>
  <section class="btns">
    {#if $eventDataStore.currentUser.unknown && $eventDataStore.currentUser.link}
      <BtnBig
        text={$appStore.languages[0] ? getStr($appStore.languages, 'b9ae41') : ''}
        clipVar={'tertiary'}
        fontSize={2.8}
        on:bigbtnclick={handleLinkBtn} />
    {:else}
      <BtnPanel clipVar={'tertiary'}>
        <NormalBtn
          text={$appStore.languages[0] ? getStr($appStore.languages, '2089ee') : ''}
          type={'normal'}
          on:normalbtnclick={handleBackBtn} />
        <NormalBtn
          text={$appStore.languages[0] ? getStr($appStore.languages, '2dcc7f') : ''}
          type={'cta'}
          on:ctabtnclick={handleDoneBtn} />
      </BtnPanel>
    {/if}
  </section>
</section>
