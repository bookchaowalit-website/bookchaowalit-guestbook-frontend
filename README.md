# Guestbook

A browser-only visitor register: sign with a name and a note, and the entry is filed on this device (newest 40 kept,
most recent first). There is no shared wall, account or moderation; nothing leaves the browser tab.

Live: https://guestbook.bookchaowalit.com (deployed by Vercel CLI; it can lag `main`, see `PRODUCT.md`).

## What it does

- Sign with a name (60 characters) and a note (500 characters); blank or invisible-only text is rejected.
- Entries are stored in `localStorage`, validated on load (bad JSON, repeated ids and impossible dates are dropped).
- Remove any entry from this device.

## What it does not do

- No public or shared guestbook, no message count across visitors, no moderation, no account, no sync.

## Run

```bash
npm ci
npm run dev
```

## Checks

```bash
npm test           # Vitest: entry rules, MCP handler + route, site/robots/sitemap, home render, Sentry scrubbing
npm run lint
npm run typecheck
npm run build
```

CI (`.github/workflows/ci.yml`) runs the shared Node workflow (with a line-coverage gate) and the shared security
scan on every push and PR to `main`.

## Configuration

- `NEXT_PUBLIC_SITE_URL` (optional): canonical origin for metadata, `/sitemap.xml`, `/robots.txt` and the MCP app
  info. Defaults to `https://guestbook.bookchaowalit.com`; must be an absolute http(s) URL.
- `NEXT_PUBLIC_SENTRY_DSN` (optional): turns on error reporting; unset means Sentry is off.

## Code map

- `lib/guestbook.ts`: signing, clipping, stored-entry parsing and removal (used by the page).
- `lib/use-stored-state.ts`: state mirrored to `localStorage`, read after mount.
- `lib/mcp.ts` + `app/api/mcp/route.ts`: JSON-RPC endpoint with one `get_app_info` tool (static app descriptor; the
  entries live only in the visitor's browser, so there is nothing else to serve).
- `lib/site.ts`: canonical URL, robots and sitemap.
- `lib/sentry.ts` + `instrumentation*.ts`: error reporting to Sentry, errors only, personal data stripped.
- `lib/related-projects.ts` + `app/more-projects/page.tsx`: portfolio link page (copied per repository, not a package).
