<script>
  import { createEventDispatcher } from "svelte";

  import { appStore, eventDataStore } from "../stores.js";
  import { addMessage } from "../utils/messageHandler.js";

  import ShareIcon from "./Icons/Share.svelte";

  export let value;
  export let defaultBehavior = true;
  export let marginTop = 0;
  export let marginLeft = 0;
  export let width = 25;
  export let height = 25;

  const dispatch = createEventDispatcher();

  const copyToClipboard = async textValue => {
    await navigator.clipboard.writeText(textValue);

    $appStore.messages = addMessage(
      $appStore.messages,
      "info",
      "shareLinkCopyedToClipboard",
      "Copyed to clipboard!",
      1
    );
  };

  const handleSingleShareBtn = async e => {
    if (defaultBehavior) {
      // if we have the web share API try to use it
      if (navigator.share) {
        try {
          await navigator.share({
            title: $eventDataStore.name,
            text: $eventDataStore.description,
            url: value
          });
        } catch (err) {
          console.log(err);
          // At the moment the share dialog only works one time,
          // then it throw a user agent error
          // https://stackoverflow.com/questions/64055853/navigator-share-only-working-once-in-ios-second-click-throws-error-request-is
          // so we copy the url to the clipboard instead :/

          await copyToClipboard(value);
        }
        // else just copy to clipboard
      } else {
        await copyToClipboard(value);
      }
    } else {
      e.preventDefault();
      dispatch("singlesharebtnclick");
    }
  };
</script>

<style>
  .singleShareBtn {
    display: flex;
    align-items: center;
    border: none;
    padding: 0;
    text-decoration: none;
    background: transparent;
    cursor: pointer;
    text-align: center;
    z-index: 20;
  }
</style>

<button
  type="button"
  class="singleShareBtn"
  on:click={e => handleSingleShareBtn(e)}
  style={`margin-top: ${marginTop}rem; margin-left: ${marginLeft}rem`}>
  <ShareIcon {width} {height} fill={'#f9fafb'} bg={true} />
</button>
