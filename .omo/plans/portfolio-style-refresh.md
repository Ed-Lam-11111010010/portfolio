# portfolio-style-refresh - Work Plan

## TL;DR (For humans)

**What you'll get:** A polished, animated portfolio that looks like the Codehal reference video. Your skill tags become a scrollable slider. The "C" tag bug that wouldn't show Jewel Smash is fixed. LinkedIn appears in the hero. The whole site gets smooth scroll animations, a typing name effect, animated skill bars, a hamburger menu, and a contact section — all while keeping your existing projects, detail pages, and dark/light theme.

**Why this approach:** Three lightweight CDN libraries (AOS, Typed.js, BoxIcons) give the full animated experience without any build config, framework migration, or npm complexity. Everything stays Astro + vanilla CSS + vanilla JS — the same stack you already have.

**What it will NOT do:**
- Will NOT change your project detail pages or skill detail pages (they get new theme colors but keep their layout)
- Will NOT add a backend or database (contact form is static UI with mailto)
- Will NOT change your JSON data model structure (only adds optional `level` fields for skill bars)
- Will NOT remove the dark/light theme toggle

**Effort:** Medium (7-9 focused tasks)
**Risk:** Low — each task is scoped to 1-3 files with clear before/after
**Decisions to sanity-check:** Skill level values for animated bars (default: proportional to project count), contact form design (static mailto vs form service), whether to keep existing hero profile info alongside new elements

Your next move: approve the plan below, then say "start work" when ready.

---

> TL;DR (machine): Medium effort, low risk. Fix case-sensitivity bug in SkillFilter. Add LinkedIn. Convert skill chips to CSS scroll-snap slider. Full Codehal-style visual refresh: Typed.js hero, AOS scroll-reveal, BoxIcons social row, hamburger nav, animated skill bars, contact section, avatar placeholder. All via CDN, no build config change.

## Scope

### Must have
1. **LinkedIn link** — Add to hero-links in `src/pages/index.astro`
2. **Skill filter bug fix** — Case-insensitive matching in `src/components/SkillFilter.astro`; switch `data-skill` to use slugs
3. **Skill chips → horizontal slider** — CSS `scroll-snap-type: x mandatory` container with left/right arrow buttons; update `SkillFilter.astro`
4. **Codehal-style redesign** — The following visual and UX changes:

   | Element | Approach |
   |---|---|
   | Header | Fixed, with logo + nav links + hamburger icon; hamburger toggles overlay menu on mobile |
   | Hero | Typing animation (Typed.js) on name/role; social icons row (BoxIcons: GitHub, LinkedIn, Email); avatar placeholder SVG |
   | About | Scroll-reveal via AOS (fade-up); keep existing content |
   | Skills section | Animated progress bars using skill `level` data; AOS reveals |
   | Contact form | Static UI with name/email/message fields + mailto fallback |
   | Footer | Back-to-top button; existing content stays |
   | Theme | Extend CSS custom properties with gradient accents, new section styles |
   | Animations | AOS (Animate On Scroll) for all sections on scroll; Typed.js for hero; CSS transitions for hover states |

5. **Animated skill bars data** — Add optional `level` (0-100) to each skill in `src/data/skills.json`; derive defaults from project count per skill
6. **BaseLayout update** — Hamburger menu HTML/CSS/JS; CDN script tags (AOS, Typed.js, BoxIcons); AOS init; theme toggle preserved

### Must NOT have (guardrails, anti-slop, scope boundaries)
- No framework migration (keep Astro + vanilla CSS + vanilla JS)
- No npm-installed animation libraries (CDN only — zero build config)
- No backend/API for contact form (mailto `href` only)
- No changes to `src/pages/projects/[id].astro` or `src/pages/skills/[genre]/[skill].astro` beyond global.css theme variable updates
- No deletion of existing content (hero bio, about text, project data — only add to it)
- No new image assets beyond the placeholder avatar SVG
- No removal of dark/light theme toggle

## Verification strategy
> Zero human intervention — all verification is agent-executed.
- **Test decision**: tests-after (manual visual QA + build check)
- **Evidence**: `.omo/evidence/` — build output screenshots, component behavior checks
- **Verification per todo**: `npm run build` must succeed; no LSP errors; visual inspection of new sections

## Execution strategy

### Parallel execution waves

