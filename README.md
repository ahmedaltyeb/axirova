# Axirova Technology — React + Vite Website

Production-ready React frontend for Axirova Technology.  
**Stack:** React 18 · Vite 5 · Tailwind CSS 3 · Framer Motion 11

---

## Quick Start

```bash
# 1. Navigate into the project
cd axirova-website

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

## Build for Production

```bash
npm run build       # outputs to /dist
npm run preview     # preview production build locally
```

---

## Project Structure

```
axirova-website/
├── public/
│   └── (static assets, favicon, og-image)
├── src/
│   ├── components/
│   │   ├── PageEnter.jsx       # Animated intro overlay
│   │   ├── Cursor.jsx          # Custom cursor + scroll bar
│   │   ├── ScrollProgress.jsx  # Side dot navigation
│   │   ├── Navbar.jsx          # Fixed nav with scroll state
│   │   ├── Hero.jsx            # Full hero: canvas, aurora, 3D tilt
│   │   ├── About.jsx           # About section with data-flow canvas
│   │   ├── Services.jsx        # 6-card service grid
│   │   ├── Industries.jsx      # Draggable industry carousel
│   │   ├── Products.jsx        # Auto-cycling product carousel
│   │   ├── Counters.jsx        # Animated stats on scroll
│   │   ├── TechStack.jsx       # Interactive tech node canvas
│   │   ├── Vision.jsx          # Vision & Mission cards
│   │   ├── Values.jsx          # Core values grid
│   │   ├── CTA.jsx             # Call to action section
│   │   └── Footer.jsx          # Footer with links and socials
│   ├── hooks/
│   │   ├── useScrollReveal.js  # IntersectionObserver reveal hook
│   │   └── useCounter.js       # Animated number counter hook
│   ├── pages/
│   │   └── Home.jsx            # (reserved for routing)
│   ├── styles/
│   │   └── globals.css         # Design tokens, base styles, keyframes
│   ├── utils/
│   │   ├── siteData.js         # All content data (services, products, etc.)
│   │   └── logoData.js         # Base64 encoded logo (auto-generated)
│   ├── App.jsx                 # Root component with lazy loading
│   └── main.jsx                # React DOM entry point
├── index.html                  # Full SEO metadata + schema.org JSON-LD
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## Company Info

| Field | Value |
|-------|-------|
| **Company** | Axirova Technology |
| **CEO** | Ahmed Eltyeb Khalifa |
| **Email** | info@axirova.ae |
| **Phone** | +971 52 930 7250 |
| **Twitter** | @axirovaa |
| **Region** | UAE / GCC |

All content is centralized in `src/utils/siteData.js` — edit there to update the entire site.

---

## Key Features

- **Custom cursor** with lerp interpolation and hover/click states
- **Hero canvas** with interactive particle network (mouse attraction + click bursts)
- **Aurora background** with layered CSS animations
- **3D tilt** on hero content, responding to mouse position
- **Scan line** sweep effect
- **Lazy loading** — all below-fold sections loaded on demand
- **Framer Motion** for all entrance animations and hover effects
- **Animated counters** triggered by IntersectionObserver
- **Draggable** industry carousel (mouse + touch)
- **Auto-cycling** product carousel with manual dot control
- **Tech stack canvas** with orbiting nodes
- **Responsive** across 1440px, 1024px, 768px, 480px breakpoints
- **SEO**: full meta tags, Open Graph, Twitter cards, schema.org JSON-LD

---

## To Update Content

Edit **`src/utils/siteData.js`** — single source of truth for:
- `SITE` — company info, contact, social links
- `NAV_LINKS` — navigation items
- `SERVICES` — service cards
- `INDUSTRIES` — industry carousel
- `PRODUCTS` — product carousel
- `VALUES` — core values
- `STATS` / `COUNTER_STATS` — animated numbers
- `TECH_NODES` / `CAT_COLOR` — tech stack canvas nodes
