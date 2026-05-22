# PLAN-08: About CEO Section

> **For agentic workers:** REQUIRED SUB-SKILL: `superpowers:subagent-driven-development`

**Goal:** Build the About CEO section with bio, photo placeholder, radar chart (Recharts), and technical skills tags.

**Context:** Next.js 16.2.6 App Router at `/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio`.
- CEO: Gabriel Gomes | Contact: ggvgabriel05@gmail.com
- Recharts 2 is installed (by PLAN-01)
- Data: `lib/data/radarSkills.ts` (created by PLAN-01)
- Photo: `/public/assets/Frame.png` (if it exists and is a photo) or styled initials avatar
- Colors: gold (#d4af37) for chart fill, cyan (#00d9ff) for chart stroke

**Prerequisite:** PLAN-01, PLAN-04, PLAN-06 must be complete.

---

## Task 1: About Section

**Files:**
- Create: `components/sections/AboutSection.tsx`

- [ ] **Step 1: Check if Frame.png is a usable photo**
```bash
ls -la "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio/public/assets/Frame.png"
file "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio/public/assets/Frame.png"
```
Use it as photo source if it's a valid image. Otherwise use the styled avatar fallback below.

- [ ] **Step 2: Create Radar Chart (client component)**

```tsx
// components/sections/RadarChart.tsx
'use client'

import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { radarSkills } from '@/lib/data/radarSkills'

export function SkillsRadarChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <RechartsRadarChart data={radarSkills} cx="50%" cy="50%" outerRadius="70%">
        <PolarGrid stroke="rgba(212, 175, 55, 0.15)" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: '#e0e0e0', fontSize: 12, fontFamily: 'Inter, sans-serif' }}
        />
        <Radar
          name="Gabriel Gomes"
          dataKey="value"
          stroke="#00d9ff"
          fill="#d4af37"
          fillOpacity={0.2}
          strokeWidth={2}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#2a2a2a',
            border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: 4,
            color: '#ffffff',
            fontSize: 12,
          }}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  )
}
```

- [ ] **Step 3: Create AboutSection**

```tsx
// components/sections/AboutSection.tsx
import Image from 'next/image'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SkillsRadarChart } from './RadarChart'

const technicalSkills = [
  'TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL',
  'Docker', 'Python', 'FastAPI', 'Redis', 'AWS',
  'Git', 'CI/CD', 'REST APIs', 'GraphQL', 'Linux',
]

function Avatar() {
  return (
    <div className="relative">
      {/* Try Frame.png, fall back to styled avatar */}
      <div className="w-48 h-48 md:w-56 md:h-56 rounded-xl overflow-hidden border-2 border-secondary/30 shadow-lg shadow-secondary/10">
        <Image
          src="/assets/Frame.png"
          alt="Gabriel Gomes — CEO Linum Core"
          width={224}
          height={224}
          className="object-cover w-full h-full"
          onError={() => {}}
        />
      </div>
      {/* Gold frame accent */}
      <div className="absolute -bottom-3 -right-3 w-16 h-16 border-2 border-accent/40 rounded-xl" aria-hidden="true" />
    </div>
  )
}

export function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About — Gabriel Gomes CEO"
      className="py-20 md:py-32 bg-primary-dark/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionTitle title="About the CEO" subtitle="Gabriel Gomes" />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Photo + bio */}
          <div className="flex flex-col gap-8">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <Avatar />
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-neutral-300 leading-relaxed">
                    I&apos;m Gabriel Gomes, founder and CEO of Linum Core. With years of experience
                    in software development, systems consulting, and digital transformation, I help
                    companies build the connections they didn&apos;t know they were missing.
                  </p>
                  <p className="text-neutral-400 leading-relaxed text-sm">
                    My approach combines technical precision with a deep understanding of business needs
                    — delivering solutions that are not just functional, but transformative.
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="https://github.com/GgvGomes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:text-accent-light transition-colors"
                      aria-label="Gabriel Gomes on GitHub"
                    >
                      GitHub ↗
                    </a>
                    <span className="text-neutral-600">|</span>
                    <a
                      href="mailto:ggvgabriel05@gmail.com"
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      ggvgabriel05@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Technical skills tags */}
            <ScrollReveal delay={0.15}>
              <div>
                <h3 className="font-heading text-secondary text-sm tracking-widest uppercase mb-4">
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {technicalSkills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-code px-3 py-1 rounded border border-accent/20 text-accent/80 hover:border-accent/60 hover:text-accent transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Radar chart */}
          <ScrollReveal delay={0.2}>
            <div className="bg-primary-light/30 rounded-xl border border-secondary/10 p-6">
              <h3 className="font-heading text-white text-center text-sm tracking-widest uppercase mb-6">
                Expertise Radar
              </h3>
              <SkillsRadarChart />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Add to app/page.tsx**
```tsx
import { AboutSection } from '@/components/sections/AboutSection'
// inside <main> after PortfolioSection:
<AboutSection />
```

- [ ] **Step 5: Commit**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
git add components/sections/AboutSection.tsx components/sections/RadarChart.tsx app/page.tsx
git commit -m "feat: add About CEO section with radar chart and skills"
```
