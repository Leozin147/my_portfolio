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
    visibility: 'private' as const,
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
    description: 'Sistema full-stack de gestão de atendimentos espirituais com cadastro de consulentes, registro de trabalhos (curas, ebós, edições), controle de presença e relatórios. Backend Node.js + Express + PostgreSQL, frontend React.',
    techs: ['Node.js', 'Express', 'PostgreSQL', 'React', 'TypeScript', 'Supabase'],
    status: 'done' as const,
    visibility: 'private' as const,
    image_groups: [
      {
        label: 'Sistema',
        images: [
          { src: '/images/projects/sistema_ceunsc_login.png', title: 'Login' },
          { src: '/images/projects/sistema_ceunsc_registros.png', title: 'Registros' },
          { src: '/images/projects/sistema_ceunsc_relatorio_trabalhos.png', title: 'Relatório — Trabalhos' },
          { src: '/images/projects/sistema_ceunsc_relatorio_cura.png', title: 'Relatório — Curas' },
          { src: '/images/projects/sistema_ceunsc_relatorio_ebo.png', title: 'Relatório — Ebós' },
          { src: '/images/projects/sistema_ceunsc_relatorio_edicao.png', title: 'Relatório — Edições' },
        ],
      },
    ],
  },
  {
    title: 'Recicla+',
    description: 'MVP de marketplace de impacto social construído como startup de faculdade, alinhado às ODS da ONU. A plataforma conecta usuários que desejam descartar resíduos, coletores parceiros e empresas ESG em um ecossistema de economia circular: o usuário solicita uma coleta, acompanha em tempo real, acumula eco pontos e os resgata em recompensas de marcas parceiras. Empresas criam campanhas de cupons e acompanham métricas de impacto e relatórios ESG. Atuei como desenvolvedor e CTO, sendo responsável pelo projeto inteiro, arquitetura, stack e implementação.',
    techs: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'Docker'],
    status: 'done' as const,
    visibility: 'private' as const,
    image_groups: [
      {
        label: 'Login',
        images: [
          { src: '/images/projects/recicla+_login.png', title: 'Login' },
        ],
      },
      {
        label: 'Usuário',
        images: [
          { src: '/images/projects/recicla+_usuario.png', title: 'Home' },
          { src: '/images/projects/recicla+_usuario2.png', title: 'Solicitar Coleta' },
          { src: '/images/projects/recicla+_usuario_coletas.png', title: 'Coletas' },
          { src: '/images/projects/recicla+_usuario_beneficios.png', title: 'Benefícios' },
          { src: '/images/projects/recicla+_usuario_impacto.png', title: 'Impacto' },
          { src: '/images/projects/recicla+_usuario_perfil.png', title: 'Perfil' },
        ],
      },
      {
        label: 'Coletor',
        images: [
          { src: '/images/projects/recicla+_coletor_solicitacoes.png', title: 'Solicitações' },
          { src: '/images/projects/recicla+_coletor_historico.png', title: 'Histórico' },
          { src: '/images/projects/recicla+_coletor_perfil.png', title: 'Perfil' },
        ],
      },
      {
        label: 'Empresa',
        images: [
          { src: '/images/projects/recicla+_empresa_dashboard.png', title: 'Dashboard' },
          { src: '/images/projects/recicla+_empresa_campanhas.png', title: 'Campanhas' },
          { src: '/images/projects/recicla+_empresa_esg.png', title: 'Relatório ESG' },
          { src: '/images/projects/recicla+_empresa_marca.png', title: 'Marca' },
        ],
      },
    ],
  },
  {
    title: 'Site Institucional — Centro Espírita de Umbanda',
    description: 'Landing page institucional com mapa, vídeo de apresentação, agenda, doações, documentos, projetos e marco dos 20 anos da instituição.',
    techs: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    status: 'in_progress' as const,
    visibility: 'private' as const,
  },
  {
    title: 'Portfolio Pessoal',
    description: 'Este portfolio desenvolvido com Next.js, Express e TDD com Vitest. Dark/light mode, terminal animado e integração com WhatsApp via Evolution API.',
    techs: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'Vitest', 'Evolution API'],
    status: 'done' as const,
    visibility: 'public' as const,
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
    visibility: 'private' as const,
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
