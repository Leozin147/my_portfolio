import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect } from 'vitest'
import Navbar from '../components/Navbar'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

const mock_use_theme = vi.fn()

vi.mock('../context/ThemeContext', () => ({
  use_theme: () => mock_use_theme(),
}))

describe('Navbar', () => {
  it('renderiza o link Home', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark', toggle_theme: vi.fn() })
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
  })

  it('renderiza o link Projetos', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark', toggle_theme: vi.fn() })
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /projetos/i })).toBeInTheDocument()
  })

  it('renderiza o link Contato', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark', toggle_theme: vi.fn() })
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /contato/i })).toBeInTheDocument()
  })

  it('marca o link ativo com aria-current quando na rota correspondente', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark', toggle_theme: vi.fn() })
    render(<Navbar />)
    const home_link = screen.getByRole('link', { name: /home/i })
    expect(home_link).toHaveAttribute('aria-current', 'page')
  })

  it('link ativo no tema dark tem classe text-zinc-50', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark', toggle_theme: vi.fn() })
    render(<Navbar />)
    const home_link = screen.getByRole('link', { name: /home/i })
    expect(home_link.className).toContain('text-zinc-50')
  })

  it('link ativo no tema light tem classe text-zinc-900', () => {
    mock_use_theme.mockReturnValue({ theme: 'light', toggle_theme: vi.fn() })
    render(<Navbar />)
    const home_link = screen.getByRole('link', { name: /home/i })
    expect(home_link.className).toContain('text-zinc-900')
  })

  it('link inativo no tema light tem classe text-zinc-500', () => {
    mock_use_theme.mockReturnValue({ theme: 'light', toggle_theme: vi.fn() })
    render(<Navbar />)
    const projetos_link = screen.getByRole('link', { name: /projetos/i })
    expect(projetos_link.className).toContain('text-zinc-500')
  })

  it('renderiza o link Services', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark', toggle_theme: vi.fn() })
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument()
  })

  it('renderiza o link do LinkedIn', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark', toggle_theme: vi.fn() })
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', 'https://www.linkedin.com/in/leonardo-fernandes-cardoso-7a6a75269')
  })

  it('renderiza o link do GitHub', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark', toggle_theme: vi.fn() })
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/Leozin147')
  })

  it('renderiza o botão hamburger em telas mobile', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark', toggle_theme: vi.fn() })
    render(<Navbar />)
    expect(screen.getByTestId('navbar-hamburger')).toBeInTheDocument()
  })

  it('abre o menu mobile ao clicar no hamburger', async () => {
    mock_use_theme.mockReturnValue({ theme: 'dark', toggle_theme: vi.fn() })
    const user = userEvent.setup()
    render(<Navbar />)
    const hamburger = screen.getByTestId('navbar-hamburger')
    await user.click(hamburger)
    const mobile_links = screen.getAllByRole('link', { name: /home/i })
    expect(mobile_links.length).toBeGreaterThan(0)
  })
})
