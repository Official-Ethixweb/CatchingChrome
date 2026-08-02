# Google Ads Guardrail — Catching Chrome Guide Service

*A plain-language explainer. No coding knowledge needed.*

---

## 1. The Problem This Is Meant to Catch

Earlier this year, a different client — Preventive Home Solutions (PHS) — spent **$1,667.51** on a water heater ad campaign and got **zero results**, because Google was showing their ads to people trying to *fix* their own water heater, not hire someone. Nobody caught it until weeks later, when someone manually checked the reports. The same watchdog was then rolled out to All Phase Plumbing before a similar incident could happen there too.

Catching Chrome is a different kind of risk, but the same core problem: it runs on a real **$10/day** budget — a fraction of either of those two accounts. On a budget that small, there is almost no room for error. A single afternoon of clicks from people searching "how to catch chinook salmon," "boat rental Columbia River," or "fishing guide jobs" instead of "book a salmon fishing charter" can burn through the *entire day's* budget with nothing to show for it, and at this spend level nobody is likely to notice for weeks unless something is watching every day.

Rather than wait for that to happen on a live account, the same watchdog built for PHS and All Phase Plumbing is being set up here too, before there's a specific incident to point to — exactly the same reasoning that put it on All Phase.

---

## 2. What We Built

Think of it as **a night watchman for the Google Ads account.**

Every night, it automatically:

1. **Reads yesterday's search terms** — every phrase someone typed into Google that triggered a Catching Chrome ad.
2. **Checks each one against a "junk list"** — tailored to a fishing *guide service*, not a repair trade: phrases like "how to catch," "boat rental," "fishing guide jobs," "fishing license cost," and salmon/steelhead/crab recipe searches — signals the searcher wants to fish themselves, rent their own boat, work in the industry, or is just looking up a recipe, not book a guided trip.
3. **Protects real trip searches** — a whitelist of Catching Chrome's actual trips ("salmon fishing charter," "guided steelhead fishing trip," "dungeness crab charter," etc.) *and* genuine price/review research for this specific business ("fishing charter cost," "catching chrome reviews") is checked *first*, so a real prospect comparing rates or checking reviews before booking never gets mistaken for junk.
4. **Watches the money** — flags anything where a campaign spent a meaningful amount with zero results, or where cost-per-booking got too expensive, scaled down to match a $10/day budget rather than the much bigger thresholds used for the other two accounts.
5. **Watches for one-off expensive clicks** — a single unusually costly click gets flagged immediately instead of only being noticed at month-end, which matters even more on a small daily budget.
6. **Checks if tracking might be broken** — real clicks and real spend but still zero results can mean broken tracking, not bad traffic.
7. **Sends a report** — by email, listing everything found, in plain language.

It does **not** guess or use AI to decide what's "junk" — it follows a fixed, editable list of words and rules.

---

## 3. The Flow — How It Actually Runs, Step by Step

```
 Every night, automatically...

   [1] Script wakes up
          │
          ▼
   [2] Looks at yesterday's data in the Google Ads account
          │
          ▼
   [3] Compares every search term against the "junk list"
       (checking the whitelist of real Catching Chrome trips first)
          │
          ├── Junk search found? ──► Note it down
          │
          ▼
   [4] Checks: did any campaign spend money with zero results?
          │
          ├── Yes? ──► Note it down
          │
          ▼
   [5] Checks: did any single click cost way more than usual?
          │
          ├── Yes? ──► Note it down
          │
          ▼
   [6] Checks: lots of clicks + spend, but still zero results?
          │
          ├── Yes? ──► Note it down (possible tracking problem)
          │
          ▼
   [7] Anything noted down?
          │
     ┌────┴────┐
     │         │
    NO        YES
     │         │
     ▼         ▼
  Stay quiet   Send an email to Yash and Amar
  (no email)   listing exactly what was found and why
```

---

## 4. The Safety Switches (Important — Read This)

