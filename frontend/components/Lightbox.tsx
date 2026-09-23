'use client'

import { useCallback, useEffect, useState } from 'react'

export interface GalleryImage {
  src: string
  title: string
  group?: string
}

interface LightboxProps {
  images: GalleryImage[]
  start_index: number
  on_close: () => void
}

const arrow_class = 'absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/80 hover:text-white sm:h-11 sm:w-11'

export default function Lightbox({ images, start_index, on_close }: LightboxProps) {
  const [index, set_index] = useState(start_index)

  const has_prev = index > 0
  const has_next = index < images.length - 1

  const go_prev = useCallback(() => set_index(i => (i > 0 ? i - 1 : i)), [])
  const go_next = useCallback(() => set_index(i => (i < images.length - 1 ? i + 1 : i)), [images.length])

  useEffect(() => {
    function handle_key(e: KeyboardEvent) {
      if (e.key === 'Escape') on_close()
      if (e.key === 'ArrowLeft') go_prev()
      if (e.key === 'ArrowRight') go_next()
    }
    document.addEventListener('keydown', handle_key)
    return () => document.removeEventListener('keydown', handle_key)
  }, [on_close, go_prev, go_next])

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [])

  const current = images[index]

  function stop(e: React.MouseEvent) {
    e.stopPropagation()
  }

  return (
    <div
      data-testid='lightbox-overlay'
      onClick={on_close}
      className='fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm animate-fade-in'
    >
      <div className='flex shrink-0 items-center justify-between px-4 py-3 sm:px-6'>
        <span data-testid='gallery-counter' className='text-xs font-medium tabular-nums text-zinc-400'>
          {index + 1} / {images.length}
        </span>
        <button
          data-testid='gallery-close'
          onClick={e => { stop(e); on_close() }}
          aria-label='Fechar galeria'
          className='flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/10 hover:text-white'
        >
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
            <path d='M18 6L6 18M6 6l12 12' />
          </svg>
        </button>
      </div>

      <div className='relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-6'>
        {has_prev && (
          <button
            data-testid='gallery-prev'
            onClick={e => { stop(e); go_prev() }}
            aria-label='Imagem anterior'
            className={`${arrow_class} left-2 sm:left-4`}
          >
            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M15 18l-6-6 6-6' />
            </svg>
          </button>
        )}

        <img
          src={current.src}
          alt={current.title}
          onClick={stop}
          className='max-h-full max-w-full rounded-lg object-contain animate-fade-in-up'
        />

        {has_next && (
          <button
            data-testid='gallery-next'
            onClick={e => { stop(e); go_next() }}
            aria-label='Próxima imagem'
            className={`${arrow_class} right-2 sm:right-4`}
          >
            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M9 18l6-6-6-6' />
            </svg>
          </button>
        )}
      </div>

      <p data-testid='gallery-title' className='shrink-0 px-4 py-4 text-center text-sm text-white'>
        {current.group && <span className='text-zinc-500'>{current.group} · </span>}
        {current.title}
      </p>
    </div>
  )
}
