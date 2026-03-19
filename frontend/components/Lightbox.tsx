'use client'

import { useEffect } from 'react'

interface LightboxProps {
  src: string
  alt: string
  on_close: () => void
}

export default function Lightbox({ src, alt, on_close }: LightboxProps) {
  useEffect(() => {
    function handle_key(e: KeyboardEvent) {
      if (e.key === 'Escape') on_close()
    }
    document.addEventListener('keydown', handle_key)
    return () => document.removeEventListener('keydown', handle_key)
  }, [on_close])

  return (
    <div
      data-testid='lightbox-overlay'
      onClick={on_close}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-fade-in'
    >
      <div
        onClick={e => e.stopPropagation()}
        className='relative max-w-5xl w-full animate-fade-in-up'
      >
        <button
          onClick={on_close}
          aria-label='Fechar'
          className='absolute -top-10 right-0 text-white text-sm hover:text-zinc-300 transition-colors'
        >
          Fechar ✕
        </button>
        <img
          src={src}
          alt={alt}
          className='w-full h-auto rounded-lg object-contain max-h-[85vh]'
        />
      </div>
    </div>
  )
}
