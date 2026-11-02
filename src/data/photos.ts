import type { ImageMetadata } from 'astro';

/**
 * Real Quality Plus job and team photography (prepared by scripts/prepare-images.py).
 * Alt text describes what is actually visible — keep it that way.
 * PENDING_CLIENT_APPROVAL: written permission for every photo with people or client sites.
 */
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.jpg', { eager: true });
const img = (name: string) => {
  const mod = files[`../assets/photos/${name}.jpg`];
  if (!mod) throw new Error(`Missing photo: ${name}`);
  return mod.default;
};

export interface Photo {
  src: ImageMetadata;
  alt: string;
}

const p = (name: string, alt: string): Photo => ({ src: img(name), alt });

export const photos = {
  wallWipingShirt: p(
    'team-member-wiping-wall-quality-plus-shirt',
    'Quality Plus team member in a branded shirt wiping down a white interior wall',
  ),
  storefrontGlass: p(
    'storefront-glass-cleaning-downtown-los-angeles',
    'Team member using an extension pole to clean the glass entrance of a downtown Los Angeles storefront',
  ),
  fittingRoom: p(
    'team-member-mopping-retail-fitting-room-area',
    'Team member mopping the floor of a retail fitting room area next to a wet floor sign',
  ),
  restroomFixture: p(
    'restroom-fixture-cleaning-with-gloves',
    'Team member wearing gloves cleaning a commercial restroom fixture',
  ),
  corridorCheck: p(
    'supervisor-checking-building-corridor',
    'Team member reviewing notes in an open-air building corridor',
  ),
  wetFloorCorridor: p(
    'wet-floor-sign-service-corridor',
    'Bilingual wet floor sign placed in a freshly mopped service corridor',
  ),
  fitnessRoom: p(
    'fitness-room-floor-mopping',
    'Team member mopping the rubber floor of a building fitness room',
  ),
  hallwayWall: p('hallway-wall-spot-cleaning', 'Team member spot-cleaning a hallway wall near an exit sign'),
  counterSanitizing: p(
    'restroom-counter-sanitizing',
    'Team member spraying and wiping a restroom counter with a yellow cloth',
  ),
  elevatorThreshold: p(
    'elevator-threshold-detail-cleaning',
    'Team member detail-cleaning the threshold track of a freight elevator',
  ),
  archwayDusting: p(
    'exterior-archway-high-dusting',
    'Team member using an extension pole to dust a building exterior archway',
  ),
  exitSign: p('exit-sign-dusting', 'Team member dusting an illuminated exit sign near the ceiling'),
  sinkCleaning: p(
    'restroom-sink-cleaning',
    'Team member in gloves cleaning a restroom sink and faucet',
  ),
  cartHallway: p('janitorial-cart-building-hallway', 'Team member with a stocked janitorial cart in a building hallway'),
  cartSmiling: p(
    'janitorial-cart-team-member-smiling',
    'Smiling team member standing behind a janitorial cart with mop and bucket',
  ),
  lobbyTable: p('lobby-table-wiping', 'Team member wiping a wooden side table in a lobby seating area'),
  wallArt: p('wall-art-dusting', 'Team member carefully dusting a framed painting on a wall'),
  teamOutdoorDowntown: p(
    'team-outdoor-cleanup-downtown-los-angeles',
    'Quality Plus team members during an outdoor cleanup with the downtown Los Angeles skyline behind them',
  ),
  twoMembersOrangeWall: p(
    'two-team-members-orange-wall',
    'Two Quality Plus team members standing with arms crossed in front of an orange wall',
  ),
  restroomFloor: p('restroom-floor-cleaning', 'Team member cleaning the floor of a commercial restroom'),
  scissorLift: p(
    'team-member-safety-gear-scissor-lift',
    'Team member in a hard hat and safety vest standing beside a scissor lift',
  ),
  hardHat: p(
    'team-member-hard-hat-safety-vest',
    'Team member wearing a hard hat and high-visibility vest on a job site',
  ),
  officeTeamKarla: p(
    'office-team-with-karla-carpio',
    'Karla Carpio seated at a desk with three Quality Plus team members',
  ),
  safetyVestLoading: p(
    'team-member-safety-vest-loading-area',
    'Team member in a safety vest working in a building loading area',
  ),
  floorScraping: p(
    'floor-residue-scraping',
    'Team member in a safety vest scraping residue from a concrete floor',
  ),
  powerWashWall: p(
    'power-washing-courtyard-wall',
    'Team member power washing a block wall in an outdoor courtyard',
  ),
  powerWashPatio: p(
    'power-washing-patio-surface-cleaner',
    'Team member using a surface cleaner attachment to power wash a patio',
  ),
  patioCafeMopping: p(
    'patio-cafe-area-mopping',
    'Team member mopping a tiled patio seating area next to a wet floor sign',
  ),
  eventSpace: p(
    'team-member-mop-bucket-event-space',
    'Team member with a mop and bucket in a large event space',
  ),
  doorFrameDusting: p(
    'door-frame-high-dusting',
    'Team member in a safety vest dusting the top of a door frame with an extension tool',
  ),
  floorDetail: p(
    'floor-detail-scrubbing',
    'Team member kneeling to detail-scrub a commercial floor by hand',
  ),
  teamGroup: p(
    'quality-plus-team-group-photo',
    'The Quality Plus team standing together in an office lobby',
  ),
  twoMembersMopping: p(
    'two-team-members-mopping-commercial-space',
    'Two team members in safety vests mopping a large commercial space',
  ),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
