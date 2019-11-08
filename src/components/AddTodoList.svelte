<script>
  import { todoStore } from "../stores";
  import Todo from "./Todo.svelte";
  import AddTodoInput from "./AddTodoInput.svelte";

  let todos;

  todoStore.subscribe(newData => {
    todos = newData;
  });
</script>

<style>
  .todoList {
    margin: 0;
    padding: 0;
    padding: 0 1.5rem;
    list-style: none;
  }
</style>

<ul class="todoList">
  {#each todos as todo}
    <Todo data={todo} />
  {/each}
  <AddTodoInput />
</ul>
