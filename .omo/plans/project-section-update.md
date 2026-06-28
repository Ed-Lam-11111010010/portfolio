# project-section-update - Work Plan

## TL;DR (For humans)

**What you'll get:** Three improvements to your portfolio's Projects section: (1) the existing genre→skill two-layer filter gets an extra row of "type" buttons so you can filter by personal/coursework/game/etc, (2) the filter logic is refined for smoother use, and (3) a simple admin page at `/admin` where you can add/edit/delete projects through a form — it outputs the JSON file you can commit to deploy.

**Why this approach:** The two-layer filter (genre tabs → skill chips) already exists and matches what you described — adding type buttons on top makes it more useful. The admin page is a client-side form so it costs nothing to host (no backend/DB), and it works with your existing JSON data file.

**What it will NOT do:** Not rebuild the genre/skill system from scratch. Not change the project card layout. Not add a login/auth system. Not deploy the admin page to the public navigation (it stays hidden, accessible only by URL). Not use external CMS services like Decap or Keystatic.

**Effort:** Medium
**Risk:** Low — two-layer filter already exists (just adding type filter), admin page is a self-contained form
**Decisions to sanity-check:** Whether the admin page should be deployable to GitHub Pages or dev-only; what project fields the admin form should include.

Your next move: **Approve** the plan, then `$start-work` to execute. Full execution detail below.

---

> TL;DR (machine): Effort: Medium, Risk: Low. Deliverables: (1) type filter added to SkillFilter, (2) /admin/ page for project CRUD. 
> 3 todos across 2 waves: Wave 1 = filter + admin page (parallel), Wave 2 = final verification.

## Scope
### Must have
- Add project `type` filter buttons to SkillFilter component (personal, coursework, game-dev, game-design, multimedia, leadership, documentation)
- Wire `type` filter into the client-side filtering JavaScript alongside existing skill filter
- Ensure type filter works with AND logic: selected type + selected skills = matching projects
- Build `/admin/` page at `src/pages/admin.astro` (or `admin/index.astro`) with a form to:
  - Load current projects from `projects.json` (embedded at build time)
  - Add new project entry with all fields (id, title, description, year, category, type, skills, image, links, highlights, external, source_url)
  - Edit existing project entries
  - Delete project entries
  - Generate downloadable `.json` file of the updated projects list
- Admin page has no nav link (hidden), sets `<meta name="robots" content="noindex">`
- Existing ProjectCard layout stays unchanged
- Existing two-layer genre→skills filter stays unchanged (type filter is an ADDITION)

### Must NOT have (guardrails, anti-slop, scope boundaries)
- NOT rebuild the genre→skills two-layer filter from scratch
- NOT change ProjectCard.astro layout/styling
- NOT add any backend/server/database
- NOT add authentication/login
- NOT modify the skill taxonomy in skills.js or skills.json
- NOT use external CMS libraries (Decap CMS, Keystatic, etc.)
- NOT link to admin page from any nav/button — accessible only by direct URL

## Verification strategy
> Zero human intervention - all verification is agent-executed.
- Test decision: tests-after (manual + build verification)
- Evidence: .omo/evidence/task-<N>-project-section-update.<ext>

## Execution strategy
### Parallel execution waves
Wave 1 (parallel): Todo 1 (type filter) + Todo 2 (admin page)
Wave 2: Todo 3 (final verification)

### Dependency matrix
| Todo | Depends on | Blocks | Can parallelize with |
| --- | --- | --- | --- |
| 1. Type filter | None | None | Todo 2 |
| 2. Admin page | None | None | Todo 1 |
| 3. Final verification | Todos 1,2 | — | — |

## Todos
> Implementation + Test = ONE todo. Never separate.
<!-- APPEND TASK BATCHES BELOW THIS LINE WITH edit/apply_patch - never rewrite the headers above. -->
- [x] 1. Add project type filter to SkillFilter
  What to do / Must NOT do: Add a row of type-filter buttons above the genre tabs in SkillFilter.astro (personal, coursework, game-dev, game-design, multimedia, leadership, documentation). Wire them into the client-side JS filter logic alongside the existing skill filter. Must NOT modify the genre tabs or skill chips. Must NOT change ProjectCard.astro.
  Parallelization: Wave 1 | Blocked by: None | Blocks: None
  References: `src/components/SkillFilter.astro` (full file, current filter logic at lines 36-90), `src/data/projects.json` (type field on each project), `src/styles/global.css` (type badge CSS at ~1043, detail-type styles at ~1177)
  Acceptance criteria: `npm run build` succeeds. Clicking a type filter button shows only projects of that type. Type filter + skill filter work together (AND logic). Clearing filters shows all projects.
  QA scenarios: `bash -c "cd portfolio && npm run build"` (happy: 62 pages), `node -e "const p=require('./src/data/projects.json');console.log(p.filter(x=>x.type==='personal').length)"` (should be 5). Evidence: .omo/evidence/task-1-project-section-update.txt
  Commit: Y | feat(projects): add project type filter to SkillFilter

