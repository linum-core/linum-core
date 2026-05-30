# Service Boundaries — linum-core-portfolio

> Defines where responsibilities end and new domains begin. Used by `governance-auditor`
> to detect cross-boundary coupling and by `plan-orchestrator` to scope work.

## Domains

### 1. Presentation Layer (`app/`)

**Owns**: routing, page structure, layout management, i18n routing.

**Files**:
- `app/layout.tsx` (root layout)
- `app/[locale]/layout.tsx` (locale layout)
- `app/[locale]/page.tsx` (home page entry)
- `app/page.tsx` (redirect to locale)

**Depends on**:
- `src/components/*` (section and UI components)
- `next-intl` (i18n)

**Boundaries**:
- Do not import from `src/libs/api/*` here; fetch via client-side axios or API routes.
- Do not fetch directly in page components; use API routes or streaming where needed.

### 2. Component Layer (`src/components/`)

**Owns**: React components (sections, UI), prop types, component composition.

**Files**:
- Section components: `HeroSection`, `PortfolioSection`, `AboutSection`, `FeedbacksSection`, `ContactSection`, `ManifestoSection`
- UI components: `FilterBar`, `TabBar`, `StatusBadge`, `AnimatedWordReveal`, etc.
- Sub-components and extracted presentational components

**Depends on**:
- `src/libs/animation/*` (Framer Motion helpers)
- `src/constants/*` (enums)
- `recharts`, `framer-motion`, `zustand`

**Boundaries**:
- Components are presentation-focused; business logic lives in hooks or utilities.
- Do not directly call API endpoints; use `axios` instances or custom hooks.

### 3. API Layer (`app/api/`)

**Owns**: HTTP route handlers, request/response validation, error handling.

**Files**:
- `app/api/contact/route.ts` (contact form endpoint)

**Depends on**:
- `gqwen-auth` (optional auth integration)
- External services (email, etc.)

**Boundaries**:
- No direct component imports; API layer is backend-facing.
- Validate all request bodies before processing.

### 4. Utilities Layer (`src/libs/`)

**Owns**: animation helpers, custom hooks, constants.

**Subdirs**:
- `src/libs/animation/` — Framer Motion utilities, scroll tracking hooks (`useSectionProgress`, `useReveal`)
- `src/constants/enums.ts` — app-wide enums

**Boundaries**:
- Do not import UI components; this is logic-only.
- Exported functions must be typed and documented.

## Cross-Boundary Rules

- **Presentation ↔ Components**: One-way; presentation composes components, not vice versa.
- **Components ↔ API**: One-way via `axios`; no direct imports.
- **Components ↔ Libs**: One-way; components use lib utilities (hooks, constants).
- **API ↔ Libs**: One-way; API uses lib utilities.

## Coupling Risk Zones

- Hardcoded strings in components → migrate to i18n.
- API client logic scattered across components → extract to a service layer or custom hook.
- Circular imports between `src/libs/` and `src/components/` → violates SRP.
