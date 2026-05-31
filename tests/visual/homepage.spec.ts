import { test, expect } from '@playwright/test'

const sections = ['hero', 'manifesto', 'portfolio', 'about', 'competencies', 'feedbacks', 'contact']

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

test.describe('Manifesto — weave interaction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pt-BR')
    await page.waitForLoadState('networkidle')
  })

  test('manifesto section has SVG weave', async ({ page }) => {
    const svg = page.locator('#manifesto svg')
    await expect(svg).toBeAttached()
  })

  test('weave SVG has 4 paths', async ({ page }) => {
    const paths = page.locator('#manifesto svg path')
    await expect(paths).toHaveCount(4)
  })

  test('canvas ripple element is present', async ({ page }) => {
    const canvas = page.locator('#manifesto canvas.manifesto__ripple-canvas')
    await expect(canvas).toBeAttached()
  })

  test('attrib shows correct text', async ({ page }) => {
    await page.locator('#manifesto').scrollIntoViewIfNeeded()
    const attrib = page.locator('.manifesto__attrib')
    await expect(attrib).toContainText('Gabriel Gomes')
  })
})
