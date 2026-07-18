import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { TRUST_STRIP } from '../config/content'

export default function TrustStrip() {
  const ref = useReveal()
  return (
    <section ref={ref} className="trust-strip" aria-label="Use cases">
      <div className="container trust-inner">
        <p className="reveal trust-heading">{TRUST_STRIP.heading}</p>
        <ul className="reveal trust-list" role="list">
          {TRUST_STRIP.useCases.map((uc, i) => (
            <li key={uc} className="trust-item">
              {i > 0 && <span className="trust-dot" aria-hidden="true" />}
              <span>{uc}</span>
            </li>
          ))}
        </ul>
      </div>
      <style>{`
        .trust-strip {
          background: var(--white);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 36px 0;
        }
        .trust-inner { display: flex; flex-direction: column; gap: 16px; align-items: center; text-align: center; }
        .trust-heading {
          font-size: 15px; font-weight: 600; color: var(--muted);
          max-width: 560px; line-height: 1.5;
        }
        .trust-list {
          display: flex; flex-wrap: wrap; align-items: center;
          justify-content: center; gap: 0;
        }
        .trust-item {
          display: flex; align-items: center; gap: 0;
          font-size: 14px; font-weight: 700; color: var(--ink);
          letter-spacing: 0.01em;
        }
        .trust-dot {
          display: inline-block;
          width: 4px; height: 4px; border-radius: 50%;
          background: var(--cobalt); margin: 0 16px;
        }
        @media (max-width: 560px) {
          .trust-item { font-size: 13px; }
          .trust-dot { margin: 0 10px; }
        }
      `}</style>
    </section>
  )
}
