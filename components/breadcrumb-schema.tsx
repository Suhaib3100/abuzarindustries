"use client"

import { usePathname } from 'next/navigation'

interface BreadcrumbItem {
  name: string
  item: string
}

export function BreadcrumbSchema() {
  const pathname = usePathname()
  
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const baseUrl = 'https://abuzarindustries.in'
    const segments = pathname.split('/').filter(Boolean)
    
    const breadcrumbs: BreadcrumbItem[] = [
      {
        name: 'Home',
        item: baseUrl
      }
    ]
    
    let currentPath = ''
    
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`
      
      // Convert segment to readable name
      const name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      
      breadcrumbs.push({
        name: name,
        item: `${baseUrl}${currentPath}`
      })
    })
    
    return breadcrumbs
  }
  
  const breadcrumbs = getBreadcrumbs()
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": breadcrumb.name,
      "item": breadcrumb.item
    }))
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  )
}
