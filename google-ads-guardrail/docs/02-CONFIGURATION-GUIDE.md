# Configuration Guide

All configuration lives in `script/Config.js`. Nothing else in the project should need to change to onboard a client or retune an existing one.

## Global switches (top of Config.js)

| Setting | Purpose |
|---|---|
| `FORCE_PREVIEW_MODE` | Agency-wide kill switch. `true` = every scheduled run behaves like Preview: findings are logged but nothing is emailed, Slacked, added, or paused. Ships `true`. Flip to `false` only once you trust the setup. |
| `EXECUTION_MODE` | `'SERIAL'` (default, simplest logs, fine for a handful of accounts) or `'PARALLEL'` (recommended once you're managing dozens of accounts — see Main.js). |

## DEFAULT_CONFIG

Baseline values applied to every account. Anything a client doesn't override in `ACCOUNT_CONFIGS` falls back to these.

| Key | Meaning |
|---|---|
| `lookbackDays` | Rolling window for the search-terms scan and CPC baseline. **Always ends yesterday, not today** — today's Google Ads data is still accumulating when the script runs, so every window (`lookbackDays`, and each guardrail's own `windowDays`) is computed as "yesterday minus (N-1) days" through "yesterday," never including the partial current day. |
| `enrichKeywordAttribution` | When `true` (default), runs a second search-terms query purely to populate the email's "Keyword" column. Never affects which search terms get scanned or flagged — see the code comment in `SearchTermScanner.js` for why that has to be a separate query. Set `false` on very high-volume accounts to cut this script's report cost roughly in half if you don't need that column. |
| `negativeKeywordMode` | `'FLAG_ONLY'` (report only) or `'AUTO_ADD'` (adds campaign-level broad-match negatives). Ships `'FLAG_ONLY'`. |
| `confirmedLiveMode` | Second, explicit gate required (in addition to `negativeKeywordMode: 'AUTO_ADD'` and `FORCE_PREVIEW_MODE: false`) before this account will actually mutate anything. Ships `false`. |
| `badWordList` | Array of words/phrases. **Additive per client** — a client's own `badWordList` extends this list, it doesn't replace it. |
| `whitelist` | Array of phrases that must never become negatives, even if they contain a bad word. **Additive per client.** |
| `spendGuardrail.windowDays` / `.thresholdUSD` | Alert if a campaign spends more than `$thresholdUSD` with 0 conversions over the trailing `windowDays`. |
| `cpaGuardrail.windowDays` / `.thresholdUSD` / `.autoPauseCampaign` | Alert (and optionally pause) a campaign whose CPA exceeds the threshold. |
| `cpcGuardrail.multiplier` / `.minClicks` | Flag any search term whose CPC exceeds `multiplier` × the account's blended average CPC over the same window, ignoring terms with fewer than `minClicks` clicks. |
| `trackingHealthCheck.windowDays` / `.minClicks` / `.minSpendUSD` | Flag a campaign with more than `minClicks` clicks and `minSpendUSD` spend but 0 conversions — a signal to check tracking itself, not targeting. Deliberately set higher than the spend guardrail's minimums so it doesn't just duplicate that alert. |
| `alertEmails` | Array of recipient addresses. |
| `alwaysSendSummary` | If `true`, sends a "no issues found" email every run instead of staying silent on clean runs. |
| `slackWebhookUrl` | Slack Incoming Webhook URL, or blank to disable. |
| `sheetsIntegration.enabled` / `.spreadsheetUrl` / `.sheetName` | Optional per-client Google Sheet logging. |

## ACCOUNT_CONFIGS

Keyed by Google Ads customer ID, e.g. `'123-456-7890'`. Only list what differs from `DEFAULT_CONFIG`.

```js
'123-456-7890': {
  clientName: 'Preventive Home Solutions — Water Heater',
  badWordList: ['navien', 'rheem', 'rc willey'],
  negativeKeywordMode: 'AUTO_ADD',
  confirmedLiveMode: true,
  alertEmails: ['akash@ethixweb.com'],
},
```

### Onboarding a new client

1. Add one object to `ACCOUNT_CONFIGS`, keyed by their real customer ID.
2. Set `clientName` and `alertEmails` at minimum.
3. Add any client-specific bad words (brand names, local competitors) and whitelist phrases (their core buyer-intent services — see below).
4. Leave `negativeKeywordMode: 'FLAG_ONLY'` and `confirmedLiveMode: false` for at least one full preview + one week of live-but-flag-only runs before enabling `AUTO_ADD`.
5. No other file needs to change.

## Whitelist — do not skip this per client

The whitelist is what keeps the negative-keyword automation from ever blocking real buyer-intent demand. Before enabling `AUTO_ADD` for any client, populate `whitelist` with their actual core service phrases (installation, replacement, repair-as-a-service, emergency terms, etc.) — anything that legitimately overlaps with a bad word (e.g. "repair" is a junk signal for DIY searches but "water heater repair" might be a real service line for some clients). Whitelist phrases are checked before any bad-word logic runs, and again defensively inside the negative-adding function itself.

## Bad word list — tuning notes

- Entries are matched as whole words/phrases (word-boundary regex), case-insensitive, so `"cost"` won't false-positive inside an unrelated word, but will still match `"tankless water heater cost"`.
- Multi-word phrases (`"pilot light"`, `"how much"`) are supported and matched as phrases, not split into separate words.
- There's no cap on list length.
- Off-geo terms (competing/out-of-area city names) are intentionally left as a per-client TODO in `Config.js` — they depend on each client's actual service boundary and should be confirmed with the client, not guessed.

## Auto-pause safety

`cpaGuardrail.autoPauseCampaign` only takes effect when **all** of these are true for that run:
1. Not running in Google Ads' own Preview mode.
2. `FORCE_PREVIEW_MODE === false` globally.
3. That client's `confirmedLiveMode === true`.

Otherwise the finding is still logged/alerted as "would have auto-paused, but blocked," so you can see what *would* have happened before it can.

## Google Sheets — security note and a concurrency caveat

- Search terms are literally whatever the public typed into Google search. Before writing to a sheet, the script forces the Campaign / Search Term / Reason / Action Taken columns to plain-text format, so a search term like `=IMPORTXML(...)` is stored as inert text instead of being evaluated as a spreadsheet formula. You don't need to do anything for this — it's automatic — but don't remove that formatting step if you customize `SheetsIntegration.js`.
- If `EXECUTION_MODE = 'PARALLEL'`, avoid pointing two different clients' `sheetsIntegration.spreadsheetUrl` + `sheetName` at the exact same tab — concurrent parallel executions appending to the same tab at the same moment can race on "which row is next" and overwrite each other. Giving each client their own spreadsheet (or at least their own tab, which is the shipped default) avoids this entirely.
