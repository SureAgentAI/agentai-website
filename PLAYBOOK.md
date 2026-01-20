# React 19 + Vite + Tailwind v4 + Cloudflare Pages Playbook

**Stack:** React 19 + Vite + TypeScript + Tailwind v4 + Cloudflare Pages + Turnstile + Resend

This is a prescriptive playbook - follow exactly, no improvisation needed.

---

## Quick Start

```bash
npm install
npm run dev      # Development server at http://localhost:5173
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

---

## Project Structure

```
agentai-website-v2/
├── index.html              # SEO meta, OG tags, structured data
├── postcss.config.js       # Tailwind v4 PostCSS config
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── index.css           # Tailwind v4 @theme with colors
│   ├── App.tsx             # React Router setup
│   ├── components/
│   │   ├── layout/         # Header, Footer
│   │   ├── ui/             # Button, Card
│   │   └── forms/          # ContactForm, etc.
│   ├── pages/              # All page components
│   ├── hooks/              # useContactForm, etc.
│   └── utils/              # validation, etc.
├── functions/
│   └── api/
│       └── contact.ts      # Cloudflare Pages Function
└── public/
    ├── _headers            # Security headers
    ├── _redirects          # SPA routing
    ├── images/
    ├── fonts/
    └── favicon/
```

---

## Key Conventions

### Colors - SINGLE SOURCE OF TRUTH

All colors defined in `src/index.css` via `@theme`:

```css
@theme {
  --color-primary-500: #278A5B;  /* Main brand */
  --color-primary-600: #1a784a;  /* Hover state */
  /* ... etc */
}
```

**NEVER use hardcoded hex values in components:**
```tsx
// ❌ WRONG
className="bg-[#278A5B]"

// ✅ CORRECT
className="bg-primary-500"
```

### Typography Plugin

Tailwind v4 requires explicit plugin import:

```css
@import 'tailwindcss';
@plugin '@tailwindcss/typography';
```

### Routing

Use `react-router-dom`:
```tsx
import { Link } from 'react-router-dom'

// Use `to` not `href`
<Link to="/about">About</Link>
```

### Environment Variables

- `VITE_` prefix for client-side (build time)
- No prefix for Pages Functions (runtime)

```bash
# Client-side (in .env)
VITE_TURNSTILE_SITE_KEY=xxx

# Pages Functions (in Cloudflare dashboard)
TURNSTILE_SECRET_KEY=xxx
RESEND_API_KEY=xxx
```

---

## Cloudflare Pages Deployment

### Build Settings

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/`

### Environment Variables

| Variable | Type | Scope |
|----------|------|-------|
| `VITE_TURNSTILE_SITE_KEY` | Plain text | Build |
| `TURNSTILE_SECRET_KEY` | Encrypted | Production |
| `RESEND_API_KEY` | Encrypted | Production |

### Custom Domain

1. Add domain in Pages dashboard
2. Add CNAME record: `@` → `project.pages.dev`
3. Add CNAME record: `www` → `project.pages.dev`

---

## Gotchas

### Tailwind v4
- Use `@tailwindcss/postcss` not `tailwindcss` in postcss.config.js
- Use `@theme` directive for design tokens
- Use `@plugin` to load plugins like typography

### TypeScript
- Use `import type` for type-only imports (verbatimModuleSyntax)
- Add `/// <reference types="@cloudflare/workers-types" />` in functions

### Turnstile
- Widget minimum 300×65px - don't put in narrow grids
- Use `normal` size (not `compact` - it's taller!)

### SPA Routing
- `public/_redirects` must have `/* /index.html 200`

---

## Checklist

- [x] Project scaffolded with Vite
- [x] Tailwind v4 with @theme configured
- [x] Typography plugin added
- [x] All colors via CSS variables
- [x] SEO meta tags in index.html
- [x] Security headers in _headers
- [x] SPA routing in _redirects
- [x] Pages Function for contact form
- [x] All pages migrated
- [x] Assets copied
- [x] Build passes
- [ ] Deploy to Cloudflare Pages
- [ ] Set environment variables
- [ ] Configure custom domain
- [ ] Test contact form

---

*Created: January 2025*
