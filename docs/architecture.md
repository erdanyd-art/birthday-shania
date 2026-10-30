# Architecture: Shania's Little World

Stage 3, written 30 October 2026, after the concept was approved.
Concept board: https://claude.ai/artifact/STh5HZv1gvTw2UGBY7SYXs (private to Erdany).

## The concept in one paragraph

The site is a hand-built paper theatre, printed in two inks (cherry and near black) on ivory card. Guests tear a ticket at the box office, meet the host in front of a closed curtain, and wander the house: an attic archive, a dressing room full of notes, and the wings where the builder stood. Each room a guest has been inside is coloured in with Shania's pink. The curtain stays closed until the finale, when a guest raises it and the stage behind is pink.

Decisions made by Erdany on 30 October 2026:

- Display name: **Shania's Little World** (no "The").
- Host: **Ambrose**, a cut-paper silhouette. His name is set once in `content/site.ts`.
- The host always says **Shania**. Her nickname is not used publicly.
- Pink: soft blush `#F2B6C3`.
- *I Will Fly* by Ten2Five appears as an outbound link in the Wings. The track is never hosted on the site.
- English for all authored copy. Messages appear in whatever language their writers used.
- Launch target: 26 November 2026; the birthday is 28 November 2026.

## Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | Astro 7, static output | Real URLs per room, image optimisation, almost no client JS |
| Language | TypeScript, `astro/tsconfigs/strict` | Content files are typed, so editing mistakes fail early |
| UI framework | None | Each interaction is a few lines of plain TypeScript |
| Fonts | Fontsource, self-hosted | No third-party requests; Latin subsets only |
| Images | `astro:assets` `<Picture>` (sharp) | Phone photos become AVIF/WebP at several widths |
| Page transitions | Native cross-document View Transitions | Progressive: a plain page load where unsupported |
| Hosting | Any static host (Vercel, Netlify, Cloudflare Pages) | `npm run build` produces `dist/` |

Not used, on purpose: a backend, a database, analytics, cookies, embeds, or a contribution form.

## Locations and routes

| Route | Scene | PRD location | Status in the prototype |
|---|---|---|---|
| `/` | Overture: The Box Office | The Entrance | Built |
| `/stage` | Scene I: Enter the Host | Meet the Host | Built |
| `/house` | Home base: The House | World map | Built |
| `/archive` | Scene II: The Archive of Her | The Archive of Her | Built |
| `/dressing-room` | Scene III: The Dressing Room | The People's Gallery | Placeholder page |
| `/wings` | Scene IV: The Wings | A Personal Corner | Placeholder page |
| `/curtain-call` | Finale: Curtain Call | The Final Discovery | Placeholder page |

The stage in the house drawing links to `/curtain-call`. The introduction at `/stage` is reached from the box office on a first visit and from the programme ("Hear the introduction again") afterwards.

## Transitions

| From → to | What happens | Reduced motion |
|---|---|---|
| Box office → stage (first visit) | Ticket stub tears; the theatre front swings open like a doll's house; the view pushes into the stage | Straight to the next page |
| Box office → house (returning) | Stub tears; front swings open; the house page shows the same drawing | Straight to the next page |
| House → any room | The drawing pushes in toward the chosen room, then the page changes | Plain navigation |
| Any page → any page | Short cross-fade via View Transitions; the header stays put | Cross-fade disabled |

Every sequence is started by the guest and lasts under two seconds. Nothing auto-advances.

## Navigation and state

- Each room is its own page, so the back button, refreshing and sending one room's link all work.
- The header carries the wordmark and a **The house** link on every page except the box office.
- The house page has the drawing plus a plain-text programme (same links) for keyboards and screen readers.
- Guest progress lives in `localStorage` under `slw-progress-v1`, on the guest's own device:
  - `visited`: rooms the guest has entered, which are coloured in on the house drawing
  - `shown`: rooms whose colouring-in animation has already played
  - `heard`: places where Ambrose has already spoken, so he speaks once per room
  - `introSeen`: whether the introduction has played
- If storage is unavailable or cleared, the theatre starts plain again. Nothing breaks.
- Nothing is locked. Ambrose only suggests saving the stage for last.

## Content model

Everything Erdany edits lives in `/content`. Components never contain personal content.

| File | Holds |
|---|---|
| `content/site.ts` | Names (Shania, Erdany, the host), dates, link-preview text, the birthday wording, the song link |
| `content/host.ts` | Every line Ambrose says, grouped by scene |
| `content/archive.ts` | The two photographs (file, alt text, caption, focal point) and the narration |
| `content/messages.ts` | Birthday notes for the Dressing Room |
| `content/letter.ts` | Erdany's letter and optional photo |
| `content/photos/` | Image files referenced by the files above |
| `content/types.ts` | The shapes of all of the above |

A field left as `null` (or an empty message list) means "not supplied yet".

### The placeholder guard

- `npm run dev` shows missing content as clearly stamped placeholders.
- A preview build with `PUBLIC_ALLOW_PLACEHOLDERS=true` does the same, plus a "Preview build" badge.
- A normal `npm run build` **fails** while anything is missing and prints the list. A placeholder can't reach the public site by accident.

## Components

```
src/
  layouts/Base.astro        head, fonts, meta (noindex), header, launch guard
  components/
    Chrome.astro            header: wordmark + "The house"
    Ambrose.astro           the host's silhouette (SVG)
    CueCards.astro          Ambrose's dialogue: next, skip, once-per-room memory
    Ticket.astro            the entrance ticket and its tear
    Facade.astro            the theatre front (same outline as the house)
    HouseMap.astro          the cross-section map, interactive or decorative
    Print.astro             a photograph as a print, or a stamped placeholder
    Unbuilt.astro           temporary page for rooms not built yet
  lib/
    content.ts              photo lookup, missing-content list, launch guard
    progress.ts             guest progress in localStorage (client only)
    rooms.ts                room names, routes and PRD mapping
    motion.ts               reduced-motion check, small timing helper
  styles/global.css         tokens, type, shared pieces, view transitions
```

## Design tokens

Colours: `--paper #F0E9D9`, `--card #E9DDC7`, `--cherry #8F1D2C`, `--deep #641522`, `--ink #171717`, `--pink #F2B6C3`, plus `--ink-2 #4B3F3B` for secondary text (8:1 on paper).
Type: Fraunces (display at weight 600 with soft terminals; Ambrose's voice in its italic. Chosen 30 Oct 2026 after Bodoni Moda read too thin), Newsreader (reading), Instrument Sans (interface and condensed playbill labels).
Motion: 200–800 ms; `--ease-paper` for things that glide, `--ease-arrive` for entrances. Nothing loops.

## Accessibility

- Semantic landmarks, one `h1` per page, and a skip link.
- Every control is a real `button` or `a` with a visible focus style, and tap targets are at least 44 px.
- Ambrose's lines sit in an `aria-live="polite"` region; Skip is always available.
- Room state is written out in words ("Coloured in", "Not yet visited"), not shown by colour alone.
- `prefers-reduced-motion` removes every transform-based sequence.
- Photos need real alt text before the launch build will pass.

## Privacy

- `noindex, nofollow` on every page. This keeps the site out of search results, but anyone with the link can still open it.
- No third-party requests at runtime: fonts and images are self-hosted, and there's no analytics.
- Contributors are told their name, message and photo will be visible to anyone with the link.

## Still to build (Stage 5)

The Dressing Room, the Wings, the Curtain Call, Ambrose's other poses (bow, point, hat to chest), the link-preview image, and optional sound.
