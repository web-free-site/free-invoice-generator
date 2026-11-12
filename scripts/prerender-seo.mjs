import fs from 'node:fs'
import path from 'node:path'

const HOST = 'https://free-invoice-generator.web-free.site'
const dist = path.resolve('dist')
const baseHtml = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

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
]

function buildPage(page) {
  const url = HOST + page.path
  let html = baseHtml
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${page.locale}"`)
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
  html = html.replace(
    /<meta name="description" content="[^"]*"\/>/,
    `<meta name="description" content="${page.description}"/>`,
  )
  if (!html.includes('rel="canonical"')) {
    html = html.replace('</head>', `<link rel="canonical" href="${url}"/></head>`)
  } else {
    html = html.replace(/<link rel="canonical" href="[^"]*"\/>/, `<link rel="canonical" href="${url}"/>`)
  }
  const seoBlock = `<section id="seo-prerender" class="seo-prerender"><h1>${page.h1}</h1>${page.snippet}</section>`
  html = html.replace('<div id="root"></div>', `${seoBlock}<div id="root"></div>`)
  return html
}

for (const page of pages) {
  const dir = path.join(dist, page.path.replace(/^\//, ''))
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), buildPage(page))
}

console.log('Prerendered', pages.length, 'route shells from Vite index.html')
