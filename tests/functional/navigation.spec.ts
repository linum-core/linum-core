import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('header is visible on load', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible()
  })

  test('clicking portfolio nav link scrolls to section', async ({ page }) => {
    // Find nav link pointing to #portfolio
    const link = page.locator('a[href="#portfolio"]').first()
    await link.click()
    await page.waitForTimeout(800)
    const section = page.locator('#portfolio')
    await expect(section).toBeInViewport({ ratio: 0.2 })
  })

  test('clicking contact nav link scrolls to section', async ({ page }) => {
    const link = page.locator('a[href="#contact"]').first()
    await link.click()
    await page.waitForTimeout(800)
    const section = page.locator('#contact')
    await expect(section).toBeInViewport({ ratio: 0.2 })
  })
})
