# consolidate-fix-v2 - Work Plan

## TL;DR (For humans)
<!-- Fill this LAST, after the detailed plan below is written, so it summarizes the REAL plan. -->

**What you'll get:** Three targeted fixes to the portfolio project: (1) clicking any project card will finally open its detail modal (was broken since initial build), (2) a `</>` code-brackets chip appears at the start of the skill bar that resets all filters, (3) the skill chip bar won't overflow wider than the genre tabs above.

**Why this approach:** Minimal diffs — two lines in ProjectCard.astro (switch onclick to Astro's backtick expression syntax so `project.id` actually interpolates), one HTML insertion and three CSS lines in SkillFilter.astro. Zero structural changes; the existing filter JS handles the `<>` reset via a dedicated listener.

**What it will NOT do:** No changes to the modal, project data, skill data, or filter logic. No redesign of the layout.

**Effort:** Short
**Risk:** Low — 2 files, 6-line net change across three surgical edits. Build already verified at 63 pages.

**Decisions to sanity-check:** The `<>` chip uses a dedicated click listener (not the generic toggle), and the CSS width constraint is `width: 100%` on `.skill-chips` — safe with the existing `box-sizing: border-box` default.

Your next move: approve, or run a high-accuracy review.

---

> TL;DR (machine): Short | Low | Fix project card modal onclick bug (Astro interpolation), add `<>` reset chip to skill bar, constrain bar width. 2 files, ~6 net lines changed.

## Scope
### Must have
1. Fix `ProjectCard.astro` — `onclick` and `aria-label` must render the actual `project.id`/`project.title` values instead of literal `{project.id}`/`{project.title}`
2. Add `</>` button as first chip in `#skillChipGroup` — clicking it clears all filters and shows every project
3. Constrain `.skill-chips` width to 100% so the slider aligns with `.genre-tabs` above
4. `npm run build` must pass with 63 pages, zero errors

### Must NOT have (guardrails, anti-slop, scope boundaries)
1. Do NOT modify `ProjectModal.astro`, `projects.json`, `skills.json`, or any file outside `ProjectCard.astro` and `SkillFilter.astro`
2. Do NOT restructure the filter layout, add new components, or change JS filter logic
3. Do NOT edit the scroll behavior or scroll-button code
4. Do NOT add new CSS classes — reuse existing `.filter-tag` styling
5. Do NOT edit files that are already clean — no whitespace-only changes

## Verification strategy
> Zero human intervention - all verification is agent-executed.
- Test decision: tests-after (build-based verification — the site is pure Astro static output, no unit test framework)
- Evidence: `.omo/evidence/` — grep output confirming interpolated values, built HTML spot-checks, build log

## Execution strategy
### Parallel execution waves
Wave 1 (can parallelize): Fix ProjectCard.astro AND SkillFilter.astro (HTML + CSS) — independent files, no merge conflict.

Wave 2 (after wave 1): Build + verify

### Dependency matrix
| Todo | Depends on | Blocks | Can parallelize with |
| --- | --- | --- | --- |
| 1. Fix ProjectCard.astro | — | — | Todo 2 |
| 2. Fix SkillFilter.astro (add `<>` chip + CSS) | — | — | Todo 1 |
| 3. Build + verify | Todo 1, 2 | — | — |

## Todos
> Implementation + Test = ONE todo. Never separate.
<!-- APPEND TASK BATCHES BELOW THIS LINE WITH edit/apply_patch - never rewrite the headers above. -->

- [ ] 1. Fix ProjectCard.astro onclick and aria-label interpolation
  What to do / Must NOT do: Change two attribute values in `src/components/ProjectCard.astro` from double-quoted HTML strings to Astro backtick template-literal expressions. On line 35, change `onclick="window.openProjectModal('{project.id}')"` to `` onclick={`window.openProjectModal('${project.id}')`} ``. On line 36, change `aria-label="View details for {project.title}"` to `` aria-label={`View details for ${project.title}`} ``. Do NOT change any other line. Do NOT add or remove whitespace elsewhere.
  Parallelization: Wave 1 | Blocked by: — | Blocks: Todo 3
  References: `src/components/ProjectCard.astro:35-36` — current buggy code. The built `dist/index.html` shows all 13 project cards with `{project.id}` verbatim — grep for it.
  Acceptance criteria (agent-executable): 
    - `grep -c "window.openProjectModal('{'}" dist/index.html` returns 0 (no literal `{project.id}` anywhere)
    - `grep -o "window.openProjectModal('[a-z0-9_-]\+')" dist/index.html` matches 13 lines (13 project cards with actual IDs)
    - `grep -c "View details for {" dist/index.html` returns 0
    - `grep -o "View details for [A-Za-z]" dist/index.html` matches 13 lines
  QA scenarios: 
    - Happy: After build, `grep` confirms all project IDs appear in onclick values. Evidence: `.omo/evidence/task-1-consolidate-fix-v2.txt` — output of the grep commands above.
    - Failure: If Astro parsing fails on the backtick syntax, the build emits errors. In that case, catch the build error and revert to simpler approach: use `data-project-id` attribute + event delegation instead.
  Commit: Y | `fix(projects): interpolate project.id in card onclick and aria-label`

- [ ] 2. Fix SkillFilter.astro — add `<>` reset chip and constrain bar width
  What to do / Must NOT do:
    (a) In `src/components/SkillFilter.astro`, inside `<div class="skill-chip-group" id="skillChipGroup">`, insert BEFORE the existing `{genres.map(...)}` output:
      ```
      <a href="#" class="filter-tag" data-skill="_all_" data-genre="all">&lt;/&gt;</a>
      ```
      Note: use `data-skill="_all_"` (with underscores) to avoid collision with any real skill named "all".
    (b) In the `<script>` block (after the existing filter logic, before the scroll-button code at ~line 115), add a dedicated click listener:
      ```javascript
      // Reset all — `<>` chip
      document.querySelector('[data-skill="_all_"]')?.addEventListener('click', (e) => {
        e.preventDefault();
        activeFilters.clear();
        activeGenre = 'all';
        updateGenreTabs();
        updateChips();
        updateFilter();
      });
      ```
    (c) In the `<style>` block, add to `.skill-chips`:
      ```css
      .skill-chips {
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
      }
      ```
    Do NOT modify any other CSS rule. Do NOT change the filter logic in the existing event handlers. Do NOT remove or change the scroll buttons.
  Parallelization: Wave 1 | Blocked by: — | Blocks: Todo 3
  References: 
    - `src/components/SkillFilter.astro:18-26` — current chip group rendering
    - `src/components/SkillFilter.astro:34-141` — JS filter logic (insert after ~line 113, before scroll-btn code at ~line 117)
    - `src/components/SkillFilter.astro:143-258` — CSS (add at ~line 144)
  Acceptance criteria (agent-executable):
    - `grep -c 'data-skill="_all_"' dist/index.html` returns 1 (the `<>` chip exists in the built HTML)
    - `<>&lt;/&gt;</a>` appears after `<div class="skill-chip-group"` in dist/index.html
    - `grep '\.skill-chips\s*{' dist/index.html` shows width constraint applied (check style block inlined by Astro)
  QA scenarios:
    - Happy: `<>` chip renders as first child of `#skillChipGroup` in built HTML. CSS width constraint inlined. Clicking `<>` chip on live site resets all filters and shows all project cards.
    - Failure: If `data-skill="_all_"` is handled by the existing generic `filterTags.forEach` click handler (which toggles `activeFilters`), clicking it would add "_all_" to the filter set — matching ZERO projects. Verify that the dedicated listener on `[data-skill="_all_"]` calls `e.preventDefault()` + `activeFilters.clear()` + the three update functions, preventing the generic handler from processing this chip. Evidence: walk the JS control flow in the source to confirm the dedicated listener matches before the generic `forEach` loop fires (the `querySelector` listener is added to a specific element, not a loop — it will fire BEFORE the generic loop because the generic handler runs on all `.filter-tag` elements regardless; both fire, but the dedicated handler calls `e.preventDefault()` which only prevents the `<a>` navigation, NOT the other handler. Actually, this is a problem — both listeners fire on click.
    
    **REVISED APPROACH:** Instead of adding a separate listener, modify the existing generic click handler to check for `_all_`:
    ```javascript
    filterTags.forEach((tag) => {
      tag.addEventListener('click', (e) => {
        e.preventDefault();
        const skill = tag.dataset.skill;
        if (skill === '_all_') {
          activeFilters.clear();
          activeGenre = 'all';
          updateGenreTabs();
          updateChips();
          updateFilter();
          return;
        }
        if (activeFilters.has(skill)) {
          activeFilters.delete(skill);
        } else {
          activeFilters.add(skill);
        }
        updateFilter();
      });
    });
    ```
    This avoids double-handler issues. Use this approach instead.
  Commit: Y | `fix(projects): add <> reset chip, constrain skill bar width`

- [ ] 3. Build and verify all fixes
  What to do / Must NOT do: Run `npm run build` and verify with automated checks. Do NOT preview the dev server — only the production build matters.
  Parallelization: Wave 2 | Blocked by: Todo 1, 2 | Blocks: —
  References: `dist/index.html` — the built output
  Acceptance criteria (agent-executable):
    1. `npm run build` exits with code 0 and outputs "63 page(s) built"
    2. Grep `dist/index.html`:
       - `window.openProjectModal('{project.id}')` → 0 matches (no literal template syntax)
       - `window.openProjectModal('` (with actual IDs) → 13 matches (13 project cards)
       - `View details for {project.title}` → 0 matches
       - `data-skill="_all_"` → 1 match (`<>` chip present)
       - `&lt;/&gt;` appears after `id="skillChipGroup"` → yes (`<>` chip is first child)
       - `View details for` → 13 matches (aria-label interpolated 13 times)
    3. `git diff --stat` shows only `src/components/ProjectCard.astro` and `src/components/SkillFilter.astro` changed
  QA scenarios:
    - Happy: All grep assertions pass; build time < 5s.
    - Failure: If any grep assertion fails, check whether Astro compiled correctly (inspect the built HTML around the project-cards section and the skill-filter section). Fix the source file and rebuild.
  Commit: N (squash from previous todos)

## Final verification wave
> Runs in parallel after ALL todos. ALL must APPROVE. Surface results and wait for the user's explicit okay before declaring complete.
- [ ] F1. Plan compliance audit — confirm only 2 files changed, only intended edits applied, no scope creep
- [ ] F2. Code quality review — backtick syntax is correct Astro; `_all_` special case doesn't double-fire; CSS doesn't break existing layout
- [ ] F3. Real manual QA — open `dist/index.html` in browser: click a project card → modal opens; click `<>` chip → filters reset; verify skill bar width ≤ genre tabs width
- [ ] F4. Scope fidelity — no changes to ProjectModal.astro, projects.json, or skills.json

## Commit strategy
Single commit after todos 1+2 are done and build passes:
```
fix(projects): interpolate card onclick, add <> reset chip, constrain bar width
```

## Success criteria
1. ✅ Every project card's `onclick` contains the real project ID (13 unique values), not `{project.id}`
2. ✅ Every project card's `aria-label` contains the real project title, not `{project.title}`
3. ✅ `</>` chip renders as first child of `#skillChipGroup` in the built output
4. ✅ Clicking `<>` chip on live site resets all filters (shows every project card)
5. ✅ `.skill-chips` has `width: 100%` — skill bar width matches genre tabs width
6. ✅ Build completes: 63 pages, zero errors
7. ✅ Only 2 files modified
