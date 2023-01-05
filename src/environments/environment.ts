// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:8080',
  oAuthCallBackUrl: 'http://127.0.0.1:4200/authorized',
  logoutRedirectToUrl: 'http://127.0.0.1:4200/login',
  tokenAllowedDomains: [ /localhost:8080/ ],
  tokenDisallowedRoutes: [/\/oauth2\/token/],
  clientCredentialsEncoded: 'Basic dG9kby13ZWJhcHA6d2VidG9kbzEyMw=='
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
