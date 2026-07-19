import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import { NAV } from '../config/content'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [location])

  const isDark = location.pathname === '/' // home uses dark hero directly under nav

  return (
    <header
      className={`site-header${scrolled ? ' scrolled' : ''}${isDark && !scrolled ? ' dark-mode' : ''}`}
      role="banner"
    >
      <div className="container header-inner">
        <Link to="/" aria-label="PunchThis home">
          <Logo light={isDark && !scrolled} size="md" />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="desktop-nav">
          {NAV.links.map((l) => (
            <NavLink
              key={l.href}
              to={l.href}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <Link to={NAV.ctaUrl} className="btn btn-primary" style={{ padding: '10px 20px', fontSize: 14 }}>
            {NAV.ctaLabel}
          </Link>
          <button
            className="hamburger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <nav
        id="mobile-nav"
        className={`mobile-nav${open ? ' open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        {NAV.links.map((l) => (
          <NavLink
            key={l.href}
            to={l.href}
            className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}
            tabIndex={open ? 0 : -1}
          >
            {l.label}
          </NavLink>
        ))}
        <div style={{ padding: '16px 24px 8px', borderTop: '1px solid var(--border)', marginTop: 4 }}>
          <Link
            to={NAV.ctaUrl}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            tabIndex={open ? 0 : -1}
          >
            {NAV.ctaLabel}
          </Link>
        </div>
      </nav>

      <style>{`
        .site-header {
          position: sticky; top: 0; z-index: 100;
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          transition: background 0.25s, border-color 0.25s, box-shadow 0.25s;
        }
        .site-header.scrolled {
          box-shadow: 0 2px 16px rgba(22,26,29,0.08);
        }
        .site-header.dark-mode {
          background: rgba(18,24,31,0.82);
          border-bottom-color: rgba(255,255,255,0.06);
        }
        .site-header.dark-mode .nav-link { color: #CBD2D8; }
        .site-header.dark-mode .nav-link:hover,
        .site-header.dark-mode .nav-link.active { color: #fff; }
        .site-header.dark-mode .hamburger { color: #fff; }

        .header-inner {
          display: flex; align-items: center; gap: 16px;
          height: 68px;
        }
        .header-inner > a:first-child { min-width: 0; flex-shrink: 1; }
        .desktop-nav {
          display: flex; align-items: center; gap: 4px;
          margin-left: 24px; flex: 1;
        }
        .nav-link {
          padding: 8px 13px;
          border-radius: 8px;
          font-size: 14px; font-weight: 600;
          color: var(--muted);
          transition: color 0.15s, background 0.15s;
        }
        .nav-link:hover { color: var(--ink); background: var(--mist); }
        .nav-link.active { color: var(--ink); background: var(--mist); }

        .header-actions { display: flex; align-items: center; gap: 12px; margin-left: auto; }

        .hamburger {
          display: none; align-items: center; justify-content: center;
          width: 40px; height: 40px; border-radius: 8px;
          color: var(--ink); transition: background 0.15s;
        }
        .hamburger:hover { background: var(--mist); }

        .mobile-nav {
          display: none; flex-direction: column; gap: 2px;
          padding: 8px 16px 16px;
          border-top: 1px solid var(--border);
          background: var(--white);
        }
        .mobile-nav.open { display: flex; }
        .mobile-nav-link {
          padding: 12px 8px; font-size: 16px; font-weight: 600;
          color: var(--muted); border-radius: 8px;
          transition: color 0.15s, background 0.15s;
        }
        .mobile-nav-link:hover,
        .mobile-nav-link.active { color: var(--ink); background: var(--mist); }

        @media (max-width: 768px) {
          .desktop-nav { display: none; }
          .hamburger { display: flex; }
          .site-header.dark-mode { background: rgba(18,24,31,0.96); }
        }
        /* Logo + CTA button + hamburger no longer fit on one row below
           this width - the drawer's own full-width CTA covers it. */
        @media (max-width: 400px) {
          .header-actions > .btn-primary { display: none; }
        }
      `}</style>
    </header>
  )
}
