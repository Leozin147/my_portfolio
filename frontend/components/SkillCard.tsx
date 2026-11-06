'use client'

import { use_theme } from '../context/ThemeContext'

interface SkillCardProps {
  name: string
}

export default function SkillCard({ name }: SkillCardProps) {
  const { theme } = use_theme()

  const border_class = theme === 'dark' ? 'border-zinc-700' : 'border-zinc-200'

  return (
    <div data-testid='skill-card' className={`flex items-center rounded-lg border ${border_class} px-4 py-3 transition-transform duration-200 hover:scale-[1.02]`}>
      <span className='text-sm font-medium'>{name}</span>
    </div>
  )
}
