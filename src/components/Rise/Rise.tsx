import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

type RiseProps = {
  children: ReactNode
  /** Milliseconds before this label starts, to stagger neighbours. */
  delay?: number
}

/**
 * Text that emerges from below a clip line. The inner span is keyed by the
 * path, so every navigation replays the motion while the surrounding link
 * stays mounted and keeps keyboard focus. Styles live in index.css.
 */
export function Rise({ children, delay = 0 }: RiseProps) {
  const { pathname } = useLocation()

  return (
    <span className="rise">
      <span key={pathname} style={{ ['--rise-delay' as string]: `${delay}ms` }}>
        {children}
      </span>
    </span>
  )
}
