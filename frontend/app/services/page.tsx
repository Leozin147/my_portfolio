'use client'

import Link from 'next/link'
import { use_theme } from '../../context/ThemeContext'

const services = [
  {
    title: 'Process Automation',
    title_pt: 'Automação de Processos',
    description: 'End-to-end workflow automation eliminating manual tasks and boosting team efficiency.',
    description_pt: 'Automação ponta a ponta de fluxos de trabalho, eliminando tarefas manuais e aumentando a eficiência da equipe.',
    tools: ['N8N', 'Make', 'Zapier'],
  },
  {
    title: 'System Integrations',
    title_pt: 'Integrações de Sistemas',
    description: 'Connecting platforms and services through REST APIs and webhooks for seamless data flow.',
    description_pt: 'Conexão de plataformas e serviços via APIs REST e webhooks para fluxo de dados contínuo entre sistemas.',
    tools: ['REST APIs', 'Webhooks', 'JSON'],
  },
  {
    title: 'AI Agents & Chatbots',
    title_pt: 'Agentes de IA & Chatbots',
    description: 'Intelligent agents via WhatsApp and other channels using LLMs for real business workflows.',
    description_pt: 'Agentes inteligentes via WhatsApp e outros canais usando LLMs para fluxos de negócio reais.',
    tools: ['N8N', 'Evolution API', 'Gemini', 'OpenAI'],
  },
  {
    title: 'Dashboards & Analytics',
    title_pt: 'Dashboards & Análise de Dados',
    description: 'Data visualization and business intelligence dashboards for informed decision-making.',
    description_pt: 'Visualização de dados e dashboards de inteligência de negócios para tomadas de decisão mais precisas.',
    tools: ['Power BI', 'Looker Studio', 'Google AppScript'],
  },
  {
    title: 'Backend Development',
    title_pt: 'Desenvolvimento Backend',
    description: 'APIs and backend services with focus on reliability, clean architecture and integrations.',
    description_pt: 'APIs e serviços backend com foco em confiabilidade, arquitetura limpa e integrações.',
    tools: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL'],
  },
]

export default function Services() {
  const { theme } = use_theme()

  const text_muted = theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
  const text_muted2 = theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'
  const card_border = theme === 'dark' ? 'border-zinc-700' : 'border-zinc-200'
  const tag_class = theme === 'dark' ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-700'

  return (
    <div className='max-w-4xl mx-auto px-6 py-12'>
      <div className='flex flex-col gap-2 mb-10'>
        <h1 data-testid='services-title' className='text-3xl font-bold tracking-tight'>What I Can Build For You</h1>
        <p className={`text-base ${text_muted}`}>O que posso entregar para o seu negócio.</p>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {services.map(service => (
          <div
            key={service.title}
            data-testid='service-card'
            className={`flex flex-col gap-3 rounded-lg border ${card_border} p-5 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg`}
          >
            <div className='flex flex-col gap-0.5'>
              <h3 data-testid='service-title-en' className='font-semibold'>{service.title}</h3>
              <span className={`text-xs ${text_muted2}`}>{service.title_pt}</span>
            </div>

            <div className='flex flex-col gap-1'>
              <p className={`text-sm leading-relaxed ${text_muted}`}>{service.description}</p>
              <p data-testid='service-desc-pt' className={`text-xs leading-relaxed ${text_muted2}`}>{service.description_pt}</p>
            </div>

            <div className='flex flex-wrap gap-2'>
              {service.tools.map(tool => (
                <span key={tool} className={`rounded px-2 py-0.5 text-xs font-medium ${tag_class}`}>
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* CTA ocupa o espaço vazio do 6º slot no grid */}
        <div
          data-testid='services-cta-card'
          className='flex flex-col justify-center gap-4 rounded-lg border border-green-500/30 bg-green-500/5 p-5'
        >
          <div className='flex flex-col gap-1'>
            <p className='font-semibold text-base'>Pronto para automatizar seu negócio?</p>
            <p className={`text-sm leading-relaxed ${text_muted}`}>
              Cada processo manual que você tem hoje é tempo e dinheiro desperdiçados. Me conta o problema — eu entrego a solução.
            </p>
          </div>
          <Link
            data-testid='services-cta'
            href='/contact'
            className='self-start rounded-lg bg-green-500 px-6 py-2.5 text-sm font-semibold text-zinc-950 transition-all hover:bg-green-400 hover:scale-105'
          >
            Falar com Leonardo →
          </Link>
        </div>
      </div>
    </div>
  )
}
