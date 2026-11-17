## Communication

Always respond in English only. Do not write replies in Mandarin, Chinese, or any other language, even if the conversation context contains them.

## Development

This is an EmDash (CMS on Astro) site at the repo root, deployed as a Cloudflare Worker. Start the dev server in background mode:

```
astro dev --background
```

- Site: http://localhost:4321 — admin panel: http://localhost:4321/_emdash/admin
- Install dependencies with `npm install`. Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.
- Content lives in D1 (managed via the admin UI or `npx emdash` CLI) — the MDX collection in `content-mdx-archive/` is a read-only archive, not part of the app.
- EmDash template rules: restyle via `src/styles/theme.css` token overrides only; don't edit `src/styles/tokens.css` or `src/layouts/Base.astro` for visual changes; new sections use `.band`/`.frame`.
- EmDash agent skills live in `.agents/skills/` (building-emdash-site, emdash-cli); EmDash docs are available as an MCP server at `https://docs.emdashcms.com/mcp` — verify APIs against it instead of assuming.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
