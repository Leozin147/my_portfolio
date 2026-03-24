'use client'

import { useState } from 'react'
import { use_theme } from '../../context/ThemeContext'
import { useTranslations } from 'next-intl'

type Form_state = 'idle' | 'loading' | 'success' | 'error' | 'rate_limited'

const MAX_MESSAGE = 300

function format_phone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits.length ? `(${digits}` : ''
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export default function Contact() {
  const { theme } = use_theme()
  const t = useTranslations('contact')
  const [form_state, set_form_state] = useState<Form_state>('idle')
  const [phone_value, set_phone_value] = useState('')
  const [message_value, set_message_value] = useState('')

  const text_muted = theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
  const text_muted2 = theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'
  const input_class = theme === 'dark'
    ? 'bg-zinc-900 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:border-zinc-500'
    : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-zinc-400'

  async function handle_submit(e: React.SyntheticEvent<HTMLFormElement>) {
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
        <h1 data-testid='contact-title' className='text-3xl font-bold tracking-tight'>{t('title')}</h1>
        <p className={`text-base ${text_muted}`}>{t('subtitle')}</p>
      </div>

      <div className='flex flex-col gap-2 mb-10'>
        <p className={`text-sm font-medium ${text_muted}`}>{t('direct_label')}</p>
        <div className='flex flex-col gap-1'>
          <p className='text-sm'><span className={text_muted}>{t('direct_name')}: </span>Leonardo Fernandes Cardoso</p>
          <p className='text-sm'><span className={text_muted}>{t('direct_email')}: </span><a href='mailto:leonardo.fcardoso@hotmail.com' className='hover:underline'>leonardo.fcardoso@hotmail.com</a></p>
          <p className='text-sm'><span className={text_muted}>{t('direct_whatsapp')}: </span><a href='https://wa.me/5513974057602' target='_blank' rel='noopener noreferrer' className='hover:underline'>+55 (13) 97405-7602</a></p>
        </div>
      </div>

      {form_state === 'success' ? (
        <div data-testid='success-message' className='rounded-lg border border-green-500/30 bg-green-500/10 px-6 py-8 text-center'>
          <p className='text-green-400 font-semibold text-lg'>{t('success_title')}</p>
          <p className={`text-sm mt-1 ${text_muted}`}>{t('success_desc')}</p>
        </div>
      ) : (
        <form onSubmit={handle_submit} className='flex flex-col gap-4 max-w-xl'>
          <div className='flex flex-col gap-1'>
            <label className={`text-sm font-medium ${text_muted}`}>{t('name_label')}</label>
            <input
              data-testid='input-name'
              name='name'
              type='text'
              placeholder={t('name_placeholder')}
              maxLength={100}
              required
              className={`rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors ${input_class}`}
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label className={`text-sm font-medium ${text_muted}`}>{t('phone_label')}</label>
            <input
              data-testid='input-phone'
              name='phone'
              type='tel'
              placeholder='(13) 99999-9999'
              value={phone_value}
              onChange={e => set_phone_value(format_phone(e.target.value))}
              required
              suppressHydrationWarning
              className={`rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors ${input_class}`}
            />
          </div>

          <div className='flex flex-col gap-1'>
            <div className='flex justify-between'>
              <label className={`text-sm font-medium ${text_muted}`}>{t('message_label')}</label>
              <span data-testid='message-counter' className={`text-xs ${text_muted}`}>{message_value.length}/{MAX_MESSAGE}</span>
            </div>
            <textarea
              data-testid='input-message'
              name='message'
              placeholder={t('message_placeholder')}
              maxLength={MAX_MESSAGE}
              value={message_value}
              onChange={e => set_message_value(e.target.value)}
              required
              rows={5}
              suppressHydrationWarning
              className={`rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors resize-none ${input_class}`}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className={`text-sm font-medium ${text_muted}`}>{t('date_label')}</label>
            <p className={`text-xs ${text_muted2}`}>{t('date_hint')}</p>
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
            <p data-testid='error-message' className='text-sm text-red-400'>{t('error')}</p>
          )}

          {form_state === 'rate_limited' && (
            <p data-testid='rate-limited-message' className='text-sm text-yellow-400'>{t('rate_limited')}</p>
          )}

          <button
            data-testid='submit-button'
            type='submit'
            disabled={form_state === 'loading'}
            className='self-start rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {form_state === 'loading' ? t('sending') : t('submit')}
          </button>
        </form>
      )}
    </div>
  )
}
