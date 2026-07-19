// ─── PunchThis — Product media manifest ────────────────────────────────────
// Every real (non-illustrative) product screenshot on the site is recorded
// here: source app commit, route, viewport, capture method and date. Add an
// entry whenever a new capture replaces an old one — never swap the image
// file without updating its row.
//
// All screens below show the app's own bundled SAMPLE seed data (project
// "Sample — Harbourview Apartments Stage 2", clearly watermarked "SAMPLE" on
// every photo) - not fabricated or hand-drawn UI, not real customer data.

export const SOURCE_APP = {
  repo: 'henrique919/audit-snap-663',
  commit: 'ec6b0a137254dee7f5e0195704c5187adc097fa0', // re-captured after the notch-overlay fix and the issue #008 markup cleanup — see PUNCHTHIS_MARKETING_LOOP.md
  branch: 'claude/punchthis-design-review-vxgpzk',
  buildCommand: 'cd expo && npm run build:web',
}

export const CAPTURE_METHOD = 'Playwright + Chromium, 390x844 viewport, served from the release web export'
export const CAPTURE_DATE = '2026-07-19'

export const APP_SCREENS = {
  dashboard: {
    file: 'dashboard.png',
    route: '/',
    label: 'Project dashboard with the sample project and its open/completed counts',
  },
  captureSession: {
    file: 'capture-session.png',
    route: '/capture-session',
    label: 'Capture session showing recent captures for an in-progress site walk',
  },
  issueDetail: {
    file: 'issue-detail.png',
    route: '/issue/[id]',
    label: 'Issue detail: status, priority, location, assignee and photo',
  },
  markupStudio: {
    file: 'markup-studio.png',
    route: '/markup/[assetId]',
    label: 'Markup Studio with real box, arrow and text annotations on a sample issue photo',
  },
  hitlist: {
    file: 'hitlist.png',
    route: '/audit/[id]/hitlist',
    label: 'Closeout hit list: status counts, completeness warnings, issue cards',
  },
  reportBuilder: {
    file: 'report-builder.png',
    route: '/audit/[id]/report',
    label: 'Report Builder with the three real report presets',
  },
  reportPreview: {
    file: 'report-preview.png',
    route: '/audit/[id]/preview',
    label: 'PDF report preview: cover, status summary and hit list preview',
  },
  issueOriginal: {
    file: 'issue-original.png',
    route: 'expo/assets/seed/issue-08-switchboard.png',
    label: 'Original (pre-markup) sample photo for issue #008, cropped from the app\'s own bundled seed asset — not captured via Playwright like the others',
  },
  issueAnnotated: {
    file: 'issue-annotated.png',
    route: '/markup/[assetId]',
    label: 'The same issue #008 photo after real box/arrow/text annotation, captured directly from the photo canvas element (testID="markup-photo-canvas") rather than cropped by pixel offset from the full-screen capture',
  },
}
