# PunchThis marketing site — styling layer

Answers audit finding M-03 ("visual rules scattered across CSS, inline
objects and component `<style>` blocks") and ledger item P2-12: what
reusable variants exist, what state each one carries, and where a new
component should put its own rules.

This is a documentation pass, not a rewrite. The recommendation in the
audit offered two paths — "move reusable component styles into CSS
modules **or** a consistent styling layer." This site takes the second:
global, truly-shared rules live in `src/styles/global.css`; anything
scoped to one component stays in that component's own `<style>{...}</style>`
block. See "Why not CSS Modules" at the bottom for the reasoning and the
trigger condition for revisiting it.

## Tokens

Colour, type and radius custom properties live in `src/styles/global.css`
`:root`. Every colour token's provenance against the Expo app's own design
system is tracked in `src/config/brand-tokens.mjs` (ledger P2-13) — check
there before hand-picking a new hex value; if what you need isn't a
token yet, it probably should be added as one rather than inlined.

Never hand-write a hex colour in a component. If axe-core or a manual
check finds it fails contrast, the fix belongs in `global.css`'s `:root`
(or a new token), not a one-off override — that's how the P1-10 and P2-13
passes found and fixed every violation in one place instead of six.

## Breakpoints

No preprocessor, so there's no enforced shared constant — `@media` can't
consume a CSS custom property in its condition. Instead, snap new
responsive rules to this scale (the values already in real use, audited
via `grep -rhoE "@media \(max-width: [0-9]+px\)"`):

| Breakpoint | Role | Uses today |
|---|---|---|
| `400px` | Last-resort fine-tuning (e.g. hiding a header CTA before it collides with the logo) | 1 |
| `480px` | Small phone | 7 |
| `560px` | Large phone | 5 |
| `640px` | Grid-specific collapse (3-column → 1-column card grids) | 1 |
| `768px` | Tablet | 2 |
| `900px` | Primary two-column → one-column cutoff (hero grids, page-hero layouts) | 13 |
| `1024px` | Desktop nav breakpoint (`Header.jsx`) | 2 |

`900px` is the default choice for "this two-column section should stack."
Only reach for a different value when the content genuinely needs it
(e.g. a 3-up card grid collapsing at `640px`, well before the general
tablet cutoff).

## Buttons — `.btn`

Base class `.btn` (global.css §4) + one variant class. All variants share
sizing/shape (`padding:13px 24px`, `border-radius:var(--radius-md)`,
`font-size:15px/weight:700`) and a `:focus-visible` outline; states below
are each variant's own.

| Variant | Use | States defined |
|---|---|---|
| `.btn-primary` | The one primary action per view (cobalt-deep fill, white label) | `:hover` (darker fill + lift), `:active` (settle) |
| `.btn-ghost` | Secondary action on a dark/hero surface (transparent, white border+text) | `:hover` (subtle white wash) |
| `.btn-ghost-dark` | Secondary action where the ghost needs to read as "cobalt" on a dark surface | `:hover` |
| `.btn-outline` | Secondary action on a light surface (ink text, border) | `:hover` (mist wash) |

Every button on the site is one of these four. Some call sites stack a
second, component-scoped class for a local size/layout tweak only
(`hero-cta-primary`, `cta-btn-primary` — larger text/padding for the two
biggest CTAs on the page; `form-submit` — full-width + `:disabled` state
for the early-access form's submit button). That's the sanctioned way to
adjust one instance: extend with an additive class in the owning
component's own `<style>` block, never fork the base variant or reach for
an inline `style` object.

## Status chips — `.chip`

Base `.chip` (pill shape, uppercase micro-label) + one variant per issue
status, sourced from the same tokens as `HowItWorks.jsx`'s `LIFECYCLE`
array (see P2-13): `.chip-open` · `.chip-warn` · `.chip-cobalt` ·
`.chip-review` · `.chip-ok`.

All five are defined, but only two are actually rendered today —
`.chip-open` and `.chip-cobalt`, both in `WorkflowSection.jsx`'s sample
report caption. `.chip-warn`, `.chip-review` and `.chip-ok` exist for
design-system completeness (matching the full app lifecycle/status set —
`.chip-review` specifically for the "review" status the app reserves for
the future, see `PRODUCT_TRUTH.md`) but currently have no call site. Keep
them rather than deleting unused CSS: they're the correct class to reach
for the moment a warning/completed/review chip is actually needed
elsewhere on the site, and each one is already contrast-verified (P1-10).

## Sections & heroes

- `.section` / `.section-sm` (global.css §8) — the two standard vertical
  paddings for a full-width content section. Use one of these two, not a
  hand-picked padding value.
- `.eyebrow` / `.section-label` — the small uppercase cobalt-deep label
  above a heading. Identical type styling; the only real difference is
  `.section-label` adds `margin-bottom:12px` and `.eyebrow` doesn't.
  `.section-label` is the one to reach for (13 use sites); `.eyebrow` is
  down to a single use (`Hero.jsx`'s eyebrow line, sitting tight against
  the headline with no gap) — keep that one as the deliberate
  no-margin variant rather than merging it into `.section-label`, since
  doing so would add a 12px gap above the hero's H1 that isn't there
  today. Don't add a third variant of this pattern; pick whichever of
  these two margins is correct for the new spot.
- **Dark hero pattern** — six pages (`Product`, `MarkupPage`, `FAQPage`,
  `ReportsPage`, `HowItWorks`, `LegalLayout`) apply a shared `dark-hero`
  class name to their top section, for the dark-background page-top
  treatment with the faint blueprint-grid overlay. `dark-hero` isn't in
  global.css — each page defines its own rule locally, and checking all
  six turned up real, previously-undocumented drift rather than six
  identical copies:
  - `Product`, `FAQPage`, `HowItWorks` genuinely match:
    `background:var(--ink); position:relative; overflow:hidden;
    padding:100px 0 80px`.
  - `ReportsPage` sets `background:var(--slate)` instead of `var(--ink)`
    — a visibly different (lighter) hero tone from every other page.
  - `LegalLayout` uses `padding:88px 0 56px`, shorter than the other
    five — its four legal pages read as intentionally more compact.
  - `MarkupPage` never defines a `.dark-hero` rule at all; its own
    `.markup-page-hero` class independently duplicates the same ink/100/
    80 declarations, so the `dark-hero` class on that page's `<section>`
    does nothing.
  None of this is necessarily wrong — the slate tone and the shorter
  legal padding both look like deliberate choices, not bugs — but it
  means `dark-hero` is currently a marker name applied by convention,
  not a source of shared behaviour. Promoting the three genuinely-
  matching declarations into a real `.dark-hero` global.css rule (and
  either keeping ReportsPage/LegalLayout's differences as an explicit
  override or confirming they should just match) is the concrete
  follow-up here — not bundled into this pass, to keep this a
  documentation change rather than a six-file edit whose visual intent
  wasn't confirmed.

## Cards

No shared `.card` class — card-like blocks (`ReportsPage` report-type
tiles, `HowItWorks` lifecycle rows, `MarkupPage` tool tiles) intentionally
vary in background (`#fff` vs `var(--mist)`), radius (`var(--radius-md)`
vs `var(--radius-lg)`) and padding across real use, so a single class
would either lose that variance or need as many modifiers as there are
call sites. The recipe to follow for a new card:

```
background: #fff | var(--mist);
border: 1px solid var(--border);
border-radius: var(--radius-md) | var(--radius-lg);
padding: <scale to content — 20-28px is the current range>;
```

## Phone media — `PhoneMockup`

The one component that already does this right: `src/components/
PhoneMockup.jsx` takes `image`/`priority`/`maxWidth`/`label` props and is
the single place that knows how to render a real captured app screenshot
vs. the placeholder SVG frame. Every phone-shaped image on the site goes
through this component — never an ad hoc `<img>`.

## Forms

One form on the site (`EarlyAccess.jsx`), so "variants" means its own
states, not variants across instances:

- Stage 1 (email): `status` = `idle | submitting | success | error`
- Stage 2 (optional profile, shown after stage-1 success): `profileStatus`
  = `idle | submitting | error`, plus a `profileDone` flag
- Shared bits any future form should reuse: `.form-input.error` +
  `aria-invalid` + an `id`-linked error message (see P1-11), a
  honeypot field (`company_website`, visually hidden but not
  `display:none` — screen-reader/tab-order safe, bot-form-fill unsafe),
  and analytics events via `src/lib/analytics.js`.

## Navigation

One nav (`Header.jsx`), two states: `scrolled` (boolean — sticky-header
background/shadow once the page scrolls past the hero) and `open`
(boolean — mobile menu expanded). Desktop/mobile layouts split at the
`1024px` breakpoint above.

## Why not CSS Modules

The audit's recommendation named CSS Modules as one option. This site
keeps component-scoped `<style>{\`...\`}\` blocks (a styled-jsx-like,
colocated pattern) instead, because:

- It's the existing convention across all ~30 components — switching
  means touching every one of them (new `.module.css` files, new
  `className={styles.x}` call sites) for a build-tooling change with no
  user-visible benefit, on a site this size.
- No new dependency or Vite config needed; the current setup already
  works and is what every component in the repo follows.

Revisit this if the component count or the amount of *actually shared*
(not just similarly-shaped) component CSS grows enough that hand-sync
between copies becomes a real maintenance cost — the dark-hero pattern
above is the closest thing to that trigger today.
