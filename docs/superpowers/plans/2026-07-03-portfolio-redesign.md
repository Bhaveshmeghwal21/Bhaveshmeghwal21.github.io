# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio into a dark, minimalist, motion-rich site with curated featured work, dedicated project pages, a local blog, and cleaner writing.

**Architecture:** Keep the current Next.js pages-router app and static export flow, but replace the homepage composition, move portfolio content into focused local modules, and add route-based project and blog pages. Use GSAP and Lenis for motion, keep data local to the repo, and test the content helpers with the Node test runner before wiring the UI.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, GSAP, Lenis, Node test runner

---

## File Structure

**Create**

- `docs/superpowers/specs/2026-07-03-portfolio-redesign-design.md`
- `src/content/projects.js`
- `src/content/blog.js`
- `src/content/site.js`
- `src/lib/content.js`
- `tests/content.test.mjs`
- `src/components/layout/SiteNav.tsx`
- `src/components/layout/SiteFooter.tsx`
- `src/components/motion/GraphTrace.tsx`
- `src/components/motion/Reveal.tsx`
- `src/components/sections/HomeHero.tsx`
- `src/components/sections/FeaturedProjects.tsx`
- `src/components/sections/ProfileSummary.tsx`
- `src/components/sections/WritingPreview.tsx`
- `src/components/sections/ContactSection.tsx`
- `src/pages/projects/index.tsx`
- `src/pages/projects/[slug].tsx`
- `src/pages/blog/index.tsx`
- `src/pages/blog/[slug].tsx`

**Modify**

- `package.json`
- `package-lock.json`
- `src/pages/index.tsx`
- `src/pages/_app.tsx`
- `src/pages/_document.tsx`
- `src/styles/globals.css`
- `src/contexts/ThemeContext.tsx`

**Leave unused or remove imports from**

- `src/components/ParticleBackground.tsx`
- `src/components/ui/Cursor.tsx`
- `src/components/ui/Magnetic.tsx`
- `src/components/ui/TiltCard.tsx`
- `src/components/ui/SpotlightCard.tsx`

---

### Task 1: Create the content model and helper tests

**Files:**
- Create: `src/content/projects.js`
- Create: `src/content/blog.js`
- Create: `src/content/site.js`
- Create: `src/lib/content.js`
- Test: `tests/content.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  getFeaturedProjects,
  getProjectBySlug,
  getAllProjectSlugs,
  getFeaturedPosts,
  getPostBySlug,
} from '../src/lib/content.js'

test('returns exactly six featured projects', () => {
  assert.equal(getFeaturedProjects().length, 6)
})

test('returns slugs for every project', () => {
  const slugs = getAllProjectSlugs()
  assert.ok(slugs.includes('quadrotor-fault-tolerant-control'))
})

test('finds a project by slug', () => {
  assert.equal(getProjectBySlug('rebloom').title, 'ReBloom')
})

test('returns featured writing posts', () => {
  assert.ok(getFeaturedPosts().length >= 2)
})

test('finds a blog post by slug', () => {
  assert.equal(getPostBySlug('what-flight-logs-hide').slug, 'what-flight-logs-hide')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/content.test.mjs`
Expected: FAIL with module-not-found errors for `src/lib/content.js`

- [ ] **Step 3: Write minimal implementation**

```js
import { projects } from '../content/projects.js'
import { posts } from '../content/blog.js'

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured).slice(0, 6)
}

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}

export function getAllProjectSlugs() {
  return projects.map((project) => project.slug)
}

export function getFeaturedPosts() {
  return posts.filter((post) => post.featured)
}

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug)
}
```

- [ ] **Step 4: Add the local content data**

```js
export const projects = [
  {
    title: 'Quadrotor Fault-Tolerant Control',
    slug: 'quadrotor-fault-tolerant-control',
    featured: true,
  },
  {
    title: 'ReBloom',
    slug: 'rebloom',
    featured: true,
  },
]

export const posts = [
  {
    title: 'What Flight Logs Hide',
    slug: 'what-flight-logs-hide',
    featured: true,
  },
]
```

