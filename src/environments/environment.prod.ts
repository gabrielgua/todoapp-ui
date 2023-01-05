export const environment = {
  production: true,
  baseUrl: 'https://todoapp-api-production.up.railway.app',
  oAuthCallBackUrl: 'http://127.0.0.1:4200/authorized',
  logoutRedirectToUrl: 'http://127.0.0.1:4200/login',
  tokenAllowedDomains: [ /todoapp-api-production.up.railway.app/ ],
  tokenDisallowedRoutes: [/\/oauth2\/token/],
  clientCredentialsEncoded: 'Basic dG9kby13ZWJhcHA6d2VidG9kbzEyMw=='
};
