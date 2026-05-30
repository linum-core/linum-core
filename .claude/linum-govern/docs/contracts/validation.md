# Validation Contract

> Defines what must pass before a change is considered complete.

## Lint

```bash
bun run lint
```

**Success**: ESLint finds no errors or warnings.  
**Failure**: Fix violations per `rules/code-style.md`.

## Typecheck

```bash
tsc --noEmit
```

**Success**: No TypeScript errors in strict mode.  
**Failure**: Fix type violations per `rules/typing.md`.

## Build

```bash
bun run build
```

**Success**: Next.js build succeeds; `.next/` is generated.  
**Failure**: Debug build errors (missing types, config issues).

## Test (E2E)

```bash
bun run test:e2e
```

**Success**: All Playwright tests pass (or expected failures are documented).  
**Failure**: Fix test failures or update expectations with rationale.

## Pre-Commit Checklist

Before pushing:

- [ ] `bun run lint` passes
- [ ] `tsc --noEmit` passes
- [ ] `bun run build` succeeds
- [ ] `bun run test:e2e` passes (or failures are expected)
- [ ] New components are tested (E2E coverage)
- [ ] i18n strings are in `messages/{locale}.json`
- [ ] Commit message references the task / issue

## CI/CD Gates

Automated checks run on every PR. All must pass before merge.
