# CTX: Component API Contracts — Linum Core Portfolio

> Props and usage for all shared UI components. Agents should implement these exactly.

## `components/ui/Button.tsx`

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string           // if set, renders as <a> or Next.js <Link>
  loading?: boolean
  disabled?: boolean
  className?: string
  children: React.ReactNode
  onClick?: () => void
}
```

**Visual specs:**
- `primary`: bg-secondary (gold) text-primary font-semibold — hover: bg-secondary-light, glow animation
- `secondary`: border border-accent text-accent — hover: bg-accent/10, glow
- `ghost`: text-neutral-300 — hover: text-white
- Sizes: sm=px-4 py-2 text-sm, md=px-6 py-3 text-base (default), lg=px-8 py-4 text-lg
- Transition: all 300ms ease
- border-radius: 4px (subtle, not pill)

## `components/ui/Card.tsx`

```typescript
interface CardProps {
  glowColor?: 'cyan' | 'gold'  // border glow on hover
  className?: string
  children: React.ReactNode
}
```

**Visual specs:**
- Base: `bg-primary-light/40 backdrop-blur-md border border-secondary/20 rounded-lg p-6`
- Hover: `border-accent/60` (cyan) or `border-secondary/60` (gold)
- Transition: border-color 300ms ease, box-shadow 300ms ease
- Optional hover glow: box-shadow `0 0 20px #00d9ff20`

## `components/ui/SectionTitle.tsx`

```typescript
interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}
```

**Visual specs:**
- `title`: Cinzel font (font-heading), text-3xl md:text-4xl, text-white
- Gold underline: 2px solid secondary, width 60px, below title, margin-top 8px
- `subtitle`: Inter font, text-neutral-300, text-lg, margin-top 12px

## `components/ui/GlowBorder.tsx`

```typescript
interface GlowBorderProps {
  color?: 'cyan' | 'gold'
  active?: boolean          // force active glow (else hover only)
  className?: string
  children: React.ReactNode
}
```

**Visual specs:**
- Wrapper div with `position: relative`
- On hover: triggers `animate-glow` CSS animation
- Smooth transition 300ms

## `components/layout/Header.tsx`

No external props. Uses:
- `useScroll` from framer-motion for transparent→solid transition
- `usePathname` from next/navigation for active link detection
- `useTranslation` from react-i18next
- Mobile: hamburger (☰) → slide-in drawer from right (Framer Motion)
- Logo: `/public/assets/linum-core-logo-escrita.svg` via Next.js `Image`
- Z-index: 50 (always on top)
- Height: 64px desktop, 56px mobile

## Section Component Convention

Every section (`components/sections/*.tsx`) must:
1. Be a Server Component by default (no `'use client'`)
2. Accept `id` prop matching nav anchor (e.g., `id="portfolio"`)
3. Wrap content in `<section id={id} aria-label={sectionTitle} className="py-20 md:py-32">`
4. Use `SectionTitle` for heading
5. Apply `ScrollReveal` from `components/animations/ScrollReveal.tsx` on main content
