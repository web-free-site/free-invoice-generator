import { FC, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Locale, t } from '../i18n/messages'
import { AdSlot, SponsoredSmartlink, useAdScripts } from './ads/AdSlot'
import { SITE } from '../site'

interface Props {
  locale: Locale
  onLocale: (l: Locale) => void
  children: ReactNode
  showHomeBanner?: boolean
}

const localePath = (locale: Locale, path: string) => (locale === 'fr' && path === '/' ? '/fr' : path)

export const Layout: FC<Props> = ({ locale, onLocale, children, showHomeBanner }) => {
  const location = useLocation()
  useAdScripts()

  const switchEn = location.pathname.startsWith('/fr') ? '/' : location.pathname
  const switchFr = location.pathname.startsWith('/fr') ? location.pathname : `/fr${location.pathname === '/' ? '' : location.pathname}`

  return (
    <div className="site">
      <header className="site-header">
        <AdSlot slot="header728x90" className="ad-header" label="Sponsored" />
        <div className="site-header__inner">
          <Link to={localePath(locale, '/')} className="brand">
            <span className="brand__mark">Fi</span>
            <span className="brand__text">
              <strong>{t(locale, 'siteName')}</strong>
              <small>{t(locale, 'tagline')}</small>
            </span>
          </Link>
          <nav className="nav" aria-label="Main">
            <Link to={localePath(locale, '/')}>{t(locale, 'createInvoice')}</Link>
            <Link to="/quote-generator">{t(locale, 'createQuote')}</Link>
            <Link to="/receipt-generator">{t(locale, 'createReceipt')}</Link>
            <Link to="/invoice-template-no-vat">No VAT</Link>
            <Link to={locale === 'fr' ? '/fr/facture-gratuite' : '/fr/facture-gratuite'}>FR</Link>
            <div className="lang-switch" aria-label={t(locale, 'language')}>
              <Link className={locale === 'en' ? 'active' : ''} to={switchEn} onClick={() => onLocale('en')}>
                EN
              </Link>
              <Link className={locale === 'fr' ? 'active' : ''} to={switchFr} onClick={() => onLocale('fr')}>
                FR
              </Link>
            </div>
          </nav>
        </div>
        {showHomeBanner ? <AdSlot slot="homeTop728x90" className="ad-home-top" /> : null}
      </header>

      <div className="site-body">
        <main className="site-main">{children}</main>
        <aside className="site-sidebar" aria-label="Sidebar">
          <AdSlot slot="sidebar160x600" className="ad-sidebar" />
        </aside>
      </div>

      <AdSlot slot="mobileSticky320x50" className="ad-mobile-sticky" label="Sponsored" />

      <footer className="site-footer">
        <p>
          <a href={SITE.gentilUrl} rel="noopener noreferrer">
            {t(locale, 'byGentil')}
          </a>
          {' · '}
          <a href="https://github.com/tuanpham-dev/react-invoice-generator" rel="noopener noreferrer">
            MIT react-invoice-generator
          </a>
        </p>
        <p>
          <Link to="/privacy">{t(locale, 'privacy')}</Link>
          {' · '}
          <Link to="/terms">{t(locale, 'terms')}</Link>
          {' · '}
          <Link to="/about">{t(locale, 'about')}</Link>
          {' · '}
          <Link to="/contact">{t(locale, 'contact')}</Link>
          {' · '}
          <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
        </p>
        <p className="muted">{t(locale, 'savedLocally')}</p>
        <SponsoredSmartlink />
      </footer>
      <div id="ad-social-bar-root" className="ad-social-root" />
      <div id="ad-popunder-root" className="ad-popunder-root" hidden />
    </div>
  )
}
