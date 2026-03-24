'use client'

import ProjectCard from '../../components/ProjectCard'
import { use_theme } from '../../context/ThemeContext'
import { useTranslations } from 'next-intl'

const projects = [
  {
    title: 'Chatbot de Cobrança Inteligente',
    description: 'Agente de IA via WhatsApp que aborda clientes inadimplentes, negocia pagamento ou registra promessa de pagamento. Suporta texto, áudio e imagem com 3 fluxos distintos no mesmo board.',
    techs: ['N8N', 'Evolution API', 'Gemini Flash 2.5', 'OpenAI Whisper', 'OpenAI Vision', 'Redis', 'Supabase', 'JavaScript'],
    status: 'done' as const,
    image_groups: [
      {
        label: 'N8N — Fluxos',
        images: [
          { src: '/images/projects/chat_readme.png', title: 'Readme - Chatbot' },
          { src: '/images/projects/chatbot1.jpeg', title: 'Chatbot' },
          { src: '/images/projects/chatbot2.jpeg', title: 'Chatbot (detalhe)' },
          { src: '/images/projects/chatbot_followup_readme.jpeg', title: 'README — Follow-up' },
          { src: '/images/projects/chatbot_followup.jpeg', title: 'Follow-up' },
        ],
      },
    ],
  },
  {
    title: 'Sistema de Gestão — Centro Espírita de Umbanda',
    description: 'Board de gestão de atendimentos espirituais com cadastro de consulentes, registro de trabalhos (curas, ebós, fogos), controle de presença e relatórios. Backend em N8N + Supabase, frontend em React.',
    techs: ['N8N', 'Supabase', 'PostgreSQL', 'Webhooks', 'JavaScript', 'React', 'TypeScript'],
    status: 'done' as const,
    github: 'https://github.com/Leozin147/Projeto-Terreiro---Cadastros-e-Registros',
    image_groups: [
      {
        label: 'N8N — Fluxos',
        images: [
          { src: '/images/projects/sistema_ceusc_readme.jpeg', title: 'README' },
          { src: '/images/projects/sistema_ceunsc_registrotrabalhos.jpeg', title: 'Registro de Trabalhos' },
          { src: '/images/projects/sistema_ceunsc_consultaregistros.jpeg', title: 'Consulta de Registros' },
          { src: '/images/projects/sistema_ceunsc_attstatus_e_consulta_presenca.jpeg', title: 'Status & Presença' },
        ],
      },
      {
        label: 'Site',
        images: [
          { src: '/images/projects/sistema_ceunsc_login.jpeg', title: 'Login' },
          { src: '/images/projects/sistema_ceunsc_registro_trabalhos_site.jpeg', title: 'Registro de Trabalhos' },
          { src: '/images/projects/sistema_ceunsc_relatorio_curas_site.jpeg', title: 'Relatório — Curas' },
          { src: '/images/projects/sistema_ceunsc_relatorio_trabalhos_site.jpeg', title: 'Relatório — Trabalhos' },
        ],
      },
    ],
  },
  {
    title: 'Site Institucional — Centro Espírita de Umbanda',
    description: 'Landing page institucional com mapa, vídeo de apresentação, agenda, doações, documentos, projetos e marco dos 20 anos da instituição.',
    techs: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    status: 'in_progress' as const,
  },
  {
    title: 'Portfolio Pessoal',
    description: 'Este portfolio — desenvolvido com Next.js, Express e TDD com Vitest. Dark/light mode, terminal animado e integração com WhatsApp via Evolution API.',
    techs: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'Vitest', 'Evolution API'],
    status: 'done' as const,
    github: 'https://github.com/Leozin147/my_portfolio',
    image_groups: [
      {
        label: 'Portfolio',
        images: [
          { src: '/images/projects/portfolio_home.png', title: 'Home' },
          { src: '/images/projects/portfolio_hardskills.png', title: 'Hard Skills' },
          { src: '/images/projects/portfolio_projects.png', title: 'Projetos' },
          { src: '/images/projects/portfolio_services.png', title: 'Services' },
          { src: '/images/projects/portfolio_contact.png', title: 'Contato' },
        ],
      },
    ],
  },
]

const planned_projects = [
  {
    title: 'Sistema de Aulas com Hierarquia de Acesso',
    description: 'Plataforma interna para armazenamento e acesso a aulas com controle por nível hierárquico.',
    techs: ['Node.js', 'Next.js', 'TypeScript', 'Supabase'],
    status: 'planned' as const,
  },
]

const all_projects = [...projects, ...planned_projects]

const done_projects = all_projects.filter(p => p.status === 'done')
const in_progress_projects = all_projects.filter(p => p.status === 'in_progress')
const planned = all_projects.filter(p => p.status === 'planned')

export default function Projects() {
  const { theme } = use_theme()
  const t = useTranslations('projects')

  const border_class = theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'
  const text_muted = theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'

  return (
    <div className='max-w-7xl mx-auto px-6 py-12'>
      <div className='flex flex-col gap-2 mb-10'>
        <h1 className='text-3xl font-bold tracking-tight'>{t('title')}</h1>
        <p className={`text-base ${text_muted}`}>{t('subtitle')}</p>
      </div>

      <section data-testid='section-done' className='flex flex-col gap-4 mb-12'>
        <h2 className='text-lg font-semibold'>{t('done')}</h2>
        <div className='columns-1 lg:columns-2 gap-6 space-y-6'>
          {done_projects.map(project => (
            <div key={project.title} className='break-inside-avoid'>
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </section>

      {in_progress_projects.length > 0 && (
        <section data-testid='section-in_progress' className={`flex flex-col gap-4 mb-12 pt-10 border-t ${border_class}`}>
          <h2 className='text-lg font-semibold'>{t('in_progress')}</h2>
          <div className='columns-1 lg:columns-2 gap-6 space-y-6'>
            {in_progress_projects.map(project => (
              <div key={project.title} className='break-inside-avoid'>
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section data-testid='section-planned' className={`flex flex-col gap-4 pt-10 border-t ${border_class}`}>
        <h2 className='text-lg font-semibold'>{t('planned')}</h2>
        <div className='columns-1 lg:columns-2 gap-6 space-y-6'>
          {planned.map(project => (
            <div key={project.title} className='break-inside-avoid'>
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
