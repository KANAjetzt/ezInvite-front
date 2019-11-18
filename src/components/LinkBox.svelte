<script>
  export let value;
</script>

<style>
  .linkBox {
    display: flex;
    padding: 0.5rem;
    padding-top: 1.5rem;
    margin-left: 1.5rem;
    margin-top: -1.8rem;
    font-family: var(--font-primary);
    font-weight: 300;
    font-size: 1.6rem;
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
