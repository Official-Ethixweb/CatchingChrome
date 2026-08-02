# Testing Checklist

Work through this before ever setting `negativeKeywordMode: 'AUTO_ADD'` or `cpaGuardrail.autoPauseCampaign: true` for a real client.

## 1. Preview mode (no live account impact)

- [ ] Open the script, click **Preview**.
- [ ] Confirm the Logs panel shows a run header per account: `=== <clientName> — run start (preview=true, ...) ===`.
- [ ] Confirm `liveMutationAllowed=false` appears in that header (it must, under Preview — this is enforced by `AdsApp.getExecutionInfo().isPreview()`, not by config, so it can't be misconfigured away).
- [ ] Confirm the log line `Preview mode: skipping email/Slack/Sheets dispatch` appears — no email should land in your inbox from a preview run.
- [ ] Read through the logged findings:
  - [ ] Do the `NEGATIVE_FLAGGED` / `NEGATIVE_WOULD_ADD` entries match search terms you'd actually want blocked (spot-check against the account's real Search Terms report)?
  - [ ] Are any of your intended whitelist phrases (e.g. "water heater replacement") appearing as false-positive flags? If so, add them to `whitelist` and re-run.
  - [ ] Do any `NEGATIVE_GAP` findings appear? If so, manually check that campaign's negative keyword list in the Ads UI — confirm whether the negative is missing, misapplied, or was added after the flagged traffic.

## 2. Bad word list precision

- [ ] Pull the account's real Search Terms report (last 30 days) and manually skim for terms that *should* match but don't — add missing bad words.
- [ ] Skim for terms that *do* match but are legitimate buyer intent — either remove that bad word or add the specific phrase to `whitelist`.
- [ ] Re-run Preview after any list change and confirm the finding set changed as expected.
- [ ] If the account runs any Dynamic Search Ads or heavily broad-match/Smart-Bidding-driven campaigns, spot-check that at least one search term from those campaigns shows up in the flagged findings — this confirms coverage isn't being silently narrowed to only keyword-attributed traffic (see the `fetchSearchTermRows` vs. `fetchKeywordAttributionLookup` split in `SearchTermScanner.js`). Those rows' `keywordText` will read "(no discrete keyword — broad/DSA-style match)," which is expected, not an error.
- [ ] Confirm the date range in the run header/log lines up with **yesterday** as the end date, not today (compare against the timestamp the script actually ran).

## 3. Guardrail thresholds

- [ ] Temporarily lower `spendGuardrail.thresholdUSD` to something you know the account exceeded historically (e.g. $10) and confirm a `ZERO_CONVERSION_SPEND` finding appears in Preview logs. Set it back afterward.
- [ ] Same test for `cpaGuardrail.thresholdUSD` if the account has any conversions.
- [ ] Same test for `cpcGuardrail.multiplier` — temporarily set it to `1` and confirm multiple `HIGH_CPC` findings appear (since almost everything will exceed 1x the average); set back to your real value (e.g. `3`) afterward.
- [ ] Confirm `TRACKING_HEALTH` findings only appear when both `minClicks` and `minSpendUSD` are exceeded — test by temporarily setting both to `0`.

## 4. Live run, FLAG_ONLY (no mutation, but real alerts)

- [ ] Leave every client's `negativeKeywordMode: 'FLAG_ONLY'`, `confirmedLiveMode: false`, `cpaGuardrail.autoPauseCampaign: false`. `FORCE_PREVIEW_MODE` can stay `true` for this test — it only blocks mutations, not alerting (see the comment in `Config.js`); alerts fire on any non-Preview execution regardless of this flag.
- [ ] Click **Run** (not Preview) once, manually.
- [ ] Confirm the configured email(s) actually arrive, with the HTML table rendering correctly (check a couple of email clients if possible — Gmail web + mobile at minimum).
- [ ] If Slack is configured: confirm the message posts to the right channel. If it doesn't, check the domain-authorization step in the Deployment Guide.
- [ ] If Sheets is configured: confirm a new row appears per finding, in the right tab, with the right headers.
- [ ] Let this run on schedule (FLAG_ONLY) for at least a few days to a week per client before enabling AUTO_ADD, so you build confidence in the alert quality without any account mutation risk.

## 5. AUTO_ADD, one client at a time

- [ ] For a single client, set `negativeKeywordMode: 'AUTO_ADD'` and `confirmedLiveMode: true`. Leave `FORCE_PREVIEW_MODE = false` (already set above).
- [ ] Run manually once. Confirm in the Ads UI (Negative Keywords view, campaign level) that the new negatives actually appear, with the expected match type (broad) and text.
- [ ] Confirm no duplicate negative keyword errors were logged.
- [ ] Confirm the `NEGATIVE_ADDED` findings in the email/Slack/Sheet match what actually landed in the account.
- [ ] Re-run once more immediately after — confirm the same search terms do **not** get re-added (dedup against existing negatives is working).

## 6. Auto-pause (only if a client wants it)

- [ ] With `cpaGuardrail.autoPauseCampaign: true` and `confirmedLiveMode: true` for that client, temporarily lower `cpaGuardrail.thresholdUSD` below a campaign's real CPA.
- [ ] Run manually. Confirm the specific campaign is paused in the Ads UI and a `CPA_AUTOPAUSE` finding is logged/alerted.
- [ ] Manually re-enable the campaign, and set the threshold back to its real value.

## 7. MCC-level checks (if deploying at manager level)

- [ ] Confirm every customer ID in `ACCOUNT_CONFIGS` resolves to the account you expect (typos here silently mean that account is never processed — check the run logs list every account you expect to see).
- [ ] If using `EXECUTION_MODE = 'PARALLEL'`, confirm `parallelAccountCallback` logs an `OK` or `ERROR` line for every account in the batch — an account that's missing from the callback log output but present in `ACCOUNT_CONFIGS` is worth investigating (e.g. account no longer accessible, MCC link removed).
