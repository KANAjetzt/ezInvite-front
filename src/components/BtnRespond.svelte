<script>
  import { createEventDispatcher } from "svelte";

  import CheckIcon from "./Icons/DoneFilled.svelte";
  import XIcon from "./Icons/Cross.svelte";

  const dispatch = createEventDispatcher();
</script>

<style>
  .btnConfirm,
  .btnDecline {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    border: none;

    cursor: pointer;
    text-decoration: none;
    font-family: var(--font-primary);
    font-weight: 700;
    font-size: 6.4rem;
    color: var(--color-text-primary);
  }

  .btnConfirm {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    margin-top: -2rem;
    padding: 4rem 12rem 2rem 3rem;
    background: #0467b3;
    clip-path: polygon(0 0, 100% 0, calc(100% - 17vw) 100%, 0 100%);
  }

  .btnDecline {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    margin-left: -7rem;
    padding: 2rem 4rem 2rem 7rem;
    background: linear-gradient(112.87deg, #0364af 7.85%, #0d8ff2 96.54%);
  }

  .btnText {
    cursor: pointer;
    padding: 0.5rem 2rem;
    margin-top: 2rem;
    border-radius: 24px;
    background-color: var(--color-primary-light);
    font-family: var(--font-primary);
    font-weight: 400;
    font-size: 1.4rem;
    color: var(--color-text-primary);
  }
</style>

<button
  class="btnConfirm"
  on:click={e => {
    dispatch('confirmbtnclick', e);
  }}>
  <CheckIcon height={45} width={45} fill={'#f9fafb'} bg={true} />
  <span class="btnText">confirm</span>
</button>
<button
  class="btnDecline"
  on:click={e => {
    dispatch('declinebtnclick', e);
  }}>
  <XIcon height={45} width={45} fill={'#f9fafb'} bg={true} />
  <span class="btnText">decline</span>
</button>
