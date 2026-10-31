import { expect, test } from '@playwright/test'

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })

  test('header labels, binary rails and the butterfly are static', async ({ page }) => {
    for (const path of ['/', '/associe-se']) {
      await page.goto(path)

      const animations = await page.evaluate(() =>
        [...document.querySelectorAll('.rise > span, .fade-in, .hero-rail-track, .borb, .borb img')].map(
          (element) => getComputedStyle(element).animationName,
        ),
      )

      expect(animations.length, path).toBeGreaterThan(0)
      expect(animations.every((name) => name === 'none'), path).toBe(true)
    }
  })
})

test('header labels animate by default', async ({ page }) => {
  await page.goto('/')

  const name = await page.evaluate(
    () => getComputedStyle(document.querySelector('.rise > span')!).animationName,
  )

  expect(name).toBe('rise')
})

test('the butterfly waits for the proposal button, then flies to it', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 600 })
  await page.goto('/associe-se')
  const borb = page.getByRole('link', { name: /Baixar a proposta/ }).locator('xpath=..').locator('.borb')

  await expect(borb).toHaveClass(/borb-waiting/)
  await expect(borb).toHaveCSS('animation-name', 'borb-flight, borb-vanish')

  await borb.locator('xpath=..').scrollIntoViewIfNeeded()
  await expect(borb).not.toHaveClass(/borb-waiting/)
  await expect(page.locator('main .borb')).toHaveCount(1)
})

test('the home page has no butterfly on its buttons', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.borb')).toHaveCount(0)
})

test('inner page titles fade in', async ({ page }) => {
  await page.goto('/quem-somos')

  const name = await page.evaluate(
    () => getComputedStyle(document.querySelector('h1')!).animationName,
  )

  expect(name).toBe('fade-in')
})

test('binary rails flow on home and inner pages', async ({ page }) => {
  for (const path of ['/', '/quem-somos']) {
    await page.goto(path)

    const name = await page.evaluate(
      () => getComputedStyle(document.querySelector('.hero-rail-track')!).animationName,
    )

    expect(name, path).toBe('asl-rail-flow')
  }
})
