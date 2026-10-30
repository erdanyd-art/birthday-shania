// The Archive of Her: one childhood photo, one current photo, and Erdany's narration.
//
// To add a photo:
//   1. Put the original file in content/photos/ (send it as a file, not a compressed chat photo).
//   2. Set `file` to its exact name and write `alt` (what the photo shows).
//   3. Adjust `focus` if her face gets cropped ("50% 30%" = centre, upper third).

import type { Photo } from './types';

export const archive: { then: Photo; now: Photo; narration: string[] | null } = {
  then: {
    file: null,
    alt: null,
    caption: 'Then',
    focus: '50% 35%',
  },
  now: {
    file: null,
    alt: null,
    caption: 'Now',
    focus: '50% 35%',
  },
  /** One string per paragraph, written or approved by Erdany. Keep it short. */
  narration: null,
};
