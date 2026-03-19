import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import Contact from '../app/contact/page'

const mock_use_theme = vi.fn()

vi.mock('../context/ThemeContext', () => ({
  use_theme: () => mock_use_theme(),
}))

describe('Contact', () => {
  beforeEach(() => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    vi.restoreAllMocks()
  })

  it('renderiza o título', () => {
    render(<Contact />)
    expect(screen.getByTestId('contact-title')).toBeInTheDocument()
  })

  it('renderiza o campo Name', () => {
    render(<Contact />)
    expect(screen.getByTestId('input-name')).toBeInTheDocument()
  })

  it('não renderiza campo Email', () => {
    render(<Contact />)
    expect(screen.queryByTestId('input-email')).not.toBeInTheDocument()
  })

  it('renderiza o campo Phone', () => {
    render(<Contact />)
    expect(screen.getByTestId('input-phone')).toBeInTheDocument()
  })

  it('renderiza o campo Message', () => {
    render(<Contact />)
    expect(screen.getByTestId('input-message')).toBeInTheDocument()
  })

  it('renderiza os campos de data preferida', () => {
    render(<Contact />)
    expect(screen.getByTestId('input-date1')).toBeInTheDocument()
    expect(screen.getByTestId('input-date2')).toBeInTheDocument()
  })

  it('renderiza o botão de submit', () => {
    render(<Contact />)
    expect(screen.getByTestId('submit-button')).toBeInTheDocument()
  })

  it('exibe feedback de sucesso após envio bem-sucedido', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
    const user = userEvent.setup()
    render(<Contact />)
    await user.type(screen.getByTestId('input-name'), 'Leonardo')
    await user.type(screen.getByTestId('input-phone'), '13974057602')
    await user.type(screen.getByTestId('input-message'), 'Olá!')
    await user.click(screen.getByTestId('submit-button'))
    expect(screen.getByTestId('success-message')).toBeInTheDocument()
  })

  it('exibe mensagem de erro quando fetch falha', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    const user = userEvent.setup()
    render(<Contact />)
    await user.type(screen.getByTestId('input-name'), 'Leonardo')
    await user.type(screen.getByTestId('input-phone'), '13974057602')
    await user.type(screen.getByTestId('input-message'), 'Olá!')
    await user.click(screen.getByTestId('submit-button'))
    expect(screen.getByTestId('error-message')).toBeInTheDocument()
  })

  it('exibe mensagem de erro quando fetch lança exceção', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')))
    const user = userEvent.setup()
    render(<Contact />)
    await user.type(screen.getByTestId('input-name'), 'Leonardo')
    await user.type(screen.getByTestId('input-phone'), '13974057602')
    await user.type(screen.getByTestId('input-message'), 'Olá!')
    await user.click(screen.getByTestId('submit-button'))
    expect(screen.getByTestId('error-message')).toBeInTheDocument()
  })
})
