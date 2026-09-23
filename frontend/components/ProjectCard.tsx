'use client'

import { useState } from 'react'
import { use_theme } from '../context/ThemeContext'
import Lightbox, { type GalleryImage } from './Lightbox'

type Status = 'done' | 'in_progress' | 'planned'
type Visibility = 'public' | 'private'

interface ProjectImage {
  src: string
  title: string
}

interface ImageGroup {
  label: string
  images: ProjectImage[]
}

export interface ProjectCardProps {
  title: string
  description: string
  techs: string[]
  status: Status
  visibility: Visibility
  github?: string
  image_groups?: ImageGroup[]
}

const status_label: Record<Status, string> = {
  done: 'Concluído',
  in_progress: 'Em Desenvolvimento',
  planned: 'Em Planejamento',
}

const status_class: Record<Status, string> = {
  done: 'bg-green-500/10 text-green-400 border border-green-500/20',
  in_progress: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  planned: 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20',
}

const visibility_label: Record<Visibility, string> = {
  public: 'Open Source',
  private: 'Privado',
}

const visibility_class: Record<Visibility, string> = {
  public: 'bg-green-500/10 text-green-400 border border-green-500/20',
  private: 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20',
}

function flatten_images(groups: ImageGroup[]): GalleryImage[] {
  return groups.flatMap(group => group.images.map(img => ({ ...img, group: group.label })))
}

export default function ProjectCard({ title, description, techs, status, visibility, github, image_groups }: ProjectCardProps) {
  const { theme } = use_theme()
  const [gallery_open, set_gallery_open] = useState(false)

  const border_class = theme === 'dark' ? 'border-zinc-700' : 'border-zinc-200'
  const desc_class = theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
  const tag_class = theme === 'dark' ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-700'
  const button_class = theme === 'dark'
    ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white'
    : 'border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'

  const images = image_groups ? flatten_images(image_groups) : []
  const cover_image = images[0]

  return (
    <>
      <div
        data-testid='project-card'
        className={`flex flex-col gap-4 overflow-hidden rounded-lg border ${border_class} transition-all duration-200 hover:shadow-lg`}
      >
        {cover_image && (
          <button
            onClick={() => set_gallery_open(true)}
            aria-label={`Ver fotos de ${title}`}
            className='group relative block w-full cursor-pointer overflow-hidden'
          >
            <img
              data-testid='project-cover'
              src={cover_image.src}
              alt={cover_image.title}
              className='max-h-56 w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]'
            />
          </button>
        )}

        <div className='flex flex-col gap-4 px-5 pb-5'>
          <div className='flex items-start justify-between gap-2'>
            <h3 className='font-semibold text-lg'>{title}</h3>
            <div className='flex shrink-0 flex-col items-end gap-1.5'>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${status_class[status]}`}>
                {status_label[status]}
              </span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${visibility_class[visibility]}`}>
                {visibility_label[visibility]}
              </span>
            </div>
          </div>

          <p data-testid='project-description' className={`text-sm leading-relaxed ${desc_class}`}>
            {description}
          </p>

          <div className='flex flex-wrap gap-2'>
            {techs.map(tech => (
              <span key={tech} className={`rounded px-2 py-0.5 text-xs font-medium ${tag_class}`}>
                {tech}
              </span>
            ))}
          </div>

          <div className='flex flex-wrap items-center gap-4'>
            {images.length > 0 && (
              <button
                data-testid='project-gallery-button'
                onClick={() => set_gallery_open(true)}
                className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${button_class}`}
              >
                <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                  <rect x='3' y='3' width='18' height='18' rx='2' />
                  <circle cx='8.5' cy='8.5' r='1.5' />
                  <path d='M21 15l-5-5L5 21' />
                </svg>
                Ver fotos ({images.length})
              </button>
            )}

            {visibility === 'public' && github && (
              <a
                href={github}
                target='_blank'
                rel='noopener noreferrer'
                className='text-xs text-zinc-400 underline underline-offset-2 transition-colors hover:text-zinc-200'
              >
                Ver repositório →
              </a>
            )}
          </div>
        </div>
      </div>

      {gallery_open && (
        <Lightbox
          images={images}
          start_index={0}
          on_close={() => set_gallery_open(false)}
        />
      )}
    </>
  )
}
