<script>
  import { appStore, eventDataStore } from "../stores.js";
  import { addMessage } from "../utils/messageHandler.js";
  import SingleShareBtn from "./BtnSingleShare.svelte";

  export let value;
  let sharing = false;

  const handleInputClick = async () => {
    await navigator.clipboard.writeText(value);

    $appStore.messages = addMessage(
      $appStore.messages,
      "info",
      "shareLinkCopyedToClipboard",
      "Copyed to clipboard!",
      1
    );
  };

  const handleSingleShareBtnClick = async () => {
    sharing = true;
    setTimeout(() => {
      sharing = false;
    }, 1000);
    if (navigator.share) {
      try {
        await navigator.share({
          title: $eventDataStore.name,
          text: $eventDataStore.description,
          url: value
        });
      } catch (err) {
        console.log(err);
        $appStore.messages = addMessage(
          $appStore.messages,
          "error",
          "shareLinkShareAPI",
          "Something went wrong :("
        );
      }
    }
  };
</script>

<style>
  .linkBox {
    width: calc(100% - 2rem);
    padding: 1.5rem 1rem 1rem 1rem;
    margin-top: -2rem;
    font-family: var(--font-primary);
    font-weight: 300;
    font-size: 1.4rem;
    color: var(--color-text-primary);
    background-color: #013f6f;
    border: none;
    border-radius: 2px;
    transition: all 0.05s ease-in-out;
  }

  .linkBox::placeholder {
    color: var(--color-text-primary);
    opacity: 0.5;
  }

  .input {
    display: flex;
  }
</style>

<div class="input">
  <input
    class="linkBox"
    id="linkBox"
    type="text"
    name="linkBox"
    readonly
    bind:value
    on:click={handleInputClick} />
  {#if navigator.share && !sharing}
    <SingleShareBtn
      width={25}
      height={25}
      marginTop={-2}
      marginLeft={-2}
      on:singlesharebtnclick|once={handleSingleShareBtnClick} />
  {/if}
</div>
