import { expect, test } from '@playwright/test'

test.describe('/coordenacao', () => {
  test('the archive of previous terms is on phones too', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/coordenacao')
    await expect(page.getByRole('heading', { name: 'Gestões anteriores' })).toBeVisible()
    await expect(page.locator('details')).toHaveCount(8)
  })

  test('each previous term is a heading, so it can be reached by heading navigation', async ({ page }) => {
    await page.goto('/coordenacao')
    await expect(page.locator('summary h3')).toHaveCount(8)
    await expect(page.locator('summary h3').first()).toHaveText('2022–2025')
  })

  test('an empty substitute seat keeps its place instead of shifting the others', async ({ page }) => {
    await page.goto('/coordenacao')
    const term = page.locator('details').filter({ has: page.locator('summary h3', { hasText: '2019–2021' }) })
    await term.locator('summary').click()
    const group = term.locator('h4', { hasText: 'Suplentes do conselho geral' }).locator('xpath=..')
    await expect(group.locator('dt').nth(0)).toHaveText('1º suplente')
    await expect(group.locator('dd').nth(0)).toHaveText('Vaga não preenchida')
    await expect(group.locator('dt').nth(1)).toHaveText('2º suplente')
    await expect(group.locator('dd').nth(1)).toHaveText('Cláudia Maria da Costa Archer')
  })

  test('unknown election dates are stated, not left blank', async ({ page }) => {
    await page.goto('/coordenacao')
    const term = page.locator('details').filter({ has: page.locator('summary h3', { hasText: '2014–2016' }) })
    await expect(term.locator('summary')).toContainText('Data da eleição não localizada')
  })

  test('the closing band leads to joining', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/coordenacao')
    await expect(page.locator('main').getByRole('link', { name: 'Associe-se (gratuito)' })).toBeVisible()
  })
})
