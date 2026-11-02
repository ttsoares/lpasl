import { useEffect, useState } from 'react'

// How long after the page renders the butterfly sets off.
const START_DELAY = 3000

/**
 * A butterfly that flies in and flaps its wings, perches on whatever
 * positioned parent it is placed in, rests, then flies off the top of the
 * page. The art is two images, one per wing, cut along the body
 * (scripts/build-borb.py); each is squeezed toward the body to make a flap.
 * The flight holds, paused, for START_DELAY after render. Decorative, so
 * hidden from assistive technology. The motion lives in index.css and is off
 * under prefers-reduced-motion.
 */
export function Borb() {
  const [flying, setFlying] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setFlying(true), START_DELAY)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <span className={flying ? 'borb' : 'borb borb-waiting'} aria-hidden="true">
      <span className="borb-tilt">
        <img src="/brand/borb-left.png" alt="" width={145} height={306} />
        <img src="/brand/borb-right.png" alt="" width={145} height={306} />
      </span>
    </span>
  )
}
