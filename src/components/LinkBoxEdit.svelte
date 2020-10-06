<script>
  import EditIcon from "../components/Icons/Edit.svelte";
  import SingleShareBtn from "../components/BtnSingleShare.svelte";

  export let value;
</script>

<style>
  .linkBoxEdit {
    display: flex;
    align-content: center;
    align-items: center;
    padding: 0 1.5rem;
  }

  .linkBoxEditInput {
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

  .linkBoxEdit::placeholder {
    color: var(--color-text-primary);
    opacity: 0.5;
  }
</style>

<div class="linkBoxEdit">
  <EditIcon width={30} height={30} fill={'#f9fafb'} bg={true} border={true} />
  <input
    class="linkBoxEditInput"
    id="linkBoxEdit"
    type="text"
    name="linkBoxEdit"
    readonly
    bind:value />
  <SingleShareBtn width={25} height={25} marginLeft={-2} {value} />
</div>
