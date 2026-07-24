import Seo from '../components/Seo'
import Hero from '../components/Hero'
import TrustStrip from '../components/TrustStrip'
import IssueJourney from '../components/IssueJourney'
import ReportShowcase from '../components/ReportShowcase'
import MarkupShowcase from '../components/MarkupShowcase'
import WorkflowSection from '../components/WorkflowSection'
import Benefits from '../components/Benefits'
import AudienceSection from '../components/AudienceSection'
import FAQSection from '../components/FAQSection'
import FinalCTA from '../components/FinalCTA'
import { FAQ_ITEMS } from '../config/content'

// Focused homepage FAQ preview — the 4 questions visitors ask first;
// the rest live on /faq.
const homeFAQ = FAQ_ITEMS.flatMap((cat) => cat.items).slice(0, 4)

export default function Home() {
  return (
    <>
      <Seo
        description="The punch list app that writes the report for you. Capture punch items, mark up photos, track issues and send professional PDF inspection reports from your phone."
        path="/"
      />
      <Hero />
      <TrustStrip />
      <IssueJourney />
      <ReportShowcase />
      <MarkupShowcase />
      <WorkflowSection />
      <Benefits />
      <AudienceSection />
      <FAQSection items={homeFAQ} title="Questions before you register" />
      <FinalCTA />
    </>
  )
}
