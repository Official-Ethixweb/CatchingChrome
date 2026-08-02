/**
 * ============================================================================
 * AlertsAndLogging.js
 * Renders the same array of findings into: Logger output (always), a
 * professionally formatted HTML email, and an optional Slack message.
 * Google Sheets rendering lives in SheetsIntegration.js since it has its own
 * column spec, but pulls from this same findings array.
 * ============================================================================
 */

/**
 * Writes one Logger.log line per finding (time, campaign, search term,
 * action, reason), plus a run header/footer. This always runs, including in
 * preview mode, since logging isn't a mutation.
 * @param {Object} config
 * @param {Array<Object>} findings
 */
function logFindings(config, findings) {
  Logger.log('--- ' + config.clientName + ': ' + findings.length + ' finding(s) ---');
  findings.forEach(function (f) {
    Logger.log(
      '[' + formatTimestamp(f.timestamp) + '] ' +
      (f.campaignName || '(account-level)') +
      (f.searchTerm ? ' | search term: "' + f.searchTerm + '"' : '') +
      ' | action: ' + f.actionTaken +
      ' | reason: ' + f.reason
    );
  });
}

/**
 * Human-readable label for each finding type, used as a section heading in
 * the email and as a short tag in Slack.
 */
var FINDING_TYPE_LABELS = {
  NEGATIVE_ADDED: 'Negative keyword added',
  NEGATIVE_WOULD_ADD: 'Negative keyword would be added (dry run)',
  NEGATIVE_FLAGGED: 'Junk search term flagged',
  NEGATIVE_GAP: 'Existing negative not blocking traffic',
  ZERO_CONVERSION_SPEND: 'Spend with zero conversions',
  CPA_THRESHOLD: 'CPA over threshold',
  CPA_AUTOPAUSE: 'CPA over threshold — campaign auto-paused',
  HIGH_CPC: 'High CPC outlier',
  TRACKING_HEALTH: 'Conversion tracking health',
};

/**
 * Builds the email subject line, front-loading a count so it's scannable in
 * an inbox without opening the message.
 * @param {Object} config
 * @param {Array<Object>} findings
 * @return {string}
 */
function buildEmailSubject(config, findings) {
  if (findings.length === 0) {
    return '[Ads Guardrail] ' + config.clientName + ' — no issues found';
  }
  return '[Ads Guardrail] ' + config.clientName + ' — ' + findings.length + ' issue(s) found';
}

/**
 * Builds a professionally formatted HTML email body: a short summary of
 * counts per finding type, followed by a detail table with the columns
 * Campaign / Keyword / Search Term / Spend / Clicks / Conversions / Reason.
 * @param {Object} config
 * @param {Array<Object>} findings
 * @return {string} HTML
 */
function buildEmailHtmlBody(config, findings) {
  var counts = {};
  findings.forEach(function (f) { counts[f.type] = (counts[f.type] || 0) + 1; });

  var summaryItems = Object.keys(counts).map(function (type) {
    return '<li>' + (FINDING_TYPE_LABELS[type] || type) + ': <strong>' + counts[type] + '</strong></li>';
  }).join('');

  var rows = findings.map(function (f) {
    return (
      '<tr>' +
      '<td>' + escapeHtml(FINDING_TYPE_LABELS[f.type] || f.type) + '</td>' +
      '<td>' + escapeHtml(f.campaignName) + '</td>' +
      '<td>' + escapeHtml(f.keyword) + '</td>' +
      '<td>' + escapeHtml(f.searchTerm) + '</td>' +
      '<td>' + (f.cost !== null ? escapeHtml(formatCurrency(f.cost)) : '') + '</td>' +
      '<td>' + (f.clicks !== null ? f.clicks : '') + '</td>' +
      '<td>' + (f.conversions !== null ? f.conversions : '') + '</td>' +
      '<td>' + escapeHtml(f.reason) + '</td>' +
      '</tr>'
    );
  }).join('');

  return (
    '<div style="font-family: Arial, Helvetica, sans-serif; color: #1a1a1a; max-width: 900px;">' +
    '<h2 style="margin-bottom:4px;">Google Ads Guardrail — Daily Summary</h2>' +
    '<p style="margin-top:0; color:#555;">' + escapeHtml(config.clientName) + ' &middot; ' +
    formatTimestamp(new Date()) + '</p>' +
    (findings.length === 0
      ? '<p>No issues found in this run.</p>'
      : (
        '<h3>Summary</h3>' +
        '<ul>' + summaryItems + '</ul>' +
        '<h3>Details</h3>' +
        '<table cellpadding="6" cellspacing="0" border="1" ' +
        'style="border-collapse:collapse; font-size:13px; width:100%;">' +
        '<thead style="background:#f2f2f2;"><tr>' +
        '<th align="left">Type</th><th align="left">Campaign</th><th align="left">Keyword</th>' +
        '<th align="left">Search Term</th><th align="left">Spend</th><th align="left">Clicks</th>' +
        '<th align="left">Conversions</th><th align="left">Reason Flagged</th>' +
        '</tr></thead><tbody>' + rows + '</tbody></table>'
      )
    ) +
    '<p style="margin-top:16px; color:#888; font-size:12px;">Generated automatically by the ' +
    'Search Term Waste Guardrail script. Reply-all is not monitored.</p>' +
    '</div>'
  );
}

