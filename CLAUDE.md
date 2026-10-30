# CLAUDE.md — The Shania's Little World

## Project mission

Build **The Shania's Little World**, a mobile-first interactive birthday experience that feels like exploring a small fictional world dedicated to Shania.

This is not a conventional birthday landing page, slideshow, chatbot, or generic template. Visitors explore distinct locations and are guided by a fictional MC with a consistent personality.

The website is public to anyone who receives the link. Never assume the visitor is Shania. Shania is the central subject; visitors are the audience.

The complete product requirements are in `PRD.md`. Read it fully before making product or implementation decisions.

## Mandatory first steps

Before coding:
1. Inspect the repository, framework, scripts, dependencies, components, and assets.
2. Read `PRD.md` completely.
3. Inspect both images in `visual-references/`.
4. Identify what already exists and preserve useful work.
5. Report the current architecture and constraints.
6. Do not overwrite or restructure the project blindly.

## Creative role

Work as a senior creative director, product designer, interaction designer, and frontend engineer. Make strong, reasoned design decisions. Do not ask the user to approve every minor detail. When a meaningful decision is uncertain, recommend one direction and explain why.

## Creative concept

The experience is a miniature world / interactive exhibition with these proposed locations:
1. The Entrance
2. Meet the Host
3. The Archive of Her
4. The People's Gallery
5. A Personal Corner
6. The Final Discovery

**Approved (30 Oct 2026): "The Little Paper Theatre".** A hand-built paper theatre printed in cherry and black; each room a guest visits is coloured in with Shania's pink; the curtain opens only at the finale. Display name is "Shania's Little World" (no "The"). The host is Ambrose, a cut-paper silhouette whose name is set once in `content/site.ts` so it can be changed. The host always says "Shania"; her nickname is not used publicly. Full design: `docs/architecture.md`.

You may improve names, layout, transitions, or the world metaphor, but preserve the emotional progression. Prefer a coherent world map or interconnected rooms over a conventional stack of page sections. Visitors must understand where they are, how to move, and how to revisit locations.

## MC character

The MC is a fictional, intentionally authored guide—not an AI chatbot.

Personality: witty, warm, slightly dramatic, occasionally sarcastic, charming, and self-aware. Never childish, cringe, or overbearing.

Write concise original dialogue. Use the MC at meaningful transitions, not every time the visitor clicks. Allow dialogue to be dismissed or skipped. Do not use a generic AI mascot.

## Design system

Use these colors:
- Cherry: `#8F1D2C`
- Deep cherry: `#641522`
- Warm ivory: `#F0E9D9`
- Paper cream: `#E9DDC7`
- Near black: `#171717`
- Her pink: `#F2B6C3` (added 30 Oct 2026; Shania's favourite colour). Hand-colouring only: always inside an ink line, never as text on light surfaces (1.4:1 on ivory). Cherry text on it is 5.2:1, deep cherry 7.3:1.

Design language: editorial magazine, vintage printed matter, personal archive/scrapbook, subtle theatrical atmosphere, tactile paper surfaces, expressive serif headlines, clean restrained sans-serif UI, deliberate whitespace, asymmetrical compositions, and editorial treatment of real photography.

The references in `visual-references/` are art-direction guidance, not literal layouts to copy.

Never default to purple/blue gradients, excessive glassmorphism, generic rounded cards everywhere, emoji-led visuals, random floating decorations, excessive confetti/sparkles, generic stock/AI-looking people, children's party styling, unnecessary parallax, or uncustomized component-library defaults.

## Content integrity

The user will supply real photographs, messages, names, and the personal letter. Never fabricate photos of Shania, biographical facts, birthday wishes, contributor names, relationships, or the creator's letter.

Use clearly named placeholders in the content layer. Missing content must not appear publicly as if it were real. Keep content separate from presentation.

The photo archive should contain one childhood photo and one current photo, not an artificial school-stage timeline.

The final reveal may say “Happy Birthday, Shania” but must not reveal the physical gift, money, or private financial information.

## Interaction principles

Every interaction needs a purpose. Prioritize a few memorable interactions over gimmicks. Potential interactions: entrance transition, MC dialogue reveal, map/location discovery, childhood/current photo transition, message card opening, gallery filtering, and final birthday reveal.

Motion should communicate discovery, transition, focus, or celebration. Keep it short and polished.

- Support mobile touch and keyboard.
- Respect `prefers-reduced-motion`.
- Use comfortable tap targets and visible focus states.
- No forced waiting.
- No autoplay audio. Any audio must be optional with an obvious toggle.

## Technical principles

- Preserve the existing stack unless there is a clear reason to change it.
- Prefer the simplest architecture that meets the experience requirements.
- Static/content-driven implementation is sufficient.
- No login, database, or backend is required for the initial version.
- Avoid unnecessary dependencies.
- Use reusable components and clean content data.
- Optimize images and handle missing assets gracefully.
- Ensure public deployment is straightforward.
- Do not implement a contribution form or third-party data collection without first explaining privacy and moderation implications.

## Required workflow

### Stage 1 — Discovery
Inspect the repository, PRD, and visual references. Summarize the stack, constraints, and existing assets.

### Stage 2 — Creative concept (do not code the full site yet)
Present a specific creative concept, world metaphor and proposed map, MC character direction with sample dialogue, visual system and typography, visitor journey, and interaction model. Do not give a generic template answer.

### Stage 3 — Experience architecture
Define locations, transitions, navigation, content model, and component architecture.

### Stage 4 — Prototype
Build a polished prototype of the entrance, world/map navigation, MC treatment, and one representative location. Pause for review before implementing the entire experience. A rough wireframe is not a finished prototype.

### Stage 5 — Full implementation
After the direction is approved, build the remaining locations and connect the content model.

### Stage 6 — Refinement
Test mobile and desktop. Review every location and interaction. Fix layout issues, awkward copy, inconsistent typography, excessive animation, accessibility problems, and generic-looking details.

### Stage 7 — Handover
Explain what was built, which assets are still needed, exactly where to add photos and messages, how to edit MC dialogue and the personal letter, and how to run and deploy the site.

## Quality bar

Before considering the work finished, verify:
1. First impression creates curiosity.
2. World and locations feel coherent.
3. MC has a recognizable personality.
4. Every location has a clear purpose.
5. Photos are treated with care.
6. Message gallery is enjoyable to explore.
7. Personal letter feels intimate.
8. Finale is satisfying and restrained.
9. Mobile experience is excellent.
10. No placeholder or invented personal content is exposed.

**North star: Build something worth exploring.**
