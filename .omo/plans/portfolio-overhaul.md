# portfolio-overhaul - Work Plan

## TL;DR (For humans)

**What you'll get:** Your portfolio will have a clean skill browser — click a genre ("Programming" → see all programming skills), click a skill ("Python" → see all projects using Python). Projects that live on GitHub or other computers can also be listed with a link. And it'll be live on the internet via GitHub Pages (free).

**Why this approach:** The current flat tag list (40+ buttons) is overwhelming. Grouping into Genre→Skill→Project matches how a recruiter thinks: "What does Edwin know? Python. What did he build with it? These 3 things." JSON editing is what you already use — no new tool to learn.

**What it will NOT do:** No login system, no database, no admin dashboard, no visual redesign. Theme, layout, and all 13 projects stay exactly as they are — only the navigation changes.

**Effort:** Medium
**Risk:** Low - all changes are additive (new files, new routes) or data-format changes to existing files
**Decisions to sanity-check:** The 9-genre taxonomy (adjustable later via JSON), external project flag behavior

Your next move: Approve this plan (or request changes). Once approved, say `$start-work` to execute.

---

> TL;DR (machine): Medium effort, Low risk. Create hierarchical skills.json, 9 genres, skill detail pages, external project support, GitHub Pages deployment.

## Scope
### Must have
1. Replace flat `skills.js` with hierarchical `skills.json` (Genre→Skill→Project mapping)
2. Create `/skills/[genre]/[skill].astro` dynamic route pages
3. Rewrite `SkillFilter.astro` to show genre tabs → skill chips drill-down
4. Update `ProjectCard.astro` and `[id].astro` skill links to point to new skill pages
5. Add `external` + `source_url` fields to projects.json for cloud/offline projects
6. Render external project badges in cards and detail pages
7. Verify GitHub Pages deployment works (push, enable Pages, confirm build)
8. Update README with editing workflow documentation

### Must NOT have (guardrails, anti-slop, scope boundaries)
- No backend, database, or API — static site only
- No admin panel or CMS
- No authentication
- No visual redesign or theme changes
- No Astro framework version changes
- No removal or relocation of existing project files
- No image/asset optimization or addition
- No changes to PWA manifest or service worker

## Verification strategy
- Test decision: tests-after — verify each route renders correctly via `npm run build` + file-existence checks on `dist/`
- Evidence: `.omo/evidence/task-<N>-portfolio-overhaul/` — one dir per task

## Execution strategy
### Parallel execution waves
- **Wave 1** (data layer): Tasks 1-2 — create skills.json, update projects.json
- **Wave 2** (routes + components): Tasks 3-5 — skill pages, filter rewrite, link updates
- **Wave 3** (external + deploy): Tasks 6-7 — external projects, deployment
- **Wave 4** (docs): Task 8 — README + final verification

### Dependency matrix
| Todo | Depends on | Blocks | Can parallelize with |
| --- | --- | --- | --- |
| 1. Create skills.json | — | 2, 3, 4 | — |
| 2. Update projects.json | — | 3, 4, 6 | 1 |
| 3. Create skill pages | 1, 2 | 5 | 4 |
| 4. Rewrite SkillFilter | 1, 2 | — | 3 |
| 5. Update skill links | 3 | — | 4 |
| 6. External projects support | 2 | — | 3, 4, 5 |
| 7. GitHub Pages deploy | — | 8 | 1, 2, 3, 4, 5, 6 |
| 8. README + docs | 7 | — | — |

## Todos

