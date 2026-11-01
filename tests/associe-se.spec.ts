import { expect, test } from '@playwright/test'

test.describe('/associe-se', () => {
  test('every step links to what it needs, on a phone too', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/associe-se')
    const steps = page.locator('main ol > li')
    await expect(steps).toHaveCount(4)

    await expect(steps.nth(0).getByRole('link', { name: /Estatuto Social/ })).toHaveAttribute(
      'href',
      '/docs/asl-estatuto-final-2019-07.pdf',
    )
    await expect(steps.nth(1).getByRole('link', { name: 'Proposta de Associado' })).toHaveAttribute(
      'download',
      'ASL-Proposta-de-Associado.pdf',
    )
    const email = steps.nth(2).getByRole('link', { name: 'asl@asl.org.br' })
    await expect(email).toBeVisible()
    await expect(email).toHaveAttribute('href', /^mailto:asl@asl\.org\.br\?subject=/)
    await expect(steps.nth(3).getByRole('link', { name: 'Notícias' })).toHaveAttribute('href', '/noticias')
  })

  test('the page ends on joining: support is a line, not a closing band', async ({ page }) => {
    await page.goto('/associe-se')
    await expect(page.getByRole('heading', { name: /Prefere apoiar/ })).toHaveCount(0)
    await expect(page.getByRole('link', { name: 'Apoia.se' })).toBeVisible()
  })

  test('the header CTA marks this page as current', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 900 })
    await page.goto('/associe-se')
    await expect(page.locator('header').getByRole('link', { name: 'Associe-se' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })
})
