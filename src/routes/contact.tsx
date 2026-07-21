import { createFileRoute } from '@tanstack/react-router'
import { SiteHeader } from '~/components/SiteHeader'
import { SiteFooter } from '~/components/SiteFooter'
import { useState } from 'react'
import { PhoneIcon, MapPinIcon } from '~/components/icons'
import { SOCIALS } from '~/lib/socials'
import { Eyebrow } from '~/components/Eyebrow'
import { sendContactEnquiry } from '~/lib/contact'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

function ContactHeader() {
  return (
    <section className="relative h-[45vh] min-h-[300px] w-full overflow-hidden bg-ink">
      {/* Background image matching the forest backdrop */}
      <div className="absolute inset-0">
        <img
          src="/nature-forest.webp"
          alt="Forest backdrop"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-40"
        />
        {/* Dark overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/50 to-ink" />
      </div>

      <SiteHeader />

      {/* Centered content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-wider text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
          Contact
        </h1>
        <div className="mt-3 flex items-center justify-center gap-3">
          <span className="h-px w-6 bg-accent" />
          <p className="text-[11px] sm:text-[12px] text-cream/70 font-semibold tracking-[0.25em] uppercase">
            Let's get you on the water
          </p>
          <span className="h-px w-6 bg-accent" />
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [failed, setFailed] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tripType: 'Salmon',
    groupSize: '2',
    message: '',
  })

  /**
   * If delivery fails there is still a real person on the other end, so the
   * error branch hands the guest a mail link with everything they just typed
   * already in it. Losing the enquiry is the one outcome worth engineering
   * against.
   */
  const mailtoFallback = (() => {
    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Trip interest: ${formData.tripType}`,
      `Group size: ${formData.groupSize}`,
      '',
      formData.message,
    ].join('\n')
    return `mailto:ryanbfishin@gmail.com?subject=${encodeURIComponent(
      `Trip enquiry from ${formData.name}`,
    )}&body=${encodeURIComponent(body)}`
  })()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (sending) return
    setSending(true)
    setFailed(false)
    try {
      const res = await sendContactEnquiry({ data: formData })
      if (res.ok) setSubmitted(true)
      else setFailed(true)
    } catch {
      setFailed(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="relative overflow-hidden bg-ink py-20 md:py-28">
      {/* Decorative background grid/lines */}
      <div className="hero-lines absolute inset-0 pointer-events-none opacity-40" />

      {/* Glow effects */}
      <div className="absolute -left-64 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute -right-64 top-1/3 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left Column: Direct Info */}
          <div className="flex flex-col justify-center">
            <Eyebrow label="Get In Touch" tone="light" />

            {/* Heading */}
            <h2 className="mt-6 font-display text-[clamp(2.75rem,5.5vw,4.8rem)] uppercase leading-[0.9] text-cream">
              <span className="block">Plan Your</span>
              <span className="block text-accent">excursion</span>
            </h2>

            <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-cream/70">
              Have questions about run seasons, current conditions, group sizing, or custom multi-boat charters? Feel free to reach out using the form, or contact Captain Ryan directly by phone or email. We are happy to walk you through everything you need to know.
            </p>

            {/* Direct Details Grid */}
            <div className="mt-10 space-y-6">
              {/* Phone */}
              <a
                href="tel:5039369090"
                className="group flex items-center gap-4 text-base text-cream/80 hover:text-cream transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/10 bg-white/[0.02] text-accent transition-all group-hover:border-accent group-hover:bg-accent/5">
                  <PhoneIcon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-cream/70">Call Captain Ryan</div>
                  <div className="font-medium mt-0.5 transition-colors group-hover:text-accent">(503) 936-9090</div>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:ryanbfishin@gmail.com"
                className="group flex items-center gap-4 text-base text-cream/80 hover:text-cream transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/10 bg-white/[0.02] text-accent transition-all group-hover:border-accent group-hover:bg-accent/5">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-cream/70">Email Us</div>
                  <div className="font-medium mt-0.5 transition-colors group-hover:text-accent">ryanbfishin@gmail.com</div>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 text-base text-cream/80">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/10 bg-white/[0.02] text-accent">
                  <MapPinIcon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-cream/70">Home Port & Waters</div>
                  <div className="font-medium mt-0.5">Columbia River & Coastal Streams, Oregon</div>
                </div>
              </div>
            </div>

            {/* Social Accounts */}
            <div className="mt-10 border-t border-cream/10 pt-8">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cream/70">Follow Captain Ryan</span>
              <div className="mt-4 flex items-center gap-3">
                {SOCIALS.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    {...(href !== '#' && {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    })}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 bg-white/[0.02] text-cream/70 transition-all hover:border-accent hover:bg-accent hover:text-ink"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form Container */}
          <div>
            <div className="relative rounded-sm border border-cream/10 bg-white/[0.02] p-6 md:p-8 backdrop-blur-sm shadow-2xl">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-16">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      className="h-8 w-8 animate-pulse"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="mt-6 font-display text-2xl uppercase tracking-wide text-cream">Message Sent!</h3>
                  <p className="mt-3 max-w-sm text-sm text-cream/70 leading-relaxed">
                    Thanks for reaching out, {formData.name}. Captain Ryan will review your request and get back to you via email or phone within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: '', email: '', phone: '', tripType: 'Salmon', groupSize: '2', message: '' })
                    }}
                    className="btn-outline-cta mt-8 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em]"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-lg uppercase tracking-wide text-cream mb-6">
                    Request a Trip / Ask a Question
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-[11px] font-bold uppercase tracking-wider text-cream/70 mb-2"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          className="w-full bg-white/[0.03] border border-cream/10 rounded-sm px-4 py-3 text-cream placeholder-cream/30 focus:outline-none focus:border-accent focus:bg-white/[0.06] transition-all text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-[11px] font-bold uppercase tracking-wider text-cream/70 mb-2"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          className="w-full bg-white/[0.03] border border-cream/10 rounded-sm px-4 py-3 text-cream placeholder-cream/30 focus:outline-none focus:border-accent focus:bg-white/[0.06] transition-all text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-[11px] font-bold uppercase tracking-wider text-cream/70 mb-2"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(503) 555-0199"
                          className="w-full bg-white/[0.03] border border-cream/10 rounded-sm px-4 py-3 text-cream placeholder-cream/30 focus:outline-none focus:border-accent focus:bg-white/[0.06] transition-all text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="tripType"
                          className="block text-[11px] font-bold uppercase tracking-wider text-cream/70 mb-2"
                        >
                          Trip Interest
                        </label>
                        <select
                          id="tripType"
                          value={formData.tripType}
                          onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
                          className="w-full bg-[#0E2A3B] border border-cream/10 rounded-sm px-4 py-3 text-cream/80 focus:outline-none focus:border-accent focus:bg-white/[0.06] transition-all text-sm"
                        >
                          <option value="Salmon">Salmon Fishing (Peak: Spring/Fall)</option>
                          <option value="Steelhead">Steelhead (Peak: Winter/Summer)</option>
                          <option value="Shad">Shad & Crabbing (Family Action)</option>
                          <option value="Other">Custom Excursion / Charter</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="groupSize"
                        className="block text-[11px] font-bold uppercase tracking-wider text-cream/70 mb-2"
                      >
                        Group Size
                      </label>
                      <div className="flex gap-2 sm:gap-3">
                        {['1', '2', '3', '4', '5+'].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setFormData({ ...formData, groupSize: num })}
                            className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-sm border transition-all ${
                              formData.groupSize === num
                                ? 'border-cta bg-cta text-ink'
                                : 'border-cream/10 bg-white/[0.02] text-cream/70 hover:border-cream/20'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-[11px] font-bold uppercase tracking-wider text-cream/70 mb-2"
                      >
                        Preferred Dates or Message
                        <span className="text-cream/30 font-normal lowercase ml-1">(optional)</span>
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Let us know when you'd like to fish and if you have any questions..."
                        className="w-full bg-white/[0.03] border border-cream/10 rounded-sm px-4 py-3 text-cream placeholder-cream/30 focus:outline-none focus:border-accent focus:bg-white/[0.06] transition-all text-sm resize-none"
                      />
                    </div>

                    {failed && (
                      <div
                        role="alert"
                        className="rounded-sm border border-accent/40 bg-accent/5 p-4 text-sm leading-relaxed text-cream/80"
                      >
                        <strong className="block font-semibold text-cream">
                          That didn&apos;t send.
                        </strong>
                        <p className="mt-1 text-cream/70">
                          Nothing you typed is lost. Send it straight to Ryan
                          instead, or call him. He answers the phone.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2.5">
                          <a
                            href={mailtoFallback}
                            className="btn-outline-cta px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em]"
                          >
                            Email It
                          </a>
                          <a
                            href="tel:5039369090"
                            className="btn-outline-cta px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em]"
                          >
                            (503) 936-9090
                          </a>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={sending}
                      aria-busy={sending}
                      className="btn-primary group w-full inline-flex items-center justify-center gap-2 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {sending ? 'Sending…' : 'Send Message'}
                      {!sending && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        >
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactPage() {
  return (
    <>
      <ContactHeader />
      <main>
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
