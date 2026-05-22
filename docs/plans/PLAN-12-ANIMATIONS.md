# PLAN-12: Animation Enhancement Layer

> **For agentic workers:** REQUIRED SUB-SKILL: `superpowers:subagent-driven-development`

**Goal:** Enhance all existing sections with Framer Motion animations — section transitions, header scroll, stagger effects, and macOS glass card. Ensure `prefers-reduced-motion` is respected everywhere.

**Context:** Next.js 16.2.6 App Router at `/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio`.
- All sections exist (PLAN-06 through PLAN-11 complete)
- `components/animations/FadeIn.tsx` and `ScrollReveal.tsx` already exist
- This plan enhances existing code, does NOT rewrite sections

**Prerequisite:** All PLAN-01 through PLAN-11 must be complete.

---

## Task 1: GlassCard Animation Component

**Files:**
- Create: `components/animations/GlassCard.tsx`

- [ ] **Step 1: Create GlassCard**

```tsx
// components/animations/GlassCard.tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function GlassCard({ children, className = '', delay = 0 }: GlassCardProps) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, y: 20, scale: 0.98 }}
      whileInView={shouldReduce ? {} : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={`
        backdrop-blur-xl bg-white/[0.03]
        border border-white/10
        rounded-2xl
        shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}
```

---

## Task 2: Page Entry Animation

**Files:**
- Create: `components/animations/PageTransition.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create PageTransition wrapper**

```tsx
// components/animations/PageTransition.tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const shouldReduce = useReducedMotion()

  if (shouldReduce) return <>{children}</>

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Wrap main content in layout**

Open `app/layout.tsx`. Add `PageTransition` around children inside `<body>`:
```tsx
import { PageTransition } from '@/components/animations/PageTransition'

// In body, after providers:
<I18nProvider>
  <PageTransition>
    {children}
  </PageTransition>
</I18nProvider>
```

---

## Task 3: Stagger Animations for Card Groups

- [ ] **Step 1: Add motion stagger to PortfolioSection cards**

Open `components/sections/PortfolioSection.tsx`. The project grid already uses `motion.div` with `layout`. Add a `staggerContainer` wrapper around the grid:

```tsx
// Already has: <motion.div layout className="grid ...">
// Wrap the grid with:
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-100px' }}
>
  <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* existing cards */}
  </motion.div>
</motion.div>
```

Import `staggerContainer` from `@/lib/animations`.

- [ ] **Step 2: Add stagger to CompetenciesSection**

Open `components/sections/CompetenciesSection.tsx`. Wrap the grid:
```tsx
import { motion } from 'framer-motion'
import { staggerContainer } from '@/lib/animations'

// Wrap the grid with:
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-80px' }}
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
>
  {/* existing ScrollReveal cards */}
</motion.div>
```

---

## Task 4: Glowing Section Dividers

- [ ] **Step 1: Add subtle dividers between sections**

Create `components/ui/SectionDivider.tsx`:
```tsx
// components/ui/SectionDivider.tsx
export function SectionDivider() {
  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      aria-hidden="true"
    >
      <div className="h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
    </div>
  )
}
```

Add `<SectionDivider />` between each section in `app/page.tsx`:
```tsx
import { SectionDivider } from '@/components/ui/SectionDivider'

// Between each section:
<HeroSection />
<SectionDivider />
<PortfolioSection />
<SectionDivider />
<AboutSection />
// etc.
```

---

## Task 5: Verify and Commit

- [ ] **Step 1: TypeScript check**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
npx tsc --noEmit 2>&1 | grep "error" | head -20
```

- [ ] **Step 2: Build check**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
npm run build 2>&1 | tail -20
```

- [ ] **Step 3: Commit**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
git add components/animations/ components/ui/SectionDivider.tsx app/layout.tsx app/page.tsx
git commit -m "feat: enhance animations — page transition, glass cards, stagger effects, section dividers"
```
