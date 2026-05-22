# PLAN-04: Header + Navigation

> **For agentic workers:** REQUIRED SUB-SKILL: `superpowers:subagent-driven-development`

**Goal:** Build a sticky, responsive Header with transparent→solid scroll transition, desktop navigation, mobile hamburger drawer, language switcher, and active section detection.

**Context:** Next.js 16.2.6 App Router at `/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio`.
- Framer Motion 11 is installed (by PLAN-01)
- react-i18next is configured (by PLAN-03)
- Design tokens in globals.css: primary=#1a1a1a, secondary=#d4af37, accent=#00d9ff
- Logo at: `/public/assets/linum-core-logo-escrita.svg`
- Header height: 64px desktop / 56px mobile
- Nav sections: home, portfolio, about, competencies, feedbacks, contact

**AGENTS.md Warning:** Before writing any Next.js code, read:
```bash
ls "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio/node_modules/next/dist/docs/"
```

**Prerequisite:** PLAN-01, PLAN-03 must be complete.

---

## Task 1: Shared UI Components

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/ui/SectionTitle.tsx`

- [ ] **Step 1: Create Button component**

```tsx
// components/ui/Button.tsx
import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

const variants: Record<ButtonVariant, string> = {
  primary:   'bg-secondary text-primary font-semibold hover:bg-secondary-light active:scale-95 shadow-md',
  secondary: 'border border-accent text-accent hover:bg-accent/10 active:scale-95',
  ghost:     'text-neutral-300 hover:text-white active:scale-95',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  loading?: boolean
  disabled?: boolean
  className?: string
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  loading = false,
  disabled = false,
  className = '',
  children,
  onClick,
  type = 'button',
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed'
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" />
          </svg>
          {children}
        </span>
      ) : children}
    </button>
  )
}
```

- [ ] **Step 2: Create SectionTitle component**

```tsx
// components/ui/SectionTitle.tsx
interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionTitle({ title, subtitle, align = 'center', className = '' }: SectionTitleProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <div className={`flex flex-col ${alignClass} mb-12 ${className}`}>
      <h2 className="font-heading text-3xl md:text-4xl text-white font-semibold tracking-wide">
        {title}
      </h2>
      <div className="mt-3 w-16 h-0.5 bg-secondary" />
      {subtitle && (
        <p className="mt-4 text-neutral-300 text-lg max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
```

---

## Task 2: Header Component

**Files:**
- Create: `components/layout/Header.tsx`
- Create: `components/layout/Navigation.tsx`

- [ ] **Step 1: Create Navigation component**

```tsx
// components/layout/Navigation.tsx
'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'

const navSections = ['home', 'portfolio', 'about', 'competencies', 'feedbacks', 'contact'] as const

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
      className={`
        relative font-medium text-sm tracking-wide transition-colors duration-200
        ${isActive ? 'text-secondary' : 'text-neutral-300 hover:text-white'}
        after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-secondary
        after:transition-all after:duration-300
        ${isActive ? 'after:w-full' : 'hover:after:w-full'}
      `}
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

export function Navigation({ activeSection, onLinkClick, orientation = 'horizontal' }: NavigationProps) {
  const { t } = useTranslation()

  return (
    <nav
      className={orientation === 'horizontal' ? 'flex items-center gap-8' : 'flex flex-col gap-6'}
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
```

- [ ] **Step 2: Create LanguageSwitcher**

```tsx
// components/layout/LanguageSwitcher.tsx
'use client'

import { useState } from 'react'
import { useLanguage, languageLabels } from '@/lib/hooks/useLanguage'
import type { SupportedLanguage } from '@/lib/i18n/config'

export function LanguageSwitcher() {
  const { currentLanguage, changeLanguage } = useLanguage()
  const [open, setOpen] = useState(false)

  const current = languageLabels[currentLanguage] ?? languageLabels['en']

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-neutral-300 hover:text-white text-sm transition-colors"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span>{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
        <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-2 py-1 min-w-[140px] bg-primary-light border border-secondary/20 rounded-lg shadow-xl z-50"
        >
          {(Object.entries(languageLabels) as [SupportedLanguage, { label: string; flag: string }][]).map(([lang, { label, flag }]) => (
            <li key={lang}>
              <button
                role="option"
                aria-selected={currentLanguage === lang}
                onClick={() => { changeLanguage(lang); setOpen(false) }}
                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-primary transition-colors ${
                  currentLanguage === lang ? 'text-secondary' : 'text-neutral-300 hover:text-white'
                }`}
              >
                <span>{flag}</span>
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Create full Header component**

```tsx
// components/layout/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Navigation } from './Navigation'
import { LanguageSwitcher } from './LanguageSwitcher'

function useActiveSection() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const sections = ['contact', 'feedbacks', 'competencies', 'about', 'portfolio', 'home']
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id || 'home')
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id === 'home' ? 'hero' : id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return activeSection
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeSection = useActiveSection()
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.95])
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.2])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
        style={{
          backgroundColor: `rgba(26, 26, 26, ${bgOpacity.get()})`,
          borderBottom: `1px solid rgba(212, 175, 55, ${borderOpacity.get()})`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-16">
            {/* Logo */}
            <Link href="#" aria-label="Linum Core — Home">
              <Image
                src="/assets/linum-core-logo-escrita.svg"
                alt="Linum Core"
                width={140}
                height={40}
                priority
                className="h-8 w-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <Navigation activeSection={activeSection} />
              <LanguageSwitcher />
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-neutral-300 hover:text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-primary-dark border-l border-secondary/20 p-8 md:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-end mb-8">
                  <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="text-neutral-400 hover:text-white">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <Navigation
                  activeSection={activeSection}
                  onLinkClick={() => setMobileOpen(false)}
                  orientation="vertical"
                />
                <div className="mt-auto pt-8 border-t border-secondary/20">
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
```

- [ ] **Step 4: TypeScript check**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
npx tsc --noEmit 2>&1 | grep -E "error" | head -20
```
Fix any TypeScript errors before continuing.

- [ ] **Step 5: Commit**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
git add components/layout/ components/ui/Button.tsx components/ui/SectionTitle.tsx
git commit -m "feat: add Header with navigation, mobile drawer, and language switcher"
```
