'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import { use_theme } from '../context/ThemeContext'
import { use_locale } from '../context/LocaleContext'
import { useTranslations } from 'next-intl'

export default function Navbar() {
  const pathname = usePathname()
  const { theme } = use_theme()
  const { locale, set_locale } = use_locale()
  const t = useTranslations('nav')
  const [menu_open, set_menu_open] = useState(false)
  const [lang_open, set_lang_open] = useState(false)

  const nav_links = [
    { href: '/', label: t('home') },
    { href: '/projects', label: t('projects') },
    { href: '/services', label: t('services') },
    { href: '/contact', label: t('contact') },
  ]

  const active_class = theme === 'dark' ? 'text-zinc-50 font-semibold' : 'text-zinc-900 font-semibold'
  const inactive_class = theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'
  const border_class = theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'
  const icon_class = `rounded-md p-2 transition-colors ${theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'}`
  const mobile_bg = theme === 'dark' ? 'bg-zinc-950' : 'bg-white'

  return (
    <nav className={`border-b ${border_class}`}>
      <div className='flex items-center justify-between px-6 py-4'>
        {/* Desktop links */}
        <ul className='hidden sm:flex gap-6'>
          {nav_links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
                className={`text-sm transition-colors ${pathname === href ? active_class : inactive_class}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile: hamburger left */}
        <button
          data-testid='navbar-hamburger'
          aria-label='Abrir menu'
          onClick={() => set_menu_open(prev => !prev)}
          className={`sm:hidden rounded-md p-2 transition-colors ${icon_class}`}
        >
          {menu_open ? (
            <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <line x1='18' y1='6' x2='6' y2='18' /><line x1='6' y1='6' x2='18' y2='18' />
            </svg>
          ) : (
            <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <line x1='3' y1='6' x2='21' y2='6' /><line x1='3' y1='12' x2='21' y2='12' /><line x1='3' y1='18' x2='21' y2='18' />
            </svg>
          )}
        </button>

        <div className='flex items-center gap-2'>
          <a
            href='https://www.linkedin.com/in/leonardo-fernandes-cardoso-7a6a75269'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='LinkedIn'
            className={icon_class}
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
              <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
            </svg>
          </a>
          <a
            href='https://github.com/Leozin147'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='GitHub'
            className={icon_class}
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
              <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' />
            </svg>
          </a>
          <div className='relative'>
            <button
              data-testid='language-switcher'
              onClick={() => set_lang_open(prev => !prev)}
              aria-label='Trocar idioma'
              className={`flex items-center gap-1.5 ${icon_class}`}
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                <circle cx='12' cy='12' r='10' />
                <line x1='2' y1='12' x2='22' y2='12' />
                <path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
              </svg>
              <span className='text-xs font-semibold'>{locale === 'pt' ? 'PT-BR' : 'EN'}</span>
            </button>
            {lang_open && (
              <div className={`absolute right-0 top-full mt-1 rounded-md border ${border_class} ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'} shadow-lg z-50 min-w-max`}>
                <button
                  data-testid='lang-option-pt'
                  onClick={() => { set_locale('pt'); set_lang_open(false) }}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors ${locale === 'pt' ? (theme === 'dark' ? 'text-zinc-50' : 'text-zinc-900') : (theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900')}`}
                >
                  PT-BR
                </button>
                <button
                  data-testid='lang-option-en'
                  onClick={() => { set_locale('en'); set_lang_open(false) }}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors ${locale === 'en' ? (theme === 'dark' ? 'text-zinc-50' : 'text-zinc-900') : (theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900')}`}
                >
                  EN
                </button>
              </div>
            )}
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menu_open && (
        <div className={`sm:hidden border-t ${border_class} ${mobile_bg} animate-fade-in`}>
          <ul className='flex flex-col px-6 py-4 gap-4'>
            {nav_links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={pathname === href ? 'page' : undefined}
                  onClick={() => set_menu_open(false)}
                  className={`text-sm transition-colors ${pathname === href ? active_class : inactive_class}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
