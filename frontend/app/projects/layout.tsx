import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projetos',
  description: 'Projetos desenvolvidos por Leonardo Cardoso — automações, APIs, dashboards e mais.',
  openGraph: {
    title: 'Projetos | Leonardo Cardoso',
    description: 'Projetos desenvolvidos por Leonardo Cardoso — automações, APIs, dashboards e mais.',
  },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
