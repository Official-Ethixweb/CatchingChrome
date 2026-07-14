import { useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { FacebookIcon, InstagramIcon, PhoneIcon, TikTokIcon } from './icons'

const NAV_ITEMS = [
  { label: 'About Us', to: '/about' },
  { label: 'Excursions', to: '/excursions' },
  { label: 'Commercial', to: '/commercial' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Gallery', to: '/gallery' },
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

const LOGO = '/Catching-Chrome-logo_color-1536x1533.png'
const PHONE = '(503) 936-9090'
const PHONE_HREF = 'tel:5039369090'

const NAV_LINK_CLASS =
  'nav-link px-2.5 py-1.5 text-[11px] uppercase xl:px-3 xl:text-[12.5px]'

function NavLinks() {
  return (
    <>
      {NAV_ITEMS.map((item) =>
        item.href ? (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={NAV_LINK_CLASS}
          >
            {item.label}
          </a>
        ) : (
          <Link key={item.label} to={item.to} className={NAV_LINK_CLASS}>
            {item.label}
          </Link>
        ),
      )}
    </>
  )
}

/**
 * Sticky bar that drops in once the hero has scrolled away. It carries the
 * essentials only: logo, phone, socials, Contact Us and Book Now. Its colours
 * follow the scroll-driven chapter theme (see .sticky-bar in styles.css).
 */
function StickyBar({ visible }: { visible: boolean }) {
  return (
    <div
      className={`sticky-bar fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 py-2.5 md:px-10">
        <a href="/" className="flex shrink-0 items-center">
          <img
            src={LOGO}
            alt="Catching Chrome Guide Service"
            className="h-12 w-auto object-contain sm:h-14 md:h-16"
          />
        </a>

        <div className="flex shrink-0 items-center gap-2.5 md:gap-3">
          <a
            href={PHONE_HREF}
            className="hidden items-center gap-2 text-[13px] tracking-wide opacity-80 transition-colors duration-200 hover:text-cta hover:opacity-100 sm:flex"
          >
            <PhoneIcon className="h-4 w-4" />
            {PHONE}
          </a>

          <div className="hidden items-center gap-2 xl:flex">
            {SOCIALS.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                tabIndex={visible ? 0 : -1}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-current opacity-60 transition-colors duration-200 hover:border-cta hover:text-cta hover:opacity-100"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>

          <Link
            to="/contact"
            tabIndex={visible ? 0 : -1}
            className="btn-outline-cta hidden px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] md:inline-flex"
          >
            Contact Us
          </Link>
          <Link
            to="/contact"
            tabIndex={visible ? 0 : -1}
            className="btn-primary px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.14em]"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null)
  const [stuck, setStuck] = useState(false)

  // The sticky bar appears once the hero section (the header's parent) has
  // essentially scrolled past. Measured per page so it works with both the
  // full-height home hero and the shorter interior page headers.
  useEffect(() => {
    const section = headerRef.current?.closest('section')
    let raf = 0

    const update = () => {
      raf = 0
      const trigger = section
        ? section.offsetHeight - 80
        : window.innerHeight * 0.6
      setStuck(window.scrollY > trigger)
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <header ref={headerRef} className="absolute inset-x-0 top-0 z-30">
        {/* Three flex tracks — logo | nav | actions. The logo and actions never
            shrink and the nav owns whatever is left, so the row reflows with the
            viewport instead of the nav free-floating over its neighbours. */}
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 py-4 md:px-10">
          <a href="/" className="flex shrink-0 items-center">
            <img
              src={LOGO}
              alt="Catching Chrome Guide Service"
              className="h-[72px] w-auto object-contain drop-shadow-lg sm:h-[88px] lg:h-[104px] xl:h-[122px]"
            />
          </a>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 font-medium tracking-[0.14em] text-white/90 lg:flex xl:gap-1.5 xl:tracking-[0.16em]">
            <NavLinks />
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <a
              href={PHONE_HREF}
              aria-label={`Call ${PHONE}`}
              className="btn-outline-cta hidden h-10 w-10 items-center justify-center sm:inline-flex xl:hidden"
            >
              <PhoneIcon className="h-4 w-4" />
            </a>
            <a
              href={PHONE_HREF}
              className="btn-outline-cta hidden items-center gap-2 px-4 py-2 text-[13px] tracking-wide xl:flex"
            >
              <PhoneIcon className="h-4 w-4" />
              {PHONE}
            </a>
            <div className="hidden items-center gap-2 md:flex lg:hidden 2xl:flex">
              {SOCIALS.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/40 text-white transition-colors duration-200 hover:border-cta hover:text-cta"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      <StickyBar visible={stuck} />
    </>
  )
}
