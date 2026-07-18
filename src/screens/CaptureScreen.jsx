/**
 * CaptureScreen — SVG recreation of Screen 04/05 (Capture Session / Project Detail).
 */
export default function CaptureScreen() {
  return (
    <>
      {/* App background */}
      <rect width="390" height="844" fill="#F2F4F6"/>

      {/* Status bar */}
      <rect width="390" height="52" fill="#1C232B"/>
      <text x="20" y="34" fill="#fff" fontSize="13" fontWeight="600" fontFamily="system-ui">9:41</text>
      <rect x="330" y="22" width="18" height="9" rx="2" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.7"/>
      <rect x="331" y="23" width="13" height="7" rx="1" fill="#fff" opacity="0.7"/>
      <circle cx="312" cy="27" r="5" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.7"/>
      <path d="M309 27 a3 3 0 0 1 6 0" fill="#fff" opacity="0.6"/>

      {/* Nav bar */}
      <rect y="52" width="390" height="60" fill="#1C232B"/>
      <path d="M18 82 l10-10 m-10 10 l10 10" stroke="#4C82FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <text x="44" y="79" fill="#fff" fontSize="16" fontWeight="700" fontFamily="system-ui">Riverside Apartments</text>
      <text x="44" y="97" fill="#7E8B96" fontSize="12" fontWeight="500" fontFamily="system-ui">Level 2 · Unit 6</text>
      {/* Menu dots */}
      <circle cx="366" cy="82" r="2.5" fill="#7E8B96"/>
      <circle cx="374" cy="82" r="2.5" fill="#7E8B96"/>
      <circle cx="382" cy="82" r="2.5" fill="#7E8B96"/>

      {/* Session info bar */}
      <rect y="112" width="390" height="48" fill="#fff"/>
      <rect y="160" width="390" height="1" fill="#DDE3E8"/>
      <text x="20" y="133" fill="#1C232B" fontSize="13" fontWeight="700" fontFamily="system-ui">Defect Walk — 18 Jul 2026</text>
      <text x="20" y="151" fill="#7E8B96" fontSize="11" fontWeight="500" fontFamily="system-ui">Prepared for Meridian Homes</text>
      {/* Issue count badge */}
      <rect x="305" y="124" width="66" height="24" rx="6" fill="#EAF1FF"/>
      <text x="338" y="140" fill="#4C82FF" fontSize="11" fontWeight="800" fontFamily="system-ui" textAnchor="middle">7 issues</text>

      {/* Section heading */}
      <text x="20" y="186" fill="#7E8B96" fontSize="10" fontWeight="800" letterSpacing="0.1em" fontFamily="system-ui">OPEN ISSUES</text>

      {/* Issue cards */}
      {[
        { y: 198, photo: '#6B7580', title: 'Cracked plaster to ceiling', loc: 'Level 2 — Unit 6', priority: 'High', status: 'Open', assignee: 'J. Powell · Plastering' },
        { y: 300, photo: '#5A6878', title: 'Window seal incomplete', loc: 'Level 2 — Unit 6', priority: 'Medium', status: 'Assigned', assignee: 'M. Chen · Windows' },
        { y: 402, photo: '#4E5E6C', title: 'Door alignment — bedroom 2', loc: 'Level 2 — Unit 8', priority: 'Low', status: 'In Progress', assignee: 'D. Walsh · Carpentry' },
        { y: 504, photo: '#68757F', title: 'Paint overspray on skirting', loc: 'Level 3 — Corridor', priority: 'Low', status: 'For Review', assignee: 'R. Singh · Painting' },
      ].map(({ y, photo, title, loc, priority, status, assignee }) => {
        const statusColor = status === 'Open' ? '#C93B3B' : status === 'Assigned' ? '#E5A016' : status === 'In Progress' ? '#4C82FF' : '#7B61E0'
        const statusBg = status === 'Open' ? '#FBEBEB' : status === 'Assigned' ? '#FDF3E0' : status === 'In Progress' ? '#EAF1FF' : '#EEEAFB'
        const priorityColor = priority === 'High' ? '#C93B3B' : priority === 'Medium' ? '#E5A016' : '#7E8B96'
        const priorityBg = priority === 'High' ? '#FBEBEB' : priority === 'Medium' ? '#FDF3E0' : '#EEF1F3'
        return (
          <g key={y}>
            <rect x="12" y={y} width="366" height="92" rx="12" fill="#fff" filter="url(#cardShadow)"/>
            {/* Photo thumbnail */}
            <rect x="24" y={y + 10} width="64" height="72" rx="8" fill={photo}/>
            {/* Camera markup indicator */}
            <rect x="24" y={y + 10} width="64" height="72" rx="8" fill="none" stroke="rgba(76,130,255,0.3)" strokeWidth="1.5"/>
            {/* Markup dot */}
            <circle cx="52" cy={y + 46} r="6" fill="#C93B3B" opacity="0.9"/>
            {/* Content */}
            <text x="100" y={y + 26} fill="#1C232B" fontSize="13" fontWeight="700" fontFamily="system-ui">{title}</text>
            <text x="100" y={y + 43} fill="#7E8B96" fontSize="11" fontFamily="system-ui">{loc}</text>
            {/* Status chip */}
            <rect x="100" y={y + 54} width={status.length * 6.5 + 16} height="18" rx="9" fill={statusBg}/>
            <circle cx="109" cy={y + 63} r="3" fill={statusColor}/>
            <text x="116" y={y + 67} fill={statusColor} fontSize="9" fontWeight="800" fontFamily="system-ui">{status.toUpperCase()}</text>
            {/* Priority */}
            <rect x={100 + status.length * 6.5 + 22} y={y + 54} width={priority.length * 6 + 14} height="18" rx="9" fill={priorityBg}/>
            <text x={100 + status.length * 6.5 + 22 + (priority.length * 6 + 14)/2} y={y + 67} fill={priorityColor} fontSize="9" fontWeight="800" fontFamily="system-ui" textAnchor="middle">{priority.toUpperCase()}</text>
            {/* Assignee */}
            <text x="100" y={y + 84} fill="#7E8B96" fontSize="10" fontFamily="system-ui">{assignee}</text>
            {/* Chevron */}
            <path d={`M360 ${y+40} l-8 8 m8-8 l-8-8`} stroke="#DDE3E8" strokeWidth="2" strokeLinecap="round" fill="none"/>
          </g>
        )
      })}

      <defs>
        <filter id="cardShadow" x="-5%" y="-5%" width="110%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#1C232B" floodOpacity="0.06"/>
        </filter>
      </defs>

      {/* Bottom capture bar */}
      <rect y="694" width="390" height="106" fill="#fff"/>
      <rect y="694" width="390" height="1" fill="#DDE3E8"/>
      <text x="195" y="716" fill="#7E8B96" fontSize="11" fontWeight="600" fontFamily="system-ui" textAnchor="middle">Saved locally</text>
      {/* Camera button */}
      <circle cx="195" cy="752" r="34" fill="#4C82FF"/>
      <circle cx="195" cy="752" r="28" fill="none" stroke="#fff" strokeWidth="2.5"/>
      {/* Camera icon */}
      <rect x="182" y="743" width="26" height="18" rx="4" fill="#fff" opacity="0.9"/>
      <circle cx="195" cy="752" r="6" fill="#4C82FF"/>
      <circle cx="208" cy="745" r="3" fill="#fff" opacity="0.7"/>

      {/* Location + Assignee chips */}
      <rect x="36" y="790" width="90" height="26" rx="13" fill="#EAF1FF"/>
      <text x="81" y="807" fill="#4C82FF" fontSize="10" fontWeight="700" fontFamily="system-ui" textAnchor="middle">Level 2 · Unit 6</text>
      <rect x="136" y="790" width="110" height="26" rx="13" fill="#EAF1FF"/>
      <text x="191" y="807" fill="#4C82FF" fontSize="10" fontWeight="700" fontFamily="system-ui" textAnchor="middle">J. Powell · Plastering</text>

      {/* Home bar */}
      <rect y="800" width="390" height="44" fill="#fff"/>
      <rect x="140" y="820" width="110" height="4" rx="2" fill="#DDE3E8"/>
    </>
  )
}
