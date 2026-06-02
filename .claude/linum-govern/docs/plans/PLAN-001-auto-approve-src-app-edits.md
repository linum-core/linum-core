---
id: PLAN-001
topic: auto-approve-src-app-edits
status: draft
created: 2026-05-31
hash:
---

# PLAN-001 — Auto-approve agent edits scoped to `app/` and `src/`

## Context

During `/build` executions, `lg-*` specialist agents trigger two separate permission
dialogs for every file they edit inside `app/` or `src/`:

1. **Claude Code runtime dialog** — because `Edit` and `Write` tool calls are not
   pre-authorized in `permissions.allow` of `.claude/settings.local.json`.
2. **linum-govern plan-gate dialog** — because `plan-gate.sh` emits
   `permissionDecision: "ask"` for any edit that lacks an `approved-plan` state marker,
   with no directory-level exception.

The developer wants edits to `app/` and `src/` (non-critical paths as defined in
`config.json`) to proceed automatically once a plan is approved, without manual
confirmation on every file touch.

## Goals

- Eliminate redundant Claude Code native permission prompts for `Edit` and `Write`
  inside `app/` and `src/`.
- Allow the linum-govern `plan-gate.sh` to automatically pass for those directories
  when a `state/approved-plan` marker exists, without modifying the bundled plugin.
- Keep the existing `criticalFileGlobs` in `config.json` fully enforced by
  `approval-gate.sh` (auth, middleware, API routes, layout, next.config, contracts,
  animation libs, messages).
- Record the mechanism as a governance rule so future agents understand the intent.

## Non-Goals

- Bypassing the `approval-gate.sh` for critical files — those must still require
  explicit per-change approval.
- Modifying the bundled linum-govern plugin files under
  `/Users/gabrielgv/.claude/plugins/cache/linum-govern-marketplace/` — plugin code is
  not owned by the repo.
- Removing the plan-gate entirely — the gate continues to enforce plan existence.
- Auto-approving edits outside `app/` and `src/` (e.g., `tests/`, `public/`,
  `next.config.*`, `app/api/**`).
- Creating a bypass that persists across sessions without an approved plan.

## Scope

- **Affected areas**:
  - `.claude/settings.local.json` — add `Edit` and `Write` allow entries for `app/**`
    and `src/**`.
  - `.claude/linum-govern/config.json` — add an `allowedEditDirs` key listing the
    non-gated directories.
  - `.claude/linum-govern/docs/rules/` — add a new governance rule file documenting
    the auto-approval scope.
  - `.claude/linum-govern/docs/plans/` — this plan file itself.

- **What to read**:
  - `.claude/settings.local.json` (permissions structure, hook registrations)
  - `.claude/linum-govern/config.json` (criticalFileGlobs, team, validationCommands)
  - Plugin `hooks/lib/state.sh` (gate helper functions, `lg_is_govern_path`,
    `lg_is_critical`)
  - Plugin `hooks/plan-gate.sh` (gate decision logic)

- **Docs to create/update**:
  - `.claude/linum-govern/docs/rules/auto-approve-dirs.md` — new rule.
  - `.claude/linum-govern/config.json` — new `allowedEditDirs` field.

- **Sub-plans**: none — single atomic delivery.

## Risks

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| `Edit(app/**)` allow glob in settings silently applies to files that are also covered by `criticalFileGlobs` (e.g., `app/api/**`, `app/layout.tsx`) — the Claude Code native allow would skip the dialog but `approval-gate.sh` would still fire | Medium | The `approval-gate.sh` runs independently of the native allow; it reads `criticalFileGlobs` from config. Critical files will still get the approval gate dialog. Document this layering clearly in the rule. |
| Developer edits `allowedEditDirs` in `config.json` to include `app/api/**` or `**/auth/**` — eroding the critical-file boundary | Low | The governance rule must explicitly state that `allowedEditDirs` entries must not overlap with `criticalFileGlobs`. A note in `config.json` reinforces this. |
| Future plugin update overrides `plan-gate.sh` and removes support for the `allowedEditDirs` extension point | Low | The extension is in the repo-owned `config.json`, not in the plugin. Any plugin update that removes that key simply reverts to the original gate behavior — it cannot silently expand permissions. |
| `Edit(app/**)` glob format not supported by Claude Code's permission system (the format may require exact path prefixes, not glob patterns) | Medium | Subtask 1 must validate the exact syntax Claude Code accepts. Fallback: use `additionalDirectories` in `settings.local.json` which is already proven to work (the file already contains one entry for `/docs`). |

## Dependencies

- **Claude Code `settings.local.json` permissions model** — the exact syntax for `Edit`
  and `Write` allow entries with directory globs must be verified against Claude Code
  documentation / observed behavior before writing.
