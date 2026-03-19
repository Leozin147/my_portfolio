import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import { ThemeProvider, use_theme } from '../context/ThemeContext'

function Theme_display() {
  const { theme, toggle_theme } = use_theme()
  return (
    <div>
      <span data-testid='theme'>{theme}</span>
      <button onClick={toggle_theme}>toggle</button>
    </div>
  )
}

beforeEach(() => {
  document.documentElement.className = ''
  localStorage.clear()
})

describe('ThemeContext', () => {
  it('aplica a classe dark no html ao montar sem localStorage', () => {
    render(
      <ThemeProvider>
        <Theme_display />
      </ThemeProvider>
    )
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('remove a classe dark e adiciona light ao fazer toggle', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <Theme_display />
      </ThemeProvider>
    )
    await user.click(screen.getByRole('button', { name: /toggle/i }))
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(document.documentElement.classList.contains('light')).toBe(true)
  })

  it('volta para dark ao fazer toggle duas vezes', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <Theme_display />
      </ThemeProvider>
    )
    await user.click(screen.getByRole('button', { name: /toggle/i }))
    await user.click(screen.getByRole('button', { name: /toggle/i }))
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('expõe o tema correto via context', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <Theme_display />
      </ThemeProvider>
    )
    expect(screen.getByTestId('theme').textContent).toBe('dark')
    await user.click(screen.getByRole('button', { name: /toggle/i }))
    expect(screen.getByTestId('theme').textContent).toBe('light')
  })

  it('salva o tema no localStorage ao fazer toggle', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <Theme_display />
      </ThemeProvider>
    )
    await user.click(screen.getByRole('button', { name: /toggle/i }))
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('restaura o tema do localStorage após montar', async () => {
    localStorage.setItem('theme', 'light')
    render(
      <ThemeProvider>
        <Theme_display />
      </ThemeProvider>
    )
    await act(async () => {})
    expect(screen.getByTestId('theme').textContent).toBe('light')
    expect(document.documentElement.classList.contains('light')).toBe(true)
  })

  it('inicia sempre com dark antes de ler o localStorage (sem hydration mismatch)', () => {
    localStorage.setItem('theme', 'light')
    let initial_theme: string | null = null
    function Capture_initial() {
      const { theme } = use_theme()
      if (initial_theme === null) initial_theme = theme
      return null
    }
    render(
      <ThemeProvider>
        <Capture_initial />
      </ThemeProvider>
    )
    expect(initial_theme).toBe('dark')
  })
})
