import { test, expect } from '@playwright/test'

const sections = ['hero', 'portfolio', 'about', 'competencies', 'feedbacks', 'contact']

test.describe('Homepage visual — sections exist', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  for (const section of sections) {
    test(`section #${section} is visible`, async ({ page }) => {
      const el = page.locator(`#${section}`)
      await expect(el).toBeVisible()
    })
  }
})

test.describe('Responsive — no horizontal overflow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('page has no horizontal scrollbar', async ({ page }) => {
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth
    })
    expect(overflow).toBe(false)
  })

  test('body width matches viewport', async ({ page }) => {
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    const viewportWidth = page.viewportSize()!.width
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 2)
  })
})
