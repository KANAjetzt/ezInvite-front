<script>
  import AddHeroImg from "./AddHeroImg.svelte";
  import SimpleField from "./SimpleField.svelte";
  import Rotate from "./Rotate.svelte";
  import BtnPanel from "./BtnPanel.svelte";
  import NormalBtn from "./NormalBtn.svelte";
  import AddStartEndTime from "./AddStartEndTime.svelte";
  import AddDescription from "./AddDescription.svelte";
  import AddImgs from "./AddImgs.svelte";
  import LocationPicker from "./AddLocationPicker.svelte";
  import WidgetPicker from "./AddSelectWidget.svelte";
  import AddWidgets from "./AddWidget.svelte";
  import BtnBig from "./BtnBig.svelte";

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

  .selectBtns {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100vw;
  }

  .imgsUpload {
    margin-top: 2rem;
  }

  .widgetPicker {
    margin-top: 2rem;
  }

  .widgets {
    margin-top: 2rem;
  }
</style>

<div class="topBar" />
<form class="form">
  <section class="heroImg">
    <AddHeroImg />
  </section>
  <section class="simpleFields">
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
  </section>
  {#if !moreVisible}
    <section class="selectBtns">
      <BtnPanel minusMargin={2.5}>
        <NormalBtn
          text={'Add more'}
          type={'normal'}
          on:normalbtnclick={handleNormalBtnClick} />
        <NormalBtn text={'GO !'} type={'cta'} />
      </BtnPanel>
    </section>
  {:else}
    <section class="startEndTime">

      <AddStartEndTime />
    </section>
    <section class="description">
      <AddDescription />
    </section>
    <section class="imgsUpload">
      <AddImgs />
    </section>
    <section class="locationPicker">
      <LocationPicker />
    </section>
    <section class="widgetPicker">
      <WidgetPicker />
    </section>
    <section class="widgets">
      <AddWidgets />
    </section>
    <section>
      <BtnBig text={'GO !'} />
    </section>
  {/if}

</form>