- [ ] 1. **Create `src/data/skills.json` with hierarchical taxonomy**
  What to do / Must NOT do: Create a new JSON file that defines 9 genres, each with skills, and each skill lists the project IDs that use it. Must NOT edit existing files yet. Use UTF-8 without BOM. Schema:
  ```json
  {
    "genres": [
      {
        "name": "Programming Languages",
        "slug": "programming",
        "skills": [
          {
            "name": "Python",
            "slug": "python",
            "projectIds": ["calculator-project", "greeting-project", "ai-guild-master-fyp"]
          },
          {
            "name": "C",
            "slug": "c",
            "projectIds": ["c-programming-university", "jewel-smash-game"]
          },
          {
            "name": "JavaScript",
            "slug": "javascript",
            "projectIds": ["ierg-4210-web-project"]
          },
          {
            "name": "GDScript",
            "slug": "gdscript",
            "projectIds": ["christmas-game-2025"]
          },
          {
            "name": "Testing (pytest)",
            "slug": "testing",
            "projectIds": ["calculator-project"]
          },
          {
            "name": "Git",
            "slug": "git",
            "projectIds": ["calculator-project", "greeting-project"]
          },
          {
            "name": "CLI Tools",
            "slug": "cli-tools",
            "projectIds": ["calculator-project"]
          }
        ]
      },
      {
        "name": "Game Development",
        "slug": "game-dev",
        "skills": [
          {
            "name": "Phaser.js",
            "slug": "phaser-js",
            "projectIds": ["ai-guild-master-fyp"]
          },
          {
            "name": "Godot",
            "slug": "godot",
            "projectIds": ["christmas-game-2025"]
          },
          {
            "name": "PyGame",
            "slug": "pygame",
            "projectIds": ["jewel-smash-game"]
          },
          {
            "name": "Game Dev (general)",
            "slug": "game-dev-general",
            "projectIds": ["ai-guild-master-fyp", "jewel-smash-game", "christmas-game-2025"]
          }
        ]
      },
      {
        "name": "AI & Machine Learning",
        "slug": "ai-ml",
        "skills": [
          {
            "name": "Gemini API",
            "slug": "gemini-api",
            "projectIds": ["ai-guild-master-fyp"]
          },
          {
            "name": "AI/ML",
            "slug": "ai-ml",
            "projectIds": ["ai-guild-master-fyp"]
          }
        ]
      },
      {
        "name": "Web Development",
        "slug": "web-dev",
        "skills": [
          {
            "name": "HTML/CSS",
            "slug": "html-css",
            "projectIds": ["ierg-4210-web-project"]
          },
          {
            "name": "JavaScript (Web)",
            "slug": "javascript-web",
            "projectIds": ["ierg-4210-web-project"]
          },
          {
            "name": "Web Dev (general)",
            "slug": "web-dev-general",
            "projectIds": ["ierg-4210-web-project"]
          },
          {
            "name": "Wix",
            "slug": "wix",
            "projectIds": ["intern-life-2024"]
          },
          {
            "name": "WordPress",
            "slug": "wordpress",
            "projectIds": ["intern-life-2024"]
          }
        ]
      },
      {
        "name": "Embedded Systems",
        "slug": "embedded-systems",
        "skills": [
          {
            "name": "ARM/STM32",
            "slug": "arm-stm32",
            "projectIds": ["jewel-smash-game", "c-programming-university"]
          },
          {
            "name": "Embedded Systems (general)",
            "slug": "embedded-systems-general",
            "projectIds": ["jewel-smash-game", "c-programming-university"]
          },
          {
            "name": "Microcontroller Programming",
            "slug": "microcontroller-programming",
            "projectIds": ["c-programming-university"]
          }
        ]
      },
      {
        "name": "Creative & Design",
        "slug": "creative-design",
        "skills": [
          {
            "name": "Game Design",
            "slug": "game-design",
            "projectIds": ["innoport-board-game"]
          },
          {
            "name": "Graphic Design",
            "slug": "graphic-design",
            "projectIds": ["innoport-board-game", "pixel-art-graphic-design", "film-society-yingto"]
          },
          {
            "name": "Affinity Designer",
            "slug": "affinity-designer",
            "projectIds": ["innoport-board-game", "pixel-art-graphic-design"]
          },
          {
            "name": "Pixel Art",
            "slug": "pixel-art",
            "projectIds": ["pixel-art-graphic-design"]
          },
          {
            "name": "Aseprite",
            "slug": "aseprite",
            "projectIds": ["pixel-art-graphic-design"]
          },
          {
            "name": "Photoshop",
            "slug": "photoshop",
            "projectIds": ["pixel-art-graphic-design"]
          },
          {
            "name": "Logo Design",
            "slug": "logo-design",
            "projectIds": ["pixel-art-graphic-design"]
          },
          {
            "name": "Product Design",
            "slug": "product-design",
            "projectIds": ["innoport-board-game"]
          },
          {
            "name": "Creative Writing",
            "slug": "creative-writing",
            "projectIds": ["dnd-empire-ants"]
          },
          {
            "name": "TTRPG Design",
            "slug": "ttrpg-design",
            "projectIds": ["dnd-empire-ants"]
          },
          {
            "name": "Worldbuilding",
            "slug": "worldbuilding",
            "projectIds": ["dnd-empire-ants"]
          },
          {
            "name": "Content Creation",
            "slug": "content-creation",
            "projectIds": ["infotainment-video-production"]
          },
          {
            "name": "Script Writing",
            "slug": "script-writing",
            "projectIds": ["infotainment-video-production"]
          }
        ]
      },
      {
        "name": "Multimedia Production",
        "slug": "multimedia",
        "skills": [
          {
            "name": "Video Production",
            "slug": "video-production",
            "projectIds": ["infotainment-video-production"]
          },
          {
            "name": "Video Editing",
            "slug": "video-editing",
            "projectIds": ["infotainment-video-production"]
          },
          {
            "name": "Voice Over",
            "slug": "voice-over",
            "projectIds": ["infotainment-video-production"]
          },
          {
            "name": "Subtitling",
            "slug": "subtitling",
            "projectIds": ["infotainment-video-production"]
          }
        ]
      },
      {
        "name": "Leadership & Management",
        "slug": "leadership",
        "skills": [
          {
            "name": "Event Management",
            "slug": "event-management",
            "projectIds": ["film-society-yingto"]
          },
          {
            "name": "Leadership",
            "slug": "leadership",
            "projectIds": ["film-society-yingto"]
          },
          {
            "name": "Team Management",
            "slug": "team-management",
            "projectIds": ["film-society-yingto"]
          },
          {
            "name": "Budgeting",
            "slug": "budgeting",
            "projectIds": ["film-society-yingto"]
          },
          {
            "name": "Documentation",
            "slug": "documentation",
            "projectIds": ["intern-life-2024"]
          }
        ]
      },
      {
        "name": "Tools & Platforms",
        "slug": "tools-platforms",
        "skills": [
          {
            "name": "ReadTheDocs",
            "slug": "readthedocs",
            "projectIds": ["intern-life-2024"]
          },
          {
            "name": "Sphinx",
            "slug": "sphinx",
            "projectIds": ["intern-life-2024"]
          },
          {
            "name": "Tabletop Simulator",
            "slug": "tabletop-simulator",
            "projectIds": ["innoport-board-game"]
          },
          {
            "name": "Product/Website Setup",
            "slug": "product-website-setup",
            "projectIds": ["intern-life-2024"]
          }
        ]
      }
    ]
  }
  ```
  Parallelization: Wave 1 | Blocked by: — | Blocks: 2, 3, 4
  References: `projects.json` (all 13 project IDs)
  Acceptance criteria: File exists at `src/data/skills.json`, valid JSON, every `projectId` matches an existing project ID in `projects.json`. Run: `node -e "const s=require('./src/data/skills.json');const p=require('./src/data/projects.json');const pids=p.map(x=>x.id);s.genres.forEach(g=>g.skills.forEach(sk=>sk.projectIds.forEach(id=>{if(!pids.includes(id))throw Error('Bad ref: '+id)})));console.log('All refs valid')"`
  QA scenarios: happy: script passes (all projectIds match). failure: introduce a bad projectId → script throws. Evidence: `.omo/evidence/task-1-portfolio-overhaul/`
  Commit: Y | `feat(data): create hierarchical skills.json with 9-genre taxonomy`

