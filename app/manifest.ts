import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Abuzar Industries - Best Teak Wood Chitradurga',
    short_name: 'Abuzar Industries',
    description: 'Best teak wood supplier in Chitradurga. Premium teak, white teak & neem wood planks. Custom sizes, delivery across Karnataka.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#8B4513',
    icons: [
      {
        src: '/images/abuzar-logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/images/logo-main.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    categories: ['business', 'shopping', 'productivity'],
    lang: 'en',
    orientation: 'portrait',
  }
}
