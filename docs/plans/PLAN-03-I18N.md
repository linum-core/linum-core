# PLAN-03: Internationalization (i18n)

> **For agentic workers:** REQUIRED SUB-SKILL: `superpowers:subagent-driven-development`

**Goal:** Set up react-i18next with EN (default), PT-BR, and ES. Create all locale files. Create I18nProvider client component. Wire up language detection.

**Context:** Next.js 16.2.6 App Router at `/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio`.
- react-i18next 14 is already installed (by PLAN-01)
- In App Router, i18n provider must be a Client Component
- Default language: English (EN) — user's priority

**AGENTS.md Warning:** Before writing any Next.js code, read:
```bash
ls "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio/node_modules/next/dist/docs/"
```

---

## Task 1: i18n Config

**Files:**
- Create: `lib/i18n/config.ts`

- [ ] **Step 1: Create i18n config**

```typescript
// lib/i18n/config.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import ptBR from './locales/pt-BR.json'
import es from './locales/es.json'

export const defaultLanguage = 'en'
export const supportedLanguages = ['en', 'pt-BR', 'es'] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en:    { translation: en },
        'pt-BR': { translation: ptBR },
        es:    { translation: es },
      },
      fallbackLng: defaultLanguage,
      defaultNS: 'translation',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      },
    })
}

export default i18n
```

**Note:** Install `i18next-browser-languagedetector` if not already installed:
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
npm install i18next-browser-languagedetector
```

---

## Task 2: Create Locale Files

**Files:**
- Create: `lib/i18n/locales/en.json`
- Create: `lib/i18n/locales/pt-BR.json`
- Create: `lib/i18n/locales/es.json`

- [ ] **Step 1: Create all locale files**

Copy the exact content from `docs/context/CTX-I18N-STRINGS.md`. That file contains the complete JSON for all three locales.

The en.json includes keys for: `nav`, `hero`, `portfolio`, `about`, `competencies`, `feedbacks`, `contact`, `footer`, `lang`.

---

## Task 3: I18nProvider Client Component

**Files:**
- Create: `components/providers/I18nProvider.tsx`

- [ ] **Step 1: Create I18nProvider**

```tsx
// components/providers/I18nProvider.tsx
'use client'

import { I18nextProvider } from 'react-i18next'
import i18n from '@/lib/i18n/config'

interface I18nProviderProps {
  children: React.ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  return (
    <I18nextProvider i18n={i18n} defaultNS="translation">
      {children}
    </I18nextProvider>
  )
}
```

---

## Task 4: Wire Provider into Layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add I18nProvider to layout**

Open `app/layout.tsx`. Import and wrap `{children}` with `I18nProvider`:

```tsx
import { I18nProvider } from '@/components/providers/I18nProvider'
import { JsonLd } from '@/components/seo/JsonLd'

// In <body>:
<body ...>
  <JsonLd />
  <I18nProvider>
    {children}
  </I18nProvider>
</body>
```

---

## Task 5: Language Switcher Utility Hook

**Files:**
- Create: `lib/hooks/useLanguage.ts`

- [ ] **Step 1: Create useLanguage hook**

```typescript
// lib/hooks/useLanguage.ts
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
```

---

## Task 6: Verify i18n Works

- [ ] **Step 1: TypeScript check**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
npx tsc --noEmit 2>&1 | head -30
```
Expected: No errors related to i18n files.

- [ ] **Step 2: Build check**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
npm run build 2>&1 | tail -20
```

- [ ] **Step 3: Commit**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
git add lib/i18n/ lib/hooks/ components/providers/
git commit -m "feat: add react-i18next with EN/PT-BR/ES locale support"
```
