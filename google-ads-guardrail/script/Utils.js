/**
 * ============================================================================
 * Utils.js
 * Shared, side-effect-free helper functions used across every other file in
 * this project. No client-specific or account-mutating logic lives here.
 * ============================================================================
 */

/**
 * Returns a Date object N calendar days before now, in script-server time.
 * Callers should format it with formatDateForGaql() before using it in GAQL,
 * since GAQL date literals must be in the account's own timezone.
 * @param {number} n Number of days to go back.
 * @return {Date}
 */
function daysAgo(n) {
  var d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

/**
 * Formats a Date as YYYY-MM-DD in the given account's timezone, suitable for
 * a GAQL "BETWEEN" date literal.
 * @param {Date} date
 * @return {string}
 */
function formatDateForGaql(date) {
  return Utilities.formatDate(date, AdsApp.currentAccount().getTimeZone(), 'yyyy-MM-dd');
}

/**
 * Builds a GAQL WHERE fragment covering a trailing N-day window that ends
 * YESTERDAY, not today. Google Ads metrics for the current day are still
 * accumulating and can be materially incomplete depending on when the
 * script's schedule fires (this project's own deployment guide recommends
 * an overnight run so "yesterday" is fully settled) — including a partial
 * "today" in a zero-conversion or CPA check risks a false alert on a
 * campaign that simply hasn't had time to convert yet today. Uses explicit
 * BETWEEN dates rather than DURING LAST_N_DAYS, since the DURING literal
 * only supports a small fixed set of ranges (7/14/30/etc.) and this needs to
 * work for any configured window.
 * @param {number} windowDays
 * @return {string} e.g. segments.date BETWEEN "2026-06-27" AND "2026-07-03"
 *   (a 7-day window ending yesterday, if today is 2026-07-04)
 */
function buildDateRangeClause(windowDays) {
  var end = daysAgo(1); // yesterday — the most recent fully-settled day
  var start = daysAgo(windowDays);
  return 'segments.date BETWEEN "' + formatDateForGaql(start) + '" AND "' + formatDateForGaql(end) + '"';
}

/**
 * Converts Google Ads API cost micros to a plain currency number.
 * @param {number} micros
 * @return {number}
 */
function microsToCurrency(micros) {
  return (micros || 0) / 1e6;
}

/**
 * Division that safely returns 0 instead of NaN/Infinity when the
 * denominator is zero.
 * @param {number} numerator
 * @param {number} denominator
 * @return {number}
 */
function safeDivide(numerator, denominator) {
  if (!denominator) return 0;
  return numerator / denominator;
}

/**
 * Escapes regex special characters in a string so it can be embedded
 * literally inside a RegExp.
 * @param {string} str
 * @return {string}
 */
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Formats a currency number for display, e.g. 45.0748 -> "$45.07".
 * @param {number} amount
 * @return {string}
 */
function formatCurrency(amount) {
  return '$' + (amount || 0).toFixed(2);
}

/**
 * Formats a Date as a readable timestamp for logs and emails.
 * @param {Date} date
 * @return {string}
 */
function formatTimestamp(date) {
  return Utilities.formatDate(date, AdsApp.currentAccount().getTimeZone(), 'yyyy-MM-dd HH:mm:ss z');
}

/**
 * Returns true if val is a non-empty string after trimming.
 * @param {*} val
 * @return {boolean}
 */
function isNonEmptyString(val) {
  return typeof val === 'string' && val.trim().length > 0;
}

/**
 * True if `phrase` appears in `haystackLower` as a whole word/phrase
 * (word-boundary matched), not merely as a substring — e.g. "ac" will match
 * "no ac power" but will NOT match inside "compact" or "vacancy". Used for
 * both bad-word matching (SearchTermScanner.js) and existing-negative gap
 * detection (NegativeKeywordManager.js) so the two can never disagree about
 * what "matches" means.
 * @param {string} haystackLower Already-lowercased text to search within.
 * @param {string} phrase The word or phrase to look for (any case).
 * @return {boolean}
 */
function containsWholeWordOrPhrase(haystackLower, phrase) {
  var trimmed = (phrase || '').toLowerCase().trim();
  if (!trimmed) return false;
  var pattern = new RegExp('\\b' + escapeRegExp(trimmed).replace(/\s+/g, '\\s+') + '\\b');
  return pattern.test(haystackLower);
}

/**
 * Canonical shape for every alert/log line this project produces. All
 * guardrail and scanner functions return arrays of these; AlertsAndLogging.js
 * and SheetsIntegration.js consume that single shape to render the email,
 * Slack message, sheet rows, and Logger output, so formatting logic is never
 * duplicated per output channel.
 * @param {Object} fields Any subset of: type, campaignName, campaignId,
 *   adGroupName, keyword, searchTerm, cost, clicks, conversions, cpc, cpa,
 *   reason, actionTaken.
 * @return {Object} a finding with sensible defaults for missing fields.
 */
function createFinding(fields) {
  return {
    timestamp: new Date(),
    type: fields.type || 'INFO',
    campaignName: fields.campaignName || '',
    campaignId: fields.campaignId || '',
    adGroupName: fields.adGroupName || '',
    keyword: fields.keyword || '',
    searchTerm: fields.searchTerm || '',
    cost: typeof fields.cost === 'number' ? fields.cost : null,
    clicks: typeof fields.clicks === 'number' ? fields.clicks : null,
    conversions: typeof fields.conversions === 'number' ? fields.conversions : null,
    cpc: typeof fields.cpc === 'number' ? fields.cpc : null,
    cpa: typeof fields.cpa === 'number' ? fields.cpa : null,
    reason: fields.reason || '',
    actionTaken: fields.actionTaken || 'None — alert only',
  };
}
