/**
 * MarkupScreen — SVG recreation of Screen 08 (Markup Studio).
 * activeTool: 'arrow' | 'circle' | 'box' | 'number' — controls which markup overlay shows.
 */
export default function MarkupScreen({ activeTool = 'arrow' }) {
  return (
    <>
      {/* Background — concrete/plaster wall texture */}
      <rect width="390" height="844" fill="#1C232B" />

      {/* Status bar */}
      <rect width="390" height="52" fill="#12181F" />
      <text x="20" y="34" fill="#fff" fontSize="13" fontWeight="600" fontFamily="system-ui">9:41</text>
      {/* Signal/battery icons simplified */}
      <rect x="330" y="22" width="18" height="9" rx="2" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.8"/>
      <rect x="349" y="24" width="2" height="5" rx="1" fill="#fff" opacity="0.6"/>
      <rect x="331" y="23" width="13" height="7" rx="1" fill="#fff" opacity="0.8"/>
      <circle cx="312" cy="27" r="5" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.8"/>
      <path d="M309 27 a3 3 0 0 1 6 0" fill="#fff" opacity="0.6"/>
      <circle cx="296" cy="27" r="5" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.8"/>
      <path d="M293 27 a3 3 0 0 1 6 0" fill="#fff" opacity="0.6"/>

      {/* Nav bar */}
      <rect y="52" width="390" height="52" fill="#1A2330" />
      {/* Back chevron */}
      <path d="M18 78 l10-10 m-10 10 l10 10" stroke="#4C82FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <text x="36" y="83" fill="#4C82FF" fontSize="14" fontWeight="600" fontFamily="system-ui">Issue</text>
      <text x="145" y="84" fill="#fff" fontSize="16" fontWeight="700" fontFamily="system-ui">Markup Studio</text>
      {/* Save button */}
      <rect x="318" y="66" width="58" height="28" rx="8" fill="#4C82FF"/>
      <text x="347" y="84" fill="#fff" fontSize="13" fontWeight="700" fontFamily="system-ui" textAnchor="middle">Save</text>

      {/* Main photo area — plaster wall defect */}
      <rect y="104" width="390" height="530" fill="#5A6470"/>
      {/* Wall texture — subtle tonal variation */}
      <rect y="104" width="390" height="530" fill="url(#wallGrad)"/>
      <defs>
        <linearGradient id="wallGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#828C96" stopOpacity="0.5"/>
          <stop offset="40%" stopColor="#6B7580" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#4A5460" stopOpacity="0.5"/>
        </linearGradient>
        {/* Crack / defect texture lines */}
      </defs>
      {/* Plaster crack lines */}
      <path d="M140 250 l25 30 l10 40 l-5 20 l15 25" stroke="#3D4650" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8"/>
      <path d="M162 278 l-15 20 l-8 18" stroke="#3D4650" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
      <path d="M150 320 l12 8 l5 22" stroke="#3D4650" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
      {/* Stain/shadow */}
      <ellipse cx="165" cy="300" rx="55" ry="65" fill="#3D4650" opacity="0.25"/>

      {/* ── Markup overlays based on activeTool ── */}
      {activeTool === 'arrow' && (
        <>
          {/* Bold red arrow pointing at crack */}
          <defs>
            <marker id="arrowHead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#C93B3B"/>
            </marker>
          </defs>
          <line x1="280" y1="220" x2="195" y2="285" stroke="#C93B3B" strokeWidth="3.5" markerEnd="url(#arrowHead)"/>
          {/* Selection handles on arrow */}
          <circle cx="280" cy="220" r="5" fill="#fff" stroke="#C93B3B" strokeWidth="2"/>
        </>
      )}
      {activeTool === 'circle' && (
        <>
          {/* Red circle around defect area */}
          <ellipse cx="165" cy="295" rx="55" ry="60" fill="none" stroke="#C93B3B" strokeWidth="3.5" strokeDasharray="0"/>
          <circle cx="165" cy="235" r="5" fill="#fff" stroke="#C93B3B" strokeWidth="2"/>
        </>
      )}
      {activeTool === 'box' && (
        <>
          {/* Red rectangle box */}
          <rect x="110" y="240" width="110" height="115" rx="4" fill="none" stroke="#C93B3B" strokeWidth="3.5"/>
          {/* Corner handles */}
          <circle cx="110" cy="240" r="5" fill="#fff" stroke="#C93B3B" strokeWidth="2"/>
          <circle cx="220" cy="240" r="5" fill="#fff" stroke="#C93B3B" strokeWidth="2"/>
          <circle cx="110" cy="355" r="5" fill="#fff" stroke="#C93B3B" strokeWidth="2"/>
          <circle cx="220" cy="355" r="5" fill="#fff" stroke="#C93B3B" strokeWidth="2"/>
        </>
      )}
      {activeTool === 'number' && (
        <>
          {/* Numbered cobalt marker */}
          <circle cx="170" cy="295" r="18" fill="#4C82FF"/>
          <text x="170" y="301" fill="#fff" fontSize="16" fontWeight="800" fontFamily="system-ui" textAnchor="middle">1</text>
          {/* Leader line */}
          <line x1="188" y1="295" x2="250" y2="260" stroke="#4C82FF" strokeWidth="2.5" strokeDasharray="4 3"/>
          <rect x="246" y="246" width="80" height="28" rx="6" fill="#4C82FF" opacity="0.9"/>
          <text x="286" y="264" fill="#fff" fontSize="11" fontWeight="600" fontFamily="system-ui" textAnchor="middle">Plaster crack</text>
        </>
      )}

      {/* Grid crosshair overlay (light) */}
      <line x1="195" y1="104" x2="195" y2="634" stroke="#fff" strokeWidth="0.5" opacity="0.07"/>
      <line x1="0" y1="369" x2="390" y2="369" stroke="#fff" strokeWidth="0.5" opacity="0.07"/>

      {/* Undo / Redo */}
      <rect x="12" y="116" width="36" height="36" rx="8" fill="rgba(0,0,0,0.45)"/>
      <path d="M22 134 a8 8 0 1 1 4 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M22 134 l-3-5 l5 0" fill="#fff"/>
      <rect x="54" y="116" width="36" height="36" rx="8" fill="rgba(0,0,0,0.45)"/>
      <path d="M80 134 a8 8 0 1 0-4 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M80 134 l3-5 l-5 0" fill="#fff"/>

      {/* Bottom toolbar */}
      <rect y="634" width="390" height="88" fill="#12181F"/>

      {/* Tool items */}
      {[
        { label:'Select', x:32 },
        { label:'Arrow', x:92 },
        { label:'Circle', x:152 },
        { label:'Box', x:212 },
        { label:'Pen', x:272 },
        { label:'Number', x:332 },
      ].map(({ label, x }) => {
        const isActive = (label.toLowerCase() === activeTool) ||
                         (label === 'Arrow' && activeTool === 'arrow') ||
                         (label === 'Circle' && activeTool === 'circle') ||
                         (label === 'Box' && activeTool === 'box') ||
                         (label === 'Number' && activeTool === 'number')
        return (
          <g key={label}>
            <rect x={x - 22} y="644" width="44" height="44" rx="10"
              fill={isActive ? '#4C82FF' : 'rgba(255,255,255,0.07)'}/>
            {/* Simple icon representation */}
            <text x={x} y="671" fill={isActive ? '#fff' : '#7E8B96'}
              fontSize="9" fontWeight="700" fontFamily="system-ui" textAnchor="middle"
              dominantBaseline="middle">
              {label === 'Arrow' ? '↗' : label === 'Circle' ? '○' : label === 'Box' ? '□' :
               label === 'Pen' ? '✏' : label === 'Number' ? '#' : '⊹'}
            </text>
            <text x={x} y="698" fill={isActive ? '#4C82FF' : '#5A6570'}
              fontSize="9" fontWeight={isActive ? '700' : '500'} fontFamily="system-ui" textAnchor="middle">
              {label}
            </text>
          </g>
        )
      })}

      {/* Color bar */}
      <rect y="722" width="390" height="62" fill="#0F141A"/>
      {/* Color swatches */}
      {['#C93B3B','#E5A016','#4C82FF','#1E9E5A','#fff','#1C232B'].map((c, i) => (
        <circle key={c} cx={44 + i * 48} cy="753" r={i === 0 ? 14 : 12}
          fill={c} stroke={i === 0 ? '#fff' : 'none'} strokeWidth={i === 0 ? 2.5 : 0}/>
      ))}
      {/* Stroke width slider */}
      <rect x="320" y="746" width="56" height="14" rx="7" fill="rgba(255,255,255,0.1)"/>
      <rect x="320" y="746" width="30" height="14" rx="7" fill="#4C82FF"/>
      <circle cx="350" cy="753" r="8" fill="#fff" stroke="#4C82FF" strokeWidth="2"/>

      {/* Home bar */}
      <rect y="800" width="390" height="44" fill="#0F141A"/>
      <rect x="140" y="820" width="110" height="4" rx="2" fill="rgba(255,255,255,0.3)"/>
    </>
  )
}
