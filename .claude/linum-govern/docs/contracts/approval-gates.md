# Approval Gates

> Define human decision points in the workflow. Gates are ask-gates: they do not hard-fail,
> but record the approval or bypass.

## Plan Approval Gate

Triggered after `/plan` generates a plan.

**Gate**: Review the generated plan for architectural fit, estimated complexity, and scope.

**Approval check**:
- Is the plan aligned with `architecture/overview.md`?
- Do new API contracts match `contracts/validation.md`?
- Are critical files (`app/api/`, `next.config.ts`) affected? (triggers security review)

**Bypass**: `/govern bypass plan-approval <reason>`

## Delivery Gate

Triggered after `/build` completes.

**Gate**: Verify test output, lint/typecheck pass, artifacts are present.

**Approval check**:
- Does `bun run lint` pass?
- Does `bun run build` succeed?
- Do Playwright tests pass or have expected failures?

**Bypass**: `/govern bypass delivery <reason>`

## Security Gate

Triggered if changes touch:
- `app/api/contact/route.ts` (input validation, external requests)
- `app/layout.tsx` (auth, security headers)
- `next.config.ts` (CSP, headers)

**Gate**: `lg-security` audits the diff.

**Approval check**:
- No hardcoded secrets?
- Input validation present?
- No OWASP violations?

**Bypass**: `/govern bypass security <reason>`
