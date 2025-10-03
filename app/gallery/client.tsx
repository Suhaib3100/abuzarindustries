"use client"

import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const IMAGES = [
  "timber%20yard%20panorama",
  "stacked%20teak%20planks",
  "neem%20wood%20storage",
  "sawmill%20cutting%20process",
  "finished%20planks%20ready%20for%20delivery",
  "loading%20timber%20onto%20truck",
]

export default function ClientGalleryPage() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<string | null>(null)

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <h1 className="font-serif text-3xl font-semibold md:text-4xl">Our Work. Our Quality. Your Trust.</h1>
      <p className="mt-3 max-w-2xl text-foreground/80">Real photos from our yard and process.</p>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
        {IMAGES.map((q) => (
          <button
            key={q}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg border"
            onClick={() => {
              setCurrent(q)
              setOpen(true)
            }}
          >
            <Image
              src={`/.jpg?key=239k8&height=400&width=600&query=${q}`}
              alt={q.replace(/%20/g, " ")}
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
                src={`/.jpg?key=cp1sg&height=900&width=1200&query=${current}`}
                alt={current.replace(/%20/g, " ")}
                fill
                className="object-cover"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
