<script>
  import GlobeIcon from "../components/Icons/Globe.svelte";

  export let value;
</script>

<style>
  .linkBoxGlobal {
    display: flex;
    align-content: center;
    align-items: center;
    padding: 0 1.5rem;
  }

  .linkBoxGlobalInput {
    flex-grow: 1;
    margin-left: -2rem;
    padding: 1rem 1rem 1rem 2.5rem;
    font-family: var(--font-primary);
    font-weight: 300;
    font-size: 1.4rem;
    color: var(--color-text-primary);
    background-color: #013f6f;
    border: none;
    border-radius: 2px;
    transition: all 0.05s ease-in-out;
  }

  .linkBoxGlobal::placeholder {
    color: var(--color-text-primary);
    opacity: 0.5;
  }
</style>

<div class="linkBoxGlobal">
  <GlobeIcon width={30} height={30} fill={'#f9fafb'} bg={true} border={true} />
  <input
    class="linkBoxGlobalInput"
    id="linkBoxGlobal"
    type="text"
    name="linkBoxGlobal"
    readonly
    bind:value />
</div>
