import type { ComponentType, SVGProps } from 'react'
import { ArrowUpRight, CartIcon } from './icons'
import { Eyebrow } from './Eyebrow'

type Product = {
  index: string
  tag: string
  name: string
  sub: string
  price: string
  Art: ComponentType<SVGProps<SVGSVGElement>>
}

function TeeArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Body */}
      <path d="M38 32c2 8 8 12 22 12s20-4 22-12l20 10-7 16-11-4v42H36V54l-11 4-7-16Z" />
      {/* Collar */}
      <path d="M46 34c3 5 25 5 28 0" opacity={0.4} />
      {/* Chest print */}
      <g className="text-accent" stroke="currentColor">
        <path d="M49 68c6-6 16-6 22 0-6 6-16 6-22 0Z" />
        <path d="m71 68 7-5-2.5 5 2.5 5Z" />
      </g>
    </svg>
  )
}

function HoodieArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Body */}
      <path d="M44 34c2 6 6 9 16 9s14-3 16-9l22 10-7 16-11-4v46H40V56l-11 4-7-16Z" />
      {/* Hood */}
      <path d="M44 34a16 12 0 0 1 32 0" />
      {/* Drawstrings */}
      <path d="M56 45v8M64 45v8" opacity={0.5} />
      {/* Kangaroo pocket */}
      <path d="M46 102V89l5-5h18l5 5v13" opacity={0.5} />
      {/* Chest print */}
      <g className="text-accent" stroke="currentColor">
        <path d="M51 68c5-5 13-5 18 0-5 5-13 5-18 0Z" />
        <path d="m69 68 6-4-2 4 2 4Z" />
      </g>
    </svg>
  )
}

function CapArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Crown */}
      <path d="M30 62a30 28 0 0 1 60 0v4H30Z" />
      {/* Panel seams */}
      <path d="M60 34v28M44 39c-5 8-6 15-6 23M76 39c5 8 6 15 6 23" opacity={0.4} />
      {/* Button */}
      <circle cx="60" cy="33" r="2" />
      {/* Brim */}
      <path d="M26 66h68c-6 13-62 13-68 0Z" />
      {/* Front mark */}
      <g className="text-accent" stroke="currentColor">
        <path d="M52 52c4.5-4.5 11.5-4.5 16 0-4.5 4.5-11.5 4.5-16 0Z" />
        <path d="m68 52 5.5-3.5-2 3.5 2 3.5Z" />
      </g>
    </svg>
  )
}

function ToteArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Handle */}
      <path d="M45 42a15 17 0 0 1 30 0" />
      {/* Bag */}
      <path d="M32 42h56l6 56H26Z" />
      {/* Hem */}
      <path d="M31 52h58" opacity={0.4} />
      {/* Print */}
      <g className="text-accent" stroke="currentColor">
        <path d="M46 72c7-7 21-7 28 0-7 7-21 7-28 0Z" />
        <path d="m74 72 8-6-3 6 3 6Z" />
      </g>
      {/* Water line */}
      <path d="M48 86c4 3 8 3 12 0s8-3 12 0" opacity={0.4} />
    </svg>
  )
}

// Ryan's live storefront (Envy Prints). Products link out to the collection.
const STORE_URL =
  'https://envy-prints.com/collections/catching-chrome-guide-service'

const PRODUCTS: Product[] = [
  {
    index: '01',
    tag: 'APPAREL',
    name: 'Chrome Chaser Tee',
    sub: 'Bone White · Unisex',
    price: '$34',
    Art: TeeArt,
  },
  {
    index: '02',
    tag: 'APPAREL',
    name: 'First Light Hoodie',
    sub: 'Steel Navy · Heavyweight',
    price: '$62',
    Art: HoodieArt,
  },
  {
    index: '03',
    tag: 'HEADWEAR',
    name: 'River Guide Cap',
    sub: 'Charcoal · Adjustable',
    price: '$28',
    Art: CapArt,
  },
  {
    index: '04',
    tag: 'GEAR',
    name: 'Deck Hand Tote',
    sub: 'Waxed Canvas · 20 L',
    price: '$38',
    Art: ToteArt,
  },
]

function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href={STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Shop ${product.name} at the Catching Chrome store`}
      className="group flex flex-col rounded-sm border border-cream/10 bg-cream/[0.03] p-3 transition-colors duration-300 hover:border-accent/60 sm:p-4"
    >
      {/* Product visual */}
      <div className="portrait-gradient relative flex aspect-[4/4.4] items-center justify-center overflow-hidden rounded-sm">
        <span className="absolute left-3 top-3 text-[10px] font-semibold tracking-[0.25em] text-cream/45">
          {product.tag}
        </span>
        <product.Art
          aria-hidden="true"
          className="w-3/4 max-w-[190px] text-cream/80 transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Name + colorway */}
      <div className="flex-1 pt-4">
        <h3 className="font-display text-lg uppercase leading-tight text-cream sm:text-xl">
          {product.name}
        </h3>
        <p className="mt-1.5 text-[12px] tracking-[0.06em] text-cream/45">
          {product.sub}
        </p>
      </div>

      {/* Price + cart */}
      <div className="mt-4 flex items-center justify-between border-t border-cream/10 pt-3.5">
        <span className="text-[15px] font-semibold text-accent">
          {product.price}
        </span>
        <span
          aria-hidden="true"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-ink transition-all duration-200 group-hover:brightness-110"
        >
          <CartIcon className="h-4 w-4" />
        </span>
      </div>
    </a>
  )
}

export function CustomMerchSection() {
  return (
    <section
      id="merch"
      data-chapter="dark"
      className="theme-invert relative overflow-hidden bg-ink py-28 md:py-36"
    >
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Left rail: section text */}
          <div className="flex flex-col justify-center lg:col-span-4 xl:col-span-3">
            <Eyebrow label="Custom Merch" tone="light" />

            <h2 className="mt-6 font-display text-[clamp(2.2rem,3.4vw,3.3rem)] uppercase leading-[0.9] text-cream">
              <span className="block">Create Your</span>
              <span className="block">Custom</span>
              <span className="block text-accent">merch</span>
            </h2>

            <p className="mt-7 max-w-lg text-[16px] leading-relaxed text-cream/60">
              Bring your ideas to life with high-quality custom merchandise
              tailored to your brand or personal style from apparel to promo
              products, quick and hassle-free.
            </p>

            <a
              href={STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group mt-8 inline-flex items-center gap-2 self-start px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em]"
            >
              Shop the Collection
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Right: product cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:col-span-8 xl:col-span-9 xl:grid-cols-4">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.index} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
