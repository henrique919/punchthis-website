import { useRef, useState, useCallback, useEffect } from 'react'

/**
 * Accessible before/after image comparison slider. Drag or use arrow keys
 * on the handle (role="slider") to reveal more of the "after" image.
 */
export default function BeforeAfterSlider({ beforeSrc, afterSrc, beforeLabel = 'Before', afterLabel = 'After' }) {
  const [position, setPosition] = useState(50) // % of width showing "after"
  const containerRef = useRef(null)
  const draggingRef = useRef(false)

  const updateFromClientX = useCallback((clientX) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }, [])

  useEffect(() => {
    function onMove(e) {
      if (!draggingRef.current) return
      const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX
      if (clientX != null) updateFromClientX(clientX)
    }
    function onUp() { draggingRef.current = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchend', onUp)
    }
  }, [updateFromClientX])

  function handleKeyDown(e) {
    if (e.key === 'ArrowLeft') { setPosition((p) => Math.max(0, p - 5)); e.preventDefault() }
    if (e.key === 'ArrowRight') { setPosition((p) => Math.min(100, p + 5)); e.preventDefault() }
    if (e.key === 'Home') { setPosition(0); e.preventDefault() }
    if (e.key === 'End') { setPosition(100); e.preventDefault() }
  }

  return (
    <div
      ref={containerRef}
      className="ba-slider"
      onMouseDown={(e) => { draggingRef.current = true; updateFromClientX(e.clientX) }}
      onTouchStart={(e) => { draggingRef.current = true; updateFromClientX(e.touches[0].clientX) }}
    >
      <img src={beforeSrc} alt={beforeLabel} className="ba-img ba-before" draggable={false} />
      <div className="ba-after-clip" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={afterSrc} alt={afterLabel} className="ba-img ba-after" draggable={false} />
      </div>
      <div className="ba-handle-line" style={{ left: `${position}%` }} aria-hidden="true" />
      <div
        role="slider"
        tabIndex={0}
        aria-label="Reveal markup: drag or use arrow keys to compare the original photo with the annotated version"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)}% annotated`}
        className="ba-handle"
        style={{ left: `${position}%` }}
        onKeyDown={handleKeyDown}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M6 4L2 9L6 14M12 4L16 9L12 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="ba-tag ba-tag-left">{beforeLabel}</span>
      <span className="ba-tag ba-tag-right">{afterLabel}</span>

      <style>{`
        .ba-slider {
          position: relative; width: 100%; aspect-ratio: 4 / 3;
          border-radius: var(--radius-lg); overflow: hidden;
          cursor: ew-resize; user-select: none;
          box-shadow: var(--shadow-lg);
          touch-action: none;
        }
        .ba-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
        .ba-after-clip { position: absolute; inset: 0; }
        .ba-handle-line {
          position: absolute; top: 0; bottom: 0; width: 3px;
          background: #fff; transform: translateX(-50%);
          box-shadow: 0 0 0 1px rgba(0,0,0,0.15);
          pointer-events: none;
        }
        .ba-handle {
          position: absolute; top: 50%; transform: translate(-50%, -50%);
          width: 44px; height: 44px; border-radius: 50%;
          background: #fff; color: var(--ink);
          display: flex; align-items: center; justify-content: center;
          box-shadow: var(--shadow-md);
          border: none;
        }
        .ba-tag {
          position: absolute; bottom: 14px;
          font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;
          background: rgba(18,24,31,0.72); color: #fff;
          padding: 5px 10px; border-radius: 999px;
          pointer-events: none;
        }
        .ba-tag-left { left: 14px; }
        .ba-tag-right { right: 14px; }
      `}</style>
    </div>
  )
}
