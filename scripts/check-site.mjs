// Served-site checks (spec 14.2). One mode: --base-url. Run against `next start` before asking for
// the deploy OK, and against production after each deploy. Never reads .next/.
// Usage: PRIVATE_TERMS_FILE=<private list> node scripts/check-site.mjs --base-url http://localhost:3000 [--structural-only]
import { parse } from 'node-html-parser'
import { findTerms, loadTerms } from './lib/terms.mjs'

const argv = process.argv.slice(2)
const baseUrl = argv[argv.indexOf('--base-url') + 1]
if (!argv.includes('--base-url') || !baseUrl) {
  console.error('Usage: node scripts/check-site.mjs --base-url <url> [--terms <file> | --structural-only]')
  process.exit(2)
}
const terms = loadTerms(argv)
const isProduction = baseUrl.startsWith('https://steephen-resurreccion.vercel.app')
const SITE_URL = 'https://steephen-resurreccion.vercel.app'
const failures = []
const fail = (area, where, detail) => failures.push(`FAIL ${area} ${where}: ${detail}`)

// The oracle: written independently of the content files.
const PAGES = {
  '/': {
    title: 'Steephen Resurreccion · Full-stack developer',
    description: "I'm a full-stack developer (web, mobile and ML, end to end) and a CS senior graduating in 2027. Lipa City, Philippines · UTC+8 · open to remote and relocation",
    current: {},
  },
  '/noelagritv': {
    title: 'NoelAgriTV · Steephen Resurreccion',
    description: "A bilingual (Filipino and English) storefront for an agricultural influencer's shop, with cash-on-delivery checkout and order lookup, replacing manual order-taking over Messenger.",
    current: { Work: 'true' },
  },
  '/las-pos': {
    title: 'Lipa Agricultural Supply POS · Steephen Resurreccion',
    description: "I'm building an offline-first point-of-sale in Kotlin for all 5 branches of Lipa Agricultural Supply, and its sync never counts a sale twice.",
    current: { Work: 'true' },
  },
  '/lipaaction': {
    title: 'LipaAction (undergraduate thesis) · Steephen Resurreccion',
    description: 'LipaAction, my undergraduate thesis: an ML-assisted platform for escalating barangay (village) incident reports to 5 city agencies. I lead the technical build.',
    current: { Work: 'true' },
  },
  '/iris': {
    title: 'IRIS (team project) · Steephen Resurreccion',
    description: 'IRIS, a team project: a facial-recognition CCTV camera on a Raspberry Pi 4B. I built its camera and recognition pipeline.',
    current: { Work: 'true' },
  },
  '/about': {
    title: 'About · Steephen Resurreccion',
    description: "I'm a full-stack developer and CS senior at De La Salle Lipa in the Philippines, graduating in 2027.",
    current: { About: 'page' },
  },
}
const PROBE = '/this-page-does-not-exist'
const PROBE_HEAD = { title: 'Page not found · Steephen Resurreccion', description: "There's no page at this address. You can see my work or read about me." }

// External links: href -> expected accessible names (visible label + hidden text).
const EXTERNAL = {
  'https://www.linkedin.com/in/steephen-resurreccion/': ['LinkedIn (opens in new tab)'],
  'https://github.com/SteephenResurreccion': ['GitHub (opens in new tab)'],
  'https://noelagritv.com': ['noelagritv.com (opens in new tab)'],
  'https://github.com/SteephenResurreccion/noel-agritv': ['Code on GitHub for NoelAgriTV (opens in new tab)'],
  'https://github.com/SteephenResurreccion/XiaoLongBaoLipa': ['Code on GitHub for Xiao Long Bao Lipa (opens in new tab)'],
  'https://github.com/ShanPla/IRIS-Mobile-Frontend': ['App code on GitHub for IRIS (opens in new tab)'],
}
const IMAGES = {
  storefront: { widths: ['640w', '1280w'], sizes: '(min-width: 672px) 638px, calc(100vw - 34px)', loading: 'eager', priority: true },
  checkout: { widths: ['326w', '652w'], sizes: '(min-width: 768px) 302px, 326px', loading: 'lazy' },
  lookup: { widths: ['326w', '652w'], sizes: '(min-width: 768px) 302px, 326px', loading: 'lazy' },
}
const HEADERS = {
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'camera=(), microphone=(), geolocation=()',
  'x-frame-options': 'DENY',
}
const VAULT_PATHS = ['UserPastedData', 'docs/design/', 'docs/raw/', 'docs/wiki/', 'Desktop\\New folder', 'Desktop/New folder']
const JSONLD_FORBIDDEN = ['telephone', 'birthDate', 'address', 'image', 'alumniOf']

const fetched = new Map()
async function get(path) {
  const response = await fetch(new URL(path, baseUrl), { redirect: 'manual' })
  const body = await response.text()
  fetched.set(path, body)
  return { response, body }
}
const text = (node) => node.textContent.replace(/\s+/g, ' ').trim()
const metaContent = (root, selector) => root.querySelector(selector)?.getAttribute('content') ?? null
const assetPaths = new Set()

