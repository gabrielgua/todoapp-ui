export const environment = {
  production: true,
  baseUrl: 'https://todoapp-api-production.up.railway.app',
  oAuthCallBackUrl: 'https://todoapp-ui-ivory.vercel.app/authorized',
  logoutRedirectToUrl: 'https://todoapp-ui-ivory.vercel.app/login',
  tokenAllowedDomains: [ /todoapp-api-production.up.railway.app/ ],
  tokenDisallowedRoutes: [/\/oauth2\/token/],
  clientCredentialsEncoded: 'Basic '+ process.env['CLIENT_CREDENTIALS']
}
