<script>
  export let startTime = undefined;
  export let endTime = undefined;
</script>

<style>
  .startEndTime {
    display: grid;
    grid-template-columns: 1fr min-content 1fr;
    align-items: center;
    justify-items: center;
    margin-top: 2rem;
    /* padding: 0 1.5rem; */
    padding-bottom: 2rem;
    border-bottom: solid 1px var(--color-secondary);
  }

  .startTime,
  .endTime {
    display: flex;
    flex-direction: column;
  }

  .label {
    grid-row: 1 / 2;
    display: inline-block;
    font-family: var(--font-primary);
    font-weight: 700;
    font-size: 1.4rem;
    letter-spacing: 0.5px;
    color: var(--color-text-primary);
    margin-bottom: 0.5rem;
  }

  /*
   -- On Firefox the input is not centerd -- 
   -- Added extra wrapper divs to inputs  --
   -- to center it on firefox as well     --
   -- could remove divs and add           --
   -- @supports(-moz-appearance:none)     --
   -- and unset the with for firefox      --
  */
  .input {
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 100%;
    font-family: var(--font-primary);
    font-weight: 300;
    font-size: 1.8rem;
    text-align: center;
    color: var(--color-text-primary);
    background-color: transparent;
    border: none;
    transition: all 0.05s ease-in-out;
  }
  .input::placeholder {
    color: var(--color-text-primary);
    opacity: 0.95;
  }

  .input:focus {
    outline: none;
    box-shadow: 0 3px 0 var(--color-secondary);
  }

  .dash {
    grid-column: 2 / 3;
    grid-row: 1 / 3;
    height: 1px;
    width: 2rem;
    background: var(--color-secondary);
  }
</style>

<div class="startEndTime">
  <div class="startTime">
    <label class="label" for="startTime">Start Time</label>
    <input
      type="time"
      id="startTime"
      class="input"
      name="startTime"
      bind:value={startTime} />
  </div>
  <div class="dash" />
  <div class="endTime">
    <label class="label" for="endTime">End Time</label>
    <input
      type="time"
      id="endTime"
      class="input"
      name="endTime"
      bind:value={endTime} />
  </div>
</div>
