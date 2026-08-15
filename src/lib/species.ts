/**
 * Content for the per-species landing pages (/american-shad, /fall-chinook, …).
 *
 * These exist because the ad campaigns point at species URLs. Sending that
 * click to a shared /excursions anchor works, but a redirect costs Quality
 * Score and lands the visitor on a page that talks about six trips when they
 * asked about one. Each slug below is a real page, 200, URL unchanged.
 *
 * Everything here is grounded in copy that already existed on the site:
 * SignatureTripsSection (season windows, descriptions), PricingSection (rates),
 * fishingCalendar (peak months, rivers) and FaqSection (what's included).
 * Nothing about seasons, regulations or rates is invented — where Ryan hasn't
 * confirmed a detail it is left out rather than guessed at, which is why the
 * crab page carries no season window.
 */

export type QuickFact = { label: string; value: string }
export type Faq = { q: string; a: string }

export type SpeciesPage = {
  slug: string
  /** H1 / card title. */
  name: string
  /** Sits under the H1 in the hero. */
  tagline: string
  /** Season chip, omitted where the window isn't confirmed. */
  season?: string
  image: string
  metaTitle: string
  metaDescription: string
  /** Opening two or three paragraphs. */
  intro: string[]
  quickFacts: QuickFact[]
  /** "Why this trip" cards. */
  highlights: { title: string; body: string }[]
  /** How the day runs, three steps. */
  dayPlan: { step: string; title: string; body: string }[]
  /** Species-specific kit notes, on top of the site-wide included list. */
  bring: string[]
  faqs: Faq[]
  /** Slugs of the two trips shown at the bottom. */
  related: string[]
}

