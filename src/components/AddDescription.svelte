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
    box-shadow: 3px 7px 5px rgba(0, 0, 0, 0.2);
  }
</style>

<label class="label" for="description">Description</label>
<textarea
  name="description"
  id="description"
  class="input"
  cols="30"
  rows="10"
  placeholder="Describe what you are planing..." />
