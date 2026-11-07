/**
 * Articles shown on /articles and /articles/$slug.
 *
 * Content lives here as plain data (no CMS) so a new article is one more entry
 * in `ARTICLES`. Bodies are small block lists rather than markdown so the page
 * can style every element with the site's own tokens.
 *
 * Text in `p` and `ul` blocks may contain inline links as [anchor](url).
 *
 * Keep copy free of em/en dashes, and avoid regulation specifics (seasons,
 * limits, retention rules): those change every year and the articles point
 * readers to Ryan or ODFW instead.
 */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'quote'; text: string }
  | {
      type: 'img'
      src: string
      alt: string
      caption?: string
      /** Intrinsic size, so the browser reserves space before the file loads. */
      width: number
      height: number
      /** Infographic with text in it: shown full width, never height-capped, and tappable to open full size. */
      graphic?: boolean
    }
  | { type: 'faq'; items: { q: string; a: string }[] }
  | { type: 'cta'; label: string; href: string }

export type ArticleCategory = 'Salmon' | 'Steelhead' | 'Sturgeon' | 'Crabbing' | 'Trip Prep'

export type Article = {
  slug: string
  title: string
  /** Shown on cards and as the meta description. */
  excerpt: string
  category: ArticleCategory
  /** ISO date (YYYY-MM-DD). */
  date: string
  readMins: number
  image: string
  imageAlt: string
  body: Block[]
}

export const CATEGORIES: ArticleCategory[] = [
  'Salmon',
  'Steelhead',
  'Sturgeon',
  'Crabbing',
  'Trip Prep',
]

/**
 * Newest content goes anywhere in the list: the pages sort by `date`.
 * The /articles page shows a "coming soon" state while this is empty.
 */
