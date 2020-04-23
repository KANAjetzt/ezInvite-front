<script>
  import { onMount } from "svelte";

  import { appStore } from "../stores";

  export let clipVar = "";

  $: if (
    $appStore.messages.filter(
      message =>
        message.location === "inputEventName" ||
        message.location === "inputStartDate"
    )[0]
  ) {
    //get BtnWrapper
    const btnWrapper = document.querySelector(".btnWrapper");

    // add error class
    btnWrapper.classList.add("btnWrapper__error");

    // Listen for Animationend
    btnWrapper.addEventListener("animationend", () => {
      // remove error class
      btnWrapper.classList.remove("btnWrapper__error");
    });
  }
</script>

<style>
  .pannelWrapper {
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25));
    /* I think on AddEvent this fixed something */
    /* height: 100%; */
  }
  .pannel {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 9rem;
    margin-bottom: -3rem;
    padding-top: 4.5rem;
    background: linear-gradient(112.82deg, #0364af 7.85%, #0d8ff2 96.54%);
    clip-path: var(--clip-secondary);
  }

  .pannel--tertiary {
    clip-path: var(--clip-tertiary);
  }

  @media only screen and (min-width: 24em) {
    .pannel {
      clip-path: var(--clip-secondary-fixed);
    }

    .pannel--tertiary {
      clip-path: var(--clip-tertiary-fixed);
    }
  }

  .btnWrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 3rem;
    width: 90%;
  }

  :global(.btnWrapper__error) {
    animation: wiggle 0.8s;
  }
</style>

<div class="pannelWrapper">
  <div class="pannel pannel--{clipVar}">
    <div class="btnWrapper">
      <slot />
    </div>
  </div>
</div>