export const SPECIES_PAGES: Record<string, SpeciesPage> = {
  'american-shad': {
    slug: 'american-shad',
    name: 'American Shad',
    tagline: 'Light Gear, Non-Stop Bites',
    season: 'Mid May to Mid June',
    image: '/americanshad.webp',
    metaTitle: 'American Shad Fishing Trips in Oregon | Catching Chrome',
    metaDescription:
      'Guided American shad trips on the Columbia, mid May to mid June. Warm weather, light tackle and non-stop action, the perfect first trip for kids and new anglers.',
    intro: [
      'Shad are the most underrated fishery in Oregon. For a few weeks in late spring, millions of them push up the Columbia, and when you find the school the bite simply does not stop. It is the one trip where the question is not whether you will hook up, but how long your arms will hold out.',
      'Because they hit hard on light gear, shad are the trip we point families and first-timers toward. There is no long wait between fish, no complicated technique to learn, and a four pound shad on a light rod pulls hard enough to make a ten year old shout.',
    ],
    quickFacts: [
      { label: 'Season', value: 'Mid May to mid June' },
      { label: 'Where', value: 'Columbia River' },
      { label: 'Gear', value: 'Light spinning tackle' },
      { label: 'Best for', value: 'Kids, first-timers, families' },
      { label: 'Pricing', value: 'Call for pricing' },
    ],
    highlights: [
      {
        title: 'Volume Fishing',
        body: 'When the run is in, hookups come in steady succession. This is the trip for anyone who wants their rod bent rather than a long day of waiting for one bite.',
      },
      {
        title: 'Nothing To Learn',
        body: 'The technique takes about five minutes to pick up. Ryan sets the gear, shows you the retrieve, and you are fishing. No experience assumed.',
      },
      {
        title: 'Warm Weather',
        body: 'A late spring fishery, so you get the mild end of the Oregon calendar. No pre-dawn cold, no winter rain gear, just a comfortable day on the water.',
      },
      {
        title: 'Great With Kids',
        body: 'Short waits, light rods and constant action are exactly what holds the attention of a kid. Tell us their ages when you book and we will pitch the day to suit.',
      },
    ],
    dayPlan: [
      {
        step: '01',
        title: 'Meet at the ramp',
        body: 'We confirm the launch point a day or two ahead, based on where the run is stacking up. Gear is already aboard and rigged.',
      },
      {
        step: '02',
        title: 'Find the school',
        body: 'Shad move in tight columns. Ryan works the boat until the sounder lights up, then holds you on the fish for as long as they keep biting.',
      },
      {
        step: '03',
        title: 'Fish, then head in',
        body: 'You fish until the bite tapers or the day runs out. Anything you keep gets cleaned and bagged before you leave the ramp.',
      },
    ],
    bring: [
      'Sunscreen and a hat, late spring sun on the water is stronger than it feels',
      'Polarized sunglasses',
      'A cooler if you plan to take fish home',
    ],
    faqs: [
      {
        q: 'Is a shad trip good for young kids?',
        a: 'It is the trip we recommend most for kids and first-time anglers. The action is close to constant, the gear is light enough for small hands, and nobody has to sit still waiting for a bite. Let us know ages ahead of time so we can tailor the day.',
      },
      {
        q: 'When exactly is the shad run?',
        a: 'The window runs roughly mid May to mid June. The peak shifts a little year to year with water temperature and flow, so call ahead and we will tell you where the run is at.',
      },
      {
        q: 'Do shad make good eating?',
        a: 'They are bony but excellent smoked, and the roe is prized. Plenty of guests fish them purely for the action and release them. Either way, anything you keep is cleaned and bagged for you.',
      },
      {
        q: 'What does a shad trip cost?',
        a: 'Shad trips are priced per group rather than off the standard rate card, so give us a call and we will quote your party. A deposit reserves the date.',
      },
    ],
    related: ['spring-chinook', 'dungeness-crab'],
  },

  'fall-chinook': {
    slug: 'fall-chinook',
    name: 'Fall Chinook',
    tagline: 'Our Best Pure King Fishery',
    season: 'August to October',
    image: '/fallchinook.webp',
    metaTitle: 'Fall Chinook Salmon Fishing Trips in Oregon | Catching Chrome',
    metaDescription:
      'Guided fall Chinook trips on the Columbia and Oregon coastal rivers, August through October. Chrome-bright kings, full day $250 or half day $150 per person.',
    intro: [
      'Fall Chinook are the reason a lot of people book a guide in the first place. From August through October the kings push in chrome-bright and full of fight, and the Columbia and the coastal rivers turn into the best pure salmon fishery we run all year.',
      'These are big, powerful fish. A hooked fall king will take line whether you are ready or not, and the fight tends to last long enough that everyone on the boat stops what they are doing to watch. If you are going to do one salmon trip, do this one.',
    ],
    quickFacts: [
      { label: 'Season', value: 'August to October' },
      { label: 'Peak', value: 'Late August to October' },
      { label: 'Where', value: 'Columbia, Rogue, Umpqua, Wilson, Trask, Nestucca, Nehalem' },
      { label: 'Boat', value: '22ft sled or 18ft Clackacraft' },
      { label: 'Pricing', value: 'Full day $250, half day $150 per person' },
    ],
    highlights: [
      {
        title: 'The Strongest Fish',
        body: 'Fall kings come in fresh and heavy. Pound for pound this is the hardest sustained fight of any salmon we target, and the one guests talk about afterwards.',
      },
      {
        title: 'Peak Numbers',
        body: 'Late August through October is the densest stretch of the salmon calendar. More fish in the system means more chances at a good one.',
      },
      {
        title: 'Water That Suits The Day',
        body: 'We run the Columbia and seven coastal rivers. Ryan picks the one fishing best on your dates rather than fishing the same stretch regardless.',
      },
      {
        title: 'Filled Coolers',
        body: 'A good fall day sends guests home with real weight in the cooler. Cleaning, filleting and bagging are handled before you leave the ramp.',
      },
    ],
    dayPlan: [
      {
        step: '01',
        title: 'Early launch',
        body: 'Fall Chinook fish best in the first light. We start early, with rods rigged and the boat already on the water when you arrive.',
      },
      {
        step: '02',
        title: 'Work the run',
        body: 'Trolling, back-bouncing or anchor fishing depending on the river and the stage of the tide. Ryan runs the gear and coaches the hookset.',
      },
      {
        step: '03',
        title: 'Fish cleaned and bagged',
        body: 'Your catch is filleted, bagged and iced at the ramp. You drive off with it ready for the freezer.',
      },
    ],
    bring: [
      'Layers, mornings on the water in October run cold',
      'Rain gear for the back end of the season',
      'Non-slip footwear',
      'A cooler with ice for the drive home',
    ],
    faqs: [
      {
        q: 'When is the best time to book a fall Chinook trip?',
        a: 'Late August through October is the peak of the run. September dates go first, so book early if you want a weekend inside that window.',
      },
      {
        q: 'How big do fall Chinook run?',
        a: 'Fall kings are the largest salmon we target. Sizes vary year to year with the return, so ask when you call and we will tell you honestly how the run is shaping up.',
      },
      {
        q: 'Which river will we fish?',
        a: 'We fish the Columbia plus the Rogue, Umpqua, Wilson, Trask, Nestucca and Nehalem. Ryan picks the water running best on your dates and confirms the launch point ahead of the trip.',
      },
      {
        q: 'What does a fall Chinook trip cost?',
        a: 'Full day trips are $250 per person and half days are $150 per person. A $50 per person deposit reserves your date, with the balance settled on the day.',
      },
    ],
    related: ['spring-chinook', 'winter-steelhead'],
  },

  'spring-chinook': {
    slug: 'spring-chinook',
    name: 'Spring Chinook',
    tagline: 'The Best Eating Salmon In The West',
    season: 'Mid March to Mid June',
    image: '/summerchinook.webp',
    metaTitle: 'Spring Chinook Fishing Trips in Oregon | Catching Chrome',
    metaDescription:
      'Guided spring Chinook trips on the Willamette, Clackamas, Sandy, McKenzie and Rogue, mid March to mid June. Peak April and May. $250 full day per person.',
    intro: [
      'Springers are the run anglers plan their year around. They arrive between mid March and mid June carrying the highest fat content of any salmon in the system, which is why people fly across the country for a fish they could technically buy at a counter.',
      'It is a more technical fishery than the fall run. The fish are fewer and pickier, and a spring Chinook day is often decided by being in the right slot at the right hour. That is most of what you are hiring a guide for.',
    ],
    quickFacts: [
      { label: 'Season', value: 'Mid March to mid June' },
      { label: 'Peak', value: 'April to May' },
      { label: 'Where', value: 'Willamette, Clackamas, Sandy, McKenzie, Rogue' },
      { label: 'Known for', value: 'Rich, high-fat meat' },
      { label: 'Pricing', value: 'Full day $250, half day $150 per person' },
    ],
    highlights: [
      {
        title: 'Worth The Table',
        body: 'Spring Chinook are prized worldwide for their flavor. The high fat content that gets them through a long migration is exactly what puts them above every other salmon on the plate.',
      },
      {
        title: 'The First Run',
        body: 'After a winter of steelhead, springers are the first great salmon run of the year. Mild weather, long light and rivers that are finally fishing well.',
      },
      {
        title: 'Local Knowledge Pays',
        body: 'Springer fishing rewards knowing which slot is producing this week. Ryan fishes these rivers all season, so you are not spending your day searching.',
      },
      {
        title: 'Five Rivers',
        body: 'The Willamette, Clackamas, Sandy, McKenzie and Rogue all get a run. We fish whichever is timing best against your dates.',
      },
    ],
    dayPlan: [
      {
        step: '01',
        title: 'Pick the water',
        body: 'A day or two out we confirm which river is producing and set the launch point and start time around it.',
      },
      {
        step: '02',
        title: 'Fish the slot',
        body: 'Trolling or anchor fishing the holding water, with Ryan reading the river and moving when the bite tells him to.',
      },
      {
        step: '03',
        title: 'Take it home',
        body: 'Anything you keep is cleaned, filleted and bagged at the ramp, ready for the drive back.',
      },
    ],
    bring: [
      'Layers, spring mornings on the Willamette start cold',
      'Rain gear, March and April earn it',
      'Polarized sunglasses',
      'A cooler with ice',
    ],
    faqs: [
      {
        q: 'When do spring Chinook peak?',
        a: 'April and May are the strongest months, with the wider window running mid March to mid June. Peak timing shifts with water temperature and flow each year.',
      },
      {
        q: 'Why are springers considered the best eating salmon?',
        a: 'They carry far more fat than later runs because they enter fresh water early and hold for months before spawning. That fat is what makes the meat rich, and it is why the run is prized worldwide.',
      },
      {
        q: 'Is spring Chinook harder to catch than fall?',
        a: 'Generally yes. There are fewer fish and they are more selective, so days can be slower. It is the trip where a guide who is on the water daily makes the biggest difference to your odds.',
      },
      {
        q: 'What does a spring Chinook trip cost?',
        a: 'Full day trips are $250 per person, half days $150 per person, with a $50 per person deposit to hold the date.',
      },
    ],
    related: ['fall-chinook', 'american-shad'],
  },

  'winter-steelhead': {
    slug: 'winter-steelhead',
    name: 'Winter Steelhead',
    tagline: 'Chrome Fish On Coastal Water',
    season: 'December to April',
    image: '/wintersteelhead.webp',
    metaTitle: 'Winter Steelhead Fishing Trips in Oregon | Catching Chrome',
    metaDescription:
      'Guided winter steelhead trips on Oregon coastal tributaries, December through April. Light tackle or fly rods, $250 per person. Hard-running, acrobatic chrome.',
    intro: [
      'Winter steelhead are why Oregon anglers put up with the rain. From December through April the coastal tributaries fill with chrome fish that run hard, jump often, and generally do everything they can to get off the hook.',
      'This is the most technical trip we run and the one with the strongest hold on people. Steelhead are never a numbers game, but a single fresh winter fish on light tackle is worth more than a busy day at most other fisheries.',
    ],
    quickFacts: [
      { label: 'Season', value: 'December to April' },
      { label: 'Where', value: 'Oregon coastal tributaries' },
      { label: 'Gear', value: 'Light tackle or fly rod' },
      { label: 'Known for', value: 'Hard runs and acrobatics' },
      { label: 'Pricing', value: '$250 per person' },
    ],
    highlights: [
      {
        title: 'Pound For Pound',
        body: 'Steelhead fight above their weight. Long runs, sudden direction changes and repeated jumps make a ten pound fish feel considerably larger.',
      },
      {
        title: 'Fly Or Light Tackle',
        body: 'Fish it with a fly rod or light conventional gear. Tell us your preference when you book and Ryan rigs the boat accordingly.',
      },
      {
        title: 'Quiet Water',
        body: 'Winter is the off season for crowds. The coastal tributaries in January are about as close to having a river to yourself as Oregon gets.',
      },
      {
        title: 'A Real Challenge',
        body: 'These are hard-won fish. If you have already done the salmon trips and want the one that tests you, this is it.',
      },
    ],
    dayPlan: [
      {
        step: '01',
        title: 'Check the water',
        body: 'Winter rivers rise and drop fast. Ryan watches the levels and confirms which tributary is in shape a day or two before you fish.',
      },
      {
        step: '02',
        title: 'Cover the runs',
        body: 'Drifting and working the holding water methodically, one run at a time, with coaching on presentation as you go.',
      },
      {
        step: '03',
        title: 'Handle the fish',
        body: 'Wild fish are handled carefully and released. Anything legal you choose to keep is cleaned and bagged for you.',
      },
    ],
    bring: [
      'Proper rain gear, this is a winter fishery and you will use it',
      'Warm layers and a spare pair of gloves',
      'Non-slip waterproof footwear',
      'A thermos, it is a cold morning well spent',
    ],
    faqs: [
      {
        q: 'When is the best month for winter steelhead?',
        a: 'The season runs December through April. Timing depends heavily on rainfall and river levels, so call and we will tell you which tributaries are fishing well on your dates.',
      },
      {
        q: 'Do I need to be an experienced angler?',
        a: 'No, but this is our most technical trip. If it is your first time on the water we would usually steer you to a shad or salmon trip first, and save steelhead for when you want the challenge.',
      },
      {
        q: 'Can I fish it with a fly rod?',
        a: 'Yes. Winter steelhead can be fished with a fly rod or with light conventional tackle. Say which you prefer when you book so the boat is set up for it.',
      },
      {
        q: 'What happens if the river blows out?',
        a: 'Weather calls are made by the captain with safety first, and they always come with a rain check. If the water is unfishable we reschedule rather than waste your day.',
      },
    ],
    related: ['fall-chinook', 'sturgeon'],
  },

  sturgeon: {
    slug: 'sturgeon',
    name: 'Sturgeon',
    tagline: 'The Hardest Pull In The River',
    season: 'May to July',
    image: '/sturgeon.webp',
    metaTitle: 'Sturgeon Fishing Trips on the Columbia River | Catching Chrome',
    metaDescription:
      'Guided Columbia River sturgeon trips, May through July. Prehistoric heavyweights and the hardest pull in the river. $250 per person, all gear provided.',
    intro: [
      'Sturgeon are the prehistoric heavyweight of the Columbia. They have been in this river essentially unchanged for longer than most species have existed, they grow to sizes that do not look real alongside a boat, and they pull back harder than anything else we fish for.',
      'It is a different day to salmon. You are anchored, fishing bait on heavy gear, and the wait between bites is part of it. Then a rod loads up, and for the next stretch of time nothing else on the water matters.',
    ],
    quickFacts: [
      { label: 'Season', value: 'May to July' },
      { label: 'Where', value: 'Columbia River' },
      { label: 'Style', value: 'Anchored, heavy bait gear' },
      { label: 'Known for', value: 'The hardest fight of any fish we target' },
      { label: 'Pricing', value: '$250 per person' },
    ],
    highlights: [
      {
        title: 'Genuine Size',
        body: 'Nothing else in the Columbia comes close. Hooking a big sturgeon is less like catching a fish and more like arguing with the river bed.',
      },
      {
        title: 'No Skill Barrier',
        body: 'The technique is simple. Holding on is the hard part, which makes this a trip that works for strong beginners as well as experienced anglers.',
      },
      {
        title: 'Heavy Gear Handled',
        body: 'Rods, reels, terminal tackle and bait are all provided and rigged. You do not need to own anything for this fishery.',
      },
      {
        title: 'Memorable Photos',
        body: 'Sturgeon make for pictures nobody at home quite believes. Ryan handles the fish and gets the shot before the release.',
      },
    ],
    dayPlan: [
      {
        step: '01',
        title: 'Anchor up',
        body: 'We run to the holding water and set the anchor. Ryan baits and sets the rods while you get comfortable.',
      },
      {
        step: '02',
        title: 'Wait, then hang on',
        body: 'Sturgeon bites build rather than snap. Ryan calls the moment to pick up the rod and set, and coaches you through the fight.',
      },
      {
        step: '03',
        title: 'Photos and release',
        body: 'Fish are brought boatside, handled carefully, photographed and released unless the season allows retention.',
      },
    ],
    bring: [
      'Sun protection, an anchored boat in June gets full sun',
      'Polarized sunglasses',
      'Food and drinks, this is a patient fishery',
      'A camera, or a phone with room on it',
    ],
    faqs: [
      {
        q: 'Can I keep a sturgeon?',
        a: 'Retention is tightly controlled and the rules are set each season by the state. Most of our sturgeon fishing is catch and release. Ask when you book and we will tell you exactly what applies to your dates.',
      },
      {
        q: 'How big do they get?',
        a: 'Columbia River sturgeon reach sizes well beyond anything else in the system, which is what makes the fight so memorable. Ryan will set realistic expectations for your dates when you call.',
      },
      {
        q: 'Is sturgeon fishing hard?',
        a: 'The technique is straightforward, which makes it a good trip for newer anglers with a bit of strength. The fight is the demanding part, not the fishing.',
      },
      {
        q: 'What does a sturgeon trip cost?',
        a: '$250 per person, with a $50 per person deposit to reserve the date. All rods, reels, tackle and bait are included.',
      },
    ],
    related: ['fall-chinook', 'winter-steelhead'],
  },

  'dungeness-crab': {
    slug: 'dungeness-crab',
    name: 'Dungeness Crab',
    tagline: 'Pots Down, Coolers Full',
    // No season chip: Ryan hasn't confirmed the crab window, and the season is
    // the one detail a guest plans a drive around. Left off rather than guessed
    // at, matching the trip card in SignatureTripsSection.
    image: '/crabtrip.webp',
    metaTitle: 'Dungeness Crab Trips on the Oregon Coast | Catching Chrome',
    metaDescription:
      'Guided Dungeness crab trips off the Oregon coast. Pots, bait and gear handled for you, hands-on and family friendly. From $150 per person.',
    intro: [
      'Crab trips are the most hands-on day we run. You drop the pots, you pull them back, and you sort what comes up. There is no technique to master and no waiting for a bite, which is why so many guests rate it as their favorite day on the water.',
      'It is also the one you eat best from. Ocean-fresh Dungeness straight off the coast is a different thing to what you find at a counter, and a good day sends everyone home with a full cooler.',
    ],
    quickFacts: [
      { label: 'Where', value: 'Oregon coast' },
      { label: 'Style', value: 'Baited pots, hands-on' },
      { label: 'Gear', value: 'Pots, bait and handling all provided' },
      { label: 'Best for', value: 'Families and groups' },
      { label: 'Pricing', value: 'From $150 per person' },
    ],
    highlights: [
      {
        title: 'Everyone Takes Part',
        body: 'Setting and pulling pots is a job the whole boat shares. Nobody sits watching, which is what makes it work so well for families.',
      },
      {
        title: 'Straight To The Table',
        body: 'Dungeness caught that morning is as good as shellfish gets. You take home exactly what you pulled.',
      },
      {
        title: 'Nothing To Bring',
        body: 'Pots, bait, gloves and handling are all covered. Turn up with a cooler and warm clothes and that is the full list.',
      },
      {
        title: 'A Real Coast Day',
        body: 'Working pots off the Oregon coast is a genuinely different day out to river fishing, and an easy one to sell to a group with mixed interest levels.',
      },
    ],
    dayPlan: [
      {
        step: '01',
        title: 'Set the pots',
        body: 'We bait up and drop the pots on the ground Ryan is working that week, then let them soak.',
      },
      {
        step: '02',
        title: 'Pull and sort',
        body: 'Back around to haul them in. You sort the catch, measure, and return anything that has to go back.',
      },
      {
        step: '03',
        title: 'Load the cooler',
        body: 'Your keepers come home with you. Bring a cooler with room in it, guests routinely underestimate this.',
      },
    ],
    bring: [
      'A cooler, a bigger one than you think you need',
      'Warm layers, the coast is cooler than inland',
      'Waterproof outer layer, pulling pots is a wet job',
      'Non-slip footwear',
    ],
    faqs: [
      {
        q: 'When is crab season?',
        a: 'Crabbing windows are set by the state and shift year to year, so rather than publish a date that goes stale we would rather you called. Ryan will tell you exactly what is open on your dates.',
      },
      {
        q: 'Is it suitable for kids?',
        a: 'Very. Pulling pots is hands-on and there is something happening constantly, which holds attention far better than waiting for a bite. Let us know ages so we can plan the day.',
      },
      {
        q: 'Do I need a licence for crabbing?',
        a: 'Yes, every participant needs the appropriate valid shellfish licence. We are happy to point you at the nearest vendor or the online portal before your trip.',
      },
      {
        q: 'What does a crab trip cost?',
        a: 'From $150 per person, with a $50 per person deposit to reserve the date. Pots, bait and all handling gear are included.',
      },
    ],
    related: ['american-shad', 'sturgeon'],
  },
}

/** Everything a guided trip includes, site-wide (mirrors the FAQ). */
export const INCLUDED = [
  'All rods, reels, tackle and bait',
  'Safety gear and licensed, insured captain',
  'Cleaning, filleting and bagging of your catch',
  'Coaching for every experience level',
  'Flexible launch points across Oregon waters',
]

export const SPECIES_SLUGS = Object.keys(SPECIES_PAGES)

export function getSpecies(slug: string): SpeciesPage | undefined {
  return SPECIES_PAGES[slug]
}
