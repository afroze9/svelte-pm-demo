import type { Auth0Client, User } from "@auth0/auth0-spa-js";
import { writable } from "svelte/store";

export const auth0Client = writable<Auth0Client>();
export const isAuthenticated = writable<boolean>(false);
export const isLoading = writable<boolean>(true);
export const popupOpen = writable<boolean>(false);
export const error = writable();
export const user = writable<User | undefined>({});