# PLAN-10: Feedbacks / Testimonials Section

> **For agentic workers:** REQUIRED SUB-SKILL: `superpowers:subagent-driven-development`

**Goal:** Build an auto-advancing testimonial carousel with manual prev/next controls, dot indicators, and gold star ratings.

**Context:** Next.js 16.2.6 App Router at `/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio`.
- Data: `lib/data/testimonials.ts` (created by PLAN-01)
- Framer Motion `AnimatePresence` for smooth slide transitions
- Auto-advances every 5 seconds, pauses on hover
- Gold star ratings (⭐)

**Prerequisite:** PLAN-01, PLAN-06 must be complete.

---

## Task 1: Feedbacks Section

**Files:**
- Create: `components/sections/FeedbacksSection.tsx`

- [ ] **Step 1: Create FeedbacksSection**

```tsx
// components/sections/FeedbacksSection.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { testimonials } from '@/lib/data/testimonials'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-secondary' : 'text-neutral-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function Avatar({ name }: { name: string }) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  return (
    <div
      className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary/40 to-accent/20 border border-secondary/30 flex items-center justify-center text-white font-heading font-semibold text-sm"
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  }),
}

export function FeedbacksSection() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setDirection(1)
    setIndex(i => (i + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setIndex(i => (i - 1 + testimonials.length) % testimonials.length)
  }, [])

  const goTo = useCallback((i: number) => {
    setDirection(i > index ? 1 : -1)
    setIndex(i)
  }, [index])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [paused, next])

  const current = testimonials[index]

  return (
    <section
      id="feedbacks"
      aria-label="Testimonials — What Clients Say"
      className="py-20 md:py-32 bg-primary-dark/30"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionTitle title="What Clients Say" subtitle="Real results, real connections" />
        </ScrollReveal>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="bg-primary-light/40 backdrop-blur-md border border-secondary/20 rounded-xl p-8 md:p-12"
              >
                {/* Stars */}
                <div className="mb-6">
                  <StarRating rating={current.rating} />
                </div>

                {/* Quote */}
                <blockquote className="text-neutral-100 text-lg md:text-xl leading-relaxed mb-8 italic">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <Avatar name={current.name} />
                  <div>
                    <p className="font-heading text-secondary font-semibold">{current.name}</p>
                    <p className="text-neutral-400 text-sm">{current.role} · {current.company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-secondary/20 text-neutral-400 hover:text-white hover:border-secondary/60 flex items-center justify-center transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2" role="tablist" aria-label="Testimonials navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === index
                      ? 'w-6 h-2 bg-secondary'
                      : 'w-2 h-2 bg-neutral-600 hover:bg-secondary/60'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-secondary/20 text-neutral-400 hover:text-white hover:border-secondary/60 flex items-center justify-center transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to app/page.tsx**
```tsx
import { FeedbacksSection } from '@/components/sections/FeedbacksSection'
// inside <main> after CompetenciesSection:
<FeedbacksSection />
```

- [ ] **Step 3: Commit**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
git add components/sections/FeedbacksSection.tsx app/page.tsx
git commit -m "feat: add Feedbacks carousel with auto-advance and dot navigation"
```
