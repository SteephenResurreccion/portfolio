# Portfolio

Source of [steephen-resurreccion.vercel.app](https://steephen-resurreccion.vercel.app): Steephen Resurreccion's portfolio, with case studies of NoelAgriTV, Lipa Agricultural Supply POS, LipaAction and IRIS.

Next.js (App Router, every page static), TypeScript and Tailwind CSS, deployed on Vercel. No client components, no third-party requests.

## Layout

- `content/`: all site copy, as typed modules (one file per project)
- `components/`: server components, grouped by page area
- `app/`: one folder per route, plus the sitemap, robots and 404
- `scripts/`: copy and served-site checks

## Run it

```bash
npm ci
npm run build
npm run start
```

Then open http://localhost:3000.

## Checks

```bash
npm run lint
npm run typecheck
node scripts/check-source.mjs --structural-only
node scripts/check-site.mjs --base-url http://localhost:3000 --structural-only
```
