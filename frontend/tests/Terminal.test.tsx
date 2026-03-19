import { render, screen, act } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import Terminal from '../components/Terminal'

const mock_use_theme = vi.fn()

vi.mock('../context/ThemeContext', () => ({
  use_theme: () => mock_use_theme(),
}))

describe('Terminal', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    mock_use_theme.mockReturnValue({ theme: 'dark' })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('inicia com texto vazio', () => {
    render(<Terminal text='Olá, mundo!' />)
    expect(screen.getByTestId('terminal-text').textContent).toBe('')
  })

  it('exibe o cursor piscando', () => {
    render(<Terminal text='Olá, mundo!' />)
    expect(screen.getByTestId('terminal-cursor')).toBeInTheDocument()
  })

  it('digita o texto caractere por caractere', () => {
    render(<Terminal text='Oi' />)
    act(() => { vi.advanceTimersByTime(60) })
    expect(screen.getByTestId('terminal-text').textContent).toBe('O')
    act(() => { vi.advanceTimersByTime(60) })
    expect(screen.getByTestId('terminal-text').textContent).toBe('Oi')
  })

  it('exibe o texto completo após a animação terminar', () => {
    const text = 'Olá!'
    render(<Terminal text={text} />)
    act(() => { vi.advanceTimersByTime(60 * text.length) })
    expect(screen.getByTestId('terminal-text').textContent).toBe(text)
  })

  it('no tema dark o texto digitado é branco (text-zinc-100)', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<Terminal text='Oi' />)
    expect(screen.getByTestId('terminal-text').className).toContain('text-zinc-100')
  })

  it('no tema light o texto digitado é preto (text-zinc-900)', () => {
    mock_use_theme.mockReturnValue({ theme: 'light' })
    render(<Terminal text='Oi' />)
    expect(screen.getByTestId('terminal-text').className).toContain('text-zinc-900')
  })

  it('no tema dark o fundo é zinc-900', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<Terminal text='Oi' />)
    expect(screen.getByTestId('terminal-wrapper').className).toContain('bg-zinc-900')
  })

  it('no tema light o fundo é zinc-100', () => {
    mock_use_theme.mockReturnValue({ theme: 'light' })
    render(<Terminal text='Oi' />)
    expect(screen.getByTestId('terminal-wrapper').className).toContain('bg-zinc-100')
  })

  it('no tema light a borda é zinc-300', () => {
    mock_use_theme.mockReturnValue({ theme: 'light' })
    render(<Terminal text='Oi' />)
    expect(screen.getByTestId('terminal-wrapper').className).toContain('border-zinc-300')
  })
})
