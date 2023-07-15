import { Auth0Client, createAuth0Client, type PopupLoginOptions } from "@auth0/auth0-spa-js";
import config from './auth_config';
import { writable, get } from "svelte/store";
import { auth0Client, isAuthenticated, isLoading, popupOpen, user } from "../store";

async function initClient(): Promise<void> {
  isLoading.set(true);

  let client = await createAuth0Client(config);
  auth0Client.set(client);
  isAuthenticated.set(await client.isAuthenticated());
  user.set(await client.getUser());

  isLoading.set(false);
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
  logout
};