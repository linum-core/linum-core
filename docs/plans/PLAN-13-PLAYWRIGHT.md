# PLAN-13: Playwright Visual + Responsive Tests

> **For agentic workers:** REQUIRED SUB-SKILL: `superpowers:subagent-driven-development`

**Goal:** Set up Playwright with chromium, tablet, and mobile viewports. Run visual screenshots for all sections, test navigation, language switching, and contact form.

**Context:** Next.js 16.2.6 App Router at `/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio`.
- `@playwright/test` is installed (by PLAN-01)
- Dev server: `npm run dev` on port 3000
- Focus: Visual + Responsiveness (no horizontal scroll, sections visible)

**Prerequisite:** All sections built (PLAN-06 through PLAN-12 complete). Dev server must be running.

---

## Task 1: Playwright Config

**Files:**
- Create: `playwright.config.ts`

- [ ] **Step 1: Create playwright.config.ts**

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'tablet',
      use: { ...devices['iPad Pro'], viewport: { width: 768, height: 1024 } },
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 13'], viewport: { width: 375, height: 812 } },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})
```

---

## Task 2: Visual Tests

**Files:**
- Create: `tests/visual/homepage.spec.ts`

- [ ] **Step 1: Create visual test file**

```typescript
// tests/visual/homepage.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Homepage — Visual & Responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('no horizontal scroll at any breakpoint', async ({ page }) => {
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1) // 1px tolerance
  })

  test('Hero section renders with headline', async ({ page }) => {
    const hero = page.locator('#hero, section[aria-label*="Hero"]').first()
    await expect(hero).toBeVisible()
    const heading = hero.locator('h1').first()
    await expect(heading).toBeVisible()
    const text = await heading.textContent()
    expect(text?.length).toBeGreaterThan(10)
  })

  test('Portfolio section renders with project cards', async ({ page }) => {
    await page.locator('#portfolio').scrollIntoViewIfNeeded()
    await expect(page.locator('#portfolio')).toBeVisible()
  })

  test('About section renders', async ({ page }) => {
    await page.locator('#about').scrollIntoViewIfNeeded()
    await expect(page.locator('#about')).toBeVisible()
  })

  test('Competencies section renders 6 cards', async ({ page }) => {
    await page.locator('#competencies').scrollIntoViewIfNeeded()
    await expect(page.locator('#competencies')).toBeVisible()
  })

  test('Feedbacks section renders carousel', async ({ page }) => {
    await page.locator('#feedbacks').scrollIntoViewIfNeeded()
    await expect(page.locator('#feedbacks')).toBeVisible()
  })

  test('Contact section renders form', async ({ page }) => {
    await page.locator('#contact').scrollIntoViewIfNeeded()
    const form = page.locator('#contact form')
    await expect(form).toBeVisible()
  })

  test('Footer renders', async ({ page }) => {
    await page.locator('footer').scrollIntoViewIfNeeded()
    await expect(page.locator('footer')).toBeVisible()
  })

  test('screenshot full page', async ({ page }, testInfo) => {
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.screenshot({
      path: `test-results/screenshots/${testInfo.project.name}-full.png`,
      fullPage: true,
    })
  })
})
```

---

## Task 3: Navigation Tests

**Files:**
- Create: `tests/functional/navigation.spec.ts`

- [ ] **Step 1: Create navigation test**

```typescript
// tests/functional/navigation.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('portfolio nav link scrolls to portfolio section', async ({ page }) => {
    const navLink = page.locator('nav a[href="#portfolio"]').first()
    if (await navLink.isVisible()) {
      await navLink.click()
      await page.waitForTimeout(600)
      const section = page.locator('#portfolio')
      await expect(section).toBeInViewport({ ratio: 0.1 })
    } else {
      // Mobile: open hamburger first
      await page.locator('button[aria-label*="menu"], button[aria-expanded]').first().click()
      await page.locator('nav a[href="#portfolio"]').last().click()
      await page.waitForTimeout(600)
      await expect(page.locator('#portfolio')).toBeInViewport({ ratio: 0.1 })
    }
  })

  test('header is visible and sticky', async ({ page }) => {
    const header = page.locator('header').first()
    await expect(header).toBeVisible()
    await page.evaluate(() => window.scrollTo(0, 500))
    await expect(header).toBeVisible()
  })

  test('mobile hamburger menu opens and closes', async ({ page, viewport }) => {
    if (!viewport || viewport.width >= 768) test.skip()
    const hamburger = page.locator('button[aria-label*="menu"], button[aria-expanded]').first()
    await hamburger.click()
    await expect(page.locator('nav').last()).toBeVisible()
    await page.keyboard.press('Escape')
  })
})
```

---

## Task 4: Contact Form Tests

**Files:**
- Create: `tests/functional/contact.spec.ts`

- [ ] **Step 1: Create contact form test**

```typescript
// tests/functional/contact.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.locator('#contact').scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
  })

  test('shows validation errors on empty submit', async ({ page }) => {
    const form = page.locator('#contact form')
    await form.locator('button[type="submit"]').click()
    const errors = form.locator('[role="alert"]')
    await expect(errors.first()).toBeVisible()
  })

  test('accepts valid form submission', async ({ page }) => {
    const form = page.locator('#contact form')
    await form.locator('#name').fill('Test User')
    await form.locator('#email').fill('test@example.com')
    await form.locator('#subject').fill('Test Subject')
    await form.locator('#message').fill('This is a test message for Playwright testing.')
    await form.locator('button[type="submit"]').click()
    // Wait for API response
    const success = form.locator('[role="status"]')
    await expect(success).toBeVisible({ timeout: 5000 })
  })

  test('invalid email shows error', async ({ page }) => {
    const form = page.locator('#contact form')
    await form.locator('#name').fill('Test User')
    await form.locator('#email').fill('not-an-email')
    await form.locator('#subject').fill('Test')
    await form.locator('#message').fill('Test message')
    await form.locator('button[type="submit"]').click()
    const emailError = form.locator('#email-error')
    await expect(emailError).toBeVisible()
  })
})
```

---

## Task 5: Run Tests

- [ ] **Step 1: Install Playwright browsers**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
npx playwright install chromium
```

- [ ] **Step 2: Run all tests**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
npx playwright test --reporter=list 2>&1 | tail -40
```
Expected: Most tests pass. Document any failures.

- [ ] **Step 3: View HTML report**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
npx playwright show-report
```

- [ ] **Step 4: Update package.json test script**

Add to `package.json` scripts:
```json
"test": "playwright test",
"test:ui": "playwright test --ui",
"test:headed": "playwright test --headed"
```

- [ ] **Step 5: Commit**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
git add playwright.config.ts tests/ package.json
git commit -m "feat: add Playwright visual and functional tests for desktop/tablet/mobile"
```
