import { useEffect, useRef, useState } from 'react'

/**
 * A butterfly that flies in and flaps its wings, then perches on whatever
 * positioned parent it is placed in. The art is two images, one per wing, cut
 * along the body (scripts/build-borb.py); each is squeezed toward the body to
 * make a flap. The flight holds, paused, until the parent is fully in view, so
 * it still lands where someone sees it when the parent starts below the fold.
 * Decorative, so hidden from assistive technology. The motion lives in
 * index.css and is off under prefers-reduced-motion.
 */
export function Borb() {
  const ref = useRef<HTMLSpanElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    // Watch the perch, not the butterfly: its own box starts the flight far
    // off-screen.
    const perch = ref.current?.parentElement
    if (!perch) return
    const watcher = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setInView(true)
        watcher.disconnect()
      },
      // Clear of the bottom edge, so the landing isn't half hidden.
      { threshold: 1, rootMargin: '0px 0px -10% 0px' },
    )
    watcher.observe(perch)
    return () => watcher.disconnect()
  }, [])

  return (
    <span ref={ref} className={inView ? 'borb' : 'borb borb-waiting'} aria-hidden="true">
      <span className="borb-tilt">
        <img src="/brand/borb-left.png" alt="" width={145} height={306} />
        <img src="/brand/borb-right.png" alt="" width={145} height={306} />
      </span>
    </span>
  )
}
