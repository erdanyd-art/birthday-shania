import type { ImageMetadata } from 'astro';
import { archive } from '../../content/archive';
import { letter } from '../../content/letter';
import { awaiting, groupPhotos, messages } from '../../content/messages';
import type { Photo } from '../../content/types';

const files = import.meta.glob<{ default: ImageMetadata }>(
  '/content/photos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true },
);

/** Resolves a file name from /content to an optimisable image, or null if it isn't there. */
export function findPhoto(file: string | null | undefined): ImageMetadata | null {
  if (!file) return null;
  return files[`/content/photos/${file}`]?.default ?? null;
}

/** Placeholders are visible in dev and in preview builds, never in the launch build. */
export const showPlaceholders =
  import.meta.env.DEV || import.meta.env.PUBLIC_ALLOW_PLACEHOLDERS === 'true';

export const isPreviewBuild = !import.meta.env.DEV && showPlaceholders;

function photoGaps(label: string, photo: Photo | null, where: string): string[] {
  if (!photo) return [];
  if (!photo.file) return [`${label}: no photo yet (${where})`];
  const gaps: string[] = [];
  if (!findPhoto(photo.file)) gaps.push(`${label}: content/photos/${photo.file} not found`);
  if (!photo.alt) gaps.push(`${label}: alt text (${where})`);
  return gaps;
}

/** Everything still missing before the public launch, in plain words. */
export function contentGaps(): string[] {
  const gaps = [
    ...photoGaps('Archive, childhood photo', archive.then, 'content/archive.ts'),
    ...photoGaps('Archive, current photo', archive.now, 'content/archive.ts'),
    ...photoGaps('Letter photo', letter.photo, 'content/letter.ts'),
  ];
  if (!archive.narration?.length) gaps.push('Archive narration (content/archive.ts)');
  if (!messages.length) gaps.push('At least one birthday message (content/messages.ts)');
  for (const m of messages) {
    if (m.photo && !findPhoto(m.photo)) gaps.push(`Message from ${m.name}: content/photos/${m.photo} not found`);
    if (m.photo && !m.photoAlt) gaps.push(`Message from ${m.name}: photo alt text`);
  }
  for (const a of awaiting) gaps.push(`Note from ${a.name}${a.group ? ` (${a.group})` : ''} still to come: content/messages.ts`);
  for (const g of groupPhotos) {
    if (!findPhoto(g.file)) gaps.push(`Photo for ${g.group}: content/photos/${g.file} not found`);
    if (!messages.some((m) => m.group?.trim() === g.group.trim())) gaps.push(`Photo for ${g.group}: no messages in that group`);
  }
  if (!letter.paragraphs?.length) gaps.push('The letter (content/letter.ts)');
  return gaps;
}

/** Stops a launch build while anything is missing, so no placeholder can go public. */
export function assertLaunchReady(): void {
  if (showPlaceholders) return;
  const gaps = contentGaps();
  if (gaps.length) {
    throw new Error(
      `Not ready to launch. Still missing:\n  - ${gaps.join('\n  - ')}\n\n` +
        'For a preview build with stamped placeholders, set PUBLIC_ALLOW_PLACEHOLDERS=true.',
    );
  }
}