**Wave 1 — Foundation (safe, isolated changes)**
- Task 1: LinkedIn link (trivial, 1 file)
- Task 2: Skill filter bug fix (2 files, data-logic only)
- Task 3: Skill level data + skill bars CSS (data + component)

**Wave 2 — Visual refresh (depends on Wave 1)**
- Task 4: BaseLayout — CDN scripts, hamburger nav, AOS init
- Task 5: Hero redesign — Typed.js, avatar placeholder, social icons
- Task 6: Skills section with animated bars
- Task 7: Contact section + back-to-top footer

**Wave 3 — Polish (parallel, independent)**
- Task 8: Skill chips → slider conversion
- Task 9: Global.css theme extension + responsive refinements

### Dependency matrix
| Todo | Depends on | Blocks | Can parallelize with |
| --- | --- | --- | --- |
| 1. LinkedIn link | — | — | 2, 3 |
| 2. Skill filter bug fix | — | — | 1, 3 |
| 3. Skill level data | — | 6 | 1, 2 |
| 4. BaseLayout CDN + hamburger | — | 5, 6, 7 | 1, 2, 3 |
| 5. Hero redesign | 4 | — | 6, 7 (once 4 done) |
| 6. Skills section | 3, 4 | — | 5, 7 |
| 7. Contact section | 4 | — | 5, 6 |
| 8. Skill chips slider | 2 | — | 9 |
| 9. Global.css theme + responsive | — | — | 8 |

## Todos
> Implementation + Test = ONE todo. Never separate.
<!-- APPEND TASK BATCHES BELOW THIS LINE WITH edit/apply_patch - never rewrite the headers above. -->

- [x] 1. Add LinkedIn link to hero section
  What to do / Must NOT do: In `src/pages/index.astro`, add a LinkedIn anchor tag to the `.hero-links` div, between GitHub and Email. Must NOT remove existing links. Must NOT change the hero layout structure.
  Parallelization: Wave 1 | Blocked by: — | Blocks: —
  References:
  - `src/pages/index.astro:17-24` — current hero-links structure
  - LinkedIn profile: `https://linkedin.com/in/Ed-Lam-11111010010` (use actual URL if different)
  Acceptance criteria (agent-executable): `src/pages/index.astro` contains a new `<a>` tag with `linkedin.com` in the `.hero-links` div; `npm run build` succeeds.
  QA scenarios:
  - happy: Open page, verify LinkedIn link visible in hero with correct href — Evidence: `.omo/evidence/task-1-linkedin.txt`
  - failure: Comment out the new link, build fails — skip (trivial)
  Commit: N (part of final commit)

- [x] 2. Fix skill filter case-sensitivity bug
  What to do / Must NOT do:
  In `src/components/SkillFilter.astro`:
  (a) Change `data-skill={skill.name}` to `data-skill={skill.slug}` on the filter tags (line 22)
  (b) In the `updateFilter()` JS function, normalize both `filter` and skills entries to lowercase: change `const skills = (card.dataset.projectSkills || '').split(',');` and `const matches = [...activeFilters].every((filter) => skills.includes(filter));` to compare using `.toLowerCase()` on filter values and match against lowercase slugs, OR change the filter to use slugs and compare directly (since slugs are already lowercase).
  
  Preferred approach: Change `data-skill` to use `skill.slug` (already lowercase from skills.json), and in `updateFilter()` when checking, compare the slug from `activeFilters` against each entry in `project.skills` which are also lowercase raw tags. The skill slugs match directly: e.g. slug "c" matches project skill "c", slug "python" matches "python", etc.
  
  In `src/components/ProjectCard.astro` line 25: `const skillList = project.skills.join(',');` this is fine as-is (raw tags are already lowercase).
  
  Verify `findGenreForSkill()` in `src/data/skills.js` also matches correctly (it already uses slug comparison on line 54: `skill.slug === tag`).
  
  Must NOT change the genre tab filtering (genre slugs are already correct). Must NOT break the "Clear all" button.
  Parallelization: Wave 1 | Blocked by: — | Blocks: 8
  References:
  - `src/components/SkillFilter.astro:20-23` — current tag `data-skill` using `skill.name`
  - `src/components/SkillFilter.astro:57-71` — `updateFilter()` function — the `skills.includes(filter)` comparison
  - `src/components/ProjectCard.astro:25-29` — `data-project-skills` attribute built from `project.skills.join(',')`
  - `src/data/projects.json:31` — Jewel Smash has `"skills": ["c", "python", ...]`
  - `src/data/skills.json:8` — "C" skill has `"slug": "c"`
  Acceptance criteria (agent-executable): Click "C" filter tag → Jewel Smash card and "C Programming & Embedded Systems" card must appear. Previously they were hidden. `npm run build` succeeds.
  QA scenarios:
  - happy: In `SkillFilter.astro`, click genre "Programming Languages" then click tag "C" → verify cards with project-skill "c" appear (Jewel Smash, C Programming)
  - happy: Click tag "Python" → verify Python-tagged projects appear (AI Guild Master, Jewel Smash, Calculator, Greeting, Christmas Game)
  - failure: Type a non-existent slug in filter — no crash, empty state shown
  - Evidence: `.omo/evidence/task-2-filter-fix.txt` (test plan + observed results)
  Commit: N (part of final commit)

