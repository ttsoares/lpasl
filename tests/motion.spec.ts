import { expect, test } from '@playwright/test'

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })

  test('header labels, binary rail and the home butterfly are static', async ({ page }) => {
    await page.goto('/')

    const animations = await page.evaluate(() =>
      [...document.querySelectorAll('.rise > span, .fade-in, .hero-rail-track, .borb, .borb img')].map(
        (element) => getComputedStyle(element).animationName,
      ),
    )

    expect(animations.length).toBeGreaterThan(0)
    expect(animations.every((name) => name === 'none')).toBe(true)
  })
})

test('header labels and the home butterfly animate by default', async ({ page }) => {
  await page.goto('/')

  const names = await page.evaluate(() => ({
    label: getComputedStyle(document.querySelector('.rise > span')!).animationName,
    flight: getComputedStyle(document.querySelector('.borb')!).animationName,
  }))

  expect(names).toEqual({ label: 'rise', flight: 'borb-flight, borb-vanish' })
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
