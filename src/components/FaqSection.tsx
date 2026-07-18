import { useState } from 'react'
import { Eyebrow } from './Eyebrow'

type Faq = {
  q: string
  a: string
}

const FAQS: Faq[] = [
  {
    q: "What's included in a guided trip?",
    a: 'All rods, reels, tackle, bait, and safety gear are provided, along with cleaning and bagging of your catch. Just bring weather-appropriate clothing, a valid fishing license, and any food or drinks you want for the day.',
  },
  {
    q: 'Do I need a fishing license?',
    a: 'Yes, every angler must carry a valid Oregon (or Washington, depending on the water) license with the appropriate tags. We are happy to point you to the nearest vendor or the online portal before your trip.',
  },
  {
    q: 'What should I bring?',
    a: 'Dress in layers for the weather and bring polarized sunglasses, a hat, sunscreen, and rain gear in the cooler months. Non-slip footwear and a cooler for your catch are strongly recommended.',
  },
  {
    q: 'How many people can join a trip?',
    a: 'Our flagship 22-ft sled comfortably fishes up to four anglers, while the 18-ft Clackacraft is ideal for groups of three. Larger parties can be split across multiple boats, just ask when you book.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept cash, all major credit and debit cards, and digital wallets like Venmo and Zelle. A deposit is due at booking to lock in your date, with the balance settled on the day of your trip.',
  },
  {
    q: "What's your cancellation policy?",
    a: 'A deposit reserves your date. Cancellations made seven or more days out are fully refundable or reschedulable. Weather calls are made by the captain, safety first, and always come with a rain check.',
  },
  {
    q: 'Are trips kid-friendly?',
    a: 'Absolutely. Warm-weather shad trips are perfect for kids and first-timers, with non-stop action on light gear. Let us know ages ahead of time so we can tailor the day to your group.',
  },
]

function AccordionItem({
  faq,
  open,
  onToggle,
}: {
  faq: Faq
  open: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        open
          ? 'border-accent/40 bg-white shadow-xl shadow-ink/5'
          : 'border-ink/10 bg-white/60 hover:border-ink/20 hover:bg-white'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left md:px-8"
      >
        <span
          className={`font-display text-base uppercase tracking-wide transition-colors duration-300 md:text-lg ${
            open ? 'text-accent' : 'text-ink'
          }`}
        >
          {faq.q}
        </span>
        {/* Plus that rotates into an × when open */}
        <span
          className={`relative h-4 w-4 shrink-0 transition-transform duration-300 ${
            open ? 'rotate-45' : ''
          }`}
        >
          <span
            className={`absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rounded-full transition-colors duration-300 ${
              open ? 'bg-accent' : 'bg-ink/70'
            }`}
          />
          <span
            className={`absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 rounded-full transition-colors duration-300 ${
              open ? 'bg-accent' : 'bg-ink/70'
            }`}
          />
        </span>
      </button>

      {/* Smooth height reveal via grid-rows animation */}
      <div
        className={`grid transition-all duration-300 ease-out motion-reduce:transition-none ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink/70 md:px-8">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FaqSection() {
  const [open, setOpen] = useState(0)

  return (
    <section className="theme-transition pop bg-cream py-24 md:py-28">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        {/* Heading */}
        <div className="text-center">
          <Eyebrow label="FAQ" tone="dark" center />

          <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.4rem)] uppercase leading-[0.9] text-ink">
            <span className="block">Frequently</span>
            <span className="flex flex-wrap items-baseline justify-center gap-x-[0.2em]">
              <span className="text-accent">asked</span>
              <span>Questions</span>
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-ink/70">
            Everything you need to know before you step aboard. Still have
            something on your mind? Give us a call, we&apos;re happy to help.
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-12 space-y-3">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={faq.q}
              faq={faq}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
