import { SITE } from '../site'

export interface SeoPage {
  path: string
  locale: 'en' | 'fr'
  title: string
  description: string
  h1: string
  keywords: string
  paragraphs: string[]
  faq: { q: string; a: string }[]
  toolDocType?: 'invoice' | 'quote' | 'receipt'
  vatNone?: boolean
}

export const SEO_PAGES: SeoPage[] = [
  {
    path: '/',
    locale: 'en',
    title: 'Free Invoice Generator — PDF invoices for Africa | No sign-up',
    description:
      'Create free professional invoices, quotes, and receipts in your browser. RWF, FCFA, USD, EUR. VAT optional. PDF download. Data stays on your device.',
    h1: 'Free Invoice Generator for freelancers and small businesses',
    keywords: 'free invoice generator, invoice PDF, Africa freelancer, RWF invoice',
    paragraphs: [
      'Free Invoice Generator helps freelancers and small businesses in Rwanda, the DRC, and across Francophone Africa issue clear invoices without creating an account. Everything runs in your browser: line items, optional VAT, discounts, your logo, and instant PDF export.',
      'Pick Rwandan francs, Congolese francs, West or Central African FCFA, US dollars, or euros. Toggle VAT off when you need a simple receipt or a no-VAT template. Your draft is stored only in localStorage on your device — we never see your client data.',
      'Built for speed on mobile networks: lightweight, no backend, no tracking login. Download or print a PDF, send it by WhatsApp or email, and get paid faster.',
    ],
    faq: [
      {
        q: 'Is this invoice generator really free?',
        a: 'Yes. There is no subscription and no account. You can create and download PDFs for free.',
      },
      {
        q: 'Where is my invoice data stored?',
        a: 'Only in your browser localStorage. Clear site data to remove it.',
      },
      {
        q: 'Which currencies are supported?',
        a: 'RWF, CDF (FC), XOF/XAF (FCFA), USD, and EUR.',
      },
    ],
    toolDocType: 'invoice',
  },
  {
    path: '/fr/facture-gratuite',
    locale: 'fr',
    title: 'Facture gratuite en ligne — Générateur PDF | Sans inscription',
    description:
      'Créez une facture professionnelle gratuite en français. TVA optionnelle, devises RWF, FCFA, USD, EUR. PDF instantané, données locales.',
    h1: 'Générateur de facture gratuit pour freelances et TPE',
    keywords: 'facture gratuite, générateur facture, Afrique, TVA, PDF',
    paragraphs: [
      'Ce générateur de facture gratuit s’adresse aux indépendants et petites entreprises à Kigali, Kinshasa, Abidjan, Dakar et ailleurs. Rédigez vos lignes, ajoutez votre logo, appliquez la TVA ou choisissez un modèle sans TVA, puis téléchargez un PDF prêt à envoyer.',
      'Les devises courantes en Afrique de l’Est et de l’Ouest sont intégrées : franc rwandais, franc congolais, franc CFA, ainsi que le dollar et l’euro. Aucune inscription : vos brouillons restent sur votre téléphone ou ordinateur.',
      'Passez de l’anglais au français à tout moment. Imprimez ou partagez votre facture en quelques secondes, même avec une connexion lente.',
    ],
    faq: [
      {
        q: 'La facture est-elle gratuite ?',
        a: 'Oui, sans abonnement ni compte obligatoire.',
      },
      {
        q: 'Où sont enregistrées mes données ?',
        a: 'Uniquement dans le stockage local de votre navigateur.',
      },
      {
        q: 'Puis-je facturer sans TVA ?',
        a: 'Oui, utilisez le modèle sans TVA ou la page dédiée.',
      },
    ],
    toolDocType: 'invoice',
  },
  {
    path: '/quote-generator',
    locale: 'en',
    title: 'Free Quote Generator — PDF estimates in your browser',
    description: 'Make free quotes and estimates with line items, VAT, and multi-currency support. Client-side PDF, no sign-up.',
    h1: 'Free quote generator for service businesses',
    keywords: 'free quote generator, estimate PDF, proposal',
    paragraphs: [
      'Send polished quotes before you invoice. Use the same free tool with the document type set to Quote: describe deliverables, quantity, and rate, add optional VAT, and export a PDF your client can approve.',
      'Quotes use the same privacy model as invoices — nothing leaves your browser unless you share the PDF. Switch currency to match your client in Kigali, Nairobi, or Paris.',
      'When the work is done, duplicate the quote into an invoice with one click from the editor controls.',
    ],
    faq: [
      { q: 'Can I turn a quote into an invoice?', a: 'Yes — change the document type in the editor and update the title.' },
      { q: 'Is VAT optional on quotes?', a: 'Yes. Disable VAT or set the rate to 0%.' },
    ],
    toolDocType: 'quote',
  },
  {
    path: '/receipt-generator',
    locale: 'en',
    title: 'Free Receipt Generator — simple PDF receipts',
    description: 'Create free payment receipts with logo and line items. Browser-only PDF. Ideal for cash sales and small shops.',
    h1: 'Free receipt generator for quick payment proof',
    keywords: 'receipt generator, free receipt PDF',
    paragraphs: [
      'Receipts confirm payment. Choose Receipt as the document type, list what was paid for, and download a compact PDF. Many African micro-businesses skip heavy accounting software — this fills the gap.',
      'Use FCFA or RWF symbols so totals look familiar to customers. No VAT block appears when you select the no-VAT preset.',
      'Print on thermal paper from your browser print dialog or save the PDF for your records.',
    ],
    faq: [
      { q: 'Do I need VAT on a receipt?', a: 'Often no — select the no-VAT template if tax does not apply.' },
    ],
    toolDocType: 'receipt',
  },
  {
    path: '/invoice-template-no-vat',
    locale: 'en',
    title: 'Free invoice template with no VAT — PDF download',
    description: 'Invoice template without VAT for exempt sales, exports, or simple receipts. Free, browser-based.',
    h1: 'No-VAT invoice template (free)',
    keywords: 'invoice template no VAT, free invoice without tax',
    paragraphs: [
      'Some sales are VAT-exempt or you simply need a clean subtotal without tax lines. This page opens the generator with VAT disabled and labels adjusted for a no-VAT invoice.',
      'You still get line items, discounts, currency formatting, and PDF export. Enable VAT later from the editor if your regime requires it.',
      'Freelancers working across borders often need both modes — bookmark this template for quick access.',
    ],
    faq: [
      { q: 'Can I add VAT later?', a: 'Yes — switch VAT mode in the editor to With VAT and set your rate.' },
    ],
    vatNone: true,
    toolDocType: 'invoice',
  },
]

export function canonicalFor(path: string): string {
  const p = path === '/' ? '' : path.replace(/\/$/, '')
  return `${SITE.canonicalHost}${p || '/'}`
}
