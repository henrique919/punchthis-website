/**
 * IssueDetailScreen — SVG recreation of Screen 09 (Issue Detail).
 */
export default function IssueDetailScreen() {
  return (
    <>
      <rect width="390" height="844" fill="#F2F4F6"/>

      {/* Status bar */}
      <rect width="390" height="52" fill="#1C232B"/>
      <text x="20" y="34" fill="#fff" fontSize="13" fontWeight="600" fontFamily="system-ui">9:41</text>
      <rect x="330" y="22" width="18" height="9" rx="2" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.7"/>
      <rect x="331" y="23" width="13" height="7" rx="1" fill="#fff" opacity="0.7"/>

      {/* Nav bar */}
      <rect y="52" width="390" height="52" fill="#1C232B"/>
      <path d="M18 78 l10-10 m-10 10 l10 10" stroke="#4C82FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <text x="38" y="82" fill="#4C82FF" fontSize="14" fontWeight="600" fontFamily="system-ui">Issues</text>
      <text x="148" y="83" fill="#fff" fontSize="16" fontWeight="700" fontFamily="system-ui">Issue Detail</text>
      {/* Edit icon */}
      <path d="M362 68 l12 12 m-5-14 a3 3 0 0 1 4 4 l-13 13 -5 1 1-5 13-13z" stroke="#4C82FF" strokeWidth="2" strokeLinecap="round" fill="none"/>

      {/* Annotated photo */}
      <rect y="104" width="390" height="240" fill="#5A6470"/>
      <rect y="104" width="390" height="240" fill="url(#issueWall)"/>
      <defs>
        <linearGradient id="issueWall" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7A8490" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#4A5460" stopOpacity="0.7"/>
        </linearGradient>
      </defs>
      {/* Plaster crack */}
      <path d="M150 170 l22 28 l10 38 l-6 18" stroke="#3D4650" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9"/>
      <path d="M170 196 l-14 18" stroke="#3D4650" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"/>
      {/* Markup overlay — red circle */}
      <ellipse cx="175" cy="210" rx="48" ry="52" fill="none" stroke="#C93B3B" strokeWidth="3.5"/>
      {/* Arrow */}
      <defs>
        <marker id="issueArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#C93B3B"/>
        </marker>
      </defs>
      <line x1="285" y1="160" x2="224" y2="195" stroke="#C93B3B" strokeWidth="3" markerEnd="url(#issueArrow)"/>
      {/* Number marker */}
      <circle cx="175" cy="158" r="14" fill="#4C82FF"/>
      <text x="175" y="163" fill="#fff" fontSize="13" fontWeight="800" fontFamily="system-ui" textAnchor="middle">1</text>
      {/* Photo label pill */}
      <rect x="12" y="116" width="98" height="22" rx="11" fill="rgba(0,0,0,0.5)"/>
      <text x="61" y="131" fill="#fff" fontSize="10" fontWeight="700" fontFamily="system-ui" textAnchor="middle">ANNOTATED PHOTO</text>

      {/* Issue content card */}
      <rect x="12" y="352" width="366" height="400" rx="16" fill="#fff"/>

      {/* Title + status */}
      <text x="28" y="384" fill="#1C232B" fontSize="17" fontWeight="700" fontFamily="system-ui">Cracked plaster to ceiling</text>

      {/* Status chip — In Progress */}
      <rect x="28" y="394" width="82" height="20" rx="10" fill="#EAF1FF"/>
      <circle cx="37" cy="404" r="3.5" fill="#4C82FF"/>
      <text x="44" y="409" fill="#2F6BFF" fontSize="9.5" fontWeight="800" fontFamily="system-ui">IN PROGRESS</text>

      {/* Priority chip */}
      <rect x="118" y="394" width="60" height="20" rx="10" fill="#FBEBEB"/>
      <circle cx="127" cy="404" r="3.5" fill="#C93B3B"/>
      <text x="134" y="409" fill="#C93B3B" fontSize="9.5" fontWeight="800" fontFamily="system-ui">HIGH</text>

      {/* Divider */}
      <line x1="28" y1="424" x2="362" y2="424" stroke="#DDE3E8" strokeWidth="1"/>

      {/* Detail rows */}
      {[
        { label: 'Location', value: 'Level 2 — Unit 6', y: 448 },
        { label: 'Assignee', value: 'J. Powell · Plastering', y: 480 },
        { label: 'Project',  value: 'Riverside Apartments', y: 512 },
        { label: 'Raised',   value: '18 Jul 2026', y: 544 },
        { label: 'Audit',    value: 'Defect Walk — Level 2', y: 576 },
      ].map(({ label, value, y }) => (
        <g key={y}>
          <text x="28" y={y} fill="#7E8B96" fontSize="11" fontWeight="600" fontFamily="system-ui">{label}</text>
          <text x="140" y={y} fill="#1C232B" fontSize="12" fontWeight="600" fontFamily="system-ui">{value}</text>
        </g>
      ))}

      {/* Notes */}
      <line x1="28" y1="596" x2="362" y2="596" stroke="#DDE3E8" strokeWidth="1"/>
      <text x="28" y="618" fill="#7E8B96" fontSize="11" fontWeight="600" fontFamily="system-ui">Notes</text>
      <text x="28" y="636" fill="#1C232B" fontSize="12" fontFamily="system-ui">Crack runs approx. 400mm along ceiling/wall</text>
      <text x="28" y="652" fill="#1C232B" fontSize="12" fontFamily="system-ui">junction. Likely settlement movement.</text>

      {/* Action buttons */}
      <rect x="28" y="670" width="152" height="44" rx="10" fill="#1C232B"/>
      <text x="104" y="696" fill="#fff" fontSize="13" fontWeight="700" fontFamily="system-ui" textAnchor="middle">Update status</text>
      <rect x="190" y="670" width="152" height="44" rx="10" fill="#4C82FF"/>
      <text x="266" y="696" fill="#fff" fontSize="13" fontWeight="700" fontFamily="system-ui" textAnchor="middle">Mark complete</text>

      {/* Home bar */}
      <rect y="800" width="390" height="44" fill="#fff"/>
      <rect x="140" y="820" width="110" height="4" rx="2" fill="#DDE3E8"/>
    </>
  )
}
