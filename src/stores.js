import { writable } from "svelte/store";

export const eventDataStore = writable({});

export const getEventData = () => {
  let eventData;
  eventDataStore.subscribe(value => (eventData = value.data.event));
  return eventData;
};
