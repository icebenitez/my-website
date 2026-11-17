## Communication

Always respond in English only. Do not write replies in Mandarin, Chinese, or any other language, even if the conversation context contains them.

## Development

This is a single Astro app (`apps/web`) in an npm workspace. When starting the dev server, run it from the app directory and use background mode:

```
cd apps/web
astro dev --background
```

Install dependencies from the repo root with `npm install`. Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`. If the workspace-local `astro` shim misbehaves (stale `apps/web/node_modules`), run it via the root install instead: `node ../../node_modules/astro/bin/astro.mjs dev --background`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
