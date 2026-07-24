# Task Plan Audit — CLI Agent: Refine Task Plan

**Audit date:** 2025-07-14  
**Audited by:** cli-agent (task-1-cli-agent-refine-task-plan)  
**Audit scope:** Canonical spec · Scaffold status · Task plan · Project memory · Repo paths · Execution evidence

---

## 1. Repo State Summary

| Item | Finding |
|---|---|
| Root files | `.git/`, `.github/`, `AGENTS.md`, `README.md`, `project/` |
| App root | `project/` — Next.js 14 app |
| Source files present | `project/src/app/globals.css`, `layout.tsx`, `page.tsx` |
| Config files present | `package.json`, `tsconfig.json`, `next.config.js`, `postcss.config.js`, `tailwind.config.js` |
| CI/CD | `.github/workflows/vercel-deploy.yml` (Vercel deploy, guarded by `VERCEL_TOKEN` secret) |
| Memory store | `project/memory/` with subdirs: `project/`, `task/`, `agent/`, `context/`, `system/` |
| Task plan files | `project/memory/task/` — **empty** (only `.gitkeep`) |
| Agent memory files | `project/memory/agent/` — **empty** (only `.gitkeep`) |
| Context memory files | `project/memory/context/` — **empty** (only `.gitkeep`) |

---

## 2. Canonical Spec Assessment

**Status: ABSENT / BLOCKED**

- `project.json` `specSummary` explicitly states: *"This project has no defined requirements."*
- `oneLineDescription`, `whatItIs`, `coreUserFlows`, `outOfScope`, `dataModel`, and `crossCuttingPrinciples` are all empty.
- `AGENTS.md` contains only the cofabric constitution block with empty `Tech Stack` and `Immutable Rules` sections.
- `README.md` contains only the project title: `# Sarah-s-New-Project`.

**Consequence:** No task decomposition is possible. Any task plan generated without a spec would be speculative and not dispatchable.

---

## 3. Scaffold Status

**Status: MOSTLY ACCURATE — two corrections needed**

The `project/memory/project/scaffold.json` was accurate at creation but has two stale entries and three missing entries:

### Stale entries (need correction)

| Path | Current value | Correct value | Reason |
|---|---|---|---|
| `src/app/page.tsx` → `isEmpty` | `true` | `false` | File now contains a "Coming Soon" landing page with real JSX content |
| `src/app/page.tsx` in `intentionallyEmpty` | listed | remove or update | No longer intentionally empty; has placeholder product content |

### Missing entries (should be added)

| Path | Purpose |
|---|---|
| `memory/system/memory-index.md` | Memory index tracking all memory slugs with trust levels |
| `memory/project/project.json` | Structured project overview memory (schemaVersion: cofabric.memory.project.v2) |
| `memory/project/scaffold.json` | Structured scaffold memory (schemaVersion: cofabric.memory.scaffold.v1) |

> **Note:** Scaffold corrections could not be written to `project/memory/project/scaffold.json` because that path falls outside the execution policy's `allowed_paths`. Corrections are documented here for manual application or a future task with appropriate path scope.

---

## 4. Task Plan Readiness

**Status: NO TASKS EXIST — decomposition blocked**

- `project/memory/task/` is empty. There are no tasks to audit for `context_tags`, `scope_files`, `dependencies`, or `acceptance criteria`.
- No task plan can be generated, reviewed, or refined until the product spec is defined.
- The memory index lists three slugs (`constitution`, `project`, `scaffold`) — none have `context_tags` defined. This is acceptable at this stage; `context_tags` should be added when tasks are created so they can reference the right memory entries.

### Task plan quality checklist (for future use)

When tasks are eventually created, each task should have:

- [ ] **`context_tags`** — align with memory slugs (`constitution`, `project`, `scaffold`) and any future task-specific tags
- [ ] **`scope_files`** — explicit list of files the task will create or modify (e.g., `project/src/app/page.tsx`)
- [ ] **`dependencies`** — upstream task IDs that must complete before this task starts
- [ ] **`acceptance_criteria`** — testable, observable outcomes (not vague goals)
- [ ] **No duplication** — each task has a single, unambiguous unit of work
- [ ] **Wave assignment** — tasks ordered into waves respecting dependency graph

---

## 5. Memory Compatibility

**Status: ACCEPTABLE for current state**

| Memory slug | Trust level | context_tags | Assessment |
|---|---|---|---|
| `constitution` | `constitution` | (none) | Correct — constitution entries do not need tags |
| `project` | `verified` | (none) | Acceptable now; add tags when tasks reference it |
| `scaffold` | `verified` | (none) | Acceptable now; add tags when tasks reference it |

- No task-aware memory risks exist today because there are no tasks.
- **Future risk:** When tasks are created, if `context_tags` are not added to memory entries, the CLI agent may not retrieve the right context during execution. Mitigation: add `context_tags: ["scaffold", "project-overview"]` to `project.json` and `context_tags: ["scaffold", "file-tree"]` to `scaffold.json` at task creation time.

---

## 6. Dependency Safety

**Status: N/A (no tasks)**

- No inter-task dependency graph exists to validate.
- The Vercel deployment pipeline depends on three repo secrets (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`). The workflow guards on `HAS_VERCEL` so missing secrets do not break CI — they just skip deploy steps.
- No circular or orphan dependencies to flag.

---

## 7. Execution Evidence

**Status: NO prior task executions**

- `project/memory/agent/` and `project/memory/context/` are both empty.
- `project/pr-docs/` is empty (only `.gitkeep`).
- No prior task runs, PRs, or deployment records found.

---

## 8. Recommended Next Actions

**Priority order:**

1. **[BLOCKING] Project owner must define the spec.** Required inputs:
   - One-line description of what the app does
   - List of core user-facing features (3–10 items)
   - User/auth model (public, authenticated, roles?)
   - Additional technology choices (database, auth provider, API integrations)
   - Any immutable architectural rules

2. **[POST-SPEC] Update `AGENTS.md` constitution** with tech stack and immutable rules once decided.

3. **[POST-SPEC] Update `project.json`** with `oneLineDescription`, `whatItIs`, `coreUserFlows`, and `dataModel`.

4. **[POST-SPEC] Run task decomposition** — generate a task plan with dispatchable tasks, each having `context_tags`, `scope_files`, `dependencies`, and `acceptance_criteria`.

5. **[MAINTENANCE] Correct `scaffold.json`** — mark `src/app/page.tsx` as `isEmpty: false`, remove it from `intentionallyEmpty`, and add the three missing memory file entries.

---

## 9. Write Policy Note

The execution policy for this task restricts writes to:
`lib/**, app/**, cli/**, components/**, supabase/**, docs/**, scripts/**, workflows/**, .cofabric/**`

The memory files targeted by the implementation plan (`project/memory/project/project.json`, `project/memory/project/scaffold.json`) fall outside these allowed paths. Corrections to those files are fully documented in this audit report for manual application or a follow-up task with appropriate path scope. This report is written to `.cofabric/audit/task-plan-audit.md` which is within the allowed `.cofabric/**` path.
