# Search Term Waste Guardrail — Google Ads Script

Reusable, multi-account Google Ads Script that replaces manual weekly Search Terms reviews with automated daily/weekly checks: junk search term detection, negative keyword automation, spend/CPA/CPC guardrails, and conversion-tracking health — with email, Slack, and Google Sheets output.

Built in response to the PHS (Preventive Home Solutions) water heater campaign wasting $1,667.51 across 869 impressions / 37 clicks / 0 conversions in June 2026 on DIY/troubleshooting search terms (error codes, pilot light, sensor replacement, etc.) that should never have received budget — and to prevent the same setup being copied, unreviewed, into All Phase Plumbing's campaigns.

## Folder structure

```
google-ads-guardrail/
├── README.md                       ← you are here
├── script/                         ← paste each file into its own tab in
│   │                                  Google Ads Scripts (Tools > Scripts)
│   ├── Main.js                     ← entry point (main()), MCC orchestration
│   ├── Config.js                   ← ALL per-client configuration lives here
│   ├── Utils.js                    ← shared helpers, date/currency formatting, Finding shape
│   ├── SearchTermScanner.js        ← Search Terms report fetch + bad-word/whitelist matching
│   ├── NegativeKeywordManager.js   ← FLAG_ONLY / AUTO_ADD logic, dedup, existing-negative check
│   ├── Guardrails.js               ← spend, CPA, CPC-outlier, tracking-health checks
│   ├── AlertsAndLogging.js         ← Logger, HTML email, Slack payload builders/senders
│   └── SheetsIntegration.js        ← optional Google Sheets logging
└── docs/
    ├── 01-DEPLOYMENT-GUIDE.md      ← permissions, MCC vs single-account setup, scheduling
    ├── 02-CONFIGURATION-GUIDE.md   ← every Config.js key explained, onboarding steps
    ├── 03-TESTING-CHECKLIST.md     ← step-by-step validation before trusting AUTO_ADD/auto-pause
    ├── 04-ROLLBACK.md              ← how to stop the script and undo what it did
    ├── 05-SAMPLE-OUTPUTS.md        ← example email, Slack message, Sheet rows, log output
    └── 06-FUTURE-IMPROVEMENTS.md   ← prioritized ideas beyond this version
```

Google Ads Scripts supports multiple file tabs within one script project (the editor works like Apps Script's), and all files share one global scope — so this is a real multi-file structure, not a conceptual one. `main()` in `Main.js` is the only function Google Ads Scripts calls directly.

## What it does, in one pass per account

1. **Search Term Scanner** (`SearchTermScanner.js`) pulls every search term with impressions in the account over the configured lookback window (default 7 days) — including zero-click impressions, since those still train Smart Bidding on the wrong signal.
2. **Negative Keyword Automation** (`NegativeKeywordManager.js`) checks each term against the client's bad-word list, skips anything matching the whitelist, and either flags it (`FLAG_ONLY`) or adds a deduplicated campaign-level broad-match negative (`AUTO_ADD`) — gated by explicit per-client and global safety switches.
3. **Existing Negative Verification** — if a term matches a bad word that should already be blocked by a negative already on that campaign, it's raised as its own distinct alert ("should have been blocked but still served") instead of silently retried, directly targeting the root cause identified in the original account review.
4. **Spend Guardrail** (`Guardrails.js`) alerts if a campaign spends over a configurable threshold with 0 conversions in a rolling window.
5. **CPA Guardrail** alerts (and can optionally auto-pause) a campaign whose cost-per-conversion exceeds a configurable threshold.
6. **High CPC Detection** flags any search term whose CPC is a configurable multiple of the account's own average CPC — this is what would have caught the $101 Navien click on day one.
7. **Conversion Tracking Health** flags campaigns with meaningful clicks and spend but zero conversions, as a nudge to verify tracking rather than assume the traffic was simply bad.
8. **Alerts** — one structured "findings" list feeds a professionally formatted HTML email, an optional Slack message, optional Google Sheets rows, and the Logger output, so every channel always agrees.
9. **MCC Compatibility** — one script, `ACCOUNT_CONFIGS` keyed by customer ID; runs serially or via true parallel execution (`AdsManagerApp...executeInParallel`) across dozens of accounts.
10. **Safety** — Google Ads' own Preview mode, a global `FORCE_PREVIEW_MODE` kill switch, and a per-client `confirmedLiveMode` flag all have to agree before anything mutates a live account.

## Scope and limitations

- Covers standard **Search campaigns** (where `search_term_view` applies). **Performance Max is not covered** — Google's API doesn't expose PMax search terms through this resource at all (see `docs/06-FUTURE-IMPROVEMENTS.md`). Display/Video/Shopping don't have search terms in the first place, so that's expected.
- Every rolling window (`lookbackDays` and each guardrail's own `windowDays`) always ends **yesterday**, never the partial current day, to avoid false alerts from incomplete same-day data.
- The email's "Keyword" column is best-effort (`enrichKeywordAttribution`) and never gates which search terms get scanned — see the comment at the top of `SearchTermScanner.js` for why Google's API requires that split.

## Start here

1. Read `docs/01-DEPLOYMENT-GUIDE.md` and deploy in Preview mode.
2. Read `docs/02-CONFIGURATION-GUIDE.md` and fill in real customer IDs / thresholds / whitelist terms in `script/Config.js`.
3. Work through `docs/03-TESTING-CHECKLIST.md` before enabling `AUTO_ADD` or auto-pause for any client.
4. Keep `docs/04-ROLLBACK.md` handy for the first few weeks live.
