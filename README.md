# Bhavesh Meghwal · Portfolio

Personal site at [bhaveshmeghwal21.github.io](https://bhaveshmeghwal21.github.io): projects, writing and contact.

Next.js 14 (pages router, static export), TypeScript and Tailwind CSS. Light and dark themes follow the visitor's system setting.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm test         # content checks
npm run build    # static site in ./out
```

## Edit content

All copy lives in `src/content/`, so changing text doesn't require touching components.

| File | Contents |
|---|---|
| `site.mjs` | Name, headline, intro, links, navigation, skills, experience |
| `projects.mjs` | Projects. `featured: true` puts one on the homepage (first six, in order). Optional `images` adds a gallery to its page. |
| `blog.mjs` | Posts, with sections of paragraphs |

Images go in `public/images/`. Project screenshots go in `public/images/projects/`.

## Structure

```
src/components/        Layout, nav, footer, cards, lists, contact form
src/components/home/   Homepage sections
src/pages/             /, /projects, /projects/[slug], /blog, /blog/[slug]
src/lib/               Content helpers, types, date formatting
tests/                 Content integrity checks (npm test)
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `./out` to GitHub Pages.

The contact form sends mail through EmailJS from the browser. Restrict allowed origins for the public key in the EmailJS dashboard.
