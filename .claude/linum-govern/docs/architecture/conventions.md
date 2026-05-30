# Conventions — linum-core-portfolio

> Enforced by `governance-auditor` during planning and `lg-code-reviewer` during review.

## File & Folder Organization

- **Flat component directories**: `src/components/{ComponentName}/index.tsx`
- **Grouped utilities**: `src/libs/{feature}/{file.ts}`
- **Index exports**: Use `index.tsx` for component barrels to simplify imports
- **TypeScript first**: All new code is `.ts` or `.tsx`; no `.js`

## Naming

- **Components**: PascalCase (e.g., `HeroSection`, `FilterBar`)
- **Utilities**: camelCase (e.g., `useSectionProgress`, `animationHelpers`)
- **Hooks**: `use*` prefix (e.g., `useReveal`)
- **Files**: match exported name (e.g., `HeroSection.tsx`)
- **Constants**: UPPER_SNAKE_CASE (enums in `src/constants/enums.ts`)

## Component Structure

```tsx
"use client"  // if needed for interactive features

import type { FC } from "react"

interface Props {
  variant?: "primary" | "secondary"
  onClick?: () => void
}

const MyComponent: FC<Props> = ({ variant = "primary", onClick }) => {
  // Logic here
  return <div>...</div>
}

export default MyComponent
```

## Import Paths

- Relative imports for sibling/child files
- `@/*` for absolute paths from project root (configured in `tsconfig.json`)

## i18n

- All user-facing strings: `next-intl` via `useTranslations()`
- Supported locales: **en**, **pt-BR**
- Message files: `messages/{locale}.json`
- Never hardcode UI text in JSX

## API Routes

- Endpoint structure: `app/api/{resource}/route.ts`
- Validation: Parse + validate all request bodies before processing
- Error responses: Include error code + message
- CORS: Configured in Next.js middleware

## Testing

- Test runner: Playwright
- Test location: `tests/{category}/{feature}.spec.ts`
- Categories: `visual/`, `functional/`
- Naming: `{page}.spec.ts` (e.g., `homepage.spec.ts`)

## Type Safety

- Explicit return types on functions
- No `any` types
- Props interfaces exported from component files
- API response types co-located with route handlers

## Comments

- Default: none. Add only for non-obvious WHY.
- Reference issue/commit if a line exists for a specific reason.
- Keep comments during refactoring — they carry context.
