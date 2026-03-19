import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import Services from '../app/services/page'

const mock_use_theme = vi.fn()

vi.mock('../context/ThemeContext', () => ({
  use_theme: () => mock_use_theme(),
}))

describe('Services', () => {
  it('renderiza o título', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<Services />)
    expect(screen.getByTestId('services-title')).toBeInTheDocument()
  })

  it('renderiza pelo menos 4 cards de serviço', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<Services />)
    expect(screen.getAllByTestId('service-card').length).toBeGreaterThanOrEqual(4)
  })

  it('cada card tem título em inglês e descrição em português', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<Services />)
    const titles = screen.getAllByTestId('service-title-en')
    const descs = screen.getAllByTestId('service-desc-pt')
    expect(titles.length).toBeGreaterThanOrEqual(4)
    expect(descs.length).toBeGreaterThanOrEqual(4)
  })

  it('renderiza o botão de Get in Touch linkando para /contact', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<Services />)
    expect(screen.getByTestId('services-cta')).toHaveAttribute('href', '/contact')
  })

  it('no tema dark o card tem borda zinc-700', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<Services />)
    expect(screen.getAllByTestId('service-card')[0].className).toContain('border-zinc-700')
  })

  it('no tema light o card tem borda zinc-200', () => {
    mock_use_theme.mockReturnValue({ theme: 'light' })
    render(<Services />)
    expect(screen.getAllByTestId('service-card')[0].className).toContain('border-zinc-200')
  })
})
