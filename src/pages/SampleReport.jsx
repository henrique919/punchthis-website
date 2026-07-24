import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import PhoneMockup from '../components/PhoneMockup'
import FinalCTA from '../components/FinalCTA'
import Seo from '../components/Seo'
import reportBuilderImg from '../assets/app-screens/report-builder.png'
import reportPreviewImg from '../assets/app-screens/report-preview.png'

// What actually prints in the PDF — traceable to the app's ReportOptions.
const INCLUDES = [
  { label: 'Cover page', desc: 'Project, client, inspector, reference and date.' },
  { label: 'Status summary', desc: 'Counts by status: open, assigned, in progress, completed.' },
  { label: 'Hit list', desc: 'Every item in one table — location, assignee, status, priority.' },
  { label: 'Annotated photos', desc: 'Full-resolution images with your markup and privacy redaction intact.' },
  { label: 'Grouped item detail', desc: 'One block per item, grouped by location or assignee.' },
  { label: 'Sign-off block', desc: 'Signature lines for closeout and handover.' },
]

const THEMES = [
  { name: 'Site Walk', desc: 'Fast field report — compact and issue-dense. For daily and weekly walks.' },
  { name: 'Client', desc: 'Polished, full report for clients — strong cover, premium spacing, every section.' },
  { name: 'Closeout', desc: 'Formal closeout — status-focused with a sign-off block for substantial completion and turnover.' },
]

export default function SampleReport() {
  const ref1 = useReveal()
  const ref2 = useReveal()
  const ref3 = useReveal()

  return (
    <>
      <Seo
        title="Sample inspection report"
        description="See a real PunchThis PDF inspection report — cover page, status summary, hit list and annotated photos, in three themes: Site Walk, Client and Closeout."
        path="/sample-report"
      />

      {/* Hero */}
      <section className="sr-hero dark-hero" aria-labelledby="sr-heading">
        <div className="page-hero-grid" aria-hidden="true" />
        <div className="container sr-hero-inner">
          <div ref={ref1} style={{ position: 'relative', zIndex: 1 }}>
            <p className="reveal section-label" style={{ color: '#7AAEFF' }}>SAMPLE REPORT</p>
            <h1 id="sr-heading" className="reveal sr-title">
              This is the report you send.
            </h1>
            <p className="reveal sr-sub">
              The finished PDF is the whole point of PunchThis. Capture on site, mark up the photo, and
              generate a clean, professional inspection report — before you leave the jobsite.
            </p>
            <div className="reveal" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/early-access" className="btn btn-primary">Get early access <ArrowRight size={16} /></Link>
              <Link to="/reports" className="btn btn-ghost">How reports work</Link>
            </div>
          </div>
          <div className="reveal sr-hero-phones" ref={ref1}>
            <div style={{ transform: 'rotate(-3deg)', filter: 'brightness(0.9)', marginRight: -16 }}>
              <PhoneMockup maxWidth={200} label="Real PunchThis report builder screen" image={reportBuilderImg} />
            </div>
            <PhoneMockup maxWidth={216} label="Real PunchThis PDF report preview screen" image={reportPreviewImg} />
          </div>
        </div>
        <style>{`
          .sr-hero { background: var(--slate); position: relative; overflow: hidden; padding: 100px 0 80px; }
          .page-hero-grid { position: absolute; inset: 0; pointer-events: none; background-image: linear-gradient(rgba(76,130,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(76,130,255,0.05) 1px,transparent 1px); background-size: 44px 44px; }
          .sr-hero-inner { display: grid; grid-template-columns: 1fr auto; gap: 64px; align-items: center; }
          .sr-title { font-size: clamp(34px,4.5vw,58px); color: #fff; font-family: var(--font-display); letter-spacing: -0.025em; margin-bottom: 20px; }
          .sr-sub { font-size: 18px; color: #9DA9B4; line-height: 1.7; max-width: 520px; margin-bottom: 28px; }
          .sr-hero-phones { display: flex; align-items: flex-end; }
          @media (max-width: 900px) { .sr-hero-inner { grid-template-columns: 1fr; } .sr-hero-phones { justify-content: center; } }
          @media (max-width: 480px) { .sr-hero-phones > div:first-child { display: none; } }
        `}</style>
      </section>

      {/* What's in the report */}
      <section ref={ref2} className="section" style={{ background: 'var(--white)' }} aria-labelledby="sr-includes-heading">
        <div className="container">
          <div className="reveal" style={{ marginBottom: 48 }}>
            <p className="section-label">WHAT'S IN IT</p>
            <h2 id="sr-includes-heading" style={{ fontSize: 'clamp(24px,3vw,38px)', color: 'var(--ink)', fontFamily: 'var(--font-display)', marginTop: 12, maxWidth: 520 }}>
              Everything a client-ready report needs. Nothing you have to retype.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 16 }}>
            {INCLUDES.map((s, i) => (
              <div key={s.label} className="reveal" style={{ transitionDelay: `${i * 60}ms`, background: 'var(--mist)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px 22px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
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

      {/* Three themes */}
      <section ref={ref3} className="section" style={{ background: 'var(--mist)' }} aria-labelledby="sr-themes-heading">
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
            <p className="section-label">ONE APP, THREE REPORTS</p>
            <h2 id="sr-themes-heading" style={{ fontSize: 'clamp(24px,3vw,38px)', color: 'var(--ink)', fontFamily: 'var(--font-display)', marginTop: 12 }}>
              The right report for every situation.
            </h2>
          </div>
          <div className="sr-themes-grid">
            {THEMES.map((t, i) => (
              <div key={t.name} className="reveal" style={{ transitionDelay: `${i * 80}ms`, background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 24px' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--cobalt-soft)', color: 'var(--cobalt-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, fontSize: 14, fontWeight: 700 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>{t.name}</h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65 }}>{t.desc}</p>
              </div>
            ))}
          </div>
          <p className="reveal" style={{ textAlign: 'center', marginTop: 28, fontSize: 13, color: 'var(--steel-text)' }}>
            Screens are real PunchThis release-build reports from the app's sample project.
          </p>
        </div>
        <style>{`
          .sr-themes-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
          @media (max-width: 640px) { .sr-themes-grid { grid-template-columns: 1fr; } }
        `}</style>
      </section>

      <FinalCTA />
    </>
  )
}
