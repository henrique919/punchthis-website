# PunchThis — Marketing Website

Static React + Vite website for [PunchThis.app](https://punchthis.app), a mobile site-inspection, markup and reporting app.

---

## Running locally (on Replit)

All commands are run from the **`site/`** folder:

```bash
cd site
npm install        # install dependencies
npm run dev        # start dev server at port 5000
```

The site is available in the Replit preview pane immediately.

---

## Building for production

```bash
cd site
npm run build      # outputs to site/dist/
npm run preview    # preview the production build locally
```

---

## Editing content

**All text, links, FAQ and CTA destinations live in one file:**

```
site/src/config/content.js
```

Edit that file to update:
- Navigation links and CTA URLs
- Hero headline, body copy and audience line
- Trust strip and use-case list
- Markup, workflow and benefits copy
- Reports showcase copy
- Differentiation statements
- Audience cards
- Final CTA copy
- FAQ questions and answers
- Footer links
- Contact email and launch status

---

## Pages

| Route | File | Description |
|---|---|---|
| `/` | `src/pages/Home.jsx` | Full landing page |
| `/product` | `src/pages/Product.jsx` | Product overview |
| `/markup` | `src/pages/MarkupPage.jsx` | Markup feature deep-dive |
| `/reports` | `src/pages/ReportsPage.jsx` | Reports feature showcase |
| `/how-it-works` | `src/pages/HowItWorks.jsx` | Step-by-step workflow |
| `/faq` | `src/pages/FAQPage.jsx` | Full FAQ by category |
| `/early-access` | `src/pages/EarlyAccess.jsx` | Registration page |

---

## Key components

| Component | Purpose |
|---|---|
| `Header.jsx` | Sticky nav, mobile drawer |
| `Footer.jsx` | Site-wide footer |
| `Logo.jsx` | SVG wordmark + mark |
| `PhoneMockup.jsx` | Reusable phone frame (390×844 ratio) |
| `screens/` | SVG recreations of all app screens |

---

## Connecting a form endpoint

The Early Access form currently opens `mailto:` as a fallback. To wire up real submissions:

1. Sign up for [Formspree](https://formspree.io) or [Netlify Forms](https://www.netlify.com/products/forms/).
2. Replace the `handleSubmit` function in `src/pages/EarlyAccess.jsx` with a `fetch()` POST to your endpoint.
3. Remove the `form-disclaimer` note once the endpoint is live.

---

## Deploying on Replit

Click **Publish** in the Replit sidebar. The site builds automatically and is served from the `dist/` folder.

For a custom domain, connect `PunchThis.app` in the Replit deployment settings.

---

## Brand reference

- Colours: `src/config/content.js` + `src/styles/global.css` (CSS custom properties)
- Fonts: Space Grotesk (headings) + Hanken Grotesk (body) — loaded via Google Fonts in `index.html`
- Logo geometry: `src/components/Logo.jsx`
- App screen designs: `src/screens/`
