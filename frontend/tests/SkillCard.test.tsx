import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import SkillCard from '../components/SkillCard'

const mock_use_theme = vi.fn()

vi.mock('../context/ThemeContext', () => ({
  use_theme: () => mock_use_theme(),
}))

describe('SkillCard', () => {
  it('renderiza o nome da skill', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<SkillCard name='N8N' level={5} />)
    expect(screen.getByText('N8N')).toBeInTheDocument()
  })

  it('renderiza o número correto de pontos preenchidos', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<SkillCard name='Node.js' level={3} />)
    expect(screen.getAllByTestId('skill-dot-filled')).toHaveLength(3)
  })

  it('renderiza o número correto de pontos vazios', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<SkillCard name='Node.js' level={3} />)
    expect(screen.getAllByTestId('skill-dot-empty')).toHaveLength(2)
  })

  it('renderiza 5 pontos no total', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<SkillCard name='Make' level={4} />)
    const filled = screen.getAllByTestId('skill-dot-filled')
    const empty = screen.getAllByTestId('skill-dot-empty')
    expect(filled.length + empty.length).toBe(5)
  })

  it('no tema dark tem borda zinc-700', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<SkillCard name='N8N' level={5} />)
    expect(screen.getByTestId('skill-card').className).toContain('border-zinc-700')
  })

  it('no tema light tem borda zinc-200', () => {
    mock_use_theme.mockReturnValue({ theme: 'light' })
    render(<SkillCard name='N8N' level={5} />)
    expect(screen.getByTestId('skill-card').className).toContain('border-zinc-200')
  })

  it('ponto vazio no tema dark tem bg-zinc-600', () => {
    mock_use_theme.mockReturnValue({ theme: 'dark' })
    render(<SkillCard name='N8N' level={3} />)
    const empty = screen.getAllByTestId('skill-dot-empty')
    expect(empty[0].className).toContain('bg-zinc-600')
  })

  it('ponto vazio no tema light tem bg-zinc-300', () => {
    mock_use_theme.mockReturnValue({ theme: 'light' })
    render(<SkillCard name='N8N' level={3} />)
    const empty = screen.getAllByTestId('skill-dot-empty')
    expect(empty[0].className).toContain('bg-zinc-300')
  })
})
