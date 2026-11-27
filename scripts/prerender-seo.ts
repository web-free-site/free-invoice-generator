import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SEO_PAGES } from '../src/seo/pages'
import { renderHomeStaticHtml } from '../src/seo/renderStaticHtml'
import { messages } from '../src/i18n/messages'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const HOST = 'https://free-invoice-generator.web-free.site'
const dist = path.resolve(__dirname, '..', 'dist')
const baseHtml = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

function escAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

function escText(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const pages = [
  {
    path: '/fr/facture-gratuite',
    locale: 'fr',
    title: 'Facture gratuite en ligne — Générateur PDF | Sans inscription',
    description: 'Créez une facture professionnelle gratuite. TVA optionnelle, devises africaines, PDF instantané.',
    h1: 'Générateur de facture gratuit pour freelances et TPE',
    snippet:
      '<p>Créez des factures en français pour vos clients à Kigali et en Afrique francophone. Aucune inscription. Devises RWF, FCFA, USD, EUR.</p>',
  },
  {
    path: '/quote-generator',
    locale: 'en',
    title: 'Free Quote Generator — PDF estimates',
    description: 'Free quote and estimate PDF generator in your browser.',
    h1: 'Free quote generator',
    snippet: '<p>Build professional quotes with line items, VAT, and PDF export. Data stays in your browser.</p>',
  },
  {
    path: '/receipt-generator',
    locale: 'en',
    title: 'Free Receipt Generator — PDF receipts',
    description: 'Simple receipt PDFs for small businesses.',
    h1: 'Free receipt generator',
    snippet: '<p>Confirm payments with a clean receipt PDF. Ideal for shops and freelancers.</p>',
  },
  {
    path: '/invoice-template-no-vat',
    locale: 'en',
    title: 'Free invoice template with no VAT',
    description: 'Invoice without VAT lines for exempt sales.',
    h1: 'No-VAT invoice template',
    snippet: '<p>Use a free invoice layout with VAT turned off. Enable tax later if needed.</p>',
  },
  {
    path: '/privacy',
    locale: 'en',
    title: 'Privacy Policy — Free Invoice Generator',
    description:
      'How Free Invoice Generator handles your data: drafts stay in browser localStorage only, no server uploads, and optional ad network cookies.',
    h1: 'Privacy',
    snippet:
      '<p>Free Invoice Generator stores your drafts in your browser localStorage only. We do not upload invoices to our servers. Ad networks may set cookies when ads are enabled.</p>',
  },
  {
    path: '/terms',
    locale: 'en',
    title: 'Terms of Use — Free Invoice Generator',
    description:
      'Terms for using the free invoice generator: provided as-is, you are responsible for tax compliance and invoice accuracy in your jurisdiction.',
    h1: 'Terms of use',
    snippet:
      '<p>This tool is provided as-is without warranty. You are responsible for tax compliance and invoice accuracy in your jurisdiction.</p>',
  },
  {
    path: '/about',
    locale: 'en',
    title: 'About Free Invoice Generator',
    description:
      'Free Invoice Generator helps English- and French-speaking freelancers in Africa create PDF invoices with RWF, FCFA, USD, and EUR. Built by Gentil M. in Kigali.',
    h1: 'About',
    snippet:
      '<p>Free Invoice Generator is built for freelancers in Africa with support for RWF, FCFA, and major currencies. Based on the open-source react-invoice-generator project.</p>',
  },
  {
    path: '/contact',
    locale: 'en',
    title: 'Contact — Free Invoice Generator',
    description: 'Contact Free Invoice Generator for support, partnerships, or corrections. Email gentil@quevvy.com.',
    h1: 'Contact',
    snippet: '<p>Email gentil@quevvy.com for support, partnerships, or corrections.</p>',
  },
]

function buildPage(page: (typeof pages)[number]) {
  const url = HOST + page.path
  let html = baseHtml
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${page.locale}"`)
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escAttr(page.description)}" />`,
  )
  if (!html.includes('rel="canonical"')) {
    html = html.replace('</head>', `    <link rel="canonical" href="${url}" />\n  </head>`)
  } else {
    html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`)
  }
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`)
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escAttr(page.title)}" />`)
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escAttr(page.description)}" />`,
  )
  const seoBlock = `<section id="seo-prerender" class="seo-prerender"><h1>${escText(page.h1)}</h1>${page.snippet}</section>`
  html = html.replace('<div id="root"></div>', `${seoBlock}<div id="root"></div>`)
  return html
}

for (const page of pages) {
  const dir = path.join(dist, page.path.replace(/^\//, ''))
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), buildPage(page))
}

const home = SEO_PAGES.find((p) => p.path === '/')
if (!home) throw new Error('Home SEO page missing')
let homeHtml = baseHtml
const rootInner = renderHomeStaticHtml(home, messages.en.tagline)
homeHtml = homeHtml.replace('<div id="root"></div>', `<div id="root">\n${rootInner}\n</div>`)

if (!homeHtml.includes('FAQPage')) {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: home.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  homeHtml = homeHtml.replace('</head>', `    <script type="application/ld+json">${JSON.stringify(faqLd)}</script>\n  </head>`)
}

const h1Count = (homeHtml.match(/<h1\b/gi) || []).length
if (h1Count !== 1) {
  throw new Error(`dist/index.html must contain exactly one <h1>, found ${h1Count}`)
}

fs.writeFileSync(path.join(dist, 'index.html'), homeHtml)

console.log('Prerendered', pages.length, 'route shells and injected homepage static SEO into dist/index.html')