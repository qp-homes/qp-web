import type { APIRoute } from 'astro';

// Generated so the sitemap URL always follows the configured SITE_URL.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('/sitemap-index.xml', site).href;
  const body = `User-agent: *
Allow: /

Sitemap: ${sitemap}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
