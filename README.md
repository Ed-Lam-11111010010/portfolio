# Edwin Lam — Portfolio

A responsive portfolio website showcasing projects by Lam Chi (Edwin). Built with [Astro](https://astro.build).

## Features

- **Project Showcase** — 13 projects with descriptions, skills, and links
- **Hierarchical Skill Browser** — click a genre tab (e.g. "Programming Languages") to see related skill tags, then click a skill to filter projects or visit its dedicated page
- **Skill Detail Pages** — dedicated pages at `/skills/{genre}/{skill}` showing all projects using that skill
- **Project Detail Pages** — dedicated pages for each project
- **Dark/Light Theme** — toggleable with persistence
- **PWA Support** — installable as an app on mobile/desktop
- **Responsive** — works on mobile, tablet, and desktop
- **Cloud/External Project Support** — mark projects hosted outside this repo with a badge and link
- **GitHub Pages Deploy** — automatic deployment via GitHub Actions

## Adding a New Project

1. Open `src/data/projects.json`
2. Add a new entry with the following fields:

```json
{
  "id": "my-new-project",
  "title": "My New Project",
  "description": "A short description of the project.",
  "year": 2025,
  "category": "programming",
  "skills": ["python", "git"],
  "image": null,
  "links": {
    "github": "https://github.com/your-username/my-new-project",
    "demo": null,
    "video": null
  },
  "highlights": [
    "Key achievement 1",
    "Key achievement 2"
  ],
  "external": false,
  "source_url": "https://github.com/your-username/my-new-project"
}
```

3. If the project lives outside this repo (e.g. on a cloud drive, private repo), set `"external": true` and put the URL in `"source_url"`
4. If the project uses a skill not yet in the taxonomy, add it to `src/data/skills.json` first (see below)
5. Run `npm run build` to verify
6. Commit and push — GitHub Actions will deploy automatically

## Adding a New Skill

The skill hierarchy is defined in `src/data/skills.json`. Each skill lives under a genre.

1. Open `src/data/skills.json`
2. Find the appropriate genre, or add a new genre (see below)
3. Add a new skill entry with:
   - `"name"`: Display name (e.g. "React")
   - `"slug"`: URL-friendly identifier (e.g. "react")
   - `"projectIds"`: Array of project IDs that use this skill

```json
{
  "name": "React",
  "slug": "react",
  "projectIds": ["my-new-project"]
}
```

4. Also update `project.skills` in `projects.json` to include the skill tag

## Adding a New Genre

1. Open `src/data/skills.json`
2. Add a new genre object to the `"genres"` array:

```json
{
  "name": "Cloud & DevOps",
  "slug": "cloud-devops",
  "skills": [
    { "name": "Docker", "slug": "docker", "projectIds": ["my-new-project"] }
  ]
}
```

3. The genre slug becomes part of the URL: `/skills/{genre-slug}/{skill-slug}`

## Marking a Project as External / Cloud

Some projects exist outside this repository (on GitHub, cloud drives, or other computers). To add them:

1. In `projects.json`, add the project entry with the minimal fields
2. Set `"external": true` to show a "Cloud" badge on the card
3. Set `"source_url"` to the link where the project can be viewed
4. The project will appear normally but with a dashed border and a "Cloud" label

## Skill Structure (Taxonomy)

The current skill hierarchy has **9 genres**:

| Genre | Skills |
|-------|--------|
| Programming Languages | Python, C, JavaScript, GDScript, Testing (pytest), Git, CLI Tools |
| Game Development | Phaser.js, Godot, PyGame, Game Dev (general) |
| AI & Machine Learning | Gemini API, AI/ML |
| Web Development | HTML/CSS, JavaScript (Web), Web Dev (general), Wix, WordPress |
| Embedded Systems | ARM/STM32, Embedded Systems (general), Microcontroller Programming |
| Creative & Design | Game Design, Graphic Design, Affinity Designer, Pixel Art, Aseprite, Photoshop, Logo Design, Product Design, Creative Writing, TTRPG Design, Worldbuilding, Content Creation, Script Writing |
| Multimedia Production | Video Production, Video Editing, Voice Over, Subtitling |
| Leadership & Management | Event Management, Leadership, Team Management, Budgeting, Documentation |
| Tools & Platforms | ReadTheDocs, Sphinx, Tabletop Simulator, Product/Website Setup |

## Development

```bash
npm install
npm run dev     # Start dev server at http://localhost:4321
npm run build   # Build for production into dist/
npm run preview # Preview production build locally
```

## Deployment

The site is configured for GitHub Pages at `https://Ed-Lam-11111010010.github.io/portfolio/`.

### One-time GitHub Pages Setup

1. Push this repository to `Ed-Lam-11111010010/portfolio` on GitHub
2. Go to repo Settings → Pages → Source: select "GitHub Actions"
3. Push to the `main` branch to trigger automatic deployment

### Free Hosting Alternatives

- **GitHub Pages** (already configured) — Free, automatic on push
- **Azure Static Web Apps** — Free tier, $0/month, uses Azure student credits
- **Cloudflare Pages** — Free tier, connected to GitHub repo

## Tech Stack

- **Astro** — Static site generator
- **Vanilla CSS** — Custom properties for theming, no frameworks
- **Vanilla JS** — Filter logic, theme toggle, PWA registration
- **JSON** — All project and skill data in editable files
