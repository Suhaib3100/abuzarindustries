import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-walnut text-paper/80 relative overflow-hidden">
      {/* warm grain overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle at 50% 0%, #C79A4B 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }} />
      {/* warm gold top edge */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-[#C79A4B]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-brand-512.png" alt="Abuzar Industries" className="w-11 h-11 object-contain" />
              <div>
                <span className="font-[family:var(--font-serif)] font-semibold text-xl text-paper">
                  Abuzar <span className="gold-text">Industries</span>
                </span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-paper/35">Est. 1995</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-paper/55 max-w-xs">
              Premium teak, white teak and neem — custom cut and delivered across Karnataka for three generations.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <span className="block eyebrow text-paper/45 mb-5">Links</span>
            <ul className="space-y-3">
              {[
                { href: "/products", label: "Our Products" },
                { href: "/calculator", label: "Price Calculator" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-flex items-center gap-1.5 text-sm text-paper/65 hover:text-ochre transition-colors duration-300 link-underline after:bg-ochre after:bottom-0 after:h-px">
                    {l.label}
                    <ArrowUpRight size={12} className="opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <span className="block eyebrow text-paper/45 mb-5">Contact</span>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-paper/65">
                <MapPin size={15} className="mt-0.5 shrink-0 text-ochre" strokeWidth={1.75} />
                <span>
                  KSSIDC Industrial Area, DVG Road<br />
                  Chitradurga, Karnataka — 577501<br />
                  <span className="text-[11px] text-paper/35">Near Chitradurga Fort — 2 km from bus stand</span>
                </span>
              </li>
              <li>
                <a href="tel:+919845378626" className="inline-flex items-center gap-3 text-paper/65 hover:text-ochre transition-colors duration-300">
                  <Phone size={15} className="shrink-0 text-ochre" strokeWidth={1.75} />
                  +91 98453 78626
                </a>
              </li>
              <li>
                <a href="mailto:abuzarindustries@gmail.com" className="inline-flex items-center gap-3 text-paper/65 hover:text-ochre transition-colors duration-300">
                  <Mail size={15} className="shrink-0 text-ochre" strokeWidth={1.75} />
                  abuzarindustries@gmail.com
                </a>
              </li>
            </ul>

          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-paper/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-paper/30">
          <span>© {year} Abuzar Industries</span>
          <span className="flex items-center gap-3">
            <span>Made by Abuzar</span>
            <span className="flex items-center gap-2" style={{marginLeft:4}}>
              <a href="https://www.instagram.com/abuzarindustries/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="soc-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
              </a>
              <a href="https://github.com/abuzar310/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="soc-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14"><path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.1 6.9 9.5.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6 0-.6 0-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.4-2.2-.3-4.5-1.1-4.5-5 0-1.1.4-2 1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.5 5 .4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5C19.1 20.1 22 16.4 22 12c0-5.5-4.5-10-10-10z"/></svg>
              </a>
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
