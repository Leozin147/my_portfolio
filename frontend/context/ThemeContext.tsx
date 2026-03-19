'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggle_theme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, set_theme] = useState<Theme>('dark')
  const [mounted, set_mounted] = useState(false)

  useEffect(() => {
    const saved = (localStorage.getItem('theme') as Theme | null) ?? 'dark'
    // eslint-disable-next-line react-hooks/set-state-in-effect
    set_theme(saved)
    set_mounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    root.classList.remove('dark', 'light')
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  const toggle_theme = () => set_theme(prev => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggle_theme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function use_theme() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useContext(ThemeContext)
  if (!context) throw new Error('use_theme must be used within ThemeProvider')
  return context
}
