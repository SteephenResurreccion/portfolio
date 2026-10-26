import type { Rich, Seo } from './types'

export const homeSeo: Seo = {
  title: 'Steephen Resurreccion · Full-stack developer',
  description:
    "I'm a full-stack developer (web, mobile and ML, end to end) and a CS senior graduating in 2027. Lipa City, Philippines · UTC+8 · open to remote and relocation",
}

export const homeIntro: { paragraphs: readonly Rich[]; location: string } = {
  paragraphs: [
    [
      'I like building anything, from simple tools I might find useful in niche scenarios to ',
      { kind: 'nowrap', text: 'full-scale' },
      ' applications such as POS systems.',
    ],
    ["I'm a full-stack developer (web, mobile and ML, end to end) and a CS senior graduating in 2027."],
    [
      "I'm looking for part-time or contract remote work now, and an internship or a full-time junior role from May 2027.",
    ],
  ],
  location: 'Lipa City, Philippines · UTC+8 · open to remote and relocation',
}

export const MORE_PROJECTS_HEADING = 'More projects'
