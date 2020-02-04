import { writable } from "svelte/store";

export const appStore = writable({
  showAddPersonProfile: false,
  showFullResponder: true,
  // 'addEvent' / 'editEvent' / 'event' / 'eventPreview' / 'share'
  currentPage: undefined,
  /* -- message array structure-- */
  /* 
  {
    type: 'error' / 'warning',
    location: 'todoInput' / 'titleInput',
    message: 'some text'
}
  */
  messages: []
});
export const eventDataStore = writable({});
export const todoStore = writable([]);
export const userStore = writable([]);
