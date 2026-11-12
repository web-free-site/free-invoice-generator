import { useMemo } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { LegalPage } from './pages/LegalPage'
import { Locale } from './i18n/messages'
import { SEO_PAGES } from './seo/pages'
import { RouteMeta } from './seo/Helmet'

function localeFromPath(path: string): Locale {
  return path.startsWith('/fr') ? 'fr' : 'en'
}

function App() {
  const location = useLocation()
  const locale = useMemo(() => localeFromPath(location.pathname), [location.pathname])

  const setLocale = (l: Locale) => {
    try {
      window.localStorage.setItem('freeInvoiceLocale', l)
    } catch {
      /* ignore */
    }
  }

  return (
    <Layout locale={locale} onLocale={setLocale} showHomeBanner={location.pathname === '/' || location.pathname === '/fr'}>
      <RouteMeta />
      <Routes>
        <Route path="/" element={<HomePage locale="en" seoPath="/" docType="invoice" />} />
        <Route path="/fr" element={<HomePage locale="fr" seoPath="/fr/facture-gratuite" docType="invoice" />} />
        <Route
          path="/fr/facture-gratuite"
          element={<HomePage locale="fr" seoPath="/fr/facture-gratuite" docType="invoice" />}
        />
        <Route path="/quote-generator" element={<HomePage locale="en" seoPath="/quote-generator" docType="quote" />} />
        <Route
          path="/receipt-generator"
          element={<HomePage locale="en" seoPath="/receipt-generator" docType="receipt" />}
        />
        <Route
          path="/invoice-template-no-vat"
          element={<HomePage locale="en" seoPath="/invoice-template-no-vat" docType="invoice" vatNone />}
        />
        <Route path="/privacy" element={<LegalPage locale={locale} kind="privacy" />} />
        <Route path="/terms" element={<LegalPage locale={locale} kind="terms" />} />
        <Route path="/about" element={<LegalPage locale={locale} kind="about" />} />
        <Route path="/contact" element={<LegalPage locale={locale} kind="contact" />} />
        <Route
          path="*"
          element={
            <HomePage
              locale={locale}
              seoPath={SEO_PAGES.some((p) => p.path === location.pathname) ? location.pathname : '/'}
              docType="invoice"
            />
          }
        />
      </Routes>
    </Layout>
  )
}

export default App
