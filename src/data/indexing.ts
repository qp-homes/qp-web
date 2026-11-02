import { areas } from './areas';

/** Paths excluded from the sitemap and rendered with `noindex`. */
export const NOINDEX_PATHS = [
  '/thank-you/',
  '/404/',
  ...areas.filter((a) => !a.indexable).map((a) => `/service-areas/${a.slug}/`),
];

export const isNoindex = (path: string) => NOINDEX_PATHS.includes(path);
