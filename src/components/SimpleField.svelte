<script>
  export let type;
  export let value = "";
  export let name;
  export let placeholder;
  export let heading;
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
    border-bottom: solid 1px var(--color-secondary);
    transition: all 0.05s ease-in-out;
  }

  .input::placeholder {
    color: var(--color-text-primary);
    opacity: 0.95;
  }

  .input:focus {
    outline: none;
    border-bottom: solid 3px var(--color-secondary);
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
<input id={name} class="input" {type} {value} {placeholder} {name} />
