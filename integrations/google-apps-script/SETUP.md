# Connect Axirova enquiries to Google Sheets and email

Notifications go to **axirova26@gmail.com**. This setup uses your Google account to store enquiries and send email; no Resend account is required.

## 1. Create the Google script

1. Open [Google Apps Script](https://script.google.com/home) and choose **New project**. Name it **Axirova Website Enquiries**.
2. Replace the contents of `Code.gs` with the supplied [Code.gs](./Code.gs), then save.
3. Select the `setup` function and click **Run**. Complete Google's authorization for the spreadsheet and email permissions.
4. The execution log contains the new Google Sheet link. Keep the Sheet private; website visitors do not need access to it.

`setup` generates the shared secret, sets the notification recipient, creates the enquiry sheet and headers, and saves its ID. Running it again reuses the same sheet. It does not send a test email.

To use an existing sheet instead, set `SPREADSHEET_ID` in **Project Settings → Script Properties** before running `setup`. The script creates an `Enquiries` tab without replacing existing tabs. To change the recipient, edit the `NOTIFY_EMAIL` property.

## 2. Publish the webhook

1. Choose **Deploy → New deployment → Web app**.
2. Set **Execute as: Me** and **Who has access: Anyone**. The sheet stays private; the shared secret protects submission handling.
3. Deploy and copy the web app URL ending in `/exec`, not a test URL ending in `/dev`.

After changing script code later, use **Deploy → Manage deployments → Edit → New version → Deploy**.

## 3. Connect Netlify

Open the `axirova-ai` site's environment settings and add these variables for **Production**, with **Functions** scope:

| Name | Value |
| --- | --- |
| `GOOGLE_APPS_SCRIPT_URL` | The Google web app `/exec` URL |
| `GOOGLE_APPS_SCRIPT_TOKEN` | The `WEBHOOK_TOKEN` value from Google Apps Script → Project Settings → Script Properties |

Copy the token directly between these two dashboards. Do not put it in frontend code, a GitHub file, a `VITE_` variable, or a chat message. Redeploy the Netlify site after setting the variables. If you send the `/exec` URL to the website maintainer, they can set that URL and deploy after you add the secret in Netlify.

## 4. Verify the connection

Submit one clearly labeled test enquiry on the live website. Confirm that a row appears in the `Enquiries` tab, its Email status is `SENT`, and the email reaches **axirova26@gmail.com**. No real notification has been sent during local automated tests.

The website shows success only when the script confirms both storage and email. If email fails after the row is stored, the row stays `PENDING`; retrying the same unchanged form submission reuses its ID rather than appending another row. A lost acknowledgement after an email is sent can still cause an occasional duplicate email. Google email quotas apply.

The form sends name, company, email/WhatsApp, selected service/product, budget selection, message, language, and consent. Sheet cells are protected against formula injection. Review the privacy notice and your retention policy for these details before collecting real enquiries.

## Script files

- `Code.gs`: paste this into the Apps Script editor.
- `appsscript.json`: optional explicit V8 / timezone / authorization manifest. Apps Script normally detects the scopes from `Code.gs`; if using this manifest, enable manifest visibility in Project Settings and replace its contents.

Official references: [Google web apps](https://developers.google.com/apps-script/guides/web), [Content Service](https://developers.google.com/apps-script/guides/content), [MailApp](https://developers.google.com/apps-script/reference/mail/mail-app).
