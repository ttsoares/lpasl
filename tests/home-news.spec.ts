import { expect, test } from '@playwright/test'
import { homeNews, postsNewestFirst } from '../src/content/posts'

// homeNews() is pure, so these run without a browser page.
const day = 24 * 60 * 60 * 1000
const newest = postsNewestFirst[0]
const newestAt = new Date(`${newest.date}T12:00:00`).getTime()
const daysAfterNewest = (days: number) => new Date(newestAt + days * day)

test.describe('homeNews', () => {
  test('keeps a post 182 days old', () => {
    expect(homeNews(daysAfterNewest(182)).map((post) => post.slug)).toContain(newest.slug)
  })

  test('drops a post 184 days old', () => {
    expect(homeNews(daysAfterNewest(184)).map((post) => post.slug)).not.toContain(newest.slug)
  })

  test('returns nothing when every post is older than the window', () => {
    expect(homeNews(daysAfterNewest(400))).toEqual([])
  })

  test('lists recent posts newest first', () => {
    const dates = homeNews(daysAfterNewest(0)).map((post) => post.date)
    expect(dates).toEqual([...dates].sort().reverse())
  })
})
