/**
 * ReportBuilderScreen — SVG recreation of Screen 10 (Report Builder).
 */
export default function ReportBuilderScreen() {
  const toggleOn  = (x, y) => <>
    <rect x={x} y={y} width="44" height="24" rx="12" fill="#4C82FF"/>
    <circle cx={x + 32} cy={y + 12} r="10" fill="#fff"/>
  </>
  const toggleOff = (x, y) => <>
    <rect x={x} y={y} width="44" height="24" rx="12" fill="#DDE3E8"/>
    <circle cx={x + 12} cy={y + 12} r="10" fill="#fff"/>
  </>

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
      <text x="38" y="82" fill="#4C82FF" fontSize="14" fontWeight="600" fontFamily="system-ui">Audit</text>
      <text x="168" y="83" fill="#fff" fontSize="16" fontWeight="700" fontFamily="system-ui">Report</text>

      {/* Report type tabs */}
      <rect y="104" width="390" height="52" fill="#fff"/>
      <rect y="155" width="390" height="1" fill="#DDE3E8"/>
      {/* Active tab: Client report */}
      <rect x="8" y="108" width="110" height="36" rx="8" fill="#1C232B"/>
      <text x="63" y="130" fill="#fff" fontSize="12" fontWeight="700" fontFamily="system-ui" textAnchor="middle">Client report</text>
      {/* Inactive tabs */}
      <rect x="124" y="108" width="86" height="36" rx="8" fill="transparent"/>
      <text x="167" y="130" fill="#7E8B96" fontSize="12" fontWeight="600" fontFamily="system-ui" textAnchor="middle">Site walk</text>
      <rect x="216" y="108" width="78" height="36" rx="8" fill="transparent"/>
      <text x="255" y="130" fill="#7E8B96" fontSize="12" fontWeight="600" fontFamily="system-ui" textAnchor="middle">Handover</text>

      {/* Content sections */}
      <text x="20" y="180" fill="#7E8B96" fontSize="10" fontWeight="800" letterSpacing="0.1em" fontFamily="system-ui">CONTENTS</text>

      {/* Toggle rows */}
      {[
        { label: 'Cover page',             sub: 'Project name, date and inspector', on: true,  y: 196 },
        { label: 'Executive summary',      sub: 'Issue counts by status',           on: true,  y: 262 },
        { label: 'Annotated photos',       sub: 'Full-resolution with markup',      on: true,  y: 328 },
        { label: 'Include completed',      sub: 'Verified and closed issues',       on: false, y: 394 },
        { label: 'Signature section',      sub: 'Approval and sign-off block',      on: true,  y: 460 },
      ].map(({ label, sub, on, y }) => (
        <g key={y}>
          <rect x="12" y={y} width="366" height="58" rx="12" fill="#fff"/>
          <text x="24" y={y + 22} fill="#1C232B" fontSize="13" fontWeight="700" fontFamily="system-ui">{label}</text>
          <text x="24" y={y + 40} fill="#7E8B96" fontSize="11" fontFamily="system-ui">{sub}</text>
          {on ? toggleOn(322, y + 17) : toggleOff(322, y + 17)}
        </g>
      ))}

      {/* Group by location row */}
      <rect x="12" y="526" width="366" height="58" rx="12" fill="#fff"/>
      <text x="24" y="548" fill="#1C232B" fontSize="13" fontWeight="700" fontFamily="system-ui">Group by Location</text>
      <text x="24" y="566" fill="#7E8B96" fontSize="11" fontFamily="system-ui">Organise issues by zone or level</text>
      {toggleOn(322, 543)}

      {/* Issue count strip */}
      <rect x="12" y="594" width="366" height="40" rx="10" fill="#EAF1FF"/>
      <circle cx="30" cy="614" r="5" fill="#4C82FF"/>
      <text x="42" y="618" fill="#2F6BFF" fontSize="12" fontWeight="700" fontFamily="system-ui">31 issues included</text>
      <text x="328" y="618" fill="#4C82FF" fontSize="11" fontWeight="600" fontFamily="system-ui">Edit ›</text>

      {/* Preview PDF button */}
      <rect x="20" y="648" width="350" height="52" rx="14" fill="#4C82FF"/>
      <text x="195" y="679" fill="#fff" fontSize="15" fontWeight="700" fontFamily="system-ui" textAnchor="middle">Preview PDF · 31 issues</text>

      {/* Share options */}
      <rect y="716" width="390" height="84" fill="#fff"/>
      <rect y="716" width="390" height="1" fill="#DDE3E8"/>
      <text x="195" y="738" fill="#7E8B96" fontSize="10" fontWeight="800" letterSpacing="0.1em" fontFamily="system-ui" textAnchor="middle">SHARE AS</text>
      <rect x="20" y="746" width="164" height="40" rx="10" fill="#F2F4F6" stroke="#DDE3E8" strokeWidth="1"/>
      <text x="102" y="771" fill="#1C232B" fontSize="13" fontWeight="700" fontFamily="system-ui" textAnchor="middle">Email report</text>
      <rect x="196" y="746" width="164" height="40" rx="10" fill="#F2F4F6" stroke="#DDE3E8" strokeWidth="1"/>
      <text x="278" y="771" fill="#1C232B" fontSize="13" fontWeight="700" fontFamily="system-ui" textAnchor="middle">Share PDF</text>

      {/* Home bar */}
      <rect y="800" width="390" height="44" fill="#fff"/>
      <rect x="140" y="820" width="110" height="4" rx="2" fill="#DDE3E8"/>
    </>
  )
}
