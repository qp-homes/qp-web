/**
 * Service regions. `indexable: false` keeps a page reachable but out of
 * search results and the sitemap until coverage is confirmed by the client.
 * Never add per-city landing pages without real, distinct local content.
 */
export interface Area {
  slug: string;
  name: string;
  shortName: string;
  indexable: boolean;
  title: string;
  description: string;
  h1: string;
  lead: string;
  body: string[];
  photo: string;
  cities?: string[];
}

export const laCountyCities = [
  'Agoura Hills', 'Alhambra', 'Arcadia', 'Artesia', 'Avalon', 'Azusa', 'Baldwin Park', 'Bell',
  'Bell Gardens', 'Bellflower', 'Beverly Hills', 'Bradbury', 'Burbank', 'Calabasas', 'Carson',
  'Cerritos', 'Claremont', 'Commerce', 'Compton', 'Covina', 'Cudahy', 'Culver City', 'Diamond Bar',
  'Downey', 'Duarte', 'El Monte', 'El Segundo', 'Gardena', 'Glendale', 'Glendora',
  'Hawaiian Gardens', 'Hawthorne', 'Hermosa Beach', 'Hidden Hills', 'Huntington Park',
  'City of Industry', 'Inglewood', 'Irwindale', 'La Cañada Flintridge', 'La Habra Heights',
  'La Mirada', 'La Puente', 'La Verne', 'Lakewood', 'Lancaster', 'Lawndale', 'Lomita', 'Long Beach',
  'Los Angeles', 'Lynwood', 'Malibu', 'Manhattan Beach', 'Maywood', 'Monrovia', 'Montebello',
  'Monterey Park', 'Norwalk', 'Palmdale', 'Palos Verdes Estates', 'Paramount', 'Pasadena',
  'Pico Rivera', 'Pomona', 'Rancho Palos Verdes', 'Redondo Beach', 'Rolling Hills',
  'Rolling Hills Estates', 'Rosemead', 'San Dimas', 'San Fernando', 'San Gabriel', 'San Marino',
  'Santa Clarita', 'Santa Fe Springs', 'Santa Monica', 'Sierra Madre', 'Signal Hill',
  'South El Monte', 'South Gate', 'South Pasadena', 'Temple City', 'Torrance', 'Vernon', 'Walnut',
  'West Covina', 'West Hollywood', 'Westlake Village', 'Whittier',
];

export const areas: Area[] = [
  {
    slug: 'los-angeles-county',
    name: 'Los Angeles County',
    shortName: 'LA County',
    indexable: true,
    title: 'Commercial Cleaning in Los Angeles County | Quality Plus',
    description:
      'Commercial cleaning for retail stores, medical offices, and commercial buildings across Los Angeles County. Based in Los Angeles. Request a site walkthrough.',
    h1: 'Commercial Cleaning Services in Los Angeles County',
    lead:
      'Los Angeles County is our home base. Our team works out of Los Angeles and plans routes, crews, and schedules around the realities of the county — traffic windows, after-hours access, and buildings that never fully close.',
    body: [
      'A storefront on a busy boulevard, a medical suite inside a mixed-use building, and a multi-tenant office tower all need something different from a cleaning partner. That is why every new account starts with a walkthrough: we see the space, the traffic patterns, and the access rules before we propose a scope or a schedule.',
      'Being based in the county means supervisors can visit sites in person, respond when something changes, and keep the same faces on your account. You get a team that knows your building — not a different crew every week.',
      'Below you can check the cities in Los Angeles County where we serve commercial facilities. If you do not see your city, ask anyway: we confirm availability for each property during the first conversation.',
    ],
    photo: 'teamOutdoorDowntown',
    cities: laCountyCities,
  },
  {
    slug: 'orange-county',
    name: 'Orange County',
    shortName: 'Orange County',
    indexable: false,
    title: 'Commercial Cleaning in Orange County | Quality Plus',
    description:
      'Quality Plus Building Services reviews commercial cleaning projects in Orange County, CA. Share your facility details to confirm availability and schedule a walkthrough.',
    h1: 'Commercial Cleaning for Orange County Facilities',
    lead:
      'We review commercial cleaning projects in Orange County on a property-by-property basis, so every account we accept gets the same supervision as our Los Angeles work.',
    body: [
      'Before committing to a location outside Los Angeles County, we look at the facility type, the schedule you need, and how our crews and supervisors would reach the site consistently. If it is a good fit, we schedule a walkthrough and prepare a proposal just like any other account.',
      'Tell us the address, the type of space, and how often you need service. We will confirm whether we can support it — and if we cannot, we will tell you directly.',
    ],
    photo: 'twoMembersMopping',
  },
  {
    slug: 'san-bernardino-county',
    name: 'San Bernardino County',
    shortName: 'San Bernardino County',
    indexable: false,
    title: 'Commercial Cleaning in San Bernardino County | Quality Plus',
    description:
      'Commercial cleaning projects in San Bernardino County reviewed case by case by Quality Plus Building Services. Share your facility details to check availability.',
    h1: 'Commercial Cleaning for San Bernardino County Facilities',
    lead:
      'For facilities in San Bernardino County, we confirm coverage per property so we only commit to schedules our team can keep.',
    body: [
      'Larger commercial sites, retail locations, and offices in the Inland Empire often need predictable service windows. We review the drive time, crew availability, and supervision plan before we propose anything.',
      'Send us your facility details and preferred schedule. We will reply with availability and, when it makes sense, a walkthrough date.',
    ],
    photo: 'safetyVestLoading',
  },
  {
    slug: 'san-diego',
    name: 'San Diego',
    shortName: 'San Diego',
    indexable: false,
    title: 'Commercial Cleaning in San Diego | Quality Plus',
    description:
      'Quality Plus Building Services reviews select commercial cleaning projects in the San Diego area. Contact us to confirm availability for your facility.',
    h1: 'Commercial Cleaning Projects in the San Diego Area',
    lead:
      'We accept select commercial projects in the San Diego area after confirming that our team can deliver the same level of service we provide in Los Angeles.',
    body: [
      'Because of the distance from our Los Angeles base, San Diego projects are reviewed individually. Scope, frequency, and supervision are discussed up front so there are no surprises after service begins.',
      'Share your facility details and we will let you know quickly whether we are the right fit.',
    ],
    photo: 'patioCafeMopping',
  },
];

export const getArea = (slug: string) => areas.find((a) => a.slug === slug);
