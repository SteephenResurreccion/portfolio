import type { Rich, Seo } from './types'

export const notFoundSeo: Seo = {
  title: 'Page not found · Steephen Resurreccion',
  description: "There's no page at this address. You can see my work or read about me.",
}

export const notFound: { heading: string; paragraphs: readonly Rich[] } = {
  heading: 'Page not found',
  paragraphs: [
    ["There's no page at this address."],
    [
      'You can see ',
      { kind: 'internal', text: 'my work', href: '/#work' },
      ' or ',
      { kind: 'internal', text: 'read about me', href: '/about' },
      '.',
    ],
  ],
}
