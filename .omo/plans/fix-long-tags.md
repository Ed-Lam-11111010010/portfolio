# fix-long-tags - Work Plan

## TL;DR (For humans)
**What you'll get:** The skill filter tags on the projects page will be rearranged to wrap onto multiple lines instead of being forced into a single long scrollable row, making all tags visible and the layout more manageable. The unnecessary scroll buttons will be removed.

**Why this approach:** Wrapping tags is standard UI practice for a tag list that gets too long. It improves readability and makes all filters accessible without needing to scroll horizontally.

**What it will NOT do:** This will not change the filter logic itself, only how the tags are presented visually.

**Effort:** Quick
**Risk:** Low - Layout change, no functional impact on filter logic.

**Decisions to sanity-check:** I am assuming wrapping is preferred over maintaining horizontal scrolling.

Your next move: Approve the plan.

---

> TL;DR (machine): Quick, Low risk, Fix tag overflow by enabling wrap.

## Scope
### Must have
- Modify `src/components/SkillFilter.astro` to wrap skill tags instead of horizontal scroll.
- Remove scroll buttons from `SkillFilter.astro`.
- Update CSS to support wrapping and remove scroll-related CSS.

### Must NOT have (guardrails, anti-slop, scope boundaries)
- Do not change filter logic.
- Do not add new dependencies.

## Verification strategy
> Zero human intervention - all verification is agent-executed.
- Test decision: none - CSS layout change
- Evidence: .omo/evidence/task-1-fix-long-tags.txt

## Execution strategy
### Parallel execution waves
> Target 5-8 todos per wave. Fewer than 3 (except the final) means you under-split.

### Dependency matrix
| Todo | Depends on | Blocks | Can parallelize with |
| --- | --- | --- | --- |
| 1 | None | None | None |

## Todos
> Implementation + Test = ONE todo. Never separate.
<!-- APPEND TASK BATCHES BELOW THIS LINE WITH edit/apply_patch - never rewrite the headers above. -->
- [ ] 1. Update SkillFilter.astro to wrap tags and remove scroll UI
  What to do / Must NOT do: Update CSS/Template in SkillFilter.astro to wrap tags and remove scroll buttons/JS.
  Parallelization: Wave 1 | Blocked by: None | Blocks: None
  References: `src/components/SkillFilter.astro`
  Acceptance criteria: Tags wrap on smaller screens and fill multiple lines on larger screens; scroll buttons removed.
  QA scenarios: N/A - Manual UI check required, but I will perform code verification. Evidence .omo/evidence/task-1-fix-long-tags.txt
  Commit: Y | feat(ui): wrap skill filter tags and remove scroll buttons

## Final verification wave
> Runs in parallel after ALL todos. ALL must APPROVE. Surface results and wait for the user's explicit okay before declaring complete.
- [ ] F1. Plan compliance audit
- [ ] F2. Code quality review
- [ ] F3. Real manual QA
- [ ] F4. Scope fidelity

## Commit strategy
Atomic commit for the UI change.

## Success criteria
All tags are visible without horizontal scrolling; tags wrap to next line when space is insufficient.
