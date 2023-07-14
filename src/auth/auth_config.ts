import type { Auth0ClientOptions } from "@auth0/auth0-spa-js";

const config: Auth0ClientOptions = {
  domain: 'teamly.us.auth0.com',
  clientId: 'InPTCm0pFBIovGrvm0I3qJGs5XnVgJV5',
  authorizationParams: {
    audience: 'projectmanagement',
    scope: 'openid profile email read:project write:project update:project delete:project read:company write:company update:company delete:company',
  },
}

export default config;