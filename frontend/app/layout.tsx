import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../context/ThemeContext'
import { LocaleProvider } from '../context/LocaleContext'
import Navbar from '../components/Navbar'
import { PERSON_SCHEMA, SITE_URL, serialize_json_ld } from '../lib/site'

const geist_sans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geist_mono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💼</text></svg>' },
  title: {
    default: 'Leonardo Cardoso | Dev Portfolio',
    template: '%s | Leonardo Cardoso',
  },
  description: 'Full-stack developer working with automation, integrations and AI.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Leonardo Cardoso Portfolio',
    title: 'Leonardo Cardoso | Dev Portfolio',
    description: 'Full-stack developer working with automation, integrations and AI.',
  },
  twitter: {
    card: 'summary',
    title: 'Leonardo Cardoso | Dev Portfolio',
    description: 'Full-stack developer working with automation, integrations and AI.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-BR' suppressHydrationWarning>
      <body className={`${geist_sans.variable} ${geist_mono.variable} antialiased bg-zinc-950 text-zinc-50`}>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: serialize_json_ld(PERSON_SCHEMA) }}
        />
        <ThemeProvider>
          <LocaleProvider>
            <Navbar />
            {children}
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
