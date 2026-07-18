import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import FinalCTA from '../components/FinalCTA'
import { FAQ_ITEMS } from '../config/content'

function FAQCategory({ category, items }) {
  const [open, setOpen] = useState(null)
  return (
    <div className="faq-cat">
      <h2 className="faq-cat-heading">{category}</h2>
      <div className="faq-items">
        {items.map((item, i) => {
          const id = `${category}-${i}`
          return (
            <div key={id} className="faq-item">
              <button
                className="faq-q"
                onClick={() => setOpen(open === id ? null : id)}
                aria-expanded={open === id}
                aria-controls={`ans-${id}`}
                id={`btn-${id}`}
              >
                <span>{item.q}</span>
                <ChevronDown size={18} aria-hidden="true"
                  style={{ transform: open === id ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s', flexShrink: 0 }} />
              </button>
              <div id={`ans-${id}`} role="region" aria-labelledby={`btn-${id}`}
                className={`faq-a${open === id ? ' open' : ''}`}>
                <p>{item.a}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function FAQPage() {
  const ref = useReveal()
  return (
    <>
      {/* Hero */}
      <section className="faq-page-hero dark-hero" aria-labelledby="faq-page-heading">
        <div className="page-hero-grid" aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div ref={ref} style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
            <p className="reveal section-label" style={{ color: '#7AAEFF' }}>FAQ</p>
            <h1 id="faq-page-heading" className="reveal" style={{ fontSize: 'clamp(32px,4vw,52px)', color: '#fff', fontFamily: 'var(--font-display)', letterSpacing: '-0.025em', margin: '12px 0 20px' }}>
              Questions answered.
            </h1>
            <p className="reveal" style={{ fontSize: 17, color: '#9DA9B4', lineHeight: 1.7 }}>
              Everything you need to know about PunchThis—how it works, who it's for, and when it's coming.
            </p>
          </div>
        </div>
        <style>{`
          .faq-page-hero,.dark-hero { background: var(--ink); position: relative; overflow: hidden; padding: 100px 0 80px; }
          .page-hero-grid { position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(76,130,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(76,130,255,.06) 1px,transparent 1px);background-size:44px 44px; }
        `}</style>
      </section>

      {/* FAQ content */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container" style={{ maxWidth: 760, margin: '0 auto' }}>
          <div className="faq-page-grid">
            {FAQ_ITEMS.map((cat) => (
              <FAQCategory key={cat.category} category={cat.category} items={cat.items} />
            ))}
          </div>

          {/* Still have questions */}
          <div className="still-questions">
            <h2 style={{ fontSize: 22, fontFamily: 'var(--font-display)', color: 'var(--ink)', marginBottom: 10 }}>Still have a question?</h2>
            <p style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 20 }}>Drop us a line and we'll get back to you.</p>
            <a href="mailto:hello@punchthis.app" className="btn btn-outline">Contact us <ArrowRight size={15}/></a>
          </div>
        </div>
      </section>

      <FinalCTA />

      <style>{`
        .faq-page-grid { display: flex; flex-direction: column; gap: 56px; margin-bottom: 72px; }
        .faq-cat-heading { font-size: 13px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: var(--cobalt); margin-bottom: 20px; }
        .faq-items { display: flex; flex-direction: column; }
        .faq-item { border-bottom: 1px solid var(--border); }
        .faq-items .faq-item:first-child { border-top: 1px solid var(--border); }
        .faq-q {
          width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 16px;
          padding: 20px 4px; text-align: left; font-size: 16px; font-weight: 600; color: var(--ink);
          background: none; border: none; cursor: pointer; transition: color 0.15s;
        }
        .faq-q:hover { color: var(--cobalt); }
        .faq-a { overflow: hidden; max-height: 0; transition: max-height 0.3s ease; }
        .faq-a.open { max-height: 300px; }
        .faq-a p { padding: 0 4px 20px; font-size: 15px; color: var(--muted); line-height: 1.7; }
        .still-questions {
          border-top: 1px solid var(--border); padding-top: 48px; text-align: center;
        }
      `}</style>
    </>
  )
}
