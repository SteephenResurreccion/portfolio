// Source checks (spec 13.3, 14.2). Runs as the pre-commit hook (--staged), the commit-msg hook
// (--commit-msg <file>) and before every deploy (no mode flag: every tracked and working file).
// Usage: PRIVATE_TERMS_FILE=<private list> node scripts/check-source.mjs [--staged | --commit-msg <file>] [--terms <file>] [--structural-only]
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { findTerms, lineOf, loadTerms } from './lib/terms.mjs'

const argv = process.argv.slice(2)
const failures = []
const fail = (code, where, detail) => failures.push(`FAIL ${code} ${where} ${detail}`)

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).split('\n').filter(Boolean)

// ---- commit-msg mode ------------------------------------------------------------------------
if (argv.includes('--commit-msg')) {
  const file = argv[argv.indexOf('--commit-msg') + 1]
  const terms = loadTerms(argv)
  const message = readFileSync(file, 'utf8')
    .split('\n')
    .filter((line) => !line.startsWith('#'))
    .join('\n')
  message.split('\n').forEach((line, i) => {
    if (/^Co-Authored-By:.*(claude|noreply@anthropic\.com)/i.test(line)) {
      fail('TRAILER', `commit message line ${i + 1}`, 'Commit message carries a Co-Authored-By: Claude line. This repo takes no AI trailers; remove the line.')
    }
    if (/claude\.ai\/|^Claude-Session:/i.test(line)) {
      fail('SESSION', `commit message line ${i + 1}`, 'Commit message links a claude.ai session. Public history is permanent; remove the line.')
    }
  })
  if (terms) {
    for (const hit of findTerms(message, terms.B, terms.B_allow)) fail('B', `commit message line ${lineOf(message, hit.index)}`, `"${hit.excerpt}"`)
    for (const hit of findTerms(message, terms.global.A8)) fail('A8', `commit message line ${lineOf(message, hit.index)}`, `"${hit.excerpt}"`)
  }
  report(terms === null)
}

// ---- file modes -----------------------------------------------------------------------------
const staged = argv.includes('--staged')
const terms = loadTerms(argv)

const listFiles = (dir) =>
  existsSync(dir)
    ? readdirSync(dir).flatMap((name) => {
        const path = join(dir, name).replaceAll('\\', '/')
        return statSync(path).isDirectory() ? listFiles(path) : [path]
      })
    : []

const candidateFiles = staged
  ? git('diff', '--cached', '--name-only', '--diff-filter=ACMR')
  : [...new Set([...git('ls-files'), ...['app', 'components', 'content', 'lib', 'scripts'].flatMap(listFiles)])]

// Repo hygiene: nothing private, no stray binaries.
const tracked = new Set([...git('ls-files'), ...(staged ? candidateFiles : [])])
const BINARY_ALLOWLIST = new Set(
  ['storefront-640', 'storefront-1280', 'checkout-326', 'checkout-652', 'lookup-326', 'lookup-652'].map((n) => `assets/noelagritv/${n}.webp`),
)
for (const path of tracked) {
  if (/^(docs|UserPastedData|\.superpowers)\//.test(path)) fail('HYGIENE', path, 'private vault path is tracked or staged')
  if (/\.pdf$|(^|\/)\.env|\.stackdump$|(^|\/)CLAUDE\.md$|(^|\/)AGENTS\.md$/i.test(path)) fail('HYGIENE', path, 'file type never allowed in the public repo')
  if (/\.(png|jpe?g|gif|webp|avif|svg|ico|pdf)$/i.test(path) && !BINARY_ALLOWLIST.has(path)) fail('HYGIENE', path, 'binary outside the asset allowlist')
}

const textFiles = candidateFiles.filter((path) => existsSync(path) && /\.(tsx?|mjs|css|md|json)$/.test(path) && path !== 'package-lock.json')
const COPY_FILES = (path) => path.startsWith('content/') || path === 'README.md'

for (const path of textFiles) {
  const text = readFileSync(path, 'utf8')
  const at = (index) => `${path}:${lineOf(text, index)}`
  const each = (regex, code, detail) => {
    for (const m of text.matchAll(regex)) fail(code, at(m.index), detail(m))
  }
  if (/^(app|components)\//.test(path)) each(/['"]use client['"]/g, 'CLIENT', () => 'client components are not allowed (spec 2.2)')
  if (!COPY_FILES(path)) continue
  each(/—/g, 'A3', () => 'em dash; use a colon, comma or full stop')
  each(/[‘’“”]/g, 'QUOTES', () => 'curly quote; apostrophes and quotes stay straight')
  each(/ /g, 'NBSP', () => 'literal no-break space in content; components add the ones the design needs')
  each(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4} ?- ?(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Present)/g, 'DASH', (m) => `"${m[0]}" needs an en dash (U+2013)`)
  each(/(?<![\w−])-2\b/g, 'MINUS', () => '"-2" needs the minus sign U+2212')
  each(/\[(NEW|CV[^\]]*|RULE|Q\d+|PENDING[^\]]*|BUILD|GAP|PROPOSED[^\]]*)\]/g, 'TAG', (m) => `copy-deck tag ${m[0]} left in the copy`)
  each(/\.pdf\b/gi, 'A5', () => 'PDF reference')
  each(/download cv/gi, 'A5', () => '"Download CV"')
  each(/\+63|\b09\d{9}\b/g, 'A5', (m) => `phone-number pattern "${m[0]}"`)

  if (!terms) continue
  const isAbout = path === 'content/about.ts'
  for (const [group, entries] of Object.entries(terms.global)) {
    if (group === 'A8' && isAbout) continue
    for (const hit of findTerms(text, entries, terms.B_allow)) fail(group, at(hit.index), `"${hit.excerpt}"`)
  }
  for (const hit of findTerms(text, terms.B, terms.B_allow)) fail('B', at(hit.index), `"${hit.excerpt}"`)
  for (const [project, group] of Object.entries(terms.projects)) {
    if (!group.files.includes(path)) continue
    for (const hit of findTerms(text, group.terms)) fail(`C:${project}`, at(hit.index), `"${hit.excerpt}"`)
  }
}

// Group B also covers every other tracked text file (scripts, config, README).
if (terms) {
  for (const path of textFiles.filter((p) => !COPY_FILES(p))) {
    const text = readFileSync(path, 'utf8')
    for (const hit of findTerms(text, terms.B, terms.B_allow)) fail('B', `${path}:${lineOf(text, hit.index)}`, `"${hit.excerpt}"`)
  }
}

report(terms === null)

function report(termsSkipped) {
  if (failures.length) {
    console.error(failures.join('\n'))
    console.error(`\ncheck-source: ${failures.length} failure(s)`)
    process.exit(1)
  }
  console.log(`check-source: OK${termsSkipped ? ' (structural only, term groups skipped)' : ''}`)
  process.exit(0)
}
