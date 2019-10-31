import { writable } from "svelte/store";

export const eventDataStore = writable({});

export const getEventData = () => {
  let eventData;
  eventDataStore.subscribe(value => (eventData = value));
  console.log(eventData);
  if (eventData.data) return eventData.data.event;
};
