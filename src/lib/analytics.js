// ─── PunchThis — Analytics event contract ──────────────────────────────────
// Provider-agnostic: no tracking script is bundled by default, so this is a
// safe no-op until the operator wires a provider (GA4/Plausible/PostHog/etc)
// and the matching consent flow. `track()` pushes to `window.dataLayer` (the
// de-facto standard queue most tag managers already read) and calls
// `window.plausible` if present - either way, nothing sends anywhere unless
// a real analytics script that reads one of those is also loaded.
//
// Event contract (name -> expected properties):
//   early_access_view       { }
//   early_access_start      { }                      first keystroke in the email field
//   early_access_success    { has_profile: boolean }  has_profile true once name/role/company are added
//   early_access_error      { reason: string }        reason is one of the api's `error` codes, or "network"
//   early_access_profile_success { }
//
// Do not add a real tracking script here without the matching consent/legal
// work (see PUNCHTHIS_MARKETING_LOOP.md, P2-16).

export function track(name, properties = {}) {
  if (typeof window === 'undefined') return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...properties });
    if (typeof window.plausible === 'function') {
      window.plausible(name, { props: properties });
    }
  } catch {
    // Analytics must never break the product experience.
  }
}
