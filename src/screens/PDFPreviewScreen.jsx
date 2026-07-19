/**
 * PDFPreviewScreen — SVG recreation of Screen 11 (PDF Preview & Share).
 */
export default function PDFPreviewScreen() {
  return (
    <>
      {/* Dark chrome background */}
      <rect width="390" height="844" fill="#0F141A"/>

      {/* Status bar */}
      <text x="20" y="34" fill="#fff" fontSize="13" fontWeight="600" fontFamily="system-ui">9:41</text>
      <rect x="330" y="22" width="18" height="9" rx="2" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.7"/>
      <rect x="331" y="23" width="13" height="7" rx="1" fill="#fff" opacity="0.7"/>

      {/* Top nav */}
      <rect y="44" width="390" height="52" fill="#141B22"/>
      <path d="M22 70 l10-10 m-10 10 l10 10" stroke="#4C82FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <text x="42" y="74" fill="#4C82FF" fontSize="14" fontWeight="600" fontFamily="system-ui">Report</text>
      <text x="138" y="74" fill="#fff" fontSize="15" fontWeight="700" fontFamily="system-ui">PDF Preview</text>
      {/* Share icon */}
      <path d="M362 62 l0-14 m0-0 l-7 7 m7-7 l7 7" stroke="#4C82FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M352 66 l0 8 a3 3 0 0 0 3 3 h18 a3 3 0 0 0 3-3 l0-8" stroke="#4C82FF" strokeWidth="2" strokeLinecap="round" fill="none"/>

      {/* PDF page */}
      <rect x="16" y="104" width="358" height="630" rx="8" fill="#fff"/>

      {/* PDF Cover header */}
      <rect x="16" y="104" width="358" height="120" rx="8" fill="#1C232B"/>
      <rect x="16" y="196" width="358" height="28" fill="#1C232B"/>

      {/* PunchThis logo mark on cover */}
      <g transform="translate(32, 120)">
        <path d="M2 9 V6 a3 3 0 0 1 3-3 h3 M18 3 h3 a3 3 0 0 1 3 3 v3 M24 18 v3 a3 3 0 0 1 -3 3 h-3 M9 24 h-3 a3 3 0 0 1 -3-3 v-3"
          stroke="#7E8B96" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <rect x="9" y="9" width="9" height="9" rx="2.5" fill="#4C82FF"/>
      </g>
      <text x="68" y="132" fill="#fff" fontSize="11" fontWeight="700" fontFamily="system-ui">Punch</text>
      <text x="100" y="132" fill="#7E8B96" fontSize="11" fontWeight="400" fontFamily="system-ui">This</text>

      {/* Report title block */}
      <text x="32" y="154" fill="#fff" fontSize="18" fontWeight="700" fontFamily="system-ui">Riverside Apartments</text>
      <text x="32" y="172" fill="#8B97A1" fontSize="12" fontFamily="system-ui">Meridian Homes</text>
      <text x="32" y="188" fill="#7E8B96" fontSize="11" fontFamily="system-ui">Inspection Report · 18 July 2026</text>

      {/* Status summary strip */}
      <rect x="16" y="224" width="358" height="56" fill="#F8F9FA"/>
      <rect x="16" y="279" width="358" height="1" fill="#DDE3E8"/>
      {/* Summary stats */}
      {[
        { label: '12 Open',      color: '#C93B3B', x: 60 },
        { label: '5 In progress',color: '#4C82FF', x: 170 },
        { label: '16 Completed', color: '#1E9E5A', x: 300 },
      ].map(({ label, color, x }) => (
        <g key={label}>
          <circle cx={x - 20} cy="252" r="5" fill={color}/>
          <text x={x - 10} y="256" fill="#1C232B" fontSize="11" fontWeight="700" fontFamily="system-ui">{label}</text>
        </g>
      ))}

      {/* Section heading */}
      <text x="32" y="300" fill="#7E8B96" fontSize="9" fontWeight="800" letterSpacing="0.1em" fontFamily="system-ui">OPEN ISSUES</text>

      {/* Issue previews in PDF */}
      {[
        { y: 312, photo: '#6B7580', title: 'Cracked plaster to ceiling', loc: 'Level 2 — Unit 6', status: 'Open', hasMarkup: true },
        { y: 390, photo: '#5A6878', title: 'Window seal incomplete',      loc: 'Level 2 — Unit 6', status: 'Assigned', hasMarkup: false },
        { y: 468, photo: '#4E5E6C', title: 'Door alignment — bedroom 2',  loc: 'Level 2 — Unit 8', status: 'In Progress', hasMarkup: true },
        { y: 546, photo: '#68757F', title: 'Paint overspray on skirting', loc: 'Level 3 — Corridor', status: 'Completed', hasMarkup: false },
      ].map(({ y, photo, title, loc, status, hasMarkup }) => {
        const sc = status === 'Open' ? '#C93B3B' : status === 'Assigned' ? '#E5A016' : status === 'In Progress' ? '#4C82FF' : '#1E9E5A'
        const sb = status === 'Open' ? '#FBEBEB' : status === 'Assigned' ? '#FDF3E0' : status === 'In Progress' ? '#EAF1FF' : '#E7F3EC'
        return (
          <g key={y}>
            <line x1="32" y1={y} x2="358" y2={y} stroke="#DDE3E8" strokeWidth="0.75"/>
            {/* Photo thumbnail */}
            <rect x="32" y={y + 6} width="52" height="56" rx="6" fill={photo}/>
            {hasMarkup && <ellipse cx="58" cy={y + 34} rx="18" ry="20" fill="none" stroke="#C93B3B" strokeWidth="2"/>}
            {/* Text */}
            <text x="94" y={y + 22} fill="#1C232B" fontSize="11" fontWeight="700" fontFamily="system-ui">{title}</text>
            <text x="94" y={y + 38} fill="#7E8B96" fontSize="10" fontFamily="system-ui">{loc}</text>
            {/* Chip */}
            <rect x="94" y={y + 46} width={status.length * 5.5 + 14} height="14" rx="7" fill={sb}/>
            <text x={94 + (status.length * 5.5 + 14)/2} y={y + 57} fill={sc} fontSize="8" fontWeight="800" fontFamily="system-ui" textAnchor="middle">{status.toUpperCase()}</text>
          </g>
        )
      })}

      {/* Bottom action bar */}
      <rect y="744" width="390" height="56" fill="#141B22"/>
      <rect x="20" y="754" width="162" height="36" rx="10" fill="#1D262F"/>
      <text x="101" y="776" fill="#fff" fontSize="12" fontWeight="700" fontFamily="system-ui" textAnchor="middle">Share</text>
      <rect x="196" y="754" width="162" height="36" rx="10" fill="#4C82FF"/>
      <text x="277" y="776" fill="#fff" fontSize="12" fontWeight="700" fontFamily="system-ui" textAnchor="middle">Email report</text>

      {/* Home bar */}
      <rect y="800" width="390" height="44" fill="#0F141A"/>
      <rect x="140" y="820" width="110" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
    </>
  )
}
