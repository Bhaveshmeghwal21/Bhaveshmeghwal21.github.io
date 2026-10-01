# Bhavesh Meghwal · Portfolio

Personal site at [bhaveshmeghwal.me](https://bhaveshmeghwal.me): projects, writing and contact.

Next.js 14 (pages router, static export), TypeScript and Tailwind CSS. Light and dark themes: the nav toggle sets one and remembers it; until then the site follows the visitor's system setting.

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

Every post needs a 1200×630 social preview at `public/images/og/<slug>.jpg`; `npm test` fails without one. Generate it with `npm run cards -- <slug>` (or `npm run cards` for all cards, including the site card `public/images/og-card.png`). It uses a local Chrome or Edge; set `CHROME_PATH` if it isn't found. Re-run it after changing a post's title, date, read time or image, the headline, or `site.url`.

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

## Custom domain

The site is served at `bhaveshmeghwal.me` (registered at Namecheap; HTTPS enforced, certificate managed by GitHub). To change or re-create the setup:

1. At the registrar, point the domain at GitHub Pages: `A` records for the apex to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, and a `CNAME` for `www` to `bhaveshmeghwal21.github.io`.
2. Set the domain in the repo's Settings → Pages (or `gh api -X PUT repos/Bhaveshmeghwal21/Bhaveshmeghwal21.github.io/pages -f cname=example.com`) and turn on Enforce HTTPS once the certificate is issued. Deployments from Actions use this setting; the root `CNAME` file is only a record of it.
3. Change `url` in `site.mjs`, run `npm run cards`, and push. Canonical links, the sitemap, the feed and the social cards all follow `site.url`. The github.io address redirects to the custom domain automatically.
