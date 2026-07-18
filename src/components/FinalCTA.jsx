import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { FINAL_CTA, SITE } from '../config/content'

export default function FinalCTA() {
  const ref = useReveal()
  return (
    <section ref={ref} id="early-access" className="cta-section" aria-labelledby="cta-heading">
      <div className="container">
        <div className="cta-panel reveal">
          {/* Blueprint grid hint */}
          <div className="cta-grid" aria-hidden="true" />
          <div className="cta-glow" aria-hidden="true" />
          <div className="cta-content">
            <h2 id="cta-heading" className="cta-headline">{FINAL_CTA.headline}</h2>
            <p className="cta-body">{FINAL_CTA.body}</p>
            <div className="cta-actions">
              <Link to={FINAL_CTA.primaryCta.href} className="btn btn-primary cta-btn-primary">
                {FINAL_CTA.primaryCta.label}
                <ArrowRight size={18} />
              </Link>
              <Link to={FINAL_CTA.secondaryCta.href} className="btn btn-ghost-dark">
                {FINAL_CTA.secondaryCta.label}
              </Link>
            </div>
            <p className="cta-domain">
              <a href={`https://${SITE.domain}`} target="_blank" rel="noopener noreferrer">{SITE.domain}</a>
            </p>
          </div>
        </div>
      </div>
      <style>{`
        .cta-section { background: var(--carbon); padding: 80px 0; }
        .cta-panel {
          position: relative; overflow: hidden;
          background: var(--ink);
          border: 1px solid rgba(76,130,255,0.2);
          border-radius: var(--radius-xl);
          padding: 80px 64px;
          text-align: center;
        }
        .cta-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(76,130,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(76,130,255,0.08) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }
        .cta-glow {
          position: absolute; inset: 0;
          background: radial-gradient(80% 70% at 50% 0%, rgba(76,130,255,0.18) 0%, transparent 65%);
          pointer-events: none;
        }
        .cta-content { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 24px; }
        .cta-headline { font-size: clamp(28px, 3.5vw, 48px); color: var(--white); max-width: 680px; }
        .cta-body { font-size: 18px; color: #8B97A1; max-width: 480px; line-height: 1.65; }
        .cta-actions { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; margin-top: 8px; }
        .cta-btn-primary { font-size: 16px; padding: 15px 28px; }
        .cta-domain a { font-size: 13px; color: #3A5070; font-weight: 600; transition: color 0.15s; }
        .cta-domain a:hover { color: #4C82FF; }
        @media (max-width: 768px) {
          .cta-panel { padding: 56px 32px; }
          .cta-actions { flex-direction: column; width: 100%; max-width: 320px; }
          .cta-actions .btn { width: 100%; justify-content: center; }
        }
        @media (max-width: 480px) { .cta-panel { padding: 48px 24px; } }
      `}</style>
    </section>
  )
}
