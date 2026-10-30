// Erdany's letter, shown in the Wings. Nobody else writes this.

import type { Photo } from './types';

export const letter: { paragraphs: string[] | null; signature: string | null; photo: Photo | null } = {
  /** One string per paragraph. */
  paragraphs: null,
  /** How the letter is signed. Leave null to sign with the creator's name from site.ts. */
  signature: null,
  /** Optional photo pinned beside the letter. Leave null for none. */
  photo: null,
};
