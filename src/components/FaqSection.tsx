import { useState } from 'react'
import { Eyebrow } from './Eyebrow'
import { FAQS, type Faq } from '~/lib/faqs'

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
    <section id="faq" className="theme-transition pop bg-cream py-24 md:py-28 scroll-mt-24">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        {/* Heading */}
        <div className="text-center">
          <Eyebrow label="FAQ" tone="dark" center />

          <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.4rem)] uppercase leading-[0.9] text-ink">
            <span className="block">Frequently</span>
            <span className="flex flex-wrap items-baseline justify-center gap-x-[0.2em]">
              <span className="accent-underline text-accent">asked</span>
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
