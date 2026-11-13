// Every line the host says. He leads the tour: he greets guests in each room
// and, at the end of it, takes them to the next one.
// Names come from site.ts, so renaming the host or anyone else needs no edits here.

import { site } from './site';
import type { Cue } from './types';

const { host, subject, creator } = site;

export const lines = {
  /** Said from beside the theatre door, before anyone is introduced. */
  boxOffice: 'Well, look who’s here. You’re just in time.',

  /** Scene I, in front of the curtain. Each entry is one cue card; pose and action are his stage business. */
  intro: [
    { say: 'Good evening, everyone. It’s always evening in here.', pose: 'welcome' },
    { say: `I’m ${host}, your host. Cut from black card, eight centimetres tall, and tonight, extremely important.`, pose: 'bow' },
    { say: `This little theatre was built by hand, by ${creator}, for ${subject}. So was I. Please don’t look too closely at my left shoe.`, pose: 'chest', action: 'shoe' },
    { say: `If you happen to be ${subject}: act surprised. Everyone else, follow me.`, pose: 'welcome' },
    { say: 'Three rooms first: the photographs, the notes, a letter. Then the stage. The curtain stays closed till the end. No peeking. I’ll know.', pose: 'point', action: 'curtain' },
  ] satisfies Cue[],

  /** When a guest comes back to the stage after the introduction. */
  stageReturn: 'The curtain’s still closed. I did warn you.',
  /** When a guest comes back to the stage after the show. */
  stageAfter: 'The show’s over, but the theatre stays open. The house map has every room in it.',

  /** The house drawing. It opens only after the curtain call: the end of the show, and the way back in. */
  house: 'That’s the whole show. Here’s the theatre in one drawing, every room you’ve been in coloured pink. Tap any of them to go back in.',

  archive: {
    arrive: 'Upstairs, the archive: two photographs, some years apart. Lift the top one to see the other. After that I’ll say very little. For once, I’ll manage.',
    /** After the guest lifts the old photograph. */
    afterLift: 'Then, and now. Read what’s written below them, and I’ll take you downstairs.',
    next: 'Downstairs next: notes from the people who know her best. Follow me.',
    /** At the foot of the screen until the room is done. Keep it short. */
    todo: 'Lift the photo, then read below',
  },

  dressingRoom: {
    arrive: 'Her mirror, with everyone’s notes tucked into the frame. Read your way down; I’ll be waiting at the bottom. I wasn’t allowed to write one: apparently “met her tonight” doesn’t count.',
    next: 'That’s the notes. One more room before the stage, and it’s a quiet one. Follow me.',
    /** At the foot of the screen until the guest reaches the last note. */
    todo: 'Read the notes, all the way down',
  },

  wings: {
    arrive: `This part isn’t mine. ${creator} built the whole theatre, then left a letter out here in the wings. Read it in your own time. I’ll wait by the door.`,
    next: 'When you’re ready, the curtain’s waiting. Follow me to the stage.',
    todo: 'Read the letter to the end',
  },

  /** In front of each locked door: what the game is. Short, and always skippable. */
  doors: {
    archive: 'Locked, I’m afraid. The photograph up here was never developed. Rub the print until the picture comes through, and the door’s yours.',
    dressing: 'I’ve lost the Dressing Room key. Somewhere backstage. Possibly under something. Lift the props until you find it.',
    wings: 'It’s pitch dark in the wings. Match the three pairs of my things and the work light comes on.',
    finale: 'The curtain’s heavy. Tap Pull just as the ring meets the circle. Four good pulls and we’re ready.',
  },

  /** The Curtain Call. The guest raises the curtain from the first card. */
  finale: [
    { say: 'Well. That’s nearly everything. Would someone like to raise the curtain?', pose: 'point', button: 'Raise the curtain' },
    { say: 'I borrowed a little of her colour for tonight. I’ll give it back.', pose: 'chest', action: 'raise' },
    { say: `Happy birthday, ${subject}. I’ve been dying to say that all evening.`, pose: 'bow' },
    { say: 'Thank you all for coming. The house lights are up. Stay as long as you like.', pose: 'welcome', button: 'Meet the company' },
  ] satisfies Cue[],
};