- [x] 3. Add skill level data + skill bar CSS component
  What to do / Must NOT do:
  (a) In `src/data/skills.json`, add optional `"level"` field (integer 0-100) to each skill. Default levels derived proportionally from project count:
     - 4+ projects → 90
     - 3 projects → 80
     - 2 projects → 65
     - 1 project → 50
  (b) Create `src/components/SkillBar.astro` — renders a labeled progress bar:
     - Props: `name: string`, `level: number`, `genre: string`
     - Render: skill name + a filled progress bar (width = level%)
     - AOS `data-aos="fade-right"` on each bar
  (c) Update `src/data/skills.js` — export `getAllSkillsWithLevels()` that returns skills with levels from JSON
  Must NOT change projectIds array structure. Must NOT remove existing `getGenres()`, `findGenreForSkill()`, etc. Must NOT add npm dependencies.
  Parallelization: Wave 1 | Blocked by: — | Blocks: 6
  References:
  - `src/data/skills.json` — full file, each skill entry
  - `src/data/skills.js` — existing exports
  Acceptance criteria (agent-executable): `SkillBar` renders with correct width percentage matching level value; `npm run build` succeeds.
  QA scenarios:
  - happy: `SkillBar` with level=90 renders a bar at 90% width
  - happy: All skills have level values assigned (check JSON)
  - failure: level out of 0-100 range — render as 0 or 100 (clamp)
  - Evidence: `.omo/evidence/task-3-skill-bars.txt` (component test + data completeness check)
  Commit: N (part of final commit)

- [x] 4. Update BaseLayout with hamburger nav + CDN scripts
  What to do / Must NOT do:
  In `src/layouts/BaseLayout.astro`:
  (a) Add CDN `<link>` for BoxIcons in `<head>`:
     - `<link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet">`
  (b) Add CDN `<script>` tags before `</head>` or in `<body>`:
     - AOS: `<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>` + `<link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet">`
     - Typed.js: `<script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.1.0/typed.umd.js"></script>`
  (c) Add hamburger menu button to header:
     - HTML: `<div class="bx bx-menu" id="menu-icon"></div>` in `.header-nav` or as separate element
     - Mobile overlay nav with links (Home, About, Skills, Projects, Contact)
     - CSS: overlay menu slides in from right, full-height, dark backdrop
  (d) Add AOS init script at end of body `<script>`:
     - `AOS.init({ duration: 1000, once: true, offset: 100 });`
  (e) Keep existing theme toggle, service worker, and slot/footer.
  Must NOT remove existing nav links. Must NOT break theme toggle. Must NOT remove service worker registration. Must NOT replace `<script>` that has theme toggle — add to it.
  Parallelization: Wave 2 | Blocked by: — | Blocks: 5, 6, 7
  References:
  - `src/layouts/BaseLayout.astro` — full file (85 lines)
  - AOS docs: https://github.com/michalsnik/aos
  - Typed.js docs: https://github.com/mattboldt/typed.js/
  - BoxIcons: https://boxicons.com/
  Acceptance criteria (agent-executable): Hamburger menu visible on mobile (<768px), clicking toggles overlay nav; page loads without console errors for AOS/Typed.js/BoxIcons CDN; `npm run build` succeeds.
  QA scenarios:
  - happy: Resize browser to mobile width → hamburger icon appears; click → overlay nav slides in; click again → hides
  - happy: Page loads, AOS CSS loads (check computed styles for `[data-aos]`)
  - failure: CDN script fails to load → page renders without animations but no console crash
  - Evidence: `.omo/evidence/task-4-baselayout.txt` (build log + visual check results)
  Commit: N (part of final commit)

