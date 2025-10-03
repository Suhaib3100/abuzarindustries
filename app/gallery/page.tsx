import type { Metadata } from "next"
import ClientGalleryPage from "./client"

export const metadata: Metadata = {
  title: "Gallery | Abuzar Industries",
  description: "See our timber yard, cutting process, and ready planks. Our work. Our quality. Your trust.",
}

export default function Page() {
  return <ClientGalleryPage />
}
