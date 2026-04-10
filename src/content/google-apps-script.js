/*
  Google Apps Script — paste this into your Google Sheet's Apps Script editor.

  STEPS TO UPDATE (if you already deployed once):
  1. Open your Google Sheet
  2. Extensions → Apps Script
  3. Replace the existing code with this entire file
  4. Save (Ctrl+S)
  5. Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy
  6. No need to change the URL — the existing deployment keeps the same endpoint

  SPAM PROTECTION — this script enforces:
    1. Honeypot check — rejects submissions where the "website" field is filled
    2. Min-time check — rejects submissions faster than 2 seconds after page load
    3. Max-time check — rejects submissions older than 2 hours (stale forms)
    4. Rate limit — max 30 submissions per hour across all users (global limit)
    5. Field length validation — rejects empty or unreasonably long messages
    6. Silent rejection — returns "success" for rejections so bots can't tell they were blocked
*/

var MIN_TIME_MS = 2000;          // 2 seconds minimum time on page
var MAX_TIME_MS = 2 * 60 * 60 * 1000; // 2 hours maximum (stale forms)
var RATE_LIMIT_PER_HOUR = 30;    // global max submissions per hour
var MIN_MESSAGE_LEN = 10;
var MAX_MESSAGE_LEN = 5000;
var MAX_NAME_LEN = 150;
var MAX_EMAIL_LEN = 150;
var MAX_SUBJECT_LEN = 150;

function doPost(e) {
  try {
    var p = e.parameter || {};

    // 1. Honeypot — bots fill this invisible field
    if (p.website && String(p.website).trim()) {
      return json({ status: 'success' }); // silent reject
    }

    // 2. Timestamp checks
    var now = Date.now();
    var ts = Number(p._ts) || 0;
    if (ts > 0) {
      var elapsed = now - ts;
      if (elapsed < MIN_TIME_MS || elapsed > MAX_TIME_MS) {
        return json({ status: 'success' }); // silent reject
      }
    }

    // 3. Field length validation — reject (not truncate) anything over limit
    var name = String(p.name || '').trim();
    var email = String(p.email || '').trim();
    var subject = String(p.subject || '').trim();
    var message = String(p.message || '').trim();

    if (!name || name.length > MAX_NAME_LEN || /\d/.test(name)) {
      return json({ status: 'success' }); // silent reject
    }
    if (!email || email.length > MAX_EMAIL_LEN) {
      return json({ status: 'success' }); // silent reject
    }
    if (!subject || subject.length > MAX_SUBJECT_LEN) {
      return json({ status: 'success' }); // silent reject
    }
    if (message.length < MIN_MESSAGE_LEN || message.length > MAX_MESSAGE_LEN) {
      return json({ status: 'success' }); // silent reject
    }

    // Basic email format check
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ status: 'success' }); // silent reject
    }

    // 4. Rate limit — track submissions per hour using ScriptProperties
    var props = PropertiesService.getScriptProperties();
    var hourBucket = 'submits_' + Math.floor(now / 3600000);
    var count = Number(props.getProperty(hourBucket)) || 0;
    if (count >= RATE_LIMIT_PER_HOUR) {
      return json({ status: 'success' }); // silent reject
    }
    props.setProperty(hourBucket, String(count + 1));

    // Clean up old buckets (keep last 3 hours worth to avoid property bloat)
    var allProps = props.getProperties();
    var currentHour = Math.floor(now / 3600000);
    Object.keys(allProps).forEach(function(key) {
      if (key.indexOf('submits_') === 0) {
        var keyHour = Number(key.replace('submits_', ''));
        if (currentHour - keyHour > 3) {
          props.deleteProperty(key);
        }
      }
    });

    // All checks passed — append to sheet
    // Columns: Date Received | Time | Name | Email | Subject | Message
    //
    // IMPORTANT: Column A stores a date-only value (midnight) so that
    // "Group by Date Received" collapses all same-day rows into one group.
    // Column B stores the full timestamp (only the time portion is shown
    // via number format). Both are real Date values — filters, sort, and
    // charts still work natively.
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Date Received', 'Time', 'Name', 'Email', 'Subject', 'Message']);
      sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    var stamp = new Date();
    var dateOnly = new Date(stamp.getFullYear(), stamp.getMonth(), stamp.getDate());
    sheet.appendRow([dateOnly, stamp, name, email, subject, message]);

    // Re-apply formats on the new row (safe even if already set)
    var newRow = sheet.getLastRow();
    sheet.getRange(newRow, 1).setNumberFormat('dd-mmm-yyyy');  // 10-Apr-2026
    sheet.getRange(newRow, 2).setNumberFormat('h:mm AM/PM');   // 12:34 PM

    return json({ status: 'success' });

  } catch (error) {
    return json({ status: 'error', message: error.toString() });
  }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