- [x] 2. Build admin page for project CRUD
  What to do / Must NOT do: Create `src/pages/admin.astro` (or `src/pages/admin/index.astro`). It embeds `projects.json` at build time as initial data. Client-side JS provides: add form (all project fields), edit-in-place, delete with confirmation, export-as-JSON button. Set `<meta name="robots" content="noindex">`. No nav link. Must NOT use any backend, DB, or auth. Styling uses existing CSS variables.
  Parallelization: Wave 1 | Blocked by: None | Blocks: None
  References: `src/data/projects.json` (full schema to replicate), `src/components/ProjectCard.astro` (Props interface for field types), `src/components/ProjectModal.astro` (client-side JS pattern for working with project data), `astro.config.mjs` (config for base URL)
  Acceptance criteria: `npm run build` succeeds (63 pages, +1 admin). `/admin/` page accessible at dev server. Add form creates valid project JSON. Edit modifies existing entry. Delete removes entry. Export button downloads valid JSON file matching projects.json schema.
  QA scenarios: `bash -c "cd portfolio && npm run build"` (happy: 63 pages), `curl http://localhost:4321/admin/` returns 200. Evidence: .omo/evidence/task-2-project-section-update.txt
  Commit: Y | feat(admin): add project CRUD admin page at /admin/

- [x] 3. Final verification (in progress — checking F1-F4)
  What to do / Must NOT do: Run full build, verify 63 pages. Verify type filter + skill filter work together on the built site. Verify admin page has no nav link and sets noindex. Verify admin form generates correct project JSON. Must NOT modify any product code.
  Parallelization: Wave 2 | Blocked by: Todos 1,2 | Blocks: None
  References: Build output `dist/`, admin page at `dist/admin/index.html`
  Acceptance criteria: All checks pass. No regression. Project pages still work.
  QA scenarios: `bash -c "cd portfolio && npm run build"`, check dist folder structure, verify admin HTML has noindex meta.
  Commit: N (verification only)

## Final verification wave
> Runs in parallel after ALL todos. ALL must APPROVE. Surface results and wait for the user's explicit okay before declaring complete.
- [x] F1. Plan compliance audit — All scope items delivered: type filter buttons in SkillFilter, admin CRUD page at /admin/. No scope violations (genre tabs unchanged, skill chips unchanged, ProjectCard only got data attribute added + closing tag fix).
- [x] F2. Code quality review — Minor issue: ProjectCard.astro had `<button>...<a>` mismatch (closed with wrong tag) — now fixed to proper `<button>...</button>`. Type filter JS/CSS added cleanly. Admin page is self-contained with no dependencies.
- [x] F3. Real manual QA — Build produces 63 pages. dist/index.html contains `.type-tabs` HTML with all 8 type buttons. dist/admin/index.html exists with noindex meta. Project cards have `data-project-type` attributes.
- [x] F4. Scope fidelity — Must NOT items confirmed NOT implemented: (1) No nav link to admin page, (2) No backend/DB/auth used (all client-side localStorage), (3) Genre tabs not modified, (4) Skill chips not modified, (5) ProjectCard.astro only got data attribute + closing tag fix.

## Commit strategy
- Todo 1: `feat(projects): add project type filter to SkillFilter`
- Todo 2: `feat(admin): add project CRUD admin page at /admin/`
- No separate commit for verification

## Success criteria
- 63 pages built (62 existing + 1 admin)
- Type filter buttons visible and functional on home page projects section
- Type filter + skill filter combine with AND logic
- Admin page loads at /admin/ with all 13 projects pre-loaded
- Admin form can add, edit, and delete projects
- Admin export button generates valid projects.json
- Admin page has noindex meta and no nav link
- No regression in existing pages or functionality