- [x] 5. Redesign hero section with typing animation + social icons + avatar
  What to do / Must NOT do:
  In `src/pages/index.astro`:
  (a) Keep existing hero section but restructure it to Codehal style:
     - Add avatar placeholder: `<div class="hero-img"><span class="avatar-placeholder">EL</span></div>` (initials SVG or styled div with gradient background)
     - Add typing animation element: `<span class="typing-text"></span>` that cycles through roles
     - Add Typed.js initialization in a `<script>` block or reference to a new `hero.js` file
  (b) Replace text links in `.hero-links` with BoxIcons social row:
     - GitHub: `<a href="https://github.com/Ed-Lam-11111010010" target="_blank"><i class="bx bxl-github"></i></a>`
     - LinkedIn: `<a href="https://linkedin.com/in/..." target="_blank"><i class="bx bxl-linkedin"></i></a>`
     - Email: `<a href="mailto:edwin.lam@example.com"><i class="bx bx-envelope"></i></a>`
  (c) Keep existing `.hero-name`, `.hero-title`, `.hero-bio` content but add AOS attributes: `data-aos="fade-up"` with staggered delays.
  (d) Typed.js init script (at bottom of page or in a separate inline script):
     ```js
     if (typeof Typed !== 'undefined') {
       new Typed('.typing-text', {
         strings: ['Information Engineering Student', 'Game Designer', 'Creative Technologist', 'AI Enthusiast'],
         typeSpeed: 80,
         backSpeed: 40,
         backDelay: 2000,
         loop: true
       });
     }
     ```
  Must NOT remove existing hero bio text. Must NOT break dark/light theme. Must keep GitHub link (now as icon).
  Parallelization: Wave 2 | Blocked by: 4 | Blocks: —
  References:
  - `src/pages/index.astro:8-26` — current hero section
  - Codehal reference design (hero: centered or left-aligned, avatar circle, typing name, social icons row)
  Acceptance criteria (agent-executable): Hero shows avatar placeholder + typing animation cycles through roles + social icons (GitHub, LinkedIn, Email) in a row; `npm run build` succeeds.
  QA scenarios:
  - happy: Page loads, avatar visible, typing animation starts cycling through strings
  - happy: Click GitHub icon → opens GitHub in new tab; LinkedIn icon → LinkedIn; Email icon → opens mailto
  - failure: Typed.js CDN fails — `.typing-text` stays empty (graceful degradation)
  - Evidence: `.omo/evidence/task-5-hero.txt` (visual check + build output)
  Commit: N (part of final commit)

- [x] 6. Build skills section with animated progress bars
  What to do / Must NOT do:
  In `src/pages/index.astro`, after the About section and before the Projects section, add a new Skills section:
  ```astro
  <section class="section" id="skills" data-aos="fade-up">
    <div class="container">
      <h2 class="section-title">Skills</h2>
      <div class="skills-grid">
        <!-- iterate genres, each with genre name + skill bars -->
      </div>
    </div>
  </section>
  ```
  For each genre in `getGenres()`, render the genre name as a heading and its skills as `SkillBar` components.
  Import `SkillBar` and `getGenres` in the frontmatter.
  Use AOS `data-aos="fade-right"` on each bar with staggered `data-aos-delay`.
  Must NOT remove existing sections (hero, about, projects). Must NOT duplicate data imports.
  Parallelization: Wave 2 | Blocked by: 3, 4 | Blocks: —
  References:
  - `src/pages/index.astro:28-44` — About section (reference for section structure)
  - `src/data/skills.json` — skill data with level fields
  - `src/components/SkillBar.astro` — will be created in Task 3
  Acceptance criteria (agent-executable): Skills section appears between About and Projects with genre headings + animated progress bars; bars animate on scroll via AOS; `npm run build` succeeds.
  QA scenarios:
  - happy: Scroll to Skills section → each genre heading visible, skill bars animate in from left
  - happy: Skill bar width matches level value (e.g. level=90 → ~90% width)
  - failure: No skill data → section renders empty heading with no bars (graceful)
  - Evidence: `.omo/evidence/task-6-skills-section.txt` (screenshot + build output)
  Commit: N (part of final commit)

