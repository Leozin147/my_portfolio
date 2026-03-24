'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { NextIntlClientProvider } from 'next-intl'

type Locale = 'pt' | 'en'

interface LocaleContextType {
  locale: Locale
  set_locale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextType | null>(null)

export function use_locale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('use_locale must be used within LocaleProvider')
  return ctx
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, set_locale_state] = useState<Locale>('pt')
  const [messages, set_messages] = useState<Record<string, unknown> | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale | null
    if (saved === 'pt' || saved === 'en') {
      set_locale_state(saved)
    }
  }, [])

  useEffect(() => {
    import(`../messages/${locale}.json`).then(mod => set_messages(mod.default))
  }, [locale])

  function set_locale(next: Locale) {
    set_locale_state(next)
    localStorage.setItem('locale', next)
  }

  if (!messages) return null

  return (
    <LocaleContext.Provider value={{ locale, set_locale }}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  )
}
