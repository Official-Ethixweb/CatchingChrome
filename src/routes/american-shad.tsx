import { createFileRoute } from '@tanstack/react-router'
import { SpeciesPage } from '~/components/SpeciesPage'
import { SPECIES_PAGES } from '~/lib/species'

// Ad campaigns point straight at this URL, so it is a real page rather than a
// redirect: 200, URL unchanged, its own title and description. Content lives in
// src/lib/species.ts, layout in components/SpeciesPage.tsx.
const data = SPECIES_PAGES['american-shad']

export const Route = createFileRoute('/american-shad')({
  component: () => <SpeciesPage data={data} />,
  head: () => ({
    meta: [
      { title: data.metaTitle },
      { name: 'description', content: data.metaDescription },
      { property: 'og:title', content: data.metaTitle },
      { property: 'og:description', content: data.metaDescription },
      { property: 'og:image', content: data.image },
      { name: 'twitter:title', content: data.metaTitle },
      { name: 'twitter:description', content: data.metaDescription },
      { name: 'twitter:image', content: data.image },
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://www.catchingchromeguideservice.com/american-shad',
      },
    ],
  }),
})
