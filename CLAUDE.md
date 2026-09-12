# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install            # install dependencies
npm run dev            # dev server on port 8080
npm run build          # production build
npm run build:dev      # development build
npm run preview        # preview production build (port 3000)
npm run lint           # ESLint
npm test               # vitest run
npm run test:watch     # vitest in watch mode
```

Vitest uses jsdom environment with `@testing-library/jest-dom` matchers. Test files match `src/**/*.{test,spec}.{ts,tsx}`. The setup file is `src/test/setup.ts`.

## Architecture

This is a personal portfolio site (Kunal K — AI Engineer) deployed on Lovable Cloud.

**Data flow**: All content lives in a single Supabase row — `portfolio_settings` (id = `'main'`, JSONB `data` column). The frontend reads from and writes to Supabase directly via `@supabase/supabase-js` (anon key). There is no intermediate API server.

**Context provider**: `PortfolioProvider` (`src/hooks/use-portfolio-data.tsx`) wraps the app. On mount it fetches from Supabase and merges the DB data over hardcoded defaults from `src/lib/portfolio-data.ts`. All portfolio sections consume this context via `usePortfolioData()`.

**Routes**: Three routes in `src/App.tsx` — `/` (portfolio), `/admin` (editor), `*` (404). React Router v6 with `BrowserRouter`.

**Admin panel** (`src/pages/Admin.tsx`): Tabbed form editor for every portfolio section. Login checks `adminEmail`/`adminPassword` from the DB-stored data, sets a `sessionStorage` flag. Save upserts the row; Reset deletes it (restoring defaults).

**Medium articles**: The `fetch-medium-articles` Edge Function (`supabase/functions/fetch-medium-articles/index.ts`) parses the RSS feed for the configured `mediumUsername`, caches articles into the portfolio_settings JSONB. The frontend reads cached articles and re-invokes the edge function when cache is > 1 hour old.

**UI**: shadcn/ui components in `src/components/ui/`, Tailwind CSS with CSS variables for theming (dark/light via `next-themes`). Portfolio section components live in `src/components/portfolio/`.

**Import alias**: `@/` maps to `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`).

**Supabase types**: Auto-generated in `src/integrations/supabase/types.ts`. The client is in `src/integrations/supabase/client.ts`.

## Docker

```bash
docker compose up -d    # builds and serves on port 6001 (vite preview on 3000 internally)
```

Single-stage Dockerfile: `npm install` → `npm run build` → `npm run preview` on port 3000. The host runs nginx as a reverse proxy in front of the container. Build args (`VITE_SUPABASE_*`) are passed from the host `.env` or GitHub Secrets.

## CI/CD (GitHub Actions)

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) triggers on push/PR merge to `main`, runs on a self-hosted runner (`runs-on: self-hosted`):

1. `git pull origin main` into `/home/ubuntu/all_bots/Kunal-Portfolio`
2. Writes `.env` from GitHub Secrets if set, otherwise keeps existing `.env`
3. `docker compose down && docker compose up -d --build`
4. Health check + image prune
