import { FC } from 'react'
import { Locale } from '../i18n/messages'
import { SITE } from '../site'
import { AdSlot } from '../components/ads/AdSlot'

interface Props {
  locale: Locale
  kind: 'privacy' | 'terms' | 'about' | 'contact'
}

const copy: Record<string, { title: string; body: string[] }> = {
  privacy: {
    title: 'Privacy',
    body: [
      'Free Invoice Generator stores your drafts in your browser localStorage only. We do not operate a user database or upload your invoices to our servers.',
      'Ad networks (Adsterra) may set cookies when ad codes are enabled; see their policy when ads are active.',
      'Contact: gentil@quevvy.com for data questions.',
    ],
  },
  terms: {
    title: 'Terms of use',
    body: [
      'This tool is provided as-is without warranty. You are responsible for tax compliance and invoice accuracy in your jurisdiction.',
      'Do not use the site for unlawful content. Gentil M. may update these terms.',
    ],
  },
  about: {
    title: 'About',
    body: [
      'Free Invoice Generator is built for French- and English-speaking freelancers in Africa, especially Rwanda, with support for RWF, FCFA, and major currencies.',
      'The editor is based on the open-source MIT project react-invoice-generator by Tuan Pham, extended and rebranded for Gentil M.',
      `Operator: Gentil M., Kigali, Rwanda — ${SITE.gentilUrl}`,
    ],
  },
  contact: {
    title: 'Contact',
    body: [`Email ${SITE.contactEmail} for support, partnerships, or corrections.`],
  },
}

export const LegalPage: FC<Props> = ({ kind }) => {
  const c = copy[kind]
  return (
    <article className="legal-page">
      <h1>{c.title}</h1>
      {c.body.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <AdSlot slot="content300x250" className="ad-content" />
    </article>
  )
}
