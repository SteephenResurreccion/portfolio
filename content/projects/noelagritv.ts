import storefront640 from '@/assets/noelagritv/storefront-640.webp'
import storefront1280 from '@/assets/noelagritv/storefront-1280.webp'
import checkout326 from '@/assets/noelagritv/checkout-326.webp'
import checkout652 from '@/assets/noelagritv/checkout-652.webp'
import lookup326 from '@/assets/noelagritv/lookup-326.webp'
import lookup652 from '@/assets/noelagritv/lookup-652.webp'
import { EXTERNAL } from '../links'
import type { CaseStudy, Decision, FeaturedEntry, ImageAsset, Inline } from '../types'

const siteLink: Inline = { kind: 'external', text: 'noelagritv.com', href: EXTERNAL.noelagritvSite }
const codeLink: Inline = {
  kind: 'external',
  text: 'Code on GitHub',
  href: EXTERNAL.noelagritvRepo,
  srContext: 'for NoelAgriTV',
}
const stack = ['Next.js', 'Zod', 'Cloudflare Turnstile', 'Google Sheets', 'Google OAuth'] as const
const dek =
  "A bilingual (Filipino and English) storefront for an agricultural influencer's shop, with cash-on-delivery checkout and order lookup, replacing manual order-taking over Messenger."

export const noelagritvHome: FeaturedEntry = {
  title: { name: 'NoelAgriTV' },
  path: '/noelagritv',
  dates: 'Feb 2026 – Jun 2026',
  status: ['Live at ', siteLink, ', taking orders since May 2026.'],
  body: [
    "It was just supposed to be a simple website showcasing a client's products, their store and the background of the owner. It became a bilingual storefront with cash-on-delivery checkout and order lookup, replacing manual order-taking over Messenger, with every order going into the Google Sheet the staff work from. ",
    codeLink,
  ],
  stack,
}

export const noelagritv: CaseStudy = {
  slug: 'noelagritv',
  path: '/noelagritv',
  title: { name: 'NoelAgriTV' },
  seo: { title: 'NoelAgriTV · Steephen Resurreccion', description: dek },
  dek,
  status: ['Live at ', siteLink, ', taking orders since May 2026.'],
  meta: { dates: 'Feb 2026 – Jun 2026', items: [['Freelance, for an outside client'], [codeLink]] },
  stack,
  opening: [
    [
      'Before the site, NoelAgriTV took orders by hand over Messenger. The initial plan for the website was just supposed to be a simple website showcasing their products, their store and the background of the owner. The products were not meant to be sold on that website; it was just information.',
    ],
    [
      'So every time I finished something, a new feature was requested by the client, such as being able to customize the content on the website (the products they want to show, the videos to be shown), as well as being able to see the orders straight from a Google Sheet, so that they can log and keep track of orders.',
    ],
    [
      'I already expected that new features would be requested. The problem lay in the fact that requirements kept changing: we kept undoing features, then re-adding them.',
    ],
  ],
  whereItIsNow: {
    paragraphs: [
      [
        'Live at noelagritv.com and taking orders since May 2026. I built an owner-only admin behind Google sign-in, so the client can customize the products and videos the site shows.',
      ],
    ],
    links: [siteLink, codeLink],
  },
  structuredData: { name: 'NoelAgriTV storefront', role: 'creator' },
}

export const noelagritvDecisions = {
  googleSheet: {
    heading: 'A Google Sheet instead of a database',
    paragraphs: [
      [
        "The client simply wanted Google Sheets, since their people and employees are most familiar with that platform. A database would've been great, but it wouldn't have been interactive or familiar for them.",
      ],
      [
        "Using a Sheet had a cost too. Someone could type a malicious formula into a field such as their name, so the site cleans the text before it reaches the Sheet. And you don't want two orders that arrive at the same time to overwrite each other, so every order is only ever added as a new row.",
      ],
      [
        "The order pipeline ends in that Sheet. Anyone can send a request straight to the server and skip the form, so the server checks every order itself. Zod checks each order's data against what a valid order looks like, and Cloudflare Turnstile filters out bots. The server also looks up each product's price from its own list, so a price edited in the browser never reaches the Sheet.",
      ],
    ],
  },
  cashOnDelivery: {
    heading: 'Cash on delivery only',
    paragraphs: [['Checkout is cash on delivery: customers pay when their order arrives.']],
  },
} satisfies Record<string, Decision>

export const noelagritvImages = {
  storefront: {
    image: {
      variants: [storefront640, storefront1280],
      alt: "NoelAgriTV's home page at desktop width: the owner standing in a rice field beside the headline Natural Solutions For Better Harvests, and a Browse products button.",
    } satisfies ImageAsset,
    caption: "The storefront's home page, in English. The site also runs in Filipino.",
  },
  checkout: {
    image: {
      variants: [checkout326, checkout652],
      alt: 'The checkout form on a phone: empty Province, City or Municipality and Barangay dropdowns, street and landmark fields, order notes, and Cash on Delivery (COD) under Payment.',
    } satisfies ImageAsset,
    caption:
      'Checkout on a phone: the address narrows from region to province to city to barangay, and cash on delivery is the only payment option.',
  },
  lookup: {
    image: {
      variants: [lookup326, lookup652],
      alt: 'The Find my order form on a phone, with fields for the order number and the last 4 digits of the phone, and a Find my order button.',
    } satisfies ImageAsset,
    caption: 'Order lookup takes the order number and the last 4 digits of the phone number used at checkout.',
  },
}
