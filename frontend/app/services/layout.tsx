import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Automation, system integrations, AI agents and backend development by Leonardo Cardoso.',
  openGraph: {
    title: 'Services | Leonardo Cardoso',
    description: 'Automation, system integrations, AI agents and backend development by Leonardo Cardoso.',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
