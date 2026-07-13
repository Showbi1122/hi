# Malik Taleeb Shahbaz — Portfolio (Next.js 15)

Production portfolio rebuilt with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

Live URL: [taleeb-shahbaz.vercel.app](https://taleeb-shahbaz.vercel.app)

## Stack

- Next.js 15 App Router (SSG)
- React 19 + TypeScript
- Tailwind CSS + Framer Motion
- Content: TypeScript data modules + MDX frontmatter blog posts (`content/blog/`)

## Scripts

```bash
npm run dev      # Local development
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
npm run export:blog  # Regenerate blog MDX from Python sources
```

## Project structure

```
app/           # Routes (App Router)
components/    # Reusable UI
content/blog/  # Blog posts (frontmatter + HTML body)
lib/           # Data, metadata, schema, utilities
public/        # Static assets (images, favicons)
legacy/        # Archived static HTML (pre-migration)
scripts/       # Build & migration tooling
```

## SEO & migration

- All `.html` URLs redirect permanently to clean routes via `next.config.ts`
- Dynamic `sitemap.xml` and `robots.txt`
- JSON-LD preserved per page
- Google Search Console verification in root layout

## Deploy

Deploy to Vercel — framework is auto-detected from `package.json`.

Set optional env:

```
NEXT_PUBLIC_SITE_URL=https://taleeb-shahbaz.vercel.app
```
