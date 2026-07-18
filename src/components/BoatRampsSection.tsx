import { useState } from 'react'
import { MapPinIcon } from './icons'
import { Eyebrow } from './Eyebrow'

type LaunchPoint = {
  id: string
  name: string
  /** Present only where Ryan supplied a fix. Absent is normal, not a gap to fill. */
  lat?: number
  lng?: number
}

/**
 * Ryan's launch points, exactly as he listed them.
 *
 * Eight carry coordinates he provided; the other eleven don't, and they are
 * deliberately left without. Guessing a lat/lng would put a customer at the
 * wrong ramp at 4am with a boat on the trailer, so those embed as a Google
 * Maps *name* query instead and let Google resolve the pin — see `mapQuery`.
 */
const LAUNCH_POINTS: LaunchPoint[] = [
  { id: 'garibaldi', name: 'Garibaldi Marina', lat: 45.5584, lng: -123.9133 },
  { id: 'memaloose', name: 'Memaloose Point Boat Launch' },
  { id: 'mayer', name: 'Mayer State Park', lat: 45.6756, lng: -121.4453 },
  { id: 'hood-river', name: 'Hood River Boat Launch', lat: 45.7123, lng: -121.5175 },
  { id: 'fishery', name: 'The Fishery Marina' },
  { id: 'hamilton', name: 'Hamilton Island Boat Ramp', lat: 45.6355, lng: -122.0097 },
  { id: 'beacon-rock', name: 'Beacon Rock Boat Launch' },
  { id: 'cedaroak', name: 'Cedaroak Boat Ramp' },
  { id: 'sportcraft', name: 'Sportcraft Landing Moorage', lat: 45.3573, lng: -122.612 },
  { id: 'willamette-park', name: 'Willamette Park', lat: 45.4641, lng: -122.6757 },
  { id: 'chinook-landing', name: 'Chinook Landing' },
  { id: 'gleason', name: 'M. James Gleason Memorial Boat Ramp' },
  { id: 'cathedral', name: 'Cathedral City Park' },
  { id: 'freds', name: 'Freds Marina', lat: 45.6217, lng: -122.7872 },
  { id: 'scappoose', name: 'Scappoose Bay Kayaking', lat: 45.8036, lng: -122.8389 },
  { id: 'st-helens', name: 'St Helens Boat Ramp' },
  { id: 'kalama', name: 'Kalama Boat Ramp' },
  { id: 'rainier', name: 'City of Rainier Boat Launch' },
  { id: 'warrenton', name: 'Warrenton Marina' },
]

const hasFix = (p: LaunchPoint): p is LaunchPoint & { lat: number; lng: number } =>
  p.lat != null && p.lng != null

/** "45.5584, -123.9133" where known, otherwise the ramp's name for Google to find. */
function mapQuery(p: LaunchPoint): string {
  return hasFix(p) ? `${p.lat},${p.lng}` : p.name
}

/** 45.5584 → "45.56°N", -123.9133 → "123.91°W". */
function formatCoords(p: LaunchPoint): string | null {
  if (!hasFix(p)) return null
  const ns = `${Math.abs(p.lat).toFixed(2)}°${p.lat >= 0 ? 'N' : 'S'}`
  const ew = `${Math.abs(p.lng).toFixed(2)}°${p.lng >= 0 ? 'E' : 'W'}`
  return `${ns} ${ew}`
}

const TEAL_RIVER =
 'M-10 240 C 120 200 230 258 350 262 C 470 266 560 322 690 340 C 725 345 760 346 775 347'
const GREY_RIVER =
 'M-10 253 C 120 213 230 271 350 275 C 470 279 560 335 690 353 C 725 358 760 359 775 360'

export function BoatRampsSection() {
 const [selected, setSelected] = useState(LAUNCH_POINTS[0].id)
 const activeRamp = LAUNCH_POINTS.find((p) => p.id === selected)
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
 <h2 className="mt-5 flex flex-wrap items-baseline gap-x-[0.16em] font-display text-[clamp(2.25rem,6vw,5.2rem)] uppercase leading-[0.9] text-cream">
 <span>Boat</span>
 <span className="text-accent">
 ramps
 </span>
 </h2>

 {/* Grid */}
 <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-3 lg:gap-14">
 {/* Launch point list. Nineteen ramps is taller than the map beside it, so
     the list scrolls in its own track rather than stretching the section. */}
 <ul className="max-h-[360px] divide-y divide-cream/10 overflow-y-auto border-y border-cream/10 pr-1 lg:col-span-1 lg:max-h-[500px]">
 {LAUNCH_POINTS.map((p) => {
 const active = p.id === selected
 const coords = formatCoords(p)
 return (
 <li key={p.id}>
 <button
 type="button"
 onClick={() => selectRamp(p.id)}
 aria-pressed={active}
 className="group flex w-full items-center justify-between gap-3 py-4 pr-2 text-left"
 >
 <div className="min-w-0">
 <div
 className={`font-display text-base uppercase leading-tight tracking-wide transition-colors duration-200 sm:text-lg ${
 active
 ? 'text-accent'
 : 'text-cream group-hover:text-cream/70'
 }`}
 >
 {p.name}
 </div>
 {coords && (
 <div className="mt-1 text-[11px] tracking-[0.15em] text-cream/70">
 {coords}
 </div>
 )}
 </div>
 <MapPinIcon
 className={`h-5 w-5 shrink-0 transition-colors duration-200 ${
 active ? 'text-accent' : 'text-cream/70'
 }`}
 />
 </button>
 </li>
 )
 })}
 </ul>

 {/* Actual map */}
 <div className="relative overflow-hidden rounded-sm border border-cream/10 bg-[#06181a] lg:col-span-2 h-[400px] lg:h-[500px]">
   {/* Only the chosen ramp is mounted. The previous version stacked every
       ramp's iframe and crossfaded between them, which was affordable at six
       and is not at nineteen — that would be nineteen Google Maps embeds
       booting on one page. */}
   {activeRamp && (
     <iframe
       key={activeRamp.id}
       className="gal-fade absolute inset-0 h-full w-full border-0"
       style={{
         filter:
           'invert(100%) hue-rotate(180deg) sepia(20%) saturate(120%) brightness(70%) contrast(110%) hue-rotate(-10deg)',
         pointerEvents: mapActive ? 'auto' : 'none',
       }}
       src={`https://maps.google.com/maps?q=${encodeURIComponent(
         mapQuery(activeRamp),
       )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
       allowFullScreen
       loading="lazy"
       referrerPolicy="no-referrer-when-downgrade"
       title={`Map showing ${activeRamp.name}`}
     />
   )}

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
