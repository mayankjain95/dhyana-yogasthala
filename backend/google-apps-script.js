/**
 * Dhyana Yogasthala — Google Apps Script Backend (Production)
 * Multi-Sheet Routing + Validations + Automated Email Notifications to mayank.jain875@gmail.com
 *
 * HOW TO UPDATE IN GOOGLE SHEETS:
 * 1. Open your Google Sheet (Extensions > Apps Script).
 * 2. Replace all existing code in Code.gs with this entire file.
 * 3. (Optional) Run "testSendEmail" from the function dropdown and click "Run" to grant email permissions & test.
 * 4. Click "Deploy" > "Manage deployments" > Edit (pencil icon) > Version: "New version" > Click "Deploy".
 */

const SHEET_NAME = 'Sthira Registrations';
const PAYMENT_SHEET_NAME = 'Sthira Payment Confirmations';
const REJECTED_SHEET_NAME = 'Sthira Rejected Submissions';
const WORKSHOP_SHEET_NAME = 'Workshop Registrations';
const WORKSHOP_PAYMENT_SHEET_NAME = 'Workshop Payment Confirmations';
const SPREADSHEET_ID = '1KVbf2L-8rTS3OLrDIcvpQU5HgeA3oiXCH0nJG_Es-UU';
const FORM_KEY = 'sthira-2026';
const WORKSHOP_KEYS = [
  'maitreyi-2026',
  'angamardana-2026',
  'surya-kriya-2026',
  'yogasanas-2026',
  'bhuta-shuddhi-2026',
  'shanmukhi-mudra-2026',
  'eye-care-practices-2026',
  'bhastrika-kriya-2026',
  'jala-neti-2026',
  'pre-natal-yoga-2026',
  'childrens-yoga-workshop-2026',
  'spiritual-retreat-2026'
];
const ENQUIRY_FORM_KEY = 'enquiry-classical-hatha-2026';
const ENQUIRY_SHEET_NAME = 'Programme Registrations & Enquiries';

const TRIAL_FORM_KEY = 'info-trial-registration-2026';
const TRIAL_SHEET_NAME = 'Free Trial Registrations';

// Admin notification email recipient
const ADMIN_NOTIFICATION_EMAIL = 'mayank.jain875@gmail.com';

const TRIAL_HEADERS = [
  'Submitted At',
  'Source',
  'Programme',
  'Date / Slot',
  'Attendance Mode',
  'Name',
  'Age',
  'Gender',
  'Phone',
  'Email',
  'Goal / Aspiration',
  'Prior Experience',
  'Health / Ailments',
  'Notes',
  'Date (IST)'
];

const ENQUIRY_HEADERS = [
  'Submitted At',
  'Source',
  'Referral Code',
  'Referrer',
  'Programme',
  'Fee',
  'Amount',
  'Name',
  'Phone',
  'Duration',
  'Session Hours',
  'Notes',
  'Date (IST)'
];

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

const MAITREYI_HEADERS = [
  'Submitted At',
  'Source',
  'Programme',
  'Name',
  'Age',
  'Gender',
  'Phone',
  'Email',
  'City',
  'Goal',
  'Health Goal / Specific Concerns',
  'Preferred Timing',
  'Prior Yoga Experience',
  'Days Per Week',
  'Diet / Medication',
  'Current Health Conditions',
  'Illness / Injury (Last 3 Yrs)',
  'Notes'
];

