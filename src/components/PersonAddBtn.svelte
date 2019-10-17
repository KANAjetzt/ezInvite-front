<script>
  import PersonImg from "./PersonImg.svelte";
  import PlusIcon from "./Icons/Plus.svelte";

  export let photo = "default.jpg";
  export let name = "unknown user";

  // OnClickAddPersonToTodo
</script>

<style>
  .addBtn {
    display: flex;
    align-items: center;
    border: none;
    padding: 0;
    margin: 0;
    text-decoration: none;
    background: transparent;
    cursor: pointer;
    text-align: center;
  }
</style>

<button class="addBtn">
  <PlusIcon width={10} height={10} fill={'#f9fafb'} />
  <PersonImg />
</button>
