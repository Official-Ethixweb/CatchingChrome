import { ArrowUpRight, CartIcon } from './icons'
import { Eyebrow } from './Eyebrow'

type Product = {
  id: string
  tag: string
  name: string
  sub: string
  price: string
  image: string
  alt: string
  /** Deep link to this exact product on the Envy Prints storefront. */
  href: string
}

// Ryan's live storefront (Envy Prints).
const STORE_URL =
  'https://envy-prints.com/collections/catching-chrome-guide-service'

/**
 * The four products Ryan actually sells. Names, prices and photos were read
 * off the storefront's own product JSON rather than written here by hand —
 * these cards quote a price and then take the visitor to a checkout, so an
 * invented one is a promise the store won't honour. If a price moves on Envy
 * Prints, it has to be moved here too.
 */
const PRODUCTS: Product[] = [
  {
    id: 'sweatshirt',
    tag: 'APPAREL',
    name: 'Sweatshirt',
    sub: 'Athletic Heather Grey · S–3XL',
    price: '$35',
    image: '/merch/sweatshirt.png',
    alt: 'Athletic heather grey Catching Chrome crewneck sweatshirt with the chrome logo across the chest',
    href: 'https://envy-prints.com/products/template-sweatshirt',
  },
  {
    id: 'long-sleeve',
    tag: 'APPAREL',
    name: 'Long Sleeve',
    sub: 'Black · S–3XL',
    price: '$28',
    image: '/merch/long-sleeve.png',
    alt: 'Black Catching Chrome long sleeve tee with a chest logo and a sleeve print',
    href: 'https://envy-prints.com/products/template-long-sleeve',
  },
  {
    // One product spanning hoodie / tee / onesie variants, $20–$25 — hence
    // "From $20" rather than a single figure.
    id: 'youth',
    tag: 'YOUTH',
    name: 'Youth Apparel',
    sub: 'Black · Hoodie, Tee or Onesie',
    price: 'From $20',
    image: '/merch/youth-apparel.png',
    alt: 'Black Catching Chrome baby onesie with the round salmon logo',
    href: 'https://envy-prints.com/products/template-onesie?variant=62536677032307',
  },
  {
    id: 'sticker',
    tag: 'GEAR',
    name: 'Logo Sticker',
    sub: '4"×4" or 5"×1"',
    price: '$5',
    image: '/merch/sticker.png',
    alt: 'Catching Chrome Guide Service die-cut sticker showing a leaping salmon',
    href: 'https://envy-prints.com/products/template-sticker',
  },
]

function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href={product.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Shop the ${product.name} at the Catching Chrome store`}
      className="group flex flex-col rounded-sm border border-cream/10 bg-cream/[0.03] p-3 transition-colors duration-300 hover:border-accent/60 sm:p-4"
    >
      {/* Product visual.
          The tile is white because the storefront shoots every product on
          white — the photo's backdrop then disappears into it and the garment
          is all you see. The old dark gradient panel can't work here: these
          are photographs, not the line-art it was built for, and any blend
          that hides a white backdrop against a dark panel also crushes the
          grey sweatshirt to near-black. */}
      <div className="relative flex aspect-[4/4.4] items-center justify-center overflow-hidden rounded-sm bg-white">
        <span className="absolute left-3 top-3 z-10 text-[10px] font-semibold tracking-[0.25em] text-ink/40">
          {product.tag}
        </span>
        <img
          src={product.image}
          alt={product.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
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
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
