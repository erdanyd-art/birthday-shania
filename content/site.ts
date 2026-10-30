// Names, dates and wording used across the whole site.
// Change a name here and every page and every line of dialogue follows.

export const site = {
  title: "Shania's Little World",
  /** The person the theatre is built for. */
  subject: 'Shania',
  /** Who built it. Used in the host's lines and to sign the letter. */
  creator: 'Erdany',
  /** The host's name. Rename him here. */
  host: 'Ambrose',
  openingNight: { iso: '2026-11-28', label: '28 November 2026' },
  /** Shown under the title in WhatsApp and Instagram link previews. No birthday spoilers. */
  description: 'A small show in five rooms. Doors are open.',
  /** Revealed only when the curtain rises. */
  greeting: 'Happy Birthday, Shania',
  song: {
    title: 'I Will Fly',
    artist: 'Ten2Five',
    /** Paste a Spotify or YouTube link here. While it's null, no link is shown. */
    url: null as string | null,
  },
};
