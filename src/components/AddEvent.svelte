<script>
  import AddHeroImg from "./AddHeroImg.svelte";
  import SimpleField from "./SimpleField.svelte";
  import Rotate from "./Rotate.svelte";
  import BtnPanel from "./BtnPanel.svelte";
  import NormalBtn from "./NormalBtn.svelte";
  import AddStartEndTime from "./AddStartEndTime.svelte";
  import AddDescription from "./AddDescription.svelte";
  import AddImgs from "./AddImgs.svelte";
  import LocationSearch from "./AddLocationSearch.svelte";
  import LocationPicker from "./AddLocationPicker.svelte";

  let moreVisible = false;

  // Render all Form Fields not shown by default
  const handleNormalBtnClick = e => {
    e.detail.preventDefault();
    moreVisible = true;
  };
</script>

<style>
  .topBar {
    width: 100%;
    height: 0.5rem;
    background-image: linear-gradient(
      89.87deg,
      #022c4d -2.53%,
      #045595 112.27%
    );
  }

  .form {
    display: flex;
    flex-direction: column;
    /* With fields over one Page space-between doesen't work well */
    /* justify-content: space-between; */
    min-height: 100vh;
  }

  .form:last-child {
    margin-bottom: -5rem;
  }
  .title {
    margin-top: 5rem;
  }

  .date {
    margin-top: 2rem;
  }

  .btnPanel {
    width: 100vw;
    transform: rotate(-9deg) scale(1.2);
  }

  .ImgsUpload {
    margin-top: 2rem;
  }
</style>

<div class="topBar" />
<form class="form">
  <AddHeroImg />
  <div class="FormFields">
    <div class="title">
      <SimpleField
        type={'text'}
        name={'Title'}
        heading={'Title'}
        placeholder={'What are you planing?'} />
    </div>
    <div class="date">
      <SimpleField
        type={'text'}
        name={'Date'}
        heading={'Date'}
        placeholder={'When does it start?'} />
    </div>
  </div>
  <!-- {#if !moreVisible}
    <Rotate child={'.btnPanel'}>
      <div class="btnPanel">
        <BtnPanel>
          <NormalBtn
            text={'Add more'}
            type={'normal'}
            on:normalbtnclick={handleNormalBtnClick} />
          <NormalBtn text={'GO !'} type={'cta'} />
        </BtnPanel>
      </div>
    </Rotate>
  {:else} -->
  <AddStartEndTime />
  <AddDescription />
  <section class="ImgsUpload">
    <AddImgs />
  </section>
  <LocationSearch />
  <!-- <LocationPicker /> -->
  <!-- {/if} -->

</form>
