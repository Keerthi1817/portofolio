# Portfolio

Personal portfolio site for Kunal K — an AI Engineer specializing in AI Agents and LLMOps.

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion
- Lovable Cloud (Supabase) — database, edge functions

## Data & Persistence

All portfolio content (hero, about, projects, skills, experience, certifications, education, articles, contact, admin credentials, etc.) is stored in the cloud database in the `portfolio_settings` table (single row, `id = 'main'`).

- The site loads content from the database on every visit, so all visitors see the same content.
- Edits made in the Admin panel (`/admin`) are written directly to the database and reflect globally.
- Clicking **Reset** in the Admin panel deletes the row from the database, restoring the default hardcoded content.
- Nothing is persisted in `localStorage` — only the admin session flag in `sessionStorage`.

## Medium Articles

Medium articles are fetched by the `fetch-medium-articles` edge function, which:

1. Reads the configured Medium username from `portfolio_settings`.
2. Fetches and parses the Medium RSS feed.
3. Caches the parsed articles back into `portfolio_settings` (`cachedMediumArticles`, `mediumCachedAt`).

The frontend reads the cached articles immediately and only re-invokes the edge function when the cache is older than 1 hour.

## Admin Panel

- Route: `/admin`
- Login uses the `adminEmail` / `adminPassword` values stored in the database.
- All Save / Reset actions hit the cloud database directly.

## Development

```sh
npm install
npm run dev
```

## Docker

```sh
docker compose up -d    # build and serve on port 6001
```

The Dockerfile builds the Vite app and serves it with `vite preview` on port 3000. The host nginx reverse-proxies port 6001 to the container.

## CI/CD

Push or PR merge to `main` triggers a GitHub Actions workflow ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) that runs on a self-hosted runner on an Oracle cloud server:

1. `git pull` latest main
2. Write `.env` from GitHub Secrets (falls back to existing `.env` if none set)
3. `docker compose up -d --build`
4. Health check on `localhost:6001`
