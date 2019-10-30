<script>
  import PersonAddBtn from "./PersonAddBtn.svelte";
  import PersonCountIcon from "./Icons/AddPerson.svelte";
</script>

<style>
  .inputWrapper {
    display: flex;
    align-items: center;
    margin: 5rem 0 2rem 0;
  }

  .inputBox {
    display: inline;
    padding: 0.5rem 1.5rem;
    margin: 0;
    margin-left: -1rem;
    margin-right: -1rem;
    border: none;
    border-radius: 2px;
    font-family: var(--font-primary);
    font-weight: 300;
    font-size: 1.6rem;
    color: var(--color-text-primary);
    background-color: var(--color-primary-light);
  }

  .inputBox::placeholder {
    color: var(--color-text-primary);
    opacity: 0.5;
  }
  .inputPersonCount {
    display: inline-block;
    width: 16%;
    margin-left: -1rem;
    padding-left: 2rem;
    font-family: var(--font-primary);
    font-weight: 300;
    font-size: 1.8rem;
    color: var(--color-text-primary);
    background-color: var(--color-primary-light);
    border: none;
    transition: all 0.05s ease-in-out;
  }

  .inputPersonCount::placeholder {
    color: var(--color-text-primary);
    opacity: 0.5;
  }
</style>

<div class="inputWrapper">
  <PersonAddBtn
    iconStyle="z-index: 20; transform: translateX(135%); opacity: 0.9;" />
  <input class="inputBox" type="text" placeholder="Add something.." />
  <label for="personCount">
    <PersonCountIcon
      width={25}
      height={25}
      fill={'#f9fafb'}
      bg={true}
      border={true} />
  </label>
  <input
    class="inputPersonCount"
    id="personCount"
    type="number"
    min="1"
    placeholder="1"
    name="personCount" />
</div>
