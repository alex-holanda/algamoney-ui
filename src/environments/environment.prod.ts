export const environment = {
  production: true,

  apiUrl: 'https://algamoney-curso.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('algamoney-curso.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token/') ]
};
