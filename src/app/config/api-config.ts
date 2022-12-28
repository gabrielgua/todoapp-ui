export const API_CONFIG = {
    baseUrl: 'http://localhost:8080',
    oAuthCallBackUrl: 'http://127.0.0.1:4200/authorized',
    logoutRedirectToUrl: 'http://127.0.0.1:4200/login',
    tokenAllowedDomains: [ /localhost:8080/ ],
    tokenDisallowedRoutes: [/\/oauth2\/token/],
    clientCredentialsEncoded: 'Basic dG9kby13ZWJhcHA6d2VidG9kbzEyMw=='
}