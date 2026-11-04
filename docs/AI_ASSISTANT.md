# AXIROVA Website AI Assistant

## Architecture

- React/Vite frontend: `src/components/ChatbotWidget.jsx`
- Same-origin Vercel serverless chat endpoint: `api/chat.js`
- Same-origin Vercel serverless lead endpoint: `api/leads.js`
- AI provider: Vercel AI Gateway using its OpenAI-compatible Chat Completions endpoint.
- Lead destination: an HTTPS webhook (for example, the existing Google Apps Script Web App) configured only in Vercel environment variables.

The browser never receives the AI Gateway key or the lead webhook token. The assistant uses a server-authored company knowledge prompt and does not browse the internet or invent quotations.

## Required Vercel environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `AI_GATEWAY_API_KEY` | Yes | Private Vercel AI Gateway API key |
| `AXIROVA_AI_MODEL` | Yes | Explicit supported model identifier enabled for the Vercel AI Gateway project |
| `AXIROVA_LEADS_WEBHOOK_URL` | For lead submissions | HTTPS endpoint receiving qualified enquiries |
| `AXIROVA_LEADS_WEBHOOK_TOKEN` | Recommended | Shared secret sent in the Authorization header, X-Webhook-Token header and JSON token field |

Set variables for the Production environment (and Preview if desired), then redeploy. Never commit secret values to Git.

## Google Apps Script webhook contract

The lead endpoint sends a JSON POST containing:

- `source`, `submittedAt`, `language`
- `name`, `company`, `email`, `phone`
- `service`, `budget`, `timeline`, `details`
- `consent`, and `token` when configured

The Apps Script Web App should validate the shared token, append the lead to a dedicated Google Sheet, and send a notification to the AXIROVA sales inbox. Deploy it as a Web App accessible to the Vercel function. Do not expose the deployment token in frontend variables.

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
