import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { homeSeo } from '@/content/home'
import { SITE_URL } from '@/content/site'
import { plexMono, plexSans } from './fonts'
import './globals.css'

// Any request-time API fails the build instead of quietly making a route dynamic.
export const dynamic = 'error'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: homeSeo.title,
  description: homeSeo.description,
  // No favicon is designed yet; an empty icon stops browsers requesting /favicon.ico and logging a 404.
  icons: { icon: 'data:,' },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F3F0E8' },
    { media: '(prefers-color-scheme: dark)', color: '#16140F' },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="flex min-h-dvh flex-col bg-paper px-4 font-sans text-body text-ink">{children}</body>
    </html>
  )
}
