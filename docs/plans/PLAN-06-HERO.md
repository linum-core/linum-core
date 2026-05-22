# PLAN-06: Hero Section

> **For agentic workers:** REQUIRED SUB-SKILL: `superpowers:subagent-driven-development`

**Goal:** Build the Hero section — full viewport height with tagline, subtitle, CTA button, 3D rotating cube animation, and subtle background gradient.

**Context:** Next.js 16.2.6 App Router at `/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio`.
- Framer Motion 11 is installed
- CSS 3D cube inspired by Resend.com
- Tagline: "There's an unseen connection…" (from i18n `hero.tagline`)
- CTA links to #contact
- Background: radial gradient from #1a1a1a with faint cyan glow center
- Full viewport: `min-h-screen`

**Prerequisite:** PLAN-01 (deps + globals.css), PLAN-04 (Button component).

---

## Task 1: Cube3D Animation

**Files:**
- Create: `components/animations/Cube3D.tsx`

- [ ] **Step 1: Create CSS 3D rotating cube**

```tsx
// components/animations/Cube3D.tsx
'use client'

import { useReducedMotion } from 'framer-motion'

interface Cube3DProps {
  size?: number
  className?: string
}

export function Cube3D({ size = 120, className = '' }: Cube3DProps) {
  const shouldReduce = useReducedMotion()

  const half = size / 2

  const faceStyle = (transform: string, bg: string, border: string): React.CSSProperties => ({
    position: 'absolute',
    width: size,
    height: size,
    transform,
    background: bg,
    border: `1px solid ${border}`,
    borderRadius: 2,
    backfaceVisibility: 'hidden',
  })

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size, perspective: size * 4 }}
      aria-hidden="true"
    >
      <div
        style={{
          width: size,
          height: size,
          position: 'relative',
          transformStyle: 'preserve-3d',
          animation: shouldReduce ? 'none' : `cube-rotate 15s linear infinite`,
        }}
      >
        {/* Front */}
        <div style={faceStyle(`translateZ(${half}px)`, 'rgba(0, 217, 255, 0.04)', 'rgba(0, 217, 255, 0.5)')} />
        {/* Back */}
        <div style={faceStyle(`rotateY(180deg) translateZ(${half}px)`, 'rgba(212, 175, 55, 0.04)', 'rgba(212, 175, 55, 0.5)')} />
        {/* Left */}
        <div style={faceStyle(`rotateY(-90deg) translateZ(${half}px)`, 'rgba(0, 217, 255, 0.02)', 'rgba(0, 217, 255, 0.3)')} />
        {/* Right */}
        <div style={faceStyle(`rotateY(90deg) translateZ(${half}px)`, 'rgba(212, 175, 55, 0.02)', 'rgba(212, 175, 55, 0.3)')} />
        {/* Top */}
        <div style={faceStyle(`rotateX(90deg) translateZ(${half}px)`, 'rgba(255, 255, 255, 0.02)', 'rgba(255, 255, 255, 0.15)')} />
        {/* Bottom */}
        <div style={faceStyle(`rotateX(-90deg) translateZ(${half}px)`, 'rgba(255, 255, 255, 0.02)', 'rgba(255, 255, 255, 0.15)')} />
      </div>
    </div>
  )
}
```

---

## Task 2: FadeIn and ScrollReveal Animations

**Files:**
- Create: `components/animations/FadeIn.tsx`
- Create: `components/animations/ScrollReveal.tsx`

- [ ] **Step 1: Create FadeIn**

```tsx
// components/animations/FadeIn.tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const shouldReduce = useReducedMotion()

  if (shouldReduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: fadeInUp.hidden,
        visible: {
          ...fadeInUp.visible,
          transition: { ...(fadeInUp.visible as { transition: object }).transition, delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Create ScrollReveal**

```tsx
// components/animations/ScrollReveal.tsx
'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { fadeInUp } from '@/lib/animations'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  if (shouldReduce) return <div ref={ref} className={className}>{children}</div>

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: fadeInUp.hidden,
        visible: {
          ...fadeInUp.visible,
          transition: { ...(fadeInUp.visible as { transition: object }).transition, delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

---

## Task 3: Hero Section

**Files:**
- Create: `components/sections/HeroSection.tsx`

- [ ] **Step 1: Create HeroSection**

```tsx
// components/sections/HeroSection.tsx
'use client'

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Cube3D } from '@/components/animations/Cube3D'
import { FadeIn } from '@/components/animations/FadeIn'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <section
      id="hero"
      aria-label="Hero — Introduction"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0, 217, 255, 0.04) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 80% 20%, rgba(212, 175, 55, 0.03) 0%, transparent 60%),
            #1a1a1a
          `,
        }}
      />

      {/* Floating cube — decorative */}
      <div
        className="absolute right-8 md:right-16 lg:right-24 top-1/2 -translate-y-1/2 opacity-60"
        aria-hidden="true"
        style={{ animation: 'float 5s ease-in-out infinite' }}
      >
        <Cube3D size={100} className="hidden md:block" />
        <Cube3D size={60} className="block md:hidden" />
      </div>

      {/* Second cube — smaller, offset */}
      <div
        className="absolute left-8 md:left-16 bottom-1/4 opacity-30"
        aria-hidden="true"
        style={{ animation: 'float 7s ease-in-out infinite reverse' }}
      >
        <Cube3D size={60} className="hidden lg:block" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Pre-headline */}
        <motion.div variants={fadeInUp}>
          <span className="inline-block font-code text-accent text-sm tracking-widest uppercase mb-6 opacity-80">
            Linum Core — Gabriel Gomes
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-6"
          variants={fadeInUp}
        >
          {t('hero.tagline').split('…')[0]}
          <span className="text-secondary">…</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-neutral-300 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
          variants={fadeInUp}
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          variants={fadeInUp}
        >
          <Button href="#contact" variant="primary" size="lg">
            {t('hero.cta')}
          </Button>
          <Button href="#portfolio" variant="secondary" size="lg">
            {t('nav.portfolio')}
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60"
        aria-hidden="true"
      >
        <span className="text-neutral-500 text-xs tracking-widest uppercase">{t('hero.scrollHint')}</span>
        <div style={{ animation: 'scroll-bounce 1.5s ease-in-out infinite' }}>
          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Update app/page.tsx to include Hero**

```tsx
// app/page.tsx
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        {/* Remaining sections added as each PLAN completes */}
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: TypeScript check**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
npx tsc --noEmit 2>&1 | grep "error" | head -10
```

- [ ] **Step 4: Commit**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
git add components/animations/ components/sections/HeroSection.tsx app/page.tsx
git commit -m "feat: add Hero section with 3D cube animation and entrance effects"
```
