/**
 * ============================================================================
 * Main.js
 * Entry point (main()) and orchestration. Decides whether this run is at
 * MCC or single-account scope, resolves each account's config, runs the
 * checks in the right order, and dispatches the resulting findings to
 * logs / email / Slack / Sheets.
 *
 * This file, and every other file in this project, should not need to change
 * when onboarding a new client — all of that lives in Config.js.
 * ============================================================================
 */

/**
 * Google Ads Scripts entry point. Detects whether it's running as an MCC
 * (manager account) script or a single-account script and dispatches
 * accordingly.
 */
function main() {
  if (typeof AdsManagerApp !== 'undefined') {
    runAcrossManagedAccounts();
  } else {
    runSingleAccount();
  }
}

/**
 * Single-account entry path — this script pasted directly into one client's
 * own Google Ads account, rather than run from an MCC (the actual deployment
 * model for both PHS and All Phase Plumbing per docs/01-DEPLOYMENT-GUIDE.md).
 * Mirrors the try/catch + sendErrorEmail pattern already used by the MCC
 * serial/parallel paths (runAcrossManagedAccountsSerially, parallelAccountWorker)
 * so a runtime error here also reaches the client's inbox instead of only
 * ever appearing in this script's own execution log, which nobody is
 * proactively watching.
 */
function runSingleAccount() {
  var config = resolveConfigForCurrentAccount();
  try {
    runOneAccount(config);
  } catch (e) {
    Logger.log('ERROR processing account ' + AdsApp.currentAccount().getCustomerId() +
      ' (' + config.clientName + '): ' + e);
    sendErrorEmail(config, e);
    throw e;
  }
}

/**
 * Runs the full guardrail suite for a single already-selected account and
 * dispatches the resulting findings. Returns a small JSON-able summary so
 * callers (including the parallel-execution callback) can log an outcome
 * without re-deriving it.
 * @param {Object} config Effective config for the currently selected account.
 * @return {Object} {clientName, findingCount, isPreview}
 */
function runOneAccount(config) {
  var isPreview = AdsApp.getExecutionInfo().isPreview();
  var liveMutationAllowed = !isPreview && !FORCE_PREVIEW_MODE && config.confirmedLiveMode === true;

  Logger.log('=== ' + config.clientName + ' — run start (preview=' + isPreview +
    ', forcePreview=' + FORCE_PREVIEW_MODE + ', confirmedLiveMode=' + config.confirmedLiveMode +
    ', liveMutationAllowed=' + liveMutationAllowed + ') ===');

  var searchTerms = fetchSearchTerms(config);
  var accountAvgCpc = fetchAccountAverageCpc(config);

  // Fresh per account run, keyed by windowDays — lets the spend/CPA/tracking
  // checks share one campaign-stats query when their windows match (the
  // default), instead of issuing the same GAQL query three times.
  var campaignStatsCache = {};

  var findings = [];
  findings = findings.concat(processNegativeKeywords(config, searchTerms, liveMutationAllowed));
  findings = findings.concat(checkSpendWithZeroConversions(config, campaignStatsCache));
  findings = findings.concat(checkCostPerConversion(config, liveMutationAllowed, campaignStatsCache));
  findings = findings.concat(checkCpcOutliers(config, searchTerms, accountAvgCpc));
  findings = findings.concat(checkConversionTrackingHealth(config, campaignStatsCache));

  logFindings(config, findings);

  if (!isPreview) {
    sendEmailAlert(config, findings);
    sendSlackAlert(config, findings);
    writeFindingsToSheet(config, findings);
  } else {
    Logger.log('Preview mode: skipping email/Slack/Sheets dispatch (log output above is the full result).');
  }

  Logger.log('=== ' + config.clientName + ' — run end: ' + findings.length + ' finding(s) ===');

  return { clientName: config.clientName, findingCount: findings.length, isPreview: isPreview };
}

/**
 * MCC entry path. Chooses SERIAL or PARALLEL based on EXECUTION_MODE.
 */
function runAcrossManagedAccounts() {
  var customerIds = Object.keys(ACCOUNT_CONFIGS);
  if (customerIds.length === 0) {
    Logger.log('ACCOUNT_CONFIGS is empty — nothing to process.');
    return;
  }

  validateAccountConfigKeys(customerIds);

  if (EXECUTION_MODE === 'PARALLEL') {
    runAcrossManagedAccountsInParallel(customerIds);
  } else {
    runAcrossManagedAccountsSerially(customerIds);
  }
}

