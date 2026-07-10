import { QuoteIcon } from './icons'
import ScrollStack, { ScrollStackItem } from './ScrollStack'

type Testimonial = {
  quote: string
  author: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      '"One of the best guides in Oregon. Ryan is your guy hands down. One of the best people I know."',
    author: 'KEEP_UPWITHJEN',
  },
  {
    quote:
      '"We hooked up early and caught our limits. My son lost three fish and was worried he\'d go home empty-handed. Ryan reassured us that at tide change we\'d get another chance. Ryan was right — Randy ended up catching the biggest fish, weighing in at 29 lb."',
    author: 'KATIE HEMINGWAY',
  },
  {
    quote:
      '"The perfect day on the water. Everything from the gear to the boat was top notch. Captain Ryan put us on the fish immediately and kept us there all day."',
    author: 'MARK TOMLINSON',
  },
  {
    quote:
      '"An unforgettable experience! If you want to catch big fish and have a great time doing it, Catching Chrome is the only way to go."',
    author: 'SARAH JENKINS',
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-paper py-24 md:py-28 relative z-10">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-accent">07</span>
          <span className="h-px w-10 bg-ink/30" />
          <span className="text-[12px] font-medium tracking-[0.3em] text-ink/70">
            CLIENT LOG
          </span>
        </div>

        {/* Headline */}
        <h2 className="mt-6 font-display text-[clamp(2.75rem,5.5vw,4.8rem)] uppercase leading-[0.9] text-ink">
          <span className="flex items-baseline gap-[0.22em]">
            <span>In Their</span>
            <span className="text-accent">own</span>
          </span>
          <span className="block">Words</span>
        </h2>
      </div>

      {/* Scroll Stack Testimonials */}
      <div className="mt-8">
        <ScrollStack useWindowScroll={true} itemDistance={50} stackPosition="15%" scaleEndPosition="10%">
          {TESTIMONIALS.map((t, i) => (
            <ScrollStackItem 
              key={i} 
              itemClassName="bg-white px-6 py-12 md:p-12 shadow-2xl rounded-[2.5rem] w-full max-w-2xl mx-auto flex flex-col items-center justify-center"
            >
              <figure className="text-center w-full">
                <QuoteIcon className="mx-auto h-10 w-10 text-accent opacity-50" />
                <blockquote className="mt-6 text-xl leading-relaxed text-ink/90 md:text-[1.6rem] md:leading-relaxed font-medium">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-10 flex items-center justify-center gap-4">
                  <span className="h-px w-10 bg-accent" />
                  <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-ink/70">
                    {t.author}
                  </span>
                </figcaption>
              </figure>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  )
}
