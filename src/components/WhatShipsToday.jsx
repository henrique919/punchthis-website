import { Check, Clock, XCircle } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

// Sourced from PRODUCT_TRUTH.md — keep these two files in sync.
const SHIPPED = [
  'Photo-first issue capture, on device',
  'Arrow, circle, box, pen, text, numbered marker and blur annotation',
  'Open / Assigned / In Progress / Completed status tracking',
  'Client, Site Walk and Handover PDF report presets, with preview',
  'Local-first storage — nothing leaves your device unless you export or share it',
  'Full local export archive',
]

const BETA = [
  'Invite-only web/PWA early access',
  'Native iOS and Android apps (in development)',
]

const NOT_YET = [
  'Cloud backup or sync',
  'Team or multi-user collaboration',
  'A contractor-facing app or portal',
  'Published pricing',
]

function List({ items, icon: Icon, tone }) {
  return (
    <ul className={`wst-list wst-${tone}`} role="list">
      {items.map((item) => (
        <li key={item} className="wst-item">
          <Icon size={16} strokeWidth={2.5} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function WhatShipsToday() {
  const ref = useReveal()
  return (
    <section ref={ref} className="wst-section section" aria-labelledby="wst-heading">
      <div className="container">
        <div className="reveal wst-header">
          <p className="section-label">WHAT SHIPS TODAY</p>
          <h2 id="wst-heading" className="wst-headline">Only what's actually built. Nothing implied.</h2>
          <p className="wst-sub">
            PunchThis is pre-launch. Here's exactly what's real right now, what's in beta, and what isn't built yet — no roadmap dressed up as a feature.
          </p>
        </div>
        <div className="wst-grid">
          <div className="reveal wst-card">
            <h3 className="wst-card-title wst-title-shipped"><Check size={18} strokeWidth={2.5} aria-hidden="true" /> Shipped</h3>
            <List items={SHIPPED} icon={Check} tone="shipped" />
          </div>
          <div className="reveal wst-card" style={{ transitionDelay: '80ms' }}>
            <h3 className="wst-card-title wst-title-beta"><Clock size={18} strokeWidth={2.5} aria-hidden="true" /> Beta</h3>
            <List items={BETA} icon={Clock} tone="beta" />
          </div>
          <div className="reveal wst-card" style={{ transitionDelay: '160ms' }}>
            <h3 className="wst-card-title wst-title-not-yet"><XCircle size={18} strokeWidth={2.5} aria-hidden="true" /> Not yet</h3>
            <List items={NOT_YET} icon={XCircle} tone="not-yet" />
          </div>
        </div>
      </div>
      <style>{`
        .wst-section { background: var(--mist); }
        .wst-header { text-align: center; max-width: 620px; margin: 0 auto 48px; }
        .wst-headline { font-size: clamp(26px, 3.2vw, 40px); color: var(--ink); margin: 12px 0 14px; }
        .wst-sub { font-size: 16px; color: var(--muted); line-height: 1.65; }
        .wst-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
        .wst-card {
          background: #fff; border: 1px solid var(--border); border-radius: var(--radius-lg);
          padding: 28px 26px;
        }
        .wst-card-title {
          display: flex; align-items: center; gap: 8px;
          font-size: 16px; font-weight: 700; margin-bottom: 18px;
        }
        .wst-title-shipped { color: var(--success-text); }
        .wst-title-beta { color: var(--warning-text); }
        .wst-title-not-yet { color: var(--steel-text); }
        .wst-list { display: flex; flex-direction: column; gap: 12px; }
        .wst-item { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: var(--muted); line-height: 1.5; }
        .wst-shipped .wst-item svg { color: #1E9E5A; flex-shrink: 0; margin-top: 1px; }
        .wst-beta .wst-item svg { color: #E5A016; flex-shrink: 0; margin-top: 1px; }
        .wst-not-yet .wst-item svg { color: var(--border); flex-shrink: 0; margin-top: 1px; }
        .wst-not-yet .wst-item { color: var(--steel-text); }
        @media (max-width: 900px) { .wst-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
