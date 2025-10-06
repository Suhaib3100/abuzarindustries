"use client"

interface ProductSchemaProps {
  productName: string
  description: string
  image: string
  price: string
  priceCurrency?: string
  availability?: string
  brand?: string
  category?: string
  sku?: string
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
    bestRating?: number
    worstRating?: number
  }
  reviews?: Array<{
    author: string
    reviewRating: {
      ratingValue: number
      bestRating?: number
      worstRating?: number
    }
    reviewBody: string
    datePublished: string
  }>
}

export function ProductSchema({
  productName,
  description,
  image,
  price,
  priceCurrency = "INR",
  availability = "https://schema.org/InStock",
  brand = "Abuzar Industries",
  category = "Timber",
  sku,
  aggregateRating,
  reviews
}: ProductSchemaProps) {
  const baseUrl = "https://abuzarindustries.in"
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productName,
    "description": description,
    "image": image,
    "category": category,
    "brand": {
      "@type": "Brand",
      "name": brand
    },
    "sku": sku || productName.toLowerCase().replace(/\s+/g, '-'),
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": priceCurrency,
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": price,
        "priceCurrency": priceCurrency,
        "unitText": "per cubic foot"
      },
      "availability": availability,
      "seller": {
        "@type": "Organization",
        "name": "Abuzar Industries",
        "url": baseUrl,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "KSSIDC Industrial Area, DVG Road",
          "addressLocality": "Chitradurga",
          "addressRegion": "Karnataka",
          "postalCode": "577501",
          "addressCountry": "IN"
        },
        "telephone": "+91-9845378626"
      },
      "validFrom": "2024-01-01",
      "url": `${baseUrl}/products`
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Abuzar Industries",
      "url": baseUrl
    },
    "url": `${baseUrl}/products`,
    ...(aggregateRating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": aggregateRating.ratingValue,
        "reviewCount": aggregateRating.reviewCount,
        "bestRating": aggregateRating.bestRating || 5,
        "worstRating": aggregateRating.worstRating || 1
      }
    }),
    ...(reviews && reviews.length > 0 && {
      "review": reviews.map(review => ({
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": review.author
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.reviewRating.ratingValue,
          "bestRating": review.reviewRating.bestRating || 5,
          "worstRating": review.reviewRating.worstRating || 1
        },
        "reviewBody": review.reviewBody,
        "datePublished": review.datePublished
      }))
    })
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

// Predefined product schemas for common products
export function TeakWoodSchema() {
  return (
    <ProductSchema
      productName="Teak Wood Planks"
      description="Premium teak wood planks in custom sizes. High-quality timber perfect for furniture, construction, and decorative purposes."
      image="https://abuzarindustries.in/images/1.jpg"
      price="4000"
      sku="teak-wood-planks"
      aggregateRating={{
        ratingValue: 4.8,
        reviewCount: 127,
        bestRating: 5,
        worstRating: 1
      }}
      reviews={[
        {
          author: "Rajesh Kumar",
          reviewRating: {
            ratingValue: 5,
            bestRating: 5,
            worstRating: 1
          },
          reviewBody: "Excellent quality teak wood. Perfect for our furniture project. Highly recommended!",
          datePublished: "2024-10-01"
        },
        {
          author: "Priya Sharma",
          reviewRating: {
            ratingValue: 4,
            bestRating: 5,
            worstRating: 1
          },
          reviewBody: "Good quality wood, delivered on time. Price is reasonable for the quality.",
          datePublished: "2024-09-28"
        }
      ]}
    />
  )
}

export function WhiteTeakWoodSchema() {
  return (
    <ProductSchema
      productName="White Teak Wood Planks"
      description="High-quality white teak wood planks. Durable and beautiful timber suitable for various construction and furniture applications."
      image="https://abuzarindustries.in/images/2.jpg"
      price="2800"
      sku="white-teak-wood-planks"
      aggregateRating={{
        ratingValue: 4.6,
        reviewCount: 89,
        bestRating: 5,
        worstRating: 1
      }}
      reviews={[
        {
          author: "Vikram Singh",
          reviewRating: {
            ratingValue: 5,
            bestRating: 5,
            worstRating: 1
          },
          reviewBody: "Great alternative to regular teak. Quality is excellent and price is very reasonable.",
          datePublished: "2024-10-02"
        }
      ]}
    />
  )
}

export function NeemWoodSchema() {
  return (
    <ProductSchema
      productName="Neem Wood Planks"
      description="Durable neem wood planks for construction. Natural pest-resistant properties make it ideal for outdoor applications."
      image="https://abuzarindustries.in/images/3.jpg"
      price="1500"
      sku="neem-wood-planks"
      aggregateRating={{
        ratingValue: 4.4,
        reviewCount: 156,
        bestRating: 5,
        worstRating: 1
      }}
      reviews={[
        {
          author: "Anita Reddy",
          reviewRating: {
            ratingValue: 4,
            bestRating: 5,
            worstRating: 1
          },
          reviewBody: "Good value for money. Perfect for our construction project. Natural pest resistance is a bonus.",
          datePublished: "2024-09-30"
        }
      ]}
    />
  )
}
