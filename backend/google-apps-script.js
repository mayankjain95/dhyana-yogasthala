/**
 * Dhyana Yogasthala — Google Apps Script Backend
 * Handles Google Sheets logging + Instant Email Notifications to mayank.jain875@gmail.com
 *
 * HOW TO INSTALL / UPDATE IN GOOGLE SHEETS:
 * 1. Open your Google Sheet for Dhyana Yogasthala
 * 2. In top menu, click: Extensions > Apps Script
 * 3. Replace all existing code in Code.gs with this entire file
 * 4. (Optional) Run "testSendEmail" from the function dropdown and click "Run" to test email delivery & grant permissions
 * 5. Click "Deploy" > "Manage deployments" > Edit (pencil icon) > Version: "New version" > Click "Deploy"
 *    (Ensure "Execute as": Me, "Who has access": Anyone)
 */

// Default admin recipient for all website notifications
const DEFAULT_ADMIN_EMAIL = 'mayank.jain875@gmail.com';

/**
 * Main Webhook Receiver: Handles all incoming POST requests from website forms
 */
function doPost(e) {
  try {
    let data = {};

    // 1. Parse incoming payload (supports JSON text/plain and form-urlencoded)
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Fallback timestamp if not provided
    if (!data.date && !data.submittedAt) {
      data.date = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd/MM/yyyy, hh:mm:ss a');
    }

    // 2. Append row to Google Sheet
    try {
      appendDataToSheet(data);
    } catch (sheetErr) {
      console.error('Error logging to sheet: ' + sheetErr.toString());
    }

    // 3. Send Email Notification
    try {
      sendAdminNotificationEmail(data);
    } catch (emailErr) {
      console.error('Error sending email notification: ' + emailErr.toString());
    }

    // 4. Return JSON response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data recorded and email notification sent successfully.'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('Fatal doPost error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Appends the submitted data row to the spreadsheet.
 */
function appendDataToSheet(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getActiveSheet();

  // If sheet is empty, write standard headers
  if (sheet.getLastRow() === 0) {
    const defaultHeaders = [
      'Timestamp',
      'Programme / Purpose',
      'Name',
      'Phone',
      'Email',
      'City / Location',
      'Date / Slot',
      'Attendance Mode',
      'Payment Status / Fee',
      'Health / Ailments',
      'Prior Yoga Experience',
      'Notes / Query',
      'Form Source',
      'Submission Type'
    ];
    sheet.appendRow(defaultHeaders);
    sheet.getRange(1, 1, 1, defaultHeaders.length).setFontWeight('bold').setBackground('#2B3A27').setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
  }

  // Normalize fields across all website forms
  const timestamp = data.date || data.submittedAt || Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd/MM/yyyy, hh:mm:ss a');
  const programme = data.programme || data.program || data.formName || 'General Enquiry';
  const name = data.name || data.fullName || '—';
  const phone = data.phone || data.mobile || data.fullPhone || '—';
  const email = data.email || '—';
  const city = data.city || data.location || '—';
  const slot = data.dateSlot || data.preferredDate || data.preferredBatch || '—';
  const mode = data.attendanceMode || data.mode || data.preferredDays || '—';
  const payment = data.paymentStatus || (data.finalFeePerPerson ? ('₹' + data.finalFeePerPerson) : (data.isFree ? 'Free Trial' : '—'));
  const health = data.health || data.ailments || data.injury || '—';
  const experience = data.experience || data.practicedBefore || data.priorYoga || '—';
  const notes = data.notes || data.query || data.rawNotes || data.challenge || '—';
  const source = data.source || data.pageUrl || 'Website';
  const submissionType = data.submissionType || 'registration';

  const row = [
    timestamp,
    programme,
    name,
    phone,
    email,
    city,
    slot,
    mode,
    payment,
    health,
    experience,
    notes,
    source,
    submissionType
  ];

  sheet.appendRow(row);
}

/**
 * Sends a beautifully formatted HTML notification email
 */
function sendAdminNotificationEmail(data) {
  const recipient = data.notifyEmail || DEFAULT_ADMIN_EMAIL;
  const programme = data.programme || data.program || data.formName || 'Website Form';
  const name = data.name || data.fullName || 'New Participant';
  const phone = data.phone || data.mobile || data.fullPhone || '—';
  const email = data.email || '—';
  const city = data.city || data.location || '—';
  const slot = data.dateSlot || data.preferredDate || data.preferredBatch || '';
  const mode = data.attendanceMode || data.mode || data.preferredDays || '';
  const notes = data.notes || data.query || data.rawNotes || '';
  const health = data.health || data.ailments || '';
  const experience = data.experience || data.practicedBefore || data.priorYoga || '';
  const payment = data.paymentStatus || (data.finalFeePerPerson ? ('₹' + data.finalFeePerPerson) : '');
  const source = data.source || 'dhyanayogasthala.in';
  const time = data.date || Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd MMM yyyy, hh:mm a (IST)');

  // Determine Subject
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

  // Clean phone number for WhatsApp link
  const rawDigits = phone.toString().replace(/\D/g, '');
  const waNumber = rawDigits.length === 10 ? ('91' + rawDigits) : rawDigits;
  const waLink = rawDigits ? `https://wa.me/${waNumber}` : '';

  // Plain-text fallback
  const plainTextBody = `
New form submission on Dhyana Yogasthala:

• Programme: ${programme}
• Name: ${name}
• Phone: ${phone}
• Email: ${email}
• Location: ${city}
${slot ? `• Date / Batch: ${slot}\n` : ''}${mode ? `• Mode / Days: ${mode}\n` : ''}${payment ? `• Payment Status: ${payment}\n` : ''}${experience ? `• Prior Experience: ${experience}\n` : ''}${health ? `• Health / Medical: ${health}\n` : ''}${notes ? `• Notes / Message:\n${notes}\n` : ''}
• Submitted at: ${time}
• Source: ${source}

Quick Actions:
${waLink ? `WhatsApp: ${waLink}\n` : ''}${phone !== '—' ? `Call: tel:${phone}\n` : ''}
  `.trim();

  // Rich HTML Email Template
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F7F5F0; margin: 0; padding: 24px; color: #2C2C2C; }
    .card { max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #E6E1D8; }
    .header { background: linear-gradient(135deg, #2B3A27 0%, #3D5337 100%); color: #FDFBF7; padding: 24px 28px; text-align: left; }
    .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 600; letter-spacing: -0.2px; }
    .header p { margin: 0; font-size: 13px; color: #D5C8A8; }
    .badge { display: inline-block; background: #D5C8A8; color: #243120; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; padding: 4px 10px; border-radius: 20px; margin-top: 10px; }
    .content { padding: 28px; }
    .grid { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .grid tr { border-bottom: 1px solid #F0ECE4; }
    .grid td { padding: 10px 6px; font-size: 14px; vertical-align: top; }
    .label { font-weight: 600; color: #726E65; width: 34%; }
    .value { font-weight: 500; color: #1D1D1D; }
    .highlight-val { color: #2B3A27; font-weight: 700; font-size: 15px; }
    .notes-box { background: #F8F6F1; border-left: 3px solid #8C7B58; padding: 12px 14px; margin-top: 12px; border-radius: 4px; font-size: 13px; line-height: 1.5; color: #3C3B37; white-space: pre-line; }
    .cta-container { margin-top: 24px; padding-top: 20px; border-top: 1px solid #EFECE6; text-align: center; }
    .btn-wa { display: inline-block; background: #25D366; color: #FFFFFF !important; font-weight: 600; font-size: 14px; text-decoration: none; padding: 11px 22px; border-radius: 6px; margin: 4px 6px; }
    .btn-call { display: inline-block; background: #2B3A27; color: #FFFFFF !important; font-weight: 600; font-size: 14px; text-decoration: none; padding: 11px 22px; border-radius: 6px; margin: 4px 6px; }
    .footer { background: #F8F6F1; padding: 14px 28px; font-size: 12px; color: #8F8B82; text-align: center; border-top: 1px solid #EBE7DF; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>🌿 Dhyana Yogasthala Notification</h1>
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
            ${waLink ? ` &nbsp;•&nbsp; <a href="${waLink}" target="_blank" style="color: #128C7E; font-size: 13px; text-decoration: none; font-weight: 600;">Open WhatsApp 💬</a>` : ''}
          </td>
        </tr>
        <tr>
          <td class="label">Email</td>
          <td class="value"><a href="mailto:${email}" style="color: #2B3A27; text-decoration: underline;">${email}</a></td>
        </tr>
        ${city !== '—' ? `<tr><td class="label">Location / City</td><td class="value">${city}</td></tr>` : ''}
        ${slot ? `<tr><td class="label">Selected Slot / Date</td><td class="value"><strong>${slot}</strong></td></tr>` : ''}
        ${mode ? `<tr><td class="label">Mode / Preferred Days</td><td class="value">${mode}</td></tr>` : ''}
        ${payment ? `<tr><td class="label">Payment / Fee</td><td class="value" style="color: #2D6A4F; font-weight: 700;">${payment}</td></tr>` : ''}
        ${experience ? `<tr><td class="label">Prior Yoga Practice</td><td class="value">${experience}</td></tr>` : ''}
        ${health ? `<tr><td class="label">Health / Conditions</td><td class="value" style="color: #9C4221;">${health}</td></tr>` : ''}
        <tr>
          <td class="label">Source Form</td>
          <td class="value" style="font-size: 12px; color: #726E65;">${source}</td>
        </tr>
      </table>

      ${notes ? `
        <div style="margin-top: 14px;">
          <div style="font-size: 13px; font-weight: 600; color: #555;">Participant Notes / Inquiry:</div>
          <div class="notes-box">${notes}</div>
        </div>
      ` : ''}

      <div class="cta-container">
        ${waLink ? `<a href="${waLink}" class="btn-wa" target="_blank">Chat on WhatsApp →</a>` : ''}
        ${phone !== '—' ? `<a href="tel:${phone}" class="btn-call">Call Participant 📞</a>` : ''}
      </div>
    </div>

    <div class="footer">
      This notification was automatically sent by Dhyana Yogasthala website via Google Apps Script.<br>
      Logged automatically to your Google Spreadsheet.
    </div>
  </div>
</body>
</html>
  `.trim();

  // Send the email via Google MailApp
  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    body: plainTextBody,
    htmlBody: htmlBody,
    name: 'Dhyana Yogasthala Website'
  });
}

/**
 * TEST FUNCTION: Run this in Google Apps Script editor to verify email sending & permissions!
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
  Logger.log('Test email successfully sent to ' + DEFAULT_ADMIN_EMAIL);
}
