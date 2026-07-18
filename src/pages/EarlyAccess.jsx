import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { SITE } from '../config/content'
import { Check, ArrowRight } from 'lucide-react'

const BENEFITS = [
  'First to know when the app launches',
  'Access to the beta programme',
  'Input on features and workflow',
  'Founder pricing when available',
]

export default function EarlyAccess() {
  const ref = useReveal()
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    // No backend — opens mailto with prefilled details.
    // Replace with a real form endpoint (e.g. Formspree, Netlify Forms) when ready.
    const subject = encodeURIComponent('PunchThis Early Access Request')
    const body = encodeURIComponent(`Name: ${name}\nRole: ${role}\nEmail: ${email}`)
    window.location.href = `mailto:${SITE.contactEmail}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <>
      <section className="ea-section" aria-labelledby="ea-heading">
        <div className="ea-bg" aria-hidden="true" />
        <div className="container ea-inner">
          {/* Left column */}
          <div ref={ref} className="ea-copy">
            <p className="reveal section-label" style={{ color: '#7AAEFF' }}>EARLY ACCESS</p>
            <h1 id="ea-heading" className="reveal ea-headline">
              Be first on site<br />with PunchThis.
            </h1>
            <p className="reveal ea-body">
              PunchThis is currently in development. Register your interest now and we'll reach out when early access opens.
            </p>
            <p className="reveal ea-status">{SITE.launchStatus}</p>

            <ul className="reveal ea-benefits" role="list">
              {BENEFITS.map((b) => (
                <li key={b} className="ea-benefit">
                  <Check size={16} strokeWidth={3} color="#4C82FF" aria-hidden="true" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column — form */}
          <div className="ea-card">
            {submitted ? (
              <div className="ea-success" role="status" aria-live="polite">
                <div className="success-icon"><Check size={28} strokeWidth={2.5} /></div>
                <h2 className="success-title">You're on the list.</h2>
                <p className="success-body">
                  Your email client should open with a pre-filled message to {SITE.contactEmail}. Send it to confirm your spot.
                </p>
                <p className="success-note">
                  No backend is active yet. When a form endpoint is configured in <code>EarlyAccess.jsx</code>, submissions will be stored automatically.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Early access registration form">
                <h2 className="form-title">Register for early access</h2>
                <p className="form-sub">We'll be in touch as soon as the beta opens.</p>

                <div className="form-group">
                  <label htmlFor="ea-name" className="form-label">Your name</label>
                  <input
                    id="ea-name" type="text" className="form-input"
                    placeholder="Jane Smith" value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="ea-role" className="form-label">Your role <span className="form-optional">(optional)</span></label>
                  <input
                    id="ea-role" type="text" className="form-input"
                    placeholder="Site manager, Building inspector…" value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="ea-email" className="form-label">Work email <span className="form-required" aria-hidden="true">*</span></label>
                  <input
                    id="ea-email" type="email" className={`form-input${error ? ' error' : ''}`}
                    placeholder="you@yourcompany.com" value={email}
                    onChange={(e) => { setEmail(e.target.value); setError('') }}
                    required autoComplete="email" aria-describedby={error ? 'ea-error' : undefined}
                  />
                  {error && <p id="ea-error" className="form-error" role="alert">{error}</p>}
                </div>

                <button type="submit" className="btn btn-primary form-submit">
                  Request early access <ArrowRight size={17} />
                </button>

                <p className="form-disclaimer">
                  This opens your email client with a pre-filled message to {SITE.contactEmail}. No data is stored until a form endpoint is configured.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .ea-section {
          position: relative; min-height: 100svh;
          background: var(--carbon);
          display: flex; align-items: center;
          padding: 80px 0;
          overflow: hidden;
        }
        .ea-bg {
          position: absolute; inset: 0; pointer-events: none;
          background-image: linear-gradient(rgba(76,130,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(76,130,255,0.06) 1px,transparent 1px);
          background-size: 44px 44px;
        }
        .ea-inner {
          display: grid; grid-template-columns: 1fr 1fr; gap: 72px;
          align-items: start; position: relative; z-index: 1;
        }
        .ea-copy { display: flex; flex-direction: column; gap: 24px; }
        .ea-headline { font-size: clamp(32px,4vw,54px); color: #fff; line-height: 1.1; }
        .ea-body { font-size: 17px; color: #9DA9B4; line-height: 1.7; }
        .ea-status { font-size: 13px; font-weight: 600; color: #4C82FF; padding: 10px 14px; background: rgba(76,130,255,0.1); border: 1px solid rgba(76,130,255,0.2); border-radius: 8px; }
        .ea-benefits { display: flex; flex-direction: column; gap: 12px; }
        .ea-benefit { display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 600; color: #CBD2D8; }

        /* Card */
        .ea-card {
          background: var(--white); border-radius: var(--radius-xl);
          padding: 44px 40px; box-shadow: var(--shadow-xl);
        }
        .form-title { font-family: var(--font-display); font-size: 22px; font-weight: 700; color: var(--ink); margin-bottom: 6px; }
        .form-sub { font-size: 14px; color: var(--steel); margin-bottom: 28px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px; }
        .form-label { font-size: 13px; font-weight: 700; color: var(--ink); }
        .form-optional { font-weight: 400; color: var(--steel); }
        .form-required { color: var(--open); }
        .form-input {
          padding: 12px 14px; border: 1.5px solid var(--border); border-radius: 10px;
          font-size: 15px; font-family: var(--font-body); color: var(--ink);
          background: var(--mist); transition: border-color 0.15s;
        }
        .form-input:focus { border-color: var(--cobalt); outline: none; background: #fff; }
        .form-input.error { border-color: var(--open); }
        .form-error { font-size: 12px; color: var(--open); font-weight: 600; }
        .form-submit { width: 100%; justify-content: center; font-size: 16px; padding: 14px 24px; margin-top: 4px; }
        .form-disclaimer { font-size: 12px; color: var(--steel); line-height: 1.5; margin-top: 14px; text-align: center; }

        /* Success */
        .ea-success { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; }
        .success-icon { width: 60px; height: 60px; border-radius: 50%; background: var(--success-soft); color: var(--success); display: flex; align-items: center; justify-content: center; }
        .success-title { font-family: var(--font-display); font-size: 22px; font-weight: 700; color: var(--ink); }
        .success-body { font-size: 15px; color: var(--muted); line-height: 1.65; }
        .success-note { font-size: 12px; color: var(--steel); background: var(--mist); border: 1px solid var(--border); border-radius: 8px; padding: 10px 14px; }
        .success-note code { font-family: monospace; }

        @media (max-width: 900px) {
          .ea-inner { grid-template-columns: 1fr; gap: 48px; }
          .ea-copy { align-items: center; text-align: center; }
          .ea-benefits { align-items: center; }
        }
        @media (max-width: 480px) { .ea-card { padding: 32px 24px; } }
      `}</style>
    </>
  )
}
