# AGENTS.md — Shania's Little World

Instructions for any coding agent (Codex or other) continuing this project.
`CLAUDE.md` holds the full working rules and applies to you too; `PRD.md` holds the requirements.
Read both, then `docs/architecture.md` (how it's built and why) before changing anything.
Ignore any CLAUDE.md in a parent folder (`~/Downloads/CLAUDE.md` is a different project).

## What this is

A mobile-first birthday site for Shania (launch: 28 Nov 2026), built as "The Little Paper Theatre",
hosted by Ambrose, a cut-paper silhouette. Astro 7, static, TypeScript strict, no backend.
Erdany (Shania's boyfriend) is the owner. He writes casual Indonesian; the site is in English.

Status: every room is built and tested. What's left is real content and refinement on real phones.
`docs/panduan.md` lists what content is still missing and where it goes.

## Commands

```sh
npm run dev          # http://localhost:4321, placeholders visible
npm run check        # type check; must stay at 0 errors
npm run test:tour    # with the dev server running: walks the whole tour, every line must PASS
npm run build        # launch build: refuses to run while any content is missing (intentional)
PUBLIC_ALLOW_PLACEHOLDERS=true npm run build   # preview build with stamped placeholders
```

After any change: run `npm run check` and `npm run test:tour`, and report the results honestly.
The test needs Node 22+ and Google Chrome (set `CHROME=/path` if not on macOS).

## Never break these

1. **No invented personal content.** Never write or fake photos, messages, names, biographical
   facts, or Erdany's letter. Only Erdany's real material goes in `content/`. Friends' messages
   are kept verbatim, typos, nicknames and emoji included.
2. **No placeholder can go public.** `assertLaunchReady()` in `src/lib/content.ts` makes the
   launch build fail while anything is missing. Never weaken it, bypass it, or ship a
   `PUBLIC_ALLOW_PLACEHOLDERS` build as the real site.
3. **The tour is strictly linear.** Box Office → Stage (intro) → Archive → Dressing Room → Wings →
   Curtain Call → House map. A room opens only after the previous one is finished; the house map
   appears only after the finale. The rule lives in three places that must agree: `furthest()` in
   `src/lib/progress.ts`, the inline guard in `src/layouts/Base.astro`, and `route` in
   `src/lib/rooms.ts`. Don't add shortcuts ahead (links, buttons, "skip").
4. **The host always says "Shania".** Her nickname is never used by Ambrose or in site copy.
5. **No gift, money or private financial details** anywhere, including the finale.
6. **No autoplay audio.** Music starts only on a user gesture and has a visible toggle.
7. **Content stays in `content/`**, presentation in `src/`. Names come from `content/site.ts`.
8. **Design system:** cherry `#8F1D2C`, deep cherry `#641522`, ivory `#F0E9D9`, paper cream
   `#E9DDC7`, near black `#171717`, her pink `#F2B6C3` (fills inside an ink line only, never
   text on light). Sturdy type (Fraunces ~600, Newsreader, Instrument Sans); Erdany rejected
   thin display faces. No purple gradients, glassmorphism, emoji-led visuals, confetti, or
   component-library defaults.
9. **Mobile first**, 44px tap targets, visible focus, `prefers-reduced-motion` respected.
10. **Don't commit secrets**, and don't push to a public repository: `content/photos/` holds
    real photos of Shania and her friends. Commit only when Erdany asks.

## Owner preferences (from his reviews)

- Ambrose must be visibly present in every room and guide guests one step at a time.
- Notes in the Dressing Room show in full without tapping, all on one mirror. Only friends who
  sent a package together share a `group` (one bundle, optional shared photo).
- Games in front of each room (rub the photo, find the key, light the lamp, pull the rope) stay.
- He likes initiative, but for taste decisions show him options and recommend one.
