'use client'

import { use_theme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggle_theme } = use_theme()

  const hover_class = theme === 'dark' ? 'hover:bg-zinc-700' : 'hover:bg-zinc-200'

  return (
    <button
      onClick={toggle_theme}
      aria-label={theme === 'dark' ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
      className={`rounded-md p-2 transition-colors ${hover_class}`}
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  )
}
