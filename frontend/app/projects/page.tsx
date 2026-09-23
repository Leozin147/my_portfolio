'use client'

import ProjectCard, { type ProjectCardProps } from '../../components/ProjectCard'
import { use_theme } from '../../context/ThemeContext'
import { useTranslations } from 'next-intl'

const projects = [
  {
    title: 'Chatbot de Cobrança Inteligente',
    description: 'Agente de IA no WhatsApp que assume a régua de cobrança: aborda o cliente inadimplente, negocia, registra promessa de pagamento e devolve o caso para o financeiro quando precisa de decisão humana. O cliente responde por texto, áudio ou foto do comprovante, e o áudio passa por transcrição no Whisper e a imagem pela Vision antes de entrar no mesmo fluxo. O agente consulta as faturas no banco antes de falar valor, guarda o contexto da conversa no Redis para não repetir pergunta, e tem ferramentas separadas para registrar pagamento, gerar nota, agendar retorno e escalar para atendente. São três fluxos no mesmo board: abordagem, follow-up de quem não respondeu e tratamento da resposta.',
    techs: ['N8N', 'Evolution API', 'Gemini Flash 2.5', 'OpenAI Whisper', 'OpenAI Vision', 'Redis', 'Supabase', 'JavaScript'],
    status: 'done' as const,
    visibility: 'private' as const,
    image_groups: [
      {
        label: 'N8N · Fluxos',
        images: [
          { src: '/images/projects/chatbot1.jpeg', title: 'Fluxo de cobrança' },
          { src: '/images/projects/chatbot2.jpeg', title: 'Fluxo de cobrança (detalhe)' },
          { src: '/images/projects/chatbot_followup.jpeg', title: 'Fluxo de follow-up' },
        ],
      },
      {
        label: 'Documentação',
        images: [
          { src: '/images/projects/chat_readme.png', title: 'README do fluxo de cobrança' },
          { src: '/images/projects/chatbot_followup_readme.jpeg', title: 'README do follow-up' },
        ],
      },
    ],
  },
  {
    title: 'Sistema de Gestão Interna - CEUNSC',
    description: 'Sistema de gestão interna do CEUNSC, usado no dia a dia do atendimento. Abre a ficha do consulente, registra os trabalhos receitados na consulta e acompanha cada um até a conclusão. Tem quadro de consultas por médium, controle de pagamento, registro das sessões de cura, relatórios com filtro por período e por consulente, exportação em planilha e envio automático das orientações pelo WhatsApp depois da consulta. Backend em Node com TypeScript, Drizzle sobre PostgreSQL e validação com Zod em toda rota que recebe dado, coberto por testes no Vitest e rodando em Docker.',
    techs: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Zod', 'JavaScript', 'Evolution API', 'Vitest', 'Docker'],
    status: 'done' as const,
    visibility: 'private' as const,
    image_groups: [
      {
        label: 'Relatórios',
        images: [
          { src: '/images/projects/sistema_ceunsc_relatorio_trabalhos.png', title: 'Relatório de trabalhos' },
          { src: '/images/projects/sistema_ceunsc_relatorio_cura.png', title: 'Relatório de curas' },
          { src: '/images/projects/sistema_ceunsc_relatorio_ebo.png', title: 'Relatório de ebós' },
        ],
      },
      {
        label: 'Atendimento',
        images: [
          { src: '/images/projects/sistema_ceunsc_registros.png', title: 'Registro de trabalhos' },
          { src: '/images/projects/sistema_ceunsc_relatorio_edicao.png', title: 'Edição de registros' },
        ],
      },
      {
        label: 'Acesso',
        images: [
          { src: '/images/projects/sistema_ceunsc_login.png', title: 'Login' },
        ],
      },
    ],
  },
  {
    title: 'Sistema da Festa das Crianças - CEUNSC',
    description: 'Sistema que organiza o apadrinhamento da festa anual do CEUNSC, do cadastro da família até a entrega da sacolinha. Cadastra a responsável com censo social, faz a revisão anual sem duplicar registro, vincula padrinho a criança e marca a sacolinha como entregue. As artes da festa saem direto do banco: ficha do padrinho com idade, roupa, sapato e brinquedo pedido, mais as etiquetas para impressão. O painel mostra quantas crianças ainda estão sem padrinho e quantas sacolinhas faltam entregar, com controle de vagas da Batalha de Rima, relatórios em planilha, manutenção de dados e nível de acesso por usuário. Coberto por testes automatizados.',
    techs: ['Node.js', 'Express', 'PostgreSQL', 'React', 'Vite', 'Evolution API', 'Docker'],
    status: 'done' as const,
    visibility: 'private' as const,
    image_groups: [
      {
        label: 'Festa',
        images: [
          { src: '/images/projects/festacriancas_vinculos_padrinhos.png', title: 'Padrinhos e sacolinhas' },
          { src: '/images/projects/festacriancas_artes.png', title: 'Artes da festa' },
          { src: '/images/projects/festacriancas_atividade_batalha_rima.png', title: 'Batalha de Rima' },
        ],
      },
      {
        label: 'Cadastro',
        images: [
          { src: '/images/projects/festacriancas_buscar_responsavel.png', title: 'Buscar responsável' },
          { src: '/images/projects/festacriancas_buscar_responsavel_retorno.png', title: 'Resultado da busca' },
          { src: '/images/projects/festacriancas_registro_responsavel.png', title: 'Cadastro da responsável' },
          { src: '/images/projects/festacriancas_registro_crianca.png', title: 'Cadastro da criança' },
        ],
      },
      {
        label: 'Administração',
        images: [
          { src: '/images/projects/festacriancas_relatorios.png', title: 'Relatórios' },
          { src: '/images/projects/festacriancas_configs.png', title: 'Configurações' },
          { src: '/images/projects/festacriancas_manutencao_dados.png', title: 'Manutenção de dados' },
          { src: '/images/projects/festacriancas_usuarios.png', title: 'Usuários e permissões' },
        ],
      },
      {
        label: 'Acesso',
        images: [
          { src: '/images/projects/festacriancas_login.png', title: 'Login' },
        ],
      },
    ],
  },
  {
    title: 'Recicla+',
    description: 'MVP de marketplace de reciclagem criado como startup de faculdade, alinhado às ODS da ONU. Junta três perfis no mesmo produto: o usuário solicita a coleta do resíduo e acompanha o status, o coletor parceiro aceita a solicitação e fecha o histórico, e a empresa ESG patrocina o ciclo. Cada coleta concluída vira eco ponto, que o usuário troca por cupom de marca parceira. A empresa cria a campanha de cupom e vê no painel quantos foram emitidos, quantos clientes novos entraram, o ROI estimado e o impacto em tonelada de resíduo desviado, com relatório ESG para prestação de contas. Fui o único desenvolvedor: escolhi a stack, desenhei a arquitetura dos três perfis e implementei o MVP como CTO.',
    techs: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'Docker'],
    status: 'done' as const,
    visibility: 'private' as const,
    image_groups: [
      {
        label: 'Empresa',
        images: [
          { src: '/images/projects/recicla+_empresa_dashboard.png', title: 'Painel de impacto' },
          { src: '/images/projects/recicla+_empresa_campanhas.png', title: 'Campanhas de cupom' },
          { src: '/images/projects/recicla+_empresa_esg.png', title: 'Relatório ESG' },
          { src: '/images/projects/recicla+_empresa_marca.png', title: 'Marca' },
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
        label: 'Acesso',
        images: [
          { src: '/images/projects/recicla+_login.png', title: 'Login' },
        ],
      },
    ],
  },
  {
    title: 'Site Institucional - CEUNSC',
    description: 'Site institucional do CEUNSC, feito para quem chega pelo Google e precisa saber onde é, quando abre e como ajudar. Tem mapa de localização, vídeo de apresentação, agenda das atividades, área de doação, os documentos abertos da instituição, os projetos sociais e a linha do tempo dos 20 anos.',
    techs: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    status: 'in_progress' as const,
    visibility: 'private' as const,
  },
  {
    title: 'Portfolio Pessoal',
    description: 'Este portfolio. Front em Next.js com TypeScript e Tailwind, backend em Express que recebe o formulário de contato e me avisa no WhatsApp pela Evolution API. Tem tema claro e escuro, troca de idioma entre português e inglês, terminal animado na home e rate limit na rota de contato para não virar caixa de spam. Escrito com TDD no Vitest.',
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

const planned_projects: ProjectCardProps[] = []

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

      {done_projects.length > 0 && (
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
      )}

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

      {planned.length > 0 && (
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
      )}
    </div>
  )
}
