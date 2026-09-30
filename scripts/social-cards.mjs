// Renders the 1200x630 link-preview images with a local Chrome or Edge:
//   public/images/og-card.png          site card (headline)
//   public/images/og/<slug>.jpg        one card per post (title + post image)
//
// Usage: npm run cards            all cards
//        npm run cards -- <slug>   one post
// Set CHROME_PATH if Chrome/Edge is not in a standard location. Needs network
// access for the Inter font. Re-run after changing site.url, the headline or
// a post's title, date, read time or image.
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { posts } from '../src/content/blog.mjs'
import { site } from '../src/content/site.mjs'

const root = fileURLToPath(new URL('..', import.meta.url))
const publicDir = join(root, 'public')
const host = new URL(site.url).host
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const formatDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${MONTHS[m - 1]} ${y}`
}
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const fileUrl = (publicPath) => pathToFileURL(join(publicDir, publicPath)).href

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/microsoft-edge',
  ]
  const found = candidates.find((path) => path && existsSync(path))
  if (!found) throw new Error('No Chrome or Edge found. Set CHROME_PATH.')
  return found
}

const baseCss = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 1200px; height: 630px; overflow: hidden; background: #fff; }
  body { font-family: 'Inter', sans-serif; color: rgb(17 17 19); }
  .who { display: flex; align-items: center; gap: 22px; }
  .who img { width: 76px; height: 76px; border-radius: 50%; object-fit: cover; }
  .name { font-size: 26px; font-weight: 600; letter-spacing: -0.01em; }
  .role { margin-top: 6px; font-size: 20px; color: rgb(82 82 91); }
  .foot { border-top: 2px solid rgb(228 228 231); font-size: 21px; color: rgb(82 82 91); }
`

const page = (css, body) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=block" rel="stylesheet">
<style>${baseCss}${css}</style></head><body>${body}</body></html>`

const who = `<div class="who"><img src="${fileUrl('/images/avatar.jpg')}" alt="">
  <div><div class="name">${esc(site.name)}</div><div class="role">${esc(site.role)}</div></div></div>`

function siteCard() {
  const css = `
    body { padding: 84px 96px 0; }
    h1 { margin-top: 92px; max-width: 760px; font-size: 76px; line-height: 1.06; font-weight: 700; letter-spacing: -0.035em; text-wrap: balance; }
    .foot { position: absolute; left: 96px; right: 96px; bottom: 72px; padding-top: 26px; display: flex; justify-content: space-between; }
    .dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: rgb(29 78 216); margin-right: 14px; vertical-align: middle; }`
  const body = `${who}<h1>${esc(site.headline)}</h1>
    <div class="foot"><span><span class="dot"></span>Projects · Writing · Contact</span><span>${esc(host)}</span></div>`
  return page(css, body)
}

function postCard(post) {
  const css = `
    body { display: flex; }
    .text { width: 780px; padding: 84px 64px 64px 96px; display: flex; flex-direction: column; }
    .kicker { margin-top: 58px; font-size: 21px; font-weight: 500; color: rgb(29 78 216); letter-spacing: 0.01em; }
    h1 { margin-top: 14px; font-size: 62px; line-height: 1.08; font-weight: 700; letter-spacing: -0.03em; text-wrap: balance; }
    .foot { margin-top: auto; padding-top: 24px; }
    .art { width: 420px; height: 630px; background: rgb(250 250 250); }
    .art img { width: 100%; height: 100%; object-fit: cover; object-position: 50% ${post.image?.cardFocus ?? '35%'}; display: block; }`
  const art = post.image ? `<div class="art"><img src="${fileUrl(post.image.src)}" alt=""></div>` : ''
  const textWidth = post.image ? '' : ' style="width:1200px"'
  const body = `<div class="text"${textWidth}>${who}
      <div class="kicker">Essay · ${formatDate(post.date)} · ${esc(post.readTime)}</div>
      <h1>${esc(post.title)}</h1>
      <div class="foot">${esc(host)}/blog</div></div>${art}`
  return page(css, body)
}

function render(browser, html, outFile, workDir) {
  const htmlFile = join(workDir, 'card.html')
  writeFileSync(htmlFile, html)
  const result = spawnSync(
    browser,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--allow-file-access-from-files',
      `--user-data-dir=${join(workDir, 'profile')}`,
      '--window-size=1200,630',
      '--virtual-time-budget=8000',
      `--screenshot=${outFile}`,
      pathToFileURL(htmlFile).href,
    ],
    { stdio: 'ignore', timeout: 60_000 }
  )
  if (result.status !== 0 || !existsSync(outFile) || statSync(outFile).size === 0) {
    throw new Error(`Rendering ${outFile} failed`)
  }
  console.log(`social-cards: ${outFile.replace(root, '')} (${Math.round(statSync(outFile).size / 1024)} KB)`)
}

const only = process.argv[2]
const selected = only ? posts.filter((post) => post.slug === only) : posts
if (only && selected.length === 0) throw new Error(`No post with slug "${only}"`)

const browser = findBrowser()
const workDir = mkdtempSync(join(tmpdir(), 'social-cards-'))
try {
  mkdirSync(join(publicDir, 'images', 'og'), { recursive: true })
  if (!only) render(browser, siteCard(), join(publicDir, 'images', 'og-card.png'), workDir)
  for (const post of selected) {
    render(browser, postCard(post), join(publicDir, 'images', 'og', `${post.slug}.jpg`), workDir)
  }
} finally {
  rmSync(workDir, { recursive: true, force: true })
}
