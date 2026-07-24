// ─── PunchThis — Central Content Config ────────────────────────────────────
// Edit this file to update copy, links, FAQ, launch status, and regional wording.
//
// Terminology: US construction English is the primary voice (punch list,
// punch item, issue, walkthrough, closeout, correction). Avoid "defect" as a
// primary field term — in the US it carries a warranty/litigation connotation;
// crews write up "punch items", "issues" and "corrections". Keep app feature
// names (e.g. "hit list") matching the app itself.

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
  // No "Sign in" — PunchThis has no accounts or web authentication yet.
  // Add it back once there's a real destination to send visitors to.
  ctaUrl: '/early-access',
  ctaLabel: 'Get early access',
}

export const HERO = {
  eyebrow: 'SITE INSPECTIONS, WITHOUT THE OFFICE REWRITE',
  headline: 'Punch it on site.\nProve it in the report.',
  body: 'Capture punch items, mark up the exact issue, assign the fix and send a professional report—before you leave the site.',
  audienceLine: 'For punch lists, site inspections, walkthroughs and closeout—on every trade and every job.',
  primaryCta:  { label: 'Get early access',  href: '/early-access' },
  secondaryCta:{ label: 'View a sample report', href: '/#sample-report' },
  reassurance: 'Built for fast, phone-first field work.',
}

export const TRUST_STRIP = {
  heading: 'Built for the work that happens between the walkthrough and closeout.',
  useCases: [
    'Punch lists',
    'Site inspections',
    'Walkthroughs',
    'Deficiency lists',
    'Closeout & handover',
  ],
}

export const MARKUP_SECTION = {
  sectionLabel: 'MARKUP THAT LEAVES NO DOUBT',
  headline: 'Point to the problem—not just the photo.',
  body: 'Circle it. Box it. Draw an arrow. Add a numbered marker. PunchThis keeps every instruction attached to the evidence, so the crew can see exactly what needs attention.',
  tools: ['Arrow', 'Circle', 'Box', 'Pen', 'Number', 'More'],
  benefits: [
    { title: 'Make the issue unmistakable', body: 'Precise visual callouts leave no room for misinterpretation on site.' },
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
    body: 'Tag the location, set the priority, note the responsible trade. Every issue carries its full context.',
    screen: 'issue',
  },
  {
    number: '04', label: 'Complete & report',
    title: 'Close out and share',
    body: 'When the work is done, mark it complete on site. Export a clean, professional report before you leave.',
    screen: 'report',
  },
]

export const BENEFITS = [
  { icon: 'Camera',      title: 'Photo-first issue capture',    body: 'Raise an issue directly from a photo. No separate notes, no data entry back at the office.' },
  { icon: 'Pencil',      title: 'Clear visual markup',          body: 'Arrows, circles, boxes and numbered markers—applied directly to the evidence photo.' },
  { icon: 'BarChart2',   title: 'Priority and status tracking', body: 'Open, assigned, in progress, completed. Every issue moves through a clear closeout loop.' },
  { icon: 'MapPin',      title: 'Location and assignee context',body: 'Every issue carries its location, responsible trade and priority—no lost context.' },
  { icon: 'CheckCircle', title: 'Completion and closeout',      body: 'Confirm completed work on site. Close the loop with evidence, not assumptions.' },
  { icon: 'FileText',    title: 'Professional PDF reporting',    body: 'Choose contents, include annotated photos and preview the finished report before sharing.' },
]

export const REPORTS_SECTION = {
  sectionLabel: 'REPORTS THAT ARE READY TO SEND',
  headline: 'Turn site evidence into a client-ready report.',
  body: 'Choose the contents, include annotated photos, organize issues by location and preview the finished PDF before sharing.',
  benefits: [
    'Annotated evidence included',
    'Clear status summaries',
    'Flexible report contents',
    'Preview before sharing',
  ],
}

export const DIFFERENTIATION = {
  headline: 'Built around the complete closeout loop.',
  flow: ['Capture', 'Mark up', 'Assign', 'Complete', 'Report'],
  body: 'PunchThis keeps the visual proof, issue context and final report connected from the first photo to closeout.',
  points: [
    'Markup is part of the workflow, not an afterthought.',
    'Every issue keeps its photo, status and responsibility together.',
    'Reports reflect what changed on site.',
  ],
}

export const AUDIENCE = {
  headline: 'One workflow. Every kind of site team.',
  subline: 'Whether you call it a punch item, deficiency or correction, the next step should always be clear.',
  cards: [
    { icon: 'HardHat',  title: 'General contractors & subs',    body: 'Write up punch items during the build, tag the responsible sub and track them to done—without chasing paper.' },
    { icon: 'Clipboard',title: 'Inspectors & QA/QC',            body: 'Log issues on site, capture annotated evidence and deliver a professional report before the next meeting.' },
    { icon: 'Users',    title: 'Supers & project managers',     body: 'Keep every open item visible, prioritized and assigned. Know what is outstanding before the next site visit.' },
    { icon: 'Building2',title: 'Property & handover teams',     body: 'Run walkthroughs, closeout and routine inspections from a single app—with reports your clients can rely on.' },
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
      { q: 'What is PunchThis?', a: 'PunchThis is a mobile site-inspection app for capturing punch items, marking up photos, tracking issues and generating professional inspection reports—from a single workflow on your phone.' },
      { q: 'Who is it designed for?', a: 'PunchThis is built for general contractors, superintendents, project and construction managers, building inspectors, subcontractors, and property and handover professionals.' },
      { q: 'Does PunchThis work for my type of project?', a: 'Yes. Whether it\'s a punch list on a commercial fit-out, a site inspection, a closeout walk or a handover report, PunchThis follows the same Project → Area → Item workflow—residential or commercial, any trade.' },
    ],
  },
  {
    category: 'Features',
    items: [
      { q: 'Can I mark up photos on site?', a: 'Yes. The markup studio lets you draw arrows, circles, boxes, pen strokes and numbered markers directly on any issue photo. Every annotation is saved with the issue and included in reports.' },
      { q: 'What can be included in a report?', a: 'You can choose from a cover page, executive summary, annotated photos, completed issues, a signature section, and grouping by location. Preview the full PDF before sharing.' },
      { q: 'How does issue tracking work?', a: 'Each issue moves through a clear status lifecycle: Open → Assigned → In Progress → Completed. Every issue keeps its photo, markup, priority, location and assignee together throughout.' },
    ],
  },
  {
    category: 'Availability',
    items: [
      { q: 'When will PunchThis be available?', a: 'PunchThis is currently in development. Register for early access to be notified when the app is ready and to join the beta program.' },
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
    { label: 'Privacy policy',   href: '/privacy' },
    { label: 'Terms of service', href: '/terms' },
    { label: 'Support',          href: '/support' },
    { label: 'Data deletion',    href: '/data-deletion' },
  ],
}
