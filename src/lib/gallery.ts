/**
 * Gallery manifest.
 *
 * Every entry was catalogued by eye from the files in `public/Gallery/`, not
 * inferred from filenames — the filenames are camera dumps and social-app
 * screenshots and say nothing about what is in the frame.
 *
 * Two independent axes so a visitor can ask two different questions:
 *   `group`   — who is in the boat (the story: kids, families, solo anglers)
 *   `species` — what came over the rail (chinook, coho, steelhead, sturgeon)
 *
 * Near-duplicate shots (the same moment saved twice at different sizes) are
 * deliberately excluded; only the higher-resolution copy is listed.
 */

export type MediaGroup = 'kids' | 'family' | 'solo' | 'crew' | 'catch' | 'water'
export type Species = 'chinook' | 'coho' | 'steelhead' | 'sturgeon'

export type MediaItem = {
  src: string
  group: MediaGroup
  /** Absent for scenery and boat shots where no single species is the subject. */
  species?: Species
  alt: string
  /** Short line shown on hover and in the lightbox. */
  caption: string
  /** Marks the shots strong enough to earn a bigger tile in the mosaic. */
  feature?: boolean
}

const G = '/Gallery/'

/**
 * Intrinsic pixel dimensions, read off the decoded files themselves.
 *
 * The grid lays photos out at their true aspect ratio so nothing is ever
 * cropped, which means the ratio has to be known *before* the image loads —
 * otherwise every row would reflow as bytes arrive. Baking the numbers in
 * keeps the layout identical on the server and the client.
 */
