import type { APIRoute } from 'astro';
import { site, primaryCta } from '../data/site';
import { services, serviceHref } from '../data/services';
import { areas, laCountyCities } from '../data/areas';

// llms.txt: a plain summary for AI search tools, generated from the same data
// as the pages so it never drifts. Only confirmed (indexable) areas are listed.
export const GET: APIRoute = ({ site: base }) => {
  const url = (path: string) => new URL(path, base).href;
  const confirmed = areas.filter((a) => a.indexable);
  const line = (s: { name: string; slug: string; summary: string }) =>
    `- [${s.name}](${url(serviceHref(s.slug))}): ${s.summary}`;

  const body = `# ${site.name}

> Commercial cleaning company based in Los Angeles, California, led by founder ${site.founder}. Cleans retail stores, medical offices, and commercial buildings across Los Angeles County. Every account starts with an on-site walkthrough and a written, customized proposal. No residential cleaning.

## Contact
- Phone: ${site.phone}
- Email: ${site.email}${site.showAddress ? `\n- Address: ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}` : ''}
- ${primaryCta.label}: ${url(primaryCta.href)}

## Core services
${services.filter((s) => s.tier === 'primary').map(line).join('\n')}

## Additional services
${services.filter((s) => s.tier === 'support').map(line).join('\n')}

## Service area
${confirmed.map((a) => `- [${a.name}](${url(`/service-areas/${a.slug}/`)}): primary service area, ${laCountyCities.length} cities`).join('\n')}

## Key pages
- [Home](${url('/')})
- [All commercial cleaning services](${url('/commercial-cleaning-services/')})
- [Service areas](${url('/service-areas/')})
- [About ${site.shortName}](${url('/about/')})
- [Contact](${url('/contact/')})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
