'use client'

import { useEffect, useState } from 'react'
import { use_theme } from '../context/ThemeContext'

interface TerminalProps {
  text: string
  speed?: number
}

export default function Terminal({ text, speed = 60 }: TerminalProps) {
  const [displayed, set_displayed] = useState('')
  const { theme } = use_theme()

  const bg_class = theme === 'dark' ? 'bg-zinc-900' : 'bg-zinc-100'
  const border_class = theme === 'dark' ? 'border-zinc-700' : 'border-zinc-300'
  const text_class = theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'

  useEffect(() => {
    set_displayed('')
    let index = 0
    const interval = setInterval(() => {
      if (index < text.length) {
        set_displayed(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <div data-testid='terminal-wrapper' className={`font-mono text-sm rounded-lg ${bg_class} border ${border_class} p-4`}>
      <div className='flex gap-2 mb-3'>
        <span className='w-3 h-3 rounded-full bg-red-500' />
        <span className='w-3 h-3 rounded-full bg-yellow-500' />
        <span className='w-3 h-3 rounded-full bg-green-500' />
      </div>
      <p>
        <span className='text-green-400'>leo@portfolio</span>
        <span className='text-zinc-400'>:~$ </span>
        <span data-testid='terminal-text' className={text_class}>{displayed}</span>
        <span
          data-testid='terminal-cursor'
          className='inline-block w-2 h-4 bg-zinc-300 ml-0.5 animate-pulse align-middle'
        />
      </p>
    </div>
  )
}