const DIMS: Record<string, [number, number]> = {
  'IMG_0143.jpg': [1200, 1600],
  '20240822_063737-scaled.jpg': [2159, 2560],
  'e6eade3b-0a6b-4e82-a4f6-6c6e9f2670de.JPG': [3000, 4000],
  '1000037475.webp': [1080, 1736],
  'Screenshot_20240917_110328_Messenger.jpg': [821, 927],
  'Screenshot_20240813_134830_Facebook.jpg': [1080, 1673],
  '20240831_123657-scaled.jpg': [1440, 2560],
  '828b77c3-d23a-4898-ba48-797fb408b88b.JPG': [1200, 1600],
  '20240805_123716-scaled.jpg': [1920, 2560],
  '962e714a-4c25-46a4-9e01-9002474327f1.JPG': [3242, 3000],
  '1000032819.webp': [1920, 2560],
  '00c0e1bc-35c4-4ebc-aa3c-db7243004fc5.JPG': [3000, 4000],
  'rsw_1280h_960-2.webp': [1280, 960],
  '2012-09-05_18-58-57_50-scaled.jpg': [2560, 1920],
  '20200920_100218-scaled.jpg': [1153, 2560],
  '20230827_151346-scaled.jpg': [2560, 1441],
  'rsw_1280h_660-1.webp': [1280, 660],
  'Screenshot_20240922_164012_Messages.jpg': [1078, 922],
  'rsw_1280h_1707.webp': [1280, 1707],
  '1000032493.webp': [1027, 1268],
  '1000036829.webp': [1079, 1374],
  '1000033748.webp': [1078, 1372],
  'b9773b72-3ea6-4b98-8c71-8f3dc1feece2.JPG': [2644, 3075],
  '1000033738.webp': [1078, 1081],
  'Resized_20240828_151728_1724889255408.jpeg': [796, 1062],
  '20240906_191347-scaled.jpg': [1616, 2560],
  'b7bedc1a-a201-4705-b6af-e58ce567492f.JPG': [4000, 3000],
  '20240824_171811-scaled.jpg': [1920, 2560],
  '20240928_164659-scaled.jpg': [1920, 2560],
  '20230929_091400-scaled.jpg': [2560, 1441],
  '70a4434f-e3c1-45c9-9295-ff4135730f37.JPG': [3000, 4000],
  'Screenshot_20240917_070808_Facebook.jpg': [883, 1523],
  '20210903_154832-scaled.jpg': [2560, 1440],
  '20240818_102642-scaled.jpg': [2560, 1920],
  '20220926_122726-scaled.jpg': [2560, 1441],
  'Screenshot_20240917_183638_Instagram.jpg': [975, 993],
  'abfce1f9-a9f4-4190-8c00-06b7d99bb27f.JPG': [3000, 4000],
  'rsw_1280h_960.webp': [1280, 960],
  'rsw_1280h_960-4.webp': [1280, 960],
  'rsw_1280h_1707-3.webp': [1280, 1707],
  '5fd7d28a-3b40-4b57-b1c6-feb6f922f4af.JPG': [4000, 3000],
  '4aaf7ed6-bf1c-4f8c-bc84-fc56cb69afa6.JPG': [3000, 4000],
  'ba5e39b1-df81-4961-865e-1f04281d6616.JPG': [990, 1600],
  'f7d450dd-2cb4-480c-823f-907e9f861a4b.JPG': [4000, 3000],
  '1000032662.webp': [1920, 2560],
  '1000032807.webp': [807, 608],
  '20150222_084405-scaled.jpg': [2560, 1440],
  'FullSizeRender.jpg': [2048, 1536],
  '20150101_123422-scaled.jpg': [2560, 1440],
  '20150102_151640-scaled.jpg': [1440, 2560],
  '20150102_134625-scaled.jpg': [2560, 1440],
  '20150208_121040-scaled.jpg': [2560, 1440],
  '7fbcce56-f92d-469f-a3c1-596373b5adf7.JPG': [3000, 4000],
  'b551c5d9-650a-43e8-80b3-2770fb88e3fe.JPG': [1200, 1600],
  'cb495525-883c-4b77-a214-1fda4056bdc8.JPG': [3000, 4000],
  'e6c5bf03-9569-4768-8b7e-cc92f4610561.JPG': [1600, 1200],
  '20230829_122220-scaled.jpg': [2560, 1441],
  '20230910_113855-scaled.jpg': [1441, 2560],
  'a2760e3d-4ed7-45d0-ad12-7a084c3f5926.JPG': [1600, 1538],
  '20240915_141123-scaled.jpg': [2560, 1920],
  '20240921_135459-scaled.jpg': [1920, 2560],
  '1000033551.webp': [746, 886],
  '1000036716.webp': [1920, 2560],
  'ef1c88fd-ee6a-4162-ae60-14d00d365e1f.JPG': [899, 1599],
  'e1d2dece-6772-4441-ac68-2f7a5f3d9bb4.JPG': [3000, 4000],
  '20240721_110758-scaled.jpg': [1920, 2560],
  '49e85401-70f0-4285-b4f5-d73a9099f50d.JPG': [3000, 4000],
  '43a7c5dc-e616-4459-8568-ece87416e61a.JPG': [3000, 4000],
  'c4073077-92f1-4a15-8a9e-93bd8bc8e3b0.JPG': [3423, 2831],
  '20240928_164501-scaled.jpg': [1920, 2560],
  'cd37fa6d-b5a7-4b6f-9e45-bb7d9542889c.JPG': [1200, 1600],
  'rsw_1280h_1707-2.webp': [1280, 1707],
  '45eb738e-ba96-47ca-8403-a0197d691887.JPG': [3000, 4000],
  'rsw_1280h_1707-1.webp': [1280, 1707],
  '20240928_152957-scaled.jpg': [1920, 2560],
  '7083ac4a-5338-4e93-a29d-ceb977ba7b19.jpg': [3000, 4000],
  'rsw_1280h_960-3.webp': [1280, 960],
  'rsw_1280h_960-5.webp': [1280, 960],
}

