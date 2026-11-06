import { useEffect, useRef } from 'react'

/**
 * Plays an act's entrance once, the first time it comes into view.
 *
 * Unlike a scroll-scrubbed effect, the entrance runs on its own clock and
 * always finishes: a visitor who stops scrolling halfway never sees a
 * half-revealed logo. CSS does the motion (see atuacao.css): this only adds
 * `will-reveal` (the hidden start) and then `is-in` (the finished state).
 * Under reduced motion, or without JavaScript, neither class is added and the
 * act shows complete.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    el.classList.add('will-reveal')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.classList.add('is-in')
        observer.disconnect()
      },
      // Start once a fifth of the act is on screen, clear of the bottom edge.
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      el.classList.remove('will-reveal', 'is-in')
    }
  }, [])

  return ref
}
