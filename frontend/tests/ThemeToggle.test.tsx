import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect } from 'vitest'
import ThemeToggle from '../components/ThemeToggle'

const mock_toggle = vi.fn()
const mock_use_theme = vi.fn()

vi.mock('../context/ThemeContext', () => ({
  use_theme: () => mock_use_theme(),
}))

describe('ThemeToggle', () => {
  it('renderiza o botão de toggle', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark', toggle_theme: mock_toggle })
    render(<ThemeToggle />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('chama toggle_theme ao clicar', async () => {
    mock_use_theme.mockReturnValue({ theme: 'dark', toggle_theme: mock_toggle })
    const user = userEvent.setup()
    render(<ThemeToggle />)
    await user.click(screen.getByRole('button'))
    expect(mock_toggle).toHaveBeenCalledTimes(1)
  })

  it('exibe ícone de lua no tema dark', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark', toggle_theme: mock_toggle })
    render(<ThemeToggle />)
    expect(screen.getByLabelText(/alternar para modo claro/i)).toBeInTheDocument()
  })

  it('exibe ícone de sol no tema light', () => {
    mock_use_theme.mockReturnValue({ theme: 'light', toggle_theme: mock_toggle })
    render(<ThemeToggle />)
    expect(screen.getByLabelText(/alternar para modo escuro/i)).toBeInTheDocument()
  })

  it('botão no tema dark tem hover escuro', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark', toggle_theme: mock_toggle })
    render(<ThemeToggle />)
    expect(screen.getByRole('button').className).toContain('hover:bg-zinc-700')
  })

  it('botão no tema light tem hover claro', () => {
    mock_use_theme.mockReturnValue({ theme: 'light', toggle_theme: mock_toggle })
    render(<ThemeToggle />)
    expect(screen.getByRole('button').className).toContain('hover:bg-zinc-200')
  })
})
