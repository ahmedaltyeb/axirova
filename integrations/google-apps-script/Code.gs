/* Paste into a standalone Google Apps Script project. See SETUP.md. */
const LEAD_HEADERS = ['Submission ID', 'Received at', 'Type', 'Language', 'Name', 'Company', 'Email', 'WhatsApp', 'Service', 'Budget', 'Message', 'Consent', 'Email status'];

function setup() {
  const properties = PropertiesService.getScriptProperties();
  if (!properties.getProperty('WEBHOOK_TOKEN')) properties.setProperty('WEBHOOK_TOKEN', Utilities.getUuid() + Utilities.getUuid());
  if (!properties.getProperty('NOTIFY_EMAIL')) properties.setProperty('NOTIFY_EMAIL', 'axirova26@gmail.com');
  const email = properties.getProperty('NOTIFY_EMAIL');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Set NOTIFY_EMAIL in Script Properties first.');
  let id = properties.getProperty('SPREADSHEET_ID');
  if (!id) {
    const book = SpreadsheetApp.create('Axirova Website Enquiries');
    id = book.getId();
    properties.setProperty('SPREADSHEET_ID', id);
  }
  const book = SpreadsheetApp.openById(id);
  let sheet = book.getSheetByName('Enquiries');
  if (!sheet) sheet = book.insertSheet('Enquiries');
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(LEAD_HEADERS);
    sheet.getRange(1, 1, 1, LEAD_HEADERS.length).setBackground('#0d1c30').setFontColor('#ffffff').setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.setColumnWidths(1, LEAD_HEADERS.length, 160);
    sheet.setColumnWidth(11, 420);
    sheet.getRange('K:K').setWrap(true);
  }
  if (MailApp.getRemainingDailyQuota() < 1) throw new Error('Email quota is unavailable.');
  console.log(book.getUrl());
  console.log('WEBHOOK_TOKEN is stored in Project Settings > Script Properties. Copy it directly into Netlify; do not publish it.');
  return book.getUrl();
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}

function cell_(value) {
  const text = String(value == null ? '' : value);
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}

function doPost(event) {
  let saved = false;
  const lock = LockService.getScriptLock();
  try {
    const raw = event && event.postData && event.postData.contents;
    if (!raw || raw.length > 18000) return json_({ok:false, saved:false, emailSent:false});
    const lead = JSON.parse(raw);
    const properties = PropertiesService.getScriptProperties();
    const expectedToken = properties.getProperty('WEBHOOK_TOKEN');
    if (!expectedToken || lead.token !== expectedToken) return json_({ok:false, saved:false, emailSent:false});
    if (!/^[0-9a-f-]{36}$/i.test(lead.submissionId || '') || lead.consent !== true || !lead.name || !lead.company || !lead.message || (!lead.email && !lead.whatsapp)) return json_({ok:false, saved:false, emailSent:false});
    if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return json_({ok:false, saved:false, emailSent:false});
    const recipient = properties.getProperty('NOTIFY_EMAIL');
    const book = SpreadsheetApp.openById(properties.getProperty('SPREADSHEET_ID'));
    const sheet = book.getSheetByName('Enquiries');
    if (!recipient || !sheet) return json_({ok:false, saved:false, emailSent:false});
    lock.waitLock(10000);
    const existing = sheet.getLastRow() > 1 ? sheet.getRange(2,1,sheet.getLastRow()-1,1).createTextFinder(lead.submissionId).matchEntireCell(true).findNext() : null;
    let row;
    if (existing) {
      row = existing.getRow();
      saved = true;
      if (sheet.getRange(row,13).getValue() === 'SENT') return json_({ok:true,saved:true,emailSent:true});
    } else {
      sheet.appendRow([lead.submissionId,new Date(),lead.type || 'project',lead.lang || 'en',lead.name,lead.company,lead.email,lead.whatsapp,lead.service,lead.budget,lead.message,'Yes','PENDING'].map(cell_));
      row = sheet.getLastRow();
      saved = true;
      SpreadsheetApp.flush();
    }
    const fields = [['Name',lead.name],['Company',lead.company],['Email',lead.email],['WhatsApp',lead.whatsapp],['Service / product',lead.service],['Budget',lead.budget],['Message',lead.message],['Language',lead.lang],['Submission ID',lead.submissionId]];
    MailApp.sendEmail({
      to: recipient,
      subject: 'New Axirova ' + (lead.type === 'demo' ? 'demo' : 'project') + ' enquiry',
      body: fields.map(function(field){return field[0] + ': ' + String(field[1] || '');}).join('\n\n') + '\n\nEnquiry sheet: ' + book.getUrl(),
      ...(lead.email ? {replyTo:lead.email} : {}),
      name: 'Axirova Website',
    });
    sheet.getRange(row,13).setValue('SENT');
    return json_({ok:true,saved:true,emailSent:true});
  } catch (_error) {
    return json_({ok:false,saved:saved,emailSent:false});
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}
