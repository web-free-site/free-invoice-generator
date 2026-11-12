import { FC, useEffect, useMemo, useState } from 'react'

type BannerDef = { key: string; width: number; height: number }

type AdsConfig = {
  enabled: boolean
  bannerScriptBase?: string
  socialBar?: string
  popunder?: string
  nativeBanner?: { src: string; containerId: string }
  smartlink?: { url: string; label?: string }
  banners?: Record<string, BannerDef>
  slots?: Record<string, string>
}

const DEFAULT_BANNER_BASE = 'https://bauval.org/22'

let adsCache: AdsConfig | null = null

async function loadAds(): Promise<AdsConfig> {
  if (adsCache) return adsCache
  try {
    const res = await fetch('/ads.json')
    adsCache = (await res.json()) as AdsConfig
  } catch {
    adsCache = { enabled: false }
  }
  return adsCache
}

function bannerIframeSrcDoc(key: string, width: number, height: number, scriptBase: string): string {
  const atOptions = JSON.stringify({
    key,
    format: 'iframe',
    height,
    width,
    params: {},
  })
  const src = `${scriptBase.replace(/\/$/, '')}/${key}`
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="referrer" content="no-referrer-when-downgrade"></head><body style="margin:0;padding:0;overflow:hidden;background:transparent"><script type="text/javascript">var atOptions = ${atOptions};</script><script type="text/javascript" src="${src}"><\/script></body></html>`
}

function injectExternalScript(src: string, marker: string, target: HTMLElement) {
  if (!src || document.querySelector(`script[data-ad="${marker}"]`)) return
  const script = document.createElement('script')
  script.src = src
  script.async = true
  script.setAttribute('data-cfasync', 'false')
  script.setAttribute('data-ad', marker)
  target.appendChild(script)
}

export type AdSlotName =
  | 'header728x90'
  | 'homeTop728x90'
  | 'betweenToolContent728x90'
  | 'sidebar160x600'
  | 'mobileSticky320x50'
  | 'nativeBelowResult'
  | 'content468x60'
  | 'content300x250'

interface Props {
  slot: AdSlotName
  className?: string
  label?: string
}

export const AdSlot: FC<Props> = ({ slot, className = '', label = 'Advertisement' }) => {
  const [cfg, setCfg] = useState<AdsConfig | null>(null)

  useEffect(() => {
    let active = true
    loadAds().then((loaded) => {
      if (active) setCfg(loaded)
    })
    return () => {
      active = false
    }
  }, [])

  if (!cfg?.enabled) return null

  const mapped = cfg.slots?.[slot] ?? slot

  if (mapped === 'nativeBanner' || slot === 'nativeBelowResult') {
    const native = cfg.nativeBanner
    if (!native?.src || !native.containerId) return null
    return <NativeBanner cfg={native} className={className} label={label} />
  }

  const def = cfg.banners?.[mapped]
  if (!def?.key) return null

  const scriptBase = cfg.bannerScriptBase || DEFAULT_BANNER_BASE
  return (
    <BannerFrame
      def={def}
      scriptBase={scriptBase}
      slot={slot}
      className={className}
      label={label}
    />
  )
}

const BannerFrame: FC<{
  def: BannerDef
  scriptBase: string
  slot: string
  className: string
  label: string
}> = ({ def, scriptBase, slot, className, label }) => {
  const srcDoc = useMemo(
    () => bannerIframeSrcDoc(def.key, def.width, def.height, scriptBase),
    [def.key, def.width, def.height, scriptBase],
  )

  return (
    <aside className={`ad-slot ${className}`} aria-label={label} data-ad-slot={slot}>
      <div className="ad-slot__label">{label}</div>
      <iframe
        title={`Advertisement ${slot}`}
        width={def.width}
        height={def.height}
        className="ad-slot__frame"
        style={{ maxWidth: '100%', border: 0, height: def.height, overflow: 'hidden' }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
        srcDoc={srcDoc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </aside>
  )
}

const NativeBanner: FC<{
  cfg: { src: string; containerId: string }
  className: string
  label: string
}> = ({ cfg, className, label }) => {
  useEffect(() => {
    injectExternalScript(cfg.src, `native-${cfg.containerId}`, document.body)
  }, [cfg.src, cfg.containerId])

  return (
    <aside className={`ad-slot ${className}`} aria-label={label} data-ad-slot="nativeBelowResult">
      <div className="ad-slot__label">{label}</div>
      <div id={cfg.containerId} className="ad-slot__native" />
    </aside>
  )
}

export function useAdScripts() {
  useEffect(() => {
    loadAds().then((cfg) => {
      if (!cfg.enabled) return
      if (cfg.socialBar?.trim() && !cfg.socialBar.trim().startsWith('<')) {
        injectExternalScript(cfg.socialBar.trim(), 'social-bar', document.body)
      }
      if (cfg.popunder?.trim() && !cfg.popunder.trim().startsWith('<')) {
        injectExternalScript(cfg.popunder.trim(), 'popunder', document.head)
      }
    })
  }, [])
}

export const SponsoredSmartlink: FC<{ className?: string }> = ({ className = '' }) => {
  const [link, setLink] = useState<{ url: string; label: string } | null>(null)

  useEffect(() => {
    loadAds().then((cfg) => {
      if (cfg.enabled && cfg.smartlink?.url) {
        setLink({ url: cfg.smartlink.url, label: cfg.smartlink.label || 'Sponsored' })
      }
    })
  }, [])

  if (!link) return null

  return (
    <p className={`ad-smartlink ${className}`}>
      <a href={link.url} target="_blank" rel="sponsored noopener noreferrer">
        {link.label}
      </a>
    </p>
  )
}
