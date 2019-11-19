<script>
  export let value;
</script>

<style>
  .linkBox {
    width: calc(100% - 2rem);
    padding: 1.5rem 1rem 1rem 1rem;
    margin-top: -2rem;
    font-family: var(--font-primary);
    font-weight: 300;
    font-size: 1.4rem;
    color: var(--color-text-primary);
    background-color: #013f6f;
    border: none;
    border-radius: 2px;
    transition: all 0.05s ease-in-out;
  }

  .linkBox::placeholder {
    color: var(--color-text-primary);
    opacity: 0.5;
  }
</style>

<input
  class="linkBox"
  id="linkBox"
  type="text"
  name="linkBox"
  readonly
  bind:value />
