# Ice Benitez — Website

Single Astro site at the repo root, deployed as a Cloudflare Worker: [icebenitez.com](https://icebenitez.com).

## Tech Stack

- **Framework:** Astro 7.x
- **Styling:** Tailwind CSS 4.x
- **Fonts:** Space Grotesk (headings), Archivo (body)
- **Content:** MDX content collections (`projects`, `blog`)
- **Animations:** GSAP (ScrollTrigger, SplitText)
- **Deployment:** Cloudflare Worker with static assets (`wrangler.jsonc`)
- **Analytics:** Cloudflare Web Analytics

## Development

```bash
# Install dependencies
npm install

# Dev server (http://localhost:4321)
npm run dev

# Build (16 pages)
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
src/
├── components/   # Header, Footer, ProjectCard, BlogCard
├── content/      # MDX collections: projects/ and blog/
├── layouts/      # main.astro
├── pages/        # Routes incl. /projects/*, /posts/*, sitemap.xml, robots.txt
├── scripts/      # GSAP animations
├── styles/       # Tailwind theme + prose styles
└── site.ts       # SITE_URL (from PUBLIC_SITE_URL, hardcoded fallback)
public/           # Static assets (favicon, manifest, images)
```

## Deployment

Cloudflare Workers-style connected build (Worker name `my-website` — see `wrangler.jsonc`):

| Setting | Value |
| --- | --- |
| Build command | `npm install && npm run build` |
| Deploy command | `npx wrangler deploy --config wrangler.jsonc` |
| Output directory | `dist` |

Environment variables (set in the Cloudflare dashboard for production; `.env.example` documents them):

- `PUBLIC_SITE_URL` — canonical base URL (fallback: `https://icebenitez.com`)

## License

Copyright © 2026 Ice Benitez. All rights reserved.
