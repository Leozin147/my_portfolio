export const SITE_URL = 'https://portfolio.leonardofcardoso.dev.br'

export const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Leonardo Fernandes Cardoso',
  jobTitle: 'Desenvolvedor Full-Stack',
  url: SITE_URL,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Santos',
    addressRegion: 'SP',
    addressCountry: 'BR',
  },
  sameAs: [
    'https://github.com/Leozin147',
    'https://www.linkedin.com/in/leonardo-fernandes-cardoso-7a6a75269',
  ],
}

export function serialize_json_ld(data: object): string {
  return JSON.stringify(data).replace(/</g, '\u003c')
}
