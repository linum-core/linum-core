'use client'

import { useState, useEffect, useRef } from 'react'
import { useLanguage, languageLabels } from '@/lib/hooks/useLanguage'
import type { SupportedLanguage } from '@/lib/i18n/config'

export function LanguageSwitcher() {
  const { currentLanguage, changeLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const current = languageLabels[currentLanguage as SupportedLanguage] ?? languageLabels['en']

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-neutral-300 hover:text-white text-sm transition-colors"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span>{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
        <span
          className={`transition-transform duration-200 text-xs ${open ? 'rotate-180' : ''}`}
        >
          ▾
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-2 py-1 min-w-[140px] bg-primary-light border border-secondary/20 rounded-lg shadow-xl z-50"
        >
          {(
            Object.entries(languageLabels) as [
              SupportedLanguage,
              { label: string; flag: string },
            ][]
          ).map(([lang, { label, flag }]) => (
            <li key={lang}>
              <button
                role="option"
                aria-selected={currentLanguage === lang}
                onClick={() => {
                  changeLanguage(lang)
                  setOpen(false)
                }}
                className={[
                  'w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-primary transition-colors',
                  currentLanguage === lang
                    ? 'text-secondary'
                    : 'text-neutral-300 hover:text-white',
                ].join(' ')}
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
