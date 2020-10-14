import { writable, derived } from "svelte/store";

export const appStore = writable({
  showAddPersonProfile: false,
  showFullResponder: true,
  // 'addEvent' / 'editEvent' / 'event' / 'eventPreview' / 'share'
  currentPage: undefined,
  feedbackGiven: false,
  addImgs: true,
  imgs: false,
  /* -- message array structure-- */
  /* 
  {
    type: 'error' / 'warning',
    location: 'todoInput' / 'titleInput',
    message: 'some text'
    timeout: 6
    toast: true / false
}
  */
  messages: [],
});
export const eventDataStore = writable({});
// ###############################################

export const todoStore = writable([]);

export const sortedTodoStore = derived(todoStore, ($todoStore) => {
  // create copy of todoStore so todoStore is not sorted
  const currentTodoStore = [...$todoStore];

  return currentTodoStore.sort((a, b) => b.requiredPersons - a.requiredPersons);
});

export const sortedDummyTodoStore = derived(
  sortedTodoStore,
  ($sortedTodoStore) => {
    // Add Dummy Users for todos

    // create a copy for safety reasons
    const currentStore = [...$sortedTodoStore];

    currentStore.map((todo) => {
      const dummyCount = todo.users
        ? todo.requiredPersons - todo.users.length
        : todo.requiredPersons;

      for (let i = 0; i < dummyCount; i++) {
        if (!todo.users) todo.users = [];
        todo.users = [
          ...todo.users,
          {
            name: "unknown person",
            photo: `${svelteEnv.frontUrl}/img/default.jpg`,
          },
        ];
      }
      return todo;
    });
    return currentStore;
  }
);

// ###############################################
export const userStore = writable([]);
