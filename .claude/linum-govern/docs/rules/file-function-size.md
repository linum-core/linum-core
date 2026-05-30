# Rule: File & Function Size

> Enforced by `lg-code-reviewer` and `governance-auditor`.

- Functions: **4-20 lines** (split if longer).
- Files: under **500 lines** (split by responsibility).
- Prefer small focused modules over god files. When a file grows large, it is doing too
  much — extract.

## React Components

- Single component per file (except tightly coupled sub-components).
- Extract repeated JSX patterns into reusable components.
- If a component file exceeds 200 lines, consider splitting into presentational + container.
