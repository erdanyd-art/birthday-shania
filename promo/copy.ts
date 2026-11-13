// Every word on the Instagram carousel. Names come from content/site.ts.
// Five slides: a modern layout over pieces of Victorian printed matter (a playbill, a
// newspaper cutting, a toy-theatre sheet, a handbill, a ticket). The joke is grand
// announcements for something openly small, so the copy says plainly what's inside and
// never promises more. It never shows what's inside the rooms.

import { site } from '../content/site';

const { host, subject } = site;

export const copy = {
  /** The modern layer: big type and small labels laid over each piece of printed matter. */
  headlines: {
    cover: { sub: 'A small show in five rooms.' },
    gazette: {
      big: 'It’s very small. That’s the point.',
      small: 'A few photographs, some notes from the people who know her best, and a letter. It takes a few minutes.',
    },
    characters: { kicker: 'Introducing', name: `Mr. ${host}`, sub: 'Your host. His first appearance on any stage.' },
    starring: { kicker: 'Starring' },
    ticket: { big: 'You’re invited.' },
  },
  /** 1. The playbill: the first slide, the one people see in their feed. */
  playbill: {
    house: 'The Little Paper Theatre',
    opening: 'Opening Night!',
    benefit: 'For the Benefit of',
    name: subject,
    presented: 'on which occasion will be presented, for the First Time,',
    show: 'A Small Show in Five Rooms',
    hostPart: 'The Host',
    hostNote: '(his first appearance on any stage)',
    notesFrom: 'The People who Know Her Best',
    notesNote: '(by particular desire)',
    built: 'The Whole Built Entirely by Hand',
    curtain: 'The Curtain will not rise until the End.',
    fine: ['Doors open at all hours. It is always Evening within.', 'Seats wherever you like. No Money taken at the Doors.'],
    vivat: `Vivat ${subject}!`,
  },
  /** 2. A cutting from the newspaper. */
  gazette: {
    paper: 'The Paper Theatre Gazette',
    dateline: 'November, 2026',
    price: 'Price One Penny',
    heading: 'Theatrical Intelligence.',
    story: [
      'We are given to understand that a new Theatre, of very modest dimensions, will open its doors on Saturday the 28th inst. It is said to have been built entirely by hand, out of paper and card, and to contain five rooms and a curtain.',
      'The management insists that the curtain will not be raised until the very end, and declines to say what is behind it.',
      `The entertainment is given for the Benefit of ${subject.toUpperCase()}. We are assured that the whole Town is invited, that no money will be taken at the doors, and that the Host, a Mr. ${host.toUpperCase()}, has been rehearsing his bow.`,
    ],
    lostHeading: 'Lost.',
    lost: 'A left shoe, black card, very small. The finder will kindly return it to the Stage Door, and say nothing.',
  },
  /** 3. The toy-theatre sheet of the host, to be cut out. */
  characters: {
    plate: 'Plate I.',
    head: 'Characters',
    poses: {
      welcome: 'Welcoming the Company',
      point: 'Pointing the Way',
      chest: 'Hat to Heart',
      bow: 'Taking his Bow',
    },
    plain: 'Penny Plain',
    coloured: 'Twopence Coloured',
    fine: 'Cut out carefully and mount on card. Mind his left shoe.',
  },
  /** 4. The handbill: her name, coloured in by hand. */
  starring: {
    announces: 'The Little Paper Theatre proudly announces',
    starring: 'Starring',
    after: 'in her own little world',
    note: 'Coloured by hand',
  },
  /** 5. The ticket, with the way in printed on its stub. */
  ticket: {
    admit: 'Admit One',
    to: 'to any Seat in the House',
    when: 'Opening Night · Sat. 28th Nov. 2026',
    number: 'No. 0001',
    scan: 'Scan to enter',
    label: 'Scan the stub, or tap the link in bio.',
  },
};
