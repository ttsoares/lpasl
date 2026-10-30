import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Resets scroll on navigation. Deep links (`/atuacao#fisl`) scroll to the
 * target instead, and skip it when the browser has already restored a
 * previous position.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView()
        // Web fonts change the offset of everything above the target.
        void document.fonts?.ready.then(() => target.scrollIntoView())
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
