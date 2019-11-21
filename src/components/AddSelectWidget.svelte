<script>
  import { createEventDispatcher } from "svelte";

  import DescriptionBox from "./DescriptionBox.svelte";
  import DoneDoubleIcon from "./Icons/DoneDouble.svelte";

  const dispatch = createEventDispatcher();
</script>

<style>
  .widgetPicker {
    margin-top: -6rem;
    width: 100vw;
    display: flex;
    justify-content: center;
    background: var(--color-primary-light);
    clip-path: var(--clip-primary);
    padding: 9rem 0;
  }

  .btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    padding: 0;
    margin: 0;
    text-decoration: none;
    background: transparent;
    cursor: pointer;
    text-align: center;
    z-index: 20;
  }

  .btn:focus {
    outline: solid 1px var(--color-primary);
  }

  .btnTitle {
    margin: 0;
    margin-top: 1.5rem;
    font-family: var(--font-primary);
    font-weight: 700;
    font-size: 1.4rem;
    color: var(--color-text-primary);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .btnText {
    margin: 0;
    margin-top: 0.5rem;
    max-width: 25ch;
    font-family: var(--font-primary);
    font-weight: 300;
    font-size: 1.4rem;
    color: var(--color-text-primary);
  }
</style>

<DescriptionBox title={'Add Widgets'} text={'Need something extra?'} />

<div class="widgetPicker">
  <button class="btn" on:click={e => dispatch('listbtnclick', e)}>
    <DoneDoubleIcon
      width={80}
      height={80}
      fill={'rgba(0, 0, 0, 0.85)'}
      bg={true} />
    <h4 class="btnTitle">List</h4>
    <p class="btnText">
      Tell your freands what you need, and let them tell you what they bring
    </p>
  </button>
</div>
