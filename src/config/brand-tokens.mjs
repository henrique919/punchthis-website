/**
 * PunchThis brand tokens — canonical cross-product source.
 *
 * This file is the documented answer to "where do the marketing site's
 * design tokens come from" (audit finding, Handoff §2 / ledger P2-13).
 * There is no build-time codegen link between this repo and the Expo app
 * (they're separate repos with separate bundlers — Vite here, Metro
 * there — and no shared package registry), so this is not literally
 * `import`ed by the app. Instead:
 *
 *   1. Every entry below records the value actually shipped on each side,
 *      with the app's source file + commit as provenance.
 *   2. `scripts/check-token-drift.mjs` parses this repo's real source of
 *      *rendered* truth — the `:root` block in `src/styles/global.css` —
 *      and fails CI if a tracked CSS custom property silently diverges
 *      from the value recorded here. That keeps this file honest; it
 *      cannot describe a value the site has stopped actually using.
 *   3. When `expo/constants/theme.ts` changes in the app repo, update the
 *      `app` field below to match, then re-run `npm run check:tokens` —
 *      a mismatch there is a prompt to decide whether the marketing site
 *      should follow, not an automatic requirement (the site's values
 *      were independently darkened in several places to clear WCAG AA;
 *      see the `notes` field on each entry).
 *
 * Source: github.com/henrique919/audit-snap-663 @ 6c3e20233bdceb011be34dfecf13f26c150f4adc
 *   - expo/constants/theme.ts   (palette, radius, spacing, font.size)
 *   - expo/constants/typography.ts (fontFamily)
 */

export const meta = {
  appRepo: 'henrique919/audit-snap-663',
  appCommit: '6c3e20233bdceb011be34dfecf13f26c150f4adc',
  appColorSource: 'expo/constants/theme.ts',
  appTypeSource: 'expo/constants/typography.ts',
  websiteVarSource: 'src/styles/global.css :root',
}

/**
 * Each entry: the CSS custom property this repo ships, its value, the
 * matching token in the app's `palette` (or `null` if this is a
 * website-only addition), and why they match or diverge.
 */
