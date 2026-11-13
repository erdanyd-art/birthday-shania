// The site keeps one document alive while guests move between rooms (so the music never
// stops), which means a script runs once but its page can be visited many times.
// onPage runs `setup` on every visit. The signal aborts as the guest leaves: pass it to
// addEventListener and use it to clear timers, so nothing piles up from earlier visits.

export function onPage(setup: (signal: AbortSignal) => void): void {
  document.addEventListener('astro:page-load', () => {
    const leaving = new AbortController();
    document.addEventListener('astro:before-swap', () => leaving.abort(), { once: true });
    setup(leaving.signal);
  });
}

/** A timeout that is cancelled if the guest leaves the page first. */
export function later(signal: AbortSignal, ms: number, fn: () => void): void {
  const id = window.setTimeout(fn, ms);
  signal.addEventListener('abort', () => window.clearTimeout(id));
}