Same **training wheels on by default** as PHS's and All Phase's setups. Right now, it is only allowed to **watch and report** — it cannot change anything in the ad account by itself.

| Setting | What it means | Current status |
|---|---|---|
| **Watch mode vs. Auto-fix mode** | "Watch mode" only sends reports. "Auto-fix mode" would let it block junk searches on its own. | **Watch mode** (`FLAG_ONLY`) — nothing gets changed automatically |
| **Auto-pause** | Whether it's allowed to pause a campaign on its own if costs get too high | **Off** — it will only alert, never pause anything by itself |

Nothing changes in the live account until a person deliberately flips these switches, after reviewing real reports.

---

## 5. What's Actually Been Done So Far

- ✅ Reviewed Catching Chrome's real trip catalogue (salmon, steelhead, sturgeon, Dungeness crab, shad — see `src/lib/fishingCalendar.ts` and `PricingSection.tsx` in the site repo) and service area (Columbia River, Willamette River, and coastal tributaries) to build a tailored junk-word list and a whitelist that protects every real trip type, plus genuine price/review research for this business specifically.
- ✅ Added Catching Chrome's configuration to the same guardrail script already running for PHS and All Phase Plumbing — one script, each client's own settings block.
- ✅ Packaged it into its own delivery folder for this project: `google-ads-guardrails-CatchingChrome/google-ads-guardrail/`.
- ✅ Set it to email **yash@ethixweb.com** and **amar@ethixweb.com** whenever it finds something worth flagging (agency-only for now — not yet copying the client's own inbox in).
- ✅ Guardrail thresholds scaled down from *both* PHS's and All Phase's sizes to match this account's real **$10/day** budget — see `spendGuardrail` (2 days of budget, not 7), `cpaGuardrail` (below the $150–$250/person trip price, over a longer 14-day window so a small budget has time to produce a meaningful reading), and `trackingHealthCheck` (10 clicks/$20 over 10 days, not 20 clicks/$100 over 7) in `Config.js`.
- ⏳ **Still open (blocking a live deployment):** Catching Chrome's real Google Ads customer ID. `Config.js` currently uses a placeholder (`000-000-0001` is PHS's — this account is `000-000-0002`, marked `TODO` in the file) because no live Google Ads account has been linked yet, unlike All Phase's confirmed `148-078-4833`. Nothing runs against a real account until that ID is filled in and the script is actually installed (see `docs/01-DEPLOYMENT-GUIDE.md`).
- ⏳ **Still open:** no real search-term data exists yet for this account, so — same caveat as All Phase at onboarding — no competitor guide-service names or out-of-service-area cities have been added to the junk list. Those get added once a few weeks of real traffic come in, not guessed at up front.

---

## 6. What You'll Actually See Going Forward

- **Most days:** nothing. No email means nothing needed attention.
- **When something's off:** an email arrives listing exactly what was found — which search term, which campaign, how much it cost, and why it was flagged.
- **After a trial period** (once it's actually installed against a real account and we've watched a few days/weeks of real reports): a decision gets made on whether to switch it from "watch only" into "auto-fix," and whether to add Catching Chrome's own team to the alert emails.

---

## 7. Quick Glossary (Plain English)

| Term | What it actually means |
|---|---|
| **Negative keyword** | A word or phrase you tell Google "never show my ad for this search." |
| **Search term** | The exact phrase someone typed into Google before your ad appeared. |
| **Conversion** | A result — someone submitted the trip enquiry form, called, or emailed. |
| **CPC (cost per click)** | How much you paid for one single click. |
| **CPA (cost per conversion)** | How much you paid, on average, for each actual enquiry/booking lead. |
| **Campaign** | A group of ads targeting a specific goal (e.g. "Salmon Charters — Columbia River"). |
| **Preview mode** | A test run — shows what *would* happen, but changes nothing for real. |
| **Whitelist** | Words/phrases that must NEVER be blocked, even if they look similar to junk words — e.g. "fishing charter cost" is a real pre-booking search, so it's protected even though "cost" alone is a junk signal by default. |
