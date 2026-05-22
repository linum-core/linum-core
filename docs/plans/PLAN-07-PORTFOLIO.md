# PLAN-07: Portfolio Section

> **For agentic workers:** REQUIRED SUB-SKILL: `superpowers:subagent-driven-development`

**Goal:** Build the Portfolio section with project cards, status filters, glassmorphism cards, and scroll reveal animations.

**Context:** Next.js 16.2.6 App Router at `/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio`.
- Data source: `lib/data/projects.ts` (created by PLAN-01)
- Uses `components/ui/Card.tsx` (glassmorphism)
- Uses `components/animations/ScrollReveal.tsx` (created by PLAN-06)
- Uses `components/ui/SectionTitle.tsx` (created by PLAN-04)

**Prerequisite:** PLAN-01, PLAN-04, PLAN-06 must be complete.

---

## Task 1: Card Component

**Files:**
- Create: `components/ui/Card.tsx`

- [ ] **Step 1: Create Card**

```tsx
// components/ui/Card.tsx
interface CardProps {
  glowColor?: 'cyan' | 'gold'
  className?: string
  children: React.ReactNode
}

export function Card({ glowColor = 'cyan', className = '', children }: CardProps) {
  const hoverBorder = glowColor === 'cyan' ? 'hover:border-accent/60' : 'hover:border-secondary/60'
  const hoverShadow = glowColor === 'cyan'
    ? 'hover:shadow-[0_0_20px_rgba(0,217,255,0.15)]'
    : 'hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]'

  return (
    <div
      className={`
        bg-primary-light/40 backdrop-blur-md
        border border-secondary/20 rounded-lg
        transition-all duration-300
        ${hoverBorder} ${hoverShadow}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
```

---

## Task 2: Portfolio Section

**Files:**
- Create: `components/sections/PortfolioSection.tsx`

- [ ] **Step 1: Create PortfolioSection**

```tsx
// components/sections/PortfolioSection.tsx
'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { projects } from '@/lib/data/projects'
import type { ProjectStatus } from '@/lib/types'

type FilterOption = 'all' | ProjectStatus

const techColors: Record<string, string> = {
  'TypeScript': 'text-accent border-accent/30',
  'React':      'text-accent border-accent/30',
  'Next.js':    'text-white border-white/20',
  'Node.js':    'text-secondary border-secondary/30',
  'PostgreSQL': 'text-secondary border-secondary/30',
  'Docker':     'text-neutral-300 border-neutral-500/30',
  'Python':     'text-secondary border-secondary/30',
  'FastAPI':    'text-accent border-accent/30',
  'Redis':      'text-neutral-300 border-neutral-500/30',
  'AWS':        'text-neutral-300 border-neutral-500/30',
}

function getTechStyle(tech: string): string {
  return techColors[tech] ?? 'text-neutral-400 border-neutral-500/30'
}

export function PortfolioSection() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<FilterOption>('all')

  const filtered = filter === 'all' ? projects : projects.filter(p => p.status === filter)

  const filterBtns: { key: FilterOption; label: string }[] = [
    { key: 'all', label: t('portfolio.filter.all') },
    { key: 'complete', label: t('portfolio.filter.complete') },
    { key: 'in-progress', label: t('portfolio.filter.inProgress') },
  ]

  return (
    <section
      id="portfolio"
      aria-label="Portfolio — Our Work"
      className="py-20 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionTitle
            title={t('portfolio.title')}
            subtitle={t('portfolio.subtitle')}
          />
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-3 justify-center mb-12" role="group" aria-label="Filter projects">
            {filterBtns.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                aria-pressed={filter === key}
                className={`
                  px-5 py-2 rounded text-sm font-medium border transition-all duration-200
                  ${filter === key
                    ? 'bg-secondary text-primary border-secondary'
                    : 'border-secondary/20 text-neutral-400 hover:border-secondary/60 hover:text-white'
                  }
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: i * 0.05 } }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card className="h-full p-6 flex flex-col">
                  {/* Status badge */}
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded border ${
                        project.status === 'complete'
                          ? 'text-secondary border-secondary/40 bg-secondary/10'
                          : 'text-accent border-accent/40 bg-accent/10'
                      }`}
                    >
                      {t(`portfolio.status.${project.status === 'complete' ? 'complete' : 'inProgress'}`)}
                    </span>
                    {project.featured && (
                      <span className="text-xs text-neutral-500">★ Featured</span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-lg text-white font-semibold mb-3">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-400 text-sm leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className={`text-xs px-2 py-0.5 rounded border font-code ${getTechStyle(tech)}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 mt-auto">
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
                        aria-label={`${project.title} on GitHub`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        {t('portfolio.github')}
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-accent hover:text-accent-light transition-colors flex items-center gap-1.5"
                        aria-label={`${project.title} live demo`}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        {t('portfolio.live')}
                      </Link>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to app/page.tsx**

Open `app/page.tsx` and add `PortfolioSection` after `HeroSection`:
```tsx
import { PortfolioSection } from '@/components/sections/PortfolioSection'
// ... inside <main>:
<HeroSection />
<PortfolioSection />
```

- [ ] **Step 3: Commit**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
git add components/ui/Card.tsx components/sections/PortfolioSection.tsx app/page.tsx
git commit -m "feat: add Portfolio section with glassmorphism cards and filter"
```
