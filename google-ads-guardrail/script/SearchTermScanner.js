/**
 * ============================================================================
 * SearchTermScanner.js
 * Pulls the Search Terms report for the configured lookback window and
 * matches each search term against the client's bad word list / whitelist.
 * Pure read + classification logic — no mutation happens in this file.
 * ============================================================================
 */

/**
 * Fetches every search term with impressions in the account over the
 * configured lookback window, optionally enriched with the keyword text/match
 * type that triggered it.
 *
 * IMPORTANT: this is deliberately TWO separate GAQL queries against
 * search_term_view rather than one. Google Ads' API silently drops any row
 * that has no associated keyword segment as soon as a `segments.keyword.*`
 * field is added to the SELECT clause — i.e. Dynamic Search Ads traffic and
 * other non-keyword-attributed matches (which are exactly the kind of
 * unqualified traffic this tool exists to catch) would vanish from the
 * result set entirely, silently, with no error. So the primary query below
 * never selects segments.keyword.* — it is the complete, authoritative list
 * of every search term with impressions in the window, full stop. Keyword
 * text is layered on afterward, best-effort, from a second query, purely for
 * display; it never gates which rows get scanned for bad words.
 *
 * Note: Performance Max campaigns are not covered by search_term_view at
 * all (Google Ads API limitation, not something a query change can fix) —
 * see docs/06-FUTURE-IMPROVEMENTS.md.
 *
 * @param {Object} config Effective client config.
 * @return {Array<Object>} rows: {searchTerm, campaignId, campaignName,
 *   adGroupId, adGroupName, keywordText, keywordMatchType, clicks,
 *   impressions, cost, conversions}
 */
function fetchSearchTerms(config) {
  var results = fetchSearchTermRows(config);

  if (config.enrichKeywordAttribution) {
    var attributionByKey = fetchKeywordAttributionLookup(config);
    results.forEach(function (row) {
      var info = attributionByKey[buildAttributionKey(row.adGroupId, row.searchTerm)];
      row.keywordText = info ? info.text : '(no discrete keyword — broad/DSA-style match)';
      row.keywordMatchType = info ? info.matchType : '';
    });
  } else {
    results.forEach(function (row) {
      row.keywordText = '(keyword attribution disabled — see config.enrichKeywordAttribution)';
      row.keywordMatchType = '';
    });
  }

  return results;
}

/**
 * The complete, unfiltered search terms report for the window: every search
 * term with impressions, regardless of whether it can be attributed to a
 * discrete keyword. This is the query whose row set actually gets scanned
 * for bad words and fed into the CPC-outlier baseline — see fetchSearchTerms().
 * @param {Object} config
 * @return {Array<Object>}
 */
function fetchSearchTermRows(config) {
  var query =
    'SELECT ' +
    '  search_term_view.search_term, ' +
    '  campaign.id, ' +
    '  campaign.name, ' +
    '  ad_group.id, ' +
    '  ad_group.name, ' +
    '  metrics.clicks, ' +
    '  metrics.impressions, ' +
    '  metrics.cost_micros, ' +
    '  metrics.conversions ' +
    'FROM search_term_view ' +
    'WHERE ' + buildDateRangeClause(config.lookbackDays);

  var rows = AdsApp.search(query);
  var results = [];

  while (rows.hasNext()) {
    var row = rows.next();
    results.push({
      searchTerm: row.searchTermView.searchTerm,
      campaignId: row.campaign.id,
      campaignName: row.campaign.name,
      adGroupId: row.adGroup.id,
      adGroupName: row.adGroup.name,
      clicks: row.metrics.clicks,
      impressions: row.metrics.impressions,
      cost: microsToCurrency(row.metrics.costMicros),
      conversions: row.metrics.conversions,
    });
  }

  return results;
}

