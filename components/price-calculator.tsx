"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

type Wood = "Teak" | "WhiteTeak" | "Neem"

const PRICE_PER_CUFT: Record<Wood, number> = {
  Teak: 4000,
  WhiteTeak: 2800,
  Neem: 1500,
}

export function PriceCalculator() {
  const [wood, setWood] = useState<Wood>("Teak")
  const [lengthFt, setLengthFt] = useState<string>("6") // feet
  const [widthFt, setWidthFt] = useState<string>("0.5") // feet (6 inches)
  const [thicknessFt, setThicknessFt] = useState<string>("0.167") // feet (~2 inches)
  const [qty, setQty] = useState<string>("1")

  const { volumeCuFt, total } = useMemo(() => {
    const L = Number.parseFloat(lengthFt) || 0
    const W = Number.parseFloat(widthFt) || 0
    const T = Number.parseFloat(thicknessFt) || 0
    const Q = Number.parseFloat(qty) || 0
    const cuFt = L * W * T * Q
    const rate = PRICE_PER_CUFT[wood]
    const price = Math.round(cuFt * rate)
    return { volumeCuFt: cuFt, total: price }
  }, [lengthFt, widthFt, thicknessFt, qty, wood])

  const handleSendQuote = () => {
    const label = wood === "WhiteTeak" ? "White Teak" : wood
    const msg = `Quote Request - Abuzar Industries:
Wood: ${label}
Size (ft): ${lengthFt} x ${widthFt} x ${thicknessFt}
Quantity: ${qty}
Volume (cu ft): ${volumeCuFt.toFixed(3)}
Estimated Total: ₹${total}
Note: Prices may vary – please confirm latest rates.`
    const url = `https://wa.me/919845378626?text=${encodeURIComponent(msg)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="rounded-lg border bg-card p-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="wood">Wood Type</Label>
            <Select value={wood} onValueChange={(v) => setWood(v as Wood)}>
              <SelectTrigger id="wood" className="w-full">
                <SelectValue placeholder="Select wood type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Teak">Teak</SelectItem>
                <SelectItem value="WhiteTeak">White Teak</SelectItem>
                <SelectItem value="Neem">Neem</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="length">Length (ft)</Label>
              <Input id="length" inputMode="decimal" value={lengthFt} onChange={(e) => setLengthFt(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="width">Width (ft)</Label>
              <Input id="width" inputMode="decimal" value={widthFt} onChange={(e) => setWidthFt(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="thickness">Thickness (ft)</Label>
              <Input
                id="thickness"
                inputMode="decimal"
                value={thicknessFt}
                onChange={(e) => setThicknessFt(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="qty">Quantity</Label>
            <Input id="qty" inputMode="numeric" value={qty} onChange={(e) => setQty(e.target.value)} />
          </div>
        </div>

        <div className="grid content-center gap-4">
          <div className="rounded-md border bg-secondary p-4 text-secondary-foreground">
            <p className="text-sm">Estimated Volume</p>
            <p className="font-serif text-2xl font-semibold">{volumeCuFt.toFixed(3)} cu ft</p>
            <p className="mt-2 text-sm">Estimated Total</p>
            <p className="font-serif text-3xl font-semibold">₹{total.toLocaleString("en-IN")}</p>
            <p className="mt-3 text-xs text-foreground/70">
              Prices may vary – contact for latest rates. Estimates are for guidance only.
            </p>
          </div>
          <Button onClick={handleSendQuote} className="bg-primary text-primary-foreground hover:opacity-90">
            Send Quote to WhatsApp
          </Button>
        </div>
      </div>
    </div>
  )
}
