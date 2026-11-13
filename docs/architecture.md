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
| Page transitions | Astro `ClientRouter`: one document for the whole visit | Rooms swap in place, so the music never stops; slide animation, simulated where View Transitions are missing |
| Hosting | Any static host (Vercel, Netlify, Cloudflare Pages) | `npm run build` produces `dist/` |

Not used, on purpose: a backend, a database, analytics, cookies, embeds, or a contribution form.

## Locations and routes

| Route | Scene | PRD location | Status |
|---|---|---|---|
| `/` | Overture: The Box Office | The Entrance | Built |
| `/stage` | Scene I: Enter the Host | Meet the Host | Built |
| `/house` | After the show: The House | World map (opens after the finale) | Built |
| `/archive` | Scene II: The Archive of Her | The Archive of Her | Built |
| `/dressing-room` | Scene III: The Dressing Room | The People's Gallery | Built |
| `/wings` | Scene IV: The Wings | A Personal Corner | Built |
| `/curtain-call` | Finale: Curtain Call | The Final Discovery | Built |

The stage in the house drawing links to `/curtain-call`. The introduction at `/stage` is reached from the box office on a first visit and from the programme ("Hear the introduction again") afterwards.

The whole visit runs in one order (`route` in `src/lib/rooms.ts`): `/` → `/stage` → `/archive` → `/dressing-room` → `/wings` → `/curtain-call` → `/house`.

## A guided tour (revised 31 Oct 2026, after the prototype review)

Erdany's review: guests dropped onto the map would be unsure where to go, and Ambrose was barely visible outside the stage. So Ambrose now **leads a tour**, and the house drawing is an overview, not a hub.

1. Box office: Ambrose stands by the door. Tearing the ticket, he walks in first.
2. Stage: his introduction, ending in "Follow me".
3. Archive → Dressing Room → Wings: in each room one Ambrose is docked at the foot of the screen (`GuideDock`). He greets guests, steps aside when they scroll, tap elsewhere or after 9 seconds, comes back to react (the archive lift), and at the end of the room leads on with "Follow me: <next room>". A quiet "Follow me" link is in his card from the start, so the way on is never hidden.
4. Curtain Call: the guest raises the curtain. The stage is pink, the greeting banner comes down, one paper bird crosses, Ambrose (now wearing a pink carnation) bows, and the company is listed: Shania, Erdany, Ambrose, everyone who wrote, and the song.

On the stage his cards carry stage business (`pose` and `action` in `content/host.ts`): a bow on "I'm Ambrose", a wobbling shoe, a twitch of the curtain that shows a sliver of pink.

**Making the route obvious (revised 3 Nov 2026, after Erdany found the guiding confusing):**
- A tour bar under the header in every room (`TourBar`): 1 Photos · 2 Notes · 3 Letter · 4 Curtain, current stop marked, seen stops ticked.
- Every line Ambrose says on arrival ends with what to do ("Lift the top one", "Tap a note", "Read it in your own time").
- When his card steps aside, a small bar stays at the bottom: "Ambrose | Next: <room> →". It is quiet until he leads on, then becomes the main button.
- The header link is called "Map".

