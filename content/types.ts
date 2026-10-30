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

export type MessageCategory = 'family' | 'childhood' | 'school' | 'university' | 'other';

export type BirthdayMessage = {
  /** Any unique id, for example "msg-01". */
  id: string;
  /** The name exactly as the writer wants it shown. */
  name: string;
  /** Optional, for example "Her cousin" or "Roommate, 2023". */
  relationship?: string;
  category: MessageCategory;
  /** The message as they wrote it. Separate paragraphs with a blank line. */
  message: string;
  /** Optional file name inside content/photos/. */
  photo?: string;
  /** What the photo shows. Needed when photo is set. */
  photoAlt?: string;
};
