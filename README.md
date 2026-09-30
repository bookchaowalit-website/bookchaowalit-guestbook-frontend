# Guestbook

Sign the guestbook; entries stay on this device.

## Features
- Local wall

## Limitations
- Not a shared global guestbook

## Run
```bash
npm install
npm run dev
```

## Honesty
Portfolio demo. Not multi-tenant SaaS. Prefer local-only state over fake production claims.

## Checks

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

CI runs the same checks on every push (`.github/workflows/ci.yml`).
