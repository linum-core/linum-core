# Rule: Typing

> Enforced by `lg-code-reviewer`; checked by the typecheck validation command.

- Explicit types. No `any`, no untyped public functions.
- Type strictness: **strict** (TypeScript strict mode enabled).
- Validate only at system boundaries (user input, external APIs). Trust internal code and
  framework guarantees.
- Inject dependencies via constructor/parameter, not global import, where the language
  supports it.

## React Component Types

```tsx
interface MyComponentProps {
  title: string
  variant?: "primary" | "secondary"
  onClick?: (e: React.MouseEvent) => void
}

const MyComponent: React.FC<MyComponentProps> = (props) => {
  // ...
}
```

## Avoiding `any`
- Use `unknown` + type guard if type is genuinely dynamic.
- Use generics for reusable utilities.
- Define API response types explicitly.

## Validation at Boundaries
- API routes: validate request bodies with `zod` or `io-ts` (if needed).
- Form inputs: validate before submission.
- External API responses: type them explicitly.
