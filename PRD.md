# THE SHANIA'S LITTLE WORLD
## Product Requirements Document (PRD)

**Version:** 1.1 (30 Oct 2026: concept "The Little Paper Theatre" approved; display name "Shania's Little World"; pink added to the palette; see `docs/architecture.md`)  
**Status:** Creative brief and implementation foundation  
**Experience:** Mobile-first interactive birthday world  
**Subject:** Shania

---

## 1. Product overview

**The Shania's Little World** is a small, carefully art-directed digital world created to celebrate Shania's birthday. It is not a conventional birthday landing page. Visitors enter a fictional little world and explore distinct locations: an entrance, a host introduction, a personal photo archive, a gallery of messages from friends and family, a personal corner containing a letter from the creator, and a final birthday reveal.

A fictional MC guides visitors through the experience. The MC is an intentionally designed narrative character with a consistent voice and personality—not an AI chatbot.

The website is public to anyone who receives the link. Visitors may include Shania, friends, family, classmates, and other people who know her. Never assume the visitor is Shania.

**Core promise:** visitors should leave feeling they explored something thoughtful, personal, and genuinely made with care.

## 2. Goals and non-goals

### Goals
- Create a memorable digital birthday experience that feels custom-designed.
- Present selected moments from Shania's life through real photographs and personal storytelling.
- Give friends and family a beautiful way to share birthday wishes.
- Include a more intimate personal message from the creator.
- Make exploration intuitive and enjoyable, especially on mobile.
- Maintain a coherent editorial visual identity from entrance to finale.

### Non-goals
- A social network, public comment platform, or AI chatbot.
- A conventional long-scrolling landing page or slideshow.
- A complex 3D game.
- User accounts or a database for the initial version.
- Public disclosure of the physical gift or any financial details.

## 3. Audience

- Shania, the person being celebrated.
- Friends and family who receive the link.
- University, school, and childhood friends.
- Other people who receive or discover the link.

Address visitors collectively or neutrally. Shania is the central subject; visitors are the audience. The experience must make sense even if someone visits without knowing the creator's backstory.

## 4. Experience concept

The website behaves like a miniature world or interactive exhibition. Visitors move between distinct locations, each with its own visual atmosphere and narrative purpose. A world map, interconnected rooms, or a hybrid map-and-room model may be used. Choose the clearest and most compelling solution during design exploration.

### Proposed locations

| Order | Location | Purpose |
|---|---|---|
| 01 | The Entrance | Welcome visitors and create curiosity |
| 02 | Meet the Host | Introduce the MC and the journey |
| 03 | The Archive of Her | Show one childhood photo and one current photo with narration |
| 04 | The People's Gallery | Display birthday messages from friends and family |
| 05 | A Personal Corner | Present a personal letter from the creator |
| 06 | The Final Discovery | Deliver the birthday reveal and thank visitors |

Locations may be renamed or creatively reinterpreted, but preserve the emotional progression.

## 5. Functional requirements

### 5.1 The Entrance
- Create a distinctive first impression and a sense of arrival.
- Introduce the idea of a special little world without immediately opening with a generic “Happy Birthday” headline.
- Provide a clear start/explore action.
- Work on narrow mobile screens without horizontal scrolling.
- Never require audio to proceed.

Suggested copy direction only: “Well, look who's here. You're just in time.”

### 5.2 The MC / host
- A fictional, intentionally written character guides visitors.
- Personality: witty, warm, slightly dramatic, occasionally sarcastic, charming, and self-aware.
- Give the MC a recognizable visual identity and consistent voice.
- Dialogue is concise and appears at meaningful transitions.
- Visitors can dismiss or skip dialogue where appropriate.
- The MC must not interrupt every action or become annoying.
- Dialogue is authored static content; no AI response generation is required.

### 5.3 The Archive of Her
- Include one childhood photograph and one recent/current photograph.
- Do not split the story into artificial school-stage timelines.
- Use only real photographs supplied by the creator. Never invent photographs of Shania.
- Use a thoughtful visual transition between the two images.
- Include editable narration supplied or approved by the creator; do not invent biographical facts.
- Provide responsive image crops and meaningful alt text.

### 5.4 The People's Gallery
- Display birthday wishes from friends and family.
- Support optional categories such as Family, Childhood Friends, School Friends, University Friends, and Other.
- Only show categories containing actual messages.
- Show contributor name and relationship/category when supplied.
- Visitors can open and close individual messages.
- Avoid one enormous wall of text.
- Make messages easy to add, edit, reorder, or remove through structured content.
- Never fabricate messages, names, or relationships. Do not publish sample placeholders as real contributions.

### 5.5 A Personal Corner
- Present a personal letter from the creator.
- Give it a quieter, more intimate visual treatment than the public message gallery.
- Support an optional photograph.
- Use a clearly marked placeholder until the creator supplies the letter. Do not write it on the creator's behalf.
- Avoid exposing private details not approved for publication.

### 5.6 The Final Discovery
- Bring the MC back for a concise closing moment.
- Reveal the birthday greeting only at the finale.
- Include “Happy Birthday, Shania” or an approved equivalent.
- A restrained celebratory animation may be used.
- Thank visitors for taking part.
- Do not mention the physical gift, money, or private financial arrangements.

