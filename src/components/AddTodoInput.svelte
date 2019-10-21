<script>
  import PersonAddBtn from "./PersonAddBtn.svelte";
</script>

<style>
  .inputWrapper {
    display: flex;
    align-items: center;
    grid-column: 2 / 3;
    margin: 2rem 0;
  }

  .inputBox {
    display: inline;
    padding: 0.5rem 1.5rem;
    margin: 0;
    margin-left: -1rem;
    width: 100%;
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
</style>

<div class="inputWrapper">
  <PersonAddBtn
    iconStyle="z-index: 20; transform: translateX(135%); opacity: 0.9;" />
  <input class="inputBox" type="text" placeholder="Add something to the List" />
</div>
