<script>
  //TODO: Create Query to get all Todos for a WidgetID.
  //TODO: Think about storing that in a store or passing it down to the components.
  //TODO: Die user müssen im query noch gepoplulated werden.

  import { getClient } from "svelte-apollo";
  import { gql } from "apollo-boost";

  import { getEventData } from "../stores";
  import Todo from "./Todo.svelte";
  import AddTodoInput from "./AddTodoInput.svelte";

  //! widgets[0] only a quick fix - later loop widgets and get all with type === todo
  const GETTODOS = gql`
    {
      todosForWidget(id: "${getEventData().widgets[0].id}") {
        users {
          id
          name
          photo
        }
        text
      }
    }
  `;

  const client = getClient();

  export const queryTodos = async () => {
    const data = await client.query({ query: GETTODOS });
    return data.data.todosForWidget;
  };

  let todosData = queryTodos();
</script>

<style>
  .todoList {
    margin: 0;
    padding: 0;
    padding: 0 1.5rem;
    list-style: none;
  }
</style>

{#await todosData}
  <p>...loading...</p>
{:then todos}
  <ul class="todoList">
    {#each todos as todo}
      <Todo data={todo} />
    {/each}
    <AddTodoInput />
  </ul>

{/await}
