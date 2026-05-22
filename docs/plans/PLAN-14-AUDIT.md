# PLAN-14: Final SEO + Accessibility + Build Audit

> **For agentic workers:** REQUIRED SUB-SKILL: `superpowers:subagent-driven-development`

**Goal:** Final audit — ensure build passes, SEO endpoints work, no a11y issues, no TypeScript errors, no horizontal overflow, and the site is ready for Vercel deployment.

**Context:** Next.js 16.2.6 App Router at `/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio`.
- All sections built, Playwright tests configured
- Target: Lighthouse 85+ performance, 90+ SEO, 90+ accessibility

**Prerequisite:** All PLAN-01 through PLAN-13 complete.

---

## Task 1: TypeScript Strict Check

- [ ] **Step 1: Full TypeScript check**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
npx tsc --noEmit 2>&1
```
Expected: No errors. Fix any type errors before continuing.

---

## Task 2: Production Build

- [ ] **Step 1: Run build**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
npm run build 2>&1
```
Expected: `✓ Compiled successfully` with no errors.

- [ ] **Step 2: Note bundle sizes**
Check that no page bundle exceeds 500kB (gzipped). If it does, identify large imports.

---

## Task 3: SEO Verification

- [ ] **Step 1: Start production server**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
npm run start &
sleep 3
```

- [ ] **Step 2: Check sitemap**
```bash
curl -s http://localhost:3000/sitemap.xml
```
Expected: Valid XML with at least 3 URL entries.

- [ ] **Step 3: Check robots.txt**
```bash
curl -s http://localhost:3000/robots.txt
```
Expected: Contains `User-agent: *`, `Allow: /`, `Sitemap: https://linumcore.com/sitemap.xml`.

- [ ] **Step 4: Check JSON-LD**
```bash
curl -s http://localhost:3000 | python3 -c "
import sys, json, re
html = sys.stdin.read()
matches = re.findall(r'<script type=\"application/ld\+json\">(.*?)</script>', html, re.DOTALL)
for m in matches:
    print(json.loads(m).get('@type', 'unknown'))
"
```
Expected: Prints `Organization` and `Person`.

- [ ] **Step 5: Check meta tags**
```bash
curl -s http://localhost:3000 | grep -o '<meta [^>]*>' | grep -E "og:|twitter:" | head -10
```
Expected: Several og: and twitter: meta tags present.

---

## Task 4: Accessibility Check

- [ ] **Step 1: Check all images have alt text**
```bash
curl -s http://localhost:3000 | grep -o '<img[^>]*>' | grep -v 'alt=' | wc -l
```
Expected: `0` — all images must have alt attributes.

- [ ] **Step 2: Check skip-to-content link (optional but recommended)**

If not present, add to `app/layout.tsx` before `<Header>`:
```tsx
<a href="#hero" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-secondary text-primary px-4 py-2 rounded z-50">
  Skip to main content
</a>
```

- [ ] **Step 3: Check form labels**
```bash
curl -s http://localhost:3000 | grep -o '<input[^>]*>' | grep -v 'id=' | wc -l
```
Expected: `0` — all inputs have id attributes (which are referenced by labels).

---

## Task 5: Responsiveness Check

- [ ] **Step 1: Run Playwright responsive tests**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
npx playwright test tests/visual/ --reporter=list 2>&1
```
Expected: `no horizontal scroll` test passes on all 3 viewports.

---

## Task 6: Environment Variables

- [ ] **Step 1: Update .env.example**

Ensure `/.env.example` has:
```bash
# Production URL (no trailing slash)
NEXT_PUBLIC_BASE_URL=https://linumcore.com

# Contact form email (Resend integration - optional)
RESEND_API_KEY=

# Analytics (optional)
NEXT_PUBLIC_GA_ID=
```

---

## Task 7: Vercel Deployment Prep

- [ ] **Step 1: Ensure .gitignore is complete**
```bash
cat "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio/.gitignore" | grep -E "\.env|\.next|node_modules"
```
Expected: `.env.local`, `.next/`, `node_modules/` are all ignored.

- [ ] **Step 2: Check vercel.json if needed**

For Next.js 16 on Vercel, no `vercel.json` is needed. The default auto-detection works.

- [ ] **Step 3: Kill server and final commit**
```bash
kill %1 2>/dev/null; true
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
git add .env.example
git commit -m "chore: final audit — SEO verified, a11y checked, build passing, ready for deployment"
```

---

## ✅ Final Checklist

- [ ] `npm run build` passes with no errors
- [ ] `/sitemap.xml` returns valid XML
- [ ] `/robots.txt` is correct
- [ ] JSON-LD has Organization + Person schemas
- [ ] All images have `alt` attributes
- [ ] All form inputs have associated labels
- [ ] No horizontal scroll at 375px, 768px, 1440px
- [ ] All nav links scroll to correct sections
- [ ] Contact form submits and shows success message
- [ ] Language switcher changes text
- [ ] Header is sticky and transparent → solid on scroll
- [ ] Cube3D animation visible on Hero
- [ ] Portfolio filter works
- [ ] Testimonial carousel auto-advances
- [ ] Radar chart renders in About section
- [ ] Footer has all social links
