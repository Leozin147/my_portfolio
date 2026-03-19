'use client'

import { use_theme } from '../context/ThemeContext'

interface SkillCardProps {
  name: string
  level: number
}

const MAX_LEVEL = 5

export default function SkillCard({ name, level }: SkillCardProps) {
  const { theme } = use_theme()

  const border_class = theme === 'dark' ? 'border-zinc-700' : 'border-zinc-200'
  const empty_dot_class = theme === 'dark' ? 'bg-zinc-600' : 'bg-zinc-300'

  return (
    <div data-testid='skill-card' className={`flex items-center justify-between rounded-lg border ${border_class} px-4 py-3 transition-transform duration-200 hover:scale-[1.02]`}>
      <span className='text-sm font-medium'>{name}</span>
      <div className='flex gap-1'>
        {Array.from({ length: MAX_LEVEL }, (_, i) =>
          i < level ? (
            <span key={i} data-testid='skill-dot-filled' className='w-2.5 h-2.5 rounded-full bg-green-400' />
          ) : (
            <span key={i} data-testid='skill-dot-empty' className={`w-2.5 h-2.5 rounded-full ${empty_dot_class}`} />
          )
        )}
      </div>
    </div>
  )
}
