import type { SeoPage } from './pages'

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** HTML mirroring HomePage SEO blocks for crawlers and pre-React paint (replaced by createRoot). */
export function renderHomeStaticHtml(seo: SeoPage, tagline: string): string {
  const chunks: string[] = ['<div data-static-seo>']
  chunks.push(`<section class="hero"><h1>${esc(seo.h1)}</h1><p class="hero__lead">${esc(tagline)}</p></section>`)
  chunks.push('<article class="content-article">')
  for (const p of seo.paragraphs) chunks.push(`<p>${esc(p)}</p>`)
  for (const section of seo.sections ?? []) {
    chunks.push(`<section><h2>${esc(section.h2)}</h2>`)
    for (const p of section.paragraphs ?? []) chunks.push(`<p>${esc(p)}</p>`)
    if (section.steps?.length) {
      chunks.push('<ol>')
      for (const step of section.steps) chunks.push(`<li>${esc(step)}</li>`)
      chunks.push('</ol>')
    }
    chunks.push('</section>')
  }
  if (seo.hubLinks?.length) {
    const links = seo.hubLinks
      .map((link) => `<a href="${esc(link.href)}" rel="noopener noreferrer">${esc(link.label)}</a>`)
      .join('; ')
    chunks.push(`<p class="content-article__hub">More utilities: ${links}.</p>`)
  }
  chunks.push('<h2>Frequently asked questions</h2>')
  chunks.push('<dl class="faq">')
  for (const item of seo.faq) {
    chunks.push(`<div><dt>${esc(item.q)}</dt><dd>${esc(item.a)}</dd></div>`)
  }
  chunks.push('</dl></article></div>')
  return chunks.join('\n')
}