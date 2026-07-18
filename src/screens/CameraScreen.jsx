/**
 * CameraScreen — SVG recreation of Screen 06 (Camera / Capture).
 */
export default function CameraScreen() {
  return (
    <>
      {/* Dark camera viewfinder background */}
      <rect width="390" height="844" fill="#0B0F14"/>

      {/* Status bar — light on dark */}
      <text x="20" y="34" fill="#fff" fontSize="13" fontWeight="600" fontFamily="system-ui">9:41</text>
      <rect x="330" y="22" width="18" height="9" rx="2" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.7"/>
      <rect x="331" y="23" width="13" height="7" rx="1" fill="#fff" opacity="0.7"/>

      {/* Top controls bar */}
      <rect y="44" width="390" height="56" fill="rgba(0,0,0,0.55)"/>
      {/* Close X */}
      <path d="M22 60 l16 16 m0-16 l-16 16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Flash icon */}
      <path d="M191 54 l-7 18 h7 l-7 18" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Location pin */}
      <circle cx="340" cy="72" r="9" fill="none" stroke="#fff" strokeWidth="2"/>
      <circle cx="340" cy="72" r="3" fill="#fff"/>

      {/* PunchThis mark at top centre */}
      <g transform="translate(153, 54)">
        <path d="M4 10 V7 a3 3 0 0 1 3-3 h3 M22 4 h3 a3 3 0 0 1 3 3 v3 M28 22 v3 a3 3 0 0 1 -3 3 h-3 M10 28 h-3 a3 3 0 0 1 -3-3 v-3"
          stroke="#8B97A1" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <rect x="12" y="12" width="8" height="8" rx="2.5" fill="#4C82FF"/>
      </g>

      {/* Viewfinder — simulated scene of a wall/ceiling junction */}
      <rect y="100" width="390" height="560" fill="#263038"/>
      {/* Wall texture gradient */}
      <rect y="100" width="390" height="560" fill="url(#cameraWall)"/>
      <defs>
        <linearGradient id="cameraWall" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#3A444E" stopOpacity="0.8"/>
          <stop offset="50%" stopColor="#2B3540" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#1E2830" stopOpacity="0.9"/>
        </linearGradient>
      </defs>
      {/* Ceiling/wall line */}
      <line x1="0" y1="290" x2="390" y2="290" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      {/* Plaster defect area visible in scene */}
      <path d="M130 260 l20 25 l8 35" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <ellipse cx="145" cy="280" rx="30" ry="35" fill="rgba(255,255,255,0.04)"/>

      {/* Focus / capture frame corners */}
      <g stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9">
        {/* Top-left */}
        <path d="M100 200 h22 m-22 0 v22"/>
        {/* Top-right */}
        <path d="M290 200 h-22 m22 0 v22"/>
        {/* Bottom-left */}
        <path d="M100 460 h22 m-22 0 v-22"/>
        {/* Bottom-right */}
        <path d="M290 460 h-22 m22 0 v-22"/>
      </g>

      {/* Focus centre dot */}
      <circle cx="195" cy="330" r="18" fill="none" stroke="#4C82FF" strokeWidth="1.5" opacity="0.7"/>
      <circle cx="195" cy="330" r="3" fill="#4C82FF" opacity="0.8"/>

      {/* Grid lines — rule of thirds */}
      <line x1="130" y1="100" x2="130" y2="660" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <line x1="260" y1="100" x2="260" y2="660" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <line x1="0" y1="287" x2="390" y2="287" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <line x1="0" y1="474" x2="390" y2="474" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>

      {/* Bottom capture bar */}
      <rect y="660" width="390" height="140" fill="rgba(0,0,0,0.7)"/>

      {/* Gallery thumbnail */}
      <rect x="28" y="692" width="58" height="58" rx="10" fill="#3A4550"/>
      <rect x="28" y="692" width="58" height="58" rx="10" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
      <text x="57" y="726" fill="#7E8B96" fontSize="10" fontFamily="system-ui" textAnchor="middle">Photo</text>

      {/* Shutter button */}
      <circle cx="195" cy="718" r="36" fill="rgba(255,255,255,0.12)" stroke="#fff" strokeWidth="2.5"/>
      <circle cx="195" cy="718" r="28" fill="#fff"/>

      {/* Flip camera */}
      <circle cx="312" cy="718" r="28" fill="rgba(255,255,255,0.08)"/>
      <path d="M302 712 a10 10 0 0 1 16 0 m-2-4 l2 4 l-4 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M322 724 a10 10 0 0 1-16 0 m2 4 l-2-4 l4-1" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none"/>

      {/* Quick-issue label */}
      <text x="195" y="762" fill="#fff" fontSize="12" fontWeight="600" fontFamily="system-ui" textAnchor="middle">Tap to capture issue</text>

      {/* Home bar */}
      <rect y="780" width="390" height="64" fill="rgba(0,0,0,0.7)"/>
      <rect x="140" y="810" width="110" height="4" rx="2" fill="rgba(255,255,255,0.25)"/>
    </>
  )
}
