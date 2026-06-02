# Validation Checklist: Auto-Approve Dirs

**Status**: Ready for manual testing after next `/build`.

---

## Test 1: Non-Critical File in `src/` (Should NOT prompt)

1. Start a new Claude Code session.
2. In the project, open any file under `src/` (e.g., `src/components/layout/header/components/side-logo/index.tsx`).
3. Ask Claude to make a trivial whitespace edit (add a blank line, remove trailing space, etc.).
4. **Expected**: No permission dialog. Edit proceeds immediately.
5. **Result**: ✅ PASS / ❌ FAIL

---

## Test 2: Critical File in `app/api/` (Should STILL prompt)

1. In the same session, open `app/api/contact/route.ts`.
2. Ask Claude to make a trivial edit.
3. **Expected**: `approval-gate.sh` dialog appears (approval required).
4. **Result**: ✅ PASS / ❌ FAIL

---

## Test 3: Critical File in `app/` (app/layout.tsx - Should STILL prompt)

1. Open `app/layout.tsx`.
2. Ask Claude to make a trivial edit.
3. **Expected**: `approval-gate.sh` dialog appears.
4. **Result**: ✅ PASS / ❌ FAIL

---

## Test 4: Non-Critical File in `app/` (Should NOT prompt)

1. Open any file under `app/` that is NOT critical (e.g., `app/[locale]/layout.tsx` or `app/components/SomeComponent.tsx`).
2. Ask Claude to edit.
3. **Expected**: No dialog. Edit proceeds.
4. **Result**: ✅ PASS / ❌ FAIL

---

## Rollback (if any test fails)

1. Delete `.claude/settings.local.json`.
2. Remove `allowedEditDirs` key from `.claude/linum-govern/config.json`.
3. Delete this checklist file.

---

## Sign-off

Once all tests pass:
- [ ] Test 1: Non-critical in src — ✅
- [ ] Test 2: Critical in app/api — ✅
- [ ] Test 3: Critical in app/layout — ✅
- [ ] Test 4: Non-critical in app — ✅

**Date**: _____________
**User**: _____________
