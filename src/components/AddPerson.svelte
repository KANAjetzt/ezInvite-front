<script>
  import { createEventDispatcher } from "svelte";

  import PersonCountIcon from "./Icons/AddPerson.svelte";

  let personName;

  const dispatch = createEventDispatcher();

  const handleAddPerson = e => {
    const input = document.getElementById("personName");
    dispatch("addperson", personName);
    input.value = null;
  };
</script>

<style>
  .personAdd {
    display: flex;
    align-items: center;
    padding: 0 3rem 0 1.5rem;
  }

  .personAddBtn {
    border: none;
    background: transparent;
    cursor: pointer;
  }

  .inputPersonName {
    display: inline-block;
    flex-grow: 1;
    width: 16%;
    margin-left: -1rem;
    padding: 0.5rem 0 0.5rem 2rem;
    font-family: var(--font-primary);
    font-weight: 300;
    font-size: 1.8rem;
    color: var(--color-text-primary);
    background-color: var(--color-primary-light);
    border: none;
    transition: all 0.05s ease-in-out;
  }

  .inputPersonName::placeholder {
    color: var(--color-text-primary);
    opacity: 0.5;
  }
</style>

<div class="personAdd">
  <button class="personAddBtn" on:click={handleAddPerson}>
    <PersonCountIcon
      width={30}
      height={30}
      fill={'#f9fafb'}
      bg={true}
      border={true} />
  </button>
  <input
    class="inputPersonName"
    id="personName"
    type="text"
    placeholder="Name"
    name="personName"
    bind:value={personName}
    on:keydown={e => {
      if (e.keyCode === 13) handleAddPerson();
    }} />
</div>
