# ai-guild-master-page - Work Plan

## TL;DR (For humans)
**What you'll get:** A dedicated project page for "AI Guild Master" that matches your requested layout: back button, project image, external links, sidebar with title/info/description/tags/related projects. The home page project card will now link directly to this page.

**Why this approach:** Using a dedicated page structure (Astro route) is cleaner and more SEO-friendly than a modal, and satisfies all requested layout elements within the existing portfolio architecture.

**What it will NOT do:** This does not affect other projects' modal behavior, just "AI Guild Master".

**Effort:** Medium
**Risk:** Low - New route and link update.

**Decisions to sanity-check:** I will re-use the existing `[id].astro` route logic to ensure consistency, but adapt it to match your specific layout needs.

Your next move: Approve the plan.

---

> TL;DR (machine): Medium, Low risk, Create standalone detail page for AI Guild Master.

## Scope
### Must have
- Create a dedicated detail page for "AI Guild Master" (`src/pages/projects/ai-guild-master-fyp.astro` or update the existing `[id].astro` route).
- Layout: Top-left Back button, Project Image, GitHub/Cloud links, Sidebar (Title -> Info -> Description -> Tags -> Related).
- Update home page project card to link to this new route.

### Must NOT have (guardrails, anti-slop, scope boundaries)
- Do not remove the `[id].astro` route if it is used for other projects (I will make it generic for all, not just AI Guild Master).
- Do not break the existing modal behavior for other projects.

## Verification strategy
> Zero human intervention - all verification is agent-executed.
- Test decision: none
- Evidence: .omo/evidence/task-1-ai-guild-master-page.txt

## Execution strategy
### Parallel execution waves
> Target 5-8 todos per wave. Fewer than 3 (except the final) means you under-split.

### Dependency matrix
| Todo | Depends on | Blocks | Can parallelize with |
| --- | --- | --- | --- |
| 1 | None | 2 | None |
| 2 | 1 | None | None |

## Todos
> Implementation + Test = ONE todo. Never separate.
<!-- APPEND TASK BATCHES BELOW THIS LINE WITH edit/apply_patch - never rewrite the headers above. -->
- [ ] 1. Create/Update project detail route
  What to do / Must NOT do: Update `src/pages/projects/[id].astro` to support the new sidebar layout for "AI Guild Master" and others.
  Parallelization: Wave 1 | Blocked by: None | Blocks: 2
  References: `src/pages/projects/[id].astro`
  Acceptance criteria: Page accessible at /projects/ai-guild-master-fyp; contains requested layout.
  QA scenarios: N/A - Manual UI check required, but I will perform code verification. Evidence .omo/evidence/task-1-ai-guild-master-page.txt
  Commit: Y | feat(ui): create dedicated project detail page for AI Guild Master

- [ ] 2. Update home page project card links
  What to do / Must NOT do: Update `src/components/ProjectCard.astro` to link to the new detail page instead of opening a modal.
  Parallelization: Wave 1 | Blocked by: 1 | Blocks: None
  References: `src/components/ProjectCard.astro`
  Acceptance criteria: Clicking the card navigates to the project detail page.
  QA scenarios: N/A - Manual UI check required, but I will perform code verification. Evidence .omo/evidence/task-2-ai-guild-master-page.txt
  Commit: Y | feat(ui): link project card to dedicated page

## Final verification wave
> Runs in parallel after ALL todos. ALL must APPROVE. Surface results and wait for the user's explicit okay before declaring complete.
- [ ] F1. Plan compliance audit
- [ ] F2. Code quality review
- [ ] F3. Real manual QA
- [ ] F4. Scope fidelity

## Commit strategy
Atomic commits per component update.

## Success criteria
"AI Guild Master" has a dedicated page with the requested layout and is accessible via the home page.
