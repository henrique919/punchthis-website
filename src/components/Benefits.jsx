import { Camera, Pencil, BarChart2, MapPin, CheckCircle, FileText } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { BENEFITS } from '../config/content'

const ICONS = { Camera, Pencil, BarChart2, MapPin, CheckCircle, FileText }

export default function Benefits() {
  const ref = useReveal()
  return (
    <section ref={ref} className="benefits-section section" aria-labelledby="benefits-heading">
      <div className="container">
        <div className="benefits-header reveal">
          <p className="section-label">FIELD-READY FEATURES</p>
          <h2 id="benefits-heading">Everything you need. Nothing you don't.</h2>
          <p className="benefits-sub">Built specifically for site inspection work — not adapted from generic task tools.</p>
        </div>
        <ul className="benefits-grid" role="list">
          {BENEFITS.map((b, i) => {
            const Icon = ICONS[b.icon] || FileText
            return (
              <li key={b.title} className="benefit-card reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="bc-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.8} /></div>
                <h3 className="bc-title">{b.title}</h3>
                <p className="bc-body">{b.body}</p>
              </li>
            )
          })}
        </ul>
      </div>
      <style>{`
        .benefits-section { background: var(--mist); }
        .benefits-header { text-align: center; margin-bottom: 56px; }
        .benefits-header h2 { font-size: clamp(26px, 3vw, 40px); color: var(--ink); margin: 12px 0; }
        .benefits-sub { font-size: 17px; color: var(--steel); max-width: 500px; margin: 0 auto; }
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .benefit-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px 26px;
          display: flex; flex-direction: column; gap: 12px;
          transition: box-shadow 0.2s, transform 0.2s, opacity 0.55s ease, transform 0.55s ease;
        }
        .benefit-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-3px);
        }
        .bc-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: var(--cobalt-soft); color: var(--cobalt);
          display: flex; align-items: center; justify-content: center;
        }
        .bc-title { font-size: 16px; font-weight: 700; color: var(--ink); }
        .bc-body  { font-size: 14px; color: var(--muted); line-height: 1.6; }
        @media (max-width: 900px) { .benefits-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .benefits-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
