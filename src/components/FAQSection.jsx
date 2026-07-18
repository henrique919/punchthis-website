import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

export default function FAQSection({ items, title = 'Frequently asked questions' }) {
  const ref = useReveal()
  const [open, setOpen] = useState(null)

  const toggle = (i) => setOpen((v) => (v === i ? null : i))

  return (
    <section ref={ref} id="faq" className="faq-section section" aria-labelledby="faq-heading">
      <div className="container faq-inner">
        <div className="faq-header reveal">
          <h2 id="faq-heading" className="faq-headline">{title}</h2>
        </div>
        <div className="faq-list">
          {items.map((item, i) => (
            <div key={i} className="reveal faq-item" style={{ transitionDelay: `${i * 40}ms` }}>
              <button
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-q-${i}`}
              >
                <span>{item.q}</span>
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s ease', flexShrink: 0 }}
                />
              </button>
              <div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-q-${i}`}
                className={`faq-answer${open === i ? ' open' : ''}`}
              >
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .faq-section { background: var(--white); }
        .faq-inner { max-width: 720px; margin: 0 auto; }
        .faq-header { text-align: center; margin-bottom: 56px; }
        .faq-headline { font-size: clamp(26px, 3vw, 40px); color: var(--ink); }
        .faq-list { display: flex; flex-direction: column; gap: 0; }
        .faq-item { border-bottom: 1px solid var(--border); }
        .faq-item:first-child { border-top: 1px solid var(--border); }
        .faq-question {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          gap: 16px; padding: 20px 4px;
          text-align: left; font-size: 16px; font-weight: 600; color: var(--ink);
          background: none; border: none; cursor: pointer;
          transition: color 0.15s;
        }
        .faq-question:hover { color: var(--cobalt); }
        .faq-answer {
          overflow: hidden; max-height: 0;
          transition: max-height 0.3s ease;
        }
        .faq-answer.open { max-height: 300px; }
        .faq-answer p {
          padding: 0 4px 20px;
          font-size: 15px; color: var(--muted); line-height: 1.7;
        }
      `}</style>
    </section>
  )
}
