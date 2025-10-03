"use client"

import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const IMAGES = [
  {
    src: "/images/1.jpg",
    alt: "Timber yard panorama"
  },
  {
    src: "/images/2.jpg", 
    alt: "Stacked teak planks"
  },
  {
    src: "/images/3.jpg",
    alt: "White teak wood stacks"
  },
  {
    src: "/images/4.jpg",
    alt: "Neem wood storage"
  },
  {
    src: "/images/5.jpg",
    alt: "Sawmill cutting process"
  },
  {
    src: "/images/abuzar-wood.jpg",
    alt: "Finished planks ready for delivery"
  }
]

export function GalleryPreview() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<{src: string, alt: string} | null>(null)

  return (
    <>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
        {IMAGES.map((image, index) => (
          <button
            key={index}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg border"
            onClick={() => {
              setCurrent(image)
              setOpen(true)
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform group-hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl overflow-hidden p-0">
          {current && (
            <div className="relative h-[60vh] w-full">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                className="object-cover"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
