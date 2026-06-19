---
slug: portfolio-overhaul
status: awaiting-approval
intent: clear
pending-action: write .omo/plans/portfolio-overhaul.md
approach: Restructure skill taxonomy into a 3-level hierarchy (Genre→Skill→Projects), create dedicated skill page routes, migrate hosting to a cheap/free provider, and build a maintainable data editing system.
---

# Draft: portfolio-overhaul

## Components (topology ledger)
| id | outcome | status | evidence path |
|----|---------|--------|---------------|
| C1 - Hierarchical Skill Taxonomy | Redesign `skills.js` + `projects.json` to support Genre→Skill→Project hierarchy | active | `src/data/skills.js`, `src/data/projects.json` |
| C2 - Skill Detail Pages (`/skills/[skill]`) | New Astro dynamic route showing all projects for a given skill | active | `src/pages/projects/[id].astro` (pattern exists) |
| C3 - Skill Filter Rewrite | Update filter to use new hierarchy (genre tabs → skill chips) | active | `src/components/SkillFilter.astro` |
| C4 - Online Hosting Setup | Deploy to a cheap/free service (GitHub Pages is already configured) | active | `astro.config.mjs`, `.github/workflows/deploy.yml` |
| C5 - Editing/Publishing System | Simple data-editing workflow for projects that may live on cloud/other repos | active | `src/data/projects.json` (will extend) |

## Open assumptions (announced defaults)
| assumption | adopted default | rationale | reversible? |
|-----------|----------------|-----------|-------------|
| Hosting provider | GitHub Pages (free, already configured in repo) | Currently set up, zero cost. The Azure Student Plan can be used if GitHub Pages has issues. | Yes (can switch to Azure Static Web Apps anytime) |
| Skill taxonomy structure | 3-level hierarchy: Genre → Skill → Project | User gave "Programming→Python→Calculator" as example. This maps cleanly to Astro routes. | Yes (taxonomy is data-driven, easy to restructure) |
| Data format | JSON file (`skills.json` schema) stays editor-friendly | User wants to edit items themselves; JSON is the simplest format they already use. | Yes (can migrate to YAML/MD later) |
| Cloud items | Represented as "external" flag in projects with a link field | User mentioned some projects are on cloud/other computers. External link solves this without moving code. | Yes |
| Tag routes structure | `/skills/[genre]/[skill]` pages | Hierarchical URLs are intuitive and match the layered taxonomy. | Yes |
| No backend/admin UI | Manual JSON editing + `npm run build` | User asked for "a system to edit", but a full admin panel is overkill for a static site. JSON editing with clear docs is sufficient. | Yes (can add CMS later) |

## Findings (cited - path:lines)

### Current Architecture
1. **Data layer**: Projects stored in `src/data/projects.json` (13 projects, each with `id`, `title`, `description`, `year`, `category`, `skills[]`, `image`, `links`, `highlights`)
2. **Skill taxonomy**: Defined in `src/data/skills.js` - 8 flat categories mapping to ~40+ skills. `getAllSkills()` returns a flat sorted array. `getSkillCategories()` groups them into the 8 buckets.
3. **Skill filter UI**: `src/components/SkillFilter.astro` - renders flat skill buttons. Clicking filters projects on the same page via client-side JS. No URL routing for skills.
4. **Project detail pages**: `src/pages/projects/[id].astro` - dynamic routes for each project. Skills link back to `/#${skill}` (anchor only, no page).
5. **Homepage**: `src/pages/index.astro` - uses `SkillFilter` + `ProjectGrid`.
6. **Deployment**: Already configured for GitHub Pages via `astro.config.mjs` (site: `Ed-Lam-11111010010.github.io`, base: `/portfolio`) with `.github/workflows/deploy.yml` (GitHub Actions). Also has PWA support (`public/sw.js`, `manifest.json`).
7. **Styling**: Single `src/styles/global.css` with CSS custom properties (light/dark theme).

