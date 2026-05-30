# Rule: Code Style

> Enforced by `lg-code-reviewer` and `governance-auditor`. `/init-linum` confirms/adjusts
> these from the repo's existing conventions.

- One thing per function; one responsibility per module (SRP).
- Early returns over nested ifs. Max 2 levels of indentation.
- No code duplication — extract shared logic.
- No dead code, no half-finished implementations, no speculative abstractions (YAGNI).
- Exception/error messages include the offending value and the expected shape.
- Formatting: use Prettier (via ESLint config-next defaults). No style debate beyond it.

## Comments
- Default to no comments. Add one only when the WHY is non-obvious.
- Explain WHY, not WHAT. Reference issue / commit when a line exists for a specific reason.
- Keep existing comments on refactor — they carry intent.

## React-specific
- Prefer `"use client"` only on interactive components.
- No inline styles; use Tailwind CSS classes.
- Props interfaces must be explicit; no `React.FC` spread props.
