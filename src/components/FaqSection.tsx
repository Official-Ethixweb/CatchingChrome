import { useState } from 'react'
import { ArrowUpRight } from './icons'

type Faq = {
 q: string
 a: string
}

const FAQS: Faq[] = [
 {
 q:"What's included in a guided trip?",
 a: 'All rods, reels, tackle, bait, and safety gear are provided, along with cleaning and bagging of your catch. Just bring weather-appropriate clothing, a valid fishing license, and any food or drinks you want for the day.',
 },
 {
 q: 'Do I need a fishing license?',
 a: 'Yes every angler must carry a valid Oregon (or Washington, depending on the water) license with the appropriate tags. We are happy to point you to the nearest vendor or the online portal before your trip.',
 },
 {
 q: 'What should I bring?',
 a: 'Dress in layers for the weather and bring polarized sunglasses, a hat, sunscreen, and rain gear in the cooler months. Non-slip footwear and a cooler for your catch are strongly recommended.',
 },
 {
 q: 'How many people can join a trip?',
 a: 'Our flagship 22-ft sled comfortably fishes up to four anglers, while the 18-ft Clackacraft is ideal for groups of three. Larger parties can be split across multiple boats just ask when you book.',
 },
 {
 q:"What's your cancellation policy?",
 a: 'A deposit reserves your date. Cancellations made seven or more days out are fully refundable or reschedulable. Weather calls are made by the captain safety first and always come with a rain check.',
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
 <div className="border-t border-cream/10">
 <button
 type="button"
 onClick={onToggle}
 aria-expanded={open}
 className="flex w-full items-center justify-between gap-6 py-6 text-left"
 >
 <span className="font-display text-lg uppercase tracking-wide text-cream md:text-xl">
 {faq.q}
 </span>
 <span className="relative h-4 w-4 shrink-0">
 <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-accent" />
 <span
 className={`absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-accent transition-transform duration-300 ${
 open ? 'scale-y-0' : 'scale-y-100'
 }`}
 />
 </span>
 </button>
 <div
 className={`grid transition-all duration-300 ${
 open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
 }`}
 >
 <div className="overflow-hidden">
 <p className="max-w-xl pb-6 text-[15px] leading-relaxed text-cream/55">
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
 <section className="bg-night py-24 md:py-28">
 <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-start gap-12 px-6 md:px-10 lg:grid-cols-2 lg:gap-20">
 {/* Left heading */}
 <div>
 <div className="flex items-center gap-4">
 <span className="text-sm font-semibold text-accent">08</span>
 <span className="h-px w-10 bg-cream/25" />
 <span className="text-[12px] font-medium tracking-[0.3em] text-cream/50">
 FAQ
 </span>
 </div>

 <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.4rem)] uppercase leading-[0.9] text-cream">
 <span className="block">Frequently</span>
 <span className="flex items-baseline gap-[0.2em]">
 <span className="text-accent">
 asked
 </span>
 <span>Questions</span>
 </span>
 </h2>

 <p className="mt-8 max-w-md text-[17px] leading-relaxed text-cream/60">
 Everything you need to know before you step aboard. Still have
 something on your mind? We&apos;re a call away.
 </p>

 <a
 href="#"
 className="group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink transition-all duration-200 hover:brightness-110"
 >
 Get in Touch
 <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
 </a>
 </div>

 {/* Right accordion */}
 <div className="border-b border-cream/10">
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
