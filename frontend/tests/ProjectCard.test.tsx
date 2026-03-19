import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect } from 'vitest'
import ProjectCard from '../components/ProjectCard'

const mock_use_theme = vi.fn()

vi.mock('../context/ThemeContext', () => ({
  use_theme: () => mock_use_theme(),
}))

vi.mock('../components/Lightbox', () => ({
  default: ({ on_close }: { on_close: () => void }) => (
    <div data-testid='lightbox-mock'>
      <button onClick={on_close}>fechar</button>
    </div>
  ),
}))

const base_props = {
  title: 'Chatbot de Cobrança',
  description: 'Agente de IA que aborda clientes inadimplentes via WhatsApp.',
  techs: ['N8N', 'Evolution API', 'Gemini'],
  status: 'done' as const,
}

describe('ProjectCard', () => {
  it('renderiza o título do projeto', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<ProjectCard {...base_props} />)
    expect(screen.getByText('Chatbot de Cobrança')).toBeInTheDocument()
  })

  it('renderiza a descrição', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<ProjectCard {...base_props} />)
    expect(screen.getByText(/clientes inadimplentes/i)).toBeInTheDocument()
  })

  it('renderiza todas as tags de tech', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<ProjectCard {...base_props} />)
    expect(screen.getByText('N8N')).toBeInTheDocument()
    expect(screen.getByText('Evolution API')).toBeInTheDocument()
    expect(screen.getByText('Gemini')).toBeInTheDocument()
  })

  it('renderiza o link do GitHub quando fornecido', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<ProjectCard {...base_props} github='https://github.com/user/repo' />)
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/user/repo')
  })

  it('não renderiza link do GitHub quando não fornecido', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<ProjectCard {...base_props} />)
    expect(screen.queryByRole('link', { name: /github/i })).not.toBeInTheDocument()
  })

  it('renderiza badge "Concluído" para status done', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<ProjectCard {...base_props} status='done' />)
    expect(screen.getByText(/concluído/i)).toBeInTheDocument()
  })

  it('renderiza badge "Em Planejamento" para status planned', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<ProjectCard {...base_props} status='planned' />)
    expect(screen.getByText(/em planejamento/i)).toBeInTheDocument()
  })

  it('no tema dark tem borda zinc-700', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<ProjectCard {...base_props} />)
    expect(screen.getByTestId('project-card').className).toContain('border-zinc-700')
  })

  it('no tema light tem borda zinc-200', () => {
    mock_use_theme.mockReturnValue({ theme: 'light' })
    render(<ProjectCard {...base_props} />)
    expect(screen.getByTestId('project-card').className).toContain('border-zinc-200')
  })

  it('no tema light a descrição tem cor zinc-600', () => {
    mock_use_theme.mockReturnValue({ theme: 'light' })
    render(<ProjectCard {...base_props} />)
    expect(screen.getByTestId('project-description').className).toContain('text-zinc-600')
  })

  it('no tema dark a descrição tem cor zinc-400', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<ProjectCard {...base_props} />)
    expect(screen.getByTestId('project-description').className).toContain('text-zinc-400')
  })

  it('renderiza grupos de imagens com label quando fornecidos', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<ProjectCard {...base_props} image_groups={[{ label: 'Fluxos', images: [
      { src: '/img1.jpeg', title: 'Img 1' },
      { src: '/img2.jpeg', title: 'Img 2' },
    ] }]} />)
    expect(screen.getByText('Fluxos')).toBeInTheDocument()
    expect(screen.getAllByRole('img')).toHaveLength(2)
  })

  it('renderiza o título de cada imagem', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<ProjectCard {...base_props} image_groups={[{
      label: 'Fluxos',
      images: [{ src: '/img1.jpeg', title: 'README' }, { src: '/img2.jpeg', title: 'Chatbot' }]
    }]} />)
    expect(screen.getByText('README')).toBeInTheDocument()
    expect(screen.getByText('Chatbot')).toBeInTheDocument()
  })

  it('não renderiza seção de imagens quando não fornecidas', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<ProjectCard {...base_props} />)
    expect(screen.queryByTestId('project-images-section')).not.toBeInTheDocument()
  })

  it('abre lightbox ao clicar em uma imagem', async () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    const user = userEvent.setup()
    render(<ProjectCard {...base_props} image_groups={[{ label: 'Fluxos', images: [{ src: '/img1.jpeg', title: 'Chatbot' }] }]} />)
    await user.click(screen.getByRole('img'))
    expect(screen.getByTestId('lightbox-mock')).toBeInTheDocument()
  })

  it('fecha o lightbox ao clicar em fechar', async () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    const user = userEvent.setup()
    render(<ProjectCard {...base_props} image_groups={[{ label: 'Fluxos', images: [{ src: '/img1.jpeg', title: 'Chatbot' }] }]} />)
    await user.click(screen.getByRole('img'))
    await user.click(screen.getByRole('button', { name: /fechar/i }))
    expect(screen.queryByTestId('lightbox-mock')).not.toBeInTheDocument()
  })

  it('imagem README tem altura limitada no card', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<ProjectCard {...base_props} image_groups={[{
      label: 'Fluxos',
      images: [{ src: '/readme.jpeg', title: 'README' }]
    }]} />)
    const img = screen.getByRole('img', { name: 'README' })
    expect(img.className).toContain('max-h-')
  })

  it('imagem não-README não tem altura limitada', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<ProjectCard {...base_props} image_groups={[{
      label: 'Fluxos',
      images: [{ src: '/chatbot.jpeg', title: 'Chatbot' }]
    }]} />)
    const img = screen.getByRole('img', { name: 'Chatbot' })
    expect(img.className).not.toContain('max-h-')
  })
})