### 5.7 Navigation and progress
- Visitors should understand where they are and what they can explore.
- Provide a way to return to the world/map and revisit locations.
- Show progress subtly if useful.
- Do not force visitors to complete every optional interaction before reaching the finale.
- Avoid dead ends; support browser back navigation where practical.
- Preserve a sensible experience if a visitor refreshes the page.

### 5.8 Optional audio
- Background music and sound effects are optional enhancements.
- Never autoplay audio; provide an obvious toggle if audio is implemented.
- The experience must remain complete without sound.
- Do not block development on missing audio assets.

## 6. Content model

Keep content separate from presentation. Use a simple structured data approach appropriate to the existing stack.

Suggested structure:

```text
content/
  site.ts
  host.ts
  archive.ts
  messages/
    family.ts
    friends.ts
    school.ts
    university.ts
  personal-letter.ts
```

A JSON-based structure is also acceptable. Choose one approach and document how to edit it.

Example message shape:

```ts
type BirthdayMessage = {
  id: string;
  name: string;
  relationship?: string;
  category: "family" | "childhood" | "school" | "university" | "other";
  message: string;
  photo?: string;
};
```

Missing content must be clearly marked in code and excluded from the public-facing experience until replaced.

## 7. Visual design direction

Use the supplied images in `visual-references/` as mood and composition guidance, not as literal layouts to reproduce.

### Palette

| Token | Hex | Use |
|---|---|---|
| Cherry | `#8F1D2C` | Primary accent |
| Deep cherry | `#641522` | Dark red surfaces and emphasis |
| Warm ivory | `#F0E9D9` | Main light background |
| Paper cream | `#E9DDC7` | Secondary paper surfaces |
| Near black | `#171717` | Main text and dark surfaces |
| Her pink | `#F2B6C3` | Hand-colouring for Shania and visited rooms (added in v1.1) |

### Visual personality
- Editorial magazine meets vintage printed matter.
- Subtle theatrical atmosphere.
- Personal archive / scrapbook elements.
- Warm, tactile paper-like surfaces.
- Expressive editorial serif headlines paired with restrained sans-serif interface text.
- Deliberate whitespace and asymmetrical layouts.
- Photography treated as editorial material, not generic card thumbnails.

### Avoid
- Generic purple/blue gradients and excessive glassmorphism.
- Default rounded-card layouts everywhere.
- Emoji as the primary visual language.
- Random floating decorations, excessive confetti, sparkles, or parallax.
- Generic AI mascots, stock people, or children's party aesthetics.
- Animations that obstruct reading or navigation.

## 8. Interaction and motion

Every interaction must have a purpose. Potential interactions include entrance transition, MC dialogue reveal, map/location discovery, childhood/current photo transition, message card opening, gallery category filtering, and final birthday reveal.

Motion should communicate discovery, transition, focus, or celebration. Prefer short, polished transitions over constant movement.

Requirements:
- Respect `prefers-reduced-motion`.
- Ensure interactions work with touch.
- Use comfortable tap targets and visible focus states.
- Avoid forced waiting and long loading sequences.
- Do not autoplay audio.

## 9. UX and accessibility

- Mobile-first responsive layout; no horizontal overflow at common phone widths.
- Readable type sizes and sufficient contrast.
- Semantic headings and landmarks.
- Keyboard-accessible controls and visible focus indicators.
- Meaningful image alt text.
- Reduced-motion support.
- Clear accessible names for buttons and interactive cards.
- Do not rely on color alone to communicate state.

## 10. Technical requirements

Inspect the existing repository, framework, dependencies, and assets before making changes. Preserve useful existing architecture.

Prefer a simple, maintainable implementation:
- Static/content-driven architecture is sufficient.
- No login or database is required for the initial version.
- No backend is required merely to make the experience feel interactive.
- Avoid unnecessary dependencies.
- Keep reusable components and content data separate.
- Optimize images and use responsive image behavior.
- Handle missing assets gracefully.
- Make public deployment straightforward.

If a contribution form or third-party data collection is proposed, explain privacy, moderation, and operational implications before implementing it.

## 11. Success criteria

1. A first-time visitor understands they entered a special interactive world.
2. The MC feels memorable but never irritating.
3. Visitors navigate without confusion.
4. The photo archive feels personal and art-directed.
5. The message gallery is pleasant to explore.
6. The personal letter feels distinct and intimate.
7. The final reveal feels earned rather than generic.
8. The experience works reliably on mobile and desktop.
9. The design feels custom-made, not template-generated.
10. No invented personal information or placeholder messages appear publicly.

## 12. Delivery phases

1. **Discovery:** inspect repository, design system, assets, and constraints.
2. **Creative concept:** propose world metaphor, map, MC personality, visual language, and visitor journey.
3. **Prototype:** build a polished entrance, world/map navigation, MC treatment, and one representative location. Review before full implementation.
4. **Full implementation:** build remaining locations and content model.
5. **Refinement:** test mobile/desktop, review every interaction, fix accessibility and visual issues.
6. **Handover:** document how to add photos, messages, personal letter, run locally, and deploy.

## 13. Content required from the creator

Do not block initial design exploration on these assets, but identify them clearly:
- Shania childhood photo.
- Shania current photo.
- Approved narration for the photo archive.
- Friends' and family's birthday wishes.
- Contributor names and optional categories.
- Personal letter from the creator.
- Optional photo for the personal corner.
- Optional music / sound assets.
- Final preferred birthday wording.

---

**North star:** Build something worth exploring. The technology should disappear behind the feeling that someone put real thought, taste, and care into making this little world.