- **linum-govern `plan-gate.sh`** — the gate currently has no `allowedEditDirs` hook.
  The config extension is advisory (documents intent for human agents / future plugin
  versions). The native `permissions.allow` entries carry the actual runtime enforcement.
- No external dependencies.

## Architecture impact

**Boundaries / coupling / SoC**:
The solution uses two orthogonal mechanisms that do not couple to each other:
1. Claude Code native `permissions.allow` — runtime tool-call filtering.
2. `config.json` extension + governance rule — intent documentation and future-proofing.

`plan-gate.sh` continues unchanged. The `approval-gate.sh` continues unchanged. No
plugin code is modified. The repo-owned `config.json` gains one new optional key
(`allowedEditDirs`) that is purely declarative at this stage.

**Scalability / maintainability**:
Adding or removing directories from the auto-approve list requires only one edit to
`settings.local.json` (allow entries) and one edit to `config.json` (`allowedEditDirs`
array). Documented in the rule file for discoverability.

**Security**:
`app/api/**`, `app/layout.tsx`, and all other `criticalFileGlobs` remain protected by
`approval-gate.sh`. The native allow entries for `app/**` and `src/**` do not suppress
the approval gate — they suppress only the Claude Code pre-tool dialog. The two layers
are independent. This must be verified during implementation and documented.

**Observability**:
No changes to logging or state tracking. The `state/.sentinels/` dedup mechanism in
`plan-gate.sh` continues to operate normally.

**Performance**: No impact.

## Validation plan

- **Deterministic**:
  - `bun run lint` — rule file must pass ESLint if any JS is touched (none expected).
  - `tsc --noEmit` — no TypeScript changes; trivially passes.
  - Manual smoke: start a new Claude Code session, open a file in `src/`, issue an Edit
    — confirm no permission dialog appears.

- **Crucial**:
  - `lg-security` must confirm that `app/api/**` and `**/auth/**` remain gated after
    the allow entries are added (i.e., `approval-gate.sh` still fires for those paths).

- **Manual**:
  1. Open `src/components/layout/header/components/side-logo/index.tsx` in a new session.
  2. Ask Claude to make a trivial whitespace edit.
  3. Confirm: no native dialog, no plan-gate dialog (assuming an approved plan exists).
  4. Open `app/api/contact/route.ts`.
  5. Ask Claude to make a trivial edit.
  6. Confirm: `approval-gate.sh` dialog still appears.

## Critical files (approval gate)

The following files modified by this plan are NOT in `criticalFileGlobs` — no
additional approval gate applies. However, `settings.local.json` is a sensitive
file (controls Claude Code permissions) and should be reviewed carefully.

- `.claude/settings.local.json` — outside criticalFileGlobs; review manually.
- `.claude/linum-govern/config.json` — governance config; within `linum-govern/` path,
  always allowed by `lg_is_govern_path`.
- `.claude/linum-govern/docs/rules/auto-approve-dirs.md` — governance docs; always
  allowed.

## Rollback

1. Remove the `Edit(app/**)`, `Edit(src/**)`, `Write(app/**)`, `Write(src/**)` entries
   from `permissions.allow` in `.claude/settings.local.json`.
2. Remove the `allowedEditDirs` key from `.claude/linum-govern/config.json`.
3. Delete `.claude/linum-govern/docs/rules/auto-approve-dirs.md`.

Rollback is atomic and safe — no compiled artifacts, no database migrations.

## Subtasks (deterministic, waved)

| # | Subtask | Wave | Owner (lg-*) | Required validation | Depends on |
|---|---------|------|--------------|---------------------|------------|
| 1 | Verify Claude Code `permissions.allow` syntax for `Edit` and `Write` with directory paths (check docs / test in isolation) | 1 | lg-architect | Manual: confirm syntax accepted without error | — |
| 2 | Add `Edit` and `Write` allow entries for `app/**` and `src/**` to `.claude/settings.local.json` | 2 | lg-frontend | Manual: new session, edit file in `src/`, no dialog | 1 |
| 3 | Add `allowedEditDirs` key to `.claude/linum-govern/config.json` with `["app", "src"]` | 2 | lg-architect | JSON valid; key present | 1 |
| 4 | Create `.claude/linum-govern/docs/rules/auto-approve-dirs.md` documenting the rule, scope, and layering with `criticalFileGlobs` | 3 | lg-architect | Rule file matches docs standard | 2, 3 |
| 5 | `lg-security` validates that `approval-gate.sh` still fires for `app/api/**` and `app/layout.tsx` after allow entries are added | 4 | lg-security | Manual gate verification | 2 |
| 6 | Dev validates: edit `src/` file without dialog; edit `app/api/` file still prompts | 5 | dev (human) | AskUserQuestion confirmation | 5 |
