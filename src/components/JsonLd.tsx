import { FC } from 'react'
import { SeoPage, canonicalFor } from '../seo/pages'
import { SITE } from '../site'

interface Props {
  page: SeoPage
}

export const JsonLd: FC<Props> = ({ page }) => {
  const url = canonicalFor(page.path)
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: SITE.name,
        url,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        inLanguage: [page.locale === 'fr' ? 'fr' : 'en', 'en'],
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.canonicalHost + '/' },
          ...(page.path !== '/'
            ? [{ '@type': 'ListItem', position: 2, name: page.h1, item: url }]
            : []),
        ],
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
