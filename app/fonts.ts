import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'

// Self-hosted by next/font: 3 weights in 2 files. Mono is for dates and stack lines only.
export const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-plex-sans',
})

export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-plex-mono',
})
