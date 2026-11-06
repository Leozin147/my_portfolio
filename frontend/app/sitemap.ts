import type { MetadataRoute } from 'next'
import { SITE_URL } from '../lib/site'

const PUBLIC_PATHS = ['', '/projects', '/services', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_PATHS.map(path => ({ url: `${SITE_URL}${path}` }))
}
