export const baseRoutes = {
  home: '/',
  about: '/about',
  portfolio: '/portfolio',
  blog: '/blog',
} as const;

export type BaseRouteKeys = keyof typeof baseRoutes;
export type BaseRoutePaths = (typeof baseRoutes)[BaseRouteKeys];

export const baseRouteKeysList = Object.keys(baseRoutes) as BaseRouteKeys[];

export const pinnedRepoNames = new Set([
  'portfolio-site-v2',
  'portfolio-site',
  'vidyo-ai-redesign',
  'trivia-game',
  'jammming',
  'recipe-book-app',
]);

export const themeLocalStorageId = 'tylerSimoni:ui:colorScheme';
