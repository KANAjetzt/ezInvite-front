<script>
  import { todoStore, sortedDummyTodoStore } from "../stores";
  import Todo from "./Todo.svelte";
  import AddTodoInput from "./AddTodoInput.svelte";

  sortedDummyTodoStore.subscribe(newValue => {
    console.log(newValue);
  });
</script>

<style>
  .todoList {
    margin: auto;
    padding: 0;
    padding: 0 1.5rem;
    list-style: none;
    max-width: 70rem;
  }
</style>

<ul class="todoList">
  {#each $sortedDummyTodoStore as todo, index}
    <Todo {todo} {index} />
  {/each}
  <AddTodoInput />
</ul>
