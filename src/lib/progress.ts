// A guest's progress, kept on their own device. Losing it is harmless:
// the theatre simply starts plain again.

import { route, tour, HOUSE_STEP, type RoomId, type StopId } from './rooms';

type Progress = {
  /** Rooms the guest has been inside; coloured in on the house drawing. */
  visited: RoomId[];
  /** Rooms the guest has finished, so Ambrose has led them on to the next. */
  done: RoomId[];
  /** Rooms whose colouring-in has already been animated once. */
  shown: RoomId[];
  introSeen: boolean;
  /** The curtain has been raised; the house drawing shows the stage open from then on. */
  finaleSeen: boolean;
  /** Doors the guest has opened by playing (or being let through). One ticket punch each. */
  unlocked: StopId[];
};

// v2 (8 Nov 2026): the tour became strictly in order, with finished rooms tracked in `done`.
// Progress saved under v1 is ignored, so every guest starts at the box office with the doors locked.
const KEY = 'slw-progress-v2';

const empty = (): Progress => ({ visited: [], done: [], shown: [], introSeen: false, finaleSeen: false, unlocked: [] });

export function readProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...empty(), ...(JSON.parse(raw) as Partial<Progress>) } : empty();
  } catch {
    return empty();
  }
}

function update(change: (p: Progress) => void): void {
  const p = readProgress();
  change(p);
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
    // The page reflects the tour at once: the bar's next stop unlocks, the map opens at the end.
    document.documentElement.toggleAttribute('data-free', tourFinished(p));
    window.dispatchEvent(new Event('tour:progress'));
  } catch {
    // Storage blocked (private mode, in-app browser): progress just isn't remembered.
  }
}

const add = <T>(list: T[], item: T) => {
  if (!list.includes(item)) list.push(item);
};

export const markVisited = (room: RoomId) => update((p) => add(p.visited, room));
export const markShown = (room: RoomId) => update((p) => add(p.shown, room));
export const markIntroSeen = () => update((p) => { p.introSeen = true; });
export const markUnlocked = (stop: StopId) => update((p) => add(p.unlocked, stop));
export const markDone = (room: RoomId) => update((p) => add(p.done, room));
export const markFinaleSeen = () => update((p) => { p.finaleSeen = true; });

/** The furthest step of the route this guest may be on: the first one they haven't finished. */
export function furthest(p: Progress = readProgress()): number {
  if (!p.visited.includes('boxoffice')) return 0;
  if (!p.introSeen) return 1;
  const room = tour.findIndex((r) => !p.done.includes(r));
  if (room !== -1) return 2 + room;
  return p.finaleSeen ? HOUSE_STEP : HOUSE_STEP - 1;
}

/** Where to pick the tour up. */
/** True once the show is over, or when this browser keeps no progress at all. */
export const roamFree = (): boolean => document.documentElement.hasAttribute('data-free');

export const resumeHref = (p?: Progress): string => route[furthest(p)]!;
export const tourFinished = (p?: Progress): boolean => furthest(p) === HOUSE_STEP;

/** Forget everything and start at the box office again. */
export function resetProgress(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Nothing stored, nothing to forget.
  }
}
