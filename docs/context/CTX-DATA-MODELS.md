# CTX: Data Models — Linum Core Portfolio

> TypeScript interfaces used across the project. Define once in `lib/types.ts`.

## File: `lib/types.ts`

```typescript
export type ProjectStatus = 'complete' | 'in-progress'

export interface Project {
  id: string
  title: string
  description: string            // i18n key or static string
  tech: string[]                 // ['TypeScript', 'React', 'PostgreSQL']
  githubUrl?: string
  liveUrl?: string
  screenshotUrl?: string         // /public/projects/<id>.png or placeholder
  status: ProjectStatus
  featured: boolean
}

export interface Testimonial {
  id: string
  name: string
  company: string
  role: string
  quote: string                  // i18n key or static
  rating: number                 // 1-5
  avatarUrl?: string             // or initials fallback
}

export interface Competency {
  id: string
  titleKey: string               // i18n key
  descriptionKey: string         // i18n key
  icon: string                   // emoji or SVG path
}

export interface RadarSkill {
  subject: string
  value: number                  // 0-100
  fullMark: 100
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'instagram' | 'whatsapp' | 'email'
  url: string
  label: string
}
```

## Static Data Files

### `lib/data/projects.ts`
```typescript
import type { Project } from '@/lib/types'

export const projects: Project[] = [
  {
    id: 'linum-core-portfolio',
    title: 'Linum Core Portfolio',
    description: 'Professional portfolio website built with Next.js 16, Tailwind CSS 4, and Framer Motion.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/GgvGomes',
    status: 'in-progress',
    featured: true,
  },
  {
    id: 'project-2',
    title: 'Enterprise System',
    description: 'Full-stack enterprise management system with real-time dashboards.',
    tech: ['Node.js', 'React', 'PostgreSQL', 'Docker'],
    status: 'complete',
    featured: true,
  },
  {
    id: 'project-3',
    title: 'API Integration Platform',
    description: 'Scalable API gateway connecting legacy systems to modern interfaces.',
    tech: ['Python', 'FastAPI', 'Redis', 'AWS'],
    status: 'complete',
    featured: false,
  },
]
```

### `lib/data/testimonials.ts`
```typescript
import type { Testimonial } from '@/lib/types'

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos Silva',
    company: 'TechBR',
    role: 'CTO',
    quote: 'Gabriel delivered exactly what we needed — a system that truly connects our departments. Exceptional work.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Ana Costa',
    company: 'Startup XYZ',
    role: 'CEO',
    quote: 'Linum Core transformed our outdated processes into a modern, reliable platform. Highly recommended.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Pedro Santos',
    company: 'Consultora ABC',
    role: 'Project Manager',
    quote: 'Professional, fast, and the results exceeded our expectations. The API integration was flawless.',
    rating: 5,
  },
]
```

### `lib/data/competencies.ts`
```typescript
import type { Competency } from '@/lib/types'

export const competencies: Competency[] = [
  { id: 'dev', icon: '⚙️', titleKey: 'competencies.dev.title', descriptionKey: 'competencies.dev.description' },
  { id: 'consulting', icon: '🧭', titleKey: 'competencies.consulting.title', descriptionKey: 'competencies.consulting.description' },
  { id: 'api', icon: '🔗', titleKey: 'competencies.api.title', descriptionKey: 'competencies.api.description' },
  { id: 'maintenance', icon: '🛠️', titleKey: 'competencies.maintenance.title', descriptionKey: 'competencies.maintenance.description' },
  { id: 'architecture', icon: '🏗️', titleKey: 'competencies.architecture.title', descriptionKey: 'competencies.architecture.description' },
  { id: 'transformation', icon: '🚀', titleKey: 'competencies.transformation.title', descriptionKey: 'competencies.transformation.description' },
]
```

### `lib/data/social.ts`
```typescript
import type { SocialLink } from '@/lib/types'

export const socialLinks: SocialLink[] = [
  { platform: 'github', url: 'https://github.com/GgvGomes', label: 'GitHub' },
  { platform: 'linkedin', url: 'https://linkedin.com/in/gabriel-gomes', label: 'LinkedIn' },
  { platform: 'instagram', url: 'https://instagram.com/linumcore', label: 'Instagram' },
  { platform: 'whatsapp', url: 'https://wa.me/5500000000000', label: 'WhatsApp' },
  { platform: 'email', url: 'mailto:ggvgabriel05@gmail.com', label: 'Email' },
]
```

### `lib/data/radarSkills.ts`
```typescript
import type { RadarSkill } from '@/lib/types'

export const radarSkills: RadarSkill[] = [
  { subject: 'Frontend', value: 90, fullMark: 100 },
  { subject: 'Backend', value: 85, fullMark: 100 },
  { subject: 'Infra/DevOps', value: 75, fullMark: 100 },
  { subject: 'Consulting', value: 88, fullMark: 100 },
  { subject: 'Architecture', value: 82, fullMark: 100 },
  { subject: 'Communication', value: 92, fullMark: 100 },
]
```
