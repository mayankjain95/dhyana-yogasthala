const SHEET_NAME = 'Sthira Registrations';
const PAYMENT_SHEET_NAME = 'Sthira Payment Confirmations';
const REJECTED_SHEET_NAME = 'Sthira Rejected Submissions';
const SPREADSHEET_ID = '1KVbf2L-8rTS3OLrDIcvpQU5HgeA3oiXCH0nJG_Es-UU';
const FORM_KEY = 'sthira-2026';
const MAX_PAYLOAD_BYTES = 12000;

const HEADERS = [
  'Submitted At',
  'Source',
  'Payment Status',
  'Programme',
  'Name',
  'Age',
  'Gender',
  'Phone',
  'Email',
  'City',
  'CA Level',
  'Attempt Type',
  'Upcoming Exam',
  'Challenge',
  'Preferred Batch',
  'Preferred Days',
  'Duration Months',
  'Group Registration',
  'Group People',
  'Group Members',
  'Group Discount Percent',
  'Base Fee Per Person',
  'Final Fee Per Person',
  'Health',
  'Prior Yoga',
  'Notes'
];

const PAYMENT_HEADERS = [
  'Confirmed At',
  'Source',
  'Payment Status',
  'Programme',
  'Name',
  'Phone',
  'Email',
  'City',
  'CA Level',
  'Preferred Batch',
  'Preferred Days',
  'Duration Months',
  'Group People',
  'Final Fee Per Person',
  'Notes'
];

const REJECTED_HEADERS = [
  'Received At',
  'Error',
  'Submission Type',
  'Name',
  'Phone',
  'Email',
  'Payload Preview'
];

function doPost(e) {
  const rawBody = e && e.postData ? e.postData.contents || '' : '';
  if (rawBody.length > MAX_PAYLOAD_BYTES) {
    appendRejectedSubmission('Payload too large', {}, rawBody);
    return jsonResponse({ ok: false, error: 'Payload too large' });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody || '{}');
  } catch (err) {
    appendRejectedSubmission('Invalid JSON', {}, rawBody);
    return jsonResponse({ ok: false, error: 'Invalid JSON' });
  }
  const validationError = validatePayload(payload);
  if (validationError) {
    appendRejectedSubmission(validationError, payload, rawBody);
    return jsonResponse({ ok: false, error: validationError });
  }

  const lock = LockService.getScriptLock();

  lock.waitLock(10000);
  try {
    if (payload.submissionType === 'payment_confirmation') {
      appendPaymentConfirmation(payload);
    } else {
      appendRegistration(payload);
    }
  } finally {
    lock.releaseLock();
  }

  return jsonResponse({ ok: true });
}

function doGet() {
  return ContentService
    .createTextOutput('Sthira registration endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function appendRegistration(payload) {
  const sheet = getSheet(SHEET_NAME);
  ensureHeaders(sheet, HEADERS);
  sheet.appendRow([
    payload.submittedAt || new Date().toISOString(),
    payload.source || '',
    payload.paymentStatus || 'Pending verification',
    payload.programme || 'Sthira',
    payload.name || '',
    payload.age || '',
    payload.gender || '',
    payload.phone || '',
    payload.email || '',
    payload.city || '',
    payload.caLevel || '',
    payload.attemptType || '',
    payload.upcomingExam || '',
    payload.challenge || '',
    payload.preferredBatch || '',
    payload.preferredDays || '',
    payload.durationMonths || '',
    payload.groupRegistration || '',
    payload.groupPeople || '',
    formatGroupMembers(payload.groupMembers),
    payload.groupDiscountPercent || 0,
    payload.baseFeePerPerson || '',
    payload.finalFeePerPerson || '',
    payload.health || '',
    payload.priorYoga || '',
    payload.notes || ''
  ]);
}

function appendPaymentConfirmation(payload) {
  const sheet = getSheet(PAYMENT_SHEET_NAME);
  ensureHeaders(sheet, PAYMENT_HEADERS);
  sheet.appendRow([
    payload.confirmedAt || new Date().toISOString(),
    payload.source || '',
    payload.paymentStatus || 'User clicked I Have Paid',
    payload.programme || 'Sthira',
    payload.name || '',
    payload.phone || '',
    payload.email || '',
    payload.city || '',
    payload.caLevel || '',
    payload.preferredBatch || '',
    payload.preferredDays || '',
    payload.durationMonths || '',
    payload.groupPeople || '',
    payload.finalFeePerPerson || '',
    payload.notes || ''
  ]);
}

function appendRejectedSubmission(error, payload, rawBody) {
  const sheet = getSheet(REJECTED_SHEET_NAME);
  ensureHeaders(sheet, REJECTED_HEADERS);
  sheet.appendRow([
    new Date().toISOString(),
    error || '',
    payload.submissionType || '',
    payload.name || '',
    payload.phone || '',
    payload.email || '',
    String(rawBody || '').slice(0, 500)
  ]);
}

function getSheet(sheetName) {
  const spreadsheet = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
}

function ensureHeaders(sheet, headers) {
  const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const hasHeaders = firstRow.some(Boolean);
  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }
}

function formatGroupMembers(members) {
  if (!Array.isArray(members) || members.length === 0) return '';
  return members
    .map(function(member) {
      return 'Member ' + member.number + ': ' +
        (member.name || '-') + ' | ' +
        (member.email || '-') + ' | ' +
        (member.phone || '-');
    })
    .join('\n');
}

function validatePayload(payload) {
  if (payload.formKey !== FORM_KEY) return 'Invalid form key';
  if (payload.submissionType === 'payment_confirmation') return validatePaymentPayload(payload);
  return validateRegistrationPayload(payload);
}

function validateRegistrationPayload(payload) {
  if (!payload.name || String(payload.name).trim().length < 2) return 'Name is required';
  if (!payload.phone || String(payload.phone).trim().length < 8) return 'Phone is required';
  if (!payload.email || !String(payload.email).includes('@')) return 'Valid email is required';
  if (!payload.city || String(payload.city).trim().length < 2) return 'City is required';
  if (!payload.caLevel) return 'CA level is required';
  if (!payload.preferredBatch) return 'Preferred batch is required';
  if (!payload.preferredDays) return 'Preferred days are required';
  if (![1, 3].includes(Number(payload.durationMonths))) return 'Valid duration is required';
  if (String(payload.notes || '').length > 1500) return 'Notes are too long';
  if (String(payload.health || '').length > 1500) return 'Health details are too long';
  if (Array.isArray(payload.groupMembers) && payload.groupMembers.length > 4) return 'Too many group members';
  return '';
}

function validatePaymentPayload(payload) {
  if (!payload.name || String(payload.name).trim().length < 2) return 'Name is required';
  if (!payload.phone || String(payload.phone).trim().length < 8) return 'Phone is required';
  if (!payload.email || !String(payload.email).includes('@')) return 'Valid email is required';
  if (![1, 3].includes(Number(payload.durationMonths))) return 'Valid duration is required';
  if (!payload.finalFeePerPerson || Number(payload.finalFeePerPerson) < 1) return 'Payment amount is required';
  if (String(payload.notes || '').length > 1500) return 'Notes are too long';
  return '';
}

function jsonResponse(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
