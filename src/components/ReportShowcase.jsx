import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import PhoneMockup from './PhoneMockup'
import ReportBuilderScreen from '../screens/ReportBuilderScreen'
import PDFPreviewScreen from '../screens/PDFPreviewScreen'
import { REPORTS_SECTION } from '../config/content'

export default function ReportShowcase() {
  const ref = useReveal()
  return (
    <section ref={ref} id="reports" className="reports-section section" aria-labelledby="reports-heading">
      <div className="container reports-inner">
        {/* Copy column */}
        <div className="reports-copy">
          <p className="reveal section-label" style={{ color: '#7AAEFF' }}>{REPORTS_SECTION.sectionLabel}</p>
          <h2 id="reports-heading" className="reveal reports-headline">{REPORTS_SECTION.headline}</h2>
          <p className="reveal reports-body">{REPORTS_SECTION.body}</p>
          <ul className="reveal reports-benefits" role="list">
            {REPORTS_SECTION.benefits.map((b) => (
              <li key={b} className="reports-benefit-item">
                <Check size={16} strokeWidth={3} color="#4C82FF" aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="reveal" style={{ marginTop: 8 }}>
            <Link to="/reports" className="btn btn-ghost">
              Explore reports →
            </Link>
          </div>
        </div>

        {/* Phones */}
        <div className="reveal reports-phones" aria-label="Report builder and PDF preview screenshots">
          <div className="report-phone-a">
            <PhoneMockup maxWidth={200} label="PunchThis report builder screen">
              <ReportBuilderScreen />
            </PhoneMockup>
          </div>
          <div className="report-phone-b">
            <PhoneMockup maxWidth={200} label="PunchThis PDF preview screen">
              <PDFPreviewScreen />
            </PhoneMockup>
          </div>
        </div>
      </div>

      <style>{`
        .reports-section { background: var(--slate); }
        .reports-inner {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 72px;
          align-items: center;
        }
        .reports-copy { display: flex; flex-direction: column; gap: 22px; }
        .reports-headline { font-size: clamp(28px, 3.5vw, 44px); color: var(--white); }
        .reports-body { font-size: 17px; color: #9DA9B4; line-height: 1.7; max-width: 440px; }
        .reports-benefits { display: flex; flex-direction: column; gap: 12px; }
        .reports-benefit-item {
          display: flex; align-items: center; gap: 10px;
          font-size: 15px; font-weight: 600; color: #CBD2D8;
        }
        .reports-phones {
          display: flex; gap: 20px; align-items: flex-end;
        }
        .report-phone-a { transform: rotate(-3deg); filter: brightness(0.9); }
        .report-phone-b { transform: rotate(2deg); }
        @media (max-width: 1024px) {
          .reports-inner { grid-template-columns: 1fr; gap: 48px; }
          .reports-phones { justify-content: center; }
          .reports-copy { align-items: center; text-align: center; }
          .reports-benefits { align-items: center; }
          .reports-body { max-width: 100%; }
        }
        @media (max-width: 480px) {
          .reports-phones { gap: 12px; }
          .report-phone-a, .report-phone-b { width: 45%; }
        }
      `}</style>
    </section>
  )
}
