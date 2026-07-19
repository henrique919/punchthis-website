// Logo — PunchThis wordmark + icon mark
// iconOnly: boolean — render just the symbol
// light: boolean — white/steel variant for dark backgrounds
// size: 'sm' | 'md' | 'lg'
export default function Logo({ iconOnly = false, light = false, size = 'md' }) {
  const sizes = { sm: { icon: 28, text: 18 }, md: { icon: 36, text: 22 }, lg: { icon: 52, text: 32 } }
  const { icon, text } = sizes[size] || sizes.md
  const frameStroke = light ? '#8B97A1' : '#7E8B96'
  const wordPunch = light ? '#FFFFFF' : '#1C232B'
  // Both previously failed AA as text (2.31:1 on white, 3.4:1 on the
  // sticky header's dark-mode blend) - #616B78 matches --steel-text
  // (5.41:1 on white), #AEB7BF is its dark-surface counterpart (4.99:1 on
  // the header's dark-mode background, 7.79:1 on solid ink).
  const wordThis  = light ? '#AEB7BF' : '#616B78'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: icon * 0.33, flexShrink: 0 }}
         aria-label="PunchThis">
      {/* Mark — camera-frame with cobalt chip */}
      <svg width={icon} height={icon} viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path
          d="M8 20 V14 a6 6 0 0 1 6-6 h6 M44 8 h6 a6 6 0 0 1 6 6 v6 M56 44 v6 a6 6 0 0 1 -6 6 h-6 M20 56 h-6 a6 6 0 0 1 -6-6 v-6"
          stroke={frameStroke} strokeWidth="5" strokeLinecap="round"
        />
        <rect x="24" y="24" width="16" height="16" rx="4.5" fill="#4C82FF" />
      </svg>

      {!iconOnly && (
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: text,
          letterSpacing: '-0.02em',
          lineHeight: 1,
          userSelect: 'none',
        }}>
          <span style={{ fontWeight: 700, color: wordPunch }}>Punch</span>
          <span style={{ fontWeight: 400, color: wordThis }}>This</span>
        </span>
      )}
    </div>
  )
}
