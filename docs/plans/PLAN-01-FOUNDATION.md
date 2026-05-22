# PLAN-01: Foundation Setup

> **For agentic workers:** REQUIRED SUB-SKILL: `superpowers:subagent-driven-development`

**Goal:** Install all dependencies, configure Tailwind v4 design tokens in globals.css, update layout.tsx with fonts and base metadata.

**Context:** This is Next.js 16.2.6 at `/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio`. It uses Tailwind v4 — NO tailwind.config.ts, all configuration goes in `app/globals.css` via `@theme {}` block. Tech stack: React 19, TypeScript 5, App Router.

**AGENTS.md Warning:** Before writing any Next.js code, read:
```bash
ls "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio/node_modules/next/dist/docs/"
```

---

## Task 1: Install Dependencies

**Files:** `package.json` (modified by npm)

- [ ] **Step 1: Install runtime dependencies**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
npm install framer-motion@^11 zustand@^4 react-i18next@^14 i18next@^23 axios@^1.6 recharts@^2
```
Expected: Success, no errors.

- [ ] **Step 2: Install dev dependencies**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
npm install -D @playwright/test
```

- [ ] **Step 3: Verify installation**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
node -e "require('framer-motion'); require('recharts'); require('react-i18next'); console.log('✅ deps ok')"
```
Expected: `✅ deps ok`

---

## Task 2: Update globals.css with Design Tokens

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace globals.css entirely**

Write this exact content to `app/globals.css`:

```css
@import "tailwindcss";

@theme {
  /* === COLORS === */
  --color-primary:          #1a1a1a;
  --color-primary-dark:     #0f0f0f;
  --color-primary-light:    #2a2a2a;
  --color-secondary:        #d4af37;
  --color-secondary-dark:   #c9a227;
  --color-secondary-light:  #e8c547;
  --color-accent:           #00d9ff;
  --color-accent-dark:      #00b8d4;
  --color-accent-light:     #33e5ff;
  --color-neutral-100:      #ffffff;
  --color-neutral-200:      #f5f5f5;
  --color-neutral-300:      #e0e0e0;
  --color-neutral-500:      #808080;
  --color-neutral-700:      #333333;
  --color-neutral-900:      #000000;

  /* === FONTS === */
  --font-heading:  var(--font-cinzel), serif;
  --font-subtitle: var(--font-jomolhari), serif;
  --font-body:     var(--font-inter), sans-serif;
  --font-code:     var(--font-fira-code), monospace;

  /* === BORDER RADIUS === */
  --radius-sm:  2px;
  --radius-md:  4px;
  --radius-lg:  8px;
  --radius-xl:  12px;

  /* === ANIMATIONS === */
  --animate-glow:        glow-pulse 2s ease-in-out infinite alternate;
  --animate-gold-glow:   gold-pulse 2s ease-in-out infinite alternate;
  --animate-float:       float 4s ease-in-out infinite;
  --animate-cube:        cube-rotate 15s linear infinite;
  --animate-scroll:      scroll-bounce 1.5s ease-in-out infinite;
}