for (const [path, expected] of Object.entries(PAGES)) {
  const { response, body } = await get(path)
  if (response.status !== 200) fail('HTTP', path, `status ${response.status}, expected 200`)
  const root = parse(body)

  // Head
  if (text(root.querySelector('title') ?? parse('')) !== expected.title) fail('HEAD', path, `title is "${root.querySelector('title')?.text}"`)
  if (metaContent(root, 'meta[name="description"]') !== expected.description) fail('HEAD', path, 'meta description differs from the oracle')
  if (metaContent(root, 'meta[property="og:title"]') !== expected.title) fail('HEAD', path, 'og:title differs')
  if (metaContent(root, 'meta[property="og:description"]') !== expected.description) fail('HEAD', path, 'og:description differs')
  const want = new URL(path, SITE_URL).href
  const canonical = root.querySelector('link[rel="canonical"]')?.getAttribute('href')
  if (!canonical || new URL(canonical).href !== want) fail('HEAD', path, `canonical "${canonical}" should be ${want}`)
  const ogUrl = metaContent(root, 'meta[property="og:url"]')
  if (!ogUrl || new URL(ogUrl).href !== want) fail('HEAD', path, `og:url "${ogUrl}" should be ${want}`)

  // Headers
  for (const [name, value] of Object.entries(HEADERS)) {
    if (response.headers.get(name) !== value) fail('HEADERS', path, `${name} is "${response.headers.get(name)}"`)
  }
  if (!response.headers.get('content-security-policy')?.includes("frame-ancestors 'none'")) fail('HEADERS', path, 'CSP missing or incomplete')
  if (isProduction && !response.headers.get('strict-transport-security')) fail('HEADERS', path, 'HSTS missing on production')

  // Links
  for (const a of root.querySelectorAll('a[href]')) {
    const href = a.getAttribute('href')
    if (/\.pdf($|\?)/i.test(href)) fail('LINKS', path, `PDF link ${href}`)
    if (!/^https?:/.test(href)) continue
    const names = EXTERNAL[href]
    if (!names) {
      fail('LINKS', path, `external href outside the allowlist: ${href}`)
      continue
    }
    if (a.getAttribute('target') !== '_blank' || a.getAttribute('rel') !== 'noopener noreferrer') fail('LINKS', path, `${href} lacks target/rel`)
    if (!names.includes(text(a))) fail('LINKS', path, `accessible name "${text(a)}" for ${href}`)
  }

  // Navigation
  const nav = root.querySelector('nav[aria-label="Primary"]')
  for (const label of ['Work', 'About']) {
    const link = nav?.querySelectorAll('a').find((a) => text(a) === label)
    const current = link?.getAttribute('aria-current') ?? undefined
    if (current !== expected.current[label]) fail('NAV', path, `${label} aria-current is "${current}", expected "${expected.current[label]}"`)
  }
  const workHref = nav?.querySelectorAll('a').find((a) => text(a) === 'Work')?.getAttribute('href')
  if (workHref !== (path === '/' ? '#work' : '/#work')) fail('NAV', path, `Work href "${workHref}"`)
  if (!root.querySelector('footer#contact')) fail('NAV', path, 'footer#contact missing')
  if (path === '/' && !root.querySelector('#work')) fail('NAV', path, 'id="work" missing')
  if (Object.values(expected.current).includes('true')) {
    const back = root.querySelector('main > a')
    if (back?.getAttribute('href') !== '/#work' || text(back) !== 'All work') fail('NAV', path, 'back link missing or wrong')
  }

  // Images
  const imgs = root.querySelectorAll('img')
  if (path !== '/noelagritv' && imgs.length) fail('IMAGES', path, `${imgs.length} <img> on a page that allows none`)
  for (const img of imgs) {
    const src = img.getAttribute('src')
    const key = Object.keys(IMAGES).find((name) => src.includes(`/${name}-`))
    if (!key) {
      fail('IMAGES', path, `image outside the allowlist: ${src}`)
      continue
    }
    const spec = IMAGES[key]
    const srcset = img.getAttribute('srcset') ?? ''
    for (const w of spec.widths) if (!srcset.includes(w)) fail('IMAGES', path, `${key} srcset lacks ${w}`)
    if (img.getAttribute('sizes') !== spec.sizes) fail('IMAGES', path, `${key} sizes "${img.getAttribute('sizes')}"`)
    if (img.getAttribute('loading') !== spec.loading) fail('IMAGES', path, `${key} loading "${img.getAttribute('loading')}"`)
    if (spec.priority && img.getAttribute('fetchpriority') !== 'high') fail('IMAGES', path, `${key} lacks fetchpriority="high"`)
    if (!img.getAttribute('width') || !img.getAttribute('height')) fail('IMAGES', path, `${key} lacks width/height`)
    if (!img.getAttribute('alt')) fail('IMAGES', path, `${key} lacks alt text`)
  }

  // JSON-LD
  for (const script of root.querySelectorAll('script[type="application/ld+json"]')) {
    let data
    try {
      data = JSON.parse(script.textContent)
    } catch {
      fail('JSONLD', path, 'does not parse')
      continue
    }
    const walk = (node) => {
      if (Array.isArray(node)) return node.forEach(walk)
      if (!node || typeof node !== 'object') return
      for (const key of JSONLD_FORBIDDEN) if (key in node) fail('JSONLD', path, `forbidden property "${key}"`)
      for (const key of ['@id', 'url']) if (typeof node[key] === 'string' && !/^https:\/\//.test(node[key])) fail('JSONLD', path, `${key} "${node[key]}" is not absolute`)
      if (node['@type'] === 'CreativeWork' && node.creator && node.name === 'NoelAgriTV') fail('JSONLD', path, 'CreativeWork named "NoelAgriTV" with a creator')
      Object.values(node).forEach(walk)
    }
    walk(data)
  }

  // SVG and lists
  for (const svg of root.querySelectorAll('svg')) {
    if (svg.getAttribute('aria-hidden') !== 'true') fail('SVG', path, 'svg without aria-hidden="true"')
    if (svg.querySelector('[id]')) fail('SVG', path, 'id inside an svg')
  }
  for (const ul of root.querySelectorAll('main ul')) if (ul.getAttribute('role') !== 'list') fail('LISTS', path, 'ul without role="list"')

  for (const node of root.querySelectorAll('script[src], link[rel="stylesheet"], link[rel="preload"]')) {
    const ref = node.getAttribute('src') ?? node.getAttribute('href')
    if (ref?.startsWith('/')) assetPaths.add(ref.split('?')[0])
  }
}

// The 404 probe
{
  const { response, body } = await get(PROBE)
  const root = parse(body)
  if (response.status !== 404) fail('HTTP', PROBE, `status ${response.status}, expected 404`)
  if (!metaContent(root, 'meta[name="robots"]')?.includes('noindex')) fail('HEAD', PROBE, 'missing noindex')
  if (text(root.querySelector('title') ?? parse('')) !== PROBE_HEAD.title) fail('HEAD', PROBE, 'title differs')
  if (metaContent(root, 'meta[name="description"]') !== PROBE_HEAD.description) fail('HEAD', PROBE, 'description differs')
  if (root.querySelector('link[rel="canonical"]') || root.querySelector('meta[property^="og:"]')) fail('HEAD', PROBE, 'canonical or og: tag on the 404')
  const myWork = root.querySelectorAll('main a').find((a) => text(a) === 'my work')
  if (myWork?.getAttribute('href') !== '/#work') fail('NAV', PROBE, '"my work" should link to /#work')
}

// Crawling
{
  const { response, body } = await get('/sitemap.xml')
  if (response.status !== 200) fail('HTTP', '/sitemap.xml', `status ${response.status}`)
  const locs = [...body.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]).sort()
  const want = Object.keys(PAGES).map((p) => new URL(p, SITE_URL).href).sort()
  if (JSON.stringify(locs) !== JSON.stringify(want)) fail('CRAWL', '/sitemap.xml', `lists ${locs.join(', ')}`)
  const robots = await get('/robots.txt')
  if (robots.response.status !== 200) fail('HTTP', '/robots.txt', `status ${robots.response.status}`)
  if (!/User-Agent: \*\s+Allow: \//i.test(robots.body) || !robots.body.includes(`${SITE_URL}/sitemap.xml`)) fail('CRAWL', '/robots.txt', 'must allow all and point to the sitemap')
}

// Assets (JS, CSS) are fetched so group B and the vault-path check cover them too.
for (const asset of assetPaths) await get(asset)

// Terms and paths over everything fetched
for (const [path, body] of fetched) {
  for (const vaultPath of VAULT_PATHS) if (body.includes(vaultPath)) fail('PATHS', path, `contains vault path "${vaultPath}"`)
  if (!terms) continue
  for (const hit of findTerms(body, terms.B, terms.B_allow)) fail('B', path, `"${hit.excerpt}"`)
  if (!(path in PAGES) && path !== PROBE) continue
  const visible = parse(body).querySelector('body')
  for (const node of visible.querySelectorAll('script, style')) node.remove()
  const pageText = text(visible)
  for (const [group, entries] of Object.entries(terms.global)) {
    if (group === 'A8' && path === '/about') continue
    for (const hit of findTerms(pageText, entries, terms.B_allow)) fail(group, path, `"${hit.excerpt}"`)
  }
  for (const [project, group] of Object.entries(terms.projects)) {
    if (!group.routes.includes(path)) continue
    for (const hit of findTerms(pageText, group.terms)) fail(`C:${project}`, path, `"${hit.excerpt}"`)
  }
}

if (failures.length) {
  console.error(failures.join('\n'))
  console.error(`\ncheck-site: ${failures.length} failure(s) against ${baseUrl}`)
  process.exit(1)
}
console.log(`check-site: OK against ${baseUrl} (${fetched.size} files fetched${terms === null ? ', term groups skipped' : ''})`)
