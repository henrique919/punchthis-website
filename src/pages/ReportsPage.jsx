import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import PhoneMockup from '../components/PhoneMockup'
import FinalCTA from '../components/FinalCTA'
import Seo from '../components/Seo'
import reportBuilderImg from '../assets/app-screens/report-builder.png'
import reportPreviewImg from '../assets/app-screens/report-preview.png'

const REPORT_SECTIONS = [
  { label: 'Cover page',          desc: 'Project name, date, inspector and client details.' },
  { label: 'Executive summary',   desc: 'Issue counts broken down by status — open, assigned, in progress and completed.' },
  { label: 'Annotated photos',    desc: 'Full-resolution images with all markup intact.' },
  { label: 'Include completed',   desc: 'Optionally include completed issues for a full record.' },
  { label: 'Signature section',   desc: 'Approval block for sign-off on handovers and closeout.' },
  { label: 'Group by Location',   desc: 'Organize issues by zone, floor or area for easier navigation.' },
]

const REPORT_TYPES = [
  { name: 'Site walk',     desc: 'A quick daily or weekly inspection record — focused, light, fast to produce.' },
  { name: 'Client report', desc: 'A full, professional report for clients: cover page, summary, annotated evidence, all sections.' },
  { name: 'Closeout',      desc: 'A closeout report for substantial completion, turnover and final sign-off, with a signature section.' },
]

export default function ReportsPage() {
  const ref1 = useReveal()
  const ref2 = useReveal()
  const ref3 = useReveal()

  return (
    <>
      <Seo
        title="Reports"
        description="Turn site evidence into a client-ready PDF report. Choose contents, include annotated photos, and preview before you share."
        path="/reports"
      />
      {/* Hero */}
      <section className="reports-page-hero dark-hero" aria-labelledby="reports-page-heading">
        <div className="page-hero-grid" aria-hidden="true" />
        <div className="container reports-page-hero-inner">
          <div ref={ref1} style={{ position: 'relative', zIndex: 1 }}>
            <p className="reveal section-label" style={{ color: '#7AAEFF' }}>REPORTS</p>
            <h1 id="reports-page-heading" className="reveal" style={{ fontSize: 'clamp(34px,4.5vw,58px)', color: '#fff', fontFamily: 'var(--font-display)', letterSpacing: '-0.025em', marginBottom: 20 }}>
              Turn site evidence into<br />a client-ready report.
            </h1>
            <p className="reveal" style={{ fontSize: 18, color: '#9DA9B4', lineHeight: 1.7, maxWidth: 500, marginBottom: 28 }}>
              Choose the contents, include annotated photos, organize by location and preview the finished PDF before you share it.
            </p>
            <div className="reveal" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/early-access" className="btn btn-primary">Get early access <ArrowRight size={16}/></Link>
              <Link to="/how-it-works" className="btn btn-ghost">See how it works</Link>
            </div>
          </div>
          <div className="reveal report-hero-phones" ref={ref1}>
            <div style={{ transform: 'rotate(-3deg)', filter: 'brightness(0.88)', marginRight: -16 }}>
              <PhoneMockup maxWidth={195} label="Real PunchThis report builder screen" image={reportBuilderImg} />
            </div>
            <PhoneMockup maxWidth={210} label="Real PunchThis PDF report preview screen" image={reportPreviewImg} />
          </div>
        </div>
        <style>{`
          .dark-hero,.reports-page-hero { background: var(--slate); position: relative; overflow: hidden; padding: 100px 0 80px; }
          .page-hero-grid {
            position: absolute; inset: 0; pointer-events: none;
            background-image: linear-gradient(rgba(76,130,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(76,130,255,0.05) 1px,transparent 1px);
            background-size: 44px 44px;
          }
          .reports-page-hero-inner { display: grid; grid-template-columns: 1fr auto; gap: 64px; align-items: center; position: relative; z-index: 1; }
          .report-hero-phones { display: flex; align-items: flex-end; }
          @media (max-width: 900px) {
            .reports-page-hero-inner { grid-template-columns: 1fr; }
            .report-hero-phones { justify-content: center; }
          }
          @media (max-width: 480px) { .report-hero-phones > div:first-child { display: none; } }
        `}</style>
      </section>

      {/* Report types */}
      <section ref={ref2} className="section" style={{ background: 'var(--white)' }} aria-labelledby="report-types-heading">
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
            <p className="section-label">REPORT TYPES</p>
            <h2 id="report-types-heading" style={{ fontSize: 'clamp(24px,3vw,38px)', color: 'var(--ink)', fontFamily: 'var(--font-display)', marginTop: 12 }}>
              The right report for every situation.
            </h2>
          </div>
          <div className="report-types-grid">
            {REPORT_TYPES.map((t, i) => (
              <div key={t.name} className="reveal" style={{ transitionDelay: `${i * 80}ms`, background: 'var(--mist)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 24px' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--cobalt-soft)', color: 'var(--cobalt-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, fontSize: 14, fontWeight: 700 }}>
                  {String(i + 1).padStart(2,'0')}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>{t.name}</h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .report-types-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
          @media (max-width: 640px) { .report-types-grid { grid-template-columns: 1fr; } }
        `}</style>
      </section>

      {/* Report contents */}
      <section ref={ref3} className="section" style={{ background: 'var(--mist)' }} aria-labelledby="report-contents-heading">
        <div className="container">
          <div className="reveal" style={{ marginBottom: 48 }}>
            <p className="section-label">WHAT GOES IN</p>
            <h2 id="report-contents-heading" style={{ fontSize: 'clamp(24px,3vw,38px)', color: 'var(--ink)', fontFamily: 'var(--font-display)', marginTop: 12, maxWidth: 480 }}>
              Choose exactly what each report includes.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 16 }}>
            {REPORT_SECTIONS.map((s, i) => (
              <div key={s.label} className="reveal" style={{ transitionDelay: `${i * 60}ms`, background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px 22px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <Check size={16} strokeWidth={3} color="var(--cobalt)" style={{ marginTop: 2, flexShrink: 0 }} aria-hidden="true" />
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{s.label}</p>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
