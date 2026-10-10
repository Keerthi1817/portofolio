# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install     # install dependencies
npm run dev     # dev server on port 8080 (served under /portofolio/)
npm run build   # production build into dist/
npm run lint    # ESLint
npm test        # vitest run
```

## Architecture

Personal portfolio site (Keerthivasan K, AI Engineer), a **static site on GitHub Pages**. There is no backend,
database or admin panel.

- **Content**: everything is hardcoded in `src/lib/portfolio-data.ts` (`defaultData`). Edit that file to change
  content. Do not add a database or a remote source for it: a previous version merged a shared online row over
  the defaults, which made the site show another person's details.
- **Context**: `PortfolioProvider` (`src/hooks/use-portfolio-data.tsx`) just exposes `getDefaultPortfolioData()`;
  sections read it through `usePortfolioData()`. Hero and Contact both read `data.contact`.
- **Routes** (`src/App.tsx`): `/` (portfolio) and `*` (404), React Router with `basename="/portofolio"`.
- **UI**: shadcn/ui in `src/components/ui/`, Tailwind CSS, portfolio sections in `src/components/portfolio/`.
- **Import alias**: `@/` maps to `src/`.

## Deployment

`.github/workflows/pages.yml` builds with `npm run build` (Vite `base: "/portofolio/"`), copies `index.html` to
`404.html` for deep links, and deploys to GitHub Pages on push to `main`. No environment variables are used.
