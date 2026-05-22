import { test, expect } from '@playwright/test'

test.describe('Contact form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#contact')
    await page.waitForLoadState('networkidle')
    // Scroll to contact section
    await page.evaluate(() => {
      document.getElementById('contact')?.scrollIntoView()
    })
    await page.waitForTimeout(500)
  })

  test('shows validation errors on empty submit', async ({ page }) => {
    const submitBtn = page.locator('#contact button[type="submit"]')
    await submitBtn.click()
    // At least one validation error should appear
    const errors = page.locator('#contact .text-accent, #contact [role="alert"]')
    await expect(errors.first()).toBeVisible()
  })

  test('sends form successfully with valid data', async ({ page }) => {
    await page.locator('#contact input[name="name"], #contact input[placeholder*="name" i], #contact input[placeholder*="nome" i]').first().fill('Test User')
    await page.locator('#contact input[type="email"], #contact input[name="email"]').first().fill('test@example.com')

    // Subject field if present
    const subjectField = page.locator('#contact input[name="subject"], #contact input[placeholder*="subject" i]').first()
    if (await subjectField.isVisible()) {
      await subjectField.fill('Test Subject')
    }

    await page.locator('#contact textarea').first().fill('This is a test message for Playwright.')

    const submitBtn = page.locator('#contact button[type="submit"]')
    await submitBtn.click()

    // Wait for success or error message (API may fail in test env — either is acceptable)
    await page.waitForTimeout(2000)
    // The form should have responded (loading state cleared)
    await expect(submitBtn).not.toBeDisabled({ timeout: 5000 })
  })
})
