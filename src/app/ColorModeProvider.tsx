import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  ColorModeContext,
  type ColorMode,
  type ColorModeContextValue,
} from './color-mode'

const STORAGE_KEY = 'asl-color-mode'

function readInitialMode(): ColorMode {
  const fromDocument = document.documentElement.dataset.theme
  if (fromDocument === 'light' || fromDocument === 'dark') {
    return fromDocument
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') {
      return stored
    }
  } catch {
    // Storage can be unavailable in private browsing; fall back to the OS setting.
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ColorModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ColorMode>(readInitialMode)

  useEffect(() => {
    document.documentElement.dataset.theme = mode
    document.documentElement.style.colorScheme = mode

    const themeColor = document.querySelector('meta[name="theme-color"]')
    themeColor?.setAttribute('content', mode === 'dark' ? '#000000' : '#FFFFFF')

    try {
      window.localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      // Preference simply will not persist if storage is blocked.
    }
  }, [mode])

  const toggleMode = useCallback(() => {
    setMode((current) => (current === 'light' ? 'dark' : 'light'))
  }, [])

  const value = useMemo<ColorModeContextValue>(() => ({ mode, toggleMode }), [mode, toggleMode])

  return <ColorModeContext.Provider value={value}>{children}</ColorModeContext.Provider>
}
