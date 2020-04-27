<script>
  // TODO: - Add delete all Btn

  import { navigate } from "svelte-routing";
  import { onMount } from "svelte";
  import { getClient, mutate } from "svelte-apollo";
  import { gql } from "apollo-boost";
  import { flip } from "svelte/animate";

  import { eventDataStore, todoStore, userStore, appStore } from "../stores.js";
  import {
    getLocalStorage,
    saveLocalStorage,
    deleteLocalStorage
  } from "../utils/localStorageHandler.js";
  import { addMessage } from "../utils/errorHandler.js";
  import { send, receive } from "../utils/crossfade.js";
  import Head from "../components/Head.svelte";
  import PageTransition from "../components/PageTransition.svelte";
  import Hero from "../components/Hero.svelte";
  import DescriptionBox from "../components/DescriptionBox.svelte";
  import PersonCard from "../components/PersonCard.svelte";
  import LinkBox from "../components/LinkBox.svelte";
  import LinkBoxGlobal from "../components/LinkBoxGlobal.svelte";
  import LinkBoxEdit from "../components/LinkBoxEdit.svelte";
  import AddPerson from "../components/AddPerson.svelte";
  import BigBtn from "../components/BtnBig.svelte";

  // Handle Local Storage

  // If nothing is in store check localStorage
  if (Object.keys($eventDataStore).length === 0) {
    eventDataStore.set(getLocalStorage("eventData"));
  }

  // If nothing is in store check localStorage
  if ($userStore && $userStore.length === 0) {
    userStore.set(getLocalStorage("users"));
  }

  // --- PROPS -- //
  let eventData = $eventDataStore;
  let users;
  let shared = false;

  // Set current page
  $appStore.currentPage = "share";

  // Get all that fresh data from userStore
  userStore.subscribe(newData => {
    users = newData;
  });

  const client = getClient();

  const CREATEUSERS = gql`
    mutation($input: CreateUsersInput!) {
      createUsers(input: $input) {
        users {
          id
          name
          link
          accepted
        }
      }
    }
  `;

  const handleAddPerson = e => {
    const { personName, key } = e.detail;

    if (!personName) {
      $appStore.messages = addMessage(
        $appStore.messages,
        "Error",
        "inputPersonName",
        "Please provide the name of some person."
      );
      return;
    }

    userStore.update(currentData => {
      let newData = currentData ? [...currentData] : [];
      newData = [...newData, { name: personName, key }];
      saveLocalStorage(newData, "users");
      return newData;
    });
  };

  const handleShareBtn = async e => {
    // create Input Object --> check CREATEUSERS GraphQL Docs if needed
    shared = true;
    if (!users) return;

    const newUsers = await mutate(client, {
      mutation: CREATEUSERS,
      variables: {
        input: {
          users: users.map(user => {
            const newUser = { ...user };
            newUser.event = eventData.id;
            delete newUser.key;
            return newUser;
          })
        }
      }
    });

    userStore.set(newUsers.data.createUsers.users);

    // populate eventData Store with user Data
    $eventDataStore.users = $userStore;
  };

  const handleBackBtn = e => {
    navigate(`${svelteEnv.frontUrl}/${eventData.slug}/${eventData.link}`);
  };
</script>

<style>
  .descriptionBox {
    align-self: flex-start;
    margin-top: -1rem;
    max-width: 85vw;
    margin-bottom: 1rem;
  }

  .descriptionBoxGlobal,
  .descriptionBoxEdit {
    max-width: 85vw;
    margin-bottom: 4rem;
  }

  .persons {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 0 1.5rem;
  }

  .persons {
    padding-top: 2rem;
  }

  .personBevoreShare {
    padding-top: 1rem;
  }

  .personBevoreShare:last-child {
    padding-bottom: 3rem;
  }

  .person {
    padding-top: 2rem;
  }

  .person:first-child {
    padding-top: unset;
  }

  .person:last-child {
    margin-bottom: 7rem;
  }

  .inputAddPerson {
    margin-top: auto;
  }

  .linkBoxGlobal,
  .linkBoxEdit {
    margin-bottom: 4rem;
  }

  .share {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .btnCta {
    justify-self: flex-end;
    margin-top: auto;
  }
</style>

<Head title={`Corrogo - Share ${eventData.name}`} />

<PageTransition>

  <section class="share">
    <section
      class="hero"
      out:send={{ key: 'hero' }}
      in:receive={{ key: 'hero' }}>
      <Hero bgImage={eventData.heroImgPreview} />
    </section>
    <section class="descriptionBox">
      {#if !shared}
        <DescriptionBox title={'Ivite your freands to your event!'} />
      {:else}
        <DescriptionBox
          title={'Send your Invites out, by sharing the following links with your freands'} />
      {/if}
    </section>
    <section class="persons">
      {#if users}
        {#if !shared}
          {#each users as { name, key }, index (key)}
            <div class="personBevoreShare" animate:flip={{ duration: 250 }}>
              <PersonCard {name} {index} />
            </div>
          {/each}
        {:else}
          {#each users as { name, link }}
            <div class="person">
              <PersonCard {name} />
              <LinkBox
                value={`${svelteEnv.frontUrl}/${eventData.slug}/${eventData.link}/${link}`} />
            </div>
          {/each}
        {/if}
      {/if}
    </section>
    {#if !shared}
      <section class="inputAddPerson">
        <AddPerson on:addperson={handleAddPerson} />
      </section>
    {/if}
    {#if shared}
      <section class="descriptionBoxGlobal">
        <DescriptionBox
          title={'Use this one to share it with whoever you want'} />
      </section>
      <section class="linkBoxGlobal">
        <LinkBoxGlobal
          value={`${svelteEnv.frontUrl}/${eventData.slug}/${eventData.link}`} />
      </section>
      <section class="descriptionBoxEdit">
        <DescriptionBox
          title={'Save this Link to eventually edit your event later!'} />
      </section>
      <section class="linkBoxEdit">
        <LinkBoxEdit
          value={`${svelteEnv.frontUrl}/edit/${eventData.slug}/${eventData.editLink}`} />
      </section>
    {/if}
    <section class="btnCta">
      {#if !shared}
        <BigBtn text={'Share !'} on:bigbtnclick={handleShareBtn} />
      {:else}
        <BigBtn
          text={'Back to your page'}
          on:bigbtnclick={handleBackBtn}
          minusMargin={5}
          pannelHeight={15}
          fontSize={2.8}
          clipVar={'tertiary-fixed'} />
      {/if}
    </section>
  </section>

</PageTransition>
