/*
export const environment = {
  production: true,

  apiUrl: 'https://algamoney-curso.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('algamoney-curso.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token/') ]
};
*/


export const environment = {
  production: false,

  apiUrl: 'http://localhost:8080',

  tokenWhitelistedDomains: [ new RegExp('localhost:8080') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token/') ]
};
