#!/usr/bin/env node
// CI gate: no production navigation should ever resolve to "#". Fails the
// build if a dead placeholder link reappears (see audit C-02).
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const SRC = new URL('../src', import.meta.url).pathname
const BANNED = [
  { pattern: /\bhref=["']#["']/g, label: 'href="#"' },
  { pattern: /\bto=["']#["']/g, label: 'to="#"' },
  { pattern: /\bto=\{\s*['"]#['"]\s*\}/g, label: "to={'#'}" },
]

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
  for (const { pattern, label } of BANNED) {
    const matches = content.match(pattern)
    if (matches) failures.push(`${file}: ${matches.length} occurrence(s) of ${label}`)
  }
}

if (failures.length) {
  console.error('FAIL: dead-link check found production "#" destinations:\n' + failures.join('\n'))
  process.exit(1)
}
console.log('PASS: no dead "#" links found in src/')
