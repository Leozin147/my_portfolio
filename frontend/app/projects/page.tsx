'use client'

import ProjectCard from '../../components/ProjectCard'
import { use_theme } from '../../context/ThemeContext'

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
          { src: '/images/projects/chatbot_readme.jpeg', title: 'README' },
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
    title: 'Portfolio Pessoal',
    description: 'Este portfolio — desenvolvido com Next.js, Express e TDD com Vitest. Dark/light mode, terminal animado e integração com WhatsApp via Evolution API.',
    techs: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'Vitest', 'Evolution API'],
    status: 'in_progress' as const,
  },
]

const planned_projects = [
  {
    title: 'Site Institucional — Centro Espírita de Umbanda',
    description: 'Landing page institucional com mapa, vídeo de apresentação, agenda, doações, documentos, projetos e marco dos 20 anos da instituição.',
    techs: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    status: 'planned' as const,
  },
  {
    title: 'Sistema de Aulas com Hierarquia de Acesso',
    description: 'Plataforma interna para armazenamento e acesso a aulas com controle por nível hierárquico.',
    techs: ['Node.js', 'Next.js', 'TypeScript', 'Supabase'],
    status: 'planned' as const,
  },
]

export default function Projects() {
  const { theme } = use_theme()

  const border_class = theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'
  const text_muted = theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'

  return (
    <div className='max-w-7xl mx-auto px-6 py-12'>
      <div className='flex flex-col gap-2 mb-10'>
        <h1 className='text-3xl font-bold tracking-tight'>Projetos</h1>
        <p className={`text-base ${text_muted}`}>Projetos reais desenvolvidos e em andamento.</p>
      </div>

      <section className='flex flex-col gap-4 mb-12'>
        <h2 className='text-lg font-semibold'>Concluídos & Em Desenvolvimento</h2>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {projects.map(project => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>

      <section className={`flex flex-col gap-4 pt-10 border-t ${border_class}`}>
        <h2 className='text-lg font-semibold'>Em Planejamento</h2>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {planned_projects.map(project => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>
    </div>
  )
}