/** Width ÷ height. Falls back to 4:3 rather than collapsing a row. */
export function ratioOf(src: string): number {
  const d = DIMS[src.replace(G, '')]
  return d ? d[0] / d[1] : 4 / 3
}

export const GROUPS: Array<{ id: MediaGroup; label: string; blurb: string }> = [
  {
    id: 'kids',
    label: 'Kids Aboard',
    blurb: 'First fish, biggest grins. Half of these salmon outweigh the angler.',
  },
  {
    id: 'family',
    label: 'Families',
    blurb: 'Parents, kids and grandparents on the same deck, same morning.',
  },
  {
    id: 'solo',
    label: 'Solo Anglers',
    blurb: 'One rod, one fish, one very good day on the river.',
  },
  {
    id: 'crew',
    label: 'Groups & Crews',
    blurb: 'Corporate outings, buddy trips and reunions that filled the cooler.',
  },
  {
    id: 'catch',
    label: 'The Catch',
    blurb: 'Full limits on the deck, fillets on the board, gear that did the work.',
  },
  {
    id: 'water',
    label: 'On the Water',
    blurb: 'The boat, the Gorge and the sunrises you only see from a guide seat.',
  },
]

export const SPECIES: Array<{ id: Species; label: string; note: string }> = [
  { id: 'chinook', label: 'Chinook', note: 'King salmon — the heavyweight' },
  { id: 'coho', label: 'Coho', note: 'Silvers — fast, bright, acrobatic' },
  { id: 'steelhead', label: 'Steelhead', note: 'Winter drift-boat chrome' },
  { id: 'sturgeon', label: 'Sturgeon', note: 'Prehistoric, and enormous' },
]

