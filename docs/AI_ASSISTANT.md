# AXIROVA Website AI Assistant

## Architecture

- React/Vite frontend: `src/components/ChatbotWidget.jsx`
- Same-origin Vercel serverless chat endpoint: `api/chat.js`
- Same-origin Vercel serverless lead endpoint: `api/leads.js`
- AI provider: Vercel AI Gateway using its OpenAI-compatible Chat Completions endpoint.
- Lead destination: the existing Google Apps Script Web App configured only in Vercel environment variables.

The browser never receives the AI Gateway key or the lead webhook token. The assistant uses a server-authored company knowledge prompt and does not browse the internet or invent quotations.

## Required Vercel environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `AI_GATEWAY_API_KEY` | Yes | Private Vercel AI Gateway API key |
| `AXIROVA_AI_MODEL` | Yes | Explicit supported model identifier enabled for the Vercel AI Gateway project |
| `GOOGLE_APPS_SCRIPT_URL` | For lead submissions | Existing Apps Script `/exec` Web App URL |
| `GOOGLE_APPS_SCRIPT_TOKEN` | Recommended | Shared token validated against the Apps Script `WEBHOOK_TOKEN` Script Property |

Set variables for the Production environment (and Preview if desired), then redeploy. Never commit secret values to Git.

## Google Apps Script webhook contract

The lead endpoint reuses the existing Apps Script JSON contract:

`submissionId`, `token`, `type`, `lang`, `name`, `company`, `email`, `whatsapp`, `service`, `budget`, `message`, and `consent`.

The existing Apps Script flow validates the token against Script Property `WEBHOOK_TOKEN`, appends to the `Enquiries` tab in `Axirova Website Enquiries`, and sends a notification email. Configure the existing `/exec` URL and matching token as Vercel server-side environment variables; do not expose either value in frontend variables.

## Local development

Vercel Functions are not executed by the Vite dev server. Use the Vercel CLI for an end-to-end local test:

```bash
npm install
vercel dev
```

The frontend-only Vite preview can still be used to review the widget, but `/api/chat` and `/api/leads` require Vercel Functions.

## Deployment note

GitHub Pages is static hosting and cannot execute `api/*.js`. The integrated live assistant therefore requires the AXIROVA website to be deployed on Vercel (or the two API handlers to be ported to another server-side host). Keep GitHub Pages only as a static preview if needed.

## Operational safeguards

- Chat messages are limited in size and count.
- A lightweight per-instance request throttle is applied to the chat handler; production traffic may require a persistent rate-limit store/WAF rule.
- Lead form validation, consent, and a honeypot are enforced server-side.
- The lead webhook and AI key remain server-side.
- Do not collect sensitive personal information in chat.
- Review privacy notice wording and retention policy before enabling production lead capture.
