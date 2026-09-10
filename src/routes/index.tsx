import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '~/components/Hero'
import { PartnersSection } from '~/components/PartnersSection'
import { WelcomeSection } from '~/components/WelcomeSection'
import { CustomMerchSection } from '~/components/CustomMerchSection'
import { SignatureTripsSection } from '~/components/SignatureTripsSection'
import { SeasonsSection } from '~/components/SeasonsSection'
import { MeetCaptainSection } from '~/components/MeetCaptainSection'
import { FleetSection } from '~/components/FleetSection'
import { BoatRampsSection } from '~/components/BoatRampsSection'
import { TestimonialsSection } from '~/components/TestimonialsSection'
import { FaqSection } from '~/components/FaqSection'
import { FAQS } from '~/lib/faqs'
import { SiteFooter } from '~/components/SiteFooter'
import { JsonLd } from '~/components/JsonLd'

// Built straight from FAQS (the same array FaqSection renders), so the
// FAQPage schema can never say something the page itself doesn't.
const FAQ_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
}

export const Route = createFileRoute('/')({
  component: Home,
  head: () => ({
    links: [
      {
        rel: 'canonical',
        href: 'https://www.catchingchromeguideservice.com/',
      },
    ],
  }),
})

function Home() {
  return (
    <>
      <JsonLd data={FAQ_LD} />
      <main>
        <Hero />
        <PartnersSection />
        <WelcomeSection />
        <MeetCaptainSection />
        <TestimonialsSection />
        <SignatureTripsSection />
        <SeasonsSection />
        <FleetSection />
        <BoatRampsSection />
        <CustomMerchSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  )
}
