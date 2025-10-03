import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section aria-label="Hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with wood planks image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/1.jpg')",
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Wood texture pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:30px_30px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Tagline */}
          <p className="text-accent text-lg font-medium mb-4 tracking-wide uppercase">
            Trusted Timber Specialists
          </p>
          
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            QUALITY TIMBER FOR
            <span className="block text-accent">EVERY CONSTRUCTION NEED</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Specialists in Teak, White Teak & Neem Wood Planks — Any Size Available
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg"
              className="bg-gradient-to-r from-accent to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-accent transition-all duration-200 font-bold px-8 py-4 text-lg rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <a href="/products">Check Prices</a>
            </Button>
            
            <Button
  asChild
  size="lg"
  variant="outline"
  className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-200 font-semibold px-8 py-4 text-lg rounded-lg backdrop-blur-sm relative group"
>
  <a
    href="https://wa.me/919845378626"
    target="_blank"
    rel="noopener noreferrer"
    className="relative"
  >
    WhatsApp Us
    <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap pointer-events-none z-50">
      Chat with us on WhatsApp
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
    </span>
  </a>
</Button>

            
            <Button 
              asChild 
              size="lg"
              className="bg-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 transition-all duration-200 font-semibold px-8 py-4 text-lg rounded-lg border border-white/30"
            >
              <a href="tel:+919845378626">Call Now</a>
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-gray-300">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className="text-sm font-medium">Trusted Since 2012</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className="text-sm font-medium">Custom Sizes Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className="text-sm font-medium">Delivery Across Karnataka</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
