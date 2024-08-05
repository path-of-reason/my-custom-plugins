import { writable } from "svelte/store";

export const layoutState = writable({
  header: true,
  left: true,
  right: true,
  commandPallete: false,
});
