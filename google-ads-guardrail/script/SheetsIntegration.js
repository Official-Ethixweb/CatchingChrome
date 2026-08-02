/**
 * ============================================================================
 * SheetsIntegration.js
 * Optional per-client logging of every finding into a Google Sheet, for
 * clients/teams who want a persistent, filterable record outside of the
 * Google Ads Scripts log history (which Google eventually rotates out).
 * ============================================================================
 */

var SHEET_HEADERS = ['Date', 'Campaign', 'Search Term', 'Cost', 'Clicks', 'Conversions', 'Reason', 'Action Taken'];

/**
 * Opens the configured spreadsheet and returns the target sheet (tab),
 * creating it with a header row if it doesn't exist yet.
 * @param {Object} config
 * @return {?Sheet} null if sheetsIntegration is disabled or misconfigured
 */
function getOrCreateGuardrailSheet(config) {
  var settings = config.sheetsIntegration;
  if (!settings || !settings.enabled) return null;
  if (!isNonEmptyString(settings.spreadsheetUrl)) {
    Logger.log('Sheets integration is enabled for ' + config.clientName +
      ' but no spreadsheetUrl is configured — skipping.');
    return null;
  }

  var spreadsheet;
  try {
    spreadsheet = SpreadsheetApp.openByUrl(settings.spreadsheetUrl);
  } catch (e) {
    Logger.log('Could not open spreadsheet for ' + config.clientName + ': ' + e);
    return null;
  }

  var sheetName = settings.sheetName || 'Guardrail Log';
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    sheet.appendRow(SHEET_HEADERS);
    sheet.getRange(1, 1, 1, SHEET_HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

/**
 * Appends one row per finding to the client's configured sheet, matching
 * SHEET_HEADERS exactly. No-op if Sheets integration is disabled/unconfigured
 * or there are no findings to write.
 * @param {Object} config
 * @param {Array<Object>} findings
 */
function writeFindingsToSheet(config, findings) {
  if (findings.length === 0) return;
  var sheet = getOrCreateGuardrailSheet(config);
  if (!sheet) return;

  var startRow = sheet.getLastRow() + 1;
  var rows = findings.map(function (f) {
    return [
      formatTimestamp(f.timestamp),
      f.campaignName,
      f.searchTerm,
      f.cost !== null ? f.cost : '',
      f.clicks !== null ? f.clicks : '',
      f.conversions !== null ? f.conversions : '',
      f.reason,
      f.actionTaken,
    ];
  });

  // Search terms are literally whatever a member of the public typed into
  // Google search, and the Reason/Action Taken text can echo pieces of it.
  // Force the free-text columns (Campaign, Search Term, Reason, Action
  // Taken) to plain-text format BEFORE writing, so a value like
  // "=IMPORTXML(...)" or "+cmd|..." lands as inert text instead of being
  // evaluated as a spreadsheet formula (a known CSV/spreadsheet-injection
  // risk whenever untrusted strings get written into a sheet). Date, Cost,
  // Clicks, and Conversions are left as General/Number so they stay sortable
  // and summable.
  var freeTextColumns = [2, 3, 7, 8]; // Campaign, Search Term, Reason, Action Taken
  freeTextColumns.forEach(function (col) {
    sheet.getRange(startRow, col, rows.length, 1).setNumberFormat('@');
  });

  sheet.getRange(startRow, 1, rows.length, SHEET_HEADERS.length).setValues(rows);
}
