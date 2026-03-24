'use client'

import Link from 'next/link'
import Terminal from './Terminal'
import { use_theme } from '../context/ThemeContext'
import { useTranslations } from 'next-intl'

export default function Hero() {
  const { theme } = use_theme()
  const t = useTranslations('hero')

  const role_class = theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
  const linkedin_class = theme === 'dark'
    ? 'text-zinc-400 hover:text-white transition-colors text-sm'
    : 'text-zinc-500 hover:text-zinc-900 transition-colors text-sm'

  return (
    <section className='flex flex-col gap-8 px-6 py-16 max-w-4xl mx-auto'>
      <div className='flex flex-col gap-1 animate-fade-in-up' style={{ animationDelay: '0ms' }}>
        <h1 className='text-4xl font-bold tracking-tight'>
          Leonardo Cardoso
        </h1>
        <p data-testid='hero-role' className={`text-lg ${role_class}`}>
          {t('role')}
        </p>
      </div>

      <div className='animate-fade-in-up' style={{ animationDelay: '100ms' }}>
        <Terminal text={t('terminal')} speed={35} />
      </div>

      <a
        data-testid='hero-linkedin'
        href='https://www.linkedin.com/in/leonardo-fernandes-cardoso-7a6a75269'
        target='_blank'
        rel='noopener noreferrer'
        className={`animate-fade-in-up ${linkedin_class}`}
        style={{ animationDelay: '200ms' }}
      >
        {t('linkedin')}
      </a>

      <Link
        data-testid='hero-cta'
        href='/services'
        className='self-start rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-green-400 hover:scale-105 animate-fade-in-up'
        style={{ animationDelay: '300ms' }}
      >
        {t('cta')}
      </Link>
    </section>
  )
}
