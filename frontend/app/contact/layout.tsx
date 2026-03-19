import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com Leonardo Cardoso para discutir seu projeto de automação, integração ou desenvolvimento backend.',
  openGraph: {
    title: 'Contato | Leonardo Cardoso',
    description: 'Entre em contato com Leonardo Cardoso para discutir seu projeto.',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
