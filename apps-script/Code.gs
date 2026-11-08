// Google Apps Script — deploy as Web app (Execute as: Me, Who has access: Anyone).
// Set SECRET to the same value as APPS_SCRIPT_SECRET in your server .env.
var SECRET = 'CHANGE_ME';
var SHEET_NAME = 'Orders';
var HEADERS = ['Order ID', 'Timestamp', 'Name', 'Phone', 'Address', 'City', 'State', 'PIN code', 'Email', 'Products', 'Total (INR)', 'Payment method', 'Status'];

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    if (d.secret !== SECRET) return out({ ok: false, error: 'unauthorized' });

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

    sheet.appendRow([d.orderId, d.timestamp, d.name, d.phone, d.address, d.city, d.state, d.pincode, d.email, d.products, d.total, d.paymentMethod, d.status]);
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  }
}

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
