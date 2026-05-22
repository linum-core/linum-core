'use client'

import { useTranslation } from 'react-i18next'
import type { SupportedLanguage } from '@/lib/i18n/config'

export const languageLabels: Record<SupportedLanguage, { label: string; flag: string }> = {
  'en':    { label: 'English', flag: '🇺🇸' },
  'pt-BR': { label: 'Português', flag: '🇧🇷' },
  'es':    { label: 'Español', flag: '🇪🇸' },
}

export function useLanguage() {
  const { i18n } = useTranslation()

  const currentLanguage = i18n.language as SupportedLanguage
  const changeLanguage = (lang: SupportedLanguage) => i18n.changeLanguage(lang)

  return { currentLanguage, changeLanguage, languageLabels }
}