/**
 * Sanity-checks that every ACCOUNT_CONFIGS key looks like a real Google Ads
 * customer ID ("123-456-7890"). A typo here (missing dashes, extra/missing
 * digit) doesn't throw anywhere — AdsManagerApp.accounts().withIds() simply
 * won't match that account, so it silently never gets processed. Logging a
 * warning up front turns that into something visible in the run log instead
 * of a client quietly going unmonitored indefinitely.
 * @param {Array<string>} customerIds
 */
function validateAccountConfigKeys(customerIds) {
  var CUSTOMER_ID_PATTERN = /^\d{3}-\d{3}-\d{4}$/;
  customerIds.forEach(function (id) {
    if (!CUSTOMER_ID_PATTERN.test(id)) {
      Logger.log('WARNING: ACCOUNT_CONFIGS key "' + id + '" does not look like a "123-456-7890" ' +
        'customer ID. This account will likely be silently skipped this run — check for a typo.');
    }
  });
}

/**
 * Simple, easy-to-read-logs loop: select each account in turn within this
 * script's own execution. Fine for a handful of accounts; for dozens, prefer
 * EXECUTION_MODE = 'PARALLEL' (see runAcrossManagedAccountsInParallel).
 * @param {Array<string>} customerIds
 */
function runAcrossManagedAccountsSerially(customerIds) {
  var accountIterator = AdsManagerApp.accounts().withIds(customerIds).get();

  while (accountIterator.hasNext()) {
    var account = accountIterator.next();
    AdsManagerApp.select(account);
    var config = mergeConfig(DEFAULT_CONFIG, ACCOUNT_CONFIGS[account.getCustomerId()]);

    try {
      runOneAccount(config);
    } catch (e) {
      Logger.log('ERROR processing account ' + account.getCustomerId() + ' (' + config.clientName + '): ' + e);
      sendErrorEmail(config, e);
    }
  }
}

/**
 * Google Ads' recommended pattern for running a script across many accounts:
 * each account is processed as its own isolated execution via
 * accountSelector.executeInParallel(). executeInParallel supports at most 50
 * accounts per call, so customerIds are chunked into batches of 50.
 *
 * The worker function (parallelAccountWorker) takes no arguments — each
 * parallel execution runs against its own currently-selected account, which
 * it looks up from ACCOUNT_CONFIGS itself via resolveConfigForCurrentAccount().
 * @param {Array<string>} customerIds
 */
function runAcrossManagedAccountsInParallel(customerIds) {
  var BATCH_SIZE = 50; // Google Ads Scripts limit for executeInParallel

  for (var i = 0; i < customerIds.length; i += BATCH_SIZE) {
    var batch = customerIds.slice(i, i + BATCH_SIZE);
    AdsManagerApp.accounts().withIds(batch).executeInParallel(
      'parallelAccountWorker',
      'parallelAccountCallback'
    );
  }
}

/**
 * Entry function for one parallel worker execution. Runs inside its own
 * isolated context with its own account already selected by the platform.
 *
 * Errors are caught, trigger a best-effort client-facing error email (for
 * parity with the serial path's behavior — otherwise a parallel-mode failure
 * would only ever show up in this script's own Logger output, never reach
 * the client's inbox), and are then re-thrown so the platform still records
 * this account's ExecutionResult status as 'ERROR' rather than 'OK'.
 * @return {string} JSON-encoded summary, available to the callback via
 *   executionResult.getReturnValue().
 */
function parallelAccountWorker() {
  var config = resolveConfigForCurrentAccount();
  try {
    var summary = runOneAccount(config);
    return JSON.stringify(summary);
  } catch (e) {
    Logger.log('ERROR processing account ' + AdsApp.currentAccount().getCustomerId() +
      ' (' + config.clientName + '): ' + e);
    sendErrorEmail(config, e);
    throw e;
  }
}

/**
 * Callback invoked once per batch after all of that batch's parallel
 * executions finish. Just centralizes success/failure logging — per-account
 * alerting has already happened inside runOneAccount()/parallelAccountWorker().
 * @param {Array<ExecutionResult>} executionResults
 */
function parallelAccountCallback(executionResults) {
  for (var i = 0; i < executionResults.length; i++) {
    var result = executionResults[i];
    var customerId = result.getCustomerId();
    if (result.getStatus() === 'OK') {
      Logger.log('Parallel run OK for ' + customerId + ': ' + result.getReturnValue());
    } else if (result.getStatus() === 'ERROR') {
      Logger.log('Parallel run ERROR for ' + customerId + ': ' + result.getError());
    }
  }
}
