# CTX: Animations — Linum Core Portfolio

> Animation specifications for Framer Motion and CSS animations.

## Principles
- 60fps GPU-accelerated (use transform/opacity, never width/height)
- `prefers-reduced-motion`: always wrap with `useReducedMotion()` guard
- Sophisticated, not excessive — each animation serves communication
- Duration range: 200ms (micro) → 800ms (section entrance)

## Framer Motion Variants

### fadeInUp (primary entrance)
```typescript
export const fadeInUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
```

### fadeIn (simple)
```typescript
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}
```

### staggerContainer (for groups of items)
```typescript
export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}
```

### slideInLeft / slideInRight
```typescript
export const slideInLeft = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
export const slideInRight = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
```

### scaleIn (for cards)
```typescript
export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}
```

## FadeIn Component Pattern

```typescript
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
      variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { ...fadeInUp.visible.transition, delay } } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

## ScrollReveal Component Pattern

```typescript
// components/animations/ScrollReveal.tsx
'use client'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { fadeInUp } from '@/lib/animations'

export function ScrollReveal({ children, delay = 0, className }: FadeInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  if (shouldReduce) return <div ref={ref} className={className}>{children}</div>

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

## CSS Animations (in globals.css @theme)

```css
@keyframes glow-pulse {
  from { box-shadow: 0 0 5px #00d9ff40; }
  to   { box-shadow: 0 0 20px #00d9ff80, 0 0 40px #00d9ff40; }
}

@keyframes gold-pulse {
  from { box-shadow: 0 0 5px #d4af3740; }
  to   { box-shadow: 0 0 20px #d4af3780; }
}

@keyframes cube-rotate {
  0%   { transform: rotateX(0deg) rotateY(0deg); }
  25%  { transform: rotateX(90deg) rotateY(90deg); }
  50%  { transform: rotateX(180deg) rotateY(180deg); }
  75%  { transform: rotateX(270deg) rotateY(270deg); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-12px); }
}

@keyframes scroll-bounce {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50%       { transform: translateY(8px); opacity: 0.5; }
}
```

## Cube3D Specification

The 3D cube is inspired by Resend's landing page. It should:
- Rotate continuously (slow, ~15s per rotation)
- Have 6 faces with different gold/cyan opacity
- Be positioned as a decorative element in the Hero section
- Float gently (float animation)
- Size: 100-150px on desktop, 60-80px on mobile
- Use CSS `transform-style: preserve-3d`

```tsx
// Cube face colors:
// Front:  border-accent/60  bg-accent/5
// Back:   border-secondary/60  bg-secondary/5
// Left:   border-accent/40  bg-accent/3
// Right:  border-secondary/40  bg-secondary/3
// Top:    border-white/20  bg-white/3
// Bottom: border-white/20  bg-white/3
```

## Header Scroll Behavior

```typescript
// In Header.tsx (client component)
import { useScroll, useTransform, motion } from 'framer-motion'

const { scrollY } = useScroll()
const bgOpacity = useTransform(scrollY, [0, 80], [0, 1])
const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.2])

// Apply:
// background: `rgba(26, 26, 26, ${bgOpacity})`
// border-bottom: `rgba(212, 175, 55, ${borderOpacity})`
// backdrop-filter: blur(20px) always on
```
