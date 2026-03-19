import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Services offered by Leonardo Cardoso — process automation, system integrations, AI agents, dashboards and backend development.',
  openGraph: {
    title: 'Services | Leonardo Cardoso',
    description: 'Process automation, system integrations, AI agents, dashboards and backend development.',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
