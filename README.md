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

Owner fills **non-empty** HTML/script strings. Empty or missing values render nothing.

```json
{
  "enabled": true,
  "socialBar": "<!-- Adsterra Social Bar code -->",
  "popunder": "<!-- Adsterra Popunder script -->",
  "slots": {
    "header728x90": "<!-- 728x90 -->",
    "homeTop728x90": "<!-- homepage top 728x90 -->",
    "betweenToolContent728x90": "<!-- between tool and article -->",
    "sidebar160x600": "<!-- desktop sidebar 160x600 -->",
    "mobileSticky320x50": "<!-- mobile sticky 320x50 -->",
    "nativeBelowResult": "<!-- native below PDF area -->",
    "content468x60": "<!-- optional in-article 468x60 -->",
    "content300x250": "<!-- in-article 300x250 -->"
  }
}
```

Set `"enabled": false` to hide all ad UI even if codes are present.

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
