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
