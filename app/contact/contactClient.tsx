"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactClient() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  const sendWhatsApp = () => {
    const msg = `Inquiry - Abuzar Industries:
Name: ${name}
Phone: ${phone}
Message: ${message}`
    const url = `https://wa.me/919845378626?text=${encodeURIComponent(msg)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <h1 className="font-serif text-3xl font-semibold md:text-4xl">Contact Us</h1>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-5">
            <p className="text-sm">Address</p>
            <p className="font-serif text-xl font-semibold">KSSIDC Industrial Area, DVG Road, Chitradurga</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <a className="rounded-lg border bg-secondary p-5 text-secondary-foreground" href="tel:+919845378626">
              <p className="text-sm">Phone</p>
              <p className="font-serif text-xl font-semibold">9845378626</p>
            </a>
            <a
              className="rounded-lg border bg-secondary p-5 text-secondary-foreground"
              href="https://wa.me/919845378626"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="text-sm">WhatsApp</p>
              <p className="font-serif text-xl font-semibold">Chat Now</p>
            </a>
          </div>

          <div className="rounded-lg border">
            <iframe
              title="Google Maps - Abuzar Industries"
              className="h-64 w-full rounded-lg"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=KSSIDC%20Industrial%20Area%2C%20DVG%20Road%2C%20Chitradurga&output=embed"
            />
          </div>
        </div>

        <div className="rounded-lg border bg-card p-5">
          <h2 className="font-serif text-xl font-semibold">Send an Inquiry</h2>
          <div className="mt-4 grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
            <div className="flex gap-3">
              <Button onClick={sendWhatsApp} className="bg-primary text-primary-foreground hover:opacity-90">
                Send via WhatsApp
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
              >
                <a href="mailto:info@example.com?subject=Inquiry%20-%20Abuzar%20Industries">Email (optional)</a>
              </Button>
            </div>
            <p className="text-xs text-foreground/70">We typically respond within the same business day.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
