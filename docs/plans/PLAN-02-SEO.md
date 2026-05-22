# PLAN-02: SEO Infrastructure

> **For agentic workers:** REQUIRED SUB-SKILL: `superpowers:subagent-driven-development`

**Goal:** Create complete SEO infrastructure — sitemap.ts, robots.ts, JSON-LD schema.org, Open Graph metadata, and semantic HTML structure.

**Context:** Next.js 16.2.6 App Router at `/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio`. 
- App Router has built-in sitemap/robots via `app/sitemap.ts` and `app/robots.ts`
- Metadata API is in `app/layout.tsx` (already configured by PLAN-01 — don't overwrite)
- Owner: Gabriel Gomes | Email: ggvgabriel05@gmail.com | GitHub: github.com/GgvGomes

**AGENTS.md Warning:** Before writing any Next.js code, read:
```bash
ls "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio/node_modules/next/dist/docs/"
```

---

## Task 1: Sitemap

**Files:**
- Create: `app/sitemap.ts`

- [ ] **Step 1: Create sitemap.ts**

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://linumcore.com'
  const now = new Date()

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/#portfolio`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#competencies`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
```

---

## Task 2: Robots.txt

**Files:**
- Create: `app/robots.ts`

- [ ] **Step 1: Create robots.ts**

```typescript
// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://linumcore.com/sitemap.xml',
    host: 'https://linumcore.com',
  }
}
```

---

## Task 3: JSON-LD Schema.org

**Files:**
- Create: `components/seo/JsonLd.tsx`

- [ ] **Step 1: Create JsonLd component**

```tsx
// components/seo/JsonLd.tsx
export function JsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Linum Core',
    url: 'https://linumcore.com',
    logo: 'https://linumcore.com/assets/linum-core-logo.svg',
    description: 'Software development, systems consulting, and API integration. We restore the unseen connections in your business.',
    founder: {
      '@type': 'Person',
      name: 'Gabriel Gomes',
      email: 'ggvgabriel05@gmail.com',
      url: 'https://github.com/GgvGomes',
      jobTitle: 'CEO & Founder',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'ggvgabriel05@gmail.com',
      contactType: 'customer service',
      availableLanguage: ['English', 'Portuguese', 'Spanish'],
    },
    sameAs: [
      'https://github.com/GgvGomes',
      'https://linkedin.com/in/gabriel-gomes',
    ],
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gabriel Gomes',
    jobTitle: 'CEO & Founder',
    worksFor: { '@type': 'Organization', name: 'Linum Core' },
    email: 'ggvgabriel05@gmail.com',
    url: 'https://linumcore.com',
    sameAs: ['https://github.com/GgvGomes'],
    knowsAbout: [
      'Software Development',
      'Systems Consulting',
      'API Integration',
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'PostgreSQL',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  )
}
```

- [ ] **Step 2: Add JsonLd to layout.tsx**

Open `app/layout.tsx` and add the JsonLd component inside `<body>`, before `{children}`:

```tsx
import { JsonLd } from '@/components/seo/JsonLd'

// Inside <body>:
<body ...>
  <JsonLd />
  {children}
</body>
```

---

## Task 4: Open Graph Image

**Files:**
- Create: `app/opengraph-image.tsx`

- [ ] **Step 1: Create OG image**

```tsx
// app/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Linum Core — Software Development & Consulting'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1a1a1a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div style={{ color: '#d4af37', fontSize: 72, fontWeight: 700, letterSpacing: '-2px', marginBottom: 24 }}>
          LINUM CORE
        </div>
        <div style={{ color: '#ffffff', fontSize: 32, marginBottom: 16 }}>
          Software Development & Consulting
        </div>
        <div style={{ color: '#00d9ff', fontSize: 22, fontStyle: 'italic' }}>
          There&apos;s an unseen connection… We build it.
        </div>
        <div style={{
          position: 'absolute',
          bottom: 40,
          color: '#808080',
          fontSize: 18,
        }}>
          linumcore.com
        </div>
      </div>
    ),
    { ...size }
  )
}
```

---

## Task 5: Verify SEO

- [ ] **Step 1: Build and start server**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
npm run build && npm run start &
sleep 5
```

- [ ] **Step 2: Verify sitemap and robots**
```bash
curl -s http://localhost:3000/sitemap.xml | head -30
curl -s http://localhost:3000/robots.txt
```
Expected: sitemap returns XML with linumcore.com URLs; robots.txt has `User-agent: *` and sitemap line.

- [ ] **Step 3: Check JSON-LD in HTML**
```bash
curl -s http://localhost:3000 | grep -o 'application/ld+json' | wc -l
```
Expected: `2` (organization + person schemas)

- [ ] **Step 4: Kill server and commit**
```bash
kill %1 2>/dev/null; true
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
git add app/sitemap.ts app/robots.ts app/opengraph-image.tsx components/seo/
git commit -m "feat: add SEO infrastructure (sitemap, robots, JSON-LD, OG image)"
```
