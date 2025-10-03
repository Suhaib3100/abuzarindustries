import { FloatingHeader } from "@/components/ui/floating-header"
import { cn } from "@/lib/utils"

export default function Page() {
  return (
    <div className="relative w-full px-4">
      <FloatingHeader />
      <div className="min-h-screen py-10" />
      {/* Simple dotted background, kept conservative for cross-compatibility */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 size-full",
          "bg-[radial-gradient(#ffffff22_2px,transparent_2px)]",
          "bg-[size:12px_12px]",
        )}
      />
    </div>
  )
}