/**
 * Best-effort lookup of keyword text/match type for search terms that DO
 * have a discrete matched keyword, keyed by ad group + search term. This
 * query's row count can legitimately be smaller than fetchSearchTermRows()'s
 * (DSA/broad-driven rows have no keyword segment and won't appear here) —
 * that's expected, not an error; fetchSearchTerms() falls back to a plain
 * label for anything missing from this map.
 *
 * Edge case: if the same (ad group, search term) pair was triggered by more
 * than one distinct keyword within the window, this map only keeps the last
 * one seen — acceptable since keyword text here is informational display
 * only and never affects bad-word matching or negative-keyword decisions.
 * @param {Object} config
 * @return {Object} map of "adGroupId|search term" (lowercased) -> {text, matchType}
 */
function fetchKeywordAttributionLookup(config) {
  var query =
    'SELECT ' +
    '  search_term_view.search_term, ' +
    '  ad_group.id, ' +
    '  segments.keyword.info.text, ' +
    '  segments.keyword.info.match_type ' +
    'FROM search_term_view ' +
    'WHERE ' + buildDateRangeClause(config.lookbackDays);

  var rows = AdsApp.search(query);
  var lookup = {};

  while (rows.hasNext()) {
    var row = rows.next();
    var keywordInfo = (row.segments && row.segments.keyword && row.segments.keyword.info) || {};
    if (!keywordInfo.text) continue;
    lookup[buildAttributionKey(row.adGroup.id, row.searchTermView.searchTerm)] = {
      text: keywordInfo.text,
      matchType: keywordInfo.matchType || '',
    };
  }

  return lookup;
}

/**
 * Composite key used to join fetchSearchTermRows() output against
 * fetchKeywordAttributionLookup() output.
 * @param {string} adGroupId
 * @param {string} searchTerm
 * @return {string}
 */
function buildAttributionKey(adGroupId, searchTerm) {
  return adGroupId + '|' + searchTerm.toLowerCase();
}

/**
 * Returns the account's blended average CPC over the same lookback window,
 * used as the baseline for high-CPC outlier detection.
 * @param {Object} config
 * @return {number} average CPC in account currency, 0 if there were no clicks
 */
function fetchAccountAverageCpc(config) {
  var query =
    'SELECT metrics.cost_micros, metrics.clicks ' +
    'FROM customer ' +
    'WHERE ' + buildDateRangeClause(config.lookbackDays);

  var rows = AdsApp.search(query);
  if (!rows.hasNext()) return 0;

  var row = rows.next();
  return safeDivide(microsToCurrency(row.metrics.costMicros), row.metrics.clicks);
}

/**
 * Returns the first bad word from the list that appears in searchTerm as a
 * whole word/phrase (case-insensitive, word-boundary matched via
 * containsWholeWordOrPhrase() so "cost" doesn't false-positive inside an
 * unrelated longer word).
 * @param {string} searchTerm
 * @param {Array<string>} badWordList
 * @return {?string} the matching bad word, or null if none matched
 */
function findMatchingBadWord(searchTerm, badWordList) {
  var lower = searchTerm.toLowerCase();
  for (var i = 0; i < badWordList.length; i++) {
    if (containsWholeWordOrPhrase(lower, badWordList[i])) {
      return badWordList[i];
    }
  }
  return null;
}

/**
 * Returns true if searchTerm contains any whitelist phrase. Whitelisted
 * terms must never be treated as negative-keyword candidates, regardless of
 * any bad word match.
 *
 * Deliberately a plain substring check, NOT word-boundary matched like
 * findMatchingBadWord() — erring toward over-protecting is the safe
 * direction here (a whitelist phrase appearing as part of a longer search
 * term should still count as protected), whereas the bad-word matcher errs
 * toward precision to avoid false-positive negatives.
 * @param {string} searchTerm
 * @param {Array<string>} whitelist
 * @return {boolean}
 */
function isWhitelisted(searchTerm, whitelist) {
  var lower = searchTerm.toLowerCase();
  for (var i = 0; i < whitelist.length; i++) {
    var phrase = (whitelist[i] || '').toLowerCase().trim();
    if (phrase && lower.indexOf(phrase) !== -1) {
      return true;
    }
  }
  return false;
}
