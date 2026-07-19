#!/usr/bin/env node
// CI gate: audit M-04 recommendation - "fail CI if required marketing
// assets are missing". src/config/media-manifest.js documents every real
// product screenshot's provenance (ledger P2-14); this checks that
// documentation and the actual files in src/assets/app-screens/ agree in
// both directions - a manifest entry with no file would silently 404 in
// production, and a file with no manifest entry has undocumented
// provenance (no source app commit/route/capture date on record).
import { readdirSync, existsSync } from 'node:fs'
import { APP_SCREENS } from '../src/config/media-manifest.js'

const ASSETS_DIR = new URL('../src/assets/app-screens', import.meta.url).pathname

const manifestFiles = new Set(Object.values(APP_SCREENS).map((s) => s.file))
const actualFiles = new Set(readdirSync(ASSETS_DIR).filter((f) => !f.startsWith('.')))

let failures = []
for (const file of manifestFiles) {
  if (!existsSync(`${ASSETS_DIR}/${file}`)) {
    failures.push(`media-manifest.mjs references "${file}" but src/assets/app-screens/${file} does not exist`)
  }
}
for (const file of actualFiles) {
  if (!manifestFiles.has(file)) {
    failures.push(`src/assets/app-screens/${file} exists but has no entry in media-manifest.mjs`)
  }
}

if (failures.length) {
  console.error('FAIL: media manifest and src/assets/app-screens/ have drifted:\n' + failures.join('\n'))
  process.exit(1)
}
console.log(`PASS: all ${manifestFiles.size} manifest entries match src/assets/app-screens/ exactly.`)
