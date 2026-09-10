/**
 * Renders a JSON-LD structured-data block.
 *
 * Rendered as ordinary JSX (not via head()) so it goes through the same
 * server-rendered-HTML path every other script in this app already relies on
 * (see Analytics.tsx, __root.tsx) — reliable under SSR without depending on
 * the untyped `scripts` slot of TanStack Router's head() API.
 *
 * `data` is always a static object built from this project's own content
 * (never user input), so JSON.stringify here carries no injection risk.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
