import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '~/components/Hero'
import { WelcomeSection } from '~/components/WelcomeSection'
import { CustomMerchSection } from '~/components/CustomMerchSection'
import { SignatureTripsSection } from '~/components/SignatureTripsSection'
import { MeetCaptainSection } from '~/components/MeetCaptainSection'
import { FleetSection } from '~/components/FleetSection'
import { BoatRampsSection } from '~/components/BoatRampsSection'
import { TestimonialsSection } from '~/components/TestimonialsSection'
import { SiteFooter } from '~/components/SiteFooter'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      <main>
        <Hero />
        <WelcomeSection />
        <CustomMerchSection />
        <SignatureTripsSection />
        <MeetCaptainSection />
        <FleetSection />
        <BoatRampsSection />
        <TestimonialsSection />
      </main>
      <SiteFooter />
    </>
  )
}
