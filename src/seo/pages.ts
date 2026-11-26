import { SITE } from '../site'

export interface SeoPage {
  path: string
  locale: 'en' | 'fr'
  title: string
  description: string
  h1: string
  keywords: string
  paragraphs: string[]
  sections?: { h2: string; paragraphs?: string[]; steps?: string[] }[]
  hubLinks?: { href: string; label: string }[]
  faq: { q: string; a: string }[]
  toolDocType?: 'invoice' | 'quote' | 'receipt'
  vatNone?: boolean
}

export const SEO_PAGES: SeoPage[] = [
  {
    path: '/',
    locale: 'en',
    title: 'Free Invoice Generator — PDF Invoices, Quotes & Receipts | No Sign-up',
    description:
      'Free Invoice Generator creates professional PDF invoices in your browser. Add line items, VAT, your logo, and RWF, FCFA, USD, or EUR. No account—data stays on your device.',
    h1: 'Free Invoice Generator',
    keywords: 'free invoice generator, invoice PDF, Africa freelancer, RWF invoice',
    paragraphs: [
      'Free Invoice Generator is a browser-based tool for freelancers, consultants, shop owners, and small businesses who need a clear, professional invoice without installing accounting software or paying for a subscription. You fill in your business details, your client’s name, line items, quantities, and rates, then export a print-ready PDF in one session.',
      'The editor supports invoices, quotes, and receipts from the same screen. You can show or hide VAT, apply a discount, upload your logo, and switch currency symbols so totals look familiar to clients in Kigali, Kinshasa, Lagos, Dakar, Nairobi, or abroad. Everything is formatted for readable PDF output you can attach to email, send on WhatsApp, or print for your records.',
      'This site is part of the Web Free collection of utilities that run entirely in your tab. There is no registration wall, no per-invoice fee, and no requirement to store client lists on someone else’s server.',
    ],
    sections: [
      {
        h2: 'How to use the Free Invoice Generator',
        paragraphs: [
          'Open the editor above on a phone, tablet, or desktop. You do not need to download an app. When you first visit, a sample invoice may appear so you can see how fields map to the PDF; replace every line with your own data before sending anything to a client.',
        ],
        steps: [
          'Set the document type (Invoice, Quote, or Receipt) and choose your currency—for example RWF, West or Central African FCFA, USD, or EUR.',
          'Enter your business name, address, and contact details in the header, then add the client’s billing information.',
          'Add line items with a short description, quantity, and unit price. The tool calculates subtotals, optional VAT, discounts, and the grand total automatically.',
          'Upload a logo if you have one, adjust the invoice number and dates, and double-check tax settings match your local rules.',
          'Click Download PDF (or use your browser print dialog) and save the file. Share it with your client and keep a copy for your books.',
        ],
      },
      {
        h2: 'Privacy and in-browser processing',
        paragraphs: [
          'Your draft invoice is saved in your browser’s local storage on the device you are using. It is not uploaded to our servers as part of normal editing, and we do not operate a database of your clients or line items. If you clear site data or use a private window without saving the PDF elsewhere, the draft disappears—so download or back up important invoices when you are done.',
          'Generating the PDF happens in your browser using client-side rendering. That keeps typical invoicing workflows fast on mobile networks and avoids handing financial details to a third-party upload form. You remain responsible for tax compliance, correct totals, and lawful content on the documents you issue; the tool is provided as-is to help you format and export them quickly.',
        ],
      },
      {
        h2: 'Common use cases',
        paragraphs: [
          'Freelance designers, developers, and translators use Free Invoice Generator to bill one-off projects and retainers when a full ERP system would be overkill. Market vendors and repair shops issue simple receipts after cash sales. Nonprofits and associations sometimes need a standardized PDF for grants or member services. Remote teams working across countries pick a currency that matches the payer while keeping descriptions in English.',
          'If you already know what belongs on an invoice but want a step-by-step walkthrough with African currency examples, read the companion guide on Web Free. For field-level tips without spreadsheets, see the short guides linked in the footer of this site.',
        ],
      },
    ],
    hubLinks: [
      { href: 'https://web-free.site/?ref=free-invoice-generator', label: 'browse all free browser tools on Web Free' },
      {
        href: 'https://web-free.site/guides/create-invoice-pdf-rwf-fcfa-free/?ref=free-invoice-generator',
        label: 'how to create an invoice PDF with RWF, FCFA, or USD',
      },
    ],
    faq: [
      {
        q: 'Is this invoice generator really free?',
        a: 'Yes. There is no subscription, no per-document fee, and no account required. You can create and download PDF invoices, quotes, and receipts for free.',
      },
      {
        q: 'Where is my invoice data stored?',
        a: 'Only in your browser’s local storage on your device. We do not store your drafts on our servers. Clear site data in your browser settings to remove saved invoices.',
      },
      {
        q: 'Which currencies does the Free Invoice Generator support?',
        a: 'You can format amounts in Rwandan francs (RWF), Congolese francs (CDF), West and Central African CFA francs (XOF/XAF), US dollars (USD), and euros (EUR).',
      },
      {
        q: 'Do I need to install software or sign up?',
        a: 'No. The tool runs in a modern web browser on desktop or mobile. Open the page, edit the invoice, and download a PDF without installing apps or creating a login.',
      },
      {
        q: 'Can I make quotes and receipts with the same tool?',
        a: 'Yes. Change the document type in the toolbar to Quote or Receipt. Line items, totals, and PDF export work the same way; only the document title and wording change.',
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
  {
    path: '/privacy',
    locale: 'en',
    title: 'Privacy Policy — Free Invoice Generator',
    description:
      'How Free Invoice Generator handles your data: drafts stay in browser localStorage only, no server uploads, and optional ad network cookies.',
    h1: 'Privacy',
    keywords: 'privacy policy, invoice generator, localStorage',
    paragraphs: [
      'Free Invoice Generator stores your drafts in your browser localStorage only. We do not operate a user database or upload your invoices to our servers.',
      'Ad networks may set cookies when ad codes are enabled; see their policy when ads are active.',
    ],
    faq: [],
  },
  {
    path: '/terms',
    locale: 'en',
    title: 'Terms of Use — Free Invoice Generator',
    description:
      'Terms for using the free invoice generator: provided as-is, you are responsible for tax compliance and invoice accuracy in your jurisdiction.',
    h1: 'Terms of use',
    keywords: 'terms of use, free invoice tool',
    paragraphs: [
      'This tool is provided as-is without warranty. You are responsible for tax compliance and invoice accuracy in your jurisdiction.',
      'Do not use the site for unlawful content.',
    ],
    faq: [],
  },
  {
    path: '/about',
    locale: 'en',
    title: 'About Free Invoice Generator',
    description:
      'Free Invoice Generator helps English- and French-speaking freelancers in Africa create PDF invoices with RWF, FCFA, USD, and EUR. Built by Gentil M. in Kigali.',
    h1: 'About',
    keywords: 'about, invoice generator Africa, Gentil M.',
    paragraphs: [
      'Free Invoice Generator is built for French- and English-speaking freelancers in Africa, especially Rwanda, with support for RWF, FCFA, and major currencies.',
      'The editor is based on the open-source MIT project react-invoice-generator, extended and rebranded for Gentil M.',
    ],
    faq: [],
  },
  {
    path: '/contact',
    locale: 'en',
    title: 'Contact — Free Invoice Generator',
    description: 'Contact Free Invoice Generator for support, partnerships, or corrections. Email gentil@quevvy.com.',
    h1: 'Contact',
    keywords: 'contact, support, invoice generator',
    paragraphs: ['Email gentil@quevvy.com for support, partnerships, or corrections.'],
    faq: [],
  },
]

export function canonicalFor(path: string): string {
  const p = path === '/' ? '' : path.replace(/\/$/, '')
  return `${SITE.canonicalHost}${p || '/'}`
}
