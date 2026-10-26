import type { CaseStudy, Decision, FeaturedEntry } from '../types'

// No label, no screenshot, no code link, no hosts, endpoints, schemas or file paths (content-rules).
const stack = ['Kotlin', 'Jetpack Compose', 'Ktor', 'PostgreSQL'] as const

export const lasPosHome: FeaturedEntry = {
  title: { name: 'Lipa Agricultural Supply POS' },
  path: '/las-pos',
  dates: 'Apr 2026 – Present',
  status: ['Still building; the pilot is planned for Feb 2027.'],
  body: [
    'An offline-first point-of-sale for all 5 branches, to replace a failing subscription system. Some branches just have inconsistent internet connections, so the Kotlin Android app puts every sale in a waiting list as pending and sends it to a Ktor/PostgreSQL server whenever the internet is up. Each sale has its own ID, so a retried upload never counts a sale twice. As of Sep 2026 it has 800+ passing tests.',
  ],
  stack,
}

export const lasPos: CaseStudy = {
  slug: 'las-pos',
  path: '/las-pos',
  title: { name: 'Lipa Agricultural Supply POS' },
  seo: {
    title: 'Lipa Agricultural Supply POS · Steephen Resurreccion',
    description:
      "I'm building an offline-first point-of-sale in Kotlin for all 5 branches of Lipa Agricultural Supply, and its sync never counts a sale twice.",
  },
  dek: 'An offline-first point-of-sale for all 5 branches, to replace a failing subscription system.',
  status: ['Still building; the pilot is planned for Feb 2027.'],
  meta: { dates: 'Apr 2026 – Present', items: [['Freelance'], ['800+ passing tests as of Sep 2026']] },
  stack,
  opening: [
    [
      "This needed more first-hand or workflow experience of the actual business than the actual POS system development itself. There are a lot of quirks that the business got used to, which they weren't willing to unlearn, so we had to change the system to fit the business's needs.",
    ],
    ["There were some race conditions that happened, multiple times really, which led to some bugs I didn't expect."],
  ],
  whereItIsNow: {
    paragraphs: [
      ["I'm still building it, and the pilot is planned for Feb 2027."],
      ["The code is private, so there's no link."],
    ],
  },
  structuredData: { name: 'Lipa Agricultural Supply POS', role: 'creator' },
}

export const lasPosDecisions = {
  offlineFirst: {
    heading: 'Offline-first, as a native Android app',
    paragraphs: [
      [
        "It's offline-first, since there are branches that just have inconsistent internet connections. It's a native Kotlin app since, again, we needed it to be an application so we can make sales offline. Every sale is saved on the tablet first and goes into a waiting list as pending, then it's sent to the server whenever the internet is up.",
      ],
    ],
  },
  uniqueEventId: {
    heading: 'A unique event ID for every sale',
    paragraphs: [
      [
        "I designed the sync so every sale gets its own ID on the tablet. If the tablet uploads a sale and the connection drops before the server's reply comes back, the tablet doesn't know the upload worked, so it sends the sale again. The server has already stored that ID, so it ignores the repeat.",
      ],
    ],
  },
  stockChanges: {
    heading: 'Stock changes instead of totals',
    paragraphs: [
      [
        'Stock is updated by the change each sale makes, such as −2, rather than overwritten with a new total. Say two tablets both start at 20 bags and each sells 2 while offline. If each sent its new total, both would say 18, and one sale would vanish from the stock count. Each sends −2 instead, so the server ends at 16, which is right.',
      ],
    ],
  },
} satisfies Record<string, Decision>

/** The sync diagram's copy. Geometry lives in components/las-pos/sync-diagram-geometry.ts. */
export const syncDiagram = {
  lanes: ['Tablet', 'Server'],
  note1: ['Sale saved offline', 'with a unique event ID'],
  message1: 'Back online: upload the sale',
  note2: ['Applies the sale:', 'stock −2, ID recorded'],
  message2: 'Reply lost: connection drops',
  message3: 'Retry with the same ID',
  note3: ['Known ID:', 'not applied again'],
  textAlternative:
    "A sequence diagram with two lanes, Tablet and Server. The tablet saves a sale while offline and gives it a unique event ID. When the tablet is back online, it uploads the sale; the server applies it, lowering stock by 2, and records the ID. The server's reply is lost when the connection drops, so the tablet retries with the same event ID. The server recognizes the ID and does not apply the sale again.",
  caption: 'A retried upload never counts a sale twice.',
} as const

export type SyncDiagramCopy = typeof syncDiagram
