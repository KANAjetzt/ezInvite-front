<script>
  //TODO: Create Query to get all Todos for a WidgetID.
  //TODO: Think about storing that in a store or passing it down to the components.
  //TODO: Die user müssen im query noch gepoplulated werden.

  import { todoStore } from "../stores";
  import Todo from "./Todo.svelte";
  import AddTodoInput from "./AddTodoInput.svelte";

  let todos;

  // generate Users to feed the Todo component with them
  const generateDummyUsers = count => {
    let dummyUsers = [];
    if (count > 5) count = 4;
    for (let i = 0; i < count; i++) {
      dummyUsers = [
        ...dummyUsers,
        {
          name: "unkown user",
          photo: "http://localhost:3000/img/user/default.jpg"
        }
      ];
    }
    return dummyUsers;
  };

  // Add Dummys Users to data if needed
  const prepareData = todo => {
    let newTodo = { ...todo };

    // if there are no partacing users on that thing yet
    if (!todo.users || todo.users.length === 0) {
      // If more than 5 people are required add 5 dummy users
      if (todo.requiredPersons > 5) newTodo.users = generateDummyUsers(5);

      // If less then 5 people are required add the ammount of requiredPersons in dummy Users
      newTodo.users = generateDummyUsers(todo.requiredPersons);
    }

    // if this thing allready has some partacing users
    if (todo.users && todo.users[0]) {
      const partacer = todo.users.length;
      const requiredPersons = todo.requiredPersons;

      // add partacer count to todo
      newTodo.partacerCount = partacer;

      // get an Array of dummy users
      const dummyUsers = generateDummyUsers(requiredPersons - partacer);

      // Add the dummy users to the existing users
      newTodo.users = newTodo.users.concat(dummyUsers);
    }
    return newTodo;
  };

  todoStore.subscribe(newData => {
    todos = newData.map(todo => prepareData(todo));
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