**Locked doors (added 3 Nov 2026, at Erdany's request: "biar yg buka jg seru").** Each of the four stops opens with a short game in front of the room (`Gate.astro`, games in `src/components/games/`): *Develop the photo* (rub the dark print; the childhood photo appears), *Find the key* (lift props backstage), *Light the lamp* (match three pairs), *Pull the rope* (tap as the ring meets the circle). Each takes under 30 seconds. Winning punches the guest's ticket. "Let me through" appears after 15 seconds or as soon as a guest struggles, so nobody is ever stuck, which keeps the PRD's rule that the finale is never locked behind optional interactions. Opened doors are remembered (`unlocked` in progress) and stay open; an inline script in the head marks them before the page paints. Without JavaScript there are no doors. No quiz: Erdany found it cringe.

**The Dressing Room shows every note in full (revised 8 and 12 Nov 2026, at Erdany's request: no tapping to read, and friends not split up by circle).** One mirror holds every note as an open card, the message and then the sender's name signed underneath (`Note.astro`), in the order of `content/messages.ts`. Only friends who sent their notes together as a package share a `group`: they're clipped into one bundle on the mirror with a pink name tag, and a photo they sent together (`groupPhotos`) is taped on top of it. Notes still on their way are listed in `awaiting`: stamped stand-ins in development, and the launch build refuses to run until each is filled in or removed.

**One room at a time, map at the end (revised 8 Nov 2026).** Erdany's review: on a first visit a guest could tap "Next" (or the tour bar, or the map) and be at the end in seconds; the map should come last, for guests who want to go back. So the tour is now walked strictly in order:
- A guest may be anywhere up to the first step they haven't finished, never further (`furthest()` in `src/lib/progress.ts`). An inline guard in `Base.astro` applies the same rule before the page paints and on every in-site navigation: a typed address, an old link or a shared room link for a step further on takes the guest to where they are instead. A stranger opening `/wings` lands at the box office.
- A room is **finished** when Ambrose leads on from it (`done` in progress). He leads on only once the room's task is done: the archive after the photo is lifted and the guest has read to the end; the dressing room at the end of the mirror; the wings at the end of the letter.
- Until then the bar at the foot of the screen shows **To do: <task>** (`todo` per room in `content/host.ts`), not the way on. Once he has led on it becomes **Next: <room> →**.
- The tour bar only links stops the guest has reached; later ones are shown faded with a dashed ring and are not links.
- The **Map** link in the header and the house page open only after the curtain call (`data-free` on `<html>`). The company's last button is "See the whole house". From then on every room is open, the tour bar links all four stops, and the box office offers "Or go straight to the house".
- The house page ends with "Start the tour over" (asks twice), which clears progress and goes back to the box office.
- Browsers that keep no storage (some in-app browsers) get `data-free` from the start, so nobody is ever stuck at a door. Without JavaScript there is no guard either.
- Dialogue stays skippable, and every door game still has "Let me through": skipping a line or a game never skips a room.

## Transitions

| From → to | What happens | Reduced motion |
|---|---|---|
| Box office → stage (first visit) | Ambrose walks in through the door; the stub tears; the theatre front swings open like a doll's house; the view pushes into the stage | Straight to the next page |
| Box office → where they left off (returning) | Stub tears; front swings open; the guest is back at their stop (the house, after the show) | Straight to the next page |
| Room → next room | Ambrose's "Follow me": the next room slides in like a painted flat | Plain navigation |
| House → any room | The drawing pushes in toward the chosen room, then the page changes | Plain navigation |
| Any page → any page | Slide via View Transitions (backwards when going back; a fade after the house and entrance zooms); the header stays put | Disabled |

Every sequence is started by the guest and lasts under two seconds. Nothing auto-advances.

## Navigation and state

- Each room is its own page, so the back button, refreshing and sending one room's link all work.
- The header carries the wordmark, the sound switch and, once the show is over, a **Map** link, on every page except the box office.
- The house page has the drawing plus a plain-text programme (same links) for keyboards and screen readers.
- Guest progress lives in `localStorage` under `slw-progress-v2`, on the guest's own device:
  - `visited`: rooms the guest has entered, which are coloured in on the house drawing
  - `done`: rooms the guest has finished (Ambrose led on); sets how far along the tour they may go
  - `unlocked`: doors opened by playing (or "Let me through")
  - `shown`: rooms whose colouring-in animation has already played
  - `introSeen`: whether the introduction has played
  - `finaleSeen`: whether the curtain has been raised (the house drawing then shows the stage open)
- If storage is cleared, the tour starts again at the box office. If it is unavailable, every room is open. Nothing breaks.
- **Music and sound** share one switch ("Music on/off", in the header and labelled at the entrance), kept under `slw-sound`. It starts on, but nothing plays until the guest taps: tearing the ticket starts the music; a guest who arrives mid-tour or refreshes starts it with their first tap. It pauses in a background tab and plays quietly in the Wings (`data-music-level`).
- The music is an **original music-box waltz** composed in `src/lib/sound.ts` and synthesised live (no audio file, nothing to license). *I Will Fly* is never used as background music: it's copyrighted.
- Page scripts run once but pages are visited many times, so every script registers through `onPage()` (`src/lib/page.ts`), which re-runs it on each visit and removes its listeners when the guest leaves. Navigate in code with `navigate()` from `astro:transitions/client`, never `location.href` (a full load would stop the music).

## Content model

Everything Erdany edits lives in `/content`. Components never contain personal content.

| File | Holds |
|---|---|
| `content/site.ts` | Names (Shania, Erdany, the host), dates, link-preview text, the birthday wording, the song link, things she loves (optional tags on her dressing table) |
| `content/host.ts` | Every line Ambrose says, grouped by scene, with his poses and stage business |
| `content/archive.ts` | The two photographs (file, alt text, caption, focal point) and the narration |
| `content/messages.ts` | Birthday notes for the Dressing Room, all on one mirror in the order listed. `group` is optional and only for a package sent together (e.g. the internship friends): those notes form one bundle, with an optional shared photo in `groupPhotos`. Notes still on their way go in `awaiting`. (Replaces the PRD's fixed category list, at Erdany's request.) |
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
    Chrome.astro            header: wordmark, sound switch, "Map" (after the show)
    Ambrose.astro           the host's silhouette (SVG), four poses: welcome, point, chest, bow
    StageSet.astro          curtain, pink set, footlights, apron (introduction and finale)
    CueCards.astro          Ambrose's cards on the stage: next, skip, pose and stage business
    GuideDock.astro         Ambrose docked in a room: greets, steps aside, reacts, leads on
    Guide.astro             Ambrose inline, on the house page and at each locked door
    SoundToggle.astro       the sound switch
    Ticket.astro            the entrance ticket and its tear
    Facade.astro            the theatre front (same outline as the house)
    HouseMap.astro          the cross-section map, interactive or decorative
    Print.astro             a photograph as a print, or a stamped placeholder
  lib/
    content.ts              photo lookup, missing-content list, launch guard
    progress.ts             guest progress in localStorage (client only)
    rooms.ts                room names, routes, PRD mapping, tour order
    motion.ts               reduced-motion check, small timing helper
    sound.ts                the music-box waltz and theatre sounds, synthesised (no audio files)
    page.ts                 onPage(): run a script on every visit, clean up on leaving
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

## Link preview

`public/og.png` (1200×630): the theatre front at night with Ambrose by the door, "Shania’s Little World", "A small show in five rooms. Doors are open." It was rendered from the site's own components. WhatsApp needs an absolute address for it, so **set `SITE_URL` to the real address when deploying**.

## Instagram carousel

Five 1080 × 1350 slides: a trailer that ends as an invitation. Each slide is a modern editorial layout (flat cherry, ivory or pink fields, big Fraunces type, small sans labels, a "01 / 05" index) with a piece of Victorian printed matter laid on it as a collage object, modelled on the V&A's 19th-century playbills and toy-theatre sheets.

How it got here (all from Erdany's reviews, 31 Oct to 1 Nov 2026): a tour of the rooms ("that's the site's contents"), then a generic trailer ("AI slop"), then pure archive ("too old-newspaper, no modern feel"), then this mix. Last, Erdany felt uneasy promoting a small site as something big, so the set was cut from seven slides to five and the copy now says plainly what's inside. The joke is grand announcements for something openly small; it never promises more than the site holds.

1. Shania's Little World, over the playbill ("For the Benefit of Shania")
2. "It's very small. That's the point." A few photographs, notes from the people who know her best, a letter; a few minutes. Over a newspaper cutting
3. Introducing Mr. Ambrose, with his toy-theatre character sheet
4. Starring Shania, over a handbill with her star coloured pink by hand
5. "You're invited.", the ticket on pink card with the QR on its stub

Type: Abril Fatface, Alfa Slab One, IM Fell English (+ SC), League Gothic and Rye, self-hosted via Fontsource (dev dependencies, used only by the carousel). The letterpress look is an SVG filter (ragged edges, missed specks, uneven density); the red forme is set half a pixel off the black. Pink only ever appears as hand-colouring or as the ticket's card. Its words live in `promo/copy.ts`.

- `promo/Carousel.astro` is injected as `/promo` by `astro.config.mjs` **only under `astro dev`**, so it never reaches the built site.
- `npm run promo` (`promo/render.mjs`) reuses the running dev server (or starts one), photographs each `[data-slide]` in headless Chrome at 2x and writes `promo/out/` (git-ignored).
- The QR is drawn only when `SITE_URL` is set. Without it the stub shows a stamped placeholder that cannot be scanned. It's generated locally by `qrcode` and points straight at the address, with no redirect service in between, so it never expires. Tested: Chrome's QR reader decodes it at full size and at phone width.

## Still to do

Real content (photos, narration, messages, letter), then Stage 6 refinement on real phones, including WhatsApp's and Instagram's built-in browsers.
