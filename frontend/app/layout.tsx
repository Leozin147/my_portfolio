import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../context/ThemeContext'
import Navbar from '../components/Navbar'

const geist_sans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geist_mono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Leonardo Cardoso — Dev Portfolio',
    template: '%s | Leonardo Cardoso',
  },
  description: 'Backend Junior & Low-Code Developer specializing in automation, intelligent integrations and AI.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Leonardo Cardoso Portfolio',
    title: 'Leonardo Cardoso — Dev Portfolio',
    description: 'Backend Junior & Low-Code Developer specializing in automation, intelligent integrations and AI.',
  },
  twitter: {
    card: 'summary',
    title: 'Leonardo Cardoso — Dev Portfolio',
    description: 'Backend Junior & Low-Code Developer specializing in automation, intelligent integrations and AI.',
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
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
