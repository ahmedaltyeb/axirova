# Axirova Technology

A bilingual, conversion-focused company website built with React 18, Vite 5, Tailwind CSS 3, Framer Motion 11, and React Router. Production uses Vercel with clean URLs. The existing GitHub Pages workflow remains available as a static hash-router preview.

## Development

```bash
npm ci
npm run dev
npm test
npm run lint
npm run build
npm run preview
```

Node 20 or newer is recommended. Vite serves the frontend only. Test the `/api/enquiry` function using Vercel development tooling or a Vercel preview deployment; `npm run dev` does not send enquiries.

## Editing content

- `src/content/en.js` and `src/content/ar.js`: shared UI and page copy, forms, pricing, FAQs, estimator, and draft legal notices.
- `src/content/catalog.js`: bilingual services, products, industries, illustrative work, and draft insights. Slugs create detail routes automatically. Product feature lists are discussion areas pending product-owner confirmation.
- `src/utils/siteData.js`: retained company contact details and legacy component data. Active pages use the new catalog; update the contact details here once for the navbar, footer, WhatsApp link, and contact page.
- `src/utils/translations.js`: retained Vision, Values, and technology-canvas copy.
- `src/styles/site.css`: active design system, logical spacing, responsive layouts, RTL, reduced motion, and theme tokens. The old stylesheet and unused legacy components remain available as references but are not loaded into active pages.

Do not publish unverified client metrics, logos, testimonials, case-study results, prices, or product screenshots. The new pages deliberately label these placeholders. Work and insight detail placeholders are excluded from the sitemap and marked `noindex`.

To add a language, add a matching content module, register it in `src/content/index.js`, extend the language provider/switcher and supported schema languages, translate retained component strings, and add an appropriate font and direction. Run the content parity tests after changing either locale.

## Pages

Home; seven service details; seven product details; six industry details; three illustrative work details; three draft insight details; pricing; about; contact; request-demo; project estimator; privacy; terms; and a catch-all 404. Legacy `/blog` and `/case-studies` index links redirect to the new collections.

The estimator uses explicitly illustrative rules: scope and integrations choose Launch, Growth, or Custom. Language is collected for the discussion. It does not calculate prices or promise delivery dates.

## Vercel deployment

1. Import this repository into Vercel with the Vite preset, `npm run build`, and output directory `dist`.
2. Copy values from `.env.example` into the Vercel environment settings. Set `VITE_SITE_URL` to the canonical production origin. Never expose secret keys through `VITE_` variables.
3. Configure either `ENQUIRY_WEBHOOK_URL` (optional bearer token) OR `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL`, and `ENQUIRY_TO_EMAIL`. Resend requires a verified sender domain.
4. Set `VITE_BOOKING_URL` only after confirming your Calendly/Cal.com embed URL. Until then the page displays a booking placeholder and the demo enquiry form.
5. Deploy a preview and test a real enquiry with permission before launch. No external messages were sent during automated verification.

`vercel.json` retains the SPA fallback; filesystem functions take precedence over the fallback. The function uses shared Zod validation, a honeypot, a same-origin check, bounded payloads, a provider timeout, and a basic five-attempt / ten-minute per-IP limit. The in-memory limiter is per function instance and resets on cold starts; use durable shared limiting or Vercel protections when stronger abuse resistance is needed. Provider errors and missing configuration produce an error, never a false success.

`npm run build` generates `public/sitemap.xml` and `public/robots.txt` from the catalog. Each route sets title, description, canonical, Open Graph, Organization, and relevant Service/FAQ JSON-LD using Helmet. The language choice is stored locally; both languages share canonical URLs. This SPA uses client-rendered metadata; validate crawler requirements before relying on language-specific discovery or social unfurling. Dedicated locale URLs and prerendering are possible follow-up work within Vite.

## GitHub Actions

The existing Pages workflow builds with `GH_PAGES=true` and `VITE_GH_PAGES=true`; asset paths and hash routing are compatible with `/axirova/`. GitHub Pages cannot execute Vercel functions, so use Vercel for working enquiry delivery. The quality workflow checks tests, lint, and production compilation on pull requests.

## Accessibility and performance

Keyboard-accessible navigation and services disclosure, skip link, route focus handling, visible focus states, labeled validated fields, live form status, native form controls, logical CSS spacing, and Cairo Arabic typography are included. Light/dark and EN/AR preferences persist locally.

Routes and effects are lazy loaded. Particle hero, aurora, custom cursor, and the technology canvas are retained; canvases and cursor are mounted only on wide screens with a fine pointer and no reduced-motion preference. Technology canvas loads near the viewport. Mobile retains a native cursor and static technology list. The autoplay video, splash delay, unsupported statistics, and scripted chatbot are omitted from active pages.

## Owner input before production launch

Automated verification covers bilingual content parity, all route templates and catalog detail slugs (including unknown-slug fallbacks), and enquiry validation/delivery/abuse controls. Browser automation could not confidently determine the browser URL, so visual QA and Lighthouse measurement remain pending. Installation reports 16 dependency advisories (8 moderate, 8 high); review them before production, preserving the requested major stack versions.

- Verified project metrics and client-approved case studies / logos.
- Approved product capabilities, availability, screenshots, and final marketing copy.
- Prices and included tier features; approved engagement terms.
- Resend or webhook delivery configuration and confirmed booking URL.
- Legal review, retention periods, and provider details for privacy/terms drafts.
- Browser/RTL checks across every route and a measured Lighthouse run on deployment. No Lighthouse 90+ claim is made without measurement.

Work is on `feat/multipage-conversion`, separate from `main`. Changes are committed locally; pushing or deploying the user's production repository is a separate operation.
