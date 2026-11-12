import { ProductLine, Invoice, DocumentType } from './types'
import { symbolForCode } from './currencies'

export const initialProductLine: ProductLine = {
  description: '',
  quantity: '1',
  rate: '0.00',
}

export function createInitialInvoice(docType: DocumentType = 'invoice'): Invoice {
  const titles = {
    invoice: 'INVOICE',
    quote: 'QUOTE',
    receipt: 'RECEIPT',
  }
  const titleLabels = {
    invoice: 'Invoice #',
    quote: 'Quote #',
    receipt: 'Receipt #',
  }
  return {
    logo: '',
    logoWidth: 100,
    title: titles[docType],
    documentType: docType,
    companyName: '',
    name: '',
    companyAddress: '',
    companyAddress2: '',
    companyCountry: 'Rwanda',
    billTo: 'Bill To:',
    clientName: '',
    clientAddress: '',
    clientAddress2: '',
    clientCountry: 'Rwanda',
    invoiceTitleLabel: titleLabels[docType],
    invoiceTitle: '',
    invoiceDateLabel: docType === 'quote' ? 'Quote Date' : 'Date',
    invoiceDate: '',
    invoiceDueDateLabel: docType === 'invoice' ? 'Due Date' : 'Valid Until',
    invoiceDueDate: '',
    productLineDescription: 'Description',
    productLineQuantity: 'Qty',
    productLineQuantityRate: 'Rate',
    productLineQuantityAmount: 'Amount',
    productLines: [
      { description: '', quantity: '1', rate: '0.00' },
      { ...initialProductLine },
    ],
    subTotalLabel: 'Subtotal',
    taxLabel: 'VAT (18%)',
    totalLabel: 'TOTAL',
    currency: symbolForCode('RWF'),
    currencyCode: 'RWF',
    vatMode: 'standard',
    vatRate: 18,
    discountPercent: '0',
    discountLabel: 'Discount',
    notesLabel: 'Notes',
    notes: '',
    termLabel: 'Terms',
    term: '',
  }
}

export const initialInvoice = createInitialInvoice('invoice')
