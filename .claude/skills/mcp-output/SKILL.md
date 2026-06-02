---
name: mcp-output
description: Use whenever running MCP tools that produce test results, screenshots, audit reports, or any output worth persisting — Playwright, Lighthouse, Axe, visual diffs, etc. Governs where output lands, how runs are numbered, and what analysis to write alongside raw results.
version: 1.0.0
user-invocable: false
---

# MCP Output Management

Every MCP tool execution that produces artifacts (test results, screenshots, reports, logs) MUST follow this protocol.

## Folder Convention

```
.mcp_output/
  <tool>/          ← one subfolder per MCP tool
    01/            ← first run
    02/            ← second run
    ...
```

**Rules:**
- Root: `.mcp_output/` at project root (not committed to git — add to `.gitignore`)
- Tool subfolder: lowercase, no spaces. Examples: `playwright`, `lighthouse`, `axe`, `visual-diff`
- Run folder: 2-digit zero-padded ordinal, sequential per tool (`01`, `02`, … `99`)
- Never reuse or overwrite a run folder

## Getting the Next Run Path

```bash
RUN_DIR=$(bash .claude/skills/mcp-output/scripts/next-run.sh <tool>)
# example: RUN_DIR=.mcp_output/playwright/03
```

Always call this BEFORE starting the tool execution, so you know where to route output.

## Standard Files per Run

Every run folder SHOULD contain:

| File | Content |
|---|---|
| `raw.txt` | Full raw output from the tool (stdout / JSON dump) |
| `summary.md` | Your analysis (see template below) |
| `screenshots/` | Any screenshots captured during the run (optional) |

## summary.md Template

```markdown
# <Tool> Run <NN> — <YYYY-MM-DD HH:MM>

## Status
PASS | FAIL | PARTIAL

## What was tested
- <scope or URL or test file>

## Results
- Total: X   Passed: X   Failed: X   Skipped: X

## Failures
### <test name>
- **Error:** <exact error message>
- **File:** <file:line>
- **Root cause:** <your analysis>
- **Fix:** <suggested fix>

## Observations
<Anything notable that isn't a hard failure — warnings, slow tests, flaky behavior>

## Next steps
- [ ] <actionable item>
```

## Playwright — Specific Protocol

When running Playwright tests:

1. Get run dir:
   ```bash
   RUN_DIR=$(bash .claude/skills/mcp-output/scripts/next-run.sh playwright)
   ```

2. Run tests, capture output:
   ```bash
   npx playwright test 2>&1 | tee "${RUN_DIR}/raw.txt"
   ```
   Or with HTML report:
   ```bash
   PLAYWRIGHT_HTML_REPORT="${RUN_DIR}/report" npx playwright test --reporter=html 2>&1 | tee "${RUN_DIR}/raw.txt"
   ```

3. Write `${RUN_DIR}/summary.md` with the template above, filled with actual results.

4. If tests failed: read the failures in `raw.txt`, diagnose root causes, add them to `summary.md` under **Failures**.

5. Cross-reference with previous run if one exists:
   - Did a previously failing test now pass? Note as regression fix.
   - Did a previously passing test now fail? Flag as new regression.

## Other Tools

| Tool | Subfolder | Raw file |
|---|---|---|
| Lighthouse | `lighthouse` | `raw.json` (lighthouse JSON report) |
| Axe / a11y | `axe` | `raw.json` |
| Visual diff | `visual-diff` | `diff.png` + `raw.json` |
| Custom scripts | `<script-name>` | `raw.txt` |

## Memory Between Runs

The `summary.md` files ARE the memory. When resuming work:

1. Check `ls .mcp_output/<tool>/` to see run history
2. Read latest `summary.md` for current state
3. Compare with previous run's summary if debugging regressions

Do NOT duplicate run summaries into Claude memory files — the folder IS the store.

## .gitignore

`.mcp_output/` should be in `.gitignore` unless the team explicitly wants to share run history. Raw tool output is local context, not source.
