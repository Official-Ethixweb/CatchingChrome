/**
 * Instagram reels featured in the phone mockup on the home page.
 *
 * We do NOT use Instagram's embed here: Instagram refuses to serve its embeds
 * to many contexts (datacenter IPs, VPNs, no-cookie browsers) and shows a
 * "link may be broken or removed" / blank frame — verified against these exact
 * reels. So each card renders from LOCAL media we control, and always taps
 * through to the real reel on Instagram.
 *
 * Each reel renders at the best tier it has assets for:
 *   1. `video` present  → autoplays muted + loops in the phone (most eye-catching)
 *   2. else `poster`    → the reel's cover image sits in the phone
 *   3. else (href only) → a branded "Watch reel" cover (works with no assets)
 *
 * To upgrade a reel, drop a file in `public/reels/` and point to it:
 *   - cover image → `poster: '/reels/DRzhvNTEep4.jpg'`
 *   - video       → `video: '/reels/DRzhvNTEep4.mp4'`  (export the reel as mp4)
 */
export type Reel = {
  /** The public reel permalink — where tapping the card goes. */
  href: string
  /** Optional muted/looping video in /public, e.g. /reels/DRzhvNTEep4.mp4 */
  video?: string
  /** Optional cover image in /public, e.g. /reels/DRzhvNTEep4.jpg */
  poster?: string
  /** Optional one-line caption shown along the bottom of the phone. */
  caption?: string
}

export const INSTAGRAM_HANDLE = 'catchingchromeguide'
export const INSTAGRAM_URL = 'https://www.instagram.com/catchingchromeguide/'

export const REELS: Reel[] = [
  { href: 'https://www.instagram.com/p/DRzhvNTEep4/', video: '/Video-986.mp4' },
  { href: 'https://www.instagram.com/p/DadNoQDtagb/', video: '/Video-232.mp4' },
  { href: 'https://www.instagram.com/p/DTDtHTuDwPe/', video: '/Video-230.mp4' },
  { href: 'https://www.instagram.com/p/DTBF3srjzKX/', video: '/Video-513.mp4' },
  { href: 'https://www.instagram.com/p/DTBBd9yD6ww/', video: '/Video-884.mp4' },
]
