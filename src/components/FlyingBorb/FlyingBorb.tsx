import { useEffect, useRef } from 'react'
import { Box, useMediaQuery } from '@mui/material'

/**
 * A yellow swallowtail flying a slow loop through a drifting sky, filling
 * whatever positioned box it is placed in. Everything is drawn in code
 * (./swallowtail, ./sky); three.js lives in ./scene, a separate chunk loaded
 * only when this mounts. Under prefers-reduced-motion it renders one still
 * frame. If WebGL fails, the box's own sky gradient shows instead.
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

    import('./scene')
      .then(({ mountFlyingBorb }) => {
        if (!cancelled) teardown = mountFlyingBorb(container, { still })
      })
      // No WebGL: leave the gradient behind it showing.
      .catch(() => {})

    return () => {
      cancelled = true
      teardown?.()
    }
  }, [still])

  return <Box ref={ref} aria-hidden="true" sx={{ position: 'absolute', inset: 0 }} />
}
