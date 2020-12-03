import { writable, derived } from "svelte/store";

export const appStore = writable({
  showAddPersonProfile: false,
  showFullResponder: true,
  // 'addEvent' / 'editEvent' / 'event' / 'eventPreview' / 'share'
  currentPage: undefined,
  feedbackGiven: false,
  addImgs: true,
  imgs: false,
  // setLanguage: en / de
  currentLanguage: "de",
  languages: [],
  dateFormat: {
    de: "#{l}, #{j}. #{F}, #{Y}",
    en: "#{l}, #{F} #{j}, #{Y}",
  },
  daysOfWeek: {
    de: [
      ["Sonntag", "So"],
      ["Montag", "Mo"],
      ["Dienstag", "Di"],
      ["Mittwoch", "Mi"],
      ["Donnerstag", "Do"],
      ["Freitag", "Fr"],
      ["Samstag", "Sa"],
    ],
    en: [
      ["Sunday", "Sun"],
      ["Monday", "Mon"],
      ["Tuesday", "Tue"],
      ["Wednesday", "Wed"],
      ["Thursday", "Thu"],
      ["Friday", "Fri"],
      ["Saturday", "Sat"],
    ],
  },
  monthsOfYear: {
    de: [
      ["Januar", "Jan"],
      ["Februar", "Feb"],
      ["März", "Mrz"],
      ["April", "Apr"],
      ["Mai", "Mai"],
      ["Juni", "Jun"],
      ["Juli", "Jul"],
      ["August", "Aug"],
      ["September", "Sep"],
      ["Oktober", "Okt"],
      ["November", "Nov"],
      ["Dezember", "Dez"],
    ],
    en: [
      ["January", "Jan"],
      ["February", "Feb"],
      ["March", "Mar"],
      ["April", "Apr"],
      ["May", "May"],
      ["June", "Jun"],
      ["July", "Jul"],
      ["August", "Aug"],
      ["September", "Sep"],
      ["October", "Oct"],
      ["November", "Nov"],
      ["December", "Dec"],
    ],
  },

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

export const currentLanguage = derived(appStore, ($appStore) => {
  const currentAppStore = { ...$appStore };

  return currentAppStore.languages.map((str) => {
    if ($appStore.currentLanguage === "en") {
      delete str.DE;
      str.str = str.EN;
      delete str.EN;
      return str;
    } else if ($appStore.currentLanguage === "de") {
      delete str.EN;
      str.str = str.DE;
      delete str.DE;
      return str;
    }
  });
});

// ###############################################
export const userStore = writable([]);
