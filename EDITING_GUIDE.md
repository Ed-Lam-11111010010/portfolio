# Portfolio Editing Guide

## Project Structure Overview

```
portfolio/
├── src/
│   ├── components/       # Reusable UI components
│   ├── data/             # JSON data files
│   ├── layouts/          # Page layouts
│   ├── pages/            # Route pages (Astro)
│   └── styles/           # CSS styles
└── public/               # Static assets (images, icons)
```

---

## 1. Adding a New Project

**File:** `src/data/projects.json`

Add a new entry to the array:

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
  "source_url": "https://github.com/your-username/my-new-project",
  "type": "personal"
}
```

### Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | URL-friendly identifier (used in `/projects/{id}`) |
| `title` | string | Display name |
| `description` | string | Short project summary |
| `year` | number | Year of completion |
| `category` | string | Project category (e.g., `programming`, `game-dev`, `ai-game-dev`) |
| `skills` | string[] | List of skills used (must exist in `skills.json`) |
| `image` | string \| null | Path to image in `public/` or `null` for placeholder |
| `links.github` | string \| null | GitHub repository URL |
| `links.demo` | string \| null | Live demo URL |
| `links.video` | string \| null | Video walkthrough URL |
| `highlights` | string[] | Key features/achievements |
| `external` | boolean | `true` if hosted outside this repo |
| `source_url` | string \| null | URL where project can be viewed |
| `type` | string | Project type: `personal`, `coursework`, `game-dev`, `leadership`, etc. |

### Adding a Project Image

1. Place image in `public/images/projects/`
2. Set `"image": "/images/projects/your-image.png"`

---

## 2. Adding a New Skill

**File:** `src/data/skills.json`

Find the appropriate genre, or add a new one:

```json
{
  "name": "React",
  "slug": "react",
  "projectIds": ["my-new-project"]
}
```

### Existing Genres

| Genre | Slug |
|-------|------|
| Programming Languages | `programming` |
| Game Development | `game-dev` |
| AI & Machine Learning | `ai-ml` |
| Web Development | `web-dev` |
| Embedded Systems | `embedded-systems` |
| Creative & Design | `creative-design` |
| Multimedia Production | `multimedia` |
| Leadership & Management | `leadership` |
| Tools & Platforms | `tools-platforms` |

### Adding a New Genre

Add to the `genres` array in `skills.json`:

```json
{
  "name": "Cloud & DevOps",
  "slug": "cloud-devops",
  "skills": [
    { "name": "Docker", "slug": "docker", "projectIds": [] }
  ]
}
```

---

## 3. Editing the Home Page

**File:** `src/pages/index.astro`

- **Hero Section:** Lines 12-40 (name, title, social links)
- **About Section:** Lines 42-59 (bio text)
- **Skills Section:** Lines 61-79 (auto-generated from `skills.json`)
- **Projects Section:** Lines 81-89 (auto-generated from `projects.json`)
- **Contact Section:** Lines 91-120 (contact form)

### Changing Hero Text

Edit lines 20-27:

```astro
<h1>Hi, I'm <span>Your Name</span></h1>
<p>Your bio text here...</p>
```

### Changing Social Links

Edit lines 35-38:

```astro
<a href="https://github.com/your-username" target="_blank"><i class="bx bxl-github"></i></a>
<a href="https://linkedin.com/in/your-profile" target="_blank"><i class="bx bxl-linkedin"></i></a>
<a href="mailto:your-email@gmail.com"><i class="bx bx-envelope"></i></a>
```

---

## 4. Editing Project Detail Pages

**File:** `src/pages/projects/[id].astro`

This page is **auto-generated** for all projects. Changes here affect ALL project detail pages.

### Layout Structure

```
┌─────────────────────────────────────────────┐
│  ← Back                                     │
│  ┌─────────────┐  ┌───────────────────────┐ │
│  │   Image     │  │   Project Title       │ │
│  │             │  │   Year | Type | Cat   │ │
│  ├─────────────┤  │                       │ │
│  │   Links     │  │   Description         │ │
│  │   GitHub →  │  │                       │ │
│  │   Demo →    │  │   Skills              │ │
│  └─────────────┘  │   Software Used       │ │
│                   │                       │ │
│                   │   Highlights          │ │
│                   └───────────────────────┘ │
└─────────────────────────────────────────────┘
```

### Skills vs Software Used

The page automatically splits skills into two sections:

- **Skills:** Programming languages, concepts (python, javascript, ai/ml)
- **Software Used:** Tools and platforms (phaser.js, gemini api, photoshop)

To change which skills appear where, edit the filter list in `[id].astro` lines 70-87.

---

## 5. Editing Styles

**File:** `src/styles/global.css`

### Main Sections

| Line Range | Section |
|------------|---------|
| 1-100 | CSS Variables (colors, fonts) |
| 100-300 | Layout & Typography |
| 300-500 | Buttons & Forms |
| 500-700 | Project Cards & Grids |
| 700-900 | Skills Section |
| 900-1100 | Modal Styles |
| 1100-1250 | Project Detail Page |

### Changing Colors

Edit CSS variables at the top of `global.css`:

```css
:root {
  --color-accent: #007bff;      /* Primary blue */
  --color-bg: #ffffff;          /* Background */
  --color-text: #333333;        /* Main text */
  --color-text-secondary: #666666; /* Secondary text */
}
```

### Dark Mode

Dark mode variables are defined separately. Search for `[data-theme="dark"]` to find them.

---

## 6. Editing Navigation & Layout

**File:** `src/layouts/BaseLayout.astro`

- **Header/Nav:** Edit the `<nav>` section
- **Footer:** Edit the `<footer>` section
- **Meta tags:** Edit `<head>` section

---

## 7. Common Tasks

### Change Project Order

Projects display in the order they appear in `projects.json`. Move entries up/down to reorder.

### Remove a Project

Delete the entry from `projects.json`. Also remove its `projectIds` from relevant skills in `skills.json`.

### Add a Cloud/External Project

```json
{
  "external": true,
  "source_url": "https://link-to-your-project.com",
  "links": {
    "github": null
  }
}
```

### Change the Site URL

**File:** `astro.config.mjs`

```js
export default defineConfig({
  site: 'https://your-domain.com',
});
```

---

## 8. Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Dev server runs at: `http://localhost:4321`

---

## 9. Deploying

Push to `main` branch. GitHub Actions auto-deploys to GitHub Pages.

```bash
git add .
git commit -m "your message"
git push origin main
```

Site URL: `https://Ed-Lam-11111010010.github.io/portfolio/`

---

## 10. File Reference

| File | Purpose |
|------|---------|
| `src/data/projects.json` | All project data |
| `src/data/skills.json` | Skill taxonomy |
| `src/pages/index.astro` | Home page |
| `src/pages/projects/[id].astro` | Project detail page |
| `src/components/ProjectCard.astro` | Project card on home page |
| `src/components/SkillFilter.astro` | Skill filter chips |
| `src/components/ProjectModal.astro` | Legacy modal (unused now) |
| `src/styles/global.css` | All styles |
| `src/layouts/BaseLayout.astro` | Base layout with nav/footer |
| `public/` | Static assets (images, icons) |
