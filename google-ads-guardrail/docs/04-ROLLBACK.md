# Rollback Instructions

## Stopping the script entirely

1. Go to **Tools & Settings > Bulk Actions > Scripts**.
2. Open the script's schedule and set it to **Never run** (or delete the schedule).
3. This does not undo anything the script already did — see below for that.

## Fastest, safest rollback: re-enable the safety gates

If something looks wrong, you don't need to touch a client's `Config.js` entry to stop further damage:

1. Set `FORCE_PREVIEW_MODE = true` at the top of `Config.js` and save. This immediately makes every account behave as if it were in Preview on the next run — no further negatives added, no further pauses, no further alerts sent — without needing to change any per-client block.
2. Investigate at your own pace, then selectively re-enable per client once you understand what happened.

## Undoing auto-added negative keywords

The script does not delete anything on its own — every negative it added is a normal campaign-level negative keyword and can be removed manually:

1. In the Ads UI: **Campaigns > Negative keywords** (campaign level) for the affected campaign.
2. Cross-reference against the email/Slack/Sheet history — every `NEGATIVE_ADDED` finding recorded the exact word/phrase, campaign, and timestamp.
3. Select and remove the specific negative keywords that were added in error.
4. Add the corresponding search term(s) to that client's `whitelist` in `Config.js` so the script won't re-flag/re-add them.

If Sheets integration was enabled for that client, the "Guardrail Log" tab is the fastest audit trail — filter by date and `Action Taken = "Added campaign-level broad-match negative keyword..."`.

## Undoing an auto-pause

1. In the Ads UI, find the paused campaign (**Campaigns**, filter by status = Paused).
2. Re-enable it manually.
3. If the auto-pause was a false positive, either raise `cpaGuardrail.thresholdUSD` for that client, or set `cpaGuardrail.autoPauseCampaign: false` to go back to alert-only for CPA overages while you investigate.

## Reverting a bad config change

Since all client settings live in one file (`Config.js`), keep a copy of each version you deploy (e.g. paste into a version-controlled repo, or just keep the previous `Config.js` content somewhere before editing) so a bad edit can be pasted back in directly rather than reconstructed from memory.

## Full removal

1. Remove the schedule (see "Stopping the script entirely" above).
2. Delete the script project from **Tools & Settings > Scripts**.
3. Manually review and remove any negative keywords / paused campaigns you no longer want, using the same audit trail described above.
