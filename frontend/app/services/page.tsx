'use client'

import Link from 'next/link'
import { use_theme } from '../../context/ThemeContext'
import { useTranslations } from 'next-intl'

const services = [
  { key: 'service_1', tools: ['N8N', 'Make', 'Zapier'] },
  { key: 'service_2', tools: ['REST APIs', 'Webhooks', 'JSON'] },
  { key: 'service_3', tools: ['N8N', 'Evolution API', 'Gemini', 'OpenAI'] },
  { key: 'service_4', tools: ['Power BI', 'Looker Studio', 'Google AppScript'] },
  { key: 'service_5', tools: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL'] },
]

export default function Services() {
  const { theme } = use_theme()
  const t = useTranslations('services')

  const text_muted = theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
  const card_border = theme === 'dark' ? 'border-zinc-700' : 'border-zinc-200'
  const tag_class = theme === 'dark' ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-700'

  return (
    <div className='max-w-4xl mx-auto px-6 py-12'>
      <div className='flex flex-col gap-2 mb-10'>
        <h1 data-testid='services-title' className='text-3xl font-bold tracking-tight'>{t('title')}</h1>
        <p className={`text-base ${text_muted}`}>{t('subtitle')}</p>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {services.map(service => (
          <div
            key={service.key}
            data-testid='service-card'
            className={`flex flex-col gap-3 rounded-lg border ${card_border} p-5 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg`}
          >
            <h3 data-testid='service-title' className='font-semibold'>{t(`${service.key}_title`)}</h3>
            <p data-testid='service-desc' className={`text-sm leading-relaxed ${text_muted}`}>{t(`${service.key}_desc`)}</p>

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
            <p className='font-semibold text-base'>{t('cta_title')}</p>
            <p className={`text-sm leading-relaxed ${text_muted}`}>{t('cta_desc')}</p>
          </div>
          <Link
            data-testid='services-cta'
            href='/contact'
            className='self-start rounded-lg bg-green-500 px-6 py-2.5 text-sm font-semibold text-zinc-950 transition-all hover:bg-green-400 hover:scale-105'
          >
            {t('cta_button')}
          </Link>
        </div>
      </div>
    </div>
  )
}
