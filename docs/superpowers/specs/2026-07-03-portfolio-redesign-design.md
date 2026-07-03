# Portfolio Redesign Design

**Date:** 2026-07-03
**Owner:** Bhavesh Meghwal portfolio
**Scope:** Full portfolio redesign across homepage, projects, blog, navigation, content model, motion system, and contact flow

## Goal

Build a dark, minimalist portfolio that presents Bhavesh as an engineer building robotics, AI, and product systems. The new site should feel designed, current, and human. It should show stronger project curation, sharper writing, richer project detail pages, and a real local blog.

## Current Problems

The current site has energy but it spends too much of it on effects.

- The homepage uses particles, a custom cursor, typed text, tilt cards, spotlight cards, and multiple animated surfaces at the same time.
- The visual style leans on neon glow and glass panels, which makes the portfolio feel louder than the work itself.
- Project content lives in one large constants file with placeholder demos, placeholder videos, and document links that do not exist in `public`.
- There is no project archive page, no project detail page, and no blog.
- Meta assets are incomplete. `favicon.ico` and `public/images/og-image.jpg` are missing.
- The site speaks in polished portfolio language too often. It needs copy that sounds like Bhavesh wrote it.

## Product Direction

The redesign will use an editorial dark base with stronger motion graphics inside the content.

- Keep the surface calm: black and slate backgrounds, crisp borders, restrained accents, fewer decorative layers.
- Push motion in a deliberate way: graph traces, text reveals, scroll progress, number ramps, timeline draws, and section choreography.
- Remove ambient visual noise: no particle field, no custom cursor, no hover gimmicks that matter more than the content.
- Keep the homepage tight. Put detail in dedicated project and blog pages.

## Positioning

Use this line in the hero:

**Engineer building robotics, AI, and product systems**

The supporting copy should connect three tracks:

- aerial robotics and autonomy work
- AI tooling and product engineering
- product systems built for real users

## Information Architecture

### Primary routes

- `/` homepage
- `/projects` all projects page
- `/projects/[slug]` project detail pages
- `/blog` blog index
- `/blog/[slug]` blog post pages

### Homepage sections

1. Hero
2. Featured projects
3. Short profile and capabilities
4. Experience and selected roles
5. Writing preview
6. Contact section with direct links and form

This structure keeps the first visit fast to scan. The homepage should answer three questions in one pass:

- What does Bhavesh build?
- Why does the work matter?
- Where should I click next?

## Visual System

### Color

Use a dark neutral palette with one electric accent.

- Background: near black
- Surface: charcoal and slate
- Text: warm white to muted gray
- Accent: one cool technical blue or cyan
- Dividers: thin, low-contrast slate lines

Avoid purple-heavy gradients, glowing cards, and layered aurora backgrounds.

### Typography

Use a technical but readable system.

- Headings: distinctive sans with sharp geometry
- Body: clean sans with high readability
- Labels, dates, metrics: mono or semi-mono accent face

The type should carry the hierarchy before motion starts.

### Layout

- No horizontal scroll at any breakpoint
- Wide desktop grid with disciplined gutters
- Mobile-first spacing and readable line lengths
- Sticky navigation with clear active states
- Project and writing cards should align to a clean grid, not a bento collage

## Motion System

Motion is part of the redesign. It should feel intentional, not busy.

### Motion goals

- make sections arrive with structure
- make data feel alive
- make the reading flow feel guided

### Motion tools

- `GSAP` for section choreography, line draws, counters, and scroll-linked reveals
- `Lenis` for smooth scroll feel if dependency setup stays clean
- existing motion library only where component-level transitions stay simpler

### Motion rules

- animate transform and opacity only
- respect `prefers-reduced-motion`
- use motion to reveal content, not to decorate empty space
- keep mobile motion lighter than desktop motion
- avoid horizontal scroll, pinned sections that trap users, or sideways storytelling rails

### Motion patterns to use

- graph line draw in hero and section headers
- staggered text reveal with tight timing
- project cards that lift and expand with content-first motion
- timeline strokes that draw on scroll
- counters that ramp once when they enter view
- page enter transitions for project detail and blog pages

### Motion patterns to remove

- particle background
- custom cursor
- magnetic hover wrappers
- tilt cards
- decorative infinite floating orbs

## Content Model

Move content out of `src/utils/constants.js` into focused modules.

### Project model

Each project should support:

- title
- slug
- summary
- longer overview
- role
- timeframe
- category
- status
- featured flag
- outcomes
- stack
- live URL when deployed
- repo URL when public
- optional private repo note
- optional article or report links
- optional hero image

Projects should cover both robotics and product work. Deployed private work is valid to show if Bhavesh provides the live URL or wants it described without code.

### Blog model

Blog posts will live locally in the repo and ship as static pages. Start with a few real posts written in Bhavesh's voice. Topics should match the portfolio:

- robotics lessons
- product engineering notes
- AI or systems work learned on real builds

Use local content files and statically generate routes. Do not rely on a CMS.

## Writing Style

The copy should sound like a person, not a portfolio generator.

- shorter claims
- direct verbs
- concrete outcomes
- fewer abstractions
- no slogan-heavy filler

Project descriptions should answer:

- what Bhavesh built
- what problem he worked on
- what changed because of the work

Blog writing should sound like field notes or engineering essays, not brand content.

## Page-Level Behavior

### Hero

- strong headline
- short support copy
- primary actions: view projects, open resume
- subtle graph-based motion in the background or beside the copy

### Featured projects

- show 6 curated projects on the homepage
- split the mix across robotics, AI, and product systems
- link to detail pages
- send users to `/projects` for the archive

### Projects archive

- clean grid or list view
- filter by category
- no modal-heavy interaction
- each card should link to its own page

### Project detail pages

- problem
- role
- approach
- stack
- outcomes
- links
- related projects

### Blog

- `/blog` index with post previews
- `/blog/[slug]` static post pages
- reading layout optimized for long text

### Contact

Keep both paths:

- direct contact links for low friction
- form for outreach with a clearer state model

## Technical Decisions

- Stay on the current Next.js pages router to avoid a full framework migration.
- Use local TypeScript content modules for projects and blog posts unless markdown support can be added without adding fragile build complexity.
- Replace the monolithic constants file with focused data files and helpers.
- Keep static export compatibility for GitHub Pages.

## Cleanup and Quality Work

- replace placeholder links and fake demo URLs
- remove missing document references or add real files
- add missing favicon and OG image handling
- tighten page metadata
- improve responsive behavior
- keep touch targets and focus states visible

## Verification

The finished redesign should satisfy these checks:

- homepage reads cleanly on mobile and desktop
- no horizontal scroll
- reduced-motion mode disables non-essential motion
- featured project mix reflects both robotics and newer AI or product work
- `/projects` and `/blog` build as static routes
- copy sounds human and specific
- build and lint pass
