/*
  Google Apps Script — paste this into your Google Sheet's Apps Script editor.

  STEPS:
  1. Open your Google Sheet
  2. Go to Extensions → Apps Script
  3. Delete the default code → paste this entire file
  4. Click the floppy disk icon to save
  5. Click Deploy → New deployment
  6. Select type: "Web app"
  7. Set "Execute as" → Me
  8. Set "Who has access" → Anyone
  9. Click Deploy → Authorize when prompted → Copy the Web App URL
  10. Paste that URL into src/js/contact-form.js (replace YOUR_GOOGLE_APPS_SCRIPT_URL_HERE)

  That's it. Every form submission will add a row to your sheet.
*/

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    sheet.appendRow([
      new Date(),
      e.parameter.name || '',
      e.parameter.email || '',
      e.parameter.subject || '',
      e.parameter.message || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
