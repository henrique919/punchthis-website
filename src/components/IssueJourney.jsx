import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import BeforeAfterSlider from './BeforeAfterSlider'
import issueOriginalImg from '../assets/app-screens/issue-original.png'
import issueAnnotatedImg from '../assets/app-screens/issue-annotated.png'

const STEPS = [
  { n: '01', label: 'Photo', body: 'Captured on site and attached to a new issue — no separate app, no re-typing.' },
  { n: '02', label: 'Markup', body: 'Boxed the fault, drew an arrow to it and left a note — real annotation tools, drag the slider to see it.' },
  { n: '03', label: 'Report', body: 'The annotated photo, its status and its assignee carry straight through into the PDF report.' },
]

export default function IssueJourney() {
  const ref = useReveal()
  return (
    <section ref={ref} className="issue-journey section" aria-labelledby="issue-journey-heading">
      <div className="container issue-journey-inner">
        <div className="reveal ij-slider-col">
          <BeforeAfterSlider
            beforeSrc={issueOriginalImg}
            afterSrc={issueAnnotatedImg}
            beforeLabel="Original photo"
            afterLabel="Marked up"
          />
          <p className="ij-caption">
            Issue #008 · Temporary switchboard unsecured — signage non-compliant. Real sample data from the app.
          </p>
        </div>
        <div className="ij-copy">
          <p className="reveal section-label">ONE ISSUE, START TO FINISH</p>
          <h2 id="issue-journey-heading" className="reveal ij-headline">From a photo to a documented issue.</h2>
          <p className="reveal ij-body">
            This is a real PunchThis issue, from the app's own sample project — not a mockup. Drag the slider above to see the actual markup.
          </p>
          <ol className="reveal ij-steps">
            {STEPS.map((s) => (
              <li key={s.n} className="ij-step">
                <span className="ij-step-num">{s.n}</span>
                <div>
                  <p className="ij-step-label">{s.label}</p>
                  <p className="ij-step-body">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="reveal">
            <Link to="/markup" className="btn btn-outline">
              See the markup studio <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
      <style>{`
        .issue-journey { background: var(--white); }
        .issue-journey-inner {
          display: grid; grid-template-columns: minmax(0, 460px) 1fr;
          gap: 64px; align-items: center;
        }
        .ij-slider-col { min-width: 0; }
        .ij-caption { font-size: 13px; color: var(--steel-text); margin-top: 12px; line-height: 1.5; }
        .ij-copy { display: flex; flex-direction: column; gap: 18px; min-width: 0; }
        .ij-headline { font-size: clamp(26px, 3.2vw, 40px); color: var(--ink); }
        .ij-body { font-size: 16px; color: var(--muted); line-height: 1.7; max-width: 460px; }
        .ij-steps { display: flex; flex-direction: column; gap: 16px; margin: 6px 0; }
        .ij-step { display: flex; gap: 14px; align-items: flex-start; }
        .ij-step-num {
          font-family: var(--font-display); font-size: 13px; font-weight: 700;
          color: var(--cobalt-deep); flex-shrink: 0; margin-top: 2px;
        }
        .ij-step-label { font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 2px; }
        .ij-step-body { font-size: 14px; color: var(--muted); line-height: 1.55; max-width: 420px; }
        @media (max-width: 900px) {
          .issue-journey-inner { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>
    </section>
  )
}
