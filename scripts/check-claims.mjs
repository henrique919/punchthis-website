#!/usr/bin/env node
// CI gate: guards against the issue-lifecycle claim regressing (audit
// C-03). The app ships exactly 4 statuses — open/assigned/in_progress/
// completed — see PRODUCT_TRUTH.md. If any of these strings reappear as
// prose (not inside PRODUCT_TRUTH.md itself, which documents the "do not
// claim" list on purpose), the site is claiming a status the product
// doesn't have.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const SRC = new URL('../src', import.meta.url).pathname
const BANNED_TERMS = ['For Review', 'Verified', 'Overdue']

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) walk(full, files)
    else if (['.js', '.jsx', '.ts', '.tsx'].includes(extname(full))) files.push(full)
  }
  return files
}

let failures = []
for (const file of walk(SRC)) {
  const content = readFileSync(file, 'utf8')
  for (const term of BANNED_TERMS) {
    if (content.includes(term)) failures.push(`${file}: contains banned status term "${term}"`)
  }
}

if (failures.length) {
  console.error('FAIL: product-claim check found lifecycle states the app does not ship:\n' + failures.join('\n'))
  console.error('See PRODUCT_TRUTH.md — the app ships only open/assigned/in_progress/completed.')
  process.exit(1)
}
console.log('PASS: no banned lifecycle-status claims found in src/')
