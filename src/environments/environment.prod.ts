export const environment = {
  production: true,
  baseUrl: 'https://todoapp-api-production.up.railway.app',
  oAuthCallBackUrl: 'https://todoapp-gabrielgua.vercel.app/authorized',
  logoutRedirectToUrl: 'https://todoapp-gabrielgua.vercel.app/login',
  tokenAllowedDomains: [ /todoapp-api-production.up.railway.app/ ],
  tokenDisallowedRoutes: [/\/oauth2\/token/],
  clientCredentialsEncoded: `Basic dG9kby13ZWJhcHA6RXhiR2Y3WnNCZ0VxdGZ4cUc5eEw=`
};
