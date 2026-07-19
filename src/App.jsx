import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, Suspense, lazy } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'

// Route-level code splitting: Home ships eagerly (the most common entry
// point), everything else loads on demand so a visitor to any one route
// doesn't pay for every other route's SVG-era... now-real-screenshot
// weight up front.
const Product = lazy(() => import('./pages/Product'))
const MarkupPage = lazy(() => import('./pages/MarkupPage'))
const ReportsPage = lazy(() => import('./pages/ReportsPage'))
const HowItWorks = lazy(() => import('./pages/HowItWorks'))
const FAQPage = lazy(() => import('./pages/FAQPage'))
const EarlyAccess = lazy(() => import('./pages/EarlyAccess'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const Support = lazy(() => import('./pages/Support'))
const DataDeletion = lazy(() => import('./pages/DataDeletion'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

function RouteFallback() {
  return <div style={{ minHeight: '60svh' }} aria-hidden="true" />
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/markup" element={<MarkupPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/early-access" element={<EarlyAccess />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/support" element={<Support />} />
            <Route path="/data-deletion" element={<DataDeletion />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
