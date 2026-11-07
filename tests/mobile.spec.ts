import { expect, test, type Page } from '@playwright/test'

const routes = [
  '/',
  '/quem-somos',
  '/atuacao',
  '/coordenacao',
  '/noticias',
  '/noticias/edital-de-convocacao-1-2025',
  '/documentos',
  '/contato',
  '/associe-se',
]

// Standalone links and buttons under 44px either way. Links inside running
// text are exempt (WCAG 2.5.8), as is anything hidden or decorative.
function smallTargets(page: Page) {
  return page.evaluate(() =>
    [...document.querySelectorAll('a, button')]
      .filter((element) => {
        const box = element.getBoundingClientRect()
        return (
          box.width > 0 &&
          !element.closest('p, [aria-hidden="true"]') &&
          (box.width < 44 || box.height < 44)
        )
      })
      .map((element) => element.textContent?.trim() || element.getAttribute('aria-label')),
  )
}

test.describe('phones (375px)', () => {
  test.use({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true })

  test('every page fits the width and has full-size tap targets', async ({ page }) => {
    for (const path of routes) {
      await page.goto(path)
      const width = await page.evaluate(() => document.documentElement.scrollWidth)
      expect(width, path).toBe(375)
      expect(await smallTargets(page), path).toEqual([])
    }
  })

  test('the home page keeps to the essentials and one call to action', async ({ page }) => {
    const scripts: string[] = []
    page.on('request', (request) => scripts.push(request.url()))
    await page.goto('/')

    const hero = page.locator('section').first()
    await expect(hero.getByRole('link', { name: 'Associe-se' })).toBeVisible()
    await expect(hero.getByRole('link', { name: 'Conheça a ASL' })).toBeHidden()
    await expect(page.getByRole('banner').getByRole('link', { name: 'Associe-se' })).toBeHidden()
    await expect(page.getByText(/^Fundada em 11 de setembro/)).toBeHidden()
    // The coordination band stays, compact: title and election date, no names.
    await expect(page.getByRole('heading', { name: /Coordenação 2025/ })).toBeVisible()
    await expect(page.getByText('Eleitos em 14 de novembro de 2025.')).toBeVisible()
    await expect(page.getByText('Coordenação geral', { exact: true })).toBeHidden()
    await expect(page.getByRole('heading', { name: 'Navegue' })).toBeHidden()
    expect(scripts.some((url) => url.includes('FlyingBorb/scene'))).toBe(false)
  })

  test('the dark mode switch lives in the menu', async ({ page }) => {
    await page.goto('/quem-somos')
    await expect(page.getByRole('banner').getByLabel('Ativar modo escuro')).toBeHidden()
    await page.getByRole('button', { name: 'Abrir menu' }).click()
    await page.getByRole('button', { name: 'Ativar modo escuro' }).click()
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(0, 0, 0)')
  })
})

test('tablets and desktops keep every feature', async ({ page }) => {
  for (const width of [768, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')

    const hero = page.locator('section').first()
    await expect(hero.getByRole('link', { name: 'Conheça a ASL' }), `${width}`).toBeVisible()
    await expect(page.getByRole('banner').getByLabel('Ativar modo escuro'), `${width}`).toBeVisible()
    await expect(page.getByText(/^Fundada em 11 de setembro/), `${width}`).toBeVisible()
    await expect(page.getByRole('heading', { name: /Coordenação 2025/ }), `${width}`).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Navegue' }), `${width}`).toBeVisible()
  }
})
