import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import WorkflowSection from '../components/WorkflowSection'
import FinalCTA from '../components/FinalCTA'
import AudienceSection from '../components/AudienceSection'

const LIFECYCLE = [
  { status: 'Open',        color: '#C93B3B', bg: '#FBEBEB', desc: 'Issue raised on site. Photo captured, markup applied, location set.' },
  { status: 'Assigned',    color: '#E5A016', bg: '#FDF3E0', desc: 'Responsible trade or person assigned. They can see exactly what is needed.' },
  { status: 'In Progress', color: '#4C82FF', bg: '#EAF1FF', desc: 'Work is underway. The issue remains visible on the hit list until closed.' },
  { status: 'For Review',  color: '#7B61E0', bg: '#EEEAFB', desc: 'Contractor has marked the work done. Awaiting inspection and sign-off.' },
  { status: 'Verified',    color: '#1E9E5A', bg: '#E7F3EC', desc: 'Work confirmed on site. Issue closed. Captured in the final report.' },
]

export default function HowItWorks() {
  const ref = useReveal()
  return (
    <>
      {/* Page hero */}
      <section className="hiw-hero dark-hero" aria-labelledby="hiw-heading">
        <div className="page-hero-grid" aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 680, margin: '0 auto', textAlign: 'center', alignItems: 'center' }}>
            <p className="reveal section-label" style={{ color: '#7AAEFF' }}>HOW IT WORKS</p>
            <h1 id="hiw-heading" className="reveal" style={{ fontSize: 'clamp(34px,4.5vw,58px)', color: '#fff', fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}>
              From the first photo to the final report.
            </h1>
            <p className="reveal" style={{ fontSize: 18, color: '#9DA9B4', lineHeight: 1.7, maxWidth: 520 }}>
              PunchThis is built around four steps that connect every part of the site inspection process—from capture to verified close-out.
            </p>
            <div className="reveal" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/early-access" className="btn btn-primary">Get early access <ArrowRight size={16}/></Link>
              <Link to="/product" className="btn btn-ghost">See the product</Link>
            </div>
          </div>
        </div>
        <style>{`
          .hiw-hero,.dark-hero { background: var(--ink); position: relative; overflow: hidden; padding: 100px 0 80px; }
          .page-hero-grid {
            position: absolute; inset: 0; pointer-events: none;
            background-image: linear-gradient(rgba(76,130,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(76,130,255,0.06) 1px,transparent 1px);
            background-size: 44px 44px;
          }
        `}</style>
      </section>

      <WorkflowSection />

      {/* Issue lifecycle */}
      <section className="section" style={{ background: 'var(--mist)' }} aria-labelledby="lifecycle-heading">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p className="section-label">ISSUE LIFECYCLE</p>
            <h2 id="lifecycle-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3vw,38px)', color: 'var(--ink)', marginTop: 12 }}>
              Every issue has a clear path to close-out.
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 680, margin: '0 auto' }}>
            {LIFECYCLE.map((l, i) => (
              <div key={l.status} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: l.bg, border: `2px solid ${l.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: l.color, display: 'block' }} aria-hidden="true" />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: l.bg, color: l.color, fontSize: 10, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 999, marginBottom: 6 }}>
                    {l.status}
                  </span>
                  <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.5 }}>{l.desc}</p>
                </div>
                {i < LIFECYCLE.length - 1 && (
                  <div style={{ position: 'absolute', left: 60, marginTop: 52, color: 'var(--border)', fontSize: 18 }} aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <AudienceSection />
      <FinalCTA />
    </>
  )
}
