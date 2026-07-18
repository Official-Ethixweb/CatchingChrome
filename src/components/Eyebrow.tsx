/**
 * Shared section eyebrow. Replaces the old "01 —— LABEL" markers with a single
 * consistent treatment across every section: a small accent dot + the tracked
 * uppercase label. `tone="light"` is for dark backgrounds (cream text),
 * `tone="dark"` is for light backgrounds (ink text).
 */
export function Eyebrow({
  label,
  tone = 'dark',
  center = false,
  className = '',
}: {
  label: string
  tone?: 'light' | 'dark'
  center?: boolean
  className?: string
}) {
  const labelColor = tone === 'light' ? 'text-cream/70' : 'text-ink/65'
  return (
    <div
      className={`flex items-center gap-3 ${center ? 'justify-center' : ''} ${className}`}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
      <span
        className={`text-[12px] font-semibold uppercase tracking-[0.3em] ${labelColor}`}
      >
        {label}
      </span>
    </div>
  )
}
