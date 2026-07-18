import { Link } from 'react-router-dom'
import Logo from './Logo'
import { SITE, FOOTER, NAV } from '../config/content'

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-inner">
        {/* Brand column */}
        <div className="footer-brand">
          <Logo light size="md" />
          <p className="footer-tagline">{SITE.tagline}</p>
          <p className="footer-domain">
            <a href={`https://${SITE.domain}`} target="_blank" rel="noopener noreferrer">
              {SITE.domain}
            </a>
          </p>
        </div>

        {/* Product links */}
        <div className="footer-col">
          <h3 className="footer-heading">Product</h3>
          <ul>
            {FOOTER.productLinks.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="footer-link">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal links */}
        <div className="footer-col">
          <h3 className="footer-heading">Legal</h3>
          <ul>
            {FOOTER.legalLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.href} className="footer-link">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h3 className="footer-heading">Contact</h3>
          <ul>
            <li>
              <a href={`mailto:${SITE.contactEmail}`} className="footer-link">
                {SITE.contactEmail}
              </a>
            </li>
            <li style={{ marginTop: 12 }}>
              <Link to="/early-access" className="btn btn-primary" style={{ fontSize: 13, padding: '10px 18px' }}>
                Get early access
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: '#4E5D6A', fontSize: 13 }}>
            © {SITE.year} {SITE.name}. All rights reserved.
          </p>
          <p style={{ color: '#4E5D6A', fontSize: 13 }}>
            Built for the field.
          </p>
        </div>
      </div>

      <style>{`
        .site-footer {
          background: var(--carbon);
          color: var(--white);
          padding-top: 72px;
        }
        .footer-inner {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1.2fr;
          gap: 48px;
          padding-bottom: 64px;
        }
        .footer-brand { display: flex; flex-direction: column; gap: 14px; }
        .footer-tagline {
          font-size: 13px; color: #7E8B96; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
        }
        .footer-domain a { font-size: 13px; color: #4C82FF; font-weight: 600; }
        .footer-domain a:hover { color: #7AAEFF; }

        .footer-heading {
          font-family: var(--font-body);
          font-size: 11px; font-weight: 800;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #4E5D6A; margin-bottom: 16px;
        }
        .footer-col ul { display: flex; flex-direction: column; gap: 10px; }
        .footer-link { font-size: 14px; color: #9DA9B4; transition: color 0.15s; }
        .footer-link:hover { color: #fff; }

        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 20px 0;
        }

        @media (max-width: 900px) {
          .footer-inner { grid-template-columns: 1fr 1fr; }
          .footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 560px) {
          .footer-inner { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  )
}
