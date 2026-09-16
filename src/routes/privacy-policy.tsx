import { createFileRoute } from '@tanstack/react-router'
import { SiteHeader } from '~/components/SiteHeader'
import { SiteFooter } from '~/components/SiteFooter'

export const Route = createFileRoute('/privacy-policy')({
  component: PrivacyPolicyPage,
  head: () => ({
    meta: [
      { title: 'Privacy Policy | Catching Chrome Guide Service' },
      {
        name: 'description',
        content:
          'How Catching Chrome Guide Service collects, uses, and protects information from visitors and trip enquiries.',
      },
      { name: 'robots', content: 'index, follow' },
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://www.catchingchromeguideservice.com/privacy-policy',
      },
    ],
  }),
})

const EFFECTIVE_DATE = 'September 17, 2026'

function PrivacyHeader() {
  return (
    <section className="relative h-[38vh] min-h-[260px] w-full overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <img
          src="/nature-mountain.webp"
          alt="Oregon river backdrop"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/50 to-ink" />
      </div>

      <SiteHeader />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-4xl uppercase tracking-wider text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)] sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.25em] text-cream/70">
          Effective {EFFECTIVE_DATE}
        </p>
      </div>
    </section>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl uppercase leading-none text-ink">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-ink/70">
        {children}
      </div>
    </section>
  )
}

function PrivacyPolicyPage() {
  return (
    <>
      <PrivacyHeader />

      <main className="theme-transition bg-cream py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <p className="text-[15.5px] leading-relaxed text-ink/70">
            This policy explains what information Catching Chrome Guide
            Service ("Catching Chrome," "we," "us") collects through{' '}
            <span className="whitespace-nowrap">
              catchingchromeguideservice.com
            </span>
            , how it's used, and who it's shared with. It applies to this
            website only.
          </p>

          <Section title="Information you give us">
            <p>
              When you submit the booking form (on the homepage or the
              Contact page), we collect whatever you enter: your name, and at
              least one way to reach you back (phone and/or email), plus
              whichever of trip type, group size, and message you fill in.
            </p>
            <p>
              That information is emailed directly to Captain Ryan (and, for
              agency support, to our website management partner) so someone
              can follow up about your trip. We don't sell it, and we don't
              use it for anything other than responding to your enquiry.
            </p>
          </Section>

          <Section title="Information collected automatically">
            <p>
              Like most websites, ordinary technical information (your
              browser, approximate location from your IP address, the pages
              you visit) is recorded by our hosting provider and by the
              analytics tools below. We don't use this to identify you
              personally.
            </p>
          </Section>

          <Section title="Cookies, analytics & ad tracking">
            <p>
              This site uses Google Tag Manager to load Google Analytics
              (GA4) and, for visitors who arrive from a Google Ads campaign,
              Google's conversion-tracking tag. These may set cookies in your
              browser to measure which pages get visited and whether a
              contact form was submitted. We don't use this data to build an
              advertising profile of you outside of Google's own tools.
            </p>
            <p>
              You can opt out of Google Analytics using the{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline hover:no-underline"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              , manage ad personalization at{' '}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline hover:no-underline"
              >
                Google Ads Settings
              </a>
              , or block cookies entirely in your browser's settings — the
              site works without them, aside from those two measurements.
            </p>
          </Section>

          <Section title="reCAPTCHA">
            <p>
              The booking form is protected by Google reCAPTCHA to keep spam
              submissions out of Ryan's inbox. This site is protected by
              reCAPTCHA, and the Google{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline hover:no-underline"
              >
                Privacy Policy
              </a>{' '}
              and{' '}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline hover:no-underline"
              >
                Terms of Service
              </a>{' '}
              apply.
            </p>
          </Section>

          <Section title="Other third-party services">
            <p>
              A few features call third-party APIs on the server, not from
              your browser, and don't send them any information about you
              personally:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>SMTP2GO</strong> delivers the booking-form email —
                it sees the form contents, nothing else.
              </li>
              <li>
                <strong>Google Places</strong> supplies the review quotes
                shown on the homepage.
              </li>
              <li>
                <strong>OpenWeatherMap</strong> supplies the current Oregon
                weather shown in the header.
              </li>
            </ul>
            <p>
              The <em>Order Merch</em> link goes to Envy Prints, an
              independent store that operates under its own privacy policy —
              we don't receive any information from purchases made there.
            </p>
          </Section>

          <Section title="Data retention & security">
            <p>
              We keep booking enquiries as long as reasonably needed to
              handle your trip and for basic business records afterward. We
              take reasonable steps to protect information in transit
              (this site is served over HTTPS) and don't store card or
              payment details — those are handled in person or by
              third-party payment apps at the time of your trip.
            </p>
          </Section>

          <Section title="Children's privacy">
            <p>
              This site isn't directed at children, and the booking form is
              meant to be filled out by an adult arranging a trip. We don't
              knowingly collect information from children under 13.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              If this policy changes, we'll update the effective date above.
              Continuing to use the site after a change means you accept the
              revised policy.
            </p>
          </Section>

          <Section title="Contact us">
            <p>
              Questions about this policy, or want us to delete information
              you've sent us? Call{' '}
              <a href="tel:5039369090" className="text-accent hover:underline">
                (503) 936-9090
              </a>{' '}
              or email{' '}
              <a
                href="mailto:ryanbfishin@gmail.com"
                className="text-accent hover:underline"
              >
                ryanbfishin@gmail.com
              </a>
              .
            </p>
          </Section>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
