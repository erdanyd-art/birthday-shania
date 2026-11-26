// The Archive of Her: one childhood photo, one current photo, and Erdany's narration.
//
// To add a photo:
//   1. Put the original file in content/photos/ (send it as a file, not a compressed chat photo).
//   2. Set `file` to its exact name and write `alt` (what the photo shows).
//   3. Adjust `focus` if her face gets cropped ("50% 30%" = centre, upper third).

import type { Photo } from './types';

export const archive: { then: Photo; now: Photo; narration: string[] | null } = {
  then: {
    // A phone photo of an old print; the focus keeps the floor at its top edge out of frame.
    file: 'shania-then.jpg',
    alt: 'Shania as a toddler with a fringe and wet hair, a blue towel around her head, two fingers at her open mouth, wearing a Lightning McQueen T-shirt.',
    caption: 'Then',
    focus: '50% 45%',
  },
  now: {
    file: 'shania-now.jpg',
    alt: 'Shania today in a dusty-pink hijab, smiling softly and looking off to the side, a window with orange blossoms behind her.',
    caption: 'Now',
    focus: '70% 50%',
  },
  /** One string per paragraph, written or approved by Erdany. Keep it short. */
  narration: [
    'i didn’t know the girl in the first photo. by the time i met shania, she had already become the one in the second.',
    'so i can only guess what she brought along from back then. the yapping, probably. the random things she likes. the way she argues over little things and somehow wins.',
    'everything between these two photos happened without me. i’m just glad i get to be around for what comes after this one.',
  ],
};
