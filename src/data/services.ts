import type { PhotoKey } from './photos';

/**
 * Service content. Scope lists describe what is commonly discussed and
 * confirmed during the walkthrough — not a guaranteed checklist.
 * PENDING_CLIENT_APPROVAL: Karla to confirm the scope items for each service.
 */
export interface Service {
  slug: string;
  tier: 'primary' | 'support';
  name: string;
  navLabel: string;
  title: string;
  description: string;
  h1: string;
  summary: string;
  intro: string[];
  facilities: string[];
  scopeHeading: string;
  scope: string[];
  planHeading: string;
  plan: { title: string; text: string }[];
  note?: string;
  faqs: { q: string; a: string }[];
  related: string[];
  hero: PhotoKey;
  gallery: PhotoKey[];
}

export const services: Service[] = [
  {
    slug: 'retail-cleaning',
    tier: 'primary',
    name: 'Retail Cleaning',
    navLabel: 'Retail Store Cleaning',
    title: 'Retail Store Cleaning Services in Los Angeles | Quality Plus',
    description:
      'Retail store cleaning in Los Angeles planned around your hours, foot traffic, and brand standards. Sales floors, fitting rooms, restrooms, and entrances.',
    h1: 'Retail Store Cleaning Services in Los Angeles',
    summary: 'Sales floors, fitting rooms, and entrances that look ready before the doors open.',
    intro: [
      'In retail, the space is part of the product. A smudged entrance door, a cluttered fitting room, or a restroom that falls behind on a busy Saturday shapes how customers feel about your brand before they ever reach the register.',
      'We build retail cleaning plans around the way your store actually runs: opening and closing times, delivery days, seasonal peaks, and the areas customers notice first. Work is scheduled so it does not compete with your staff or your shoppers.',
    ],
    facilities: [
      'Single-location boutiques and specialty stores',
      'Multi-location retail chains',
      'Showrooms and flagship stores',
      'Shopping center tenant spaces',
      'Retail back-of-house and stockrooms',
    ],
    scopeHeading: 'What a retail cleaning plan can cover',
    scope: [
      'Sales floor sweeping, mopping, and vacuuming',
      'Entrance doors, glass, and display surfaces',
      'Fitting rooms, mirrors, and benches',
      'Customer and staff restrooms',
      'Break rooms and back-of-house areas',
      'Trash and recycling removal',
      'High-touch points: handles, counters, and railings',
    ],
    planHeading: 'Built around your store, not a template',
    plan: [
      {
        title: 'Before opening or after close',
        text: 'Most retail cleaning happens outside business hours so the floor is ready when the first customer walks in.',
      },
      {
        title: 'Priority zones first',
        text: 'Entrances, fitting rooms, and restrooms are agreed up front as the areas that never slip.',
      },
      {
        title: 'Consistent for multiple locations',
        text: 'If you manage more than one store, we document the same standard for each location so results are comparable.',
      },
    ],
    faqs: [
      {
        q: 'Can you clean before we open or after we close?',
        a: 'Yes. Retail schedules are planned around your operating hours. We confirm the service window and building access during the walkthrough.',
      },
      {
        q: 'Do you work with stores inside shopping centers?',
        a: 'Yes. We coordinate with your store team and, when needed, follow the property’s rules for access, loading areas, and after-hours entry.',
      },
      {
        q: 'Can we add window or carpet cleaning to a retail plan?',
        a: 'Yes. Window, carpet, and power washing services can be scheduled alongside regular cleaning so you work with one team.',
      },
    ],
    related: ['window-cleaning', 'carpet-cleaning', 'power-washing'],
    hero: 'fittingRoom',
    gallery: ['storefrontGlass', 'patioCafeMopping', 'restroomFixture'],
  },
  {
    slug: 'medical-office-cleaning',
    tier: 'primary',
    name: 'Medical Office Cleaning',
    navLabel: 'Medical Office Cleaning',
    title: 'Medical Office Cleaning in Los Angeles | Quality Plus',
    description:
      'Medical office cleaning in Los Angeles for reception areas, waiting rooms, offices, and restrooms. A careful, documented plan agreed with your practice.',
    h1: 'Medical Office Cleaning Services in Los Angeles',
    summary: 'Waiting rooms, front desks, and restrooms that reflect the care your practice provides.',
    intro: [
      'Patients judge a practice by what they see in the first five minutes: the waiting room, the front desk, the restroom. A consistently clean office supports the trust you have built with every patient visit.',
      'Our medical office service focuses on the routine cleaning of patient-facing and administrative spaces. We agree on every plan with your office manager in advance: which rooms we enter, when we enter them, which products we use, and anything your practice requires us to handle differently.',
    ],
    facilities: [
      'Private practices and physician offices',
      'Dental offices',
      'Outpatient and specialty clinics',
      'Therapy and wellness offices',
      'Medical suites within commercial buildings',
    ],
    scopeHeading: 'Areas a medical office plan typically includes',
    scope: [
      'Reception desks and check-in counters',
      'Waiting rooms, chairs, and side tables',
      'High-touch points: door handles, light switches, and railings',
      'Patient and staff restrooms',
      'Administrative offices and break rooms',
      'Hard floor care and vacuuming',
      'Trash removal from non-clinical areas',
    ],
    planHeading: 'Clear boundaries, agreed in writing',
    plan: [
      {
        title: 'Your protocols come first',
        text: 'During the walkthrough we review your practice’s requirements and document exactly what is in and out of scope.',
      },
      {
        title: 'Discreet scheduling',
        text: 'Service is usually scheduled after hours so patients and staff are not interrupted.',
      },
      {
        title: 'Consistent team',
        text: 'We aim to keep the same team assigned to your office, so they learn your space and your expectations.',
      },
    ],
    note:
      'Our medical office service covers routine commercial cleaning. Medical waste handling, sterilization of clinical equipment, and biohazard cleanup are not part of this service. If your practice has specific requirements, we review them with you before any work begins.',
    faqs: [
      {
        q: 'Which areas of a medical office do you clean?',
        a: 'We focus on reception, waiting rooms, administrative offices, break rooms, restrooms, and other agreed non-clinical spaces. The exact rooms are confirmed in writing during the walkthrough.',
      },
      {
        q: 'Do you handle medical waste?',
        a: 'No. Medical and biohazard waste must be handled by a licensed provider. Our team removes regular trash from the areas included in your plan.',
      },
      {
        q: 'Can you work around patient hours?',
        a: 'Yes. Most medical office cleaning is scheduled after hours or at times your office manager approves.',
      },
    ],
    related: ['carpet-cleaning', 'window-cleaning', 'commercial-building-cleaning'],
    hero: 'sinkCleaning',
    gallery: ['wallArt', 'lobbyTable', 'counterSanitizing'],
  },
  {
    slug: 'commercial-building-cleaning',
    tier: 'primary',
    name: 'Commercial Building Cleaning',
    navLabel: 'Commercial Building Cleaning',
    title: 'Commercial Building Cleaning in Los Angeles | Quality Plus',
    description:
      'Commercial building cleaning and janitorial services in Los Angeles for property and facility managers: lobbies, corridors, restrooms, elevators, and offices.',
    h1: 'Commercial Building Cleaning Services in Los Angeles',
    summary: 'Lobbies, corridors, elevators, and shared spaces kept to one standard, floor after floor.',
    intro: [
      'Property and facility managers need more than a clean lobby. They need a partner who keeps every shared space consistent, reports issues before tenants notice them, and responds when something changes.',
      'We provide recurring janitorial and office cleaning for office buildings, multi-tenant properties, and mixed-use spaces with a plan that maps every area, assigns a frequency to each one, and keeps a supervisor accountable for the result.',
    ],
    facilities: [
      'Office buildings and corporate offices',
      'Multi-tenant commercial properties',
      'Mixed-use buildings and common areas',
      'Building amenities: fitness rooms, lounges, courtyards',
      'Event and multipurpose spaces',
    ],
    scopeHeading: 'What a building cleaning plan can cover',
    scope: [
      'Lobbies, entrances, and reception areas',
      'Corridors, stairwells, and elevators',
      'Common-area and tenant restrooms',
      'Offices, conference rooms, and kitchens',
      'Fitness rooms and shared amenities',
      'High dusting: vents, exit signs, and ledges',
      'Trash and recycling consolidation',
    ],
    planHeading: 'One standard for the whole property',
    plan: [
      {
        title: 'Area-by-area frequencies',
        text: 'Lobbies may need daily attention while stairwells need weekly detail work. Each area gets the frequency it actually needs.',
      },
      {
        title: 'Supervisor oversight',
        text: 'A supervisor checks the work and is your direct point of contact for changes and requests.',
      },
      {
        title: 'Room to grow',
        text: 'Add window cleaning, carpet care, or power washing to the same plan as your property needs change.',
      },
    ],
    faqs: [
      {
        q: 'Do you clean both common areas and tenant spaces?',
        a: 'Yes. We can cover common areas only, specific tenant suites, or both, depending on what your management agreement requires.',
      },
      {
        q: 'Who do we contact if something needs attention?',
        a: 'You will have a direct contact on our team for requests, schedule changes, and follow-up.',
      },
      {
        q: 'Can you clean building amenities like gyms and lounges?',
        a: 'Yes. Fitness rooms, lounges, courtyards, and other shared amenities can be added to the plan with their own frequency.',
      },
    ],
    related: ['window-cleaning', 'power-washing', 'carpet-cleaning'],
    hero: 'cartSmiling',
    gallery: ['fitnessRoom', 'elevatorThreshold', 'exitSign'],
  },
  {
    slug: 'power-washing',
    tier: 'support',
    name: 'Power Washing',
    navLabel: 'Power Washing',
    title: 'Commercial Power Washing in Los Angeles | Quality Plus',
    description:
      'Commercial power washing in Los Angeles for walkways, patios, courtyards, entrances, and exterior walls. Scheduled on its own or with regular cleaning.',
    h1: 'Commercial Power Washing Services in Los Angeles',
    summary: 'Walkways, patios, and entrances restored without disrupting your business.',
    intro: [
      'Outdoor surfaces collect grime, gum, and stains faster than most indoor spaces — and they are the first thing visitors walk across. Power washing brings entrances, patios, and walkways back to a condition that matches the rest of your property.',
      'We schedule exterior work during low-traffic hours, protect nearby areas, and agree on the surfaces to be treated before any equipment is set up.',
    ],
    facilities: [
      'Storefront entrances and sidewalks',
      'Building courtyards and patios',
      'Outdoor dining and seating areas',
      'Walkways and common exterior areas',
    ],
    scopeHeading: 'Surfaces we commonly review',
    scope: [
      'Concrete walkways and entrances',
      'Patios and outdoor seating areas',
      'Courtyards and block walls',
      'Exterior building surfaces, where suitable',
    ],
    planHeading: 'Planned, not improvised',
    plan: [
      {
        title: 'Surface check first',
        text: 'We review each surface during the walkthrough so the right method is used for the material.',
      },
      {
        title: 'Off-peak timing',
        text: 'Exterior work is scheduled to avoid customers, tenants, and deliveries where possible.',
      },
    ],
    faqs: [
      {
        q: 'Can power washing be a one-time service?',
        a: 'Yes. It can be scheduled once, seasonally, or as a recurring part of your cleaning plan.',
      },
      {
        q: 'Do you power wash every type of surface?',
        a: 'Not every surface is suitable for pressure washing. We assess materials during the walkthrough and recommend the right approach.',
      },
    ],
    related: ['window-cleaning', 'commercial-building-cleaning', 'retail-cleaning'],
    hero: 'powerWashPatio',
    gallery: ['powerWashWall'],
  },
  {
    slug: 'window-cleaning',
    tier: 'support',
    name: 'Window Cleaning',
    navLabel: 'Window Cleaning',
    title: 'Commercial Window Cleaning in Los Angeles | Quality Plus',
    description:
      'Commercial window cleaning in Los Angeles for storefront glass, entrances, interior partitions, and reachable exterior windows. Scheduled around your hours.',
    h1: 'Commercial Window Cleaning Services in Los Angeles',
    summary: 'Clear storefront glass and entrances that invite people in.',
    intro: [
      'Clean glass is one of the fastest ways to make a business look cared for. Fingerprints on an entrance door or dusty storefront windows send the opposite message — especially in the strong Southern California light.',
      'We clean storefront glass, entrance doors, and interior glass on a schedule that fits your foot traffic, as a standalone service or as part of your regular plan.',
    ],
    facilities: [
      'Retail storefronts and display windows',
      'Office entrances and lobbies',
      'Interior glass partitions and doors',
      'Ground-level and reachable exterior windows',
    ],
    scopeHeading: 'Glass we commonly clean',
    scope: [
      'Storefront and display windows',
      'Entrance doors and sidelights',
      'Interior glass partitions',
      'Frames, sills, and tracks within reach',
    ],
    planHeading: 'Set the right frequency',
    plan: [
      {
        title: 'Traffic-based schedule',
        text: 'High-traffic entrances may need frequent attention, while upper glass may only need periodic service.',
      },
      {
        title: 'Reach confirmed up front',
        text: 'We confirm during the walkthrough which windows can be reached safely with our equipment.',
      },
    ],
    faqs: [
      {
        q: 'Do you clean high-rise exterior windows?',
        a: 'Our window service focuses on storefronts, entrances, interior glass, and windows that can be reached safely from the ground. We confirm which windows we can reach during the walkthrough.',
      },
      {
        q: 'Can window cleaning be added to a regular plan?',
        a: 'Yes. Many clients schedule window cleaning on a set frequency alongside their regular commercial cleaning.',
      },
    ],
    related: ['retail-cleaning', 'power-washing', 'commercial-building-cleaning'],
    hero: 'storefrontGlass',
    gallery: ['archwayDusting', 'doorFrameDusting'],
  },
  {
    slug: 'carpet-cleaning',
    tier: 'support',
    name: 'Carpet Cleaning',
    navLabel: 'Carpet Cleaning',
    title: 'Commercial Carpet Cleaning in Los Angeles | Quality Plus',
    description:
      'Commercial carpet cleaning in Los Angeles for offices, waiting rooms, corridors, and retail spaces. Scheduled after hours to keep your business running.',
    h1: 'Commercial Carpet Cleaning Services in Los Angeles',
    summary: 'Offices, corridors, and waiting rooms with carpet that looks maintained.',
    intro: [
      'Carpet in a busy office or waiting room shows wear quickly: traffic lanes, spots near entrances, and dull areas around desks. Regular vacuuming keeps it tidy, but periodic deep cleaning is what keeps it looking maintained.',
      'We schedule carpet cleaning after hours or on weekends so your team returns to a space that is ready to use, and we plan the order of rooms to keep access open where you need it.',
    ],
    facilities: [
      'Office floors and conference rooms',
      'Medical and professional waiting rooms',
      'Building corridors and common areas',
      'Carpeted retail and showroom spaces',
    ],
    scopeHeading: 'What carpet service can include',
    scope: [
      'Traffic lanes and entrance areas',
      'Spot treatment of visible stains',
      'Offices, corridors, and waiting rooms',
      'Area rugs and entrance mats, where suitable',
    ],
    planHeading: 'Timed to keep you working',
    plan: [
      {
        title: 'After-hours service',
        text: 'Cleaning is planned outside business hours so rooms are back in use when your team arrives.',
      },
      {
        title: 'Recurring or one-time',
        text: 'Schedule periodic deep cleaning, or book a one-time service before an inspection or event.',
      },
    ],
    faqs: [
      {
        q: 'How often should commercial carpet be deep cleaned?',
        a: 'It depends on foot traffic and the type of space. We recommend a frequency after seeing your facility during the walkthrough.',
      },
      {
        q: 'Can you guarantee every stain will come out?',
        a: 'No one can honestly guarantee that. We treat visible stains and tell you up front if a spot is unlikely to lift completely.',
      },
    ],
    related: ['medical-office-cleaning', 'commercial-building-cleaning', 'retail-cleaning'],
    hero: 'floorDetail',
    gallery: ['eventSpace'],
  },
];

export const primaryServices = services.filter((s) => s.tier === 'primary');
export const supportServices = services.filter((s) => s.tier === 'support');
export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const serviceHref = (slug: string) => `/services/${slug}/`;
