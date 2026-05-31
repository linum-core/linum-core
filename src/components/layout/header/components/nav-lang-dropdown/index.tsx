'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLanguage, type SupportedLanguage } from '@/src/libs/animation/hooks/useLanguage';
import './styles.css';

const FLAGS = {
  'pt-BR': '🇧🇷',
  'en': '🇺🇸',
  'es': '🇪🇸',
};

const LABELS = {
  'pt-BR': 'Português',
  'en': 'English',
  'es': 'Español',
};

const LOCALES = ['pt-BR', 'en', 'es'] as const;

export function NavLangDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations();
  const { currentLanguage, changeLanguage } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleLanguageChange = (newLocale: SupportedLanguage) => {
    changeLanguage(newLocale);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="nav__lang-trigger"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        ref={triggerRef}
        className="nav__lang-flag"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t('lang.select')}
      >
        <span className="nav__lang-flag-emoji">{FLAGS[currentLanguage as keyof typeof FLAGS]}</span>
        <span className="nav__lang-flag-label">{LABELS[currentLanguage as keyof typeof LABELS]}</span>
      </button>

      {isOpen && (
        <div className="nav__lang-dropdown glass" role="listbox">
          {LOCALES.map((loc) => (
            <button
              key={loc}
              role="option"
              aria-selected={loc === currentLanguage}
              className="nav__lang-option"
              onClick={() => handleLanguageChange(loc)}
            >
              <span>{FLAGS[loc]}</span>
              <span>{LABELS[loc]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
