import { useState } from 'react'
import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import PhoneMockup from './PhoneMockup'
import MarkupScreen from '../screens/MarkupScreen'
import { MARKUP_SECTION } from '../config/content'

const TOOLS = [
  { id: 'arrow',  label: 'Arrow',  desc: 'Direct attention to the precise problem location.' },
  { id: 'circle', label: 'Circle', desc: 'Ring the affected area so nothing is missed.' },
  { id: 'box',    label: 'Box',    desc: 'Frame a zone — useful for surface areas and panels.' },
  { id: 'number', label: 'Number', desc: 'Sequence multiple items in one photo.' },
]

export default function MarkupShowcase() {
  const ref = useReveal()
  const [activeTool, setActiveTool] = useState('arrow')

  return (
    <section ref={ref} id="markup" className="markup-section section" aria-labelledby="markup-heading">
      <div className="container markup-inner">
        {/* Phone — large, left */}
        <div className="reveal markup-phone">
          <PhoneMockup maxWidth={290} label={`PunchThis markup studio — ${activeTool} tool selected`}>
            <MarkupScreen activeTool={activeTool} />
          </PhoneMockup>
        </div>

        {/* Copy + interactive — right */}
        <div className="markup-copy">
          <p className="reveal section-label">{MARKUP_SECTION.sectionLabel}</p>
          <h2 id="markup-heading" className="reveal markup-headline">{MARKUP_SECTION.headline}</h2>
          <p className="reveal markup-body">{MARKUP_SECTION.body}</p>

          {/* Tool selector */}
          <div className="reveal" role="group" aria-label="Markup tool demonstration">
            <p className="tool-label">Try the tools</p>
            <div className="tool-tabs">
              {TOOLS.map((t) => (
                <button
                  key={t.id}
                  className={`tool-tab${activeTool === t.id ? ' active' : ''}`}
                  onClick={() => setActiveTool(t.id)}
                  aria-pressed={activeTool === t.id}
                  aria-label={`${t.label} tool — ${t.desc}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <p className="tool-desc">{TOOLS.find((t) => t.id === activeTool)?.desc}</p>
          </div>

          {/* Benefit cards */}
          <div className="reveal markup-benefits">
            {MARKUP_SECTION.benefits.map((b) => (
              <div key={b.title} className="markup-benefit">
                <div className="benefit-icon"><Check size={14} strokeWidth={3} /></div>
                <div>
                  <p className="benefit-title">{b.title}</p>
                  <p className="benefit-body">{b.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ marginTop: 12 }}>
            <Link to="/markup" className="btn btn-outline">
              Learn more about markup →
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .markup-section { background: var(--mist); }
        .markup-inner {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 80px;
          align-items: center;
        }
        .markup-phone { display: flex; justify-content: center; }
        .markup-copy { display: flex; flex-direction: column; gap: 24px; }
        .markup-headline { font-size: clamp(28px, 3.5vw, 44px); color: var(--ink); }
        .markup-body { font-size: 17px; color: var(--muted); line-height: 1.7; }

        .tool-label {
          font-size: 11px; font-weight: 800; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--steel-text); margin-bottom: 10px;
        }
        .tool-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
        .tool-tab {
          min-height: 44px;
          padding: 8px 18px; border-radius: 8px; font-size: 14px; font-weight: 600;
          color: var(--muted); background: var(--white); border: 1.5px solid var(--border);
          transition: all 0.15s;
        }
        .tool-tab:hover { border-color: var(--cobalt); color: var(--cobalt-deep); }
        .tool-tab.active { background: var(--cobalt-deep); color: #fff; border-color: var(--cobalt-deep); }
        .tool-desc { font-size: 13px; color: var(--steel-text); min-height: 20px; }

        .markup-benefits { display: flex; flex-direction: column; gap: 16px; }
        .markup-benefit { display: flex; gap: 14px; align-items: flex-start; }
        .benefit-icon {
          width: 28px; height: 28px; border-radius: 8px;
          background: var(--cobalt-soft); color: var(--cobalt);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .benefit-title { font-size: 14px; font-weight: 700; color: var(--ink); margin-bottom: 3px; }
        .benefit-body  { font-size: 13px; color: var(--muted); line-height: 1.5; }

        @media (max-width: 900px) {
          .markup-inner { grid-template-columns: 1fr; gap: 48px; }
          .markup-phone { order: -1; }
          .markup-phone > div { max-width: 260px; margin: 0 auto; }
        }
      `}</style>
    </section>
  )
}