- [ ] 2. **Update `projects.json` with external/source_url fields**
  What to do / Must NOT do: Add optional `external: boolean` (default false) and `source_url: string | null` fields to every project entry. For projects currently lacking a github link but that exist on GitHub, set `external: true` and fill `source_url`. Projects already on GitHub keep `external: false`. Must NOT change any existing `id`, `title`, `description`, `year`, `category`, `skills`, `image`, `highlights` fields. Only ADD the two new fields.
  Which projects get `external: true`:
  - `c-programming-university`: already has a github link (`Ed-Lam-11111010010/Ed`) → keep `external: false`, set `source_url` to the github link
  - `intern-life-2024`, `calculator-project`, `greeting-project`, `jewel-smash-game`, `christmas-game-2025`, `ai-guild-master-fyp`: already have github links → keep `external: false`
  - Projects without github links and known cloud location → mark `external: true`:
    - `innoport-board-game`: `external: true`, `source_url: "https://github.com/Ed-Lam-11111010010"` (general profile, or specify if you have a private repo)
    - `pixel-art-graphic-design`: `external: true`, `source_url: null` (user notes "some skills or parts are not in this computer")
    - `film-society-yingto`, `dnd-empire-ants`, `infotainment-video-production`, `ierg-4210-web-project`: if they exist on cloud but not in this repo, mark `external: true` and add link if known
  Parallelization: Wave 1 | Blocked by: — | Blocks: 3, 4, 6
  References: `src/data/projects.json:1-252`
  Acceptance criteria: `node -e "const p=require('./src/data/projects.json');p.forEach(x=>{if(x.external===undefined)throw Error('Missing external');if(!('source_url' in x))throw Error('Missing source_url')});console.log('All have external+source_url fields')"`
  QA scenarios: happy: all 13 projects have external+source_url. failure: missing fields → script throws.
  Commit: Y | `feat(data): add external and source_url fields to projects.json`

  **IMPORTANT: By default, set all existing projects to `external: false` and `source_url: <existing github link or null>`. Only the user can tell you which non-GitHub projects truly live on cloud. Use `external: false` as safe default.**

