import { useEffect, useRef } from 'react'

/**
 * How progress is measured against the viewport:
 * - `pin`: 0 when the element's top reaches the viewport top, 1 when its bottom
 *   reaches the viewport bottom. For tall sections with a sticky stage inside.
 * - `pass`: 0 when the top enters at the bottom of the viewport, 1 when the
 *   bottom leaves at the top. For bands that scroll through normally.
 * - `leave`: 0 at rest at the top of the page, 1 once the element has scrolled
 *   out. For the page opener.
 */
export type ProgressMode = 'pin' | 'pass' | 'leave'

/**
 * Scroll effects only run where they pay off: wide screens, with motion
 * allowed. Everywhere else the CSS default, the finished composition, stays.
 */
const LIVE_QUERY = '(min-width: 900px) and (prefers-reduced-motion: no-preference)'

/**
 * Writes the element's scroll progress (0 to 1) into its `--p` custom property
 * once per frame and adds `is-live` while effects are enabled. CSS does the
 * rest, so React never re-renders on scroll.
 */
export function useScrollProgress<T extends HTMLElement>(mode: ProgressMode) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const media = window.matchMedia(LIVE_QUERY)
    let frame = 0

    const measure = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      let raw: number
      if (mode === 'pin') raw = -rect.top / Math.max(1, rect.height - vh)
      else if (mode === 'pass') raw = (vh - rect.top) / (vh + rect.height)
      else raw = -rect.top / Math.max(1, rect.height)
      el.style.setProperty('--p', Math.min(1, Math.max(0, raw)).toFixed(4))
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    const stop = () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
      frame = 0
    }

    const apply = () => {
      stop()
      if (media.matches) {
        el.classList.add('is-live')
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
        measure()
      } else {
        el.classList.remove('is-live')
        el.style.removeProperty('--p')
      }
    }

    apply()
    media.addEventListener('change', apply)
    return () => {
      stop()
      media.removeEventListener('change', apply)
    }
  }, [mode])

  return ref
}
