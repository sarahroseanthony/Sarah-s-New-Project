# Task Plan Audit Report

> Schema: task-plan-audit.v1
> Produced by: CLI Agent — Task 1 (CLI Agent: refine task plan)
> Date: 2026-07-24

---

## 1. Inspection Summary

The following sources were reviewed before making any changes:

| Source | Location | Status |
|--------|----------|--------|
| Canonical spec | `project/memory/project/project.json` | ⚠️ No product spec — `specSummary` explicitly states spec is blocked; no features, user model, or purpose defined |
| Scaffold | `project/memory/project/scaffold.json` | ✅ Present — minimal Next.js 14 + React 18 + Tailwind CSS scaffold; only root route exists, `page.tsx` has a placeholder "Coming Soon" page |
| Memory index | `project/memory/system/memory-index.md` | ✅ Present — 3 entries: `constitution`, `project`, `scaffold` |
| Project constitution | `AGENTS.md` | ⚠️ Minimal — tech stack section empty, immutable rules empty; title says "Unknown Project" despite scaffold naming it "Sarah's New Project" |
| Task breakdown | Provided in task context | ✅ 2 tasks; Task 1 in `review`, Task 2 `blocked` |
| Execution evidence | `project/pr-docs/`, `project/memory/agent/`, `project/memory/context/` | ❌ No execution history — all directories contain only `.gitkeep` |
| Task memory | `project/memory/task/` | ❌ Empty — no task-aware memory entries exist |
| Repo files | Root + `project/src/app/` | ✅ Scaffold present; `page.tsx` has placeholder content |
| Specs directory | `specs/` | ❌ Does not exist in repo |
| Docs / bundles | `docs/` | ❌ Did not exist before this run (being created now) |
| Planning artifacts | `docs/plans/` | ❌ Did not exist before this run (being created now) |

**Key finding:** The project is at wave-0, pre-spec. No canonical product specification exists. The only planning inputs available are the scaffold description and two agent-authored planning tasks. No prior execution evidence exists.

---

## 2. Task-by-Task Audit

| Field | Task 1 — CLI Agent: refine task plan | Task 2 — CLI Agent: plan execution waves |
|---|---|---|
| **ID** | 1 | 2 |
| **Status** | review | blocked |
| **Priority** | high | high |
| **Assigned** | workspace agent | workspace agent |
| **Tags (existing)** | workspace-agent, tasks, task-generation, task-aware-memory | workspace-agent, waves, planning, phase-boundaries, ticket-authoring |
| **context_tags** | ❌ Not set | ❌ Not set |
| **scope_files** | ❌ Not set | ⚠️ Implied by `planning_control` block but not declared as task metadata |
| **dependencies** | ❌ Not declared | ❌ Not declared (but logically depends on Task 1) |
| **acceptance_criteria** | ✅ Present in task description (4 bullet points) | ⚠️ Implicit in artifact contract; not formatted as verifiable checklist |
| **dispatchable** | ✅ Yes — bounded planning task, no missing prerequisites | ❌ No — blocked on Task 1 completion |
| **memory_compatible** | ⚠️ Partial — tags present but `context_tags` not set; task-aware memory lookup would fall back to title search only | ⚠️ Partial — same issue |
| **Planning control block** | ❌ Not present | ✅ Present (embedded YAML in description) |
| **Artifact contract** | ❌ Not present (no formal artifact list) | ✅ Present (3 named artifacts with schema versions) |

### Task 1 Gaps
- No `context_tags` set → task-aware memory lookups are degraded
- No explicit `scope_files` list → agents cannot determine read/write surface at a glance
- No explicit `dependencies` field → dependency graph cannot be machine-traversed
- Acceptance criteria exist in natural language but are not keyed as a structured checklist
- No `dispatchable` or `memory_compatible` boolean flags

### Task 2 Gaps
- No `context_tags` set
- `scope_files` implied by the embedded `planning_control.allowed_write_roots` but not surfaced as first-class task metadata
- No explicit `dependencies: [1]` declared in task metadata (only implied by "blocked" status)
- Acceptance criteria embedded in the artifact contract section but not structured as verifiable acceptance criteria bullets

### Memory Compatibility Assessment
The `project/memory/task/` directory is empty. No task-aware memory entries have been written. When tasks are dispatched, a memory-aware agent would find no prior context. This is not a blocker for planning tasks (they are self-contained), but it means:
- Task 2 will not benefit from memory-injected context from Task 1's outputs unless a task memory entry is written after Task 1 completes.
- **Risk:** If Task 2 is dispatched without Task 1's planning artifacts being indexed into task memory, the wave planner starts cold.

