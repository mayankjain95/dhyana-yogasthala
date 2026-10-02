# Google Apps Script Email & Sheet Integration

This directory contains the Google Apps Script backend code that receives form submissions from **dhyanayogasthala.in**, saves the data to the Google Spreadsheet, and sends an immediate email notification to **`mayank.jain875@gmail.com`**.

---

## How to Deploy to Google Sheets

1. **Open your Google Sheet** for Dhyana Yogasthala.
2. In the top toolbar, click **Extensions** > **Apps Script**.
3. In the code editor (e.g. `Code.gs`), select all existing code, delete it, and paste the entire contents of [`google-apps-script.js`](./google-apps-script.js).
4. Click the **Save** icon (disk icon).
5. **(Optional Test)** Select `testSendEmail` from the function dropdown at the top and click **Run**.
   - If prompted with *"Authorization required"*, click **Review permissions** > Select your Google Account > Click **Advanced** > Click **Go to Untitled project (unsafe)** > Click **Allow**.
   - Check `mayank.jain875@gmail.com` for the test email.
6. **Deploy / Update the Web App**:
   - In the top right corner, click **Deploy** > **Manage deployments**.
   - Click the **pencil icon (Edit)** next to the active deployment.
   - Under **Version**, select **New version**.
   - Ensure **Execute as** is set to: **Me (your email)**.
   - Ensure **Who has access** is set to: **Anyone**.
   - Click **Deploy**.

---

## Features
- **Zero Third-Party Cost:** Uses Google Apps Script's built-in `MailApp.sendEmail()` with native Google authentication and 100% spam inbox deliverability.
- **Beautiful HTML Notification:** Formatted email with participant details, medical/health details, and one-tap **WhatsApp** & **Call** buttons.
- **Fail-Safe Execution:** Sheet logging and email notifications run independently in `try/catch` blocks so an email hiccup will never prevent data from being saved in the spreadsheet.
- **Automatic Column Headers:** Automatically generates header row if starting with a blank sheet.
