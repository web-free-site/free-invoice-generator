import { FC } from 'react'
import { Invoice, DocumentType, VatMode } from '../data/types'
import { CURRENCIES, symbolForCode, CurrencyCode } from '../data/currencies'
import { Locale, t } from '../i18n/messages'
import { createInitialInvoice } from '../data/initialData'

interface Props {
  invoice: Invoice
  locale: Locale
  onChange: (inv: Invoice) => void
}

export const DocumentToolbar: FC<Props> = ({ invoice, locale, onChange }) => {
  const setDocType = (type: DocumentType) => {
    const next = { ...createInitialInvoice(type), ...invoice, documentType: type, title: createInitialInvoice(type).title }
    onChange(next)
  }

  const setCurrency = (code: CurrencyCode) => {
    onChange({
      ...invoice,
      currencyCode: code,
      currency: symbolForCode(code),
    })
  }

  const setVat = (mode: VatMode) => {
    const rate = mode === 'none' ? 0 : invoice.vatRate ?? 18
    onChange({
      ...invoice,
      vatMode: mode,
      vatRate: rate,
      taxLabel: mode === 'none' ? (locale === 'fr' ? 'TVA (0%)' : 'VAT (0%)') : (locale === 'fr' ? `TVA (${rate}%)` : `VAT (${rate}%)`),
    })
  }

  return (
    <div className="doc-toolbar" role="toolbar" aria-label="Document options">
      <label>
        {t(locale, 'docType')}
        <select value={invoice.documentType ?? 'invoice'} onChange={(e) => setDocType(e.target.value as DocumentType)}>
          <option value="invoice">{t(locale, 'createInvoice')}</option>
          <option value="quote">{t(locale, 'createQuote')}</option>
          <option value="receipt">{t(locale, 'createReceipt')}</option>
        </select>
      </label>
      <label>
        {t(locale, 'currency')}
        <select
          value={(invoice.currencyCode as CurrencyCode) ?? 'RWF'}
          onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
        >
          {CURRENCIES.map((c) => (
            <option key={c.code} value={c.code}>
              {locale === 'fr' ? c.labelFr : c.labelEn}
            </option>
          ))}
        </select>
      </label>
      <label>
        {t(locale, 'vatMode')}
        <select value={invoice.vatMode ?? 'standard'} onChange={(e) => setVat(e.target.value as VatMode)}>
          <option value="standard">{t(locale, 'vatStandard')}</option>
          <option value="none">{t(locale, 'vatNone')}</option>
        </select>
      </label>
      {(invoice.vatMode ?? 'standard') === 'standard' ? (
        <label>
          {t(locale, 'vatRate')}
          <input
            type="number"
            min={0}
            max={100}
            step={0.5}
            value={invoice.vatRate ?? 18}
            onChange={(e) => {
              const rate = parseFloat(e.target.value) || 0
              onChange({
                ...invoice,
                vatRate: rate,
                taxLabel: locale === 'fr' ? `TVA (${rate}%)` : `VAT (${rate}%)`,
              })
            }}
          />
        </label>
      ) : null}
      <label>
        {t(locale, 'discount')}
        <input
          type="number"
          min={0}
          max={100}
          step={1}
          value={invoice.discountPercent ?? '0'}
          onChange={(e) => onChange({ ...invoice, discountPercent: e.target.value })}
        />
      </label>
    </div>
  )
}
