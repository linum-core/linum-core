# PLAN-09: Competencies Section

> **For agentic workers:** REQUIRED SUB-SKILL: `superpowers:subagent-driven-development`

**Goal:** Build the Competencies section — 6 service cards in a responsive grid with glowing border hover effects.

**Context:** Next.js 16.2.6 App Router at `/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio`.
- Data: `lib/data/competencies.ts` (created by PLAN-01)
- Uses `components/ui/Card.tsx` (created by PLAN-07)
- Grid: 1-col mobile, 2-col tablet, 3-col desktop
- Hover: border pulses cyan glow

**Prerequisite:** PLAN-01, PLAN-04, PLAN-06, PLAN-07 must be complete.

---

## Task 1: GlowBorder Component

**Files:**
- Create: `components/ui/GlowBorder.tsx`

- [ ] **Step 1: Create GlowBorder**

```tsx
// components/ui/GlowBorder.tsx
interface GlowBorderProps {
  color?: 'cyan' | 'gold'
  className?: string
  children: React.ReactNode
}

export function GlowBorder({ color = 'cyan', className = '', children }: GlowBorderProps) {
  const glowClass = color === 'cyan'
    ? 'hover:[animation:glow-pulse_2s_ease-in-out_infinite_alternate]'
    : 'hover:[animation:gold-pulse_2s_ease-in-out_infinite_alternate]'

  return (
    <div className={`transition-all duration-300 rounded-lg ${glowClass} ${className}`}>
      {children}
    </div>
  )
}
```

---

## Task 2: Competencies Section

**Files:**
- Create: `components/sections/CompetenciesSection.tsx`

- [ ] **Step 1: Create CompetenciesSection**

```tsx
// components/sections/CompetenciesSection.tsx
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Card } from '@/components/ui/Card'
import { GlowBorder } from '@/components/ui/GlowBorder'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { competencies } from '@/lib/data/competencies'

const staticCompetencies = [
  {
    id: 'dev',
    icon: '⚙️',
    title: 'Software Development',
    description: 'Custom systems built with modern technology stacks, tailored to your business needs.',
  },
  {
    id: 'consulting',
    icon: '🧭',
    title: 'Systems Consulting',
    description: 'Strategic analysis and roadmaps to align your technology with your business goals.',
  },
  {
    id: 'api',
    icon: '🔗',
    title: 'API Integration',
    description: 'Connecting your existing systems and third-party services into a unified, reliable layer.',
  },
  {
    id: 'maintenance',
    icon: '🛠️',
    title: 'Maintenance & Support',
    description: 'Ongoing technical support, updates, and performance optimization for your systems.',
  },
  {
    id: 'architecture',
    icon: '🏗️',
    title: 'Architecture Design',
    description: 'Scalable, secure system architecture designed for growth and resilience.',
  },
  {
    id: 'transformation',
    icon: '🚀',
    title: 'Digital Transformation',
    description: 'Guiding businesses through the transition to modern digital operations.',
  },
]

export function CompetenciesSection() {
  return (
    <section
      id="competencies"
      aria-label="Competencies — What We Do"
      className="py-20 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionTitle
            title="What We Do"
            subtitle="End-to-end solutions that restore your digital connections"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staticCompetencies.map((comp, i) => (
            <ScrollReveal key={comp.id} delay={i * 0.07}>
              <GlowBorder className="h-full">
                <Card className="h-full p-8 flex flex-col gap-4 group">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary border border-secondary/20 text-2xl group-hover:border-accent/40 transition-colors duration-300"
                    aria-hidden="true"
                  >
                    {comp.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-lg text-white font-semibold group-hover:text-secondary transition-colors duration-300">
                    {comp.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-400 text-sm leading-relaxed flex-1">
                    {comp.description}
                  </p>

                  {/* Hover arrow */}
                  <div className="flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                    <span>Learn more</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Card>
              </GlowBorder>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to app/page.tsx**
```tsx
import { CompetenciesSection } from '@/components/sections/CompetenciesSection'
// inside <main> after AboutSection:
<CompetenciesSection />
```

- [ ] **Step 3: Commit**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
git add components/ui/GlowBorder.tsx components/sections/CompetenciesSection.tsx app/page.tsx
git commit -m "feat: add Competencies section with glowing card grid"
```
