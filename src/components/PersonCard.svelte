<script>
  import { slide, fly, crossfade } from "svelte/transition";

  import { appStore, userStore } from "../stores.js";
  import {
    getLocalStorage,
    saveLocalStorage,
    deleteLocalStorage
  } from "../utils/localStorageHandler.js";
  import PersonImg from "./PersonImg.svelte";
  import BtnRemove from "../components/BtnRemove.svelte";

  export let photo = undefined;
  export let name;
  export let index;

  const handlePersonRemove = index => {
    // delete person from store
    userStore.update(currentData => {
      let newData = [...currentData];
      newData.splice(index, 1);
      saveLocalStorage(newData, "users");
      return newData;
    });
    // update local storage
  };
</script>

<style>
  .personCard {
    display: flex;
    align-items: center;
    z-index: 20;
  }

  .name {
    background-color: var(--color-primary-light);
    padding: 1rem 2rem;
    margin-left: -1rem;
    border-radius: 2px;
    font-family: var(--font-primary);
    font-weight: 400;
    font-size: 1.6rem;
    color: var(--color-text-primary);
  }
</style>

<div class="personCard" transition:fly={{ duration: 150, x: -100 }}>
  <PersonImg {photo} {name} />
  <p class="name">{name ? name : 'Your Name'}</p>
</div>
{#if $appStore.currentPage === 'share'}
  <div transition:fly={{ duration: 150, x: -100 }}>
    <BtnRemove
      width={20}
      height={20}
      marginTop={-2}
      marginLeft={-1}
      on:removebtnclick={() => handlePersonRemove(index)} />
  </div>
{/if}
