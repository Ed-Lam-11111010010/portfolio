# Edwin Lam — Portfolio

Personal portfolio of Lam Chi (Edwin), built with [Astro](https://astro.build) in a pixel-art style.
Live at <https://ed-lam-11111010010.github.io/portfolio/>.

## What's on the site

- **Hero, About, Skills, Projects, Contact** on one page, with light and dark themes.
- **Featured projects** shown as large tiles, the rest in a grid, and small exercises in a short list.
- **Skill filter**: pick an area, then one or more skills, to narrow the projects.
- **Skill pages** at `/skills/{area}/{skill}/` and **project pages** at `/projects/{id}/`.
- **Pixel-art covers** generated for every project that has no image (`src/lib/pixel.js`).
- Installable as an app (PWA) and readable offline once visited.

## Adding a project

Add an entry to `src/data/projects.json`:

```json
{
  "id": "my-new-project",
  "title": "My New Project",
  "description": "One or two sentences on what it is.",
  "year": 2026,
  "category": "game-dev",
  "skills": ["Python", "Game Dev"],
  "image": null,
  "links": { "github": null, "demo": null, "video": null },
  "highlights": ["What makes it interesting"],
  "external": false,
  "source_url": null,
  "type": "personal",
  "featured": 5
}
```

| Field | Notes |
| --- | --- |
| `id` | Used in the URL: `/projects/{id}/` |
| `category` | One of `ai-game-dev`, `game-dev`, `game-design`, `web-dev`, `programming`, `documentation`, `multimedia`, `creative`, `leadership`. Sets the label and the pixel cover. |
| `skills` | Must match a skill **name** or **slug** in `src/data/skills.json`. An unknown tag stops the build with a message saying which one. |
| `image` | Path under `public/`, e.g. `/images/projects/my-game.png`. Leave `null` for a generated pixel cover. |
| `links.demo` | Adds a "Playable" tag and a "Play the demo" button. |
| `type` | `coursework` shows a Coursework label; anything else is not shown. |
| `featured` | Optional number. Featured projects appear as large tiles, in this order. |
| `minor` | Optional `true`. Lists the project under "Smaller exercises". |

Projects are listed in the order they appear in the file (currently newest year first).

## Adding a skill or area

Skills live in `src/data/skills.json`, grouped into areas (`genres`). Each skill needs a `name` and a URL-friendly `slug`.
Project counts are worked out from `projects.json`, and skills no project uses are hidden.

## Development

```bash
npm install
npm run dev      # http://localhost:4321/portfolio/
npm run build    # production build into dist/
npm run preview  # serve the build locally
```

`src/pages/admin.astro` is a local-only helper for editing project JSON. It works with `npm run dev` and is removed from the production build.

## Deployment

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.

## Tech

Astro, plain CSS with custom properties, a little vanilla TypeScript for the filter, theme and menu.
Fonts are self-hosted from npm: Pixelify Sans (headings and UI) and Atkinson Hyperlegible (body text).
