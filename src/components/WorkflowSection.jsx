import { useReveal } from '../hooks/useReveal'
import PhoneMockup from './PhoneMockup'
import { WORKFLOW_STEPS } from '../config/content'
import captureSessionImg from '../assets/app-screens/capture-session.png'
import markupStudioImg from '../assets/app-screens/markup-studio.png'
import issueDetailImg from '../assets/app-screens/issue-detail.png'
import reportBuilderImg from '../assets/app-screens/report-builder.png'

const IMAGE_FOR_STEP = {
  camera: captureSessionImg,
  markup: markupStudioImg,
  issue: issueDetailImg,
  report: reportBuilderImg,
}

export default function WorkflowSection() {
  const ref = useReveal()

  return (
    <section ref={ref} id="workflow" className="workflow-section section" aria-labelledby="workflow-heading">
      <div className="container">
        <div className="workflow-header reveal">
          <h2 id="workflow-heading" className="workflow-headline">From site walk to signed-off issue.</h2>
          <p className="workflow-subline">Four steps. One continuous loop.</p>
        </div>

        {/* Connector line */}
        <div className="workflow-track" aria-hidden="true">
          <div className="track-line" />
        </div>

        <div className="workflow-steps">
          {WORKFLOW_STEPS.map((step, i) => (
            <article key={step.number} className={`workflow-step reveal${i % 2 === 1 ? ' step-alt' : ''}`}>
              {/* Phone */}
              <div className="step-phone">
                <PhoneMockup maxWidth={210} label={`Real PunchThis screen — step ${step.number}, ${step.title}`} image={IMAGE_FOR_STEP[step.screen]} />
              </div>

              {/* Copy */}
              <div className="step-copy">
                <div className="step-number-row">
                  <span className="step-number">{step.number}</span>
                  <span className="step-badge">{step.label}</span>
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-body">{step.body}</p>

                {/* Real sample data from the screenshot above (Sample — Harbourview Apartments Stage 2) */}
                {step.screen === 'camera' && (
                  <div className="step-sample">
                    <span className="sample-chip chip chip-cobalt"><span className="chip-dot" style={{background:'#4C82FF'}}/>8 issues</span>
                    <span className="sample-text">Pre-Handover Site Walk</span>
                  </div>
                )}
                {step.screen === 'markup' && (
                  <div className="step-sample">
                    <span className="sample-text">"Door left open"</span>
                  </div>
                )}
                {step.screen === 'issue' && (
                  <div className="step-sample">
                    <span className="sample-chip chip chip-open"><span className="chip-dot" style={{background:'#C93B3B'}}/>High</span>
                    <span className="sample-text">Sparks Electrical</span>
                    <span className="sample-text muted">Level 1 Corridor</span>
                  </div>
                )}
                {step.screen === 'report' && (
                  <div className="step-sample">
                    <span className="sample-chip chip chip-cobalt"><span className="chip-dot" style={{background:'#4C82FF'}}/>8 issues</span>
                    <span className="sample-text">Client · Site Walk · Handover</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .workflow-section { background: var(--white); }
        .workflow-header { text-align: center; margin-bottom: 72px; }
        .workflow-headline { font-size: clamp(28px, 3.5vw, 46px); color: var(--ink); }
        .workflow-subline { font-size: 17px; color: var(--steel-text); margin-top: 12px; }

        .workflow-track { display: none; }

        .workflow-steps { display: flex; flex-direction: column; gap: 80px; }
        .workflow-step {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 64px;
          align-items: center;
        }
        .workflow-step.step-alt {
          grid-template-columns: 1fr auto;
        }
        .workflow-step.step-alt .step-phone { order: 2; }
        .workflow-step.step-alt .step-copy  { order: 1; }

        .step-phone { display: flex; justify-content: center; }
        .step-copy  { display: flex; flex-direction: column; gap: 16px; }

        .step-number-row { display: flex; align-items: center; gap: 12px; }
        .step-number {
          font-family: var(--font-display); font-size: 13px; font-weight: 700;
          color: var(--cobalt); letter-spacing: 0.04em;
        }
        .step-badge {
          font-size: 11px; font-weight: 800; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--steel-text); padding: 3px 10px;
          border: 1.5px solid var(--border); border-radius: 999px;
        }
        .step-title { font-size: clamp(20px, 2.5vw, 28px); color: var(--ink); }
        .step-body  { font-size: 16px; color: var(--muted); line-height: 1.7; max-width: 420px; }

        .step-sample {
          display: flex; flex-wrap: wrap; align-items: center; gap: 8px;
          padding: 14px 16px; background: var(--mist); border-radius: 10px;
          border: 1px solid var(--border);
        }
        .sample-text {
          font-size: 13px; font-weight: 600; color: var(--ink);
        }
        .sample-text.muted { color: var(--steel-text); }

        @media (max-width: 900px) {
          .workflow-step,
          .workflow-step.step-alt {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .workflow-step.step-alt .step-phone,
          .workflow-step.step-alt .step-copy { order: unset; }
          .step-phone > div { max-width: 220px; margin: 0 auto; }
          .workflow-step.step-alt .step-phone { order: -1; }
        }
      `}</style>
    </section>
  )
}
