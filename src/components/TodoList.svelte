<script>
  import { todoStore, sortedDummyTodoStore } from "../stores";
  import Todo from "./Todo.svelte";
  import AddTodoInput from "./AddTodoInput.svelte";
  import { flip } from "svelte/animate";

  let todosSortedWithDummyUsers;

  sortedDummyTodoStore.subscribe(newData => {
    todosSortedWithDummyUsers = newData;
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

  .todo {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
  }

  :global(.todo__done) {
    opacity: 0.5;
  }
</style>

<ul class="todoList">
  {#each todosSortedWithDummyUsers as todo, index (todo.id ? todo.id : index)}
    <li
      animate:flip
      class={`todo ${todo.requiredPersons <= 0 ? 'todo__done' : ''}`}>
      <Todo {todo} {index} />
    </li>
  {/each}
</ul>

<AddTodoInput />
