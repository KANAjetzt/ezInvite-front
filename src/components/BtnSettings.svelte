<script>
  import { createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";

  import { appStore } from "../stores.js";
  import SettingsIcon from "./Icons/Settings.svelte";
  import Settings from "./Settings.svelte";
  import BtnRemove from "./BtnRemove.svelte";
  let languageLetter = false;
  let icon = false;

  let btn = true,
    settings;

  // https://stackoverflow.com/questions/59882179/svelte-transition-between-two-elements-jumps
  const changeBtnSettings = () => {
    btn ? (btn = !btn) : settings ? (settings = !settings) : null;
  };

  const changeLanguageLetterIcon = () => {
    languageLetter
      ? (languageLetter = !languageLetter)
      : icon
      ? (icon = !icon)
      : null;
  };

  const dispatch = createEventDispatcher();

  // Dispatch an event and handle it where it get used.
  const handleFilterBtn = e => {
    e.preventDefault();

    changeBtnSettings();

    dispatch("filterbtnclick");
  };

  setTimeout(() => {
    languageLetter = true;
  }, 100);
</script>

<style>
  p {
    font-family: var(--font-primary);
    font-weight: 700;
    font-size: 1.4rem;
    color: var(--color-text-primary);
  }

  .btnMinified {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0;
    border: none;
    cursor: pointer;
    text-decoration: none;
    background: rgba(4, 103, 179, 0.795);
    clip-path: polygon(0 0, 100% 0, 0% 100%, 0 100%);
    padding: 1rem 3rem 6rem 1.5rem;
    width: 100%;
    pointer-events: auto;
  }

  .btnRemove {
    float: right;
    margin: -1rem;
  }
</style>

{#if btn}
  <button
    transition:fly|local={{ duration: 150, x: -100 }}
    on:outroend={() => (settings = true)}
    class="btnMinified"
    on:click={e => handleFilterBtn(e)}>
    {#if languageLetter}
      <div
        transition:fly|local={{ duration: 250, x: -100 }}
        on:introend={() => {
          setTimeout(() => {
            changeLanguageLetterIcon();
          }, 3000);
        }}
        on:outroend={() => (icon = true)}
        class="languageLetter">
        {#if $appStore.currentLanguage === 'de'}
          <p>DE</p>
        {:else}
          <p>EN</p>
        {/if}
      </div>
    {/if}
    {#if icon}
      <div
        transition:fly|local={{ duration: 250, x: -200 }}
        on:introend={() => {
          const btnSettings = document.querySelector('.btnSettings');
          btnSettings.style.width = 'unset';
          btnSettings.style.height = 'unset';
          btnSettings.classList.add('btnSettings--scaleDown');
        }}
        on:outroend={() => (languageLetter = true)}
        class="icon">
        <SettingsIcon height={30} width={30} fill={'#fff'} />
      </div>
    {/if}
  </button>
{/if}

{#if settings}
  <div
    class="settings"
    transition:fly|local={{ duration: 150, x: -200 }}
    on:outroend={() => (btn = true)}>
    <Settings />
    <div class="btnRemove">
      <BtnRemove
        width={20}
        height={20}
        marginLeft={-6}
        on:removebtnclick={() => {
          changeBtnSettings();
        }} />
    </div>
  </div>
{/if}
