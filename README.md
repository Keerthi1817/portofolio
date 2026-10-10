# Portfolio

Personal portfolio site for Keerthivasan K, an AI Engineer.

Live site (GitHub Pages): https://keerthi1817.github.io/portofolio/

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion
- Hosted on GitHub Pages (static site, no backend or database)

## How to change your content

All content (hero, about, projects, skills, experience, education, certifications, contact details, ...) is
hardcoded in one file: [`src/lib/portfolio-data.ts`](src/lib/portfolio-data.ts).

1. Edit that file (you can use GitHub's web editor: open the file, click the pencil icon).
2. Commit to `main`. The **Deploy to GitHub Pages** workflow rebuilds and publishes the site in a minute or two.

Your contact details live in the `contact` block of that file (email, GitHub, LinkedIn, Instagram) and are the
only place they are defined; the hero and the contact section both read from it.

There is no admin page and no database. (Earlier versions loaded content from a shared online database, which is
why someone else's details could appear on this site. That has been removed.)

## Development

```sh
npm install
npm run dev      # http://localhost:8080/portofolio/
npm run build    # production build into dist/
npm test
```

## Deployment

Pushes to `main` trigger [`.github/workflows/pages.yml`](.github/workflows/pages.yml), which builds the site and
publishes it to GitHub Pages. In the repository settings, Pages must use **GitHub Actions** as the source. No
secrets or variables are needed.
