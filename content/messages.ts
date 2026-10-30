// Birthday notes for the Dressing Room, in the order they should appear.
// Only real messages, from real people who agreed to be shown. Never add samples here.
//
// Shape of one entry (see types.ts):
//   {
//     id: 'msg-01',
//     name: 'Name as they want it shown',
//     relationship: 'Optional, e.g. Her cousin',
//     category: 'family' | 'childhood' | 'school' | 'university' | 'other',
//     message: 'Their words, exactly as sent.',
//     photo: 'optional-file-in-content-photos.jpg',
//     photoAlt: 'What the photo shows',
//   },

import type { BirthdayMessage } from './types';

export const messages: BirthdayMessage[] = [];
