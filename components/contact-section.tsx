"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export function ContactSection() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("I would like to check timber prices and availability.")

  const handleWhatsApp = () => {
    const msg = `Abuzar Industries Enquiry:
Name: ${name}
Phone: ${phone}
Message: ${message}`
    const url = `https://wa.me/919845378626?text=${encodeURIComponent(msg)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="space-y-3">
        <h3 className="font-serif text-xl font-semibold">Get in touch</h3>
        <p className="text-sm text-foreground/70">
          KSSIDC Industrial Area, DVG Road, Chitradurga • Phone:{" "}
          <a className="underline" href="tel:+919845378626">
            9845378626
          </a>
        </p>
        <div className="rounded-lg border">
          <iframe
            title="Abuzar Industries location"
            src="https://www.google.com/maps?q=KSSIDC%20Industrial%20Area%2C%20DVG%20Road%2C%20Chitradurga&output=embed"
            className="h-56 w-full rounded-lg"
            loading="lazy"
          />
        </div>
      </div>

      <form
        className="grid gap-3"
        onSubmit={(e) => {
          e.preventDefault()
          handleWhatsApp()
        }}
      >
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="msg">Message</Label>
          <Textarea id="msg" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} />
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit" className="bg-primary text-primary-foreground hover:opacity-90">
            Send via WhatsApp
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
          >
            <a
              href={`mailto:?subject=${encodeURIComponent("Abuzar Industries Enquiry")}&body=${encodeURIComponent(`${message}\n\nName: ${name}\nPhone: ${phone}`)}`}
            >
              Email Us
            </a>
          </Button>
        </div>
      </form>
    </div>
  )
}
