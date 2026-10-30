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
