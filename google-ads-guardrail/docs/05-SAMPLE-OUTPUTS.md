# Sample Outputs

These are illustrative, built from the PHS June 2026 findings described in the original brief, to show what each channel looks like in practice.

## Sample email (rendered)

**Subject:** `[Ads Guardrail] Preventive Home Solutions — Water Heater (Davis County, UT) — 6 issue(s) found`

> ## Google Ads Guardrail — Daily Summary
> Preventive Home Solutions — Water Heater (Davis County, UT) · 2026-07-04 03:00:00 MDT
>
> ### Summary
> - Junk search term flagged: **4**
> - Existing negative not blocking traffic: **2**
> - High CPC outlier: **1**
> - Conversion tracking health: **1**
>
> ### Details
>
> | Type | Campaign | Keyword | Search Term | Spend | Clicks | Conversions | Reason Flagged |
> |---|---|---|---|---|---|---|---|
> | Junk search term flagged | Water Heater — Davis County | water heater repair (phrase) | navien tankless water heater error codes | $101.73 | 1 | 0 | Matched bad word "error code". |
> | Junk search term flagged | Water Heater — Davis County | water heater repair (phrase) | water heater chamber sensor replacement | $69.86 | 1 | 0 | Matched bad word "sensor replacement". |
> | Junk search term flagged | Water Heater — Davis County | water heater repair (phrase) | rheem water heater troubleshooting | $36.75 | 1 | 0 | Matched bad word "troubleshooting". |
> | Junk search term flagged | Water Heater — Davis County | water heater repair (phrase) | why won't my hot water heater pilot light stay lit | $24.18 | 1 | 0 | Matched bad word "pilot light". |
> | Existing negative not blocking traffic | Water Heater — Davis County | tankless water heater (phrase) | tankless water heater cost | $18.40 | 1 | 0 | This search term should have been blocked by an existing negative containing "cost" but still served. Verify the negative is actually applied at the campaign level... |
> | High CPC outlier | Water Heater — Davis County | water heater repair (phrase) | navien tankless water heater error codes | $101.73 | 1 | 0 | CPC of $101.73 is 4.2x the account average of $24.35 (threshold: 3x). |
>
> *Generated automatically by the Search Term Waste Guardrail script. Reply-all is not monitored.*

Notes on the real HTML version: header/summary/table styling is inline CSS (no external stylesheet, since Google Ads Scripts' `MailApp` renders whatever HTML string you give it), so it displays consistently across Gmail web/mobile without depending on external resources.

## Sample Slack alert

Posted via Incoming Webhook as a single message:

```
Google Ads Guardrail — Preventive Home Solutions — Water Heater (Davis County, UT)
Junk search term flagged: 4  |  Existing negative not blocking traffic: 2  |  High CPC outlier: 1  |  Conversion tracking health: 1
• Junk search term flagged — navien tankless water heater error codes — Matched bad word "error code".
• Junk search term flagged — water heater chamber sensor replacement — Matched bad word "sensor replacement".
• Junk search term flagged — rheem water heater troubleshooting — Matched bad word "troubleshooting".
• Junk search term flagged — why won't my hot water heater pilot light stay lit — Matched bad word "pilot light".
• Existing negative not blocking traffic — tankless water heater cost — This search term should have been blocked by an existing negative containing "cost" but still served...
• High CPC outlier — navien tankless water heater error codes — CPC of $101.73 is 4.2x the account average of $24.35 (threshold: 3x).
+2 more — see email for full detail.
```

## Sample Google Sheets output

Tab: `PHS Guardrail Log`

| Date | Campaign | Search Term | Cost | Clicks | Conversions | Reason | Action Taken |
|---|---|---|---|---|---|---|---|
| 2026-07-04 03:00:12 MDT | Water Heater — Davis County | navien tankless water heater error codes | 101.73 | 1 | 0 | Matched bad word "error code". | None — negativeKeywordMode is FLAG_ONLY |
| 2026-07-04 03:00:12 MDT | Water Heater — Davis County | water heater chamber sensor replacement | 69.86 | 1 | 0 | Matched bad word "sensor replacement". | None — negativeKeywordMode is FLAG_ONLY |
| 2026-07-04 03:00:12 MDT | Water Heater — Davis County | rheem water heater troubleshooting | 36.75 | 1 | 0 | Matched bad word "troubleshooting". | None — negativeKeywordMode is FLAG_ONLY |

Once switched to `AUTO_ADD`, the `Action Taken` column instead reads e.g. `Added campaign-level broad-match negative keyword: "error code"`.

## Sample log output (Logs panel)

```
=== Preventive Home Solutions — Water Heater (Davis County, UT) — run start (preview=false, forcePreview=false, confirmedLiveMode=false, liveMutationAllowed=false) ===
--- Preventive Home Solutions — Water Heater (Davis County, UT): 6 finding(s) ---
[2026-07-04 03:00:12 MDT] Water Heater — Davis County | search term: "navien tankless water heater error codes" | action: None — negativeKeywordMode is FLAG_ONLY | reason: Matched bad word "error code".
[2026-07-04 03:00:12 MDT] Water Heater — Davis County | search term: "tankless water heater cost" | action: None — flagged for manual verification | reason: This search term should have been blocked by an existing negative containing "cost" but still served...
=== Preventive Home Solutions — Water Heater (Davis County, UT) — run end: 6 finding(s) ===
```
