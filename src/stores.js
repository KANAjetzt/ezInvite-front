import { writable } from "svelte/store";

export const appStore = writable({
  showAddPersonProfile: false,
  showFullResponder: true,
  currentPage: undefined
});
export const eventDataStore = writable({});
export const todoStore = writable([]);
export const userStore = writable([]);

export const getEventData = () => {
  let eventData;
  eventDataStore.subscribe(value => (eventData = value));
  return eventData;
};
