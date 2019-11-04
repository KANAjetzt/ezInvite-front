<script>
  export let value = undefined;
</script>

<style>
  .label {
    display: block;
    margin-top: 2rem;
    font-family: var(--font-primary);
    font-weight: 700;
    font-size: 1.4rem;
    letter-spacing: 0.5px;
    color: var(--color-text-primary);
    margin-bottom: 0.75rem;
    padding-left: 1.5rem;
  }

  .input {
    width: calc(100% - 3rem);
    height: 15rem;
    padding: 0 1.5rem 1rem 1.5rem;
    font-family: var(--font-primary);
    font-weight: 300;
    font-size: 1.8rem;
    color: var(--color-text-primary);
    background-color: transparent;
    border: none;
    box-shadow: 0 1px 0 var(--color-secondary);
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
</style>

<label class="label" for="description">Description</label>
<textarea
  name="description"
  id="description"
  class="input"
  cols="30"
  rows="10"
  placeholder="Describe what you are planing..."
  bind:value />
