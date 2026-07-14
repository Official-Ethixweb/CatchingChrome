import { useState } from 'react'
import { MapPinIcon } from './icons'
import { Eyebrow } from './Eyebrow'

type LaunchPoint = {
 id: string
 name: string
 coords: string
 x: number
 y: number
}

const LAUNCH_POINTS: LaunchPoint[] = [
 { id: 'bonneville', name: 'Bonneville Dam', coords: '45.64°N 121.94°W', x: 45.6445, y: -121.9406 },
 { id: 'cascade', name: 'Cascade Locks', coords: '45.67°N 121.90°W', x: 45.6720, y: -121.8953 },
 { id: 'dalles', name: 'The Dalles', coords: '45.60°N 121.18°W', x: 45.6010, y: -121.1837 },
 { id: 'hood', name: 'Hood River', coords: '45.71°N 121.52°W', x: 45.7107, y: -121.5238 },
 { id: 'portland', name: 'Portland', coords: '45.52°N 122.68°W', x: 45.5152, y: -122.6784 },
 { id: 'astoria', name: 'Astoria', coords: '46.19°N 123.83°W', x: 46.1879, y: -123.8313 },
]

const TEAL_RIVER =
 'M-10 240 C 120 200 230 258 350 262 C 470 266 560 322 690 340 C 725 345 760 346 775 347'
const GREY_RIVER =
 'M-10 253 C 120 213 230 271 350 275 C 470 279 560 335 690 353 C 725 358 760 359 775 360'

export function BoatRampsSection() {
 const [selected, setSelected] = useState('bonneville')
 // The Google Maps iframe swallows the mouse wheel, which blocks page
 // scrolling when the cursor is over the map. Keep it inert until the user
 // clicks to interact, and re-lock it whenever they pick a different ramp.
 const [mapActive, setMapActive] = useState(false)

 const selectRamp = (id: string) => {
  setSelected(id)
  setMapActive(false)
 }

 return (
 <section data-chapter="dark" className="theme-invert pop bg-ink py-24 md:py-28">
 <div className="mx-auto max-w-[1440px] px-6 md:px-10">
 <Eyebrow label="Launch Points" tone="light" />

 {/* Headline */}
 <h2 className="mt-5 flex items-baseline gap-[0.16em] font-display text-[clamp(3rem,6vw,5.2rem)] uppercase leading-[0.9] text-cream">
 <span>Boat</span>
 <span className="text-accent">
 ramps
 </span>
 </h2>

 {/* Grid */}
 <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-3 lg:gap-14">
 {/* Launch point list */}
 <ul className="divide-y divide-cream/10 border-b border-cream/10 lg:col-span-1">
 {LAUNCH_POINTS.map((p) => {
 const active = p.id === selected
 return (
 <li key={p.id}>
 <button
 type="button"
 onClick={() => selectRamp(p.id)}
 className="group flex w-full items-center justify-between py-5 text-left"
 >
 <div>
 <div
 className={`font-display text-xl uppercase tracking-wide transition-colors duration-200 ${
 active
 ? 'text-accent'
 : 'text-cream group-hover:text-cream/70'
 }`}
 >
 {p.name}
 </div>
 <div className="mt-1 text-[12px] tracking-[0.15em] text-cream/40">
 {p.coords}
 </div>
 </div>
 <MapPinIcon
 className={`h-5 w-5 shrink-0 transition-colors duration-200 ${
 active ? 'text-accent' : 'text-cream/40'
 }`}
 />
 </button>
 </li>
 )
 })}
 </ul>

 {/* Actual map */}
 <div className="relative overflow-hidden rounded-sm border border-cream/10 bg-[#06181a] lg:col-span-2 h-[400px] lg:h-[500px]">
   {LAUNCH_POINTS.map((p) => {
     const active = p.id === selected
     return (
       <iframe
         key={p.id}
         className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-500 ease-in-out ${
           active ? 'opacity-100 z-10' : 'opacity-0 z-0'
         }`}
         style={{
           filter: 'invert(100%) hue-rotate(180deg) sepia(20%) saturate(120%) brightness(70%) contrast(110%) hue-rotate(-10deg)',
           pointerEvents: active && mapActive ? 'auto' : 'none'
         }}
         src={`https://maps.google.com/maps?q=${p.x},${p.y}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
         allowFullScreen
         loading={active ? "eager" : "lazy"}
         referrerPolicy="no-referrer-when-downgrade"
         title={`Map for ${p.name}`}
       />
     )
   })}

   {/* Click-to-activate overlay: lets the wheel scroll the page until the
       user opts into the map, so the page never gets "stuck" over the map. */}
   {!mapActive && (
     <button
       type="button"
       onClick={() => setMapActive(true)}
       aria-label="Activate map to zoom and pan"
       className="group absolute inset-0 z-20 flex items-end justify-center bg-transparent pb-6"
     >
       <span className="rounded-full bg-ink/75 px-4 py-2 text-[11px] font-medium tracking-[0.18em] text-cream/85 uppercase backdrop-blur-sm transition-colors duration-200 group-hover:bg-ink/90">
         Click to interact
       </span>
     </button>
   )}
 </div>
 </div>
 </div>
 </section>
 )
}
