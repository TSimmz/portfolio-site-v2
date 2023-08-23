export const baseRoutes = {
  home: '/#home',
  about: '/#about',
  portfolio: '/#portfolio',
  contact: '/#contact',
  // blog: '/blog',
} as const;

export type BaseRouteKeys = keyof typeof baseRoutes;
export type BaseRoutePaths = (typeof baseRoutes)[BaseRouteKeys];

export const baseRoutesList = Object.values(baseRoutes) as BaseRoutePaths[];
export const baseRouteKeysList = Object.keys(baseRoutes) as BaseRouteKeys[];

export const pinnedRepoNames = new Set([
  'portfolio-site-v2',
  'portfolio-site',
  'vidyo-ai-redesign',
  'trivia-game',
  'jammming',
  'recipe-book-app',
]);

export const localStorageThemeId = 'tylerSimoni:ui:colorScheme';
export const localStorageHasScrolledId = 'tylerSimoni:ui:hasScrolled';
export const localStorageHasSubmittedContact = 'tylerSimoni:form:hasSubmitted';
