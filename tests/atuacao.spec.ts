import { expect, test } from '@playwright/test'

test.describe('/atuacao', () => {
  test('lists the five current initiatives and none of the retired ones', async ({ page }) => {
    await page.goto('/atuacao')
    for (const name of ['PSL.Br', 'FISL', 'TV Software Livre', 'Rádio Software Livre', 'Cine Kafuné']) {
      await expect(page.getByRole('heading', { level: 2, name })).toBeVisible()
    }
    await expect(page.getByText(/Pontão de Cultura Digital Minuano/)).toHaveCount(0)
    await expect(page.getByText(/Festival de Cultura Livre/)).toHaveCount(0)
  })

  test('Rádio Software Livre has no outbound link', async ({ page }) => {
    await page.goto('/atuacao')
    await expect(page.locator('#radio-software-livre a')).toHaveCount(0)
  })

  test('every initiative image and the TV clip load', async ({ page, request }) => {
    await page.goto('/atuacao')
    const sources = await page
      .locator('.atu img, .atu video')
      .evaluateAll((els) => els.map((el) => el.getAttribute('src') ?? ''))
    expect(sources.length).toBeGreaterThanOrEqual(5)
    for (const src of sources) {
      expect((await request.head(src)).status(), src).toBe(200)
    }
  })

  test('the TV clip loops with sound on, and the visitor can mute it', async ({ page }) => {
    await page.goto('/atuacao')
    const video = page.locator('#tv-software-livre video')
    await expect(video).toHaveJSProperty('loop', true)
    await expect(video).not.toHaveAttribute('muted')

    await video.scrollIntoViewIfNeeded()
    // Whatever the autoplay policy allowed, the button flips the sound.
    const button = page.locator('#tv-software-livre .atu-tv-sound')
    const before = await video.evaluate((v: HTMLVideoElement) => v.muted)
    await button.click()
    await expect(video).toHaveJSProperty('muted', !before)
    await expect(button).toHaveText(before ? 'Silenciar' : 'Ativar som')
  })

  test('deep links land below the sticky header', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 900 })
    await page.goto('/atuacao#cine-kafune')
    const top = () =>
      page.locator('#cine-kafune').evaluate((el) => Math.round(el.getBoundingClientRect().top))
    // Smooth scrolling takes a moment to arrive.
    await expect.poll(top, { timeout: 5000 }).toBeLessThan(140)
    expect(await top()).toBeGreaterThanOrEqual(60)
  })
})
