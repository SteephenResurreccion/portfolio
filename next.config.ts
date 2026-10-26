import type { NextConfig } from 'next'

// Security headers (spec §12). Applied by Vercel and by `next start`, so check-site
// verifies the same set locally and on production.
const isDev = process.env.NODE_ENV === 'development'

const contentSecurityPolicy = [
  "default-src 'self'",
  // The prerendered App Router HTML carries inline RSC-payload scripts, so 'unsafe-inline' stays.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ')

const nextConfig: NextConfig = {
  poweredByHeader: false,
  typedRoutes: true,
  // Stops Next from writing a managed block into CLAUDE.md when `next dev` runs under an agent.
  agentRules: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
    ]
  },
}

export default nextConfig
