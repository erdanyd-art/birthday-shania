// A guest's progress, kept on their own device. Losing it is harmless:
// the theatre simply starts plain again.

import type { RoomId } from './rooms';

type Progress = {
  /** Rooms the guest has been inside; coloured in on the house drawing. */
  visited: RoomId[];
  /** Rooms whose colouring-in has already been animated once. */
  shown: RoomId[];
  /** Places where the host has already spoken, so he speaks once per room. */
  heard: string[];
  introSeen: boolean;
};

const KEY = 'slw-progress-v1';

const empty = (): Progress => ({ visited: [], shown: [], heard: [], introSeen: false });

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
  } catch {
    // Storage blocked (private mode, in-app browser): progress just isn't remembered.
  }
}

const add = <T>(list: T[], item: T) => {
  if (!list.includes(item)) list.push(item);
};

export const markVisited = (room: RoomId) => update((p) => add(p.visited, room));
export const markShown = (room: RoomId) => update((p) => add(p.shown, room));
export const markHeard = (key: string) => update((p) => add(p.heard, key));
export const hasHeard = (key: string) => readProgress().heard.includes(key);
export const markIntroSeen = () => update((p) => { p.introSeen = true; });
