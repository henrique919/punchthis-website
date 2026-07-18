// ─── PunchThis — Central Content Config ────────────────────────────────────
// Edit this file to update copy, links, FAQ, launch status, and regional wording.

export const SITE = {
  name: 'PunchThis',
  domain: 'PunchThis.app',
  url: 'https://punchthis.app',
  tagline: 'Punch it. Prove it. Close it.',
  contactEmail: 'hello@punchthis.app',
  year: new Date().getFullYear(),
  // Editable launch status — shown on Early Access page and FAQ
  launchStatus: 'Currently in development — early access registration open.',
}

export const NAV = {
  links: [
    { label: 'Product',      href: '/product' },
    { label: 'Markup',       href: '/markup' },
    { label: 'Reports',      href: '/reports' },
    { label: 'How it works', href: '/how-it-works' },
    { label: 'FAQ',          href: '/faq' },
  ],
  signInUrl: '#',           // Update when auth is live
  ctaUrl: '/early-access',
  ctaLabel: 'Get early access',
}

export const HERO = {
  eyebrow: 'SITE INSPECTIONS, WITHOUT THE OFFICE REWRITE',
  headline: 'Mark it on site.\nProve it in the report.',
  body: 'Capture defects, mark up the exact issue, assign the work and send a professional report—before you leave site.',
  audienceLine: 'For inspections, snagging, punch lists and handovers across Australia, the UK and the US.',
  primaryCta:  { label: 'Get early access',  href: '/early-access' },
  secondaryCta:{ label: 'See how it works',  href: '/how-it-works' },
  reassurance: 'Built for fast, phone-first field work.',
}

export const TRUST_STRIP = {
  heading: 'Built for the work that happens between inspection and sign-off.',
  useCases: [
    'Site inspections',
    'Defect walks',
    'Snagging',
    'Punch lists',
    'Practical completion',
  ],
}

export const MARKUP_SECTION = {
  sectionLabel: 'MARKUP THAT LEAVES NO DOUBT',
  headline: 'Point to the problem—not just the photo.',
  body: 'Circle it. Box it. Draw an arrow. Add a numbered marker. PunchThis keeps every instruction attached to the evidence, so contractors can see exactly what needs attention.',
  tools: ['Arrow', 'Circle', 'Box', 'Pen', 'Number', 'More'],
  benefits: [
    { title: 'Make the defect unmistakable', body: 'Precise visual callouts leave no room for misinterpretation on site.' },
    { title: 'Keep evidence attached to the issue', body: 'Every annotated photo travels with its issue—status, assignee and all.' },
    { title: 'Send clearer instructions the first time', body: 'Fewer callbacks. Fewer disputes. The markup speaks for itself.' },
  ],
}

export const WORKFLOW_STEPS = [
  {
    number: '01', label: 'Capture',
    title: 'Photo-first from the start',
    body: 'Open a new issue directly from the camera. The photo becomes the evidence—everything else follows.',
    screen: 'camera',
  },
  {
    number: '02', label: 'Mark up',
    title: 'Annotate the exact spot',
    body: 'Arrow to the crack. Circle the gap. Number the sequence. The markup stays attached to the photo, permanently.',
    screen: 'markup',
  },
  {
    number: '03', label: 'Assign',
    title: 'Set priority and responsibility',
    body: 'Tag the location, set the priority, assign the trade. Every issue carries its full context.',
    screen: 'issue',
  },
  {
    number: '04', label: 'Verify & report',
    title: 'Close out and share',
    body: 'When the work is done, verify it on site. Export a clean, professional report before you leave.',
    screen: 'report',
  },
]

export const BENEFITS = [
  { icon: 'Camera',      title: 'Photo-first issue capture',    body: 'Raise an issue directly from a photo. No separate notes, no data entry back at the office.' },
  { icon: 'Pencil',      title: 'Clear visual markup',          body: 'Arrows, circles, boxes and numbered markers—applied directly to the evidence photo.' },
  { icon: 'BarChart2',   title: 'Priority and status tracking', body: 'Open, assigned, in progress, for review, verified. Every issue moves through a clear close-out loop.' },
  { icon: 'MapPin',      title: 'Location and assignee context',body: 'Every issue carries its location, responsible trade and priority—no lost context.' },
  { icon: 'CheckCircle', title: 'Verification and close-out',   body: 'Confirm completed work on site. Close the loop with evidence, not assumptions.' },
  { icon: 'FileText',    title: 'Professional PDF reporting',   body: 'Choose contents, include annotated photos and preview the finished report before sharing.' },
]

