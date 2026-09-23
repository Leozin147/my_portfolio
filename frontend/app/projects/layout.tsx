import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projetos',
  description: 'Sistemas e automações desenvolvidos por Leonardo Cardoso, com projetos em produção e em andamento.',
  openGraph: {
    title: 'Projetos | Leonardo Cardoso',
    description: 'Sistemas e automações desenvolvidos por Leonardo Cardoso, com projetos em produção e em andamento.',
  },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
