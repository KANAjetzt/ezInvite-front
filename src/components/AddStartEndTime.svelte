<script>
  import AddTime from "./AddTime.svelte";
</script>

<style>
  .startEndTime {
    display: grid;
    grid-template-columns: 1fr min-content 1fr;
    grid-template-rows: min-content 1fr;
    align-items: center;
    justify-items: center;
    margin-top: 2rem;
    padding: 0 1.5rem;
    padding-bottom: 2rem;
    border-bottom: solid 1px var(--color-secondary);
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

  .dash {
    grid-column: 2 / 3;
    grid-row: 1 / 3;
    height: 1px;
    width: 2rem;
    background: var(--color-secondary);
  }
</style>

<div class="startEndTime">
  <label class="label">Start Time</label>
  <AddTime />
  <div class="dash" />
  <label class="label">End Time</label>
  <AddTime />
</div>
