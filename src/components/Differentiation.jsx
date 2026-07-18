import { useReveal } from '../hooks/useReveal'
import { DIFFERENTIATION } from '../config/content'

export default function Differentiation() {
  const ref = useReveal()
  return (
    <section ref={ref} className="diff-section section" aria-labelledby="diff-heading">
      <div className="container">
        <div className="diff-header reveal">
          <h2 id="diff-heading" className="diff-headline">{DIFFERENTIATION.headline}</h2>
        </div>

        {/* Flow diagram */}
        <div className="reveal diff-flow" role="list" aria-label="Close-out workflow">
          {DIFFERENTIATION.flow.map((step, i) => (
            <div key={step} className="diff-flow-inner" role="listitem">
              <div className="flow-step">{step}</div>
              {i < DIFFERENTIATION.flow.length - 1 && (
                <div className="flow-arrow" aria-hidden="true">→</div>
              )}
            </div>
          ))}
        </div>

        <p className="reveal diff-body">{DIFFERENTIATION.body}</p>

        {/* Statement cards */}
        <div className="diff-points">
          {DIFFERENTIATION.points.map((p, i) => (
            <div key={p} className="reveal diff-point" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="diff-point-num">{String(i + 1).padStart(2, '0')}</div>
              <p className="diff-point-text">{p}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .diff-section { background: var(--carbon); }
        .diff-header { text-align: center; margin-bottom: 56px; }
        .diff-headline { font-size: clamp(26px, 3.2vw, 42px); color: var(--white); max-width: 640px; margin: 0 auto; }

        .diff-flow {
          display: flex; align-items: center; justify-content: center;
          flex-wrap: wrap; gap: 0; margin-bottom: 56px;
        }
        .diff-flow-inner { display: flex; align-items: center; gap: 0; }
        .flow-step {
          padding: 10px 20px; border-radius: 8px;
          background: rgba(76,130,255,0.12); border: 1px solid rgba(76,130,255,0.25);
          font-size: 14px; font-weight: 700; color: #7AAEFF;
          white-space: nowrap;
        }
        .flow-arrow { font-size: 18px; color: #3A4C5C; padding: 0 10px; }

        .diff-body {
          text-align: center; font-size: 17px; color: #7E8B96;
          max-width: 560px; margin: 0 auto 64px; line-height: 1.7;
        }

        .diff-points {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
        }
        .diff-point {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: var(--radius-lg);
          padding: 28px 26px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .diff-point-num {
          font-family: var(--font-display); font-size: 13px; font-weight: 700;
          color: var(--cobalt); letter-spacing: 0.06em;
        }
        .diff-point-text { font-size: 16px; font-weight: 600; color: #CBD2D8; line-height: 1.5; }

        @media (max-width: 900px) { .diff-points { grid-template-columns: 1fr; } }
        @media (max-width: 560px) {
          .flow-step { font-size: 12px; padding: 8px 12px; }
          .flow-arrow { padding: 0 6px; }
        }
      `}</style>
    </section>
  )
}