- [x] 7. Build contact section + back-to-top footer
  What to do / Must NOT do:
  (a) In `src/pages/index.astro`, before the closing `</section>` for projects (or after it), add a Contact section:
     ```astro
     <section class="section" id="contact" data-aos="fade-up">
       <div class="container">
         <h2 class="section-title">Contact <span>Me</span></h2>
         <form action="mailto:edwin.lam@example.com" method="post" enctype="text/plain" class="contact-form">
           <div class="input-box">
             <input type="text" placeholder="Full Name" required>
             <input type="email" placeholder="Email" required>
           </div>
           <div class="input-box">
             <input type="text" placeholder="Subject" required>
           </div>
           <textarea placeholder="Your Message" required></textarea>
           <button type="submit" class="btn">Send Message</button>
         </form>
       </div>
     </section>
     ```
  (b) In `src/layouts/BaseLayout.astro`, add a back-to-top button in the footer:
     ```html
     <div class="footer-iconTop">
       <a href="#home"><i class="bx bx-up-arrow-alt"></i></a>
     </div>
     ```
  (c) Add CSS for contact form (inputs, textarea, button styling matching Codehal aesthetic with gradient accent).
  Must NOT add actual backend form handling — mailto only. Must NOT break existing footer content. Must NOT remove copyright line.
  Parallelization: Wave 2 | Blocked by: 4 | Blocks: —
  References:
  - `src/pages/index.astro:47-54` — Projects section (reference for placement)
  - `src/layouts/BaseLayout.astro:42-50` — Footer section
  - Codehal contact form design (two-column input layout, full-width textarea, gradient button)
  Acceptance criteria (agent-executable): Contact section visible with form fields and submit button; back-to-top arrow in footer scrolls to top; `npm run build` succeeds.
  QA scenarios:
  - happy: Fill form fields, click Send → triggers mailto: link with form data
  - happy: Click back-to-top arrow → smooth scroll to top of page
  - failure: Empty required fields → browser shows validation message, form not submitted
  - Evidence: `.omo/evidence/task-7-contact.txt` (form rendering + back-to-top behavior)
  Commit: N (part of final commit)

- [x] 8. Convert skill chips to horizontal scroll slider
  What to do / Must NOT do:
  In `src/components/SkillFilter.astro`:
  (a) Change `.skill-chip-group` from `display: flex; flex-wrap: wrap;` to a horizontal scroll container:
     ```css
     .skill-chip-group {
       display: flex;
       flex-wrap: nowrap;
       gap: 0.5rem;
       overflow-x: auto;
       scroll-snap-type: x mandatory;
       -webkit-overflow-scrolling: touch;
       scrollbar-width: thin;
       padding: 0.5rem 0;
     }
     .skill-chip-group::-webkit-scrollbar { height: 4px; }
     .skill-chip-group::-webkit-scrollbar-thumb { background: var(--color-border); border-radius: 2px; }
     ```
  (b) Add left/right arrow buttons flanking the chip group:
     - `<button class="scroll-arrow scroll-left" data-genre-scroll="{genre.slug}" type="button"><i class="bx bx-chevron-left"></i></button>`
     - `<button class="scroll-arrow scroll-right" data-genre-scroll="{genre.slug}" type="button"><i class="bx bx-chevron-right"></i></button>`
  (c) Add JS click handlers for arrow buttons to scroll the chip group by a set amount (e.g. 200px).
  (d) Each chip group and its arrows sit in a wrapper:
     ```html
     <div class="skill-slider-wrapper" data-genre={genre.slug}>
       <button class="scroll-btn scroll-btn--left">‹</button>
       <div class="skill-chip-group" data-genre={genre.slug}>...</div>
       <button class="scroll-btn scroll-btn--right">›</button>
     </div>
     ```
  Must NOT remove genre tabs. Must NOT break filter functionality. Arrow buttons should be hidden on touch devices that naturally scroll.
  Parallelization: Wave 3 | Blocked by: 2 | Blocks: —
  References:
  - `src/components/SkillFilter.astro:14-27` — current skill-chip-group structure and CSS
  - CSS scroll-snap: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap
  Acceptance criteria (agent-executable): Skill chips are in a horizontally scrollable container with visible arrow buttons; arrows scroll the container left/right; filter still works; `npm run build` succeeds.
  QA scenarios:
  - happy: Click right arrow → chips scroll right; click left arrow → scroll left
  - happy: On mobile, touch-swipe scrolls chips horizontally
  - happy: Click a chip → filter still works (bug fix from Task 2 verified)
  - failure: Arrow at edge → hides (no arrow when at scroll start/end)
  - Evidence: `.omo/evidence/task-8-slider.txt` (behavior verification)
  Commit: N (part of final commit)

