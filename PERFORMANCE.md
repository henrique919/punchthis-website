# PunchThis Marketing — Performance Budgets

Set per `PUNCHTHIS_DESIGN_UX_AUDIT.md` M-06. Re-check after any change that adds a dependency, a route, or above-the-fold media.

| Budget | Target | Last measured | Source |
|---|---|---|---|
| Initial JS (gzip) | ≤150 KB | **74.7 KB** (`index-*.js`, home route) | `npm run build` output |
| Hero poster / above-fold media | ≤500 KB | **114.7 KB** total (3 real screenshots: capture-session 33.8 KB + markup-studio 43.4 KB + report-preview 77.3 KB gzip-on-the-wire is lower still — these are already-compressed PNGs, this is raw file size) | `npm run build` output |
| LCP | ≤2.5 s | Not yet measured in a real Lighthouse/CrUX run — no such tooling in this environment. The hero's 3 images now load `loading="eager" fetchPriority="high"` (previously `loading="lazy"`, which was actively working against LCP on the element most likely to *be* the LCP candidate) | Manual: `PhoneMockup.jsx` `priority` prop |
| CLS | ≤0.1 | Not yet measured (same tooling gap) — images have explicit aspect-ratio via the phone-frame's `paddingTop` percentage trick, so they shouldn't shift layout on load | — |
| INP | ≤200 ms | Not yet measured (same tooling gap) | — |

## What's in place

- **Route-level code splitting** (`src/App.jsx`): every route except Home is `React.lazy`-loaded. A visitor to `/early-access` doesn't download `/product`'s or the legal pages' code first. Per-route chunks: 0.6 KB (Privacy) to 12.9 KB gzip (EarlyAccess, the largest due to its form logic).
- **Self-hosted fonts** (`@fontsource/space-grotesk`, `@fontsource/hanken-grotesk`, wired in `src/main.jsx`): previously loaded from Google Fonts' CDN, which added a third-party DNS/connection dependency for above-the-fold text and was observed failing outright (`net::ERR_CONNECTION_RESET`) in this build/test environment. Same weights as before (Space Grotesk 400/500/600/700, Hanken Grotesk 400/500/600/700/800), subset by the `@fontsource` package's own unicode-range splitting so a page only downloads the character ranges it actually renders.
- **Lazy below-fold images**: every `PhoneMockup` image is `loading="lazy"` by default (see P1-6's media-manifest images); only the 3 hero images opt out via `priority`.
- **Real media, not embedded SVG markup**: P1-6 replaced 5 hand-coded SVG screen components (each hundreds of lines of inline `<path>`/`<text>` markup, parsed and executed on every render) with plain `<img>` tags pointing at real screenshots. Net effect on the home-route JS chunk: went down, not up, despite adding real product proof.

## Known gap

No Lighthouse/CrUX/WebPageTest access exists in this environment (no browser devtools protocol performance trace tooling wired up, no real network conditions to test against). LCP/CLS/INP rows above are therefore structural/best-effort, not measured. Before publicly citing these budgets as met, run a real Lighthouse pass against a deployed preview.
