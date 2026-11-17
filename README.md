# Ice Benitez — Website

Personal site of Ice Benitez: an [EmDash](https://emdashcms.com) CMS site built on
Astro, deployed as a Cloudflare Worker at [icebenitez.com](https://icebenitez.com).

Blog posts and project case studies are managed through the EmDash admin panel
(`/_emdash/admin/`) and stored in D1; media lives in R2.

## Tech Stack

- **CMS:** EmDash (Astro-based, D1 + R2 on Cloudflare Workers)
- **Framework:** Astro 7.x (SSR via `@astrojs/cloudflare`)
- **Styling:** EmDash token system (`src/styles/tokens.css`), brand overrides in `src/styles/theme.css`
- **Fonts:** Space Grotesk (headings), Archivo (body), JetBrains Mono (labels/code)
- **Deployment:** Cloudflare Worker (`wrangler.jsonc`) — D1 `DB`, R2 `MEDIA`, cron trigger

## Development

```bash
# Install dependencies
npm install

# Dev server (http://localhost:4321, admin at /_emdash/admin)
npm run dev

# Build (worker bundle in dist/)
npm run build

# Deploy to Cloudflare
npm run deploy

# Typecheck
npm run typecheck
```

Local dev runs on simulated D1/R2 (via the Astro Cloudflare adapter). The seed
(`seed/seed.json`) applies automatically when the local database is empty.
The CLI's dev bypass authenticates local commands against `astro dev` only.

## Content

- `posts` — title, publish date, featured image, content (Portable Text), excerpt
- `projects` — title, publish date, hero image, summary, content, GitHub + live links
- `pages` — simple static pages
- `tag` taxonomy spans posts and projects

Migrating markdown: the CLI converts markdown strings to Portable Text
automatically (`npx emdash content create posts --data '{"title": "...", "content": "# md"}'`).
Taxonomy terms attach via `PUT /_emdash/api/content/{collection}/{id}` with a
`taxonomies` field (dev cookie auth locally). The pre-EmDash MDX sources are
archived in `content-mdx-archive/`.

## Deployment

Cloudflare Workers connected build (Worker name `my-website`, see `wrangler.jsonc`):

| Setting | Value |
| --- | --- |
| Build command | `npm install && npm run build` |
| Deploy command | `npx wrangler deploy` |
| Bindings | D1 `icebenitez-website`, R2 `icebenitez-media`, cron (1 min) |

First deploy creates the D1 database and R2 bucket. Then, immediately:

1. Complete the setup wizard at `https://icebenitez.com/_emdash/admin/setup` —
   the first person through becomes admin (passkeys bind to the hostname)
2. Upload the encryption key: `npx wrangler secret put EMDASH_ENCRYPTION_KEY`
3. Migrate content into the production DB: `npx emdash login --url https://icebenitez.com`
   (device flow), then `npx emdash content create ...` per entry, or use the admin UI

## Structure

```
src/
├── components/   # Base-building blocks: PostCard, ProjectCard, Byline, Pagination
├── layouts/      # Base.astro (EmDash wiring: menus, settings, head)
├── pages/        # /, /posts/*, /projects/*, /contact, /search, legal, 404
├── styles/       # tokens.css (template defaults), theme.css (brand), prose.css
├── utils/        # locale, reading-time, date, site-identity
├── worker.ts     # Cloudflare worker entry (EmDash handler + scheduled)
└── live.config.ts
seed/seed.json   # Schema definition (collections, taxonomies, menus)
```

## License

Copyright © 2026 Ice Benitez. All rights reserved.
