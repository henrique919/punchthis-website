import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import PhoneMockup from '../components/PhoneMockup'
import MarkupScreen from '../screens/MarkupScreen'
import FinalCTA from '../components/FinalCTA'

const TOOLS = [
  { id: 'arrow',  label: 'Arrow',  icon: '↗',
    headline: 'Direct. Unmistakable.',
    body: 'Draw an arrow from any angle to point precisely at the defect. The direction and length communicate urgency without a single word.' },
  { id: 'circle', label: 'Circle', icon: '○',
    headline: 'Ring the fault area.',
    body: 'Circle a crack, stain or surface defect to show its full extent. Useful when the problem is a zone rather than a point.' },
  { id: 'box',    label: 'Box',    icon: '□',
    headline: 'Frame a surface or panel.',
    body: 'Box selection works best for wall panels, floor sections and areas that need to be fully replaced or treated.' },
  { id: 'number', label: 'Number', icon: '#',
    headline: 'Sequence multiple defects.',
    body: 'Number markers let you catalogue several issues in a single photo and reference them in your notes — one image, full clarity.' },
]

const PRINCIPLES = [
  { title: 'Annotations are permanent', body: 'Once saved, markup is embedded with the issue. It cannot be accidentally lost or separated from the evidence.' },
  { title: 'Every tool works with one thumb', body: 'The toolbar is designed for field use — no stylus, no precision mouse. Gloves, dirty hands, bright sunlight.' },
  { title: 'Markup travels into reports', body: 'Annotated photos are included automatically in your PDF report — no re-exporting, no re-uploading.' },
  { title: 'Undo is always one tap away', body: 'Made a mistake? Undo restores the last action without losing everything else. Redo brings it back if you change your mind.' },
]

function ToolDemo() {
  const ref = useReveal()
  const [active, setActive] = useState('arrow')
  const tool = TOOLS.find((t) => t.id === active)

  return (
    <section ref={ref} className="tool-demo section" aria-labelledby="tool-demo-heading">
      <div className="container tool-demo-inner">
        <div className="reveal tool-phone">
          <PhoneMockup maxWidth={300} label={`Markup tool demo — ${active} selected`}>
            <MarkupScreen activeTool={active} />
          </PhoneMockup>
        </div>
        <div className="tool-content">
          <p className="reveal section-label">THE TOOLKIT</p>
          <h2 id="tool-demo-heading" className="reveal tool-demo-heading">One toolbar. Every instruction.</h2>
          <p className="reveal tool-demo-sub">Select a tool to see it in action on the screen.</p>

          <div className="reveal tool-selector" role="radiogroup" aria-label="Select markup tool">
            {TOOLS.map((t) => (
              <button
                key={t.id}
                role="radio"
                aria-checked={active === t.id}
                className={`tool-card${active === t.id ? ' active' : ''}`}
                onClick={() => setActive(t.id)}
              >
                <span className="tc-icon" aria-hidden="true">{t.icon}</span>
                <span className="tc-label">{t.label}</span>
              </button>
            ))}
          </div>

          {tool && (
            <div className="reveal tool-detail">
              <h3 className="td-headline">{tool.headline}</h3>
              <p className="td-body">{tool.body}</p>
            </div>
          )}

          <div className="reveal" style={{ marginTop: 24 }}>
            <Link to="/early-access" className="btn btn-primary">
              Get early access <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
      <style>{`
        .tool-demo { background: var(--white); }
        .tool-demo-inner { display: grid; grid-template-columns: auto 1fr; gap: 80px; align-items: start; }
        .tool-phone { display: flex; justify-content: center; position: sticky; top: 100px; }
        .tool-content { display: flex; flex-direction: column; gap: 28px; }
        .tool-demo-heading { font-size: clamp(26px, 3vw, 40px); color: var(--ink); }
        .tool-demo-sub { font-size: 16px; color: var(--steel); }
        .tool-selector { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .tool-card {
          display: flex; align-items: center; gap: 12px;
          padding: 16px 18px; border-radius: 12px;
          border: 1.5px solid var(--border); background: var(--mist);
          font-family: var(--font-body); font-size: 15px; font-weight: 600; color: var(--ink);
          cursor: pointer; transition: all 0.15s; text-align: left;
        }
        .tool-card:hover { border-color: var(--cobalt); }
        .tool-card.active { border-color: var(--cobalt); background: var(--cobalt-soft); color: var(--cobalt-deep); }
        .tc-icon { font-size: 20px; line-height: 1; }
        .tool-detail { padding: 24px; background: var(--mist); border-radius: var(--radius-md); border: 1px solid var(--border); }
        .td-headline { font-size: 18px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
        .td-body { font-size: 15px; color: var(--muted); line-height: 1.7; }
        @media (max-width: 900px) {
          .tool-demo-inner { grid-template-columns: 1fr; gap: 40px; }
          .tool-phone { position: static; }
          .tool-phone > div { max-width: 260px; margin: 0 auto; }
        }
        @media (max-width: 480px) { .tool-selector { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </section>
  )
}

export default function MarkupPage() {
  const ref = useReveal()
  return (
    <>
      {/* Hero */}
      <section className="markup-page-hero dark-hero" aria-labelledby="markup-page-heading">
        <div className="page-hero-grid" aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 680 }}>
            <p className="reveal section-label" style={{ color: '#7AAEFF' }}>MARKUP</p>
            <h1 id="markup-page-heading" className="reveal" style={{ fontSize: 'clamp(34px,4.5vw,60px)', color: '#fff', fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}>
              Point to the problem.<br />Not just the photo.
            </h1>
            <p className="reveal" style={{ fontSize: 18, color: '#9DA9B4', lineHeight: 1.7, maxWidth: 520 }}>
              The PunchThis markup studio gives you every tool you need to make a defect unmistakable — directly on the evidence photo, before you leave site.
            </p>
            <div className="reveal" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/early-access" className="btn btn-primary">Get early access <ArrowRight size={16}/></Link>
              <Link to="/how-it-works" className="btn btn-ghost">See the workflow</Link>
            </div>
          </div>
        </div>
        <style>{`
          .markup-page-hero { background: var(--ink); position: relative; overflow: hidden; padding: 100px 0 80px; }
          .page-hero-grid {
            position: absolute; inset: 0; pointer-events: none;
            background-image: linear-gradient(rgba(76,130,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(76,130,255,0.06) 1px,transparent 1px);
            background-size: 44px 44px;
          }
        `}</style>
      </section>

      <ToolDemo />

      {/* Principles grid */}
      <section className="section" style={{ background: 'var(--mist)' }} aria-labelledby="principles-heading">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 id="principles-heading" style={{ fontSize: 'clamp(24px,3vw,38px)', color: 'var(--ink)', fontFamily: 'var(--font-display)' }}>
              Built for real field conditions.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 20 }}>
            {PRINCIPLES.map((p) => (
              <div key={p.title} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 24px' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
                  <Check size={16} strokeWidth={3} color="var(--cobalt)" style={{ marginTop: 2, flexShrink: 0 }} aria-hidden="true" />
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{p.title}</h3>
                </div>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65, paddingLeft: 26 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
