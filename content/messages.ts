// Birthday notes for the Dressing Room. Every note is tucked into the same mirror, in the
// order they're listed here. Only real messages, from real people who agreed to be shown.
// Never add samples here.
//
// Shape of one entry (see types.ts):
//   {
//     id: 'msg-01',
//     name: 'Name as they want it shown',
//     relationship: 'Optional, e.g. Her cousin',
//     group: 'Campus friends',   // optional: only for a package sent together (see below)
//     message: 'Their words, exactly as sent.',
//     photo: 'optional-file-in-content-photos.jpg',
//     photoAlt: 'What the photo shows',
//   },
//
// Friends who sent their notes together as one package: give them all the same `group`
// and they're clipped together as one bundle, with the group's name on its tag. If they
// sent one photo for all of them, add it to `groupPhotos` below and it sits on top.

import type { BirthdayMessage, GroupPhoto } from './types';

export const messages: BirthdayMessage[] = [
  // ---- Internship friends: Key, Cut and Farra, one photo for the three (see groupPhotos) ----
  {
    id: 'key',
    name: 'Key',
    group: 'Internship friends',
    message:
      'Happiest birthdayyy shandut! hope your days are always filled with laughter, love, and little things that make you happy. enjoy your special day! 🥹💗 calam imut dari cakey terlucu sefh.',
  },
];

/**
 * People whose notes are still on their way. While developing, each gets a stamped
 * stand-in on the mirror (in their bundle, if they have a group), so the layout shows everyone. A launch build won't
 * run while anyone is listed here: move them into `messages` when their note arrives,
 * or delete them if it never does.
 */
export const awaiting: { name: string; group?: string }[] = [
  { name: 'Cut', group: 'Internship friends' },
  { name: 'Farra', group: 'Internship friends' },
];

export const groupPhotos: GroupPhoto[] = [
  {
    group: 'Internship friends',
    // One frame from Key's photo-booth strip.
    file: 'internship-photobooth.jpg',
    alt: 'A photo-booth picture of Shania with Key, Cut and Farra, four friends squeezed together in front of a red curtain, smiling and pouting at the camera.',
    focus: '50% 40%',
  },
];
