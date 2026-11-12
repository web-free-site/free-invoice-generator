import { FC, useCallback, useMemo, useState } from 'react'
import InvoicePage from '../components/InvoicePage'
import { Invoice, DocumentType } from '../data/types'
import { createInitialInvoice } from '../data/initialData'
import { Locale, t } from '../i18n/messages'
import { AdSlot } from '../components/ads/AdSlot'
import { SEO_PAGES } from '../seo/pages'
import { JsonLd } from '../components/JsonLd'
import { DocumentToolbar } from '../components/DocumentToolbar'

interface Props {
  locale: Locale
  docType?: DocumentType
  vatNone?: boolean
  seoPath?: string
}

const storageKey = 'freeInvoiceGeneratorData'

export const HomePage: FC<Props> = ({ locale, docType = 'invoice', vatNone, seoPath = '/' }) => {
  const seo = SEO_PAGES.find((p) => p.path === seoPath) ?? SEO_PAGES[0]

  const saved = useMemo(() => {
    try {
      const raw = window.localStorage.getItem(storageKey)
      return raw ? (JSON.parse(raw) as Invoice) : null
    } catch {
      return null
    }
  }, [])

  const [invoice, setInvoice] = useState<Invoice>(() => {
    if (saved) return { ...saved, documentType: docType, ...(vatNone ? { vatMode: 'none' as const, taxLabel: 'VAT (0%)', vatRate: 0 } : {}) }
    const base = createInitialInvoice(docType)
    if (vatNone) {
      base.vatMode = 'none'
      base.vatRate = 0
      base.taxLabel = locale === 'fr' ? 'TVA (0%)' : 'VAT (0%)'
    }
    return base
  })

  const onInvoiceUpdated = useCallback((data: Invoice) => {
    window.localStorage.setItem(storageKey, JSON.stringify(data))
    setInvoice(data)
  }, [])

  return (
    <>
      <JsonLd page={seo} />
      <section className="hero">
        <h1>{seo.h1}</h1>
        <p className="hero__lead">{t(locale, 'tagline')}</p>
      </section>

      <DocumentToolbar invoice={invoice} locale={locale} onChange={onInvoiceUpdated} />

      <div className="editor-shell">
        <InvoicePage data={invoice} onChange={onInvoiceUpdated} locale={locale} />
        <AdSlot slot="nativeBelowResult" className="ad-native" />
      </div>

      <AdSlot slot="betweenToolContent728x90" className="ad-between" />

      <article className="content-article">
        {seo.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <h2>FAQ</h2>
        <dl className="faq">
          {seo.faq.map((item) => (
            <div key={item.q}>
              <dt>{item.q}</dt>
              <dd>{item.a}</dd>
            </div>
          ))}
        </dl>
        <AdSlot slot="content300x250" className="ad-content" />
      </article>
    </>
  )
}
