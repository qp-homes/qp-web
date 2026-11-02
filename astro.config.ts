import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { NOINDEX_PATHS } from './src/data/indexing';

// Final production domain. Override with SITE_URL when the domain is confirmed;
// canonicals, Open Graph URLs, structured data and the sitemap all derive from it.
const SITE_URL = process.env.SITE_URL ?? 'https://qualitypluscleaningla.com';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => !NOINDEX_PATHS.some((path) => new URL(page).pathname === path),
    }),
  ],
});
