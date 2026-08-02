/**
 * ============================================================================
 * NegativeKeywordManager.js
 * Turns bad-word matches from SearchTermScanner into findings, and — only
 * when explicitly authorized — mutates the account by adding campaign-level
 * negative keywords. This is the only file that ever calls
 * campaign.createNegativeKeyword() or campaign.pause().
 * ============================================================================
 */

/**
 * Returns the existing campaign-level negative keyword texts for a campaign,
 * lowercased and stripped of match-type punctuation ("phrase", [exact]), so
 * they can be substring-compared against new search terms.
 * @param {string} campaignId
 * @return {Array<string>}
 */
function getExistingCampaignNegatives(campaignId) {
  var texts = [];
  var iterator = AdsApp.campaigns().withIds([campaignId]).get();
  if (!iterator.hasNext()) return texts;

  var campaign = iterator.next();
  var negIterator = campaign.negativeKeywords().get();
  while (negIterator.hasNext()) {
    var neg = negIterator.next();
    texts.push(neg.getText().replace(/["\[\]]/g, '').toLowerCase().trim());
  }
  return texts;
}

/**
 * True if any existing negative keyword is a whole word/phrase match within
 * the search term (a reasonable proxy for "this negative should have
 * blocked this query"), regardless of the negative's own match type.
 *
 * Uses the same word-boundary matching as findMatchingBadWord() (via
 * containsWholeWordOrPhrase) rather than a plain substring check — a
 * 2-letter negative like "ac" must not "cover" a search term just because
 * it appears inside "compact" or "vacancy".
 * @param {string} searchTerm
 * @param {Array<string>} existingNegatives
 * @return {boolean}
 */
function isSupposedlyCoveredByExistingNegative(searchTerm, existingNegatives) {
  var lower = searchTerm.toLowerCase();
  return existingNegatives.some(function (neg) {
    return containsWholeWordOrPhrase(lower, neg);
  });
}

/**
 * Scans every search term row for bad-word matches and produces findings.
 * In AUTO_ADD mode (and only when liveMutationAllowed is true — computed by
 * the caller in Main.js's runOneAccount() from Preview mode, the global
 * FORCE_PREVIEW_MODE switch, and this client's confirmedLiveMode all
 * agreeing), it also adds new campaign negative keywords, de-duplicated both
 * against the account's existing negatives and against other matches
 * already queued in this same run.
 *
 * Whitelisted search terms are skipped entirely before any bad-word check —
 * they can never become a negative keyword candidate.
 *
 * @param {Object} config Effective client config.
 * @param {Array<Object>} searchTerms Rows from fetchSearchTerms().
 * @param {boolean} liveMutationAllowed Whether AUTO_ADD may actually mutate.
 * @return {Array<Object>} findings
 */
function processNegativeKeywords(config, searchTerms, liveMutationAllowed) {
  var findings = [];
  var existingNegativesByCampaign = {}; // campaignId -> string[]
  var queuedThisRunByCampaign = {}; // campaignId -> { lowercaseWord: true }

  searchTerms.forEach(function (row) {
    if (isWhitelisted(row.searchTerm, config.whitelist)) {
      return;
    }

    var matchedWord = findMatchingBadWord(row.searchTerm, config.badWordList);
    if (!matchedWord) {
      return;
    }

    if (!existingNegativesByCampaign[row.campaignId]) {
      existingNegativesByCampaign[row.campaignId] = getExistingCampaignNegatives(row.campaignId);
    }
    var existingNegatives = existingNegativesByCampaign[row.campaignId];

    if (isSupposedlyCoveredByExistingNegative(row.searchTerm, existingNegatives)) {
      findings.push(createFinding({
        type: 'NEGATIVE_GAP',
        campaignName: row.campaignName,
        campaignId: row.campaignId,
        adGroupName: row.adGroupName,
        keyword: row.keywordText,
        searchTerm: row.searchTerm,
        cost: row.cost,
        clicks: row.clicks,
        conversions: row.conversions,
        reason: 'This search term should have been blocked by an existing negative ' +
          'containing "' + matchedWord + '" but still served. Verify the negative is ' +
          'actually applied at the campaign level (not just drafted, or added after ' +
          'this traffic occurred).',
        actionTaken: 'None — flagged for manual verification',
      }));
      return; // do not also queue a duplicate negative
    }

    if (config.negativeKeywordMode === 'AUTO_ADD') {
      if (!queuedThisRunByCampaign[row.campaignId]) queuedThisRunByCampaign[row.campaignId] = {};
      queuedThisRunByCampaign[row.campaignId][matchedWord.toLowerCase()] = {
        word: matchedWord,
        sampleSearchTerm: row.searchTerm,
        campaignName: row.campaignName,
      };
    } else {
      findings.push(createFinding({
        type: 'NEGATIVE_FLAGGED',
        campaignName: row.campaignName,
        campaignId: row.campaignId,
        adGroupName: row.adGroupName,
        keyword: row.keywordText,
        searchTerm: row.searchTerm,
        cost: row.cost,
        clicks: row.clicks,
        conversions: row.conversions,
        reason: 'Matched bad word "' + matchedWord + '".',
        actionTaken: 'None — negativeKeywordMode is FLAG_ONLY',
      }));
    }
  });

  if (config.negativeKeywordMode === 'AUTO_ADD') {
    Object.keys(queuedThisRunByCampaign).forEach(function (campaignId) {
      var candidates = queuedThisRunByCampaign[campaignId];
      var words = Object.keys(candidates).map(function (k) { return candidates[k].word; });

      if (!liveMutationAllowed) {
        words.forEach(function (word) {
          var c = candidates[word.toLowerCase()];
          findings.push(createFinding({
            type: 'NEGATIVE_WOULD_ADD',
            campaignName: c.campaignName,
            campaignId: campaignId,
            searchTerm: c.sampleSearchTerm,
            reason: 'Would add campaign-level broad-match negative "' + word +
              '" (AUTO_ADD is configured, but preview mode / FORCE_PREVIEW_MODE / ' +
              'confirmedLiveMode is blocking live mutation).',
            actionTaken: 'None — dry run',
          }));
        });
        return;
      }

      var added = addCampaignNegativeKeywords(
        campaignId, words, config.whitelist, existingNegativesByCampaign[campaignId]
      );
      added.forEach(function (word) {
        var c = candidates[word.toLowerCase()];
        findings.push(createFinding({
          type: 'NEGATIVE_ADDED',
          campaignName: c.campaignName,
          campaignId: campaignId,
          searchTerm: c.sampleSearchTerm,
          reason: 'Search term matched bad word "' + word + '".',
          actionTaken: 'Added campaign-level broad-match negative keyword: "' + word + '"',
        }));
      });
    });
  }

  return findings;
}

/**
 * Adds each word as a campaign-level broad-match negative keyword, skipping
 * any word that already exists as a negative on that campaign, or that would
 * itself match a whitelisted phrase (defense in depth — the caller should
 * already have filtered whitelisted search terms out before reaching here).
 *
 * A local copy of existingNegatives is updated as each word is added, so if
 * the same word were somehow queued twice in one call (the caller already
 * dedupes per campaign per run, but this makes the function safe to call on
 * its own too), the second occurrence is skipped rather than causing a
 * duplicate-negative error from the API.
 *
 * @param {string} campaignId
 * @param {Array<string>} words Candidate words to add.
 * @param {Array<string>} whitelist
 * @param {Array<string>=} knownExistingNegatives Already-fetched, lowercased
 *   negative keyword texts for this campaign (from processNegativeKeywords'
 *   per-run cache). Avoids a second read of the same data; if omitted, this
 *   function fetches it itself so it remains safe to call independently.
 * @return {Array<string>} the words that were actually added
 */
function addCampaignNegativeKeywords(campaignId, words, whitelist, knownExistingNegatives) {
  var added = [];
  var iterator = AdsApp.campaigns().withIds([campaignId]).get();
  if (!iterator.hasNext()) return added;
  var campaign = iterator.next();

  var existing = (knownExistingNegatives || getExistingCampaignNegatives(campaignId)).slice();

  words.forEach(function (word) {
    var lower = word.toLowerCase().trim();
    if (existing.indexOf(lower) !== -1) {
      return; // already present — skip, don't error on duplicate
    }
    if (isWhitelisted(word, whitelist)) {
      return; // safety net; should not normally trigger
    }
    try {
      campaign.createNegativeKeyword(word);
      added.push(word);
      existing.push(lower);
    } catch (e) {
      Logger.log('Failed to add negative keyword "' + word + '" to campaign ' +
        campaignId + ': ' + e);
    }
  });

  return added;
}
