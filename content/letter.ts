// Erdany's letter, shown in the Wings. Nobody else writes this.

import type { Photo } from './types';

export const letter: { paragraphs: string[] | null; signature: string | null; photo: Photo | null } = {
  /** One string per paragraph. */
  paragraphs: [
    'hi, sayang.',
    'happy birthday!',
    "i've been thinking about what to write here, and honestly, i don't want to make this one of those letters filled with fancy words and big promises. i just want to tell you a few things.",
    "first, i'm really glad i met you. i enjoy having you around, even on the most ordinary days. i like hearing your stories, knowing about the little things that happen in your day, and finding out about all the random things you like. even the things that sometimes make me confused or make us argue a little. well, that's part of us, i guess.",
    "i know i'm not always the easiest person to deal with. there are times when i could've treated you better, listened more, or simply been more thoughtful. i'm aware of that, and i'm still working on it. i don't want to be someone who only says he'll do better. i want you to actually feel the difference.",
    "for your birthday, i hope things go well for you. i hope your studies, your plans, and all the little things you're working towards turn out the way you want them to. i hope you get to try more things, visit more places, eat lots of good food, and have plenty of reasons to be happy.",
    'and i hope we get to do a lot of those things together.',
    'thank you for being here, for being yourself, and for being part of my days. i may not say it all the time, but i appreciate you more than you probably realize.',
    "happy birthday again, sayang. here's to more memories, more random conversations, more food dates, and hopefully fewer arguments over little things wkwk.",
  ],
  /** How the letter is signed. Leave null to sign with the creator's name from site.ts. */
  signature: 'love,\nerdany.',
  /** Optional photo pinned beside the letter. Leave null for none. */
  photo: null,
};
