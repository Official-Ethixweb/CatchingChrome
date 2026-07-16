import type { SVGProps, ComponentType } from 'react'
import { FacebookIcon, InstagramIcon, TikTokIcon } from '~/components/icons'

/**
 * The single source of truth for Captain Ryan's social links.
 *
 * Header, footer and the contact page all render from this list, so a new
 * profile URL only has to change here. `href: '#'` marks a placeholder we
 * haven't been given a real URL for yet (Facebook, as of 2026-07-16).
 */
export type Social = {
  label: string
  href: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const SOCIALS: Social[] = [
  { label: 'Facebook', href: '#', Icon: FacebookIcon },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/catchingchromeguide/',
    Icon: InstagramIcon,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@catchingchrome1977',
    Icon: TikTokIcon,
  },
]
