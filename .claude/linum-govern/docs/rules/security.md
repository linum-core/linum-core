# Rule: Security

> Enforced by `lg-security`; sensitive changes route through the approval gate.

- No hardcoded secrets/credentials. Use environment variables (`.env.local` for dev, secret management in CI/CD).
- Validate and sanitize input at system boundaries. Guard against OWASP Top 10
  (injection, XSS, SQLi, broken authz, etc.).
- Auth / session handling changes are critical files and require approval.
- Keep dependencies current; flag known-risky packages (run `npm audit` regularly).
- Defensive posture only — no offensive tooling generated here.

## Critical Files
- `app/api/contact/route.ts` (input validation, email handling)
- `app/layout.tsx` (auth middleware, security headers)
- `next.config.ts` (security headers, CSP)

## Input Validation
- All API endpoints must validate request bodies.
- Sanitize form inputs before sending to external services.
- Type-check at runtime; trust TypeScript types only for internal code.
