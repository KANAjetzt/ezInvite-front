<script>
  import { appStore } from "../stores.js";
  import { saveLocalStorage } from "../utils/localStorageHandler.js";
  import getLangauge from "../utils/getLanguage.js";

  const setLanguage = async () => {
    $appStore.languages = await getLangauge($appStore.currentLanguage);

    saveLocalStorage($appStore, "appStore");
  };
</script>

<style>
  .settings {
    padding: 3rem 5rem 3rem 7rem;
    background-color: var(--color-primary);
    clip-path: polygon(15% 0, 100% 0, 85% 100%, 0 100%);
  }

  select {
    font-family: var(--font-primary);
    cursor: pointer;
    display: inline-block;
    position: relative;
    font-size: 16px;
    padding: 0.5rem 2rem;
    border: none;
    box-shadow: 0 2px 0 var(--color-secondary);
    background-color: transparent;
    color: var(--color-text-primary);
  }

  option {
    background-color: var(--color-primary);
  }
</style>

<div class="settings">
  <select
    bind:value={$appStore.currentLanguage}
    on:input={() => {
      setTimeout(() => {
        setLanguage();
      }, 0);
    }}>
    <option value="de">Deutsch</option>
    <option value="en">English</option>
  </select>
</div>
