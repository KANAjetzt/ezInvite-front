<script>
  // TODO: - Add delete all Btn
  // TODO: - Add delete one Btn

  import { Router, Link, Route, navigate } from "svelte-routing";
  import { getClient, mutate } from "svelte-apollo";
  import { gql } from "apollo-boost";

  import { eventDataStore, todoStore, userStore } from "../stores.js";
  import {
    getLocalStorage,
    saveLocalStorage
  } from "../utils/localStorageHandler.js";
  import Hero from "../components/Hero.svelte";
  import DescriptionBox from "../components/DescriptionBox.svelte";
  import PersonCard from "../components/PersonCard.svelte";
  import LinkBox from "../components/LinkBox.svelte";
  import LinkBoxGlobal from "../components/LinkBoxGlobal.svelte";
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
        }
      }
    }
  `;

  const handleAddPerson = e => {
    const personName = e.detail;

    userStore.update(currentData => {
      let newData = currentData ? [...currentData] : [];
      newData = [...newData, { name: personName }];
      saveLocalStorage(newData, "users");
      return newData;
    });
  };

  const handleShareBtn = async e => {
    // create Input Object --> check CREATEUSERS GraphQL Docs if needed
    const input = {
      users: users.map(user => {
        const newUser = { ...user };
        newUser.event = eventData.id;
        return newUser;
      })
    };

    const newUsers = await mutate(client, {
      mutation: CREATEUSERS,
      variables: { input }
    });

    userStore.set(newUsers.data.createUsers.users);
    shared = true;
  };

  const handleBackBtn = e => {
    navigate(`http://localhost:5000/${eventData.slug}/${eventData.link}`);
  };
</script>

<style>
  .descriptionBox {
    align-self: flex-start;
    margin-top: -1rem;
    max-width: 85vw;
    margin-bottom: 1rem;
  }

  .descriptionBoxGlobal {
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

  .linkBoxGlobal {
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

<Router>

  <section class="share">
    <Hero bgImage={eventData.heroImgPreview} />
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
          {#each users as { name }}
            <PersonCard {name} />
          {/each}
        {:else}
          {#each users as { name, link }}
            <div class="person">
              <PersonCard {name} />
              <LinkBox
                value={`http://localhost:5000/${eventData.slug}/${eventData.link}/${link}`} />
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
          title={'Or use this one to share it with whoever you want'} />
      </section>
      <section class="linkBoxGlobal">
        <LinkBoxGlobal
          value={`http://localhost:5000/${eventData.slug}/${eventData.link}`} />
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
          clipVar={'tertiary'} />
      {/if}
    </section>
  </section>

</Router>
