# Shania's Little World

A small paper theatre built for Shania's birthday (28 November 2026).
Astro 7, static, no backend.

## Run it

```sh
npm install
npm run dev        # http://localhost:4321, placeholders visible
npm run check      # type check
npm run test:tour  # with `npm run dev` running: walks the whole tour, every line must PASS
npm run build      # launch build: refuses to run while content is missing
PUBLIC_ALLOW_PLACEHOLDERS=true npm run build   # preview build with stamped placeholders
npm run preview    # serve the last build
npm run promo      # Instagram carousel → promo/out/*.png (QR is a placeholder)
SITE_URL=https://the-real-address npm run promo   # final carousel with a working QR
```

## Where things live

- `content/`: everything personal. Names, the host's lines, photos, messages, the letter.
  Start with `content/site.ts`. The host's name is set there, once.
- `content/photos/`: original photo files (see the README inside).
- `src/`: the theatre itself (pages, components, styles). No personal content in here.
- `promo/`: the Instagram carousel. Its words are in `promo/copy.ts`. Dev only, never deployed.
- `docs/panduan.md`: how to add photos, messages and the letter, check, and deploy (Indonesian).
- `docs/architecture.md`: how it's built and why.
- `PRD.md`, `CLAUDE.md`, `AGENTS.md`: requirements and working rules (AGENTS.md for Codex and other agents).
- `tests/`: the end-to-end tour test (headless Chrome, no dependencies).
- `visual-references/`: the original moodboards (direction only, not assets).

## Status

Every room is built: the Box Office, the introduction, the Archive, the Dressing Room, the Wings and the Curtain Call, with Ambrose leading the way.
What remains is the real content (see `content/`) and refinement on real phones.
