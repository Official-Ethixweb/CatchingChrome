/**
 * ============================================================================
 * Guardrails.js
 * Account-health checks that don't depend on the search terms report:
 * zero-conversion spend, CPA threshold (with optional auto-pause), CPC
 * outliers, and conversion-tracking health. Each returns an array of
 * findings in the same shape produced by NegativeKeywordManager.js.
 * ============================================================================
 */

/**
 * Fetches per-campaign cost/clicks/conversions for enabled campaigns over a
 * given window.
 * @param {number} windowDays
 * @return {Array<Object>} {campaignId, campaignName, cost, clicks, conversions}
 */
function fetchCampaignStats(windowDays) {
  var query =
    'SELECT campaign.id, campaign.name, metrics.cost_micros, metrics.clicks, metrics.conversions ' +
    'FROM campaign ' +
    'WHERE campaign.status = "ENABLED" ' +
    'AND ' + buildDateRangeClause(windowDays);

  var rows = AdsApp.search(query);
  var results = [];
  while (rows.hasNext()) {
    var row = rows.next();
    results.push({
      campaignId: row.campaign.id,
      campaignName: row.campaign.name,
      cost: microsToCurrency(row.metrics.costMicros),
      clicks: row.metrics.clicks,
      conversions: row.metrics.conversions,
    });
  }
  return results;
}

/**
 * Returns campaign stats for a given window, fetching once and reusing the
 * result for any other guardrail in the same run that asks for the same
 * window. The spend, CPA, and tracking-health checks all default to the
 * same windowDays, so in the common case this collapses three identical
 * GAQL queries per account run down to one.
 * @param {Object} cache Plain object keyed by windowDays, created fresh by
 *   the caller (runOneAccount) for each account run — never shared across
 *   accounts, so stats from one account can never leak into another's.
 * @param {number} windowDays
 * @return {Array<Object>}
 */
function getCampaignStatsCached(cache, windowDays) {
  if (!cache[windowDays]) {
    cache[windowDays] = fetchCampaignStats(windowDays);
  }
  return cache[windowDays];
}

/**
 * Flags any enabled campaign that has spent more than the configured
 * threshold with zero conversions over the configured rolling window.
 * @param {Object} config
 * @param {Object} campaignStatsCache Shared cache from getCampaignStatsCached().
 * @return {Array<Object>} findings
 */
function checkSpendWithZeroConversions(config, campaignStatsCache) {
  var findings = [];
  var stats = getCampaignStatsCached(campaignStatsCache, config.spendGuardrail.windowDays);

  stats.forEach(function (row) {
    if (row.conversions === 0 && row.cost > config.spendGuardrail.thresholdUSD) {
      findings.push(createFinding({
        type: 'ZERO_CONVERSION_SPEND',
        campaignName: row.campaignName,
        campaignId: row.campaignId,
        cost: row.cost,
        clicks: row.clicks,
        conversions: row.conversions,
        reason: formatCurrency(row.cost) + ' spent over the last ' +
          config.spendGuardrail.windowDays + ' day(s) with 0 conversions ' +
          '(threshold: ' + formatCurrency(config.spendGuardrail.thresholdUSD) + ').',
        actionTaken: 'None — alert only',
      }));
    }
  });

  return findings;
}

/**
 * Flags any enabled campaign whose cost-per-conversion exceeds the
 * configured threshold. If cpaGuardrail.autoPauseCampaign is true AND
 * liveMutationAllowed is true, also pauses the campaign.
 * @param {Object} config
 * @param {boolean} liveMutationAllowed
 * @param {Object} campaignStatsCache Shared cache from getCampaignStatsCached().
 * @return {Array<Object>} findings
 */
