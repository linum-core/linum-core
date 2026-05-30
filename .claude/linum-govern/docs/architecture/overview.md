# Architecture Overview — linum-core-portfolio

> Derived by `/init-linum` from the repo scan. Keep current as the architecture evolves.

## Stack

**Framework**: Next.js 16.2.6 with App Router  
**Language**: TypeScript 5 (strict mode)  
**Styling**: Tailwind CSS 4  
**Testing**: Playwright E2E  
**Package manager**: bun  
**i18n**: next-intl (en, pt-BR)

## High-level structure

```
app/                 # Next.js App Router
├── layout.tsx       # Root layout
├── [locale]/        # i18n segments
│   ├── layout.tsx
│   └── page.tsx
├── api/             # API routes (contact)
└── robots.ts        # SEO metadata

src/                 # Core application code
├── libs/
│   └── animation/   # Framer Motion animations, scroll tracking
├── constants/       # Enums and constants
├── components/      # React components (sections, UI)
└── types/           # Type definitions

tests/               # Playwright E2E tests
├── visual/
├── functional/
└── ...

public/              # Static assets (SVG, images)
docs/                # User documentation
```

## Entry points

- **Web**: `app/layout.tsx` → root layout with i18n middleware
- **API**: `app/api/contact/route.ts` → contact form handler
- **Development**: `npm run dev` → Next.js dev server on port 3000
- **Tests**: `npm run test:e2e` → Playwright headless browser tests

## Data flow

1. **Client entry**: User navigates to `/` (or locale-prefixed path)
2. **i18n middleware**: next-intl routes to `[locale]/page.tsx`
3. **Layout render**: Root layout → locale layout → page component
4. **Component tree**: Page renders section components (Hero, Portfolio, About, etc.)
5. **API calls**: Contact form → `POST /api/contact` → response handling
6. **Animations**: Framer Motion + scroll tracking via `useSectionProgress`

## Notes

- This overview is read during Context Loading by `plan-orchestrator` and audited by
  `governance-auditor`. Keep it accurate; stale architecture docs cause bad plans.
- i18n is critical to the UX — never hardcode strings in components.
- Next.js Image component requires explicit `sizes` prop for responsive rendering.
- Playwright tests run against `http://localhost:3000` (dev server must be running).
