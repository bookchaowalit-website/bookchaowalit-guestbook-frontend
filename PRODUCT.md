# Guestbook — Product truth

> Inferred from the code and copy (no user interview). Checked against the portfolio card claims review
> (`portfolio-site-web/docs/audits/CARD-CLAIMS-REVIEW-2026-10.md`, row `guestbook`, evidence Live→Prototype: the
> moderated messages, public count and social-proof claims were removed) on 2026-10-23.

## What it is

A client-only guestbook demo: a visitor register kept in this browser's `localStorage`.

## Who it is for

A portfolio visitor who wants to see a small, careful form-and-list UI.

## What works today

1. Sign with a name (up to 60 characters) and a note (up to 500); blank or invisible-only input shows an error, and
   clipping never splits an emoji.
2. Entries show newest first with a date; the newest 40 are kept. Any entry can be removed.
3. Stored entries are validated on load: bad JSON, repeated ids and out-of-range timestamps are dropped.
4. `/api/mcp` answers JSON-RPC (`initialize`, `ping`, `tools/list`, `tools/call`) with one honest `get_app_info` tool;
   unknown tools and methods return JSON-RPC errors.
5. Front-end and server errors go to Sentry (errors only, personal data stripped) when `NEXT_PUBLIC_SENTRY_DSN` is set.

## What does not work (and must not be claimed)

- No shared or public wall: other visitors never see an entry. No moderation, message count or social proof.
- No account, sync, export or e-mail. Clearing site data deletes the register.

## Live URL and deploy state

- Live: https://guestbook.bookchaowalit.com (HTTP 200 on 2026-10-23).
- The Vercel project `bookchaowalit-guestbook-frontend` is deployed by CLI only. Its Git link names the old repository
  (`bookchaowalit/bookchaowalit-guestbook-frontend`), so a push to `main` does not deploy. The last production deploy
  is the CVE patch (2026-10-23 12:06, CLI, commit 9bbdc17); later commits (tests, Sentry, canonical URL fix) stay
  undeployed until the owner reconnects Vercel Git to this repository (owner action D9).
- `NEXT_PUBLIC_SENTRY_DSN` is set on the Vercel project (Sentry project `community-guestbook-web`, org
  `personal-yu0`); it takes effect on the next deploy.

## Boundaries

- Browser-only apart from the stateless `/api/mcp` route. No server storage, no personal data collected.
