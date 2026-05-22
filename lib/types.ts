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
