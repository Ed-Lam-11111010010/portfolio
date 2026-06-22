# Draft: portfolio-style-refresh

## Intent
User wants fixes + redesign of portfolio website:
1. Add LinkedIn link to hero section
2. Convert sub-tags (skill chips) from flex-wrap to a slider/carousel
3. Fix skill filter bug — case-sensitivity prevents matching "C" tag to "c" skill in projects
4. Redesign site style to match Codehal's animated portfolio (YT: S9NOXjdipl4)

## Exploration findings

### Codebase structure
- **Astro** static site (no framework CSS/JS — vanilla CSS + vanilla JS)
- Pages: `index.astro` (single-page), `projects/[id].astro` (detail), `skills/[genre]/[skill].astro` (skill detail)
- Components: `SkillFilter.astro`, `ProjectCard.astro`, `ProjectGrid.astro`, `BaseLayout.astro`
- Data: `projects.json` (13 projects), `skills.json` (9 genres, ~50 skills)
- Styles: single `global.css` (CSS custom properties for light/dark theme)
- No animation libraries, no scroll-triggered effects

### Issue 3 — Root cause (CONFIRMED BUG)
In `SkillFilter.astro`:
- Tags render `data-skill={skill.name}` (display name, e.g. "C", "Python")
- Project cards store `data-project-skills={project.skills.join(',')}` (raw tags, e.g. "c", "python")
- Filter does `skills.includes(filter)` → **case-sensitive** → "C" !== "c" → **broken for ALL skills where name casing differs**
- Affects: "C" (tag: "c"), "Python" (tag: "python"), "JavaScript" (tag: "javascript"), "HTML/CSS" (tag: "html/css"), "Git" (tag: "git"), etc.
- Fix: normalize both sides to lowercase, or use slugs instead of display names for matching

### Issue 2 — Too many sub-tags
- Creative & Design genre has **13 skills** displayed as flex-wrap chips
- Multimedia has 4, Game Dev has 4, Programming has 7
- All show simultaneously → takes significant vertical space
- Solution: horizontal scrollable slider with CSS scroll-snap + arrow buttons (zero dependencies)

### Issue 4 — Codehal style reference
Codehal's "Animated Portfolio Website Template" features:
- Fixed header with logo + nav links + hamburger menu icon
- Hero section with typing text animation, profile image, social icon row (GitHub, LinkedIn, etc.)
- Scroll-triggered reveal animations (sections fade/slide in)
- About section with image + bio
- Skills section with animated progress bars
- Projects / Portfolio section with filterable grid
- Contact section with form
- Footer with back-to-top button
- Modern aesthetic: gradients, box icons, clean typography
- Built with: HTML, CSS (vanilla), JS (vanilla), BoxIcons CDN

### Issue 1 — LinkedIn link
- Hero links currently: GitHub, Email
- LinkedIn link is a trivial addition to `index.astro` hero-links div

## Components ledger

| Component | Outcome | Status |
|-----------|---------|--------|
| LinkedIn link | Add to hero-links | Ready (trivial) |
| Skill chips → Slider | CSS scroll-snap + arrow buttons | Default adopted |
| Skill filter bug fix | Normalize to lowercase in `updateFilter()` | Ready (clear fix) |
| Codehal-style redesign | Adopt key design elements: typing hero, scroll animations, skill bars, contact form | Scoped |

## Decisions recorded
- **Slider approach**: CSS scroll-snap with arrow buttons (no JS carousel lib, lightweight)
- **Filter fix**: Normalize both `filter` and `skills` to lowercase in `updateFilter()`
- **Style scope**: Adopt Codehal visual language — typing hero, social icons row, scroll-reveal animations, animated skill bars, contact form, hamburger nav — but keep Astro component architecture, detail pages, and JSON data model intact. No framework migration.
- **Animation library**: Add AOS (Animate On Scroll) via CDN for scroll-triggered animations — matches Codehal approach, lightweight, no build step. Typing animation via Typed.js.

## Open forks (need user input)

1. **Style depth**: Full Codehal parity (add contact form, animated skill bars, hamburger nav, profile image section) OR just hero + animations + minor visual polish? My recommendation: full parity — the user said "at least this style" and the current site lacks these sections.

2. **Slider design**: Simple horizontal scroll with arrow indicators on both sides of chip row, OR a more prominent carousel with dots? My recommendation: simple scroll with arrow buttons — clean, minimal, matches Codehal aesthetic.

3. **Profile image**: Codehal hero has a profile image. Do you have a photo to use, or should we use a placeholder/initials avatar? My recommendation: use an avatar placeholder (initials or geometric shape) — can be swapped later.

## Status
awaiting-approval
