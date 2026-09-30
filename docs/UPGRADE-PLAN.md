# Upgrade plan

## Current state

Score: 7/10 (was 5/10) — honest local register with validated storage, tests and CI; no shared wall by design.

## Backlog

- P2: Edit an entry in place (removal exists since pass 2).
- P1: Playwright smoke test for signing the book once a browser runner exists in CI.
- P2: Export the register as JSON/print view.

## Done in this pass

- CI (`.github/workflows/ci.yml`): `npm ci`, lint, typecheck, vitest, `next build` on every push and PR.
- `/api/mcp` uses a typed JSON-RPC handler (`lib/mcp.ts`, tested) with proper error codes and an honest `get_app_info` tool; this fixed the template's lint errors.
- `/more-projects` renders from `lib/related-projects.ts` (was ~980 lines of unrolled links plus an unused data copy) and no longer links to itself; removed the stale `app/page.tsx.backup`.
- Entry logic moved to `lib/guestbook.ts` (trim, length limits, 40-entry cap, stored-data validation) with tests; hydration uses `lib/use-stored-state.ts`, fixing the `react-hooks/set-state-in-effect` lint error.
- Validation errors are now announced via `role="status"`; inputs carry `maxLength`/`autocomplete`.

## Done in this pass (pass 2)

- Canonical host is config-driven: `lib/site.ts` resolves `NEXT_PUBLIC_SITE_URL` (validated, clear error on a non-http(s) value) and feeds `metadataBase`, generated `app/sitemap.ts` / `app/robots.ts` and the MCP `get_app_info` URL; removed the stale template `public/sitemap.xml` / `robots.txt` (they pointed at `bookchaowalit.com` and a `*.vercel.app` name that differs from the project URL). Tested in `lib/site.test.ts`.
- Entries can be removed on this device (`removeEntry` in `lib/guestbook.ts`, tested); each Remove button names the entry it removes and has a visible focus ring.
