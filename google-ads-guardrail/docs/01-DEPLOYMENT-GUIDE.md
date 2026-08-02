# Deployment Guide

## Required permissions

- **Google Ads access**: Standard or Admin access on each client account (or on the MCC, if deploying at manager level). Scripts run with the permissions of whoever last authorized them, so use an account/user that has edit access on all target accounts.
- **Google Ads Scripts authorization**: The first time you save/preview/run the script, Google Ads will prompt you to authorize it. This is per Google Ads account (or once at the MCC level for an MCC script).
- **Gmail/MailApp**: No extra setup — `MailApp.sendEmail()` is available by default inside Google Ads Scripts and sends from the authorizing user's Google account. **Quota matters at agency scale**: `MailApp`'s daily send quota is shared across every account this one authorizing identity processes that day (not per client). The script checks `MailApp.getRemainingDailyQuota()` before each send and logs a warning instead of throwing once it's low, but if you're running this across dozens of accounts under one Google identity, plan for that shared quota — split accounts across more than one authorizing user if needed, or lean on Slack/Sheets for lower-priority clients.
- **Slack (optional)**: A Slack Incoming Webhook URL from the target Slack workspace. Under the script's **Authorization** tab, add the webhook's domain (`hooks.slack.com`) to the authorized URL Fetch domains — Slack alerts will silently fail (logged, not thrown) until this is done.
- **Google Sheets (optional)**: The Google account authorizing the script needs edit access to the target spreadsheet. `SpreadsheetApp` is available by default; no extra domain authorization is needed for Sheets itself.

## Two deployment shapes

### Option A — MCC (manager account) script — recommended for agencies

Run this once from the manager account and it loops every client listed in `ACCOUNT_CONFIGS` (in `Config.js`). Adding a client later is a config change, not a redeploy.

1. In the **manager account**, go to **Tools & Settings > Bulk Actions > Scripts**.
2. Click **+** to create a new script.
3. Google Ads Scripts supports multiple file tabs in one script project (like Apps Script) — create one tab per file in `script/` (`Main.js`, `Config.js`, `Utils.js`, `SearchTermScanner.js`, `NegativeKeywordManager.js`, `Guardrails.js`, `AlertsAndLogging.js`, `SheetsIntegration.js`) and paste each file's contents into its own tab, using the same filenames as tab names.
4. Fill in real customer IDs and per-client settings in `Config.js` (see the Configuration Guide).
5. Save. Click **Authorize** and grant the requested permissions.
6. Click **Preview** — see the Testing Checklist before doing anything else.

### Option B — Single account script

Paste the same files into that one account's **Tools & Settings > Scripts**. `main()` auto-detects there's no `AdsManagerApp` in scope and processes just that account, using its `ACCOUNT_CONFIGS` entry if present (matched by that account's own customer ID) or `DEFAULT_CONFIG` otherwise.

This is a reasonable way to pilot the script on PHS alone before rolling it out at the MCC level.

## Scheduling

1. From the script's page, click **Schedule** (top right, next to Preview/Run).
2. Recommended: **Daily**, run overnight (e.g. 3–5 AM in the account's timezone) so the Search Terms report has a full previous day of data.
3. Weekly is acceptable per the original ask, but daily catches a runaway search term (e.g. the $101 click) up to 6 days sooner — cheap insurance given the script's runtime is small.
4. If using `EXECUTION_MODE = 'PARALLEL'` for a large MCC portfolio, be aware each batch of up to 50 accounts runs as its own set of parallel executions; scheduling frequency is unaffected, just be mindful of Google Ads Scripts' overall daily execution quotas if you have many scripts running across many accounts.

## Execution time limits (know these before choosing SERIAL vs PARALLEL)

- A single Google Ads script execution — including an MCC script looping accounts one at a time via `EXECUTION_MODE = 'SERIAL'` — is cancelled at **30 minutes**. Everything after the account currently being processed when that limit hits simply doesn't run that day, silently (check the Logs panel's account count against `ACCOUNT_CONFIGS` if you suspect this).
- `EXECUTION_MODE = 'PARALLEL'` (`executeInParallel`) processes each account as its own isolated execution and can run up to **60 minutes per batch of up to 50 accounts** when a callback is specified (as this project's does) — meaningfully more headroom than SERIAL, and it doesn't degrade linearly as you add clients the way SERIAL does.
- Rule of thumb: start with `SERIAL` while you have a handful of clients (easier to read straight through in the Logs panel); switch to `PARALLEL` once you're onboarding enough clients that a 30-minute serial loop feels close to being a constraint, not after it's already failing silently.

## First deployment checklist

- [ ] `FORCE_PREVIEW_MODE = true` in `Config.js` (this is the shipped default — leave it on).
- [ ] Real customer IDs filled into `ACCOUNT_CONFIGS`.
- [ ] At least one valid email in each client's `alertEmails`.
- [ ] Run **Preview** once per account/config and read the Logs panel — see the Testing Checklist for what to look for.
- [ ] Only after a clean preview run: flip `FORCE_PREVIEW_MODE` to `false` (globally) and, per client, set `confirmedLiveMode: true` and `negativeKeywordMode: 'AUTO_ADD'` when you're ready for that specific client to start mutating its own account.