/**
 * Sends the HTML summary email if the client has at least one recipient
 * configured, and either there are findings or alwaysSendSummary is on.
 *
 * Two production safety nets, both important once one script is covering
 * many client accounts under one authorizing Google identity:
 *  - MailApp's daily send quota is shared across every account this script
 *    processes in a run (and across any other script run by the same
 *    identity that day). Checked via MailApp.getRemainingDailyQuota() before
 *    sending, so a quota exhausted by account #40 doesn't throw and instead
 *    logs a clear, actionable warning — accounts already have their findings
 *    in the Logger output and, if configured, Slack/Sheets regardless.
 *  - The send itself is wrapped in try/catch so one client's malformed
 *    alertEmails entry (typo, bounced domain, etc.) can't throw an uncaught
 *    exception that would make this account's ENTIRE run look like it
 *    failed (a real concern under EXECUTION_MODE = 'PARALLEL', where an
 *    uncaught exception here would flip that account's ExecutionResult to
 *    'ERROR' even though every guardrail check actually succeeded).
 * @param {Object} config
 * @param {Array<Object>} findings
 */
function sendEmailAlert(config, findings) {
  if (!config.alertEmails || config.alertEmails.length === 0) return;
  if (findings.length === 0 && !config.alwaysSendSummary) return;

  var remainingQuota = MailApp.getRemainingDailyQuota();
  if (remainingQuota < config.alertEmails.length) {
    Logger.log('Skipping email for ' + config.clientName + ': MailApp daily quota nearly ' +
      'exhausted (' + remainingQuota + ' recipient-send(s) remaining, this email needs ' +
      config.alertEmails.length + '). This usually means many client accounts share one ' +
      'authorizing Google identity\'s daily quota — consider spreading accounts across more ' +
      'than one authorizing user, or relying on Slack/Sheets for lower-priority clients.');
    return;
  }

  try {
    MailApp.sendEmail({
      to: config.alertEmails.join(','),
      subject: buildEmailSubject(config, findings),
      htmlBody: buildEmailHtmlBody(config, findings),
    });
  } catch (e) {
    Logger.log('Failed to send summary email for ' + config.clientName + ' (check alertEmails ' +
      'for typos): ' + e);
  }
}

/**
 * Best-effort "the script itself errored" email, shared by both the serial
 * and parallel MCC execution paths in Main.js so the two don't duplicate
 * this try/catch/log logic.
 * @param {Object} config
 * @param {*} error
 */
function sendErrorEmail(config, error) {
  if (!config.alertEmails || config.alertEmails.length === 0) return;
  try {
    MailApp.sendEmail({
      to: config.alertEmails.join(','),
      subject: '[Ads Guardrail] ' + config.clientName + ' — script error',
      body: 'The guardrail script threw an error processing this account:\n\n' + error,
    });
  } catch (e2) {
    Logger.log('Also failed to send error alert for ' + config.clientName + ': ' + e2);
  }
}

/**
 * Builds a condensed Slack message (Slack messages have practical size
 * limits, so this caps detail rows and points to email for the full list).
 * @param {Object} config
 * @param {Array<Object>} findings
 * @return {Object} Slack Incoming Webhook payload
 */
function buildSlackPayload(config, findings) {
  var MAX_DETAIL_LINES = 10;
  var counts = {};
  findings.forEach(function (f) { counts[f.type] = (counts[f.type] || 0) + 1; });

  var summaryLine = Object.keys(counts).map(function (type) {
    return (FINDING_TYPE_LABELS[type] || type) + ': *' + counts[type] + '*';
  }).join('  |  ');

  var detailLines = findings.slice(0, MAX_DETAIL_LINES).map(function (f) {
    var target = f.searchTerm || f.campaignName;
    return '• _' + (FINDING_TYPE_LABELS[f.type] || f.type) + '_ — ' + target + ' — ' + f.reason;
  });

  var text =
    '*Google Ads Guardrail — ' + config.clientName + '*\n' +
    (findings.length === 0
      ? 'No issues found in this run.'
      : summaryLine + '\n' + detailLines.join('\n') +
        (findings.length > MAX_DETAIL_LINES
          ? '\n_+' + (findings.length - MAX_DETAIL_LINES) + ' more — see email for full detail._'
          : ''));

  return { text: text };
}

/**
 * Posts the Slack payload to the configured Incoming Webhook, if any.
 * @param {Object} config
 * @param {Array<Object>} findings
 */
function sendSlackAlert(config, findings) {
  if (!isNonEmptyString(config.slackWebhookUrl)) return;
  if (findings.length === 0 && !config.alwaysSendSummary) return;

  try {
    UrlFetchApp.fetch(config.slackWebhookUrl, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(buildSlackPayload(config, findings)),
      muteHttpExceptions: true,
    });
  } catch (e) {
    Logger.log('Slack alert failed for ' + config.clientName + ' (is the webhook domain ' +
      'authorized under Scripts > Authorization?): ' + e);
  }
}

/**
 * Minimal HTML-escaping for values interpolated into the email table.
 * @param {*} value
 * @return {string}
 */
function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
