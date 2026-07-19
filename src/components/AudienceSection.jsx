import { HardHat, Clipboard, Users, Building2 } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { AUDIENCE } from '../config/content'

const ICONS = { HardHat, Clipboard, Users, Building2 }

export default function AudienceSection() {
  const ref = useReveal()
  return (
    <section ref={ref} className="audience-section section" aria-labelledby="audience-heading">
      <div className="container">
        <div className="aud-header reveal">
          <h2 id="audience-heading" className="aud-headline">{AUDIENCE.headline}</h2>
          <p className="aud-sub">{AUDIENCE.subline}</p>
        </div>
        <ul className="aud-grid" role="list">
          {AUDIENCE.cards.map((c, i) => {
            const Icon = ICONS[c.icon] || HardHat
            return (
              <li key={c.title} className="aud-card reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="aud-icon" aria-hidden="true"><Icon size={24} strokeWidth={1.7} /></div>
                <h3 className="aud-title">{c.title}</h3>
                <p className="aud-body">{c.body}</p>
              </li>
            )
          })}
        </ul>
      </div>
      <style>{`
        .audience-section { background: var(--white); }
        .aud-header { text-align: center; margin-bottom: 56px; }
        .aud-headline { font-size: clamp(26px, 3vw, 42px); color: var(--ink); margin-bottom: 14px; }
        .aud-sub { font-size: 17px; color: var(--steel-text); max-width: 540px; margin: 0 auto; line-height: 1.6; }
        .aud-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .aud-card {
          background: var(--mist);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px 22px;
          display: flex; flex-direction: column; gap: 14px;
          transition: box-shadow 0.2s, transform 0.2s, opacity 0.55s ease, transform 0.55s ease;
        }
        .aud-card:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); }
        .aud-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: var(--white); border: 1px solid var(--border);
          color: var(--ink);
          display: flex; align-items: center; justify-content: center;
        }
        .aud-title { font-size: 15px; font-weight: 700; color: var(--ink); }
        .aud-body  { font-size: 14px; color: var(--muted); line-height: 1.6; }
        @media (max-width: 1024px) { .aud-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px)  { .aud-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
