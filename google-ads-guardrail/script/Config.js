/**
 * ============================================================================
 * Config.js
 * The ONLY file that should change when onboarding a new client or tuning an
 * existing one. Script logic in the other files never needs to change.
 * ============================================================================
 */

/**
 * Agency-wide kill switch on MUTATIONS only. When true, no account this
 * script runs against will ever have a negative keyword added or a campaign
 * paused, regardless of any single client's negativeKeywordMode/
 * confirmedLiveMode below (see liveMutationAllowed in Main.js#runOneAccount).
 *
 * This does NOT suppress email/Slack/Sheets dispatch — alerting is gated
 * solely by Google Ads Scripts' own Preview mode
 * (AdsApp.getExecutionInfo().isPreview(), true only for a manual "Preview"
 * button click, never for a real scheduled/"Run" execution). That split is
 * intentional: a watch-only deployment still needs to actually alert someone
 * on every real run while this stays true, which is exactly the behavior
 * already confirmed in production for PHS. Do not assume flipping this to
 * true will quiet a client's inbox — it only removes their ability to
 * mutate their own account.
 */
var FORCE_PREVIEW_MODE = true;

/**
 * 'SERIAL'  — loops accounts one at a time in this script's own execution
 *             (simplest, easiest to read logs for; fine for a handful of
 *             accounts).
 * 'PARALLEL' — uses AdsManagerApp's executeInParallel so each account runs
 *              as its own isolated execution (recommended once you're
 *              managing dozens of accounts; batches of up to 50 per Google's
 *              limit are handled automatically by Main.js).
 */
var EXECUTION_MODE = 'SERIAL';

/**
 * Defaults applied to every account unless overridden in that account's
 * entry in ACCOUNT_CONFIGS below. badWordList and whitelist are additive
 * (client lists extend these, they don't replace them) — see mergeConfig().
 * Every other key is a straight override.
 */
var DEFAULT_CONFIG = {
  clientName: 'Unnamed Client',

  // --- Reporting window ---
  lookbackDays: 7, // used by the search term scanner and CPC baseline

  // When true (default), runs a second search-terms query to attach the
  // triggering keyword's text/match type to each row for display in the
  // email's "Keyword" column. Purely cosmetic — bad-word matching and
  // negative-keyword decisions never depend on it — so large, high-volume
  // accounts can set this to false to roughly halve this script's
  // search-terms report cost if the Keyword column isn't needed.
  enrichKeywordAttribution: true,

  // --- Negative keyword automation ---
  negativeKeywordMode: 'FLAG_ONLY', // 'FLAG_ONLY' | 'AUTO_ADD'
  // Extra confirmation required, on top of negativeKeywordMode === 'AUTO_ADD'
  // and FORCE_PREVIEW_MODE === false, before this account will actually
  // mutate anything (add negatives / pause campaigns). Defaults to false so
  // a new client config is inert until someone deliberately flips it.
  confirmedLiveMode: false,

  badWordList: [
    // troubleshooting / repair / DIY
    'diy', 'repair', 'troubleshooting', 'troubleshoot', 'error', 'error code', 'error codes',
    'thermocouple', 'pilot light', 'stay lit', 'sensor', 'sensor replacement',
    'manual', 'parts', 'replacement parts', 'reset',
    // job seekers
    'jobs', 'job', 'career', 'careers', 'salary', 'indeed', 'hiring', 'resume',
    // research / non-buyer-intent
    'review', 'reviews', 'price', 'pricing', 'cost', 'how much',
  ],

  // Phrases that must NEVER become negative keywords, even if they happen to
  // contain a bad word above. Checked before every negative-keyword decision.
  whitelist: [
    'water heater replacement',
    'water heater installation',
    'replace water heater',
    'emergency water heater',
  ],

  // --- Spend guardrail: rolling-window spend with zero conversions ---
  spendGuardrail: {
    windowDays: 7,
    thresholdUSD: 150,
  },

  // --- CPA guardrail ---
  cpaGuardrail: {
    windowDays: 7,
    thresholdUSD: 200,
    autoPauseCampaign: false, // requires confirmedLiveMode === true to take effect
  },

  // --- High CPC outlier detection ---
  cpcGuardrail: {
    multiplier: 3, // flag if a search term's CPC > multiplier x account avg CPC
    minClicks: 1,
  },

  // --- Conversion tracking health check ---
  trackingHealthCheck: {
    windowDays: 7,
    minClicks: 20,
    minSpendUSD: 100,
  },

  // --- Alerting ---
  alertEmails: [],
  alwaysSendSummary: false, // if true, sends a "no issues" email even when clean
  slackWebhookUrl: '', // leave blank to disable

  // --- Google Sheets logging (optional) ---
  sheetsIntegration: {
    enabled: false,
    spreadsheetUrl: '', // e.g. https://docs.google.com/spreadsheets/d/XXXX/edit
    sheetName: 'Guardrail Log',
  },
};