export const REPORTS_SECTION = {
  sectionLabel: 'REPORTS THAT ARE READY TO SEND',
  headline: 'Turn site evidence into a client-ready report.',
  body: 'Choose the contents, include annotated photos, organise issues by location and preview the finished PDF before sharing.',
  benefits: [
    'Annotated evidence included',
    'Clear status summaries',
    'Flexible report contents',
    'Preview before sharing',
  ],
}

export const DIFFERENTIATION = {
  headline: 'Built around the complete close-out loop.',
  flow: ['Capture', 'Mark up', 'Assign', 'Verify', 'Report'],
  body: 'PunchThis keeps the visual proof, issue context and final report connected from the first photo to close-out.',
  points: [
    'Markup is part of the workflow, not an afterthought.',
    'Every issue keeps its photo, status and responsibility together.',
    'Reports reflect what changed on site.',
  ],
}

export const AUDIENCE = {
  headline: 'One workflow. Every kind of site team.',
  subline: 'Whether you call it a defect, snag or punch item, the next step should always be clear.',
  cards: [
    { icon: 'HardHat',  title: 'Builders and contractors',       body: 'Document defects during construction, assign subcontractors and track completion—without chasing emails.' },
    { icon: 'Clipboard',title: 'Inspectors and surveyors',       body: 'Raise issues on site, capture annotated evidence and deliver a professional report before the next meeting.' },
    { icon: 'Users',    title: 'Project and site managers',      body: 'Keep every open item visible, prioritised and assigned. Know what is outstanding before the next site visit.' },
    { icon: 'Building2',title: 'Property and facilities teams',  body: 'Run snagging, practical completion and routine defect walks from a single app—with reports your clients can rely on.' },
  ],
}

export const FINAL_CTA = {
  headline: 'Punch the issue. Prove the work. Close the loop.',
  body: 'Bring clearer markup and cleaner reports to your next site inspection.',
  primaryCta:  { label: 'Get early access', href: '/early-access' },
  secondaryCta:{ label: 'View the product', href: '/product' },
}

export const FAQ_ITEMS = [
  {
    category: 'About PunchThis',
    items: [
      { q: 'What is PunchThis?', a: 'PunchThis is a mobile site-inspection app for capturing defects, marking up photos, assigning work and generating professional inspection reports—from a single workflow on your phone.' },
      { q: 'Who is it designed for?', a: 'PunchThis is built for site managers, building inspectors, construction supervisors, project managers, builders, contractors, property managers and handover teams across Australia, the UK and the US.' },
      { q: 'Is PunchThis available in Australia, the UK and the US?', a: 'PunchThis is designed for site professionals in all three regions. The terminology, workflow and report formats cover site inspections, snagging, punch lists and practical completion.' },
    ],
  },
  {
    category: 'Features',
    items: [
      { q: 'Can I mark up photos on site?', a: 'Yes. The markup studio lets you draw arrows, circles, boxes, pen strokes and numbered markers directly on any issue photo. Every annotation is saved with the issue and included in reports.' },
      { q: 'What can be included in a report?', a: 'You can choose from a cover page, executive summary, annotated photos, completed issues, a signature section, and grouping by location. Preview the full PDF before sharing.' },
      { q: 'How does issue tracking work?', a: 'Each issue moves through a clear status lifecycle: Open → Assigned → In Progress → For Review → Verified. Every issue keeps its photo, markup, priority, location and assignee together throughout.' },
    ],
  },
  {
    category: 'Availability',
    items: [
      { q: 'When will PunchThis be available?', a: 'PunchThis is currently in development. Register for early access to be notified when the app is ready and to join the beta programme.' },
      { q: 'What platforms will it support?', a: 'PunchThis is being developed for iOS and Android. Register for early access to stay informed about platform availability.' },
      { q: 'How much will it cost?', a: 'Pricing has not been announced yet. Register for early access to be among the first to hear about plans and pricing.' },
    ],
  },
]

export const FOOTER = {
  productLinks: [
    { label: 'Product',      href: '/product' },
    { label: 'Markup',       href: '/markup' },
    { label: 'Reports',      href: '/reports' },
    { label: 'How it works', href: '/how-it-works' },
    { label: 'FAQ',          href: '/faq' },
  ],
  legalLinks: [
    { label: 'Privacy policy',  href: '#' },
    { label: 'Terms of service',href: '#' },
    { label: 'Cookie policy',   href: '#' },
  ],
}