- [ ] 3. **Create skill detail pages at `src/pages/skills/[genre]/[skill].astro`**
  What to do / Must NOT do: Create a new Astro dynamic route page. It reads `skills.json` to find the genre+skill, then `projects.json` to load matching projects. Renders:
  - Breadcrumb: Home → `{Genre Name}` → `{Skill Name}`
  - List of project cards (reuse ProjectCard component) that use this skill
  - Back link to homepage
  - 404 if genre/skill slug doesn't exist
  Must NOT create a static path for every combination — use `getStaticPaths()` from skills.json.
  Must NOT modify existing files.
  Parallelization: Wave 2 | Blocked by: 1, 2 | Blocks: 5
  References: `src/pages/projects/[id].astro:1-75` (use as pattern), `src/data/skills.json`, `src/data/projects.json`
  Acceptance criteria: `npm run build` succeeds and creates `dist/skills/*/index.html` files for every skill. Run: `Get-ChildItem -Path dist/skills -Recurse -Filter "index.html" | ForEach-Object { $_.FullName }` (should show ~40+ files).
  QA scenarios: happy: build succeeds, skill pages exist. failure: visit `/skills/nonexistent/gen` → 404 page.
  Evidence: `.omo/evidence/task-3-portfolio-overhaul/`
  Commit: Y | `feat(route): add /skills/[genre]/[skill] dynamic pages`

