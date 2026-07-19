#!/usr/bin/env node
// CI gate: runs against the production build (npm run build && this script,
// pointed at a static server for dist/). For each route: asserts no
// horizontal overflow at the audit's required breakpoints, runs an axe-core
// accessibility scan, and saves a full-page screenshot as a CI artifact
// (manual-review visual regression — see PUNCHTHIS_MARKETING_LOOP.md P2-17
// for why this isn't automated pixel-diffing).
import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'
import { mkdirSync } from 'node:fs'

const BASE_URL = process.env.CHECK_BASE_URL || 'http://localhost:4173'
const OUT_DIR = process.env.CHECK_SCREENSHOT_DIR || 'ci-screenshots'
const ROUTES = ['/', '/product', '/markup', '/reports', '/how-it-works', '/faq', '/early-access', '/privacy', '/terms', '/support', '/data-deletion']
const WIDTHS = [320, 375, 390, 768, 1024, 1440]

mkdirSync(OUT_DIR, { recursive: true })

// Escape hatch for environments with a pre-installed browser at a fixed
// path whose revision doesn't match this project's `playwright` version
// (e.g. a sandboxed dev container) - CI itself runs `playwright install`
// and doesn't need this.
const launchOptions = process.env.PLAYWRIGHT_EXECUTABLE_PATH
  ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH }
  : {}
const browser = await chromium.launch(launchOptions)
// reduced motion: without it, the axe-core scan below races the reveal-on-
// scroll fade-in (see useReveal.js) and Hero's own stagger animation - a
// scan mid-fade sees an alpha-blended *effective* color that isn't the
// element's real static color, and reports false-positive contrast
// failures. This site already honours prefers-reduced-motion (P1-5), so
// this also happens to be exactly what a reduced-motion visitor sees.
const context = await browser.newContext({ reducedMotion: 'reduce' })
const page = await context.newPage()

let overflowFailures = []
let a11yFailures = []

for (const route of ROUTES) {
  // Overflow sweep across all required breakpoints
  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto(BASE_URL + route, { waitUntil: 'load' })
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }))
    if (scrollWidth > clientWidth) {
      overflowFailures.push(`${route} @${width}px: scrollWidth=${scrollWidth} > clientWidth=${clientWidth}`)
    }
  }

  // Accessibility scan + screenshot at a representative desktop width
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto(BASE_URL + route, { waitUntil: 'load' })
  await page.waitForTimeout(300) // let reveal-on-scroll's failsafe/observer settle

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()
  if (results.violations.length) {
    for (const v of results.violations) {
      a11yFailures.push(`${route}: [${v.impact}] ${v.id} - ${v.help} (${v.nodes.length} node(s))`)
    }
  }

  const fileName = (route === '/' ? 'home' : route.replace(/\//g, '-').slice(1)) + '.png'
  await page.screenshot({ path: `${OUT_DIR}/${fileName}`, fullPage: true })
}

await browser.close()

console.log(`Screenshots saved to ${OUT_DIR}/ (${ROUTES.length} routes) - review as a manual visual-regression check.`)

if (overflowFailures.length) {
  console.error('FAIL: horizontal overflow found:\n' + overflowFailures.join('\n'))
}
if (a11yFailures.length) {
  console.error('FAIL: axe-core WCAG 2 A/AA violations found:\n' + a11yFailures.join('\n'))
}
if (overflowFailures.length || a11yFailures.length) {
  process.exit(1)
}
console.log(`PASS: no overflow at ${WIDTHS.join('/')}px and no WCAG 2 A/AA violations across ${ROUTES.length} routes.`)