- [ ] **Step 5: Run test to verify it passes**

Run: `node --test tests/content.test.mjs`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/content src/lib/content.js tests/content.test.mjs
git commit -m "feat: add portfolio content model"
```

---

### Task 2: Install motion dependencies and rebuild the design tokens

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `src/pages/_app.tsx`
- Modify: `src/styles/globals.css`
- Create: `src/components/motion/GraphTrace.tsx`
- Create: `src/components/motion/Reveal.tsx`

- [ ] **Step 1: Write the failing test for required content helpers still passing after dependency work**

Run:

```bash
node --test tests/content.test.mjs
```

Expected: PASS before dependency changes

- [ ] **Step 2: Install the motion packages**

Run:

```bash
npm install gsap lenis
```

Expected: `package.json` and `package-lock.json` update with both packages

- [ ] **Step 3: Add the app shell font stack**

```tsx
import { IBM_Plex_Sans, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
```

```tsx
const body = IBM_Plex_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const heading = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })
```

- [ ] **Step 4: Replace the global visual system**

```css
:root {
  --bg: #09090b;
  --surface: #111318;
  --surface-2: #171a21;
  --border: rgba(148, 163, 184, 0.18);
  --text: #f3f4f6;
  --muted: #a1a1aa;
  --accent: #38bdf8;
}

body {
  background:
    radial-gradient(circle at top, rgba(56, 189, 248, 0.08), transparent 30%),
    var(--bg);
  color: var(--text);
}
```

- [ ] **Step 5: Add the shared motion primitives**

```tsx
export default function Reveal({ children, className = '' }) {
  return <div className={className}>{children}</div>
}
```

```tsx
export default function GraphTrace() {
  return <div aria-hidden className="graph-trace" />
}
```

- [ ] **Step 6: Re-run the content tests**

Run: `node --test tests/content.test.mjs`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json src/pages/_app.tsx src/styles/globals.css src/components/motion
git commit -m "feat: add motion dependencies and design tokens"
```

---

### Task 3: Rebuild the homepage shell and remove noisy effects

**Files:**
- Modify: `src/pages/index.tsx`
- Create: `src/components/layout/SiteNav.tsx`
- Create: `src/components/layout/SiteFooter.tsx`
- Create: `src/components/sections/HomeHero.tsx`
- Create: `src/components/sections/FeaturedProjects.tsx`
- Create: `src/components/sections/ProfileSummary.tsx`
- Create: `src/components/sections/WritingPreview.tsx`
- Create: `src/components/sections/ContactSection.tsx`

- [ ] **Step 1: Write the failing test that featured project selection stays at six**

Run: `node --test tests/content.test.mjs --test-name-pattern="returns exactly six featured projects"`
Expected: PASS before homepage wiring

- [ ] **Step 2: Replace the homepage imports**

```tsx
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'
import HomeHero from '@/components/sections/HomeHero'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import ProfileSummary from '@/components/sections/ProfileSummary'
import WritingPreview from '@/components/sections/WritingPreview'
import ContactSection from '@/components/sections/ContactSection'
```

- [ ] **Step 3: Remove old noisy layers**

```tsx
// remove ParticleBackground, Cursor, Magnetic wrappers, and modal-heavy project composition
```

- [ ] **Step 4: Build the new homepage order**

```tsx
<SiteNav />
<main>
  <HomeHero />
  <FeaturedProjects />
  <ProfileSummary />
  <WritingPreview />
  <ContactSection />
</main>
<SiteFooter />
```

- [ ] **Step 5: Re-run the helper test**

