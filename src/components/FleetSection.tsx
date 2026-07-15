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
 image: string
 alt: string
 specs: Spec[]
}

const VESSELS: Vessel[] = [
 {
 tag: 'FLAGSHIP',
 featured: true,
 title: '22-FT River Wild Sled',
 body: 'Our flagship sled seats up to 4 anglers with ample gear and cooler space. State-of-the-art electronics for finding fish in any water.',
 image: '/22ft%20boat%202.jpg',
 alt: 'The 22-foot Catching Chrome River Wild sled on the water, rigged with a Yamaha 150 and a landing net',
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
 image: '/18ft%20boat.png',
 alt: 'The 18-foot Clackacraft drift boat moored on a river bank, with salmon artwork along the hull',
 specs: [
 { icon: UsersIcon, label: '3 PASSENGERS' },
 { icon: RulerIcon, label: '18 FEET' },
 { icon: AnchorIcon, label: 'SHALLOW DRAFT' },
 { icon: MoveIcon, label: 'WALK-AROUND' },
 ],
 },
]

function VesselCard({ vessel }: { vessel: Vessel }) {
 return (
 <article
 className="card-glow group flex flex-col overflow-hidden rounded-2xl border border-ink/12 bg-white p-6 md:p-8"
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

 {/* Vessel photo. 2:1 matches both boats' own framing, so the crop stays
 off the hull. The glare rides a pseudo-element overlay above it. */}
 <div className="fleet-glare relative mt-6 aspect-[2/1] overflow-hidden rounded-xl bg-ink">
 <img
 src={vessel.image}
 alt={vessel.alt}
 loading="lazy"
 decoding="async"
 className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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
 <div className="mt-5 grid grid-cols-2 gap-x-4 lg:gap-x-8">
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
