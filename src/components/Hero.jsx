import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef } from 'react'
import PhoneMockup from './PhoneMockup'
import CaptureAnimation from './CaptureAnimation'
import { HERO } from '../config/content'
import captureSessionImg from '../assets/app-screens/capture-session.png'
import reportPreviewImg from '../assets/app-screens/report-preview.png'

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const items = el.querySelectorAll('.hero-reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('hero-in'), i * 90)
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.05 })
    items.forEach((t) => obs.observe(t))
    return () => obs.disconnect()
  }, [])

  const lines = HERO.headline.split('\n')

  // react-router's <Link> does client-side navigation and won't trigger the
  // browser's native scroll-to-hash — handle same-page anchors ourselves.
  function handleSecondaryCta(e) {
    const hashIndex = HERO.secondaryCta.href.indexOf('#')
    if (hashIndex === -1) return
    const target = document.getElementById(HERO.secondaryCta.href.slice(hashIndex + 1))
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      ref={heroRef}
      className="hero"
      aria-labelledby="hero-heading"
    >
      {/* Blueprint grid overlay */}
      <div className="hero-grid" aria-hidden="true" />
      {/* Radial highlight */}
      <div className="hero-radial" aria-hidden="true" />

      <div className="container hero-inner">
        {/* Copy column */}
        <div className="hero-copy">
          <p className="hero-reveal eyebrow" style={{ color: '#7AAEFF' }}>
            {HERO.eyebrow}
          </p>
          <h1 id="hero-heading" className="hero-reveal hero-headline">
            {lines.map((l, i) => <span key={i}>{l}{i < lines.length - 1 && <br />}</span>)}
          </h1>
          <p className="hero-reveal hero-body">{HERO.body}</p>
          <p className="hero-reveal hero-audience">{HERO.audienceLine}</p>

          <div className="hero-reveal hero-actions">
            <Link to={HERO.primaryCta.href} className="btn btn-primary hero-cta-primary">
              {HERO.primaryCta.label}
              <ArrowRight size={17} />
            </Link>
            <Link to={HERO.secondaryCta.href} onClick={handleSecondaryCta} className="btn btn-ghost">
              {HERO.secondaryCta.label}
            </Link>
          </div>

          <p className="hero-reveal hero-reassurance">{HERO.reassurance}</p>
        </div>

        {/* Phones column — real release-build screenshots (sample seed data), not mockups */}
        <div className="hero-phones" aria-label="Real PunchThis screenshots: capture session and PDF report preview, plus an animated preview of capturing and marking up a site issue, all shown with the app's sample data">
          {/* Left phone (back) — Capture */}
          <div className="phone-left hero-reveal">
            <PhoneMockup maxWidth={195} label="Real PunchThis capture session screen" image={captureSessionImg} priority />
          </div>
          {/* Centre phone (front) — animated capture → markup → save */}
          <div className="phone-centre hero-reveal">
            <CaptureAnimation maxWidth={240} />
          </div>
          {/* Right phone (back) — PDF */}
          <div className="phone-right hero-reveal">
            <PhoneMockup maxWidth={195} label="Real PunchThis PDF report preview screen" image={reportPreviewImg} priority />
          </div>
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          background: var(--ink);
          min-height: calc(100svh - 68px);
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 80px 0 60px;
        }
        .hero-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(76,130,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(76,130,255,0.06) 1px, transparent 1px);
          background-size: 44px 44px;
        }
        .hero-radial {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(80% 70% at 30% 40%, rgba(76,130,255,0.12) 0%, transparent 70%);
        }
        .hero-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
          position: relative; z-index: 1;
        }
        .hero-copy { display: flex; flex-direction: column; gap: 20px; }
        .hero-headline {
          font-size: clamp(36px, 5vw, 62px);
          font-weight: 700;
          color: var(--white);
          line-height: 1.1;
          letter-spacing: -0.025em;
        }
        .hero-body { font-size: 18px; color: #B0BBC5; line-height: 1.65; max-width: 480px; }
        .hero-audience { font-size: 14px; color: #8B9BAA; font-weight: 500; }
        .hero-actions { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-top: 4px; }
        .hero-cta-primary { font-size: 16px; padding: 15px 28px; }
        .hero-reassurance { font-size: 13px; color: #5A6B79; font-weight: 600; letter-spacing: 0.03em; margin-top: -4px; }

        /* Phones layout */
        .hero-phones {
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 0;
          padding-bottom: 24px;
          min-height: 460px;
        }
        .phone-left {
          position: relative; z-index: 1; flex-shrink: 0;
          width: 195px;
          margin-right: -28px; margin-bottom: 20px;
          transform: rotate(-4deg);
          filter: brightness(0.85);
        }
        .phone-centre { position: relative; z-index: 3; flex-shrink: 0; width: 240px; }
        .phone-right {
          position: relative; z-index: 1; flex-shrink: 0;
          width: 195px;
          margin-left: -28px; margin-bottom: 20px;
          transform: rotate(4deg);
          filter: brightness(0.85);
        }

        /* Text stagger — starts hidden, animates in */
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* Phone slide — starts VISIBLE, just glides up from slight offset */
        @keyframes heroPhoneUp {
          from { transform: translateY(28px); }
          to   { transform: translateY(0); }
        }
        .hero-reveal { opacity: 1; }
        .hero-copy > .hero-reveal:nth-child(1) { animation: heroFadeUp 0.55s ease 0.05s both; }
        .hero-copy > .hero-reveal:nth-child(2) { animation: heroFadeUp 0.55s ease 0.12s both; }
        .hero-copy > .hero-reveal:nth-child(3) { animation: heroFadeUp 0.55s ease 0.20s both; }
        .hero-copy > .hero-reveal:nth-child(4) { animation: heroFadeUp 0.55s ease 0.27s both; }
        .hero-copy > .hero-reveal:nth-child(5) { animation: heroFadeUp 0.55s ease 0.34s both; }
        .hero-copy > .hero-reveal:nth-child(6) { animation: heroFadeUp 0.55s ease 0.40s both; }
        /* Phones always visible — opacity never touched */
        .phone-centre { animation: heroPhoneUp 0.8s cubic-bezier(0.16,1,0.3,1) 0s both; }
        .phone-left   { animation: heroPhoneUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.08s both; }
        .phone-right  { animation: heroPhoneUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.08s both; }
        @media (prefers-reduced-motion: reduce) {
          .hero-reveal, .phone-left, .phone-centre, .phone-right { animation: none !important; opacity: 1 !important; transform: none !important; }
        }

        @media (max-width: 900px) {
          .hero { padding: 56px 0 48px; min-height: auto; }
          .hero-inner { grid-template-columns: 1fr; gap: 48px; }
          .hero-copy { text-align: center; align-items: center; }
          .hero-body, .hero-audience { max-width: 100%; }
          .hero-phones { min-height: 380px; }
          .phone-left  { width: 44%; margin-right: -22px; }
          .phone-centre{ width: 56%; }
          .phone-right { width: 44%; margin-left: -22px; }
        }
        @media (max-width: 480px) {
          .hero-phones { min-height: 300px; }
          .phone-left, .phone-right { display: none; }
          .phone-centre { width: 80%; max-width: 280px; }
          .hero-actions { flex-direction: column; width: 100%; }
          .hero-actions .btn { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  )
}
