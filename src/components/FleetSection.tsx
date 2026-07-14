import type { ComponentType, SVGProps } from 'react'
import {
 AnchorIcon,
 BoltIcon,
 MoveIcon,
 RadarIcon,
 RulerIcon,
 UsersIcon,
} from './icons'
import { Eyebrow } from './Eyebrow'

type Spec = {
 icon: ComponentType<SVGProps<SVGSVGElement>>
 label: string
}

type Vessel = {
 tag: string
 featured: boolean
 title: string
 body: string
 specs: Spec[]
}

const VESSELS: Vessel[] = [
 {
 tag: 'FLAGSHIP',
 featured: true,
 title: '22-FT River Wild Sled',
 body: 'Our flagship sled seats up to 4 anglers with ample gear and cooler space. State-of-the-art electronics for finding fish in any water.',
 specs: [
 { icon: UsersIcon, label: '4 PASSENGERS' },
 { icon: RulerIcon, label: '22 FEET' },
 { icon: BoltIcon, label: '150 HP MOTOR' },
 { icon: RadarIcon, label: 'GARMIN LIVE SCOPE' },
 ],
 },
 {
 tag: 'SMALL-WATER',
 featured: false,
 title: '18-FT Clackacraft',
 body: 'Spacious Clackamax with walk-around seating for three. Ideal for winter steelhead, fall chinook, and coho on smaller rivers.',
 specs: [
 { icon: UsersIcon, label: '3 PASSENGERS' },
 { icon: RulerIcon, label: '18 FEET' },
 { icon: AnchorIcon, label: 'SHALLOW DRAFT' },
 { icon: MoveIcon, label: 'WALK-AROUND' },
 ],
 },
]

function BoatOutline(props: SVGProps<SVGSVGElement>) {
 return (
 <svg
 viewBox="0 0 400 150"
 fill="none"
 stroke="currentColor"
 strokeWidth={2}
 strokeLinecap="round"
 strokeLinejoin="round"
 {...props}
 >
 {/* Windshield / console */}
 <path d="M150 55 L192 55 L216 92 L120 92 Z" />
 {/* Hull */}
 <path d="M70 92 L330 92 L298 120 L102 120 Z" />
 {/* Waterline */}
 <line x1="48" y1="133" x2="352" y2="133" strokeDasharray="4 9" />
 </svg>
 )
}

function VesselCard({ vessel }: { vessel: Vessel }) {
 return (
 <article
 className={`card-glow group flex flex-col overflow-hidden rounded-2xl border bg-white p-6 md:p-8 ${
 vessel.featured ? 'border-accent/70' : 'border-ink/12'
 }`}
 >
 {/* Card head */}
 <div className="flex items-center gap-2.5">
 <span
 className={`h-1.5 w-1.5 rounded-full ${
 vessel.featured ? 'bg-accent' : 'bg-primary'
 }`}
 />
 <span
 className={`text-[11px] font-semibold uppercase tracking-[0.25em] ${
 vessel.featured ? 'text-accent' : 'text-primary'
 }`}
 >
 {vessel.tag}
 </span>
 </div>

 {/* Blueprint vessel panel */}
 <div className="relative mt-6 flex aspect-[5/2] items-center justify-center overflow-hidden rounded-xl">
 <div className="absolute inset-0 photo-gradient" />
 <div className="fleet-blueprint absolute inset-0" />
 <BoatOutline
 aria-hidden="true"
 className={`relative w-1/2 transition-transform duration-500 group-hover:scale-105 ${
 vessel.featured ? 'text-accent/80' : 'text-cream/75'
 }`}
 />
 </div>

 {/* Title + body */}
 <h3 className="mt-6 font-display text-3xl uppercase leading-none text-ink">
 {vessel.title}
 </h3>
 <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/55">
 {vessel.body}
 </p>

 {/* Specs */}
 <div className="mt-5 grid grid-cols-2 gap-x-8">
 {vessel.specs.map((spec) => (
 <div
 key={spec.label}
 className="flex items-center gap-2.5 border-t border-ink/10 py-3.5"
 >
 <spec.icon className="h-4 w-4 shrink-0 text-accent" />
 <span className="text-[12px] font-medium tracking-[0.1em] text-ink/70">
 {spec.label}
 </span>
 </div>
 ))}
 </div>
 </article>
 )
}

export function FleetSection() {
 return (
 <section className="theme-transition pop bg-cream py-24 md:py-28">
 <div className="mx-auto max-w-6xl px-6 md:px-10">
 <Eyebrow label="The Fleet" tone="dark" />

 {/* Headline */}
 <h2 className="mt-6 font-display text-[clamp(2.75rem,6vw,5.2rem)] uppercase leading-[0.9] text-ink">
 <span className="block">Premium Fishing</span>
 <span className="block leading-[0.9] text-accent">
 vessels
 </span>
 </h2>

 {/* Vessel cards */}
 <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
 {VESSELS.map((vessel) => (
 <VesselCard key={vessel.title} vessel={vessel} />
 ))}
 </div>
 </div>
 </section>
 )
}
