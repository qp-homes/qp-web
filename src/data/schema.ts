import { site } from './site';
import { areas } from './areas';

/**
 * JSON-LD builders. Markup must only describe what is visible and verified:
 * no ratings, reviews, hours, or unconfirmed service areas.
 */
export const businessId = (base: URL) => new URL('/#business', base).href;

export function businessSchema(base: URL) {
  const confirmedAreas = areas
    .filter((a) => a.indexable)
    .map((a) => ({ '@type': 'AdministrativeArea', name: `${a.name}, CA` }));

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': businessId(base),
    name: site.name,
    url: new URL('/', base).href,
    logo: new URL('/icon-512.png', base).href,
    image: new URL('/og-image.jpg', base).href,
    telephone: '+1-323-660-0751',
    email: site.email,
    founder: { '@type': 'Person', name: site.founder },
    ...(site.foundedYear ? { foundingDate: String(site.foundedYear) } : {}),
    ...(site.showAddress
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: site.address.street,
            addressLocality: site.address.city,
            addressRegion: site.address.region,
            postalCode: site.address.postalCode,
            addressCountry: site.address.country,
          },
        }
      : {}),
    areaServed: confirmedAreas,
    sameAs: [site.googleBusiness, ...Object.values(site.social).filter(Boolean)],
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[], base: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.href, base).href,
    })),
  };
}

export function serviceSchema(
  opts: { name: string; description: string; href: string },
  base: URL,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    serviceType: opts.name,
    description: opts.description,
    url: new URL(opts.href, base).href,
    provider: { '@id': businessId(base) },
    areaServed: { '@type': 'AdministrativeArea', name: 'Los Angeles County, CA' },
  };
}
