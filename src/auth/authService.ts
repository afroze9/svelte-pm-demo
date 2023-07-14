import { Auth0Client, createAuth0Client, type PopupLoginOptions } from "@auth0/auth0-spa-js";
import config from './auth_config';
import { writable, get } from "svelte/store";

type User = {
  email?: string;
  name?: string;
}

const isAuthenticated = writable<boolean>(false);
const user = writable<User | undefined>({});
const popupOpen = writable<boolean>(false);
const error = writable();
const auth0Client = writable<Auth0Client>();

async function initClient(): Promise<void> {
  let client = await createAuth0Client(config);
  auth0Client.set(client);
  isAuthenticated.set(await client.isAuthenticated());
  user.set(await client.getUser());
}

async function login() {
  popupOpen.set(true);
  try {
    await get(auth0Client).loginWithPopup();
    user.set(await get(auth0Client).getUser());
    isAuthenticated.set(true);
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
}

function logout() {
  return get(auth0Client).logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  });
}

export const auth = {
  initClient,
  login,
  logout,
  auth0Client,
  isAuthenticated,
  user,
  error
};