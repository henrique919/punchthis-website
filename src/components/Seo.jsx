import { useEffect } from 'react'
import { SITE } from '../config/content'

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Per-route document head — title, description, canonical, OG/Twitter tags.
 * This is an SPA with no prerendering, so these only reach crawlers that
 * execute JavaScript (Googlebot does; a plain HTTP fetch only ever sees
 * index.html's defaults). Full per-route static HTML needs prerendering or
 * a static-first renderer (Astro etc.) - out of scope for this pass; see
 * PUNCHTHIS_MARKETING_LOOP.md P1-9.
 */
export default function Seo({ title, description, path = '/', image = '/og-image.png', noindex = false }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} | Site Inspection, Markup & Reporting App`
    const url = `${SITE.url}${path}`
    const imageUrl = image.startsWith('http') ? image : `${SITE.url}${image}`

    document.title = fullTitle
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    upsertLink('canonical', url)

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:image', imageUrl)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', imageUrl)
  }, [title, description, path, image, noindex])

  return null
}
