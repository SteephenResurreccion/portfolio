// Shared by check-source and check-site. The term list is private and lives outside this repo;
// this module only knows how to load and match it.
import { readFileSync } from 'node:fs'

export const MISSING_TERMS_MESSAGE =
  'Private term list not provided. Set PRIVATE_TERMS_FILE or pass --terms. Use --structural-only to skip the term groups deliberately.'

/** Returns the parsed list, null when --structural-only, or exits with MISSING_TERMS_MESSAGE. */
export function loadTerms(argv) {
  if (argv.includes('--structural-only')) return null
  const flagIndex = argv.indexOf('--terms')
  const file = flagIndex !== -1 ? argv[flagIndex + 1] : process.env.PRIVATE_TERMS_FILE
  if (!file) {
    console.error(MISSING_TERMS_MESSAGE)
    process.exit(2)
  }
  return JSON.parse(readFileSync(file, 'utf8'))
}

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** One entry: a plain string (case-insensitive whole word), {cs} (case-sensitive word) or {re}. */
export function compileTerm(entry) {
  if (typeof entry === 'string') {
    return { label: entry, regex: new RegExp(`(?<![\\w])${escapeRegExp(entry)}(?![\\w])`, 'giu') }
  }
  if (entry.cs) return { label: entry.cs, regex: new RegExp(`(?<![\\w])${escapeRegExp(entry.cs)}(?![\\w])`, 'gu') }
  if (entry.re) return { label: entry.re, regex: new RegExp(entry.re, 'giu') }
  throw new Error(`Unknown term entry: ${JSON.stringify(entry)}`)
}

/** All matches of the given entries in text, as { label, index, excerpt }. */
export function findTerms(text, entries, allow = []) {
  let haystack = text
  for (const allowed of allow) haystack = haystack.split(allowed).join(' '.repeat(allowed.length))
  const hits = []
  for (const entry of entries) {
    const { label, regex } = compileTerm(entry)
    for (const match of haystack.matchAll(regex)) {
      const start = Math.max(0, match.index - 30)
      hits.push({ label, index: match.index, excerpt: haystack.slice(start, match.index + match[0].length + 30).replace(/\s+/g, ' ') })
    }
  }
  return hits
}

export const lineOf = (text, index) => text.slice(0, index).split('\n').length
