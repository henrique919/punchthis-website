import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Seo from '../components/Seo'

export default function NotFound() {
  return (
    <section className="not-found-section" aria-labelledby="not-found-heading">
      <Seo title="Page not found" description="This page doesn't exist. Find your way back to PunchThis." path="/404" noindex />
      <div className="not-found-grid" aria-hidden="true" />
      <div className="container not-found-inner">
        <p className="section-label" style={{ color: '#7AAEFF' }}>404</p>
        <h1 id="not-found-heading" className="not-found-headline">That page doesn't exist.</h1>
        <p className="not-found-body">
          The link may be out of date, or the page may have moved. Here are some good places to go instead.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">Go to homepage <ArrowRight size={16} /></Link>
          <Link to="/product" className="btn btn-ghost">See the product</Link>
          <Link to="/early-access" className="btn btn-ghost">Get early access</Link>
        </div>
      </div>
      <style>{`
        .not-found-section {
          position: relative; min-height: 70svh;
          background: var(--ink);
          display: flex; align-items: center;
          padding: 100px 0; overflow: hidden;
        }
        .not-found-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image: linear-gradient(rgba(76,130,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(76,130,255,0.06) 1px,transparent 1px);
          background-size: 44px 44px;
        }
        .not-found-inner { position: relative; z-index: 1; max-width: 560px; }
        .not-found-headline { font-size: clamp(32px, 4vw, 48px); color: #fff; margin: 12px 0 16px; letter-spacing: -0.02em; }
        .not-found-body { font-size: 17px; color: #9DA9B4; line-height: 1.7; margin-bottom: 28px; }
        .not-found-actions { display: flex; gap: 14px; flex-wrap: wrap; }
      `}</style>
    </section>
  )
}
