# Rule: Naming

> Enforced by `lg-code-reviewer`.

- Names are specific and unique. Avoid generic `data`, `handler`, `Manager`, `utils`.
- Prefer names that return few grep hits in the codebase (high specificity).
- Follow the repo's casing conventions:
  - **Components**: PascalCase (e.g., `HeroSection`)
  - **Functions/hooks**: camelCase (e.g., `useSectionProgress`)
  - **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`)
  - **Files**: match exported name
- Identifiers, comments, and commit messages in **English**.

## Examples

❌ Bad: `handleData`, `utils.ts`, `MyComponent`  
✅ Good: `filterPortfolioByCategory`, `animationHelpers.ts`, `PortfolioFilter`
