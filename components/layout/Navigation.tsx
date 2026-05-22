'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'

const navSections = [
  'home',
  'portfolio',
  'about',
  'competencies',
  'feedbacks',
  'contact',
] as const

interface NavLinkProps {
  section: string
  label: string
  activeSection: string
  onClick?: () => void
}

function NavLink({ section, label, activeSection, onClick }: NavLinkProps) {
  const isActive = activeSection === section
  const href = section === 'home' ? '#' : `#${section}`

  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        'relative font-medium text-sm tracking-wide transition-colors duration-200',
        isActive ? 'text-secondary' : 'text-neutral-300 hover:text-white',
        'after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-secondary',
        'after:transition-all after:duration-300',
        isActive ? 'after:w-full' : 'hover:after:w-full',
      ].join(' ')}
    >
      {label}
    </Link>
  )
}

interface NavigationProps {
  activeSection: string
  onLinkClick?: () => void
  orientation?: 'horizontal' | 'vertical'
}

export function Navigation({
  activeSection,
  onLinkClick,
  orientation = 'horizontal',
}: NavigationProps) {
  const { t } = useTranslation()

  return (
    <nav
      className={
        orientation === 'horizontal'
          ? 'flex items-center gap-8'
          : 'flex flex-col gap-6'
      }
      aria-label="Main navigation"
    >
      {navSections.map((section) => (
        <NavLink
          key={section}
          section={section}
          label={t(`nav.${section}`)}
          activeSection={activeSection}
          onClick={onLinkClick}
        />
      ))}
    </nav>
  )
}
