import LegalLayout from '../components/LegalLayout'
import { SITE } from '../config/content'
import { LAST_UPDATED, PRODUCT_SCOPE } from '../config/legalContent'

const SECTIONS = [
  {
    title: 'What PunchThis is',
    body: PRODUCT_SCOPE,
  },
  {
    title: 'Early access',
    body: 'PunchThis is pre-launch software under active development, currently offered as an invite-only web/PWA early access. Features, pricing and availability described on this site can change before a general release, and we\'ll aim to keep the site and the app consistent with what has actually shipped.',
  },
  {
    title: 'Your content',
    body: 'You own the photos, annotations, project details and reports you create in PunchThis. We don\'t claim any rights to them beyond what\'s needed to run the app on your device. PunchThis is local-first — see the Privacy policy for exactly where your data lives.',
  },
  {
    title: 'Acceptable use',
    body: 'Use PunchThis for its intended purpose — site inspection documentation and reporting. Don\'t use it to capture or distribute content you don\'t have the right to capture, and don\'t attempt to disrupt, reverse engineer for malicious purposes, or abuse the early-access programme.',
  },
  {
    title: 'No warranty',
    body: 'PunchThis is provided "as is" during early access, without warranty of any kind, express or implied. As stated in Product scope above, PunchThis does not certify regulatory compliance, workmanship, safety, completion, or contractual performance — you remain responsible for verifying and distributing your own records.',
  },
  {
    title: 'Changes to these terms',
    body: 'These terms are provisional, pending formal legal review, and may change as the product moves from early access toward general availability. Material changes will be reflected on this page with an updated date.',
  },
  {
    title: 'Questions',
    body: `Contact ${SITE.contactEmail} with any questions about these terms.`,
  },
]

export default function Terms() {
  return (
    <LegalLayout
      eyebrow="TERMS"
      title="Terms of service"
      intro="Plain-language terms for using PunchThis during early access."
      updated={LAST_UPDATED}
      sections={SECTIONS}
      path="/terms"
    />
  )
}
