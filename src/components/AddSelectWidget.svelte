<script>
  import DescriptionBox from "./DescriptionBox.svelte";
  import Rotate from "./Rotate.svelte";
  import DoneDoubleIcon from "./Icons/DoneDouble.svelte";
</script>

<style>
  .widgetPicker {
    margin-top: -6rem;
  }

  .background {
    width: 100vw;
    background: var(--color-primary-light);
    transform: rotate(-9deg) scale(1.15);
  }

  .wrapper {
    transform: rotate(9deg);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6rem 4rem 4rem 4rem;
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
  <Rotate child={'.background'}>
    <div class="background">
      <div class="wrapper">
        <button class="btn">
          <DoneDoubleIcon
            width={80}
            height={80}
            fill={'rgba(0, 0, 0, 0.85)'}
            bg={true} />
          <h4 class="btnTitle">List</h4>
          <p class="btnText">
            Tell your freands what you need, and let them tell you what they
            bring
          </p>
        </button>
      </div>
    </div>
  </Rotate>
</div>
