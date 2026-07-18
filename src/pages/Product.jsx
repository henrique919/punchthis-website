import { Link } from 'react-router-dom'
import { ArrowRight, Camera, Pencil, BarChart2, MapPin, CheckCircle, FileText } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import PhoneMockup from '../components/PhoneMockup'
import MarkupScreen from '../screens/MarkupScreen'
import CaptureScreen from '../screens/CaptureScreen'
import IssueDetailScreen from '../screens/IssueDetailScreen'
import ReportBuilderScreen from '../screens/ReportBuilderScreen'
import Benefits from '../components/Benefits'
import Differentiation from '../components/Differentiation'
import AudienceSection from '../components/AudienceSection'
import FinalCTA from '../components/FinalCTA'

function PageHero() {
  const ref = useReveal()
  return (
    <section ref={ref} className="page-hero dark-hero" aria-labelledby="product-heading">
      <div className="page-hero-grid" aria-hidden="true" />
      <div className="container page-hero-inner">
        <div className="page-hero-copy">
          <p className="reveal section-label" style={{ color: '#7AAEFF' }}>THE PRODUCT</p>
          <h1 id="product-heading" className="reveal page-hero-headline">
            One app.<br />The full close-out loop.
          </h1>
          <p className="reveal page-hero-body">
            PunchThis connects photo capture, precise markup, issue tracking and professional reporting into a single workflow—designed to run entirely from your phone, on site.
          </p>
          <div className="reveal" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 8 }}>
            <Link to="/early-access" className="btn btn-primary">Get early access <ArrowRight size={16}/></Link>
            <Link to="/how-it-works" className="btn btn-ghost">See how it works</Link>
          </div>
        </div>
        <div className="reveal page-hero-phones">
          <div style={{ transform: 'rotate(-3deg)', filter: 'brightness(0.85)', marginRight: -20 }}>
            <PhoneMockup maxWidth={195} label="Capture session screen"><CaptureScreen /></PhoneMockup>
          </div>
          <PhoneMockup maxWidth={230} label="Markup studio screen"><MarkupScreen activeTool="circle" /></PhoneMockup>
        </div>
      </div>
      <style>{`
        .dark-hero { background: var(--ink); position: relative; overflow: hidden; padding: 100px 0 80px; }
        .page-hero-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image: linear-gradient(rgba(76,130,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(76,130,255,0.06) 1px,transparent 1px);
          background-size: 44px 44px;
        }
        .page-hero-inner { display: grid; grid-template-columns: 1fr auto; gap: 64px; align-items: center; position: relative; z-index: 1; }
        .page-hero-copy { display: flex; flex-direction: column; gap: 22px; }
        .page-hero-headline { font-size: clamp(32px, 4vw, 56px); color: #fff; }
        .page-hero-body { font-size: 18px; color: #9DA9B4; line-height: 1.7; max-width: 480px; }
        .page-hero-phones { display: flex; align-items: flex-end; gap: 0; }
        @media (max-width: 900px) {
          .page-hero-inner { grid-template-columns: 1fr; }
          .page-hero-phones { justify-content: center; }
          .page-hero-copy { align-items: center; text-align: center; }
          .page-hero-body { max-width: 100%; }
        }
        @media (max-width: 480px) { .page-hero-phones > div:first-child { display: none; } }
      `}</style>
    </section>
  )
}

function FeatureRow({ title, body, screen, screenLabel, flip = false }) {
  const ref = useReveal()
  return (
    <section ref={ref} className={`feature-row section${flip ? ' flip' : ''}`}>
      <div className="container feature-row-inner">
        <div className="reveal feature-phone">
          <PhoneMockup maxWidth={240} label={screenLabel}>{screen}</PhoneMockup>
        </div>
        <div className="feature-copy">
          <h2 className="reveal feature-title">{title}</h2>
          <p className="reveal feature-body">{body}</p>
        </div>
      </div>
      <style>{`
        .feature-row { background: var(--white); }
        .feature-row:nth-child(even) { background: var(--mist); }
        .feature-row-inner { display: grid; grid-template-columns: auto 1fr; gap: 80px; align-items: center; }
        .feature-row.flip .feature-row-inner { grid-template-columns: 1fr auto; }
        .feature-row.flip .feature-phone { order: 2; }
        .feature-row.flip .feature-copy { order: 1; }
        .feature-phone { display: flex; justify-content: center; }
        .feature-copy { display: flex; flex-direction: column; gap: 20px; }
        .feature-title { font-size: clamp(24px, 3vw, 38px); color: var(--ink); }
        .feature-body { font-size: 17px; color: var(--muted); line-height: 1.7; max-width: 440px; }
        @media (max-width: 900px) {
          .feature-row-inner,
          .feature-row.flip .feature-row-inner { grid-template-columns: 1fr; gap: 40px; }
          .feature-row.flip .feature-phone { order: -1; }
          .feature-phone > div { max-width: 240px; margin: 0 auto; }
          .feature-copy { align-items: center; text-align: center; }
          .feature-body { max-width: 100%; }
        }
      `}</style>
    </section>
  )
}

export default function Product() {
  return (
    <>
      <PageHero />
      <FeatureRow
        title="Capture every defect, straight from the camera."
        body="Raise an issue directly from a photo. The image becomes the evidence — location, assignee, priority and status follow naturally, without double-handling information back at a desk."
        screen={<CaptureScreen />}
        screenLabel="PunchThis capture session showing issue list"
      />
      <FeatureRow
        flip
        title="Mark the exact problem. No ambiguity."
        body="The markup studio puts arrows, circles, boxes, numbered markers and freehand drawing directly on the photo. Every annotation stays permanently attached to the issue — open it a week later and the instruction is still there."
        screen={<MarkupScreen activeTool="box" />}
        screenLabel="PunchThis markup studio with box annotation"
      />
      <FeatureRow
        title="Full issue context. Every time."
        body="Each issue carries its annotated photo, location, priority, status and assignee. Nothing gets lost in translation between site and office."
        screen={<IssueDetailScreen />}
        screenLabel="PunchThis issue detail showing full context"
      />
      <FeatureRow
        flip
        title="Reports that are ready the moment you leave site."
        body="Choose what goes in, preview the full PDF and share it before you reach the car park. Cover page, executive summary, annotated photos — all in the right order."
        screen={<ReportBuilderScreen />}
        screenLabel="PunchThis report builder screen"
      />
      <Benefits />
      <Differentiation />
      <AudienceSection />
      <FinalCTA />
    </>
  )
}
