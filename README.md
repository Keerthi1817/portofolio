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

Pushes to `main` trigger [`.github/workflows/pages.yml`](.github/workflows/pages.yml), which builds the site and
publishes it to GitHub Pages. In the repository settings, Pages must use **GitHub Actions** as the source. No
secrets or variables are needed.
