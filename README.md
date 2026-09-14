# Ice Benitez — Website Monorepo

npm-workspaces monorepo holding my web properties, all deployed on [Cloudflare Pages](https://pages.cloudflare.com).

| App | Package | URL | Purpose |
| --- | --- | --- | --- |
| `apps/web` | `@icebenitez/web` | [icebenitez.com](https://icebenitez.com) | Personal portfolio, projects, blog, contact |
| `apps/services` | `@icebenitez/services` | [services.icebenitez.com](https://services.icebenitez.com) | Service offerings: SaaS, backend systems, analytics/BI, automation |
| `apps/blog` | `@icebenitez/blog` | [blog.icebenitez.com](https://blog.icebenitez.com) | Blog (MDX posts, root-level slug URLs) |

## Tech Stack

- **Framework:** Astro 7.x
- **Styling:** Tailwind CSS 4.x
- **Font:** Inter (Variable)
- **Deployment:** Cloudflare Pages (one project per app)
- **Analytics:** Cloudflare Web Analytics (apps/web)

## Development

```bash
# Install all workspace dependencies (run at repo root)
npm install

# Dev servers
npm run dev:web
npm run dev:services
npm run dev:blog

# Build every app
npm run build

# Build one app
npm run build --workspace apps/blog
```

## Project Structure

```
apps/
├── web/
│   │   ├── components/   # Header, Footer, ProjectCard
│   │   ├── content/      # MDX project case studies (content collections)
│   │   ├── layouts/      # main.astro
│   │   ├── pages/        # Routes + sitemap.xml.ts / robots.txt.ts
│   │   └── scripts/      # GSAP animations
│   └── public/           # Static assets (favicon, manifest)
├── services/
│   └── src/              # Landing page for services.icebenitez.com
└── blog/
    ├── src/
    │   ├── components/   # BlogCard
    │   ├── content/      # Blog MDX collection
    │   ├── layouts/      # main.astro
    │   └── pages/        # / and /[slug] (root-level post slugs) + sitemap/robots
    └── public/           # Static assets
```

## Cloudflare Pages Setup

Three separate Pages projects, all connected to this repo:

| Setting | web project | services project | blog project |
| --- | --- | --- | --- |
| Root directory | repo root | repo root | repo root |
| Build command | `npm install && npm run build --workspace apps/web` | `npm install && npm run build --workspace apps/services` | `npm install && npm run build --workspace apps/blog` |
| Output directory | `apps/web/dist` | `apps/services/dist` | `apps/blog/dist` |
| Custom domain | `icebenitez.com` | `services.icebenitez.com` | `blog.icebenitez.com` |

## License

Copyright © 2026 Ice Benitez. All rights reserved.