export const MEDIA: MediaItem[] = [
  // ── Kids aboard ────────────────────────────────────────────────────────
  {
    src: `${G}IMG_0143.jpg`,
    group: 'kids',
    species: 'chinook',
    alt: 'A young boy holding a chinook salmon on a rope at sunrise in the Columbia Gorge',
    caption: 'Sunrise in the Gorge, and a king almost his own size',
    feature: true,
  },
  {
    src: `${G}20240822_063737-scaled.jpg`,
    group: 'kids',
    species: 'coho',
    alt: 'A boy in a life jacket hugging a large coho salmon aboard the boat',
    caption: 'Both arms required',
    feature: true,
  },
  {
    src: `${G}e6eade3b-0a6b-4e82-a4f6-6c6e9f2670de.JPG`,
    group: 'kids',
    species: 'chinook',
    alt: 'A young boy standing on the dock beside eight salmon and the Catching Chrome boat',
    caption: 'Eight fish on the dock, and he helped land every one',
    feature: true,
  },
  {
    src: `${G}1000037475.webp`,
    group: 'kids',
    species: 'coho',
    alt: 'A girl in a Minnie Mouse jacket holding a big coho salmon',
    caption: 'She picked the jacket. Ryan picked the water.',
  },
  {
    src: `${G}Screenshot_20240917_110328_Messenger.jpg`,
    group: 'kids',
    species: 'chinook',
    alt: 'A boy holding a chinook salmon across his chest on a sunny day',
    caption: 'Bluebird day, chrome-bright king',
  },
  {
    src: `${G}Screenshot_20240813_134830_Facebook.jpg`,
    group: 'kids',
    species: 'chinook',
    alt: 'A small boy in a life jacket standing beside a hanging chinook salmon',
    caption: 'Sizing up the competition',
  },
  {
    src: `${G}20240831_123657-scaled.jpg`,
    group: 'kids',
    species: 'chinook',
    alt: 'Two boys on the boat holding a chinook salmon with harbour cranes behind them',
    caption: 'Brothers, one king, no arguments',
  },
  {
    src: `${G}828b77c3-d23a-4898-ba48-797fb408b88b.JPG`,
    group: 'kids',
    species: 'coho',
    alt: 'A young boy in a Blazers cap holding a coho salmon',
    caption: 'Blazers cap, silver salmon',
  },
  {
    src: `${G}20240805_123716-scaled.jpg`,
    group: 'kids',
    species: 'chinook',
    alt: 'A teenage boy in a hoodie holding a large chinook salmon',
    caption: 'Barely fits in the frame',
  },
  {
    src: `${G}962e714a-4c25-46a4-9e01-9002474327f1.JPG`,
    group: 'kids',
    species: 'chinook',
    alt: 'A teenage boy grinning while holding a large chinook salmon',
    caption: 'That grin is the whole job description',
  },
  {
    src: `${G}1000032819.webp`,
    group: 'kids',
    species: 'chinook',
    alt: 'A teenage boy holding a chinook salmon with a bridge in the background',
    caption: 'Under the bridge, over the limit',
  },
  {
    src: `${G}00c0e1bc-35c4-4ebc-aa3c-db7243004fc5.JPG`,
    group: 'kids',
    species: 'coho',
    alt: 'A boy in a Spiderman shirt holding a coho salmon',
    caption: 'Spidey suit, silver bullet',
  },
  {
    src: `${G}rsw_1280h_960-2.webp`,
    group: 'kids',
    species: 'chinook',
    alt: 'A teenage boy with a chinook salmon and a cargo ship passing behind',
    caption: 'Cargo ship for scale',
  },
  {
    src: `${G}2012-09-05_18-58-57_50-scaled.jpg`,
    group: 'kids',
    species: 'chinook',
    alt: 'A man and a small girl in a sun hat holding a huge chinook salmon in golden light',
    caption: 'Golden hour, and a king bigger than she is',
    feature: true,
  },

  // ── Families ───────────────────────────────────────────────────────────
  {
    src: `${G}20200920_100218-scaled.jpg`,
    group: 'family',
    species: 'coho',
    alt: 'A father and two young sons on the beach holding three salmon',
    caption: 'One dad, two boys, three fish',
    feature: true,
  },
  {
    src: `${G}20230827_151346-scaled.jpg`,
    group: 'family',
    species: 'chinook',
    alt: 'A family of four standing in the shallows beside the boat holding five salmon',
    caption: 'Everyone limited. Nobody wanted to go home.',
    feature: true,
  },
  {
    src: `${G}rsw_1280h_660-1.webp`,
    group: 'family',
    species: 'chinook',
    alt: 'A man and two teenage boys holding three chinook salmon',
    caption: 'Three anglers, three kings',
    feature: true,
  },
  {
    src: `${G}Screenshot_20240922_164012_Messages.jpg`,
    group: 'family',
    species: 'coho',
    alt: 'A woman and two teenage boys at the boat ramp holding six coho salmon',
    caption: 'Six silvers and a very full cooler',
  },
  {
    src: `${G}rsw_1280h_1707.webp`,
    group: 'family',
    species: 'coho',
    alt: 'A young boy and his father holding a large coho salmon',
    caption: 'He reeled. Dad just held the net.',
  },
  {
    src: `${G}1000032493.webp`,
    group: 'family',
    species: 'chinook',
    alt: 'A teenage boy and his father with a big chinook salmon on a sunny day',
    caption: 'Father-and-son king',
  },
  {
    src: `${G}1000036829.webp`,
    group: 'family',
    species: 'coho',
    alt: 'A woman, two men and a small child holding a coho salmon on the boat',
    caption: 'Youngest crew member on board',
  },
  {
    src: `${G}1000033748.webp`,
    group: 'family',
    species: 'chinook',
    alt: 'An older man and two young women holding three chinook salmon',
    caption: 'Three generations, three kings',
  },
  {
    src: `${G}b9773b72-3ea6-4b98-8c71-8f3dc1feece2.JPG`,
    group: 'family',
    species: 'chinook',
    alt: 'A couple holding two chinook salmon in bright sunshine',
    caption: 'A matching pair',
  },
  {
    src: `${G}1000033738.webp`,
    group: 'family',
    species: 'chinook',
    alt: 'Five people on a rocky bank holding chinook salmon under a blue sky',
    caption: 'Rocky bank, blue sky, full stringer',
  },
  {
    src: `${G}Resized_20240828_151728_1724889255408.jpeg`,
    group: 'family',
    species: 'chinook',
    alt: 'A family of four on the dock with a chinook salmon',
    caption: 'Dockside, before the drive home',
  },

  // ── Solo anglers ───────────────────────────────────────────────────────
  {
    src: `${G}20240906_191347-scaled.jpg`,
    group: 'solo',
    species: 'chinook',
    alt: 'A woman holding a large chinook salmon at sunset on the Columbia River',
    caption: 'Last light, biggest fish',
    feature: true,
  },
  {
    src: `${G}b7bedc1a-a201-4705-b6af-e58ce567492f.JPG`,
    group: 'solo',
    species: 'chinook',
    alt: 'A man holding a chinook salmon in golden sunrise light on the river',
    caption: 'Worth the 4am alarm',
    feature: true,
  },
  {
    src: `${G}20240824_171811-scaled.jpg`,
    group: 'solo',
    species: 'chinook',
    alt: 'A woman in a beanie holding a large chinook salmon aboard the boat',
    caption: 'Held with one hand. Fought for twenty minutes.',
  },
  {
    src: `${G}20240928_164659-scaled.jpg`,
    group: 'solo',
    species: 'chinook',
    alt: 'A woman holding two chinook salmon on the boat',
    caption: 'Doubled up',
  },
  {
    src: `${G}20230929_091400-scaled.jpg`,
    group: 'solo',
    species: 'coho',
    alt: 'An older woman holding a coho salmon with the Columbia Gorge behind her',
    caption: 'The Gorge does not care how old you are',
  },
  {
    src: `${G}70a4434f-e3c1-45c9-9295-ff4135730f37.JPG`,
    group: 'solo',
    species: 'coho',
    alt: 'A woman giving a thumbs up while holding a coho salmon',
    caption: 'Thumbs up, silver in hand',
  },
  {
    src: `${G}Screenshot_20240917_070808_Facebook.jpg`,
    group: 'solo',
    species: 'coho',
    alt: 'A woman angler holding a coho salmon on the boat',
    caption: 'Chrome-bright silver',
  },
  {
    src: `${G}20210903_154832-scaled.jpg`,
    group: 'solo',
    species: 'chinook',
    alt: 'A man holding a large chinook salmon on the Columbia River',
    caption: 'A proper Columbia king',
  },
  {
    src: `${G}20240818_102642-scaled.jpg`,
    group: 'solo',
    species: 'chinook',
    alt: 'A man at the wheel holding a large chinook salmon on a sunny day',
    caption: 'Still standing at the wheel',
  },
  {
    src: `${G}20220926_122726-scaled.jpg`,
    group: 'solo',
    species: 'chinook',
    alt: 'A man in a fishing cap holding a big chinook salmon in the Columbia Gorge',
    caption: 'Gorge sun, Gorge fish',
  },
  {
    src: `${G}Screenshot_20240917_183638_Instagram.jpg`,
    group: 'solo',
    species: 'chinook',
    alt: 'A young man in an Oregon State cap holding a large chinook salmon',
    caption: 'Beavers cap, Columbia king',
  },
  {
    src: `${G}abfce1f9-a9f4-4190-8c00-06b7d99bb27f.JPG`,
    group: 'solo',
    species: 'chinook',
    alt: 'A man in a black hoodie holding a large chinook salmon',
    caption: 'Heavy enough to lean back for',
  },
  {
    src: `${G}rsw_1280h_960.webp`,
    group: 'solo',
    species: 'chinook',
    alt: 'A man holding a big chinook salmon with a riverside saloon behind him',
    caption: 'Off the water, into the story',
  },
  {
    src: `${G}rsw_1280h_960-4.webp`,
    group: 'solo',
    species: 'chinook',
    alt: 'A man in a grey hoodie holding a large chinook salmon',
    caption: 'A solid Columbia king',
  },
  {
    src: `${G}rsw_1280h_1707-3.webp`,
    group: 'solo',
    species: 'chinook',
    alt: 'A man in a blue shirt holding two chinook salmon',
    caption: 'Two in the boat before lunch',
  },
  {
    src: `${G}5fd7d28a-3b40-4b57-b1c6-feb6f922f4af.JPG`,
    group: 'solo',
    species: 'chinook',
    alt: 'A young man in a green jacket holding a chinook salmon',
    caption: 'First king of the season',
  },
  {
    src: `${G}4aaf7ed6-bf1c-4f8c-bc84-fc56cb69afa6.JPG`,
    group: 'solo',
    species: 'coho',
    alt: 'An older man in a fishing cap holding a coho salmon',
    caption: 'Got fish? He does.',
  },
  {
    src: `${G}ba5e39b1-df81-4961-865e-1f04281d6616.JPG`,
    group: 'solo',
    species: 'chinook',
    alt: 'An older man in a green plaid shirt holding a chinook salmon',
    caption: 'Plaid, patience, payoff',
  },
  {
    src: `${G}f7d450dd-2cb4-480c-823f-907e9f861a4b.JPG`,
    group: 'solo',
    species: 'chinook',
    alt: 'A man in a sun hat holding a chinook salmon under a blue sky',
    caption: 'Hat on, sunscreen on, fish on',
  },
  {
    src: `${G}1000032662.webp`,
    group: 'solo',
    species: 'chinook',
    alt: 'A man holding a chinook salmon on an overcast morning',
    caption: 'Grey sky, bright fish',
  },
  {
    src: `${G}1000032807.webp`,
    group: 'solo',
    species: 'chinook',
    alt: 'A bearded man holding a chinook salmon at sunrise',
    caption: 'First light, first fish',
  },

  // Winter steelhead — the drift-boat season
  {
    src: `${G}20150222_084405-scaled.jpg`,
    group: 'solo',
    species: 'steelhead',
    alt: 'An angler holding a steelhead on a misty river at sunrise from a drift boat',
    caption: 'Mist on the water, steel on the line',
    feature: true,
  },
  {
    src: `${G}FullSizeRender.jpg`,
    group: 'solo',
    species: 'steelhead',
    alt: 'A man holding a winter steelhead beside a drift boat on a moody river',
    caption: 'Why we fish in January',
    feature: true,
  },
  {
    src: `${G}20150101_123422-scaled.jpg`,
    group: 'solo',
    species: 'steelhead',
    alt: 'A man in a fur hat holding a steelhead from a drift boat in winter',
    caption: 'New Year&rsquo;s Day chrome',
  },
  {
    src: `${G}20150102_151640-scaled.jpg`,
    group: 'solo',
    species: 'steelhead',
    alt: 'An angler in waders holding a large steelhead on a gravel bar',
    caption: 'Waders on, waist deep, worth it',
  },
  {
    src: `${G}20150102_134625-scaled.jpg`,
    group: 'solo',
    species: 'steelhead',
    alt: 'A man in a beanie holding a steelhead from a drift boat',
    caption: 'Drift-boat steelhead',
  },
  {
    src: `${G}20150208_121040-scaled.jpg`,
    group: 'solo',
    species: 'steelhead',
    alt: 'An older man holding a bright winter steelhead',
    caption: 'February, and still fishing',
  },

  // Sturgeon — the prehistoric ones
  {
    src: `${G}7fbcce56-f92d-469f-a3c1-596373b5adf7.JPG`,
    group: 'solo',
    species: 'sturgeon',
    alt: 'A bearded man holding a large sturgeon',
    caption: 'A hundred million years of practice',
  },
  {
    src: `${G}b551c5d9-650a-43e8-80b3-2770fb88e3fe.JPG`,
    group: 'solo',
    species: 'sturgeon',
    alt: 'An older man in a bucket hat holding a sturgeon',
    caption: 'Older than the dinosaurs, heavier than it looks',
  },
  {
    src: `${G}cb495525-883c-4b77-a214-1fda4056bdc8.JPG`,
    group: 'solo',
    species: 'sturgeon',
    alt: 'A man holding a big sturgeon on a winter day',
    caption: 'Winter sturgeon',
  },

  // ── Groups & crews ─────────────────────────────────────────────────────
  {
    src: `${G}e6c5bf03-9569-4768-8b7e-cc92f4610561.JPG`,
    group: 'crew',
    species: 'sturgeon',
    alt: 'Five people aboard the Catching Chrome boat holding a large sturgeon',
    caption: 'Five aboard, one very large sturgeon',
    feature: true,
  },
  {
    src: `${G}20230829_122220-scaled.jpg`,
    group: 'crew',
    species: 'chinook',
    alt: 'Four men on the beach holding around ten salmon with the Astoria bridge behind',
    caption: 'Four anglers, ten fish, one bridge',
    feature: true,
  },
  {
    src: `${G}20230910_113855-scaled.jpg`,
    group: 'crew',
    species: 'chinook',
    alt: 'Three women aboard the boat holding three chinook salmon near Hood River',
    caption: 'Ladies&rsquo; day on the Columbia',
    feature: true,
  },
  {
    src: `${G}a2760e3d-4ed7-45d0-ad12-7a084c3f5926.JPG`,
    group: 'crew',
    species: 'chinook',
    alt: 'A group of five adults and a boy on the dock, each holding a salmon',
    caption: 'Everybody holding something',
  },
  {
    src: `${G}20240915_141123-scaled.jpg`,
    group: 'crew',
    species: 'chinook',
    alt: 'Five people on a rocky bank holding chinook salmon',
    caption: 'The whole party limited out',
  },
  {
    src: `${G}20240921_135459-scaled.jpg`,
    group: 'crew',
    species: 'coho',
    alt: 'Three men aboard the boat holding coho salmon',
    caption: 'Silvers all round',
  },
  {
    src: `${G}1000033551.webp`,
    group: 'crew',
    species: 'chinook',
    alt: 'Three men on the boat holding salmon',
    caption: 'Buddy trip, properly executed',
  },
  {
    src: `${G}1000036716.webp`,
    group: 'crew',
    species: 'coho',
    alt: 'Two young men at the boat ramp holding four coho salmon',
    caption: 'Four silvers at the ramp',
  },
  {
    src: `${G}ef1c88fd-ee6a-4162-ae60-14d00d365e1f.JPG`,
    group: 'crew',
    species: 'sturgeon',
    alt: 'Two men in orange rain gear holding a sturgeon',
    caption: 'Rain gear earns its keep',
  },

  // ── The catch ──────────────────────────────────────────────────────────
  {
    src: `${G}e1d2dece-6772-4441-ac68-2f7a5f3d9bb4.JPG`,
    group: 'catch',
    species: 'coho',
    alt: 'More than a dozen coho salmon laid out across the deck of the boat',
    caption: 'Fourteen silvers, one morning',
    feature: true,
  },
  {
    src: `${G}20240721_110758-scaled.jpg`,
    group: 'catch',
    species: 'chinook',
    alt: 'Around fifteen salmon laid out on the deck of the boat',
    caption: 'The deck ran out of room',
    feature: true,
  },
  {
    src: `${G}49e85401-70f0-4285-b4f5-d73a9099f50d.JPG`,
    group: 'catch',
    alt: 'Salmon fillets and roe on a Catching Chrome branded cutting board',
    caption: 'Cleaned, bagged and sealed before you leave',
    feature: true,
  },
  {
    src: `${G}43a7c5dc-e616-4459-8568-ece87416e61a.JPG`,
    group: 'catch',
    species: 'sturgeon',
    alt: 'Several sturgeon on the deck of the boat',
    caption: 'A sturgeon day',
  },
  {
    src: `${G}c4073077-92f1-4a15-8a9e-93bd8bc8e3b0.JPG`,
    group: 'catch',
    species: 'coho',
    alt: 'Eight coho salmon lined up on the deck',
    caption: 'Eight silvers, lined up',
  },
  {
    src: `${G}20240928_164501-scaled.jpg`,
    group: 'catch',
    species: 'coho',
    alt: 'Seven coho salmon on the deck of the boat',
    caption: 'Limits, before noon',
  },
  {
    src: `${G}cd37fa6d-b5a7-4b6f-9e45-bb7d9542889c.JPG`,
    group: 'catch',
    species: 'coho',
    alt: 'Close-up of a coho salmon beside the flasher and lure that caught it',
    caption: 'The gear that did it',
  },
  {
    src: `${G}rsw_1280h_1707-2.webp`,
    group: 'catch',
    species: 'chinook',
    alt: 'Four salmon laid out on the deck of the boat',
    caption: 'Four in the box',
  },
  {
    src: `${G}45eb738e-ba96-47ca-8403-a0197d691887.JPG`,
    group: 'catch',
    species: 'chinook',
    alt: 'Four chinook salmon on the deck',
    caption: 'Kings on the diamond plate',
  },
  {
    src: `${G}rsw_1280h_1707-1.webp`,
    group: 'catch',
    species: 'coho',
    alt: 'A coho salmon on the deck with the lure still attached',
    caption: 'Still hooked up',
  },
  {
    src: `${G}20240928_152957-scaled.jpg`,
    group: 'catch',
    alt: 'A fish in the landing net alongside the boat',
    caption: 'In the net',
  },

  // ── On the water ───────────────────────────────────────────────────────
  {
    src: `${G}7083ac4a-5338-4e93-a29d-ceb977ba7b19.jpg`,
    group: 'water',
    alt: 'The Catching Chrome guide boat, rigged and ready on the trailer',
    caption: 'The office',
    feature: true,
  },
  {
    src: `${G}rsw_1280h_960-3.webp`,
    group: 'water',
    alt: 'Sunrise over the river with guide boats on the water',
    caption: 'Where the day starts',
    feature: true,
  },
  {
    src: `${G}rsw_1280h_960-5.webp`,
    group: 'water',
    alt: 'A family trolling aboard the boat with rods out',
    caption: 'Rods out, waiting on the bite',
    feature: true,
  },
]

export type VideoItem = {
  src: string
  caption: string
}

/**
 * Short clips straight off Ryan's phone. No poster frames exist for these and
 * there's no encoder in the toolchain to extract one, so they load with
 * `preload="metadata"` and the browser paints the first frame itself.
 */
export const CLIPS: VideoItem[] = [
  {
    src: `${G}f5048f4c-711c-4a7f-b45e-17b1a153f656.MP4`,
    caption: 'Sturgeon at the surface',
  },
  {
    src: `${G}c1b7421d-7621-43ff-8c53-77cef40051f6.MP4`,
    caption: 'Sturgeon alongside',
  },
  {
    src: `${G}62f0f4de-069f-49c0-b9ea-ecfde34a6fa7.MP4`,
    caption: 'Net up, rods out',
  },
  {
    src: `${G}e2f85631-a3bf-4f3a-9b4f-880cf22e0824.MP4`,
    caption: 'Bringing one boatside',
  },
  {
    src: `${G}ee465ee7-b16c-4ff1-a8d2-6c9f51d19a55.MP4`,
    caption: 'Four on the deck',
  },
]
