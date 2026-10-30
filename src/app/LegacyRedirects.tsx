import { Navigate, useLocation } from 'react-router-dom'
import redirects from '../content/redirects.json'

const ids: Record<string, string> = redirects.ids

/**
 * Client-side fallback for old WordPress links (`/?p=40`, `/?page_id=70`).
 * Hosts that can't match query strings never reach the new site with a 301,
 * so the app finishes the job. Pretty permalinks are routes in App.tsx.
 */
export function LegacyRedirects() {
  const { pathname, search } = useLocation()
  if (pathname !== '/') return null

  const params = new URLSearchParams(search)
  const target = ids[params.get('p') ?? params.get('page_id') ?? '']
  return target ? <Navigate to={target} replace /> : null
}
