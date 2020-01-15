<script>
  import { createEventDispatcher } from "svelte";

  import DescriptionBox from "./DescriptionBox.svelte";
  import BtnBig from "./BtnBig.svelte";

  const dispatch = createEventDispatcher();
</script>

<style>
  .shareBtn {
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 10rem;
    z-index: 200;
  }

  .shareBtn > div:first-child {
    width: 88%;
  }

  .bigBtn {
    padding: 0.8rem 3.5rem 0.8rem 1.5rem;
    margin: 0;
    margin-top: -0.5rem;
    grid-column: 1 / 3;
    border: none;
    border-radius: 2px;
    background-image: linear-gradient(
      113.21deg,
      rgb(3, 100, 175) 7.85%,
      rgb(13, 143, 242) 96.54%
    );
    cursor: pointer;
    z-index: 20;
    text-align: center;
    text-decoration: none;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    font-family: var(--font-primary);
    font-weight: 700;
    font-size: 6.4rem;
    color: var(--color-text-primary);
  }
</style>

<div class="shareBtn">
  <DescriptionBox title={'Everything Looks good?'} />
  <button
    class="bigBtn"
    on:click={e => {
      dispatch('sharebtnclick', e);
    }}>
    Share!
  </button>
</div>
