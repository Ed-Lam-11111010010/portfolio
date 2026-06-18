# Edwin Lam — Portfolio

A responsive portfolio website showcasing projects by Lam Chi (Edwin). Built with [Astro](https://astro.build).

## Features

- **Project Showcase** — 13 projects with descriptions, skills, and links
- **Skill Tag Filtering** — click any skill tag to filter projects instantly
- **Project Detail Pages** — dedicated pages for each project
- **Dark/Light Theme** — toggleable with persistence
- **PWA Support** — installable as an app on mobile/desktop
- **Responsive** — works on mobile, tablet, and desktop
- **GitHub Pages Deploy** — automatic deployment via GitHub Actions

## Adding a New Project

1. Open `src/data/projects.json`
2. Add a new entry following the existing format (include `id`, `title`, `description`, `year`, `category`, `skills`, `image`, `links`, `highlights`)
3. Run `npm run build` to verify
4. Commit and push — GitHub Actions will deploy automatically

## Development

```bash
npm install
npm run dev     # Start dev server
npm run build   # Build for production
npm run preview # Preview production build
```

## Deployment

The site is configured for GitHub Pages at `https://Ed-Lam-11111010010.github.io/portfolio/`.

Push to the `main` branch to trigger automatic deployment via the GitHub Actions workflow at `.github/workflows/deploy.yml`.

## Tech Stack

- **Astro** — Static site generator
- **Vanilla CSS** — Custom properties for theming, no frameworks
- **Vanilla JS** — Filter logic, theme toggle, PWA registration
- **JSON** — All project data in one editable file