---

## 3. Recommended Refinements

### Task 1 — CLI Agent: refine task plan

| Field | Current | Recommended |
|---|---|---|
| `context_tags` | (none) | `planning`, `task-audit`, `task-metadata`, `workspace-agent` |
| `scope_files` | (none) | `docs/plans/task-plan-audit.md`, `docs/plans/refined-task-plan.yaml`, `project/memory/**` (read), `specs/**` (read) |
| `dependencies` | (none) | `[]` (no prerequisites — runs on clean state) |
| `acceptance_criteria` | Prose in task body | Structured list — see refined plan |
| `dispatchable` | (implied) | `true` |
| `memory_compatible` | (not declared) | `true` — with context_tags and scope_files added |

### Task 2 — CLI Agent: plan execution waves

| Field | Current | Recommended |
|---|---|---|
| `context_tags` | (none) | `planning`, `wave-planning`, `phase-boundaries`, `ticket-authoring`, `workspace-agent` |
| `scope_files` | Embedded in planning_control | Explicitly: `docs/plans/wave-boundaries.yaml`, `docs/plans/wave-engineering-plan.md`, `docs/plans/wave-reviewer-report.md`, `docs/plans/task-plan-audit.md` (read), `docs/plans/refined-task-plan.yaml` (read), `specs/**` (read), `docs/bundles/Ticket-Authoring-Protocol.md` (read) |
| `dependencies` | (none declared) | `[1]` — depends on Task 1 completion |
| `acceptance_criteria` | Embedded in artifact contract | Structured list — see refined plan |
| `dispatchable` | (not declared — status: blocked) | `false` — blocked until Task 1 reaches `done` |
| `memory_compatible` | (not declared) | `true` — with context_tags and scope_files added |

### Planning changes are minimal
- No tasks are added, removed, or reordered
- No task titles or objectives are changed
- Only metadata fields (`context_tags`, `scope_files`, `dependencies`, `acceptance_criteria`, `dispatchable`, `memory_compatible`) are improved
- The embedded planning_control and planning_runtime YAML in Task 2 is preserved unchanged

---

## 4. Task-Aware Memory Risks

| Risk | Severity | Mitigation |
|---|---|---|
| `project/memory/task/` is empty — no prior task context for injection | Medium | Task 1 outputs should be indexed into task memory after review/freeze |
| Task 2 may be dispatched while Task 1 is still in `review` | High | Enforce `dependencies: [1]` so orchestrators block Task 2 dispatch until Task 1 reaches `done` |
| Constitution `AGENTS.md` says "Unknown Project" — memory-aware agents may misjudge project identity | Low | Constitution should be updated to reflect "Sarah's New Project" and confirmed tech stack, but this is out of scope for this task |
| No spec exists — wave planning (Task 2) will plan infrastructure waves only, not feature waves | Medium | Already noted in Task 2 description; wave planner must treat missing spec as a planning constraint and surface it as a gate |
| `project/memory/agent/` and `project/memory/context/` are empty — no agent run history | Low | Expected at wave-0; not a blocker |

---

## 5. Recommended Next Action

1. **Complete Task 1 (this task):** Write `task-plan-audit.md` and `refined-task-plan.yaml` to `docs/plans/`. Mark Task 1 as `done` after human review.
2. **Human review + freeze Task 1 outputs** before unblocking Task 2.
3. **Unblock Task 2** once Task 1 is frozen: update Task 2 status from `blocked` → `todo`.
4. **Run Task 2** (CLI Agent: plan execution waves) with `docs/plans/refined-task-plan.yaml` and `docs/plans/task-plan-audit.md` as read context. Wave planner must note the missing product spec as a structural constraint on wave scope.
5. **After Task 2:** Index both tasks' planning outputs into `project/memory/task/` so subsequent agents benefit from task-aware memory injection.
6. **Longer term:** The project owner must supply a product spec before feature-level task decomposition or wave planning beyond infrastructure waves can proceed.

---

*Execution trace: Inspected spec (blocked/empty), scaffold (minimal Next.js 14 + React 18 + Tailwind scaffold), memory index (3 entries: constitution, project, scaffold), task breakdown (2 tasks), and execution evidence (none — all agent/context/task memory directories empty, no prior PR docs). Task plan is structurally sound with two tasks at correct statuses. Gaps are limited to metadata fields only. No task regeneration needed. Refinements are minimal and field-level only.*
