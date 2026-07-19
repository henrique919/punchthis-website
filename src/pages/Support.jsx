import { Link } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react'
import LegalLayout from '../components/LegalLayout'
import { SITE } from '../config/content'
import { SUPPORT_INTRO } from '../config/legalContent'

const SECTIONS = [
  {
    title: 'Contact',
    body: `Email ${SITE.contactEmail} with a description of the issue, your device/browser, and — if it's a visual bug — a screenshot. We read every message.`,
  },
  {
    title: 'Response times',
    body: "PunchThis is a small, early-access product today, not a staffed support desk. We aim to reply within a few working days, but there's no guaranteed SLA yet.",
  },
  {
    title: 'Bug reports and feature requests',
    body: 'Both are welcome at the same address above. Tell us what you expected to happen and what happened instead — that\'s the fastest path to a fix.',
  },
]

export default function Support() {
  return (
    <>
      <LegalLayout
        eyebrow="SUPPORT"
        title="Get help"
        intro={SUPPORT_INTRO}
        sections={SECTIONS}
        showProvisionalNotice={false}
        path="/support"
        seoDescription="Get help with PunchThis — contact support, report a bug, or ask a question."
      />
      <section className="section support-links" style={{ background: 'var(--mist)' }}>
        <div className="container" style={{ maxWidth: 720, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <a href={`mailto:${SITE.contactEmail}`} className="btn btn-outline">
            <Mail size={16} /> Email support
          </a>
          <Link to="/faq" className="btn btn-outline">
            Read the FAQ <ArrowRight size={15} />
          </Link>
          <Link to="/data-deletion" className="btn btn-outline">
            Data deletion <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  )
}
