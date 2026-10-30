// Every line the host says, grouped by scene. Each string is one cue card.
// Names come from site.ts, so renaming the host or anyone else needs no edits here.

import { site } from './site';

const { host, subject, creator } = site;

export const lines = {
  /** Heard from somewhere behind the box office, before anyone is introduced. */
  boxOffice: 'Well, look who’s here. You’re just in time.',

  intro: [
    'Good evening, everyone. It’s always evening in here.',
    `I’m ${host}, your host. Cut from black card, eight centimetres tall, and tonight, extremely important.`,
    `This little theatre was built by hand, by ${creator}, for ${subject}. So was I. Please don’t look too closely at my left shoe.`,
    `If you happen to be ${subject}: act surprised. Everyone else, follow me.`,
    'One rule. The curtain stays closed until the end. No peeking. I’ll know.',
  ],

  /** When a guest comes back to the stage after the introduction. */
  stageReturn: ['The curtain’s still closed. I did warn you.'],

  /** Pencilled in the margin the first time a guest sees the house. */
  house: ['Go wherever you like. Every room you visit gets coloured in. I’d save the stage for last, but I’m only paper.'],

  archive: ['Upstairs, the archive. Two photographs, some years apart. I’ve been asked to say very little in here. For once, I’ll manage.'],

  dressingRoom: ['Notes left for her by the people who know her best. I wasn’t allowed to write one. Apparently “met her tonight” doesn’t count.'],

  wings: [`This part isn’t mine. ${creator} built the whole theatre, then stood out here in the wings, where nobody was looking. I’ll wait by the door.`],

  finale: [
    'Well. That’s nearly everything. Would someone like to raise the curtain?',
    'I borrowed a little of her colour for tonight. I’ll give it back.',
    `Happy birthday, ${subject}. I’ve been dying to say that all evening.`,
    'Thank you all for coming. The house lights are up. Stay as long as you like.',
  ],
};
