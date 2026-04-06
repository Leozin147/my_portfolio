'use client'

import { useState } from 'react'
import { use_theme } from '../context/ThemeContext'
import Lightbox from './Lightbox'

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

interface ProjectCardProps {
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

export default function ProjectCard({ title, description, techs, status, visibility, github, image_groups }: ProjectCardProps) {
  const { theme } = use_theme()
  const [lightbox, set_lightbox] = useState<ProjectImage | null>(null)

  const border_class = theme === 'dark' ? 'border-zinc-700' : 'border-zinc-200'
  const desc_class = theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
  const tag_class = theme === 'dark' ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-700'
  const group_label_class = theme === 'dark' ? 'text-zinc-300 border-zinc-700' : 'text-zinc-600 border-zinc-200'
  const img_title_class = theme === 'dark' ? 'text-zinc-400 bg-zinc-900' : 'text-zinc-500 bg-zinc-50'
  const has_images = image_groups && image_groups.length > 0

  return (
    <>
      <div
        data-testid='project-card'
        className={`flex flex-col gap-5 rounded-lg border ${border_class} p-5 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg`}
      >
        {/* Info */}
        <div className='flex flex-col gap-4'>
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

          {visibility === 'public' && github && (
            <a
              href={github}
              target='_blank'
              rel='noopener noreferrer'
              className='self-start text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-200 transition-colors'
            >
              Ver repositório →
            </a>
          )}
        </div>

        {/* Imagens */}
        {has_images && (
          <div data-testid='project-images-section' className='flex flex-col gap-5'>
            {image_groups!.map(group => (
              <div key={group.label} className='flex flex-col gap-3'>
                <span className={`text-xs font-bold uppercase tracking-widest pb-1 border-b ${group_label_class}`}>
                  {group.label}
                </span>
                <div className='grid grid-cols-2 gap-3'>
                  {group.images.map((img) => (
                    <div key={img.src} className='flex flex-col gap-1'>
                      <span className={`text-xs font-medium truncate ${img_title_class} px-1.5 py-0.5 rounded`}>
                        {img.title}
                      </span>
                      <img
                        src={img.src}
                        alt={img.title}
                        onClick={() => set_lightbox(img)}
                        className={`w-full rounded-md border ${border_class} cursor-pointer hover:opacity-80 transition-opacity object-contain${img.title.toLowerCase().includes('readme') ? ' max-h-32 object-top' : ''}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.title}
          on_close={() => set_lightbox(null)}
        />
      )}
    </>
  )
}
