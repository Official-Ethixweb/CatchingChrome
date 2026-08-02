# Future Improvement Recommendations

## Known scope limitations (current Google Ads API/Scripts constraints, not fixable by config)

- **Performance Max campaigns are not covered.** `search_term_view` — the resource this entire project's scanning is built on — does not return Performance Max search terms at all; Google only exposes those through a separate, much coarser `campaign_search_term_insight` resource (categories/insights, not raw queries). If a client runs PMax alongside Search, this script simply won't see that traffic. Standard Search campaigns are fully covered; Display/Video/Shopping don't have search terms to begin with, so that's expected, not a gap.
- **Per-campaign negative keyword ceiling.** Google Ads caps the number of negative keywords on a single campaign (a five-figure limit, but finite). Under sustained `AUTO_ADD` over months/years, a high-junk-volume account could theoretically approach it. See item 3 below (shared negative keyword lists) for the long-term fix — it isn't urgent for a new deployment, but is worth revisiting after a year or so of `AUTO_ADD` running unattended.

Roughly in priority order for an agency running this across many clients.

1. **Move bad word / whitelist lists out of Config.js and into a shared Google Sheet or Named List**, one tab per client, so account managers can add/remove terms without touching script code. The script would read the lists at runtime via `SpreadsheetApp`. Tradeoff: an extra external dependency and a slightly slower run; worth it once non-engineers need to maintain the lists.

2. **Per-ad-group (not just campaign-level) negative keywords**, for clients running multiple distinct service lines in one campaign where a bad word should only be excluded from some ad groups, not the whole campaign.

3. **Shared negative keyword lists** (`AdsApp.negativeKeywordLists()`) instead of per-campaign negatives, so one maintained list can be attached to multiple campaigns within an account (useful once a client has several campaigns that should share the same junk-word exclusions).

4. **Statistical significance / minimum-sample guards** on the CPC outlier and CPA checks — right now a single expensive click can trigger `HIGH_CPC`, which is the intended behavior for catching a $101 click early, but a campaign with very low overall volume could produce noisy CPA alerts. Consider requiring a minimum number of clicks/conversions in the window before CPA/CPC alerts fire, configurable per client.

5. **Trend-aware thresholds** instead of static `$X` guardrails — e.g. flag a campaign only if this week's spend-with-zero-conversions is itself an anomaly versus that campaign's own trailing 4-week baseline, rather than a fixed dollar figure that has to be manually retuned as budgets change.

6. **Auto-expiring "would-add" review queue** — when `negativeKeywordMode` is `FLAG_ONLY`, write proposed negatives to a review tab (Sheets) that an account manager can approve/reject with a checkbox, and have a follow-up run apply only the approved rows. Bridges the gap between full manual review and full `AUTO_ADD` trust.

7. **Conversion tracking health, deeper**: currently this only flags "clicks + spend with zero conversions" as a signal to check manually. A follow-up version could call the Google Ads API's conversion action status/diagnostics directly (where available) to distinguish "tag not firing" from "conversion action paused" from "attribution window too short," and include that detail in the alert.

8. **Slack Block Kit formatting** instead of a single `text` field, for nicer visual grouping (color-coded sections per finding type, buttons linking back to the relevant campaign in the Ads UI).

9. **Batch/account-count monitoring** — if managing more than a handful of MCC sub-accounts, add a lightweight "meta" check that alerts if any customer ID in `ACCOUNT_CONFIGS` no longer resolves to an accessible account (e.g. access revoked, account cancelled), since that currently fails silently into the parallel-execution error log rather than a dedicated alert.

10. **Historical false-positive tracking** — log every whitelist addition and the finding that prompted it, so bad-word list tuning across clients converges over time and new clients can start from an agency-wide "known good" base list rather than each starting from scratch.

11. **Sheets write-locking under `EXECUTION_MODE = 'PARALLEL'`** — if two clients are ever intentionally configured to log into the exact same spreadsheet tab, concurrent parallel executions could race on "which row is next" and overwrite each other's rows. The current mitigation is procedural (give each client their own tab, which is the shipped default). A future version could look into whether Google Ads Scripts' service allowlist supports `LockService` to serialize the append, if a shared tab is ever genuinely required.