export const colors = {
  '--cobalt':        { value: '#4C82FF', app: 'cobalt',           notes: 'Decorative/large-scale only on both sides - 3.53:1 on white, fails AA as text.' },
  '--cobalt-deep':    { value: '#2857D6', app: 'cobaltDeep',       notes: 'White-on-cobalt fills (buttons, active chips). 6.13:1 on white. Also reused on the website as the AA-safe cobalt *text* color (eyebrows, hover states) — the app instead has a distinct `cobaltText` (#2B5FCC) for that role. Both clear AA; not yet reconciled, see "divergences" below.' },
  '--cobalt-deeper':  { value: '#2449B8', app: null,               notes: 'Website-only: hover/pressed state for --cobalt-deep fills. 7.72:1 on white. The app has no button hover state (native touch has no persistent hover).' },
  '--cobalt-light':   { value: '#7AAEFF', app: null,               notes: 'Website-only: cobalt-as-text on dark (ink/carbon) surfaces, for the sticky header\'s dark-mode blend and dark-hero sections. 7.04-7.93:1. No app equivalent — the app doesn\'t render cobalt text on dark surfaces.' },
  '--cobalt-soft':    { value: '#EAF1FF', app: 'cobaltSoft',       notes: 'Exact match.' },
  '--ink':            { value: '#1C232B', app: 'carbon',          notes: 'Same value, different name (website: "ink", app: "carbon"). Historical naming drift, not a value mismatch.' },
  '--carbon':         { value: '#12181F', app: 'carbonDeep',      notes: 'Same value, different name (website: "carbon", app: "carbonDeep"). NB: website "--carbon" is NOT the same colour as app "carbon" (#1C232B) — see --ink above. This name collision is exactly the kind of thing this file exists to surface.' },
  '--slate':          { value: '#22303C', app: 'charcoal',        notes: 'Same value, different name.' },
  '--steel':          { value: '#7E8B96', app: 'steel',           notes: 'Exact match. Decorative/border/icon use only - 3.49:1 on white, fails AA as text.' },
  '--steel-text':     { value: '#616B78', app: 'textFaint',       notes: 'Exact match. AA-safe steel-as-text on light surfaces, >=4.5:1.' },
  '--muted-on-dark':  { value: '#96A0A9', app: 'textFaintOnDark', notes: 'Exact match. Faint text on carbon/ink/slate surfaces.' },
  '--muted':          { value: '#5C6670', app: 'textMuted',       notes: 'DIVERGES from app\'s textMuted (#69747D, 4.78:1 on white). Website darkened to 5.31:1 on --mist / 5.85:1 on white after axe-core found #69747D failing AA on the mist surface (4.33:1) — the app may have the same latent gap wherever textMuted renders on a background other than white/surface; flagged here, not fixed in the app repo by this pass (out of scope: changing the app\'s own rendered colours needs the app\'s own visual QA).' },
  '--border':         { value: '#DDE3E8', app: 'border',          notes: 'Exact match.' },
  '--mist':           { value: '#F2F4F6', app: 'background',      notes: 'Same value, different name.' },
  '--white':          { value: '#FFFFFF', app: 'white',           notes: 'Exact match.' },

  '--open':           { value: '#C93B3B', app: 'red',             notes: 'Exact match. Decorative/dot/border use only.' },
  '--open-soft':      { value: '#FBEBEB', app: 'redSoft',         notes: 'Exact match.' },
  '--open-text':      { value: '#A82C2C', app: null,              notes: 'Website-only addition: the app has no AA-safe "red-as-text" token (no `redText` in palette). Raw --open is 4.36:1 on --open-soft, below AA. Darkened to 5.94:1. Worth the app repo adding an equivalent `redText` token if red is ever rendered as text/icon-as-text there — flagged, not changed, in this pass.' },
  '--warning':        { value: '#E5A016', app: 'amber',           notes: 'Exact match. Decorative/dot/border use only.' },
  '--warning-soft':   { value: '#FDF3E0', app: 'amberSoft',       notes: 'Exact match.' },
  '--warning-text':   { value: '#92600A', app: 'amberText',       notes: 'Exact match. 4.89:1 on --warning-soft.' },
  '--review':         { value: '#7B61E0', app: 'review',          notes: 'Exact match. Decorative/dot/border use only. Not currently rendered anywhere on the marketing site (the app reserves "review" for a future status not yet shipped — see PRODUCT_TRUTH.md) but the token is kept in sync in case a future chip needs it.' },
  '--review-soft':    { value: '#EEEAFB', app: 'reviewSoft',      notes: 'Exact match.' },
  '--review-text':    { value: '#5B41C0', app: 'reviewText',      notes: 'Exact match.' },
  '--success':        { value: '#1E9E5A', app: 'green',           notes: 'Exact match. Decorative/dot/border use only.' },
  '--success-soft':   { value: '#E7F3EC', app: 'greenSoft',       notes: 'Exact match.' },
  '--success-text':   { value: '#177A46', app: null,              notes: 'Website-only addition, same rationale as --open-text: the app has no `greenText` token yet. AA-safe darkening of --success for text-on-soft use.' },
}

/** Space Grotesk (display) + Hanken Grotesk (body), self-hosted via
 *  @fontsource on the website, @expo-google-fonts in the app. Weight sets
 *  match exactly as of the app commit above (400/500/600/700 Space
 *  Grotesk, 400/500/600/700/800 Hanken Grotesk) — verified against
 *  expo/constants/typography.ts `fontFamily`. */
export const typography = {
  display: { value: "'Space Grotesk'", appToken: 'fontFamily.heading (+ Regular/Medium/SemiBold cuts)', weights: [400, 500, 600, 700] },
  body:    { value: "'Hanken Grotesk'", appToken: 'fontFamily.body (+ Medium/SemiBold/Bold/ExtraBold cuts)', weights: [400, 500, 600, 700, 800] },
}

/**
 * Known, NOT-yet-reconciled divergences between the two design systems.
 * Recorded here rather than silently fixed because closing them means
 * either a visual change to an already-shipped surface (radius) or a
 * change to a different repo's own rendered UI (spacing) — both need
 * their own review, out of proportion for a "document the tokens" pass.
 */
export const divergences = {
  radius: {
    app:     { sm: 8, md: 10, lg: 16, xl: 22, pill: 999 },
    website: { sm: 8, md: 14, lg: 20, xl: 28, pill: 999 },
    notes: 'Only `sm` and `pill` match. md/lg/xl differ by a consistent +6px on the website — appears to be an intentional larger-radius treatment for a marketing site vs. a native app\'s tighter card geometry, not a bug, but never previously documented as a deliberate choice. Left as-is: re-tuning the website\'s radius scale to match the app exactly would be a visible layout change across every card/button/section on the site, well beyond this item\'s "document the source" scope.',
  },
  spacing: {
    app: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 },
    website: null,
    notes: 'The marketing site has no spacing scale — every gap/padding is an ad hoc px value in each component\'s inline styles. Introducing one now would mean touching every component file to realise any benefit, which is a much larger change than this audit item\'s scope. Recorded here as the concrete next step if P2-12\'s styling-layer consolidation continues.',
  },
}
