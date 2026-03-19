'use client'

import Hero from '../components/Hero'
import SkillCard from '../components/SkillCard'
import { use_theme } from '../context/ThemeContext'

const backend_skills = [
  { name: 'Node.js / Express', level: 4 },
  { name: 'TypeScript', level: 3 },
  { name: 'JavaScript', level: 4 },
  { name: 'REST APIs', level: 5 },
  { name: 'PostgreSQL', level: 4 },
  { name: 'Docker', level: 2 },
  { name: 'Postman', level: 4 },
]

const frontend_skills = [
  { name: 'Next.js / React', level: 3 },
  { name: 'TypeScript', level: 3 },
  { name: 'Tailwind CSS', level: 4 },
]

const tools_skills = [
  { name: 'N8N', level: 5 },
  { name: 'Make (Integromat)', level: 5 },
  { name: 'Google AppScript', level: 5 },
  { name: 'Power BI', level: 4 },
  { name: 'Looker Studio', level: 5 },
  { name: 'Webhooks / JSON', level: 5 },
  { name: 'Git', level: 4 },
]

export default function Home() {
  const { theme } = use_theme()

  const border_class = theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'
  const text_muted = theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
  const text_muted2 = theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'
  const group_title_class = theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'

  return (
    <div className='max-w-4xl mx-auto'>
      <Hero />

      <section className={`flex flex-col gap-8 px-6 py-12 border-t ${border_class}`}>
        <h2 className='text-xl font-semibold'>Technical Toolkit</h2>

        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-3'>
            <h3 className={`text-sm font-bold uppercase tracking-widest ${group_title_class}`}>Backend</h3>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
              {backend_skills.map(skill => (
                <SkillCard key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-3'>
            <h3 className={`text-sm font-bold uppercase tracking-widest ${group_title_class}`}>Frontend</h3>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
              {frontend_skills.map(skill => (
                <SkillCard key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-3'>
            <h3 className={`text-sm font-bold uppercase tracking-widest ${group_title_class}`}>Tools</h3>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
              {tools_skills.map(skill => (
                <SkillCard key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`flex flex-col gap-4 px-6 py-12 border-t ${border_class}`}>
        <h2 className='text-xl font-semibold'>Background</h2>
        <p className={`leading-relaxed ${text_muted}`}>
          I&apos;m a Pleno Low-Code Developer and Junior Backend Developer, passionate about process automation, intelligent integrations and AI.
          Currently working, building automated workflows with N8N and REST APIs,
          creating dashboards in Power BI and Looker Studio, and collaborating with teams to map and implement automations.
          I&apos;m also developing my Backend skills with Node.js, Express and TypeScript, with a focus on delivering real, scalable value.
        </p>
        <p className={`text-sm leading-relaxed ${text_muted2}`}>
          Desenvolvedor Low-Code Pleno apaixonado por automação de processos, integrações inteligentes e IA.
          Atualmente na Contele Soluções Tecnológicas, criando fluxos automatizados com N8N e APIs REST,
          dashboards em Power BI e Looker Studio, e evoluindo no Backend com Node.js, Express e TypeScript.
        </p>
      </section>
    </div>
  )
}
