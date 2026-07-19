import { Link } from 'react-router-dom'
import { ArrowRight, Info } from 'lucide-react'
import { PROVISIONAL_NOTICE } from '../config/legalContent'
import Seo from './Seo'

/**
 * Shared chrome for the four legal/support routes. `sections` is an array
 * of { title, body } — body may contain \n\n for paragraph breaks.
 */
export default function LegalLayout({ eyebrow, title, intro, updated, sections, showProvisionalNotice = true, path, seoDescription }) {
  return (
    <>
      <Seo title={title} description={seoDescription || intro} path={path} />
      <section className="legal-hero dark-hero" aria-labelledby="legal-heading">
        <div className="page-hero-grid" aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 680 }}>
            <p className="section-label" style={{ color: '#7AAEFF' }}>{eyebrow}</p>
            <h1 id="legal-heading" className="legal-headline">{title}</h1>
            {intro && <p className="legal-intro">{intro}</p>}
            {updated && <p className="legal-updated">Last updated {updated}</p>}
          </div>
        </div>
        <style>{`
          .legal-hero { background: var(--ink); position: relative; overflow: hidden; padding: 88px 0 56px; }
          .page-hero-grid {
            position: absolute; inset: 0; pointer-events: none;
            background-image: linear-gradient(rgba(76,130,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(76,130,255,0.06) 1px,transparent 1px);
            background-size: 44px 44px;
          }
          .legal-headline { font-size: clamp(30px, 4vw, 46px); color: #fff; letter-spacing: -0.02em; margin: 12px 0 16px; }
          .legal-intro { font-size: 17px; color: #9DA9B4; line-height: 1.7; max-width: 560px; }
          .legal-updated { font-size: 13px; color: #5A6B79; font-weight: 600; margin-top: 14px; }
        `}</style>
      </section>

      <section className="section legal-body">
        <div className="container legal-container">
          {showProvisionalNotice && (
            <div className="legal-notice" role="note">
              <Info size={16} aria-hidden="true" />
              <span>{PROVISIONAL_NOTICE}</span>
            </div>
          )}

          {sections.map((s) => (
            <article key={s.title} className="legal-section">
              <h2 className="legal-section-title">{s.title}</h2>
              {s.body.split('\n\n').map((p, i) => (
                <p key={i} className="legal-section-body">{p}</p>
              ))}
            </article>
          ))}

          <div className="legal-cta">
            <Link to="/early-access" className="btn btn-primary">
              Get early access <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <style>{`
          .legal-body { background: var(--white); }
          .legal-container { max-width: 720px; }
          .legal-notice {
            display: flex; align-items: flex-start; gap: 10px;
            background: var(--warning-soft); border: 1px solid var(--warning);
            color: #92600A; border-radius: var(--radius-md);
            padding: 14px 16px; font-size: 13px; font-weight: 600; line-height: 1.5;
            margin-bottom: 44px;
          }
          .legal-notice svg { flex-shrink: 0; margin-top: 1px; color: #92600A; }
          .legal-section { margin-bottom: 36px; }
          .legal-section-title { font-size: 19px; color: var(--ink); margin-bottom: 10px; }
          .legal-section-body { font-size: 15px; color: var(--muted); line-height: 1.75; margin-bottom: 10px; }
          .legal-section-body:last-child { margin-bottom: 0; }
          .legal-cta { margin-top: 48px; padding-top: 32px; border-top: 1px solid var(--border); }
        `}</style>
      </section>
    </>
  )
}
