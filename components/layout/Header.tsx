'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion'
import { Navigation } from './Navigation'
import { LanguageSwitcher } from './LanguageSwitcher'

const NAV_SECTIONS = [
  'contact',
  'feedbacks',
  'competencies',
  'about',
  'portfolio',
  'home',
] as const

function useActiveSection() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            // Map 'hero' element back to 'home' section name
            setActiveSection(id === 'hero' ? 'home' : id)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )

    NAV_SECTIONS.forEach((section) => {
      const elementId = section === 'home' ? 'hero' : section
      const el = document.getElementById(elementId)
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

  // Transform scrollY to opacity values for bg and border
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.95])
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.2])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
        style={{
          backgroundColor: useTransform(
            bgOpacity,
            (v) => `rgba(26, 26, 26, ${v})`
          ),
          borderBottom: useTransform(
            borderOpacity,
            (v) => `1px solid rgba(212, 175, 55, ${v})`
          ),
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <Link href="#" aria-label="Linum Core — Home">
              <Image
                src="/assets/linum-core-logo-escrita.svg"
                alt="Linum Core"
                width={140}
                height={32}
                priority
                className="h-8 w-auto"
              />
            </Link>

            {/* Desktop Nav + Language Switcher */}
            <div className="hidden md:flex items-center gap-8">
              <Navigation activeSection={activeSection} />
              <LanguageSwitcher />
            </div>

            {/* Mobile hamburger button */}
            <button
              className="md:hidden text-neutral-300 hover:text-white p-2 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
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
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-primary-dark border-l border-secondary/20 p-8 md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Close button */}
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Vertical nav links */}
                <Navigation
                  activeSection={activeSection}
                  onLinkClick={() => setMobileOpen(false)}
                  orientation="vertical"
                />

                {/* Language switcher at bottom */}
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