export const ARTICLES: Article[] = [
  {
    slug: 'columbia-river-fishing-report-october',
    title: 'Columbia River Fishing Report: October Coho Bite',
    excerpt:
      'Columbia River fishing report for October: coho are being kept, while Chinook and sturgeon go back in. The latest ODFW numbers, explained for your trip.',
    category: 'Salmon',
    date: '2026-10-27',
    readMins: 7,
    image: '/Gallery/opt/20230929_091400-scaled-full.webp',
    imageAlt:
      'Angler holding a coho salmon aboard a guide boat on the Columbia River in the Gorge',
    body: [
      {
        type: 'p',
        text: `Before the sun clears the hills, the boats are already out, small dark shapes on a flat, silver river. That is how a fall day starts on the Columbia, and it is still how the day starts in late October. This Columbia River fishing report for October draws on the numbers the state published on October 22, then turns them into something you can use if you are deciding whether to book a trip.`,
      },
      {
        type: 'img',
        src: '/Gallery/opt/rsw_1280h_960-3-full.webp',
        alt: 'Sunrise over the Columbia River with guide boats scattered across calm water',
        caption: 'Where the day starts',
        width: 1280,
        height: 960,
      },
      { type: 'h2', text: 'The Columbia River fishing report for October, in plain English' },
      {
        type: 'p',
        text: `ODFW's [Columbia Zone fishing report](https://myodfw.com/recreation-report/fishing-report/columbia-zone) covers the week ending October 17. It calls coho fishing fair to good near the mouths of some tributaries, and coho are the fish people are keeping.`,
      },
      {
        type: 'p',
        text: `Anglers kept 50 coho between Warrior Rock Lighthouse and Longview Bridge, and 81 in the Bonneville Pool. Buoy 10 added 16 kept and 13 released.`,
      },
      {
        type: 'p',
        text: `Chinook tell a different story. Anglers released them, and none were reported kept. The Gorge saw 51 Chinook released and the Bonneville Pool saw 39. Every sturgeon in the report went back in the water too.`,
      },
      {
        type: 'p',
        text: `One caution from ODFW itself: the agency says it is pausing parts of its Recreation Report during a revamp, so some zone details are thin right now. For anything that decides your trip, go to the sources linked at the bottom of this post rather than relying on a single week of counts.`,
      },
      { type: 'h2', text: 'How to read these numbers' },
      {
        type: 'p',
        text: `A weekly count reflects the anglers who fished that week. A low number can mean few boats were out rather than few fish in the river, and one week of weather can swing results either way.`,
      },
      {
        type: 'p',
        text: `Use the counts to spot a pattern, such as coho showing up near tributary mouths and in the Gorge. Then let a guide fill in what happened yesterday, because the fish move faster than a weekly report can.`,
      },
      { type: 'h2', text: 'Coho: where the action has been' },
      {
        type: 'p',
        text: `ODFW's [weekly recreation report](https://myodfw.com/recreation-report) says coho are moving upstream and that salmon fishing is good in bays and estuaries. On the Columbia, the kept counts from Longview up to the Bonneville Pool show where the fish have been biting this month.`,
      },
      {
        type: 'p',
        text: `Captain Ryan's own Oregon salmon calendar rates coho as excellent in October and good in November. Coho are aggressive, acrobatic and a lot of fun on lighter gear, which is why they suit families and first-time anglers so well.`,
      },
      {
        type: 'p',
        text: `A coho trip is also a good way to see how the day works before you commit to a bigger fish. Ryan handles the boat and the positioning. You handle the rod.`,
      },
      { type: 'h2', text: 'Fall Chinook: in the river, mostly released' },
      {
        type: 'p',
        text: `The Chinook are there. The report counts 90 of them released across the Gorge and the Bonneville Pool. Whether you may keep one on a given day depends on in-season rules, and those move quickly.`,
      },
      {
        type: 'p',
        text: `ODFW's [September 23 notice](https://myodfw.com/news/recreational-chinook-and-coho-fishing-days-added-columbia-river) shows how fast. It added weekend and midweek days in late September for Chinook and coho, then set unmarked coho retention upstream of west Puget Island for October 1 through 15. That window ended on October 15 as announced, so check for any extension before you plan around it.`,
      },
      {
        type: 'p',
        text: `Ryan's calendar rates fall Chinook excellent in October and good in November. To see what a day on the water includes, read the [fall Chinook trip page](/fall-chinook).`,
      },
      { type: 'h2', text: 'Sturgeon: released, and some are big' },
      {
        type: 'p',
        text: `Every sturgeon in the report was released. The Dalles Pool had 32 released: 3 sub-legal, 15 legal and 14 over-legal. John Day Pool had 7, with 4 legal and 3 over-legal.`,
      },
      {
        type: 'p',
        text: `The report sorts sturgeon by size. Sub-legal fish are under the keepable size, over-legal fish are above it, and legal fish fall in the size range where keeping may be allowed on open days. Big over-legal fish are the ones that make the photos.`,
      },
      {
        type: 'p',
        text: `Sturgeon retention is tightly controlled and set by the state, and most of our sturgeon fishing is catch and release. If a long fight and a photo are what you want, the [sturgeon trip page](/sturgeon) covers what to expect.`,
      },
      { type: 'h2', text: 'What a late-season day looks like on the boat' },
      {
        type: 'img',
        src: '/Gallery/opt/rsw_1280h_960-5-full.webp',
        alt: 'A family aboard the guide boat with rods set out behind it, waiting on the bite',
        caption: 'Rods out, waiting on the bite',
        width: 1280,
        height: 960,
      },
      {
        type: 'p',
        text: `In the photo above, a family has the rods set out behind the boat and is waiting on a bite. That is the shape of most salmon trips: lines in the water, a quiet stretch, then the rod loads.`,
      },
      {
        type: 'p',
        text: `Fall trips start with an early launch. Rods, tackle and coaching are all aboard, and your catch leaves filleted, cleaned and packed. You do not need experience. You do need warm layers and a rain jacket, because late October on the river is cold and often damp.`,
      },
      {
        type: 'p',
        text: `Ryan picks the river running best on your dates, which is why a call before you book is worth more than any calendar. Tell him who is coming and how much fishing experience the group has, and he will plan the day around that.`,
      },
      {
        type: 'img',
        src: '/Gallery/opt/Screenshot_20240922_164012_Messages-full.webp',
        alt: 'A woman and two teenage boys at the boat ramp holding six coho salmon',
        caption: 'Six silvers and a very full cooler',
        width: 1078,
        height: 922,
      },
      {
        type: 'p',
        text: `Bring a cooler if you are driving far. The full trip list, including what each outing costs, is on the [excursions page](/excursions) and the [pricing page](/pricing).`,
      },
      { type: 'h2', text: 'Planning ahead: November, December and steelhead' },
      {
        type: 'p',
        text: `Ryan's salmon calendar rates both coho and fall Chinook as good in November. In December it rates fall Chinook as fair and coho as poor, so the salmon window is closing as the year ends.`,
      },
      {
        type: 'p',
        text: `Winter steelhead pick up where salmon leave off. ODFW's [Northwest Zone page](https://myodfw.com/fishing/northwest-zone) says winter steelhead enter rivers from November or December and can continue through April, depending on fall rains. Ryan runs drift-boat steelhead trips on quiet water, described on the [winter steelhead page](/winter-steelhead).`,
      },
      {
        type: 'img',
        src: '/Gallery/opt/20200920_100218-scaled-full.webp',
        alt: 'A father and two young sons on the riverbank holding three salmon',
        caption: 'One dad, two boys, three fish',
        width: 1153,
        height: 2560,
      },
      {
        type: 'p',
        text: `If you fish trout as well, note that ODFW's October 22 report says many rivers close to trout fishing on October 31 to protect spawning and over-wintering fish.`,
      },
      { type: 'h2', text: 'Check these before you go' },
      {
        type: 'ul',
        items: [
          `Read the current [Oregon sport fishing regulations and updates](https://myodfw.com/articles/oregon-fishing-hunting-regulations-and-updates). Open sections and bag limits can change from week to week.`,
          `Check the latest counts in the [Columbia Zone report](https://myodfw.com/recreation-report/fishing-report/columbia-zone).`,
          `The Oregon Health Authority advises limiting consumption of some fish from parts of the Columbia River because of mercury and PCBs, including a Bonneville Dam advisory. ODFW's report carries the notice.`,
          `Ask Ryan what you need for your date when you book. He will tell you what is open.`,
        ],
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'faq',
        items: [
          {
            q: 'What is biting on the Columbia River in late October?',
            a: `Coho. ODFW's October 22 report calls coho fishing fair to good near the mouths of some tributaries. Chinook and sturgeon were released, not kept.`,
          },
          {
            q: 'Can I keep a Chinook or sturgeon right now?',
            a: `The report shows only releases for both. Retention rules are set by the state and change in-season, so check the [regulations updates](https://myodfw.com/articles/oregon-fishing-hunting-regulations-and-updates) or ask Ryan before you go.`,
          },
          {
            q: 'When does winter steelhead fishing start?',
            a: `ODFW says winter steelhead enter rivers from November or December and can continue through April, depending on fall rains. See the [winter steelhead page](/winter-steelhead).`,
          },
          {
            q: 'Do I need fishing experience for a coho trip?',
            a: `No. Rods, tackle and coaching are aboard, and Ryan handles the boat. Beginners and kids are welcome.`,
          },
          {
            q: 'What should I bring on a fall trip?',
            a: `Warm layers, a rain jacket, non-slip shoes, snacks and a cooler for your fish. Rods, tackle and bait are aboard.`,
          },
          {
            q: 'How do I book a trip?',
            a: `Use the [contact page](/contact) or call (503) 936-9090 and tell Ryan your dates and who is coming.`,
          },
        ],
      },
      { type: 'cta', label: 'Book your trip with Ryan', href: '/contact' },
    ],
  },
  {
    slug: 'oregon-dungeness-crab-season',
    title: "Oregon Dungeness Crab Season: What's Open Right Now",
    excerpt:
      'Oregon Dungeness crab season right now: ocean crabbing is closed through Nov. 30, but bays are open. Here is what ODFW reports and the rules to know.',
    category: 'Crabbing',
    date: '2026-10-28',
    readMins: 7,
    image: '/crabpots.webp',
    imageAlt:
      'Two crabbers on a boat holding Dungeness crab beside blue crab pots on a misty Oregon bay',
    body: [
      {
        type: 'p',
        text: `If you are looking up Oregon Dungeness crab season this week, the answer comes in two parts. Ocean waters are closed to crabbing from October 16 through November 30. Bays, beaches, estuaries, tide pools, piers and jetties stay open all year, unless a toxin closure says otherwise.`,
      },
      {
        type: 'p',
        text: `Both facts come from ODFW's marine crabbing and clamming report, dated October 22. This post walks through that report and the state's other notices, so you know what to expect before you plan a trip or load the truck.`,
      },
      {
        type: 'img',
        src: '/crabtrip.webp',
        alt: 'A guest in a ball cap holding up two Dungeness crab on the deck of a boat under a blue sky',
        caption: 'Two keepers, straight out of the pot',
        width: 900,
        height: 1600,
      },
      { type: 'h2', text: 'What is open for crabbing this week' },
      {
        type: 'p',
        text: `Start with ODFW's [Crabbing and Clamming report](https://myodfw.com/recreation-report/crabbing-clamming-report). It says the ocean is closed to crabbing from October 16 to November 30, and that bays and the other inshore areas listed above are open year-round.`,
      },
      {
        type: 'p',
        text: `The Oregon Department of Agriculture tests for shellfish toxins and posts the results on its [shellfish closures page](https://www.oregon.gov/oda/food-safety/shellfish/pages/shellfish-closures.aspx). As of its October 19 update, sport crab harvest was open along the entire coast. Sport razor clamming was closed from the Washington border to the California border because of high domoic acid.`,
      },
      {
        type: 'p',
        text: `That razor clam closure does not apply to crab, but it is a good reminder that closures change. ODA says it tests at least twice a month, and reopening an area takes two consecutive results below the closure limit. Call the biotoxin hotline at 1-800-448-2474 before you harvest.`,
      },
      { type: 'h2', text: 'What crabbers are finding in the bays' },
      {
        type: 'p',
        text: `ODFW's October 22 report includes port-by-port notes, and they are mixed. Tillamook was slow from both a boat and the dock. Netarts was fair from both. Newport was fair from a boat and good for red rock crab from the dock. Waldport was fair from a boat and slow from the dock. Charleston was fair from both.`,
      },
      {
        type: 'p',
        text: `Two notes from the same report help explain the numbers. Heavy rain can raise river flows and push crabs toward saltier ocean water, so bay crabbing can be less successful for a while. And many crabs right now are soft, recently molted males that are still filling with meat and hardening their shells.`,
      },
      {
        type: 'p',
        text: `Put together, that suggests patience more than panic. A slow dock report after a rainy week does not mean the crab are gone.`,
      },
      { type: 'h2', text: 'Boat or dock: why the difference matters' },
      {
        type: 'p',
        text: `ODFW's port notes split the results into crabbing from a boat and crabbing from the dock, and the two often differ. At Newport, for example, boats were fair while the dock was good for red rock crab. At Waldport the pattern ran the other way around.`,
      },
      {
        type: 'p',
        text: `The reason is simple. A dock crabber works the water within reach of the pier. A boat can set pots on more ground and move them when a spot goes quiet. That flexibility is a big part of why a guided boat day can outfish a day on the dock, even when the dock report is slow.`,
      },
      {
        type: 'p',
        text: `Red rock crab is a different species from Dungeness, so a good red rock report at the dock does not tell you much about Dungeness. Read the notes closely before you decide what to expect.`,
      },
      { type: 'h2', text: 'The rules every crabber should know' },
      {
        type: 'p',
        text: `ODFW's [Dungeness crab page](https://myodfw.com/crabbing-clamming/species/dungeness-crab) is clear on the biggest one: only male crab 5-3/4 inches or larger may be kept. Females may not be kept. Measure every crab before it goes in the cooler.`,
      },
      {
        type: 'p',
        text: `On licensing, ODFW says shellfish licenses are available for youth and adults 12 and older. Daily limits and gear limits are not spelled out on those ODFW pages, so check the permanent regulations on [eRegulations](https://www.eregulations.com/oregon/fishing/) or ask ODFW directly through its [contact page](https://myodfw.com/contact-us).`,
      },
      {
        type: 'img',
        src: '/crabcatch.webp',
        alt: 'A white cooler packed with Dungeness crab on the deck of a boat',
        caption: 'Bring a bigger cooler than you think you need',
        width: 898,
        height: 1599,
      },
      { type: 'h2', text: 'A simple plan for your first crab day' },
      {
        type: 'ul',
        items: [
          `Check ODFW's weekly report and the ODA closures page in the week you plan to go. Conditions move quickly.`,
          `Decide how you want to crab: from a dock or bank, or on a guided boat with pots.`,
          `Get the right shellfish licenses sorted for everyone who needs one.`,
          `Pack a big cooler, warm layers and rain gear.`,
          `Measure every crab, return females, and keep only male crab that reach 5-3/4 inches.`,
        ],
      },
      {
        type: 'p',
        text: `None of this is complicated, but the order matters. Skipping the closure check or turning up without a license is the easiest way to spoil a day.`,
      },
      { type: 'h2', text: 'Why late fall and winter are worth planning around' },
      {
        type: 'p',
        text: `ODFW says fall and winter can be excellent times for crabbing and clamming. The ocean closure runs through November 30, so the plan for many people is simple: use the bays now, and look at ocean trips once the season reopens. Closures can change, so confirm the dates with ODFW before you book.`,
      },
      {
        type: 'p',
        text: `Crabbing is not the only fall option, either. If you want fish as well as shellfish, the Columbia coho bite is covered in our [Columbia River fishing report for October](/articles/columbia-river-fishing-report-october), and winter steelhead start entering rivers from November or December.`,
      },
      { type: 'h2', text: 'What a crab trip with Ryan looks like' },
      {
        type: 'p',
        text: `A [crab trip](/dungeness-crab) is the most hands-on day Ryan runs. You help drop the pots, you help pull them, and you sort what comes up. There is no technique to master and no waiting on a single bite, which is why families like it.`,
      },
      {
        type: 'ul',
        items: [
          `Pots, bait, gloves and handling are all provided.`,
          `Bring a cooler with room in it. Guests routinely underestimate this.`,
          `Dress warm, because the coast is cooler than inland, and wear a waterproof outer layer, because pulling pots is a wet job.`,
          `Wear non-slip footwear.`,
        ],
      },
      {
        type: 'p',
        text: `Crab trips start from $150 per person, with a $50 per person deposit to reserve your date. Details are on the [pricing page](/pricing). Crabbing windows are set by the state and shift from year to year, so Ryan will tell you exactly what is open on your dates when you call.`,
      },
      { type: 'h2', text: 'Check these before you go' },
      {
        type: 'ul',
        items: [
          `Read ODFW's weekly [Crabbing and Clamming report](https://myodfw.com/recreation-report/crabbing-clamming-report) for open areas and conditions.`,
          `Check the ODA [shellfish closures page](https://www.oregon.gov/oda/food-safety/shellfish/pages/shellfish-closures.aspx) or call 1-800-448-2474 for toxin closures.`,
          `Confirm limits and gear rules in the [Oregon fishing regulations](https://www.eregulations.com/oregon/fishing/).`,
          `Make sure everyone who needs a shellfish license has one.`,
        ],
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'faq',
        items: [
          {
            q: 'Is ocean crabbing open in Oregon right now?',
            a: `No. ODFW's October 22 report says ocean waters are closed to crabbing from October 16 to November 30. Bays, beaches, estuaries, tide pools, piers and jetties are open all year unless closed for toxins.`,
          },
          {
            q: 'Can I keep female Dungeness crab?',
            a: `No. ODFW says only male crab 5-3/4 inches or larger may be kept, and females may not be kept.`,
          },
          {
            q: 'How big does a Dungeness crab have to be to keep?',
            a: `At least 5-3/4 inches, and it must be a male. Measure each crab before you keep it.`,
          },
          {
            q: 'Do I need a license to go crabbing?',
            a: `ODFW offers shellfish licenses for youth and adults 12 and older, and the [crab trip page](/dungeness-crab) says every participant needs the appropriate valid license. Ask Ryan if you are unsure what your group needs.`,
          },
          {
            q: 'How do I check whether crab is safe to harvest?',
            a: `Check ODA's [shellfish closures page](https://www.oregon.gov/oda/food-safety/shellfish/pages/shellfish-closures.aspx) or call the biotoxin hotline at 1-800-448-2474 before you harvest.`,
          },
          {
            q: 'How much does a guided crab trip cost?',
            a: `From $150 per person, with a $50 per person deposit. Pots, bait and handling gear are included. See the [pricing page](/pricing).`,
          },
        ],
      },
      { type: 'cta', label: 'Ask Ryan about a crab trip', href: '/contact' },
    ],
  },
  {
    slug: 'oregon-winter-steelhead-fishing-guide',
    title: 'Oregon Winter Steelhead Fishing Guide: What to Expect on the Water',
    excerpt:
      "Thinking about booking an Oregon winter steelhead fishing guide? Here's what the season, the coastal rivers, and a real day on the water look like.",
    category: 'Steelhead',
    date: '2026-10-29',
    readMins: 5,
    image: '/articles/winter-steelhead/cover.webp',
    imageAlt:
      'Illustration of a steelhead leaping on an Oregon coastal river at first light, with an empty drift boat, firs and winter rain',
    body: [
      {
        type: 'p',
        text: `Winter steelhead fishing is not an easy sell. The season runs through the coldest, wettest months of the year, and most trips start in the dark, long before the ramp parking lot fills up with anyone else. So why do so many anglers book an Oregon winter steelhead fishing guide every December anyway? Because a fresh winter fish on light tackle does something no other species in this river system does. It is never a numbers game. One good steelhead, hooked clean and fought all the way to the net, is the fish people are still describing to friends a year later.`,
      },
      { type: 'h2', text: 'Why anglers put up with the rain' },
      {
        type: 'p',
        text: `Winter steelhead earn their reputation the hard way. A fish this size should not fight like this. Hook one on light tackle or a fly rod and it will take line hard, change direction mid-run, and jump when you least expect it. Pound for pound, it is the hardest fighting fish most Oregon anglers will ever hold a rod against, and it is why so many people keep coming back to the same cold rivers every winter.`,
      },
      {
        type: 'p',
        text: `December through April is also the quiet season on the water. The summer crowds are gone, the boat ramps sit empty, and a January morning on a coastal tributary can feel like you have the whole river to yourself.`,
      },
      {
        type: 'img',
        src: '/Gallery/opt/20150222_084405-scaled-full.webp',
        alt: 'A smiling angler in a camo jacket holding a bright winter steelhead aboard a boat on a misty, tree-lined river',
        caption: 'Mist on the water, steel on the line',
        width: 1600,
        height: 900,
      },
      { type: 'h2', text: 'When the season actually runs' },
      {
        type: 'p',
        text: `Winter steelhead show up on Oregon's coastal tributaries from roughly December through April. ODFW puts winter-run timing a little wider, from November into April, and notes that Oregon's coastal streams are mostly winter-run.`,
      },
      {
        type: 'p',
        text: `These rivers rise and drop fast with the rain, sometimes overnight. Captain Ryan checks water levels a day or two before your trip and picks whichever tributary is actually fishable that week, running the lighter 18-foot Clackacraft where the water calls for it, rather than committing to one spot out of habit. That is a large part of what hiring a guide buys you on this trip: knowing which river is in shape this week, instead of driving out and hoping.`,
      },
      {
        type: 'img',
        src: '/articles/winter-steelhead/season-chart.webp',
        alt: 'Chart showing winter-run steelhead in Oregon coastal streams from November to April, with the typical guided trip season from December to April',
        width: 1800,
        height: 904,
        graphic: true,
      },
      { type: 'h2', text: 'Fly rod or light tackle, your call' },
      {
        type: 'p',
        text: `Some anglers want a fly rod in their hands for this one. Others want to drift bait or hardware on light conventional gear. Both approaches work on the coastal rivers Catching Chrome fishes, and both give you a real shot at a winter fish. Just mention your preference when you book. Captain Ryan rigs the boat for your choice ahead of time, so there is no guessing or re-rigging once you are on the water.`,
      },
      { type: 'h2', text: 'Wild fish go back, hatchery fish go home' },
      {
        type: 'p',
        text: `Some of the steelhead you hook on an Oregon coastal river will be wild, and in most coastal waters those go back in the water. Wild steelhead runs have been under real pressure for years, which is why release rules exist in the first place. [ODFW's steelhead page](https://myodfw.com/fishing/species/steelhead) is a good primer if you want the general picture before you go.`,
      },
      {
        type: 'p',
        text: `A hatchery fish, easy to spot by its missing adipose fin, is yours to keep where the river is open for hatchery harvest. It gets cleaned and bagged for you before you head home. Either way, every fish that comes aboard is handled carefully, and the ones headed back to the river go back fast, with as little time out of the water as possible.`,
      },
      {
        type: 'img',
        src: '/articles/winter-steelhead/wild-vs-hatchery.webp',
        alt: 'Illustration comparing a wild steelhead with its adipose fin intact and a hatchery steelhead with the adipose fin removed',
        width: 1800,
        height: 1280,
        graphic: true,
      },
      { type: 'h2', text: 'Is this your first trip with a guide?' },
      {
        type: 'p',
        text: `Winter steelhead is the most technical trip Catching Chrome runs, and it is worth saying that plainly before you book. If you have never been fishing with a guide before, a [shad trip](/american-shad) or a [salmon run](/fall-chinook) in season is usually the better place to start, since both give you steady action without needing much technique.`,
      },
      {
        type: 'p',
        text: `Save steelhead for when you are ready to be tested. The anglers who book this trip tend to come back for it every winter, because the challenge is most of the appeal.`,
      },
      {
        type: 'img',
        src: '/articles/winter-steelhead/which-trip.webp',
        alt: 'Comparison of American shad, fall Chinook and winter steelhead trips by season, skill level, pace of action and who each suits',
        width: 1800,
        height: 1040,
        graphic: true,
      },
      { type: 'h2', text: 'What to bring' },
      {
        type: 'p',
        text: `Pack for the weather you are actually fishing in, not the weather you wish you had. Real rain gear, not a windbreaker. Warm layers, with a spare pair of gloves tucked in a dry bag, because wet gloves ruin a morning fast. Non-slip, waterproof footwear for a boat deck in the rain. And bring a thermos. A cold January morning with hot coffee in hand is a different morning entirely.`,
      },
      {
        type: 'img',
        src: '/articles/winter-steelhead/packing-list.webp',
        alt: 'Winter steelhead packing list beside a river illustration: rain gear, warm layers, spare gloves, waterproof boots, a thermos and an Oregon license with tags',
        width: 1800,
        height: 872,
        graphic: true,
      },
      { type: 'h2', text: 'Booking a winter steelhead trip' },
      {
        type: 'p',
        text: `Winter steelhead trips run $250 per person, with a $50 per person deposit to hold your date. Weather and river conditions are always the captain's call, made with safety first, and a trip that gets postponed comes with a rain check rather than a lost day.`,
      },
      {
        type: 'p',
        text: `Winter dates move fast once the rivers start producing, so if a January or February weekend is what you are after, it is worth calling ahead rather than waiting until the week of. [Check availability for a winter steelhead trip](/winter-steelhead) or look over [full pricing for every trip Catching Chrome runs](/pricing) before you book.`,
      },
      {
        type: 'img',
        src: '/Gallery/opt/FullSizeRender-full.webp',
        alt: 'A bearded angler in a beanie holding a large winter steelhead in a drift boat on a cold river at dusk',
        caption: 'Why we fish in January',
        width: 1600,
        height: 1200,
      },
      {
        type: 'p',
        text: `Captain Ryan has been fishing these rivers for over forty years, rain included. Book early, dress for the weather, and come find out why the die-hards never miss this season.`,
      },
      { type: 'cta', label: 'Book a winter steelhead trip', href: '/contact' },
    ],
  },
]

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}

export function relatedArticles(slug: string, count = 3): Article[] {
  const current = getArticle(slug)
  const others = ARTICLES.filter((a) => a.slug !== slug)
  // Same-category first, then the rest in list order.
  others.sort(
    (a, b) =>
      Number(b.category === current?.category) -
      Number(a.category === current?.category),
  )
  return others.slice(0, count)
}

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
