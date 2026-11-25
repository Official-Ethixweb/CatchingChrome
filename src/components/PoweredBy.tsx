/**
 * "Powered by Ethixweb" credit for dark surfaces (the footer).
 * Quiet by default, full strength on hover. rel="nofollow": Google treats
 * site-wide footer links as a pattern to avoid, so this keeps both sites safe.
 */
export function PoweredBy({ className = '' }: { className?: string }) {
  const h = 11
  const w = Math.round((690 / 96) * h)
  return (
    <a
      href="https://www.ethixweb.com/"
      target="_blank"
      rel="noopener nofollow"
      aria-label="Powered by Ethixweb (opens in a new tab)"
      className={`inline-flex items-center gap-2.5 text-cream opacity-60 transition-opacity duration-300 hover:opacity-100 rounded-sm focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${className}`}
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
        Powered by
      </span>
      <img
        src="/brand/ethixweb-white.png"
        alt="Ethixweb"
        width={w}
        height={h}
        loading="lazy"
        decoding="async"
        className="translate-y-[0.5px]"
        style={{ width: w, height: h }}
      />
    </a>
  )
}
