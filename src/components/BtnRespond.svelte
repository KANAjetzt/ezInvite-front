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

  .btnConfirmWrapper {
    display: grid;
    grid-row: 2 / 3;
    grid-column: 1 / 3;
    width: 115%;
    filter: drop-shadow(2px 4px 0px rgba(0, 0, 0, 0.1));
  }

  .btnConfirm {
    margin-top: -2rem;
    background: #0467b3;
    clip-path: polygon(0 0, 100% 0, 70% 100%, 0 100%);
  }

  .confirmIconWrapper,
  .declineIconWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .confirmIconWrapper {
    padding: 4rem 5rem 2rem 0;
  }

  .btnDecline {
    display: flex;
    align-content: flex-end;
    align-items: flex-end;
    grid-row: 2 / 3;
    grid-column: 2 / 4;
    width: 120%;
    background: linear-gradient(112.87deg, #0364af 7.85%, #0d8ff2 96.54%);
    border-radius: 2px;
  }

  .declineIconWrapper {
    padding: 2rem 2.6rem 2rem 0;
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

<div class="btnConfirmWrapper">
  <button
    class="btnConfirm"
    on:click={e => {
      dispatch('confirmbtnclick', e);
    }}>
    <div class="confirmIconWrapper">
      <CheckIcon height={45} width={45} fill={'#f9fafb'} bg={true} />
      <span class="btnText">confirm</span>
    </div>
  </button>
</div>
<button
  class="btnDecline"
  on:click={e => {
    dispatch('declinebtnclick', e);
  }}>
  <div class="declineIconWrapper">
    <XIcon height={45} width={45} fill={'#f9fafb'} bg={true} />
    <span class="btnText">decline</span>
  </div>
</button>
