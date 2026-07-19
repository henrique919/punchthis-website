import Seo from '../components/Seo'
import Hero from '../components/Hero'
import TrustStrip from '../components/TrustStrip'
import MarkupShowcase from '../components/MarkupShowcase'
import WorkflowSection from '../components/WorkflowSection'
import Benefits from '../components/Benefits'
import ReportShowcase from '../components/ReportShowcase'
import Differentiation from '../components/Differentiation'
import AudienceSection from '../components/AudienceSection'
import FinalCTA from '../components/FinalCTA'
import FAQSection from '../components/FAQSection'
import { FAQ_ITEMS } from '../config/content'

// Flatten all FAQ items for the home page preview
const homeFAQ = FAQ_ITEMS.flatMap((cat) => cat.items).slice(0, 6)

export default function Home() {
  return (
    <>
      <Seo
        description="Capture site issues, mark up defects, assign work and create professional inspection reports with PunchThis."
        path="/"
      />
      <Hero />
      <TrustStrip />
      <MarkupShowcase />
      <WorkflowSection />
      <Benefits />
      <ReportShowcase />
      <Differentiation />
      <AudienceSection />
      <FinalCTA />
      <FAQSection items={homeFAQ} />
    </>
  )
}
