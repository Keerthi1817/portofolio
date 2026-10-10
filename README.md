# Portfolio

Personal portfolio site for Keerthivasan K, an AI Engineer.

Live site (GitHub Pages): https://keerthi1817.github.io/portofolio/

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion
- Hosted on GitHub Pages (static site, no backend or database)

## How to change your content

Two places hold the content:

- [`src/lib/portfolio-data.ts`](src/lib/portfolio-data.ts): hero (name, title, tagline), the About bio, the Skills list, your
  contact details (email, GitHub, LinkedIn, Instagram) and manual articles. The hero and the contact section both read
  the `contact` block, which is the only place those details are defined.
- The section components in [`src/components/portfolio/`](src/components/portfolio/): Experience, Education, Impact,
  Achievements, Projects and Resume are written directly in `ExperienceSection.tsx`, `EducationSection.tsx`,
  `ImpactSection.tsx`, `CertificationsSection.tsx`, `ProjectsSection.tsx` and `ResumeSection.tsx`.

To edit, open the file on GitHub (pencil icon), change the text and commit to `main`. The **Deploy to GitHub Pages**
workflow rebuilds and publishes the site in a minute or two.

There is no admin page and no database. (Earlier versions loaded content from a shared online database, which is
why someone else's details could appear on this site. That has been removed.) Write only your own information here.

## Development

```sh
npm install
npm run dev      # http://localhost:8080/portofolio/
npm run build    # production build into dist/
npm test
```

## Deployment

Live site: **https://keerthi1817.github.io/portofolio/**

This repository is **private**, and GitHub Pages only serves public repositories on a free plan. So the site is built
here and the built files (only the compiled site, no source code and no git history) are published into a small
**public** repository named `Keerthi1817.github.io`, inside a folder called `portofolio/`. GitHub Pages serves that
folder at the same address as before.

`.github/workflows/publish.yml` does this on every push to `main` (or when you run it by hand from the Actions tab).

### One-time setup

1. Create a **public** repository named exactly `Keerthi1817.github.io`, initialised with a README (it needs at least
   one commit). In its **Settings, Pages**, set Source to *Deploy from a branch*, branch `main`, folder `/ (root)`.
2. On your computer create a deploy key (a key that only works for that one repository):
   ```sh
   ssh-keygen -t ed25519 -f pages_deploy -N "" -C "portofolio publish"
   ```
   - In `Keerthi1817.github.io`: **Settings, Deploy keys, Add deploy key**. Paste the contents of `pages_deploy.pub` and
     tick **Allow write access**.
   - In **this** repository: **Settings, Secrets and variables, Actions, New repository secret**. Name it
     `PAGES_DEPLOY_KEY` and paste the contents of the private file `pages_deploy`.
   - Delete both key files from your computer afterwards.
3. Run **Actions, Publish site, Run workflow**. After a minute or two the site is live (GitHub's cache can take up to
   about 10 minutes to refresh).

If the workflow fails with "The PAGES_DEPLOY_KEY secret is not set", step 2 is missing. If it cannot check out
`Keerthi1817.github.io`, check that the repository exists, has a commit, and that the deploy key has write access.
Anything else already in `Keerthi1817.github.io` is left alone: only the `portofolio/` folder is replaced.
