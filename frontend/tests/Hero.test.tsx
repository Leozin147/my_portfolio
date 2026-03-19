import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import Hero from '../components/Hero'

vi.mock('../components/Terminal', () => ({
  default: ({ text }: { text: string }) => <div data-testid='terminal-mock'>{text}</div>,
}))

const mock_use_theme = vi.fn()

vi.mock('../context/ThemeContext', () => ({
  use_theme: () => mock_use_theme(),
}))

describe('Hero', () => {
  it('renderiza o nome de Leonardo', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<Hero />)
    expect(screen.getByText(/leonardo/i)).toBeInTheDocument()
  })

  it('renderiza o cargo', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<Hero />)
    expect(screen.getByTestId('hero-role')).toBeInTheDocument()
  })

  it('renderiza o terminal', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<Hero />)
    expect(screen.getByTestId('terminal-mock')).toBeInTheDocument()
  })

  it('renderiza o link de CTA para serviços', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<Hero />)
    const cta = screen.getByRole('link', { name: /explore my services/i })
    expect(cta).toHaveAttribute('href', '/services')
  })

  it('cargo no tema dark tem classe text-zinc-400', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<Hero />)
    expect(screen.getByTestId('hero-role').className).toContain('text-zinc-400')
  })

  it('cargo no tema light tem classe text-zinc-600', () => {
    mock_use_theme.mockReturnValue({ theme: 'light' })
    render(<Hero />)
    expect(screen.getByTestId('hero-role').className).toContain('text-zinc-600')
  })

  it('renderiza o cargo em português', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<Hero />)
    expect(screen.getByTestId('hero-role-pt')).toBeInTheDocument()
  })

  it('renderiza o link do LinkedIn', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<Hero />)
    expect(screen.getByTestId('hero-linkedin')).toHaveAttribute('href', 'https://www.linkedin.com/in/leonardo-fernandes-cardoso-7a6a75269')
  })
})
