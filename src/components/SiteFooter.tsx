import { FacebookIcon, InstagramIcon, PhoneIcon } from './icons'

export function SiteFooter() {
  return (
    <footer className="bg-ink py-12 md:py-16 text-cream">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <a href="/" className="flex items-center">
            <img src="/Catching-Chrome-logo_color-1536x1533.png" alt="Catching Chrome" className="h-20 w-auto object-contain" />
          </a>
        </div>

        {/* Links & Socials */}
        <div className="flex flex-col items-center md:items-end gap-6">
          <nav className="flex items-center gap-6 text-[13px] font-medium tracking-[0.18em] text-cream/80">
            <a href="#" className="uppercase transition-colors duration-200 hover:text-cream">About</a>
            <a href="#" className="uppercase transition-colors duration-200 hover:text-cream">Excursions</a>
            <a href="#" className="uppercase transition-colors duration-200 hover:text-cream">Contact</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <a
              href="tel:5039369090"
              className="flex items-center gap-2 rounded-full border border-cream/25 px-4 py-2 text-[13px] tracking-wide text-cream transition-colors duration-200 hover:border-cream/60"
            >
              <PhoneIcon className="h-4 w-4" />
              (503) 936-9090
            </a>
            <div className="flex items-center gap-3 text-cream/80">
              <a href="#" aria-label="Facebook" className="transition-colors duration-200 hover:text-cream">
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="transition-colors duration-200 hover:text-cream">
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        
      </div>
      
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 mt-12 pt-6 border-t border-cream/10 text-center text-[11px] tracking-[0.1em] text-cream/40">
        &copy; {new Date().getFullYear()} Catching Chrome Guide Service. All rights reserved.
      </div>
    </footer>
  )
}