- [ ] 4. **Rewrite SkillFilter.astro with genre→skill drill-down**
  What to do / Must NOT do: Replace the flat button list with a two-level UI:
  - Row 1: Genre tabs (buttons for each genre name, e.g., "Programming", "Game Dev", "AI/ML"…)
  - Row 2: Skill chips within the selected genre (shown when a genre tab is active)
  - A "Clear all" button
  - Client-side JS: selecting a genre shows that genre's skills; selecting a skill filters projects
  - Skill buttons link to the new `/skills/[genre]/[skill]` pages
  Must NOT break the existing project filtering behavior. Must NOT change `ProjectGrid` or `ProjectCard`.
  Must use the new `skills.json` data (import it directly or via a helper).
  Parallelization: Wave 2 | Blocked by: 1, 2 | Blocks: —
  References: `src/components/SkillFilter.astro:1-66`, `src/data/skills.json`
  Acceptance criteria: `npm run build` succeeds. On the homepage, genre tabs appear and clicking one reveals its skills.
  QA scenarios: happy: click genre → skills appear, click skill → projects filtered. failure: empty genre (no skills) → nothing breaks.
  Evidence: `.omo/evidence/task-4-portfolio-overhaul/`
  Commit: Y | `feat(ui): rewrite SkillFilter with hierarchical genre→skill drill-down`

- [ ] 5. **Update skill links in ProjectCard.astro and [id].astro**
  What to do / Must NOT do: Change skill link targets from `/#${skill}` (anchor-only) to `/skills/${genreSlug}/${skillSlug}` (real page). This requires finding the genre for each skill. Since a skill can belong to only one genre, use the first match from skills.json.
  - In `ProjectCard.astro`: update the `data-skill` buttons to be `<a href="/skills/${genreSlug}/${skillSlug}">` instead of `<button data-skill={skill}>`
  - In `[id].astro` line 42: change `<a href="/#${skill}">` to `<a href="/skills/${findGenre(skill)}/${skillSlug}">`
  - Add a helper function `getSkillGenre(skill)` in a shared utility (or inline in both files) that looks up skills.json
  Must NOT break project card layout or detail page layout.
  Parallelization: Wave 2 | Blocked by: 3 | Blocks: —
  References: `src/components/ProjectCard.astro:38-44`, `src/pages/projects/[id].astro:41-43`, `src/data/skills.json`
  Acceptance criteria: All skill links point to `/skills/*/*` paths. Run: `npm run build && Select-String -Path dist/**/*.html -Pattern 'href="/skills/' | Measure-Object | Select-Object Count` → count should be > number of skills (each appears on card + detail page).
  QA scenarios: happy: click any skill tag → navigates to skill page. failure: skill not found in skills.json → gracefully shows "Unknown skill" or 404s.
  Evidence: `.omo/evidence/task-5-portfolio-overhaul/`
  Commit: Y | `feat(ui): update skill links to point to hierarchical skill pages`

- [ ] 6. **Render external project badges in cards and detail pages**
  What to do / Must NOT do: In `ProjectCard.astro` and `[id].astro`, when `project.external === true`, show a small badge/label "📦 External" or "🔗 Cloud" next to the project title or year, and show the `source_url` link prominently (e.g., "View on Cloud →" button). External project cards should look slightly different (dashed border, subtle indicator) but still be clickable.
  - Add CSS for `.project-card.external` (dashed border style) in `global.css`
  - In `ProjectCard.astro`: add conditional badge + border class
  - In `[id].astro`: add "View on Cloud" button similar to "View on GitHub" button
  Must NOT remove any existing functionality. Must NOT change non-external projects visually.
  Parallelization: Wave 3 | Blocked by: 2 | Blocks: —
  References: `src/components/ProjectCard.astro:24-47`, `src/pages/projects/[id].astro:57-73`, `src/styles/global.css:312-399`
  Acceptance criteria: Projects with `external: true` show the badge. Run: `node -e "const p=require('./src/data/projects.json');console.log('External count:', p.filter(x=>x.external).length)"` — verify those render differently.
  QA scenarios: happy: external project shows badge + cloud link. failure: non-external project shows no badge.
  Evidence: `.omo/evidence/task-6-portfolio-overhaul/`
  Commit: Y | `feat(ui): add external project badges and cloud source links`

