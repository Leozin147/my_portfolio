'use client'

import { useState } from 'react'
import { use_theme } from '../../context/ThemeContext'

type Form_state = 'idle' | 'loading' | 'success' | 'error' | 'rate_limited'

export default function Contact() {
  const { theme } = use_theme()
  const [form_state, set_form_state] = useState<Form_state>('idle')

  const text_muted = theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
  const text_muted2 = theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'
  const input_class = theme === 'dark'
    ? 'bg-zinc-900 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:border-zinc-500'
    : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-zinc-400'

  async function handle_submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    set_form_state('loading')

    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value
    const date1 = (form.elements.namedItem('date1') as HTMLInputElement).value
    const date2 = (form.elements.namedItem('date2') as HTMLInputElement).value

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, message, date1, date2 }),
      })

      if (res.ok) {
        set_form_state('success')
      } else if (res.status === 429) {
        set_form_state('rate_limited')
      } else {
        set_form_state('error')
      }
    } catch {
      set_form_state('error')
    }
  }

  return (
    <div className='max-w-4xl mx-auto px-6 py-12'>
      <div className='flex flex-col gap-2 mb-10'>
        <h1 data-testid='contact-title' className='text-3xl font-bold tracking-tight'>Get in Touch</h1>
        <p className={`text-base ${text_muted}`}>Entre em contato — responderei o mais rápido possível via WhatsApp.</p>
      </div>

      <div className='flex flex-col gap-2 mb-10'>
        <p className={`text-sm font-medium ${text_muted}`}>Contato direto</p>
        <div className='flex flex-col gap-1'>
          <p className='text-sm'><span className={text_muted}>Nome: </span>Leonardo Fernandes Cardoso</p>
          <p className='text-sm'><span className={text_muted}>Email: </span><a href='mailto:leonardo.fcardoso@hotmail.com' className='hover:underline'>leonardo.fcardoso@hotmail.com</a></p>
          <p className='text-sm'><span className={text_muted}>WhatsApp: </span><a href='https://wa.me/5513974057602' target='_blank' rel='noopener noreferrer' className='hover:underline'>+55 (13) 97405-7602</a></p>
        </div>
      </div>

      {form_state === 'success' ? (
        <div data-testid='success-message' className='rounded-lg border border-green-500/30 bg-green-500/10 px-6 py-8 text-center'>
          <p className='text-green-400 font-semibold text-lg'>Message sent!</p>
          <p className={`text-sm mt-1 ${text_muted}`}>Mensagem enviada com sucesso. Em breve entrarei em contato via WhatsApp.</p>
        </div>
      ) : (
        <form onSubmit={handle_submit} className='flex flex-col gap-4 max-w-xl'>
          <div className='flex flex-col gap-1'>
            <label className={`text-sm font-medium ${text_muted}`}>Name</label>
            <input
              data-testid='input-name'
              name='name'
              type='text'
              placeholder='Your name'
              required
              className={`rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors ${input_class}`}
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label className={`text-sm font-medium ${text_muted}`}>Insira seu telefone para eu entrar em contato via WhatsApp.</label>
            <input
              data-testid='input-phone'
              name='phone'
              type='tel'
              placeholder='+55 (13) 99999-9999'
              required
              className={`rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors ${input_class}`}
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label className={`text-sm font-medium ${text_muted}`}>Message</label>
            <textarea
              data-testid='input-message'
              name='message'
              placeholder='Tell me about your project...'
              required
              rows={5}
              className={`rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors resize-none ${input_class}`}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className={`text-sm font-medium ${text_muted}`}>
              Tem disponibilidade para reunião para já alinharmos o projeto e começarmos o quanto antes?
            </label>
            <p className={`text-xs ${text_muted2}`}>
              Me dê 2 datas e horários que prefere e te confirmo via WhatsApp se possível!
            </p>
            <div className='grid grid-cols-2 gap-3'>
              <input
                data-testid='input-date1'
                name='date1'
                type='datetime-local'
                className={`rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors ${input_class}`}
              />
              <input
                data-testid='input-date2'
                name='date2'
                type='datetime-local'
                className={`rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors ${input_class}`}
              />
            </div>
          </div>

          {form_state === 'error' && (
            <p data-testid='error-message' className='text-sm text-red-400'>
              Algo deu errado. Tente novamente ou me contate diretamente.
            </p>
          )}

          {form_state === 'rate_limited' && (
            <p data-testid='rate-limited-message' className='text-sm text-yellow-400'>
              Limite de mensagens atingido. Entre em contato diretamente comigo via E-mail ou WhatsApp.
            </p>
          )}

          <button
            data-testid='submit-button'
            type='submit'
            disabled={form_state === 'loading'}
            className='self-start rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {form_state === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  )
}