const MAITREYI_PAYMENT_HEADERS = [
  'Confirmed At',
  'Source',
  'Payment Status',
  'Programme',
  'Name',
  'Phone',
  'Email',
  'City',
  'Goal',
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
    if (payload.formKey === ENQUIRY_FORM_KEY) {
      appendEnquiryRegistration(payload);
    } else if (payload.formKey === TRIAL_FORM_KEY) {
      appendTrialRegistration(payload);
    } else if (WORKSHOP_KEYS.includes(payload.formKey) && payload.submissionType === 'payment_confirmation') {
      appendMaitreyiPayment(payload);
    } else if (WORKSHOP_KEYS.includes(payload.formKey)) {
      appendMaitreyiRegistration(payload);
    } else if (payload.submissionType === 'payment_confirmation') {
      appendPaymentConfirmation(payload);
    } else {
      appendRegistration(payload);
    }
  } finally {
    lock.releaseLock();
  }

  // ── Trigger Instant Email Notification to Admin ─────────────────────────────
  try {
    sendAdminNotificationEmail(payload);
  } catch (emailErr) {
    console.error('Email notification notice:', emailErr.toString());
  }

  return jsonResponse({ ok: true });
}

function doGet() {
  return ContentService
    .createTextOutput('Dhyana Yogasthala registration endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function formatPhoneNumber(phone) {
  if (!phone) return '';
  var digits = String(phone).replace(/\D/g, '');
  if (digits.length >= 10) {
    var last10 = digits.slice(-10);
    // Leading apostrophe forces Google Sheets to treat +91 ... as text rather than a formula
    return "'" + '+91 ' + last10;
  }
  var str = String(phone).trim();
  if (str.charAt(0) === '+' || str.charAt(0) === '=') {
    return "'" + str;
  }
  return str;
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
    formatPhoneNumber(payload.phone),
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

function appendTrialRegistration(payload) {
  const sheet = getSheet(TRIAL_SHEET_NAME);
  ensureHeaders(sheet, TRIAL_HEADERS);
  sheet.appendRow([
    payload.submittedAt || new Date().toISOString(),
    payload.source || 'Info Page (/info) — Free Trial Participant Form',
    payload.programme || 'Free Classical Hatha Yoga Trial Class',
    payload.dateSlot || payload.preferredDate || '',
    payload.attendanceMode || payload.mode || '',
    payload.name || payload.fullName || '',
    payload.age || '',
    payload.gender || '',
    formatPhoneNumber(payload.phone || payload.mobile || payload.fullPhone),
    payload.email || '',
    payload.goal || '',
    payload.experience || payload.practicedBefore || '',
    payload.health || payload.ailments || '',
    payload.notes || payload.rawNotes || '',
    payload.date || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  ]);
}

function appendMaitreyiRegistration(payload) {
  const sheet = getSheet(WORKSHOP_SHEET_NAME);
  ensureHeaders(sheet, MAITREYI_HEADERS);
  sheet.appendRow([
    payload.submittedAt || new Date().toISOString(),
    payload.source || 'Maitreyi registration page',
    payload.programme || 'Maitreyi',
    payload.name || '',
    payload.age || '',
    payload.gender || '',
    formatPhoneNumber(payload.phone),
    payload.email || '',
    payload.city || '',
    payload.goal || '',
    payload.healthGoal || '',
    payload.timing || '',
    payload.experience || '',
    payload.days || '',
    payload.diet || '',
    payload.health || '',
    payload.injury || '',
    payload.notes || ''
  ]);
}

function appendMaitreyiPayment(payload) {
  const sheet = getSheet(WORKSHOP_PAYMENT_SHEET_NAME);
  ensureHeaders(sheet, MAITREYI_PAYMENT_HEADERS);
  sheet.appendRow([
    payload.confirmedAt || new Date().toISOString(),
    payload.source || 'Maitreyi payment confirmation',
    payload.paymentStatus || 'User clicked I Have Paid',
    payload.programme || 'Maitreyi',
    payload.name || '',
    formatPhoneNumber(payload.phone),
    payload.email || '',
    payload.city || '',
    payload.goal || '',
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
    formatPhoneNumber(payload.phone),
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

function appendEnquiryRegistration(payload) {
  const sheet = getSheet(ENQUIRY_SHEET_NAME);
  ensureHeaders(sheet, ENQUIRY_HEADERS);
  sheet.appendRow([
    payload.submittedAt || new Date().toISOString(),
    payload.source || 'enquiry.html',
    payload.referralCode || 'DIRECT',
    payload.referrerName || payload.referrer || 'Direct',
    payload.programme || '',
    payload.fee || '',
    payload.amount || '',
    payload.name || '',
    formatPhoneNumber(payload.phone),
    payload.duration || '',
    payload.hours || '',
    payload.notes || '',
    payload.date || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  ]);
}

function appendRejectedSubmission(error, payload, rawBody) {
  const sheet = getSheet(REJECTED_SHEET_NAME);
  ensureHeaders(sheet, REJECTED_HEADERS);
  const p = payload || {};
  sheet.appendRow([
    new Date().toISOString(),
    error || '',
    p.submissionType || '',
    p.name || p.fullName || '',
    formatPhoneNumber(p.phone || p.mobile || p.fullPhone),
    p.email || '',
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
  // Route to correct validator by form key
  if (payload.formKey === ENQUIRY_FORM_KEY) return validateEnquiryPayload(payload);
  if (payload.formKey === TRIAL_FORM_KEY) return validateTrialPayload(payload);
  if (WORKSHOP_KEYS.includes(payload.formKey)) return validateMaitreyiPayload(payload);
  if (payload.formKey !== FORM_KEY) return 'Invalid form key';
  if (payload.submissionType === 'payment_confirmation') return validatePaymentPayload(payload);
  return validateRegistrationPayload(payload);
}

function validateTrialPayload(payload) {
  var name = payload.name || payload.fullName;
  if (!name || String(name).trim().length < 2) return 'Name is required';
  var phone = payload.phone || payload.mobile || payload.fullPhone;
  if (!phone || String(phone).replace(/\D/g, '').length < 10) return 'Valid 10-digit phone is required';
  if (!payload.email || !String(payload.email).includes('@')) return 'Valid email is required';
  if (String(payload.notes || '').length > 3000) return 'Notes are too long';
  if (String(payload.health || payload.ailments || '').length > 2000) return 'Health details are too long';
  return '';
}

function validateEnquiryPayload(payload) {
  if (!payload.name || String(payload.name).trim().length < 2) return 'Name is required';
  if (!payload.phone || String(payload.phone).replace(/\D/g, '').length < 10) return 'Valid 10-digit phone is required';
  if (!payload.programme || String(payload.programme).trim().length < 2) return 'Programme is required';
  if (String(payload.notes || '').length > 2000) return 'Notes are too long';
  return '';
}

function validateMaitreyiPayload(payload) {
  if (!payload.name || String(payload.name).trim().length < 2) return 'Name is required';
  if (!payload.phone || String(payload.phone).replace(/\D/g,'').length < 8) return 'Phone is required';
  if (!payload.email || !String(payload.email).includes('@')) return 'Valid email is required';
  if (!payload.city || String(payload.city).trim().length < 2) return 'City is required';
  if (String(payload.notes || '').length > 2000) return 'Notes are too long';
  if (String(payload.health || '').length > 2000) return 'Health details are too long';
  return '';
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

// ─────────────────────────────────────────────────────────────────────────────
// EMAIL NOTIFICATION SYSTEM (Sends to mayank.jain875@gmail.com)
// ─────────────────────────────────────────────────────────────────────────────

function sendAdminNotificationEmail(data) {
  const recipient = data.notifyEmail || ADMIN_NOTIFICATION_EMAIL;
  const programme = data.programme || data.program || 'Website Submission';
  const name = data.name || data.fullName || 'New Participant';
  const phone = data.phone || data.mobile || data.fullPhone || '—';
  const email = data.email || '—';
  const city = data.city || data.location || '';
  const slot = data.dateSlot || data.preferredDate || data.preferredBatch || '';
  const mode = data.attendanceMode || data.mode || data.preferredDays || '';
  const notes = data.notes || data.query || data.rawNotes || data.challenge || '';
  const health = data.health || data.ailments || data.injury || '';
  const experience = data.experience || data.practicedBefore || data.priorYoga || '';
  const payment = data.paymentStatus || (data.finalFeePerPerson ? ('₹' + data.finalFeePerPerson) : (data.amount ? ('₹' + data.amount) : ''));
  const source = data.source || 'dhyanayogasthala.in';
  const time = data.date || Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd MMM yyyy, hh:mm a (IST)');

  // Determine Email Subject
  let subject = data.emailSubject;
  if (!subject) {
    if (data.submissionType === 'payment_confirmation') {
      subject = `💳 Payment Confirmation: ${name} — ${programme}`;
    } else if (data.submissionType === 'enquiry') {
      subject = `💬 New Enquiry: ${name} — ${programme}`;
    } else {
      subject = `🌿 New Registration: ${name} — ${programme}`;
    }
  }

  // Format clean phone for WhatsApp 1-tap link
  const rawDigits = String(phone).replace(/\D/g, '');
  const waNumber = rawDigits.length === 10 ? ('91' + rawDigits) : rawDigits;
  const waLink = rawDigits ? ('https://wa.me/' + waNumber) : '';

  // Plain-text fallback
  const plainTextBody = [
    'New submission recorded in Google Sheets on Dhyana Yogasthala:',
    '',
    '• Programme: ' + programme,
    '• Name: ' + name,
    '• Phone: ' + phone,
    '• Email: ' + email,
    city ? ('• Location: ' + city) : '',
    slot ? ('• Date / Slot: ' + slot) : '',
    mode ? ('• Mode / Days: ' + mode) : '',
    payment ? ('• Payment / Fee: ' + payment) : '',
    experience ? ('• Prior Yoga: ' + experience) : '',
    health ? ('• Health / Medical: ' + health) : '',
    notes ? ('• Notes / Message:\n' + notes) : '',
    '',
    '• Submitted At: ' + time,
    '• Source: ' + source,
    '',
    waLink ? ('WhatsApp Quick Link: ' + waLink) : ''
  ].filter(Boolean).join('\n');

  // Rich HTML Email Card
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F7F5F0; margin: 0; padding: 20px; color: #2C2C2C; }
    .card { max-width: 580px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #E6E1D8; }
    .header { background: linear-gradient(135deg, #2B3A27 0%, #3D5337 100%); color: #FDFBF7; padding: 22px 24px; text-align: left; }
    .header h1 { margin: 0 0 4px 0; font-size: 19px; font-weight: 600; letter-spacing: -0.2px; }
    .header p { margin: 0; font-size: 12px; color: #D5C8A8; }
    .badge { display: inline-block; background: #D5C8A8; color: #243120; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; padding: 4px 10px; border-radius: 20px; margin-top: 10px; }
    .content { padding: 24px; }
    .grid { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .grid tr { border-bottom: 1px solid #F0ECE4; }
    .grid td { padding: 9px 4px; font-size: 14px; vertical-align: top; }
    .label { font-weight: 600; color: #726E65; width: 34%; }
    .value { font-weight: 500; color: #1D1D1D; }
    .highlight-val { color: #2B3A27; font-weight: 700; font-size: 15px; }
    .notes-box { background: #F8F6F1; border-left: 3px solid #8C7B58; padding: 12px 14px; margin-top: 10px; border-radius: 4px; font-size: 13px; line-height: 1.5; color: #3C3B37; white-space: pre-line; }
    .cta-container { margin-top: 22px; padding-top: 18px; border-top: 1px solid #EFECE6; text-align: center; }
    .btn-wa { display: inline-block; background: #25D366; color: #FFFFFF !important; font-weight: 600; font-size: 13px; text-decoration: none; padding: 10px 20px; border-radius: 6px; margin: 4px; }
    .btn-call { display: inline-block; background: #2B3A27; color: #FFFFFF !important; font-weight: 600; font-size: 13px; text-decoration: none; padding: 10px 20px; border-radius: 6px; margin: 4px; }
    .footer { background: #F8F6F1; padding: 12px 24px; font-size: 11px; color: #8F8B82; text-align: center; border-top: 1px solid #EBE7DF; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>🌿 Dhyana Yogasthala Submission</h1>
      <p>${time}</p>
      <span class="badge">${programme}</span>
    </div>

    <div class="content">
      <table class="grid">
        <tr>
          <td class="label">Participant Name</td>
          <td class="value highlight-val">${name}</td>
        </tr>
        <tr>
          <td class="label">Phone / WhatsApp</td>
          <td class="value">
            <a href="tel:${phone}" style="color: #2B3A27; font-weight: 600; text-decoration: underline;">${phone}</a>
            ${waLink ? ` &nbsp;•&nbsp; <a href="${waLink}" target="_blank" style="color: #128C7E; font-size: 12px; text-decoration: none; font-weight: 600;">Open WhatsApp 💬</a>` : ''}
          </td>
        </tr>
        <tr>
          <td class="label">Email</td>
          <td class="value"><a href="mailto:${email}" style="color: #2B3A27; text-decoration: underline;">${email}</a></td>
        </tr>
        ${city ? `<tr><td class="label">Location</td><td class="value">${city}</td></tr>` : ''}
        ${slot ? `<tr><td class="label">Slot / Date</td><td class="value"><strong>${slot}</strong></td></tr>` : ''}
        ${mode ? `<tr><td class="label">Mode / Days</td><td class="value">${mode}</td></tr>` : ''}
        ${payment ? `<tr><td class="label">Payment / Fee</td><td class="value" style="color: #2D6A4F; font-weight: 700;">${payment}</td></tr>` : ''}
        ${experience ? `<tr><td class="label">Prior Yoga</td><td class="value">${experience}</td></tr>` : ''}
        ${health ? `<tr><td class="label">Health / Medical</td><td class="value" style="color: #9C4221;">${health}</td></tr>` : ''}
        <tr>
          <td class="label">Source Form</td>
          <td class="value" style="font-size: 12px; color: #726E65;">${source}</td>
        </tr>
      </table>

      ${notes ? `
        <div style="margin-top: 12px;">
          <div style="font-size: 12px; font-weight: 600; color: #666;">Participant Notes / Query:</div>
          <div class="notes-box">${notes}</div>
        </div>
      ` : ''}

      <div class="cta-container">
        ${waLink ? `<a href="${waLink}" class="btn-wa" target="_blank">Chat on WhatsApp →</a>` : ''}
        ${phone !== '—' ? `<a href="tel:${phone}" class="btn-call">Call Participant 📞</a>` : ''}
      </div>
    </div>

    <div class="footer">
      Recorded in Google Sheet (Spreadsheet ID: ${SPREADSHEET_ID.slice(0, 8)}...)<br>
      Automated real-time notification by Google Apps Script.
    </div>
  </div>
</body>
</html>
  `.trim();

  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    body: plainTextBody,
    htmlBody: htmlBody,
    name: 'Dhyana Yogasthala Website'
  });
}

/**
 * TEST FUNCTION: Run this in Apps Script editor to test email delivery & authorize permissions!
 */
function testSendEmail() {
  const testData = {
    programme: 'Classical Hatha Yoga (Test)',
    name: 'Mayank Jain (Test Submission)',
    phone: '+91 98765 43210',
    email: 'mayank.jain875@gmail.com',
    city: 'Sonipat / Delhi NCR',
    dateSlot: 'Every Saturday & Sunday, 7:00 AM',
    paymentStatus: 'Test Verified',
    notes: 'This is a test notification to ensure Google Apps Script sends emails properly upon form submission.',
    source: 'Apps Script Manual Test'
  };

  sendAdminNotificationEmail(testData);
  Logger.log('Test email successfully sent to ' + ADMIN_NOTIFICATION_EMAIL);
}
