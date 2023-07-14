import { writable, derived } from "svelte/store";

type User = {
  email?: string;
  name?: string;
}

export const isAuthenticated = writable<boolean>(false);
export const user = writable<User | undefined>({});
export const popupOpen = writable<boolean>(false);
export const error = writable();