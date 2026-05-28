---
name: <Plan title>
overview: <One sentence: approach + wave-based execution model>
todos:
  - id: wave0-contracts
    content: "Wave 0 (parent): Pin shared contracts for all agents"
    status: pending
  - id: wave1-agent-a
    content: "Wave 1 parallel — Agent A: <scope>"
    status: pending
  - id: wave1-agent-b
    content: "Wave 1 parallel — Agent B: <scope>"
    status: pending
  - id: wave2-agent-c
    content: "Wave 2 — Agent C: <scope>"
    status: pending
  - id: wave3-verify
    content: "Wave 3: jest, tsc-verify, manual checklist, review"
    status: pending
isProject: false
---

# <Plan title>

## Goals

- <!-- What success looks like -->
-

## No-goals

- <!-- Explicit out-of-scope / rejected approaches -->
-

## Validation

<!-- Why this approach; optional comparison table -->

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| Chosen | | | Selected |
| Alternative A | | | Rejected |

## Target flow

```
1. <!-- Step -->
2. <!-- Step -->
3. <!-- Step -->
```

```mermaid
sequenceDiagram
  participant A as Actor
  participant B as Component
  A->>B: Action
  B-->>A: Response
```

## Rejected

- <!-- Alternative + reason -->
-

## File change matrix

| Path | Action | Intent |
|------|--------|--------|
| `path/to/file.ts` | Create / Update / Delete | <!-- one line --> |

## Wave 0 — Contracts

Pass to all subagents:

| Rule | Detail |
|------|--------|
| <!-- contract name --> | <!-- detail --> |

## Execution — waves

```mermaid
flowchart TB
  subgraph wave1 [Wave 1 — parallel]
    A1[Agent A: scope]
    A2[Agent B: scope]
  end
  subgraph wave2 [Wave 2]
    B1[Agent C: scope]
  end
  wave1 --> wave2
  wave2 --> V[Wave 3: verify]
```

### Wave 1

Dispatch in one message; `run_in_background: true` when multitask is enabled.

| Agent | Type | Files |
|-------|------|-------|
| A | cavecrew-builder / generalPurpose | `path/a.ts` |
| B | cavecrew-builder / generalPurpose | `path/b.ts` |

### Wave 2

| Agent | Type | Files |
|-------|------|-------|
| C | generalPurpose | `path/c.ts` |

### Wave 3

- Tests: `jest`, `tsc-verify`
- Manual checklist (below)
- Optional: `cavecrew-reviewer`

## Implementation detail

### Agent A — <title>

<!-- Files, snippets, constraints -->

### Agent B — <title>

<!-- Files, snippets, constraints -->

## Manual verification

1. <!-- Check -->
2. <!-- Check -->

## Out of scope

- <!-- Repeat critical no-goals -->
-