function checkCostPerConversion(config, liveMutationAllowed, campaignStatsCache) {
  var findings = [];
  var stats = getCampaignStatsCached(campaignStatsCache, config.cpaGuardrail.windowDays);

  stats.forEach(function (row) {
    if (row.conversions <= 0) return;
    var cpa = safeDivide(row.cost, row.conversions);
    if (cpa <= config.cpaGuardrail.thresholdUSD) return;

    var willPause = config.cpaGuardrail.autoPauseCampaign && liveMutationAllowed;

    if (willPause) {
      var iterator = AdsApp.campaigns().withIds([row.campaignId]).get();
      if (iterator.hasNext()) {
        iterator.next().pause();
      }
    }

    findings.push(createFinding({
      type: willPause ? 'CPA_AUTOPAUSE' : 'CPA_THRESHOLD',
      campaignName: row.campaignName,
      campaignId: row.campaignId,
      cost: row.cost,
      conversions: row.conversions,
      cpa: cpa,
      reason: 'CPA of ' + formatCurrency(cpa) + ' over the last ' +
        config.cpaGuardrail.windowDays + ' day(s) exceeds threshold of ' +
        formatCurrency(config.cpaGuardrail.thresholdUSD) + '.',
      actionTaken: willPause
        ? 'Campaign paused automatically (autoPauseCampaign enabled)'
        : (config.cpaGuardrail.autoPauseCampaign
            ? 'Would have auto-paused, but blocked by preview mode / confirmedLiveMode'
            : 'None — alert only'),
    }));
  });

  return findings;
}

/**
 * Flags any search term whose own CPC exceeds cpcGuardrail.multiplier times
 * the account's blended average CPC over the same window — catches outlier
 * clicks (e.g. a single $101 click) as soon as they happen.
 * @param {Object} config
 * @param {Array<Object>} searchTerms Rows from fetchSearchTerms().
 * @param {number} accountAvgCpc From fetchAccountAverageCpc().
 * @return {Array<Object>} findings
 */
function checkCpcOutliers(config, searchTerms, accountAvgCpc) {
  var findings = [];
  if (accountAvgCpc <= 0) return findings;

  searchTerms.forEach(function (row) {
    if (row.clicks < config.cpcGuardrail.minClicks) return;
    var cpc = safeDivide(row.cost, row.clicks);
    var limit = config.cpcGuardrail.multiplier * accountAvgCpc;
    if (cpc <= limit) return;

    findings.push(createFinding({
      type: 'HIGH_CPC',
      campaignName: row.campaignName,
      campaignId: row.campaignId,
      adGroupName: row.adGroupName,
      keyword: row.keywordText,
      searchTerm: row.searchTerm,
      cost: row.cost,
      clicks: row.clicks,
      conversions: row.conversions,
      cpc: cpc,
      reason: 'CPC of ' + formatCurrency(cpc) + ' is ' + (cpc / accountAvgCpc).toFixed(1) +
        'x the account average of ' + formatCurrency(accountAvgCpc) +
        ' (threshold: ' + config.cpcGuardrail.multiplier + 'x).',
      actionTaken: 'None — alert only',
    }));
  });

  return findings;
}

/**
 * Flags campaigns with enough clicks and spend to expect conversions, but
 * zero recorded — a signal that conversion tracking itself may be broken
 * rather than the traffic being genuinely unqualified. Distinct from
 * checkSpendWithZeroConversions(): this uses its own (typically higher)
 * clicks/spend minimums intended to rule out "just not enough data yet."
 * @param {Object} config
 * @param {Object} campaignStatsCache Shared cache from getCampaignStatsCached().
 * @return {Array<Object>} findings
 */
function checkConversionTrackingHealth(config, campaignStatsCache) {
  var findings = [];
  var stats = getCampaignStatsCached(campaignStatsCache, config.trackingHealthCheck.windowDays);

  stats.forEach(function (row) {
    if (
      row.conversions === 0 &&
      row.clicks > config.trackingHealthCheck.minClicks &&
      row.cost > config.trackingHealthCheck.minSpendUSD
    ) {
      findings.push(createFinding({
        type: 'TRACKING_HEALTH',
        campaignName: row.campaignName,
        campaignId: row.campaignId,
        cost: row.cost,
        clicks: row.clicks,
        conversions: row.conversions,
        reason: row.clicks + ' clicks and ' + formatCurrency(row.cost) + ' spent over ' +
          config.trackingHealthCheck.windowDays + ' day(s) with 0 conversions — recommend ' +
          'independently verifying conversion tracking (tag firing, attribution window, ' +
          'conversion action status) before assuming the traffic is simply unqualified.',
        actionTaken: 'None — recommend manual verification',
      }));
    }
  });

  return findings;
}
