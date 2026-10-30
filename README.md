# Shania's Little World

A small paper theatre built for Shania's birthday (28 November 2026).
Astro 7, static, no backend.

## Run it

```sh
npm install
npm run dev        # http://localhost:4321, placeholders visible
npm run check      # type check
npm run build      # launch build: refuses to run while content is missing
PUBLIC_ALLOW_PLACEHOLDERS=true npm run build   # preview build with stamped placeholders
npm run preview    # serve the last build
```

## Where things live

- `content/`: everything personal. Names, the host's lines, photos, messages, the letter.
  Start with `content/site.ts`. The host's name is set there, once.
- `content/photos/`: original photo files (see the README inside).
- `src/`: the theatre itself (pages, components, styles). No personal content in here.
- `docs/architecture.md`: how it's built and why.
- `PRD.md`, `CLAUDE.md`: requirements and working rules.
- `visual-references/`: the original moodboards (direction only, not assets).

## Status

Stage 4 prototype: the Box Office, the host's introduction, the House and the Archive of Her are built.
The Dressing Room, the Wings and the Curtain Call come in Stage 5.
