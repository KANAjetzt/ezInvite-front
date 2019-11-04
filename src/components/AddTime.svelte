<script>
  export let houre = 0;
  export let minute = 0;
</script>

<style>
  .input {
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

  .spacer {
    font-family: var(--font-primary);
    font-weight: 300;
    font-size: 1.8rem;
    color: var(--color-text-primary);
  }
</style>

<div class="time">
  <input
    id="houres"
    class="input"
    type="number"
    min="0"
    max="24"
    placeholder="00"
    name="houres"
    bind:value={houre} />
  <span class="spacer">:</span>
  <input
    id="minutes"
    class="input"
    type="number"
    min="0"
    max="60"
    placeholder="00"
    name="minutes"
    bind:value={minute} />
</div>
