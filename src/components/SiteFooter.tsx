import { Link } from '@tanstack/react-router'
import { FacebookIcon, InstagramIcon, PhoneIcon, TikTokIcon } from './icons'

const QUICK_LINKS = [
  { label: 'About Us', to: '/about' },
  { label: 'Excursions', to: '/excursions' },
  { label: 'Commercial', to: '/commercial' },
  { label: 'Pricing', to: '/pricing' },
  {
    label: 'Order Merch',
    href: 'https://envy-prints.com/collections/catching-chrome-guide-service',
  },
  { label: 'Contact', to: '/contact' },
]

const SOCIALS = [
  { Icon: FacebookIcon, label: 'Facebook' },
  { Icon: InstagramIcon, label: 'Instagram' },
  { Icon: TikTokIcon, label: 'TikTok' },
]

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-ink text-cream">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 py-16 md:grid-cols-3 md:gap-10 md:px-10 md:py-20">
        {/* Brand + socials */}
        <div className="flex flex-col items-center gap-6 md:items-start">
          <a href="/" className="flex items-center">
            <img
              src="/Catching-Chrome-logo_color-1536x1533.png"
              alt="Catching Chrome Guide Service"
              className="h-28 w-auto object-contain"
            />
          </a>
          <p className="max-w-xs text-center text-sm leading-relaxed text-cream/50 md:text-left">
            Expert-guided fishing excursions on Oregon and the Pacific
            Northwest&apos;s most pristine waters.
          </p>
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 bg-cream/5 text-cream/80 transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-ink"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center gap-5 md:items-start">
          <h3 className="font-display text-lg uppercase tracking-wide text-cream">
            Quick Links
          </h3>
          <ul className="flex flex-col items-center gap-3 text-sm text-cream/70 md:items-start">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                {link.href ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 hover:text-accent"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.to}
                    className="transition-colors duration-200 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Get in touch */}
        <div className="flex flex-col items-center gap-5 md:items-start">
          <h3 className="font-display text-lg uppercase tracking-wide text-cream">
            Get in Touch
          </h3>
          <div className="flex flex-col items-center gap-4 md:items-start">
            <a
              href="tel:5039369090"
              className="group flex items-center gap-3 text-sm text-cream/70 transition-colors duration-200 hover:text-cream"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 bg-cream/5 text-accent transition-colors duration-200 group-hover:border-accent">
                <PhoneIcon className="h-4 w-4" />
              </span>
              (503) 936-9090
            </a>
            <a
              href="mailto:ryanbfishin@gmail.com"
              className="group flex items-center gap-3 text-sm text-cream/70 transition-colors duration-200 hover:text-cream"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 bg-cream/5 text-accent transition-colors duration-200 group-hover:border-accent">
                <MailIcon className="h-4 w-4" />
              </span>
              ryanbfishin@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10 py-6 text-center text-[11px] tracking-[0.1em] text-cream/40">
        &copy; {new Date().getFullYear()} Catching Chrome Guide Service. All
        rights reserved.
      </div>
    </footer>
  )
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