/* === KEYFRAMES === */
@keyframes glow-pulse {
  from { box-shadow: 0 0 5px #00d9ff40; }
  to   { box-shadow: 0 0 20px #00d9ff80, 0 0 40px #00d9ff40; }
}

@keyframes gold-pulse {
  from { box-shadow: 0 0 5px #d4af3740; }
  to   { box-shadow: 0 0 20px #d4af3780, 0 0 40px #d4af3740; }
}

@keyframes cube-rotate {
  0%   { transform: rotateX(0deg) rotateY(0deg); }
  25%  { transform: rotateX(90deg) rotateY(90deg); }
  50%  { transform: rotateX(180deg) rotateY(180deg); }
  75%  { transform: rotateX(270deg) rotateY(270deg); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-12px); }
}

@keyframes scroll-bounce {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50%       { transform: translateY(8px); opacity: 0.5; }
}

/* === BASE STYLES === */
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #1a1a1a;
  color: #ffffff;
  font-family: var(--font-body, 'Inter', sans-serif);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* === TYPOGRAPHY UTILITIES === */
.font-heading  { font-family: var(--font-heading); }
.font-subtitle { font-family: var(--font-subtitle); }
.font-code     { font-family: var(--font-code); }

/* === SCROLLBAR === */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0f0f0f; }
::-webkit-scrollbar-thumb { background: #d4af3760; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #d4af37; }

/* === SELECTION === */
::selection { background: #d4af3730; color: #ffffff; }
```

- [ ] **Step 2: Verify CSS is valid**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
npx next build 2>&1 | head -20
```
If build fails due to CSS, fix the specific error before continuing.

---

## Task 3: Update layout.tsx with Fonts and Base Structure

**Files:**
- Modify: `app/layout.tsx`
- Create: `lib/animations.ts`

- [ ] **Step 1: Create shared animation variants**

Write `lib/animations.ts`:
```typescript
import type { Variants } from 'framer-motion'

export const fadeInUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const slideInRight: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}
```

- [ ] **Step 2: Update app/layout.tsx**

Check the Next.js 16 font loading docs first:
```bash
ls "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio/node_modules/next/dist/docs/" 2>/dev/null | head -20
```

Write `app/layout.tsx`:
```tsx
import type { Metadata } from 'next'
import { Cinzel, Inter, Fira_Code, Jomolhari } from 'next/font/google'
import './globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
})

const jomolhari = Jomolhari({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jomolhari',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-fira-code',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Linum Core — Software Development & Consulting',
    template: '%s | Linum Core',
  },
  description: 'Linum Core delivers custom software development, systems consulting, and API integration. We restore the unseen connections in your business.',
  keywords: ['software development', 'consulting', 'API integration', 'Next.js', 'TypeScript', 'Gabriel Gomes', 'Linum Core'],
  authors: [{ name: 'Gabriel Gomes', url: 'https://linumcore.com' }],
  creator: 'Gabriel Gomes',
  metadataBase: new URL('https://linumcore.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://linumcore.com',
    siteName: 'Linum Core',
    title: 'Linum Core — Software Development & Consulting',
    description: 'We restore the unseen connections in your business.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Linum Core' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Linum Core — Software Development & Consulting',
    description: 'We restore the unseen connections in your business.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${jomolhari.variable} ${inter.variable} ${firaCode.variable}`}
    >
      <body className="bg-primary text-neutral-100 font-body antialiased">
        {children}
      </body>
    </html>
  )
}
```

**Note:** If `Jomolhari` is not available in next/font/google, use this fallback instead:
```tsx
// Remove Jomolhari import and add @font-face in globals.css:
// @font-face {
//   font-family: 'Jomolhari';
//   src: url('/fonts/Jomolhari-Regular.ttf') format('truetype');
//   font-weight: 400;
//   font-display: swap;
// }
// Then set variable: '--font-jomolhari' manually in html tag with a style attribute
// Check if font is available: npx next-font-preview list 2>/dev/null || true
```

- [ ] **Step 3: Create lib/types.ts**

Write `lib/types.ts` with all TypeScript interfaces (see docs/context/CTX-DATA-MODELS.md for exact content).

- [ ] **Step 4: Create all data files**

Create these 4 files with exact content from `docs/context/CTX-DATA-MODELS.md`:
- `lib/data/projects.ts`
- `lib/data/testimonials.ts`
- `lib/data/competencies.ts`
- `lib/data/social.ts`
- `lib/data/radarSkills.ts`

- [ ] **Step 5: Build check**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
npm run build 2>&1 | tail -20
```
Expected: Build succeeds (or only fails due to missing components — that's OK at this stage).

- [ ] **Step 6: Commit**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
git add app/globals.css app/layout.tsx lib/ package.json package-lock.json
git commit -m "feat: install dependencies and configure design system foundation"
```
