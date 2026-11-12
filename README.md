# Free Invoice Generator

Live site: [free-invoice-generator.web-free.site](https://free-invoice-generator.web-free.site)

Browser-only invoices, quotes, and receipts for freelancers and small businesses in Africa (English + French). Built for **Gentil M.** (Kigali, Rwanda).

## Upstream base project

| Field | Value |
| --- | --- |
| Repository | [tuanpham-dev/react-invoice-generator](https://github.com/tuanpham-dev/react-invoice-generator) |
| Stars | ~680+ (check GitHub for current count) |
| License | **MIT** (see `LICENSE-UPSTREAM`) |
| Why this base | Mature React + Vite app using **@react-pdf/renderer** for **100% client-side** PDF generation and **localStorage** persistence — no backend. MIT allows rebranding while keeping attribution in the footer. |

Alternatives considered: [al1abb/invoify](https://github.com/al1abb/invoify) (more stars but **server-side Puppeteer** PDF); [VladSez/easy-invoice-pdf](https://github.com/VladSez/easy-invoice-pdf) (**AGPL-3**).

## Features

- Invoice, quote, and receipt modes
- Logo upload, line items, optional VAT / no-VAT, discount %
- Currencies: **RWF**, **CDF (FC)**, **XOF/XAF (FCFA)**, **USD**, **EUR**
- PDF download (react-pdf); print via browser
- Data in **localStorage** only
- SEO landing pages with FAQ + JSON-LD
- **Adsterra** slots via `public/ads.json` (empty = no ad rendered)

## Build & deploy

From a fresh clone:

```bash
npm install
npx wrangler deploy
```

`npx wrangler deploy` runs `npm run build` automatically via the Wrangler build command... **Note:** configure local deploy as:

```bash
npm install
npm run deploy
```

which equals `npm run build && wrangler deploy`.

- **Build only:** `npm run build` → `dist/` + `sitemap.xml` + prerendered route folders
- **Local preview:** `npm run preview` then open the printed URL (port 4173)

### Wrangler

- Worker name: `free-invoice-generator`
- Account ID: `c26dbba499d049a1051c152c720cf4c5`
- Custom domain: `free-invoice-generator.web-free.site`
- Static assets: `dist/` (no COEP/COOP headers)

## `public/ads.json` (Adsterra)

Banner units load in isolated iframes from `https://bauval.org/22/<key>` (not highrevenueformat). Popunder, Social Bar, and Native use their absolute script URLs. Set `"enabled": false` to hide all ad UI.

Slots on every page: header 728x90, sidebar 160x600, mobile sticky 320x50. Homepage also has a top 728x90. No COEP/COOP headers, and no CSP that would block abscloud.org, bauval.org, or araplhn.org.

## Pages

| Path | Purpose |
| --- | --- |
| `/` | Main English tool |
| `/fr`, `/fr/facture-gratuite` | French |
| `/quote-generator` | Quotes |
| `/receipt-generator` | Receipts |
| `/invoice-template-no-vat` | No-VAT preset |
| `/privacy`, `/terms`, `/about`, `/contact` | Legal / about |

## Tests

```bash
npm test
```

Unit tests cover invoice total math (`src/lib/totals.test.ts`).

## Contact

- Site operator: [Gentil M.](https://gentil.quevvy.com)
- Email: gentil@quevvy.com
