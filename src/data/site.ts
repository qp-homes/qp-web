/**
 * Business facts in one place. Anything marked PENDING_CLIENT_APPROVAL
 * is tracked in /PENDING_CLIENT_APPROVAL.md — update both together.
 */
export const site = {
  name: 'Quality Plus Building Services',
  shortName: 'Quality Plus',
  tagline: 'Commercial cleaning in Los Angeles',
  phone: '(323) 660-0751',
  phoneHref: 'tel:+13236600751',
  // PENDING_CLIENT_APPROVAL: legacy "qp-homes" domain; confirm the commercial inbox.
  email: 'info@qp-homes.com',
  address: {
    street: '4113 Beverly Blvd',
    city: 'Los Angeles',
    region: 'CA',
    postalCode: '90004',
    country: 'US',
  },
  // PENDING_CLIENT_APPROVAL: confirm the address may be shown publicly / matches GBP.
  showAddress: true,
  founder: 'Karla Carpio',
  // PENDING_CLIENT_APPROVAL: set to 2006 once Karla confirms; copy updates automatically.
  foundedYear: null as number | null,
  // PENDING_CLIENT_APPROVAL: profile URLs not provided yet. Leave null to hide icons.
  // Google Business Profile (verified listing: same name, phone and website).
  googleBusiness: 'https://maps.google.com/?cid=8422972607425501852',
  social: {
    instagram: null as string | null,
    facebook: null as string | null,
  },
} as const;

export const primaryCta = {
  label: 'Request a Site Walkthrough',
  shortLabel: 'Request a Walkthrough',
  href: '/contact/',
};

export const nav = [
  { label: 'Services', href: '/commercial-cleaning-services/', hasMenu: true },
  { label: 'Service Areas', href: '/service-areas/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];
