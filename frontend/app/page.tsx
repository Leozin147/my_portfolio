'use client'

import Hero from '../components/Hero'
import SkillCard from '../components/SkillCard'
import { use_theme } from '../context/ThemeContext'
import { useTranslations } from 'next-intl'

const backend_skills = [
  'Node.js / Express',
  'TypeScript',
  'JavaScript',
  'REST APIs',
  'PostgreSQL',
  'PostGIS',
  'Drizzle ORM',
  'Zod',
  'Docker',
  'Postman',
  'Python',
]

const frontend_skills = [
  'Next.js / React',
  'TypeScript',
  'Tailwind CSS',
]

const tools_skills = [
  'N8N',
  'Make (Integromat)',
  'Google AppScript',
  'Power BI',
  'Looker Studio',
  'Webhooks / JSON',
  'Git',
  'GitHub Actions',
  'GCP',
  'Cloudflare',
  'Supabase',
  'pgBackRest',
  'Redis',
  'Evolution API',
  'OpenAI API',
  'Claude Code',
  'Vitest',
  'Notion',
  'VPS (Linux)',
]

export default function Home() {
  const { theme } = use_theme()
  const t = useTranslations('home')

  const border_class = theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'
  const text_muted = theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
  const group_title_class = theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'

  return (
    <div className='max-w-4xl mx-auto'>
      <Hero />

      <section data-testid='section-background' className={`flex flex-col gap-4 px-6 py-12 border-t ${border_class}`}>
        <h2 className='text-xl font-semibold'>{t('background_title')}</h2>
        <p data-testid='background-text' className={`leading-relaxed ${text_muted}`}>{t('background')}</p>
      </section>

      <section data-testid='section-toolkit' className={`flex flex-col gap-8 px-6 py-12 border-t ${border_class}`}>
        <h2 className='text-xl font-semibold'>{t('toolkit_title')}</h2>

        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-3'>
            <h3 className={`text-sm font-bold uppercase tracking-widest ${group_title_class}`}>Backend</h3>
            <div data-testid='skills-backend' className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
              {backend_skills.map(skill => (
                <SkillCard key={skill} name={skill} />
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-3'>
            <h3 className={`text-sm font-bold uppercase tracking-widest ${group_title_class}`}>Frontend</h3>
            <div data-testid='skills-frontend' className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
              {frontend_skills.map(skill => (
                <SkillCard key={skill} name={skill} />
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-3'>
            <h3 className={`text-sm font-bold uppercase tracking-widest ${group_title_class}`}>Tools</h3>
            <div data-testid='skills-tools' className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
              {tools_skills.map(skill => (
                <SkillCard key={skill} name={skill} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
