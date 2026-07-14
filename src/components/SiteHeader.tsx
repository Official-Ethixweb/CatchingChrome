import { Link } from '@tanstack/react-router'
import { FacebookIcon, InstagramIcon, PhoneIcon, TikTokIcon } from './icons'

const NAV_ITEMS = [
  { label: 'About Us', to: '/about' },
  { label: 'Excursions', to: '/excursions' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Gallery', to: '/', hash: 'gallery' },
  { label: 'Order Merch', to: '/', hash: 'merch' },
  { label: 'Contact', to: '/contact' },
]

const LOGO = '/Catching-Chrome-logo_color-1536x1533.png'

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="relative mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-5 md:px-10">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src={LOGO}
            alt="Catching Chrome Guide Service"
            className="h-[73px] w-auto object-contain drop-shadow-lg md:h-[94px]"
          />
        </a>

        {/* Primary nav — glassy pill */}
        <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden items-center gap-5 xl:gap-7 text-[13px] font-medium tracking-[0.16em] text-white/90 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={item.hash}
              className="relative py-1 uppercase transition-colors duration-200 hover:text-white group"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 origin-center transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        {/* Contact + socials */}
        <div className="flex items-center gap-3">
          <a
            href="tel:5039369090"
            className="hidden items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-[13px] tracking-wide text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20 sm:flex"
          >
            <PhoneIcon className="h-4 w-4" />
            (503) 936-9090
          </a>
          <div className="hidden md:flex lg:hidden xl:flex items-center gap-2">
            {[
              { Icon: FacebookIcon, label: 'Facebook' },
              { Icon: InstagramIcon, label: 'Instagram' },
              { Icon: TikTokIcon, label: 'TikTok' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
