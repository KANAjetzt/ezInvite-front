<script>
  import { appStore } from "../stores.js";
</script>

<style>
  .messageBox {
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background-color: var(--color-primary);
    color: var(--color-text-primary);
    font-family: var(--font-primary);
    font-size: 1.8rem;
    z-index: 500;
    padding: 2rem 1.5rem 9rem 1.5rem;
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 15vw), 0 100%);
  }

  .messageList {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>

<div class="messageBox">
  <ul class="messageList">
    {#each $appStore.messages as message}
      <li class="messageItem">{message.message}</li>
    {/each}
  </ul>
</div>
