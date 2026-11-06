import { useEffect, useRef } from 'react'
import { Box, useMediaQuery } from '@mui/material'

/**
 * A yellow swallowtail flying a slow loop through a drifting sky, filling
 * whatever positioned box it is placed in. Everything is drawn in code
 * (./swallowtail, ./sky); three.js lives in ./scene, a separate chunk loaded
 * only when this mounts. Under prefers-reduced-motion it renders one still
 * frame. If WebGL fails, the box's own sky gradient shows instead. It starts
 * once the browser is idle, so it never delays the page's first response.
 * Decorative, so hidden from assistive technology.
 */
export function FlyingBorb() {
  const ref = useRef<HTMLDivElement>(null)
  const still = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    const container = ref.current
    if (!container) return
    let teardown: (() => void) | undefined
    let cancelled = false

    // Wait until the page has finished its own start-up work: three.js is
    // decoration and should never compete with the first click. The timeout
    // starts it anyway on a page that never goes idle. Safari has no
    // requestIdleCallback, so it gets a short delay instead.
    const start = () =>
      import('./scene')
        .then(({ mountFlyingBorb }) => {
          if (!cancelled) teardown = mountFlyingBorb(container, { still })
        })
        // The chunk failed to load: leave the gradient behind it showing.
        .catch(() => {})

    const idle = 'requestIdleCallback' in window
    const handle = idle
      ? window.requestIdleCallback(start, { timeout: 2000 })
      : window.setTimeout(start, 600)

    return () => {
      cancelled = true
      if (idle) window.cancelIdleCallback(handle)
      else window.clearTimeout(handle)
      teardown?.()
    }
  }, [still])

  return <Box ref={ref} aria-hidden="true" sx={{ position: 'absolute', inset: 0 }} />
}
