import Link from "next/link"
import { ExternalLink, Code, Crown } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          <p className="text-sm text-foreground/70">
            © {new Date().getFullYear()} Abuzar Industries. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Terms
              </Link>
            </div>
            
            <div className="hidden md:block w-px h-4 bg-gray-300"></div>
            
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground/70">Developed by</span>
              <a 
                href="https://ceo.pronexus.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-bold text-primary hover:text-accent transition-all duration-300 group bg-primary/10 hover:bg-primary/20 px-2 py-1 rounded-md"
              >
                <Crown className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Suhaib King
                <ExternalLink className="w-3 h-3 group-hover:scale-110 transition-transform" />
              </a>
            </div>
            
            <div className="hidden md:block w-px h-4 bg-gray-300"></div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-accent">
                Abuzar
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
