# Rule: Testing

> Enforced by `lg-test`; runs via the test validation command.

- Test framework: **Playwright** (E2E only; no unit tests required).
- Run with `bun run test:e2e`.
- Every new feature gets an E2E test; every bug fix gets a regression test.
- Tests are F.I.R.S.T: fast, independent, repeatable, self-validating, timely.
- Tests run against dev server: `bun run dev` must be running on port 3000.
- Never claim passing without showing the run output.

## Test Organization
- Visual tests: `tests/visual/`
- Functional tests: `tests/functional/`
- E2E reports: `playwright-report/` (HTML output)

## Test Naming
- File: `{feature}.spec.ts` (e.g., `homepage.spec.ts`, `contact.spec.ts`)
- Test: `test("{description}", async ({ page }) => { ... })`
