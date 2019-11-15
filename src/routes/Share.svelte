<script>
  // TODO: - Add delete all Btn
  // TODO: - Add delete one Btn

  import { Router, Link, Route } from "svelte-routing";

  import { eventDataStore, todoStore, userStore } from "../stores.js";
  import {
    getLocalStorage,
    saveLocalStorage
  } from "../utils/localStorageHandler.js";
  import Hero from "../components/Hero.svelte";
  import DescriptionBox from "../components/DescriptionBox.svelte";
  import PersonCard from "../components/PersonCard.svelte";
  import AddPerson from "../components/AddPerson.svelte";
  import BigBtn from "../components/BtnBig.svelte";

  if (Object.keys($eventDataStore).length === 0) {
    eventDataStore.set(getLocalStorage("eventData"));
  }

  if ($userStore && $userStore.length === 0) {
    userStore.set(getLocalStorage("users"));
  }

  let eventData = $eventDataStore;
  console.log(eventData);
  let users;

  userStore.subscribe(newData => {
    users = newData;
  });

  // TODO: listen to Enterkey aswell
  const handleAddPerson = e => {
    const personName = e.detail;
    console.log(personName);

    userStore.update(currentData => {
      let newData = currentData ? [...currentData] : [];
      newData = [...newData, { name: personName }];
      saveLocalStorage(newData, "users");
      return newData;
    });
    console.log(users);
  };
</script>

<style>
  .descriptionBox {
    align-self: flex-start;
  }

  .inputAddPerson {
    margin-top: auto;
  }

  .share {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .btnCta {
    justify-self: flex-end;
  }
</style>

<Router>

  <section class="share">
    <Hero bgImage={eventData.heroImgPreview} />
    <section class="descriptionBox">
      <DescriptionBox title={'Ivite your freands to your event!'} />
    </section>
    {#if users}
      {#each users as { name }}
        <PersonCard {name} />
      {/each}
    {/if}

    <section class="inputAddPerson">
      <AddPerson on:addperson={handleAddPerson} />
    </section>
    <section class="btnCta">
      <BigBtn text={'Share !'} />
    </section>
  </section>

</Router>
