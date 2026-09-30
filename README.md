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
| `blog.mjs` | Posts, with sections of paragraphs, lists and attributed quotes |

Images go in `public/images/`. Project screenshots go in `public/images/projects/`, post images in `public/images/blog/`.

Every post needs a 1200×630 social preview at `public/images/og/<slug>.jpg`; `npm test` fails without one.

## Structure

```
src/components/        Layout, nav, footer, cards, lists, contact form, analytics
src/components/home/   Homepage sections
src/pages/             /, /projects, /projects/[slug], /blog, /blog/[slug], 404
src/lib/               Content helpers, types, date formatting
scripts/               write-feeds.mjs: sitemap.xml, robots.txt and feed.xml after each build
tests/                 Content integrity checks (npm test)
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `./out` to GitHub Pages.

The contact form sends mail through EmailJS from the browser. Restrict allowed origins for the public key in the EmailJS dashboard. If the form reports errors, check the Gmail service connection under Email Services there.

Visit counts use [GoatCounter](https://www.goatcounter.com) (no cookies). Set `goatcounter` in `site.mjs` to your site code to turn it on; leave it empty to keep it off.
