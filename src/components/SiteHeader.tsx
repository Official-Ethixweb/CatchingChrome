import { useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { PhoneIcon } from './icons'
import { SOCIALS } from '~/lib/socials'
import { OregonWeather } from './OregonWeather'
import { StaggeredMenu } from './StaggeredMenu'

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

const LOGO = '/brand/logo.webp'
const PHONE = '(503) 936-9090'
const PHONE_HREF = 'tel:5039369090'

// The nav only earns its roomier sizing at 2xl. Below that the row has to seat
// the logo, phone and socials as well, and the wider tracking overflows it.
const NAV_LINK_CLASS =
  'nav-link px-2.5 py-1.5 text-[11px] uppercase 2xl:px-3 2xl:text-[12.5px]'

// Book Now on phones, in both the top header and the sticky bar. Matched to
// the "MENU +" toggle sitting beside it in either bar: same 13px semibold
// uppercase at 0.14em tracking, same 30px box, so the two read as a pair.
const MOBILE_BOOK_CLASS =
  'btn-primary inline-flex h-[30px] items-center whitespace-nowrap px-3 text-[13px] font-semibold uppercase leading-none tracking-[0.14em]'

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
      <div className="relative mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 py-2.5 md:px-10">
        <a href="/" className="flex shrink-0 items-center">
          <img
            src={LOGO}
            alt="Catching Chrome Guide Service"
            className="h-[72px] w-auto object-contain sm:h-[76px] md:h-[77px]"
          />
        </a>

        {/* Live Oregon weather, centred in the gap between the logo and the
            actions on desktop. On mobile/tablet (<lg), Book Now is centered here. */}
        <div className="flex min-w-0 flex-1 items-center justify-center">
          <div className="pointer-events-none hidden lg:flex">
            <OregonWeather />
          </div>
          <div className="lg:hidden">
            <Link
              to="/contact"
              tabIndex={visible ? 0 : -1}
              className={MOBILE_BOOK_CLASS}
            >
              Book Now
            </Link>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2.5 pr-22 md:gap-3 lg:pr-0">
          <a
            href={PHONE_HREF}
            className="hidden items-center gap-2 text-[13px] tracking-wide opacity-80 transition-colors duration-200 hover:text-cta hover:opacity-100 sm:flex"
          >
            <PhoneIcon className="h-4 w-4" />
            {PHONE}
          </a>

          <div className="hidden items-center gap-2 xl:flex">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(href !== '#' && {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                })}
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
            className="btn-primary hidden whitespace-nowrap px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] lg:inline-flex"
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
      {/* Exactly one bar is ever on screen. Handing over to the sticky bar is
          instant, and coming back waits out that bar's 0.35s slide-out (see
          .sticky-bar in styles.css) before fading in — otherwise both are up
          together mid-transition and you see two Book Now buttons stacked,
          which is what happens when you scroll back up. */}
      <header
        ref={headerRef}
        aria-hidden={stuck}
        className={`absolute inset-x-0 top-0 z-30 transition-opacity ${
          stuck
            ? 'invisible opacity-0 duration-0'
            : 'visible opacity-100 delay-[350ms] duration-200'
        }`}
      >
        {/* Three flex tracks — logo | nav | actions. The logo and actions never
            shrink and the nav owns whatever is left, so the row reflows with the
            viewport instead of the nav free-floating over its neighbours. */}
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 py-4 md:px-10">
          <a href="/" className="flex shrink-0 items-center">
            <img
              src={LOGO}
              alt="Catching Chrome Guide Service"
              className="h-[100px] w-auto object-contain drop-shadow-lg sm:h-[112px] lg:h-[125px] xl:h-[146px]"
            />
          </a>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 font-medium tracking-[0.14em] text-white/90 lg:flex 2xl:gap-1.5 2xl:tracking-[0.16em]">
            <NavLinks />
          </nav>

          <div className="flex min-w-0 flex-1 items-center justify-center lg:hidden">
            <Link to="/contact" className={MOBILE_BOOK_CLASS}>
              Book Now
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-3 pr-22 lg:pr-0">
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
            <div className="hidden items-center gap-1.5 md:flex lg:hidden xl:flex xl:gap-2">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(href !== '#' && {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  })}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/40 text-white transition-colors duration-200 hover:border-cta hover:text-cta xl:h-9 xl:w-9"
                >
                  <Icon className="h-3.5 w-3.5 xl:h-4 xl:w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      <StickyBar visible={stuck} />

      <StaggeredMenu
        className="lg:hidden"
        isFixed={true}
        stuck={stuck}
        colors={['#216783', '#184B60', '#0E2A3B']}
        accentColor="#60B1D2"
        logoUrl={LOGO}
        items={NAV_ITEMS}
        socialItems={SOCIALS.map((s) => ({ label: s.label, link: s.href }))}
      />
    </>
  )
}
