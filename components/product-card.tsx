import Image from "next/image"
import { Button } from "@/components/ui/button"

type ProductCardProps = {
  title: string
  imageQuery: string
  sizes: string[]
  price?: string
}

export function ProductCard({ title, imageQuery, sizes, price }: ProductCardProps) {
  return (
    <div className="flex flex-col rounded-lg border bg-card">
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
        <Image
          src={imageQuery === "teak%20wood%20planks%20stack" ? "/images/2.jpg" : 
                imageQuery === "white%20teak%20wood%20planks%20stack" ? "/images/abuzar-wood.jpg" : 
                "/images/2.jpg"}
          alt={`${title} product photo`}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg font-semibold">{title}</h3>
        <ul className="mt-2 list-inside list-disc text-sm text-foreground/80">
          {sizes.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <p className="mt-2 text-sm">{price ?? "Contact for Latest Price"}</p>
        <div className="mt-4">
          <Button asChild className="w-full bg-primary text-primary-foreground hover:opacity-90">
            <a
              href="https://wa.me/919845378626?text=I%20am%20interested%20in%20your%20timber%20products"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp inquiry for ${title}`}
            >
              WhatsApp for Inquiry
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