Run: `node --test tests/content.test.mjs`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/pages/index.tsx src/components/layout src/components/sections
git commit -m "feat: rebuild homepage shell"
```

---

### Task 4: Add the projects archive and detail pages

**Files:**
- Create: `src/pages/projects/index.tsx`
- Create: `src/pages/projects/[slug].tsx`
- Modify: `src/content/projects.js`
- Modify: `src/lib/content.js`

- [ ] **Step 1: Write the failing test for slug lookup**

Run: `node --test tests/content.test.mjs --test-name-pattern="finds a project by slug"`
Expected: PASS with current helper, then use the route build as the next verification

- [ ] **Step 2: Add the archive page**

```tsx
export default function ProjectsPage() {
  return <section>All projects</section>
}
```

- [ ] **Step 3: Add static paths and props for project detail**

```tsx
export async function getStaticPaths() {
  return {
    paths: getAllProjectSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}
```

```tsx
export async function getStaticProps({ params }) {
  return { props: { project: getProjectBySlug(params.slug) } }
}
```

- [ ] **Step 4: Render the case-study layout**

```tsx
<article>
  <h1>{project.title}</h1>
  <p>{project.summary}</p>
  <section>{project.overview}</section>
</article>
```

- [ ] **Step 5: Run build verification for the new routes**

Run: `npm run build`
Expected: PASS with generated `/projects` and `/projects/[slug]` routes

- [ ] **Step 6: Commit**

```bash
git add src/pages/projects src/content/projects.js src/lib/content.js
git commit -m "feat: add project archive and detail pages"
```

---

### Task 5: Add the local blog with starter posts

**Files:**
- Create: `src/pages/blog/index.tsx`
- Create: `src/pages/blog/[slug].tsx`
- Modify: `src/content/blog.js`
- Modify: `src/lib/content.js`

- [ ] **Step 1: Write the failing test for blog lookup**

Run: `node --test tests/content.test.mjs --test-name-pattern="finds a blog post by slug"`
Expected: PASS with helper, then use route generation as the next verification

- [ ] **Step 2: Add three starter posts in local content**

```js
export const posts = [
  { slug: 'what-flight-logs-hide', title: 'What Flight Logs Hide', featured: true },
  { slug: 'building-products-from-robotics-habits', title: 'Building Products from Robotics Habits', featured: true },
  { slug: 'why-i-care-about-operator-workflows', title: 'Why I Care About Operator Workflows', featured: false },
]
```

- [ ] **Step 3: Add the blog index**

```tsx
export default function BlogPage() {
  return <section>Writing</section>
}
```

- [ ] **Step 4: Add static blog routes**

```tsx
export async function getStaticPaths() {
  return { paths: posts.map((post) => ({ params: { slug: post.slug } })), fallback: false }
}
```

- [ ] **Step 5: Run build verification**

Run: `npm run build`
Expected: PASS with generated `/blog` and `/blog/[slug]` routes

- [ ] **Step 6: Commit**

```bash
git add src/pages/blog src/content/blog.js src/lib/content.js
git commit -m "feat: add local blog pages"
```

---

### Task 6: Finish contact, metadata, and quality cleanup

**Files:**
- Modify: `src/components/sections/ContactSection.tsx`
- Modify: `src/pages/_document.tsx`
- Modify: `src/contexts/ThemeContext.tsx`

- [ ] **Step 1: Write the failing route verification**

Run: `npm run build`
Expected: FAIL if any metadata asset path or route logic is broken

- [ ] **Step 2: Keep both direct contact and form paths**

```tsx
<div className="contact-actions">
  <a href={`mailto:${site.email}`}>Email</a>
  <a href={site.linkedin}>LinkedIn</a>
</div>
<form>{/* existing EmailJS flow, restyled */}</form>
```

- [ ] **Step 3: Tighten metadata**

```tsx
<meta property="og:title" content="Bhavesh Meghwal | Robotics, AI, and product systems" />
```

- [ ] **Step 4: Keep the theme stable**

```tsx
const [theme, setTheme] = useState('dark')
```

- [ ] **Step 5: Run final verification**

Run:

```bash
node --test tests/content.test.mjs
npm run lint
npm run build
```

Expected:
- content tests PASS
- lint PASS
- build PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/ContactSection.tsx src/pages/_document.tsx src/contexts/ThemeContext.tsx
git commit -m "feat: finish portfolio redesign polish"
```
