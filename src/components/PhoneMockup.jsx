/**
 * PhoneMockup — reusable phone frame.
 * Pass either a real screenshot via `image` (preferred — see
 * src/config/media-manifest.js) or an SVG screen component as `children`.
 * `maxWidth` controls the rendered width (default 240px).
 * `label` — accessible aria-label for the device.
 * `priority` — set true for above-the-fold instances (the hero) so the
 * image loads eagerly instead of lazily; lazy-loading an LCP candidate
 * delays it and directly hurts the LCP budget.
 */
export default function PhoneMockup({ children, image, maxWidth = 240, label = 'App screenshot', style = {}, priority = false }) {
  // 390 × 844 native ratio
  const ratio = 844 / 390

  return (
    <div
      role="img"
      aria-label={label}
      style={{
        width: maxWidth,
        maxWidth: '100%',
        position: 'relative',
        flexShrink: 0,
        ...style,
      }}
    >
      {/* Outer hardware frame */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingTop: `${ratio * 100}%`,
        borderRadius: '18% / 8.3%',
        background: 'linear-gradient(160deg, #2A2A2A 0%, #111 50%, #1E1E1E 100%)',
        boxShadow: '0 2px 0 #555 inset, 0 -2px 0 #000 inset, 0 24px 64px rgba(0,0,0,0.45), 0 8px 20px rgba(0,0,0,0.3)',
      }}>
        {/* Side buttons */}
        <div style={{ position:'absolute', left:'-2.5%', top:'22%', width:'2.5%', height:'8%', background:'#333', borderRadius:'2px 0 0 2px', boxShadow:'-1px 0 2px rgba(0,0,0,0.4)' }} aria-hidden="true" />
        <div style={{ position:'absolute', left:'-2.5%', top:'33%', width:'2.5%', height:'12%', background:'#2E2E2E', borderRadius:'2px 0 0 2px', boxShadow:'-1px 0 2px rgba(0,0,0,0.4)' }} aria-hidden="true" />
        <div style={{ position:'absolute', left:'-2.5%', top:'47%', width:'2.5%', height:'12%', background:'#2E2E2E', borderRadius:'2px 0 0 2px', boxShadow:'-1px 0 2px rgba(0,0,0,0.4)' }} aria-hidden="true" />
        <div style={{ position:'absolute', right:'-2.5%', top:'30%', width:'2.5%', height:'16%', background:'#2A2A2A', borderRadius:'0 2px 2px 0', boxShadow:'1px 0 2px rgba(0,0,0,0.4)' }} aria-hidden="true" />

        {/* Bezel inset */}
        <div style={{
          position: 'absolute',
          inset: '3%',
          borderRadius: '16% / 7.4%',
          background: '#0A0A0A',
          overflow: 'hidden',
        }}>
          {/* No decorative notch/dynamic island here on purpose: the real
              screenshots are captured on web, which has no physical notch
              and so no safe-area gap pushing header content clear of one —
              a fake notch drawn on top at a fixed position ended up sitting
              directly over real header text (e.g. "Markup Studio") on
              several screens. A device frame that lies about what's under
              it is worse than one with no notch at all. */}

          {/* Screen content area — real screenshot (preferred) or children render at 390×844 virtual coords */}
          <div style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            borderRadius: '16% / 7.4%',
          }}>
            {image ? (
              <img
                src={image}
                alt=""
                aria-hidden="true"
                style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
                loading={priority ? 'eager' : 'lazy'}
                fetchPriority={priority ? 'high' : 'auto'}
                decoding="async"
              />
            ) : (
              <svg
                viewBox="0 0 390 844"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '100%', height: '100%', display: 'block' }}
                aria-hidden="true"
              >
                {children}
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
