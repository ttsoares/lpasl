import { expect, test } from '@playwright/test'

const routes = [
  '/',
  '/quem-somos',
  '/atuacao',
  '/coordenacao',
  '/documentos',
  '/noticias',
  '/noticias/edital-de-convocacao-1-2025',
  '/noticias/edital-de-convocacao-2-2025',
  '/noticias/projeto-software-livre-brasil',
  '/contato',
  '/associe-se',
  '/rota-que-nao-existe',
]

const widths = [320, 768, 1366]

for (const route of routes) {
  test.describe(route, () => {
    test('renders one h1, real content and no console errors', async ({ page }) => {
      const errors: string[] = []
      page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()))
      page.on('pageerror', (error) => errors.push(error.message))

      await page.goto(route)

      await expect(page.locator('h1')).toHaveCount(1)

      // An empty page must say what belongs there; bare chrome is a failure.
      const text = (await page.locator('main').innerText()).trim()
      expect(text.length, `main on ${route} is empty or near-empty`).toBeGreaterThan(80)

      expect(errors).toEqual([])
    })

    for (const width of widths) {
      test(`no horizontal overflow at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 })
        await page.goto(route)
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        )
        expect(overflow).toBeLessThanOrEqual(0)
      })
    }
  })
}

test('legacy WordPress links reach the new page', async ({ page }) => {
  await page.goto('/?p=124')
  await expect(page).toHaveURL('/coordenacao')
})
