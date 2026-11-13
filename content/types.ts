// The shapes of everything in /content.
// Leave a field as null until the real thing exists. While developing, null shows a
// stamped placeholder; the launch build refuses to run until it's filled in.

export type Photo = {
  /** File name inside content/photos/, for example "childhood.jpg". */
  file: string | null;
  /** What the photo shows, for people using screen readers. Needed once a file is set. */
  alt: string | null;
  /** The short label written on the print's bottom margin. */
  caption: string;
  /** Which part of the photo must stay in frame when it's cropped, as "x% y%". */
  focus: string;
};

/** How the host stands. */
export type Pose = 'welcome' | 'point' | 'bow' | 'chest';

/** One of the host's cue cards on the stage. */
export type Cue = {
  say: string;
  /** How he stands while he says it. */
  pose?: Pose;
  /** A small piece of stage business when the card appears. */
  action?: 'shoe' | 'curtain' | 'raise';
  /** Words on this card's button, instead of "Next". */
  button?: string;
};

export type BirthdayMessage = {
  /** Any unique id, for example "msg-01". */
  id: string;
  /** The name exactly as the writer wants it shown. */
  name: string;
  /** Optional, for example "Her cousin" or "Roommate, 2023". */
  relationship?: string;
  /**
   * Leave out for an ordinary note: every note shares one mirror.
   * Only for friends who sent their notes together as one package, for example
   * 'Internship friends': notes with the same group are clipped together into one bundle,
   * with its name on a tag (and its photo, if there's one in `groupPhotos`).
   */
  group?: string;
  /** The message as they wrote it. Separate paragraphs with a blank line. */
  message: string;
  /** Optional file name inside content/photos/. */
  photo?: string;
  /** What the photo shows. Needed when photo is set. */
  photoAlt?: string;
};

/**
 * One photo for a bundle of notes, clipped on top of them,
 * for when several people send their notes together with one picture.
 */
export type GroupPhoto = {
  /** The bundle it belongs to: exactly the same text as `group` on their messages. */
  group: string;
  /** File name inside content/photos/. */
  file: string;
  /** What the photo shows, for people using screen readers. */
  alt: string;
  /** Which part must stay in frame if it's cropped, as "x% y%". */
  focus?: string;
};
