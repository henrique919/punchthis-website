import { useState, useEffect, useId } from 'react'
import { useReveal } from '../hooks/useReveal'
import { SITE } from '../config/content'
import { track } from '../lib/analytics'
import { Check, ArrowRight, AlertCircle } from 'lucide-react'

const BENEFITS = [
  'First to know when the app launches',
  'Access to the beta programme',
  'Input on features and workflow',
  'Founder pricing when available',
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Visually hidden but still in the DOM/tab order for assistive tech to skip
// deliberately (tabIndex=-1 + aria-hidden on the wrapper) — a spam-bot
// honeypot. Real visitors never see or fill it.
const honeypotStyle = { position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }

async function submitLead(payload) {
  let res
  try {
    res = await fetch('/api/early-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error('network')
  }
  let data = null
  try { data = await res.json() } catch { /* non-JSON error body */ }
  if (!res.ok || !data?.ok) {
    throw new Error(data?.error || `http_${res.status}`)
  }
  return data
}

function errorMessage(reason) {
  switch (reason) {
    case 'invalid_email': return 'Enter a valid email address.'
    case 'rate_limited': return "You've tried a few times — wait a few minutes and try again."
    case 'not_configured':
    case 'upstream_error': return `We can't take submissions right now. Email ${SITE.contactEmail} instead.`
    case 'network': return 'Connection problem — check your connection and try again.'
    default: return 'Something went wrong. Try again.'
  }
}

export default function EarlyAccess() {
  const ref = useReveal()
  const errorId = useId()

  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorReason, setErrorReason] = useState('')
  const [started, setStarted] = useState(false)
  const [honeypot, setHoneypot] = useState('')

  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [company, setCompany] = useState('')
  const [profileStatus, setProfileStatus] = useState('idle') // idle | submitting | error
  const [profileDone, setProfileDone] = useState(false)

  useEffect(() => { track('early_access_view') }, [])

  function handleEmailChange(e) {
    if (!started) { track('early_access_start'); setStarted(true) }
    setEmail(e.target.value)
    if (status === 'error') { setStatus('idle'); setErrorReason('') }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !EMAIL_RE.test(trimmed)) {
      setStatus('error')
      setErrorReason('invalid_email')
      return
    }
    setStatus('submitting')
    try {
      await submitLead({ email: trimmed, company_website: honeypot, source: 'early_access_page' })
      setStatus('success')
      track('early_access_success', { has_profile: false })
    } catch (err) {
      setStatus('error')
      setErrorReason(err.message)
      track('early_access_error', { reason: err.message })
    }
  }

  async function handleProfileSubmit(e) {
    e.preventDefault()
    setProfileStatus('submitting')
    try {
      await submitLead({ email: email.trim(), name, role, company, company_website: honeypot, source: 'early_access_page' })
      setProfileDone(true)
      track('early_access_profile_success')
    } catch {
      setProfileStatus('error')
    }
  }

  return (
    <section className="ea-section" aria-labelledby="ea-heading">
      <div className="ea-bg" aria-hidden="true" />
      <div ref={ref} className="container ea-inner">
        <div className="reveal ea-intro">
          <p className="section-label" style={{ color: '#7AAEFF' }}>EARLY ACCESS</p>
          <h1 id="ea-heading" className="ea-headline">
            Be first on site<br />with PunchThis.
          </h1>
          <p className="ea-body">
            PunchThis is currently in development. Register your interest now and we'll reach out when early access opens.
          </p>
          <p className="ea-status">{SITE.launchStatus}</p>
        </div>

        <div className="reveal ea-form-card">
          {status === 'success' ? (
            <div className="ea-success" role="status" aria-live="polite">
              <div className="success-icon"><Check size={28} strokeWidth={2.5} /></div>
              <h2 className="success-title">You're on the list.</h2>
              <p className="success-body">We'll email {email} as soon as early access opens.</p>

              {!profileDone ? (
                <form onSubmit={handleProfileSubmit} className="ea-profile-form" aria-label="Optional profile details">
                  <p className="profile-prompt">Help us prioritise the beta — optional, takes 10 seconds.</p>

                  <div className="form-group">
                    <label htmlFor="ea-name" className="form-label">Your name</label>
                    <input id="ea-name" type="text" className="form-input" placeholder="Jane Smith" value={name}
                      onChange={(e) => setName(e.target.value)} autoComplete="name" disabled={profileStatus === 'submitting'} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ea-role" className="form-label">Your role</label>
                    <input id="ea-role" type="text" className="form-input" placeholder="Site manager, Building inspector…" value={role}
                      onChange={(e) => setRole(e.target.value)} disabled={profileStatus === 'submitting'} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ea-company" className="form-label">Company <span className="form-optional">(optional)</span></label>
                    <input id="ea-company" type="text" className="form-input" value={company}
                      onChange={(e) => setCompany(e.target.value)} autoComplete="organization" disabled={profileStatus === 'submitting'} />
                  </div>

                  <div aria-hidden="true" style={honeypotStyle}>
                    <label htmlFor="ea-hp-2">Company website</label>
                    <input id="ea-hp-2" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                  </div>

                  {profileStatus === 'error' && (
                    <p className="form-error" role="alert">Couldn't save that — you're still on the list either way. <button type="button" className="profile-skip-inline" onClick={() => setProfileDone(true)}>Continue</button></p>
                  )}

                  <div className="profile-actions">
                    <button type="submit" className="btn btn-outline" disabled={profileStatus === 'submitting'}>
                      {profileStatus === 'submitting' ? 'Saving…' : 'Add details'}
                    </button>
                    <button type="button" className="profile-skip" onClick={() => setProfileDone(true)}>Skip</button>
                  </div>
                </form>
              ) : (
                <p className="success-note">Thanks — you're all set.</p>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate aria-label="Early access registration form">
              <h2 className="form-title">Register for early access</h2>
              <p className="form-sub">One email to start. We'll be in touch as soon as the beta opens.</p>

              {status === 'error' && (
                <div className="form-error-summary" role="alert" id={errorId}>
                  <AlertCircle size={16} aria-hidden="true" />
                  <span>{errorMessage(errorReason)}</span>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="ea-email" className="form-label">Work email <span className="form-required" aria-hidden="true">*</span></label>
                <input
                  id="ea-email" name="email" type="email" className={`form-input${status === 'error' ? ' error' : ''}`}
                  placeholder="you@yourcompany.com" value={email}
                  onChange={handleEmailChange}
                  required autoComplete="email"
                  aria-invalid={status === 'error'}
                  aria-describedby={status === 'error' ? errorId : undefined}
                  disabled={status === 'submitting'}
                />
              </div>

              <div aria-hidden="true" style={honeypotStyle}>
                <label htmlFor="ea-hp-1">Company website</label>
                <input id="ea-hp-1" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              </div>

              <button type="submit" className="btn btn-primary form-submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Submitting…' : <>Request early access <ArrowRight size={17} /></>}
              </button>

              <p className="form-disclaimer">We'll only use this email to contact you about PunchThis early access.</p>
            </form>
          )}
        </div>

        <ul className="reveal ea-benefits" role="list">
          {BENEFITS.map((b) => (
            <li key={b} className="ea-benefit">
              <Check size={16} strokeWidth={3} color="#4C82FF" aria-hidden="true" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

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
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-areas: "intro form" "benefits form";
          gap: 20px 72px;
          align-items: start; position: relative; z-index: 1;
        }
        .ea-intro { grid-area: intro; display: flex; flex-direction: column; gap: 20px; }
        .ea-benefits { grid-area: benefits; display: flex; flex-direction: column; gap: 12px; }
        .ea-form-card { grid-area: form; }
        .ea-headline { font-size: clamp(32px,4vw,54px); color: #fff; line-height: 1.1; }
        .ea-body { font-size: 17px; color: #9DA9B4; line-height: 1.7; max-width: 480px; }
        .ea-status { font-size: 13px; font-weight: 600; color: #4C82FF; padding: 10px 14px; background: rgba(76,130,255,0.1); border: 1px solid rgba(76,130,255,0.2); border-radius: 8px; }
        .ea-benefit { display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 600; color: #CBD2D8; }

        /* Card */
        .ea-form-card {
          background: var(--white); border-radius: var(--radius-xl);
          padding: 44px 40px; box-shadow: var(--shadow-xl);
        }
        .form-title { font-family: var(--font-display); font-size: 22px; font-weight: 700; color: var(--ink); margin-bottom: 6px; }
        .form-sub { font-size: 14px; color: var(--steel-text, var(--steel)); margin-bottom: 24px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px; }
        .form-label { font-size: 13px; font-weight: 700; color: var(--ink); }
        .form-optional { font-weight: 400; color: var(--steel-text, var(--steel)); }
        .form-required { color: var(--open); }
        .form-input {
          padding: 12px 14px; border: 1.5px solid var(--border); border-radius: 10px;
          font-size: 15px; font-family: var(--font-body); color: var(--ink);
          background: var(--mist); transition: border-color 0.15s;
          min-height: 44px;
        }
        .form-input:focus { border-color: var(--cobalt); outline: none; background: #fff; }
        .form-input.error { border-color: var(--open); }
        .form-input:disabled { opacity: 0.6; cursor: not-allowed; }
        .form-error-summary {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: 13px; color: #9C2B2B; font-weight: 600; line-height: 1.5;
          background: var(--open-soft); border: 1px solid var(--open);
          border-radius: 8px; padding: 10px 12px; margin-bottom: 16px;
        }
        .form-error-summary svg { flex-shrink: 0; margin-top: 1px; color: #9C2B2B; }
        .form-error { font-size: 12px; color: var(--open); font-weight: 600; margin-top: -8px; margin-bottom: 12px; }
        .form-submit { width: 100%; justify-content: center; font-size: 16px; padding: 14px 24px; margin-top: 4px; min-height: 44px; }
        .form-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .form-disclaimer { font-size: 12px; color: var(--steel-text, var(--steel)); line-height: 1.5; margin-top: 14px; text-align: center; }

        /* Success */
        .ea-success { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 14px; }
        .success-icon { width: 60px; height: 60px; border-radius: 50%; background: var(--success-soft); color: var(--success); display: flex; align-items: center; justify-content: center; }
        .success-title { font-family: var(--font-display); font-size: 22px; font-weight: 700; color: var(--ink); }
        .success-body { font-size: 15px; color: var(--muted); line-height: 1.65; }
        .success-note { font-size: 13px; color: var(--muted); margin-top: 4px; }
        .ea-profile-form { width: 100%; text-align: left; margin-top: 8px; padding-top: 20px; border-top: 1px solid var(--border); }
        .profile-prompt { font-size: 13px; color: var(--steel-text, var(--steel)); margin-bottom: 16px; }
        .profile-actions { display: flex; align-items: center; gap: 12px; margin-top: 4px; }
        .profile-actions .btn { min-height: 44px; }
        .profile-skip, .profile-skip-inline { font-size: 13px; font-weight: 600; color: var(--steel-text, var(--steel)); padding: 8px; min-height: 44px; }
        .profile-skip:hover, .profile-skip-inline:hover { color: var(--ink); }
        .profile-skip-inline { text-decoration: underline; padding: 0; min-height: auto; display: inline; }

        @media (max-width: 900px) {
          .ea-inner {
            grid-template-columns: 1fr;
            grid-template-areas: "intro" "form" "benefits";
            gap: 28px;
          }
          .ea-intro { align-items: center; text-align: center; }
          .ea-benefits { align-items: center; }
        }
        @media (max-width: 480px) { .ea-form-card { padding: 32px 24px; } }
      `}</style>
    </section>
  )
}