/**
 * One entry per managed client account, keyed by Google Ads customer ID in
 * "123-456-7890" format. Only the values that differ from DEFAULT_CONFIG
 * need to be listed. Adding a new client = adding one object here.
 */
var ACCOUNT_CONFIGS = {
  // TODO: replace with PHS's real customer ID.
  '000-000-0001': {
    clientName: 'Preventive Home Solutions — Water Heater (Davis County, UT)',

    badWordList: [
      // from the June 2026 search terms review
      'navien', 'rheem', 'tankless',
      'chamber sensor', 'flame sensor', 'igniter', 'gas control valve',
      // retailer competitor found in June data, not previously blocked
      'rc willey',
      // TODO: add confirmed out-of-service-area city/county names (off-geo)
      // once PHS confirms their exact service boundary.
    ],

    spendGuardrail: { windowDays: 7, thresholdUSD: 150 },
    cpaGuardrail: { windowDays: 7, thresholdUSD: 200, autoPauseCampaign: false },
    cpcGuardrail: { multiplier: 3, minClicks: 1 },
    trackingHealthCheck: { windowDays: 7, minClicks: 20, minSpendUSD: 100 },

    negativeKeywordMode: 'FLAG_ONLY', // flip to AUTO_ADD after a clean preview run
    confirmedLiveMode: false,

    alertEmails: ['akash@ethixweb.com'],
    slackWebhookUrl: '',
    sheetsIntegration: { enabled: false, spreadsheetUrl: '', sheetName: 'PHS Guardrail Log' },
  },

  '148-078-4833': { // WA03. All Phase Plumbing — confirmed live account ID (from actual Preview run log)
    clientName: 'WA03. All Phase Plumbing (Seattle–Tacoma, WA)',

    // All Phase runs 29 distinct service lines (vs. PHS's single water-heater
    // line), so DIY/research signals are generalized across all of plumbing
    // here rather than tied to one appliance. These extend (not replace)
    // DEFAULT_CONFIG's badWordList, which already covers generic diy/repair/
    // troubleshooting/job-seeker/research terms plus water-heater-specific
    // ones (thermocouple, pilot light, sensor) that still apply since water
    // heaters are one of their 29 lines.
    badWordList: [
      // DIY / self-repair signals across drains, toilets, pipes
      'unclog myself', 'plunge a toilet', 'snake a drain', 'drain snake rental',
      'rent a drain snake', 'rent a sewer camera', 'auger rental',
      'how to install', 'how to replace', 'how to unclog', 'installation guide',
      'wiring diagram', 'schematic', 'tutorial', 'youtube', 'step by step',
      // DIY parts retailers — shopping for parts, not hiring a plumber
      'home depot', 'lowes', 'menards',
      // job seekers (plumbing-specific, beyond DEFAULT_CONFIG's generic set)
      'plumber salary', 'plumbing apprentice', 'apprenticeship', 'union plumber jobs',
      // reputation research, not buyer intent
      'complaints', 'bbb complaints', 'scam', 'ripoff',
      // TODO: add confirmed local competitor plumber names once the first
      // few weeks of real search-term data come in (no incident data yet
      // for this account, unlike PHS's June 2026 review — don't guess).
      // TODO: add confirmed out-of-service-area city names (off-geo) once
      // All Phase confirms their exact boundary beyond the 20 cities listed
      // in src/data/service-area-cities.ts (Seattle, Tacoma, Bellevue,
      // Kirkland, Redmond, Renton, Kent, Auburn, Federal Way, Puyallup,
      // Bonney Lake, Bothell, Des Moines, Fife, Lakewood, Mercer Island,
      // South Hill, Spanaway, Summit, Summit View, Tukwila).
    ],

    // Core buyer-intent phrases across all 29 real service lines (see
    // src/components/sections/PlumbingServicesGrid.tsx in their site repo).
    // Critical here specifically because so many of All Phase's actual
    // service names contain words that are otherwise bad-word signals
    // above/in DEFAULT_CONFIG ("repair", "replacement", "cost") — e.g.
    // "sewer line repair" is a real service line, not a DIY search, even
    // though "repair" alone is a junk signal for PHS's single water-heater
    // campaign. Whitelist is checked before any bad-word logic runs.
    whitelist: [
      'water heater replacement', 'water heater installation', 'water heater repair',
      'tankless water heater installation', 'tankless water heater replacement',
      'hot water system repair',
      'drain cleaning', 'hydro jetting', 'clogged drain repair',
      'emergency plumber', 'emergency plumbing', '24 hour plumber', 'same day plumber',
      'sewer line repair', 'sewer line replacement', 'sewer camera inspection',
      // "liner" (trenchless pipe lining), not "line" — a distinct real
      // phrase seen in this account's actual June 2026 search terms
      // ("sewer liner repair" was flagged as junk on the "repair" bad word
      // before this was added — confirmed via a live Preview run).
      'sewer liner repair', 'sewer liner replacement', 'sewer liner installation',
      'gas line repair', 'gas line installation',
      'leak detection', 'slab leak repair',
      'burst pipe repair', 'pipe repair', 'pipe replacement', 'repiping', 'whole house repiping',
      'sump pump installation', 'sump pump repair',
      'water softener installation', 'water filtration system installation',
      'water line repair', 'water line replacement',
      'backflow testing', 'septic tank service',
      'toilet installation', 'toilet repair', 'faucet installation',
      'garbage disposal installation', 'garbage disposal repair',
      'shower installation', 'bathtub installation', 'fixture replacement',
      'outdoor faucet repair',
    ],

    // Guardrail thresholds scaled down from DEFAULT_CONFIG for this account's
    // real $30/day-per-campaign budget cap ($210/campaign/week ceiling) —
    // the PHS-derived defaults ($150/7d spend, $200/7d CPA, $100/7d tracking)
    // assumed a much bigger account and would barely trigger before an
    // entire week's budget was already spent. Revisit once a few weeks of
    // real spend/conversion data come in.
    spendGuardrail: { windowDays: 3, thresholdUSD: 50 }, // ~1.5-2 days of one campaign's budget
    cpaGuardrail: { windowDays: 7, thresholdUSD: 75, autoPauseCampaign: false },
    cpcGuardrail: { multiplier: 3, minClicks: 1 }, // relative to account avg CPC — already scales with budget size, unchanged
    trackingHealthCheck: { windowDays: 7, minClicks: 15, minSpendUSD: 60 },

    negativeKeywordMode: 'FLAG_ONLY', // flip to AUTO_ADD after a clean preview run
    confirmedLiveMode: false,
    alertEmails: ['amar@ethixweb.com'],
    slackWebhookUrl: '',
    sheetsIntegration: { enabled: false, spreadsheetUrl: '', sheetName: 'All Phase Guardrail Log' },
  },

  // Catching Chrome's real Google Ads customer ID (451-694-9452), confirmed by
  // the client. This is a $10/day account (confirmed by the client), several
  // times smaller than either PHS or All Phase, so every guardrail threshold
  // below is scaled down to match rather than reused from the bigger accounts —
  // see the comment above spendGuardrail/cpaGuardrail/trackingHealthCheck.
  '451-694-9452': {
    clientName: 'Catching Chrome Guide Service — Oregon Salmon/Steelhead/Sturgeon/Crab Charters (Columbia & Willamette Rivers, OR)',

    // Catching Chrome is a guided fishing charter service (Captain Ryan),
    // not a repair trade — so PHS/All Phase's "diy/repair/troubleshooting"
    // signals mostly just never match here (harmless), and the real junk
    // categories are different: people who want to fish themselves instead
    // of booking a guide, gear/rental shoppers, and job seekers in the guide
    // industry specifically. See src/lib/fishingCalendar.ts, PricingSection,
    // SignatureTripsSection and CrabTripsSection in the site repo for the
    // real trip/species catalogue this list (and the whitelist below) is
    // built from.
    badWordList: [
      // Self-guided / DIY anglers — want to learn to catch fish themselves,
      // not hire a guide to take them.
      'how to catch', 'how to fish', 'how to rig', 'diy fishing', 'fishing tips',
      'fishing techniques', 'best lures for', 'best bait for', 'jig setup',
      'rigging techniques', 'fishing knots', 'catch and release techniques',
      // Boat/gear rental & resale — shopping to fish on their own boat, not
      // to book a charter on ours.
      'boat rental', 'drift boat rental', 'jet boat rental', 'rent a boat',
      'kayak rental', 'boat for sale', 'used boat', 'sled for sale',
      'drift boat for sale', 'jet boat for sale',
      // Retail tackle shopping — buying gear, not booking a trip.
      'tackle shop', 'buy fishing rod', 'buy fishing reel', 'fishing gear for sale',
      'cabelas', 'bass pro shop', "sportsman's warehouse", 'academy sports',
      // License/regulation research — informational, not booking-ready
      // (narrower than a bare "license" bad word so a guest asking us
      // directly about license requirements, which the FAQ already answers,
      // never risks getting swept in).
      'buy fishing license', 'fishing license online', 'fishing license cost',
      'apply for fishing license', 'fishing regulations', 'odfw regulations',
      // Job seekers — guide/deckhand industry jobs, beyond DEFAULT_CONFIG's
      // generic jobs/career/salary set.
      'fishing guide jobs', 'deckhand jobs', 'charter boat captain jobs',
      'fishing guide salary', 'become a fishing guide', 'how to become a fishing guide',
      'captain license', 'uscg captain license', 'guide license requirements',
      // Recipes/cooking — informational, no booking intent.
      'salmon recipe', 'how to cook salmon', 'how to fillet salmon',
      'how to clean a fish', 'crab recipe', 'sturgeon recipe', 'steelhead recipe',
      // TODO: add confirmed competitor guide-service names once the first
      // few weeks of real search-term data come in (no incident data yet
      // for this account, unlike PHS's June 2026 review — don't guess).
      // TODO: add confirmed out-of-service-area place names (off-geo) once
      // Ryan confirms the exact boundary — service area straddles the
      // OR/WA state line along the Columbia (see the WA-side ramps in
      // src/components/BoatRampsSection.tsx: Hamilton Island, Beacon Rock),
      // so "washington" itself would be wrong to block wholesale.
    ],

    // Real trip types, species and buyer-intent pricing phrases, checked
    // before any bad-word logic runs. Two things this specifically protects
    // against: (1) DEFAULT_CONFIG's generic "price"/"pricing"/"cost"/
    // "how much"/"review"/"reviews" bad words, which would otherwise treat
    // ordinary rate-shopping and reputation checks as junk even though this
    // client's own /pricing page ("Fair Rates, No Hidden Fees") makes price
    // and review searches a normal, expected step before booking, not a
    // DIY/research signal the way it is for PHS's single water-heater
    // funnel; (2) this account's own new badWordList above ("how to catch",
    // "how to fish" etc.) catching a real trip enquiry that happens to share
    // words with a DIY phrase.
    whitelist: [
      'salmon fishing charter', 'steelhead fishing charter', 'sturgeon fishing charter',
      'guided salmon fishing trip', 'guided steelhead fishing trip', 'guided sturgeon fishing trip',
      'dungeness crab charter', 'crab fishing charter', 'crabbing charter',
      'columbia river fishing guide', 'willamette river fishing guide', 'oregon fishing guide',
      'book a fishing charter', 'book a fishing guide', 'book a fishing trip',
      'chinook salmon charter', 'coho salmon charter', 'spring chinook charter', 'fall chinook charter',
      'shad fishing trip', 'family fishing charter', 'corporate fishing charter', 'group fishing charter',
      // Pricing/cost/review searches for THIS business specifically — real
      // pre-booking research, not the generic price-shopping DEFAULT_CONFIG
      // guards against.
      'fishing charter cost', 'fishing charter price', 'fishing guide cost', 'fishing guide price',
      'guided fishing trip cost', 'guided fishing trip price',
      'salmon fishing charter cost', 'salmon fishing charter price',
      'steelhead fishing charter cost', 'crab charter cost', 'crabbing charter price',
      'columbia river fishing charter cost', 'oregon fishing charter cost',
      'how much does a fishing charter cost', 'how much is a guided fishing trip',
      'how much does a fishing guide cost',
      'how much to book a fishing', 'how much to charter', 'how much to book a guide',
      'fishing trip cost', 'fishing trip price',
      // Systematic "<how much/cost/price prefix> <trip type>" coverage. A
      // real guest asks this a dozen different ways ("how much for a
      // STURGEON trip", "how much IS a salmon charter", "cost of a
      // STEELHEAD guide"), and a species/trip-type word almost always sits
      // between the prefix and any fixed sentence above, breaking a plain
      // substring match — confirmed against "how much for a sturgeon
      // fishing trip" during testing, which slipped through the
      // fixed-sentence list above it. Every prefix below is paired with
      // every real trip type (see fishingCalendar.ts/PricingSection.tsx)
      // plus "fishing"/"guided"/"charter" as generic catch-alls, so the
      // species word's position no longer matters.
      'how much for a fishing', 'how much for a salmon', 'how much for a steelhead',
      'how much for a sturgeon', 'how much for a crab', 'how much for a shad',
      'how much for a chinook', 'how much for a coho', 'how much for a guided', 'how much for a charter',
      'how much is a fishing', 'how much is a salmon', 'how much is a steelhead',
      'how much is a sturgeon', 'how much is a crab', 'how much is a shad',
      'how much is a chinook', 'how much is a coho', 'how much is a guided', 'how much is a charter',
      'how much does a fishing', 'how much does a salmon', 'how much does a steelhead',
      'how much does a sturgeon', 'how much does a crab', 'how much does a shad',
      'how much does a chinook', 'how much does a coho', 'how much does a guided', 'how much does a charter',
      'cost of a fishing', 'cost of a salmon', 'cost of a steelhead', 'cost of a sturgeon',
      'cost of a crab', 'cost of a shad', 'cost of a chinook', 'cost of a coho',
      'cost of a guided', 'cost of a charter',
      'price of a fishing', 'price of a salmon', 'price of a steelhead', 'price of a sturgeon',
      'price of a crab', 'price of a shad', 'price of a chinook', 'price of a coho',
      'price of a guided', 'price of a charter',
      'catching chrome reviews', 'captain ryan reviews', 'catching chrome guide service reviews',
    ],

    // This account runs on a real $10/day budget (confirmed by the client —
    // roughly a third of All Phase's already-scaled-down $30/day), so even
    // All Phase's reduced thresholds would barely ever fire before the
    // account's entire week is spent. Every window/threshold below is scaled
    // down again, and a couple are stretched longer in days rather than
    // dollars, since $10/day produces far fewer clicks and conversions per
    // day to work with than either existing account. Revisit once a few
    // weeks of real spend/booking data come in — these are first-pass
    // estimates, not measured from live traffic.
    spendGuardrail: { windowDays: 3, thresholdUSD: 20 }, // ~2 days of the $10/day budget with 0 conversions
    // Trip prices run $150 (crab) to $250/person (salmon/steelhead/sturgeon),
    // with a $50/person deposit — so a $100 CPA is still comfortably below
    // even the cheapest trip, while catching genuine waste rather than
    // reacting to one or two ordinary clicks. Window stretched to 14 days
    // (vs. the 7-day default) because $10/day rarely produces enough
    // conversions in a week for a CPA figure to mean anything yet.
    cpaGuardrail: { windowDays: 14, thresholdUSD: 100, autoPauseCampaign: false },
    cpcGuardrail: { multiplier: 3, minClicks: 1 }, // relative to account avg CPC — already scales with budget size, unchanged
    // Scaled down from PHS-sized defaults (20 clicks / $100) to match a
    // $10/day budget, and stretched to a 10-day window (vs. the 7-day
    // default) since this budget takes longer to rack up 10 meaningful clicks.
    trackingHealthCheck: { windowDays: 10, minClicks: 10, minSpendUSD: 20 },

    negativeKeywordMode: 'FLAG_ONLY', // flip to AUTO_ADD after a clean preview run
    confirmedLiveMode: false,
    alertEmails: ['yash@ethixweb.com', 'amar@ethixweb.com', 'akash@ethixweb.com'],
    slackWebhookUrl: '',
    sheetsIntegration: { enabled: false, spreadsheetUrl: '', sheetName: 'Catching Chrome Guardrail Log' },
  },

  // Add future clients here — one block each.
};

