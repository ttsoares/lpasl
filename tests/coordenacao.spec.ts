import { expect, test } from '@playwright/test'

test.describe('/coordenacao', () => {
  test('the archive of previous terms is on phones too', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/coordenacao')
    await expect(page.getByRole('heading', { name: 'Mandatos anteriores' })).toBeVisible()
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
    await expect(term.locator('summary')).toContainText('data da eleição não consta nos registros publicados')
  })

  test('the current term links to the edital that convened its election', async ({ page }) => {
    await page.goto('/coordenacao')
    await expect(page.getByRole('link', { name: 'Edital de convocação 1/2025' })).toHaveAttribute(
      'href',
      '/noticias/edital-de-convocacao-1-2025',
    )
  })

  test('each body says what it does', async ({ page }) => {
    await page.goto('/coordenacao')
    await expect(page.getByText(/Examina as contas e os balanços/)).toBeVisible()
  })

  test('a link to one term opens it', async ({ page }) => {
    await page.goto('/coordenacao#mandato-2010-2012')
    await expect(page.locator('#mandato-2010-2012')).toHaveAttribute('open', '')
    await expect(page.locator('#mandato-2010-2012 h4').first()).toBeVisible()
  })

  test('on phones each body is followed by its own substitutes', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/coordenacao')
    const titles = await page
      .locator('#atual-title ~ div h3')
      .allTextContents()
    expect(titles).toEqual([
      'Coordenação',
      'Suplentes da coordenação',
      'Conselho fiscal',
      'Suplentes do conselho fiscal',
    ])
  })

  test('the closing band leads to joining', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/coordenacao')
    await expect(page.locator('main').getByRole('link', { name: 'Associe-se (gratuito)' })).toBeVisible()
  })
})
