/**
 * A butterfly that flies in and flaps its wings, then perches on whatever
 * positioned parent it is placed in. The art is two images, one per wing, cut
 * along the body (scripts/build-borb.py); each is squeezed toward the body to
 * make a flap. Decorative, so hidden from assistive technology. The motion
 * lives in index.css and is off under prefers-reduced-motion.
 */
export function Borb() {
  return (
    <span className="borb" aria-hidden="true">
      <span className="borb-tilt">
        <img src="/brand/borb-left.png" alt="" width={145} height={306} />
        <img src="/brand/borb-right.png" alt="" width={145} height={306} />
      </span>
    </span>
  )
}