/**
 * Deep-merges an account's config overrides on top of DEFAULT_CONFIG.
 * - badWordList and whitelist are concatenated (additive), not replaced.
 * - Nested guardrail objects (spendGuardrail, cpaGuardrail, cpcGuardrail,
 *   trackingHealthCheck, sheetsIntegration) are merged key-by-key so a
 *   client can override just one field (e.g. thresholdUSD) without having
 *   to restate the whole block.
 * @param {Object} defaults DEFAULT_CONFIG
 * @param {Object} overrides One entry from ACCOUNT_CONFIGS (may be undefined)
 * @return {Object} the merged, effective config for one account
 */
function mergeConfig(defaults, overrides) {
  overrides = overrides || {};
  var merged = {};
  var key;

  for (key in defaults) {
    merged[key] = defaults[key];
  }
  for (key in overrides) {
    merged[key] = overrides[key];
  }

  merged.badWordList = defaults.badWordList.concat(overrides.badWordList || []);
  merged.whitelist = defaults.whitelist.concat(overrides.whitelist || []);

  var nestedKeys = ['spendGuardrail', 'cpaGuardrail', 'cpcGuardrail', 'trackingHealthCheck', 'sheetsIntegration'];
  nestedKeys.forEach(function (nestedKey) {
    merged[nestedKey] = {};
    for (var k in defaults[nestedKey]) {
      merged[nestedKey][k] = defaults[nestedKey][k];
    }
    if (overrides[nestedKey]) {
      for (var k2 in overrides[nestedKey]) {
        merged[nestedKey][k2] = overrides[nestedKey][k2];
      }
    }
  });

  return merged;
}

/**
 * Looks up and merges the effective config for the currently selected
 * Google Ads account (works whether that account has an explicit
 * ACCOUNT_CONFIGS entry or not).
 * @return {Object}
 */
function resolveConfigForCurrentAccount() {
  var customerId = AdsApp.currentAccount().getCustomerId();
  var override = ACCOUNT_CONFIGS[customerId];
  var config = mergeConfig(DEFAULT_CONFIG, override);
  if (!override) {
    config.clientName = AdsApp.currentAccount().getName() +
      ' (customer ID ' + customerId + ' has no ACCOUNT_CONFIGS entry — using DEFAULT_CONFIG)';
  }
  return config;
}
