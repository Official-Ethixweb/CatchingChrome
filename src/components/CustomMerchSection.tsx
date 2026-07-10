import { useEffect, useRef } from 'react'
import { ArrowUpRight } from './icons'
import Folder from './Folder'

export function CustomMerchSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const markRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const mark = markRef.current
    if (!section || !mark) return

    // Respect reduced-motion: leave the watermark static.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const AMPLITUDE = 420 // px the watermark travels across a full pass
    let raf = 0

    const update = () => {
      raf = 0
      const rect = section.getBoundingClientRect()
      const winH = window.innerHeight || 1
      // -1 (section well below) .. +1 (section well above the viewport)
      const progress = (rect.top + rect.height / 2 - winH / 2) / winH
      const x = -progress * AMPLITUDE
      mark.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`
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
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-night py-28 md:py-36"
    >
      {/* Scroll-driven background watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <div
          ref={markRef}
          className="whitespace-nowrap font-display uppercase leading-none text-cream/[0.04] will-change-transform"
          style={{ fontSize: '18vw', transition: 'transform 0.1s linear' }}
        >
          CUSTOM · CUSTOM · CUSTOM · CUSTOM
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-2 lg:gap-20">
        {/* Left: Asset */}
        <div className="flex flex-col items-center justify-center lg:items-end lg:pr-12 order-2 lg:order-1">
          <div className="flex flex-col items-center lg:-translate-x-[150px] lg:translate-y-[90px]">
            <Folder
              size={1.5}
              color="#1e293b"
              items={[
                <div key="1" className="h-full w-full bg-slate-100 rounded flex items-center justify-center text-xs text-slate-500 font-semibold uppercase tracking-wider">Caps</div>,
                <div key="2" className="h-full w-full bg-slate-100 rounded flex items-center justify-center text-xs text-slate-500 font-semibold uppercase tracking-wider">Tees</div>,
                <div key="3" className="h-full w-full bg-slate-100 rounded flex items-center justify-center text-xs text-slate-500 font-semibold uppercase tracking-wider">Hoodies</div>
              ]}
            />
            <span className="mt-8 text-[11px] font-semibold tracking-[0.2em] text-cream/40 uppercase">
              Click to Open
            </span>
          </div>
        </div>

        {/* Right: Main text */}
        <div className="order-1 lg:order-2">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-accent">02</span>
            <span className="h-px w-10 bg-cream/25" />
            <span className="text-[12px] font-medium tracking-[0.3em] text-cream/50">
              CUSTOM MERCH
            </span>
          </div>

          <h2 className="mt-6 font-display text-[clamp(2.2rem,5.1vw,4.8rem)] uppercase leading-[0.86] text-cream">
            <span className="block">Create Your</span>
            <span className="flex items-baseline gap-[0.14em]">
              <span>Custom</span>
              <span className="text-accent">merch</span>
            </span>
          </h2>

          <p className="mt-8 max-w-lg text-lg leading-relaxed text-cream/60">
            Bring your ideas to life with high-quality custom merchandise
            tailored to your brand or personal style from apparel to promo
            products, quick and hassle-free.
          </p>

          <a
            href="#"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink transition-all duration-200 hover:brightness-110"
          >
            Start Designing
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
