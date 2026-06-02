# Rule: Auto-Approve Agent Edits to `app/` and `src/`

**Purpose**: Eliminate redundant permission dialogs for agent edits scoped to `app/` and `src/` directories once a plan is approved.

**Decision date**: 2026-05-31

---

## Scope

Agent tool calls (`Edit`, `Write`) targeting files inside `app/**` or `src/**` do NOT trigger Claude Code permission dialogs.

Edits are permitted when:
- The agent operates under an approved plan (`.claude/linum-govern/state/approved-plan` marker exists).
- The target file path matches `app/**` or `src/**`.
- The file is NOT listed in `criticalFileGlobs` (see below).

---

## Mechanism

Two orthogonal layers enforce this rule:

### Layer 1: Claude Code Native (Runtime)
File: `.claude/settings.local.json`

Entries in `permissions.allow`:
```json
{
  "permissions": {
    "allow": [
      "Edit(app/**)",
      "Edit(src/**)",
      "Write(app/**)",
      "Write(src/**)"
    ]
  }
}
```

**Effect**: Suppresses Claude Code's native pre-tool permission dialog for any `Edit` or `Write` call matching those paths.

### Layer 2: linum-govern Config (Intent)
File: `.claude/linum-govern/config.json`

Field: `allowedEditDirs: ["app", "src"]`

**Effect**: Declares the non-gated directories for human maintainers and future plugin versions that may read this field. Currently advisory; not read by `plan-gate.sh`.

---

## Protected Files

Files in `criticalFileGlobs` remain protected by the approval gate, even if their parent directory is listed in `allowedEditDirs`:

```
**/auth/**
**/middleware.*
app/api/**
app/layout.tsx
next.config.*
.claude/linum-govern/contracts/**
src/libs/animation/**
messages/**
```

**Example:**
- Editing `src/components/layout/Header.tsx` → no approval gate (in allowedEditDirs, not in criticalFileGlobs).
- Editing `app/api/contact/route.ts` → approval gate fires (in criticalFileGlobs, even though parent dir is in allowedEditDirs).

---

## Maintenance

To add or remove directories from auto-approval:

1. Update `permissions.allow` in `.claude/settings.local.json`.
   - Add: `"Edit(path/**)", "Write(path/**)"`.
   - Remove: delete the entries.

2. Update `allowedEditDirs` in `.claude/linum-govern/config.json`.
   - Add: append the directory name to the array.
   - Remove: delete the entry.

3. Optionally: verify critical files are not covered by the new directory.

---

## Non-Goals

This rule does **not**:
- Bypass the approval gate for critical files.
- Auto-approve edits outside `app/` and `src/`.
- Modify bundled linum-govern plugin code.
- Remove the plan-gate requirement (plans must exist).

---

## See Also

- `PLAN-001-auto-approve-src-app-edits.md` — full architecture and risks.
- `.claude/linum-govern/config.json` — allowedEditDirs and criticalFileGlobs.
- `.claude/settings.local.json` — permissions.allow entries.
