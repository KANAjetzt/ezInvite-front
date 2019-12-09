<script>
  //TODO: Create Query to get all Todos for a WidgetID.
  //TODO: Think about storing that in a store or passing it down to the components.
  //TODO: Die user müssen im query noch gepoplulated werden.

  import { todoStore } from "../stores";
  import Todo from "./Todo.svelte";
  import AddTodoInput from "./AddTodoInput.svelte";

  let todos;

  // Add Dummys Users to data if needed
  const prepareData = todo => {
    let newTodo = { ...todo };

    // if this thing allready has some partacing users
    if (todo.users && todo.users[0]) {
      const partacer = todo.users.filter(user => user.name !== "unkown user")
        .length;
      const requiredPersons = todo.requiredPersons;

      // if the thing is done
      if (partacer >= requiredPersons) {
        // add done property to todo
        newTodo.done = true;
      }

      // add partacer count to todo
      newTodo.partacerCount = partacer;

      return newTodo;
    }
  };

  todoStore.subscribe(newData => {
    todos = newData
      .map(todo => prepareData(todo))
      .sort((a, b) => {
        // a and b bouth done = 0
        // a done = false --> a,b
        // else --> b,a
        return a.done === b.done ? 0 : a.done ? -1 : 1;
      });
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
  {#each todos as todo, index}
    <Todo data={todo} {index} />
  {/each}
  <AddTodoInput />
</ul>
