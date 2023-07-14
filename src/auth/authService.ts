import { Auth0Client, createAuth0Client, type PopupLoginOptions } from "@auth0/auth0-spa-js";
import { user, isAuthenticated, popupOpen } from "../store";
import config from './auth_config';

async function createClient(): Promise<Auth0Client> {
  let auth0Client = await createAuth0Client({
    domain: config.domain,
    clientId: config.clientId
  });

  return auth0Client;
}

async function loginWithPopup(client: Auth0Client, options?: PopupLoginOptions) {
  popupOpen.set(true);
  try {
    await client.loginWithPopup(options);

    user.set(await client.getUser());
    isAuthenticated.set(true);
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
}

function logout(client: Auth0Client) {
  return client.logout();
}

const auth = {
  createClient,
  loginWithPopup,
  logout
};

export default auth;