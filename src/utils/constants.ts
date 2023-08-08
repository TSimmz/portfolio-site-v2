export const baseRoutes = {
  home: '/',
  about: '/about',
  portfolio: '/portfolio',
  blog: '/blog',
} as const;

export type BaseRouteKeys = keyof typeof baseRoutes;
export type BaseRoutePaths = (typeof baseRoutes)[BaseRouteKeys];

export const baseRouteKeysList = Object.keys(baseRoutes) as BaseRouteKeys[];
