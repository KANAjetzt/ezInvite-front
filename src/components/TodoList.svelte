<script>
  import { todoStore, sortedDummyTodoStore } from "../stores";
  import Todo from "./Todo.svelte";
  import AddTodoInput from "./AddTodoInput.svelte";
  import { flip } from "svelte/animate";
</script>

<style>
  .todoList {
    margin: auto;
    padding: 0;
    padding: 0 1.5rem;
    list-style: none;
    max-width: 70rem;
  }

  .todo {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
  }
</style>

<ul class="todoList">
  {#each $sortedDummyTodoStore as todo, index (todo.id)}
    <li animate:flip class="todo">
      <Todo {todo} {index} />
    </li>
  {/each}
  <AddTodoInput />
</ul>
