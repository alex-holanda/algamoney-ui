export const environment = {
  production: true,

  apiUrl: '',

  tokenWhitelistedDomains: [ new RegExp('algamoney-curso.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token/') ]
};
