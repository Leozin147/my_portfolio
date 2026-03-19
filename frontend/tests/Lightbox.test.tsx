import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Lightbox from '../components/Lightbox'

describe('Lightbox', () => {
  it('renderiza a imagem passada', () => {
    render(<Lightbox src='/images/projects/chatbot1.jpeg' alt='Chatbot' on_close={vi.fn()} />)
    expect(screen.getByRole('img')).toHaveAttribute('src', '/images/projects/chatbot1.jpeg')
  })

  it('renderiza o botão de fechar', () => {
    render(<Lightbox src='/img.jpeg' alt='foto' on_close={vi.fn()} />)
    expect(screen.getByRole('button', { name: /fechar/i })).toBeInTheDocument()
  })

  it('chama on_close ao clicar no botão fechar', async () => {
    const on_close = vi.fn()
    const user = userEvent.setup()
    render(<Lightbox src='/img.jpeg' alt='foto' on_close={on_close} />)
    await user.click(screen.getByRole('button', { name: /fechar/i }))
    expect(on_close).toHaveBeenCalledTimes(1)
  })

  it('chama on_close ao clicar no overlay', async () => {
    const on_close = vi.fn()
    const user = userEvent.setup()
    render(<Lightbox src='/img.jpeg' alt='foto' on_close={on_close} />)
    await user.click(screen.getByTestId('lightbox-overlay'))
    expect(on_close).toHaveBeenCalledTimes(1)
  })

  it('renderiza com overlay de fundo', () => {
    render(<Lightbox src='/img.jpeg' alt='foto' on_close={vi.fn()} />)
    expect(screen.getByTestId('lightbox-overlay')).toBeInTheDocument()
  })

  it('chama on_close ao pressionar Escape', async () => {
    const on_close = vi.fn()
    const user = userEvent.setup()
    render(<Lightbox src='/img.jpeg' alt='foto' on_close={on_close} />)
    await user.keyboard('{Escape}')
    expect(on_close).toHaveBeenCalledTimes(1)
  })
})
