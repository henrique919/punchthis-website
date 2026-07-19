#!/usr/bin/env node
// CI gate: src/config/brand-tokens.mjs documents where every brand colour
// in src/styles/global.css comes from (audit Handoff §2 / ledger P2-13).
// That documentation is only trustworthy if it can't silently drift from
// the CSS someone actually edits later — this parses the real :root block
// and fails the build the moment a tracked value moves without the token
// doc being updated to match.
import { readFileSync } from 'node:fs'
import { colors as documented } from '../src/config/brand-tokens.mjs'

const CSS_PATH = new URL('../src/styles/global.css', import.meta.url).pathname
const css = readFileSync(CSS_PATH, 'utf8')

const rootMatch = css.match(/:root\s*\{([\s\S]*?)\n\}/)
if (!rootMatch) {
  console.error('FAIL: could not find a :root block in global.css')
  process.exit(1)
}

const declared = {}
for (const line of rootMatch[1].split('\n')) {
  const m = line.match(/(--[\w-]+)\s*:\s*([^;]+);/)
  if (m) declared[m[1].trim()] = m[2].trim()
}

let failures = []
for (const [name, entry] of Object.entries(documented)) {
  const actual = declared[name]
  if (actual === undefined) {
    failures.push(`${name}: documented in brand-tokens.mjs but no longer declared in global.css :root`)
  } else if (actual.toLowerCase() !== entry.value.toLowerCase()) {
    failures.push(`${name}: global.css has ${actual}, brand-tokens.mjs says ${entry.value}`)
  }
}

if (failures.length) {
  console.error('FAIL: brand token drift between global.css and brand-tokens.mjs:\n' + failures.join('\n'))
  console.error('Update src/config/brand-tokens.mjs to match (and reconsider whether the app repo should follow).')
  process.exit(1)
}
console.log(`PASS: all ${Object.keys(documented).length} documented brand tokens match global.css :root.`)