- [x] 9. Extend global.css with Codehal theme + responsive refinements
  What to do / Must NOT do:
  In `src/styles/global.css`:
  (a) Add new CSS custom properties for Codehal-style accent gradients:
     ```css
     --gradient-accent: linear-gradient(135deg, var(--color-accent), #6c5ce7);
     --gradient-bg: linear-gradient(135deg, transparent, var(--color-bg-secondary));
     ```
  (b) Add styles for new components:
     - `.hero-img`, `.avatar-placeholder` — circular avatar with gradient
     - Social icon row (`.home-sci`) — icon buttons with hover lift
     - Skill bars (`.skill-bar`, `.skill-bar-fill`) — animated progress
     - Contact form (`.contact-form`, `.input-box`, textarea, button) — Codehal-style inputs
     - Back-to-top (`.footer-iconTop`)
     - Hamburger menu overlay (`.navbar.active`, `.navbar a`, `.active-nav`)
     - Typing text wrapper
  (c) Add AOS overrides if needed (custom animation durations)
  (d) Add responsive breakpoints for new sections (hamburger >768px hidden, <768px visible)
  (e) Add gradient text class for section titles matching Codehal style
  Must NOT remove existing CSS custom properties (theme variables). Must NOT remove existing section styles (hero, about, project-grid, project-card, etc.). Must NOT break dark/light theming — all new colors should reference `var(--color-*)` variables.
  Parallelization: Wave 3 | Blocked by: — | Blocks: —
  References:
  - `src/styles/global.css` — full file (642 lines)
  - Codehal CSS pattern: CSS custom properties for light/dark, gradient accents, backdrop-filter glass
  - New sections added in Tasks 4-8
  Acceptance criteria (agent-executable): All new sections styled correctly in both light and dark themes; gradient accents visible; responsive layout works at 768px and 480px breakpoints; `npm run build` succeeds.
  QA scenarios:
  - happy: Toggle dark/light theme → all new sections render correctly in both modes
  - happy: Resize from desktop to mobile → hamburger appears at <768px; layout stacks correctly at 480px
  - happy: Section titles have gradient text effect
  - failure: Missing CSS variable → falls back to neutral color (graceful)
  - Evidence: `.omo/evidence/task-9-theme.txt` (screenshots in both themes + responsive check)
  Commit: N (part of final commit)

## Final verification wave
> Runs in parallel after ALL todos. ALL must APPROVE. Surface results and wait for the user's explicit okay before declaring complete.
- [x] F1. Plan compliance audit — Every todo completed; scope boundaries respected (no detail page changes, no backend, no framework migration)
- [x] F2. Code quality review — CSS no unused rules; JS no console errors; Astro no build warnings; file sizes under 250 pure LOC
- [x] F3. Real manual QA — Full walkthrough: homepage loads with typing hero, scroll reveals work, skill chips slider scrolls, filter tags work correctly (C → Jewel Smash appears), contact form renders, hamburger menu toggles, dark/light theme works, project detail pages render, build succeeds
- [x] F4. Scope fidelity — LinkedIn link present, bug fixed (verify "C" tag), slider present, Codehal style evident — no scope creep

## Commit strategy
- Single commit with message: `feat: redesign portfolio with Codehal-style animations, fix skill filter, add slider`
- Staged files: ALL files modified under `src/` + `public/` (if any)
- Build verification: `npm run build` must pass before commit
- No force push

## Success criteria
- [x] LinkedIn link visible in hero, opens correctly
- [x] Clicking "C" skill tag shows Jewel Smash + C Programming projects (bug fixed)
- [x] Skill chips are horizontally scrollable with arrow buttons
- [x] Hero has typing animation cycling through roles
- [x] Social icons row (GitHub, LinkedIn, Email) with BoxIcons
- [x] Avatar placeholder visible in hero
- [x] All sections have AOS scroll-reveal animations
- [x] Skills section with animated progress bars per skill
- [x] Contact form with name, email, subject, message fields
- [x] Hamburger nav menu on mobile
- [x] Back-to-top button in footer
- [x] Dark/light theme still works across all new sections
- [x] `npm run build` passes without errors
- [x] No changes to project detail or skill detail page layouts
