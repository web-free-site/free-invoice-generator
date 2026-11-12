import { FC, useEffect, useState } from 'react'

type AdsConfig = {
  enabled: boolean
  socialBar?: string
  popunder?: string
  slots: Record<string, string>
}

let adsCache: AdsConfig | null = null

async function loadAds(): Promise<AdsConfig> {
  if (adsCache) return adsCache
  try {
    const res = await fetch('/ads.json')
    adsCache = (await res.json()) as AdsConfig
  } catch {
    adsCache = { enabled: false, slots: {} }
  }
  return adsCache
}

interface Props {
  slot: keyof AdsConfig['slots'] | 'socialBar' | 'popunder'
  className?: string
  label?: string
}

export const AdSlot: FC<Props> = ({ slot, className = '', label = 'Advertisement' }) => {
  const [html, setHtml] = useState<string>('')

  useEffect(() => {
    let active = true
    loadAds().then((cfg) => {
      if (!active || !cfg.enabled) return
      let code = ''
      if (slot === 'socialBar') code = cfg.socialBar ?? ''
      else if (slot === 'popunder') code = cfg.popunder ?? ''
      else code = cfg.slots[slot] ?? ''
      if (code.trim()) setHtml(code)
    })
    return () => {
      active = false
    }
  }, [slot])

  if (!html) return null

  return (
    <aside className={`ad-slot ${className}`} aria-label={label}>
      <div className="ad-slot__label">{label}</div>
      <div className="ad-slot__body" dangerouslySetInnerHTML={{ __html: html }} />
    </aside>
  )
}

export function useAdScripts() {
  useEffect(() => {
    loadAds().then((cfg) => {
      if (!cfg.enabled) return
      if (cfg.socialBar?.trim()) {
        const el = document.getElementById('ad-social-bar-root')
        if (el) el.innerHTML = cfg.socialBar
      }
      if (cfg.popunder?.trim()) {
        const el = document.getElementById('ad-popunder-root')
        if (el) {
          el.innerHTML = cfg.popunder
          const scripts = el.querySelectorAll('script')
          scripts.forEach((old) => {
            const s = document.createElement('script')
            s.text = old.textContent ?? ''
            document.body.appendChild(s)
          })
        }
      }
    })
  }, [])
}