- [ ] 7. **Verify & repair GitHub Pages deployment**
  What to do / Must NOT do:
  1. Check if the repository is pushed to `Ed-Lam-11111010010/portfolio` on GitHub via `git remote -v` and `git status`
  2. If no remote set, instruct user to create the GitHub repo and push:
     ```
     gh repo create Ed-Lam-11111010010/portfolio --public --push --source=.
     ```
     (or manually create on GitHub.com then `git remote add origin https://github.com/Ed-Lam-11111010010/portfolio.git && git push -u origin main`)
  3. Verify `.github/workflows/deploy.yml` is correct for Astro 6 (it's currently set to Node 20)
  4. Verify `astro.config.mjs` has correct `site` and `base`
  5. Verify that GitHub Pages is enabled in repo Settings → Pages → Source: "GitHub Actions"
  6. Run `npm run build` to confirm the site builds to `dist/` without errors
  7. After deployment, verify the site is accessible at `https://Ed-Lam-11111010010.github.io/portfolio/`
  Must NOT change any existing workflow or config files unless broken. Must NOT deploy to any other platform.
  Parallelization: Wave 3 | Blocked by: — | Blocks: 8
  References: `.github/workflows/deploy.yml:1-46`, `astro.config.mjs:1-8`
  Acceptance criteria: `npm run build` succeeds. If remote is set, `git push` triggers GitHub Actions and the site goes live.
  QA scenarios: happy: site builds, deploys, accessible at the URL. failure: build error → fix and rebuild.
  Evidence: `.omo/evidence/task-7-portfolio-overhaul/`
  Commit: N (infrastructure, no code changes unless fixes needed)

- [ ] 8. **Update README with editing workflow documentation**
  What to do / Must NOT do: Update `README.md` to document:
  1. **Adding a New Project**: Steps to edit `projects.json` (show the full schema including `external` and `source_url` fields)
  2. **Adding a New Skill**: Steps to edit `skills.json` (add to appropriate genre, link to project IDs)
  3. **Adding a New Genre**: Steps to add a new genre block in `skills.json`
  4. **Marking a Project as External/Cloud**: Set `external: true` and `source_url` to the link
  5. **Deploying**: Push to GitHub, GitHub Actions auto-deploys
  6. **Local Development**: `npm install`, `npm run dev`, `npm run build`
  Must NOT remove or change any existing README content — only append the new sections.
  Parallelization: Wave 4 | Blocked by: 7 | Blocks: —
  References: `README.md:1-42` (current content)
  Acceptance criteria: `README.md` contains the 6 documentation sections above. Verify with: `Select-String -Path README.md -Pattern "Adding a New Project|Adding a New Skill|Adding a New Genre|Marking a Project as External|Deploying|Local Development"`
  QA scenarios: happy: all 6 sections present. failure: missing section → add it.
  Evidence: `.omo/evidence/task-8-portfolio-overhaul/`
  Commit: Y | `docs: update README with hierarchical taxonomy editing workflow`

## Final verification wave
- [ ] F1. **Plan compliance audit**: Verify all 8 tasks are completed, commit messages match plan.
- [ ] F2. **Code quality review**: Check for unused imports, broken links, console errors.
- [ ] F3. **Build verification**: `npm run build` must succeed with zero errors.
- [ ] F4. **Scope fidelity**: Confirm no visual redesign, no backend, no framework changes were made.

## Commit strategy
- Commit after EVERY task (8 commits total)
- Format: `type(scope): message` as specified per task
- No amend, no force-push, no squashing unless explicitly requested
- Master commit at the end is optional (user can keep individual commits for clarity)

## Success criteria
1. Homepage shows genre tabs → clicking reveals skill chips → clicking filters projects
2. Each skill has a dedicated page at `/skills/[genre]/[skill]` showing all its projects
3. External projects display a "Cloud" badge and link
4. The site is live at `https://Ed-Lam-11111010010.github.io/portfolio/`
5. README documents how to add/edit projects, skills, and genres