### Current Skill Category Flat List (from `skills.js`)
- **Languages**: python, javascript, html/css, c, gdscript
- **Frameworks & Engines**: phaser.js, godot, pygame
- **AI & ML**: gemini api, ai/ml
- **Creative & Design**: game design, graphic design, affinity designer, pixel art, aseprite, photoshop, logo design, creative writing, ttrpg design, worldbuilding, content creation, script writing
- **Tools & Platforms**: wix, wordpress, readthedocs, sphinx, tabletop simulator, git, cli tools, product/website setup
- **Development**: web dev, embedded systems, arm/stm32, microcontroller programming, testing, pytest
- **Multimedia**: video production, video editing, voice over, subtitling
- **Leadership & Management**: event management, leadership, budgeting, team management, documentation

### Projects by current category (from `projects.json`)
- `ai-game-dev` (1): AI Guild Master
- `game-dev` (2): Jewel Smash, Christmas New Game Idea
- `game-design` (1): InnoPort Board Game
- `documentation` (1): Intern Life 2024
- `programming` (3): Calculator, Greeting, C Programming
- `web-dev` (1): IERG 4210 Web Project
- `multimedia` (1): Infotainment Video Production
- `leadership` (1): Film Society
- `creative` (2): Pixel Art & Graphic Design, D&D Campaign

## Decisions (with rationale)

### D1: Hierarchical Taxonomy
Proposed 3-level genus→species→specimen hierarchy:

**Genre** (broad domain) → **Skill** (specific capability) → **Project** (work that uses it)

Example:
```
Programming
  ├── Python
  │   ├── Calculator Project (local)
  │   ├── Greeting Project (local)
  │   └── AI Guild Master (local)
  ├── C
  │   └── C Programming & Embedded Systems (local)
  ├── JavaScript
  │   └── IERG 4210 Web Project (local)
  └── GDScript
      └── Christmas New Game Idea 2025 (local)
```

Full proposed taxonomy in the plan.

### D2: Skill Routes
New Astro page: `src/pages/skills/[genre]/[skill].astro` - shows all projects tagged with that skill, filtered by the genre's skill list.

Homepage filter updates to show genre tabs first, then skills within the selected genre.

### D3: External/Cloud Projects
Add an optional `"external": true` flag and `"source_url": "..."` field to projects that live outside this repo (e.g., on GitHub, cloud drives). These get a special badge showing they're hosted externally.

### D4: Data Editing Workflow
Extend `src/data/` with a new `skills.json` that defines the hierarchical taxonomy separately. Keep `projects.json` for project data. Document the schema in a README update so you can edit items manually.

### D5: Hosting
**Keep GitHub Pages** (already configured, free). If that's not working:
- Ensure the repo is pushed to `Ed-Lam-11111010010/portfolio` on GitHub
- Enable GitHub Pages in repo settings (Source: GitHub Actions)
- OR use Azure Static Web Apps (free tier, $0/month) for similar performance

## Scope IN
1. Restructure `skills.js` → `skills.json` with hierarchical taxonomy
2. Update `projects.json` to reference hierarchical skills
3. Create `/skills/[genre]/[skill].astro` dynamic routes
4. Rewrite `SkillFilter.astro` to show Genre→Skill drill-down
5. Update `ProjectCard.astro` and `[id].astro` skill links to point to skill pages
6. Add external/cloud project support
7. Document the editing workflow
8. Verify/repair GitHub Pages deployment

## Scope OUT (Must NOT have)
- No backend server or database (static-only)
- No admin dashboard/UI (editing is via JSON + `npm run build`)
- No authentication/login system
- No changing the Astro framework or its version
- No redesign of the visual theme (colors, layout remain)
- No moving existing projects out of this repo
- No cloud migration of project code (only adding links)

## Approval gate
status: awaiting-approval
plan-file: .omo/plans/portfolio-overhaul.md
User decisions recorded: hierarchical taxonomy default accepted, GitHub Pages hosting confirmed, external project links confirmed.
<!-- When exploration is exhausted and unknowns are answered, set status: awaiting-approval. -->
<!-- That durable record is the loop guard: on a later turn read it and resume at the gate instead of re-running exploration. -->
