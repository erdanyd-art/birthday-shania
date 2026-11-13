/** Rooms that get coloured in once a guest has been inside. */
export type RoomId = 'boxoffice' | 'archive' | 'dressing' | 'wings';

export type Room = { id: RoomId; name: string; href: string; prd: string };

export const rooms: Record<RoomId, Room> = {
  boxoffice: { id: 'boxoffice', name: 'The Box Office', href: '/', prd: 'The Entrance' },
  archive: { id: 'archive', name: 'The Archive of Her', href: '/archive', prd: 'The Archive of Her' },
  dressing: { id: 'dressing', name: 'The Dressing Room', href: '/dressing-room', prd: 'The People’s Gallery' },
  wings: { id: 'wings', name: 'The Wings', href: '/wings', prd: 'A Personal Corner' },
};

export const stage = { name: 'The Stage', href: '/curtain-call', introHref: '/stage' };

/** The tour, as the bar under the header shows it: four stops after the introduction. */
export type StopId = 'archive' | 'dressing' | 'wings' | 'finale';
export const stops: { id: StopId; label: string; href: string }[] = [
  { id: 'archive', label: 'Photos', href: '/archive' },
  { id: 'dressing', label: 'Notes', href: '/dressing-room' },
  { id: 'wings', label: 'Letter', href: '/wings' },
  { id: 'finale', label: 'Curtain', href: '/curtain-call' },
];

/** The order Ambrose leads guests through after his introduction. The stage comes last. */
export const tour: RoomId[] = ['archive', 'dressing', 'wings'];

/**
 * The whole visit, in order. A guest can be anywhere up to the first step they haven't
 * finished, never further: the house drawing (the map) opens only once the show is over.
 * Keep in step with `furthest()` in progress.ts and the guard in Base.astro.
 */
export const route = ['/', '/stage', '/archive', '/dressing-room', '/wings', '/curtain-call', '/house'] as const;
export const HOUSE_STEP = route.length - 1;
