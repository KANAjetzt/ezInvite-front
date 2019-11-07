<script>
  import { createEventDispatcher } from "svelte";

  export let value = "";
  export let name;
  export let placeholder = "";
  export let heading;

  const dispatch = createEventDispatcher();
</script>

<style>
  .input {
    width: calc(100% - 3rem);
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

  .label {
    display: block;
    font-family: var(--font-primary);
    font-weight: 700;
    font-size: 1.4rem;
    letter-spacing: 0.5px;
    color: var(--color-text-primary);
    margin-bottom: 0.75rem;
    padding-left: 1.5rem;
  }
</style>

<label for={name} class="label">{heading}</label>
<input
  id={name}
  class="input"
  type="text"
  bind:value
  {placeholder}
  {name}
  on:change={e => {
    dispatch('simplefieldchange', e.target.value);
  }} />
