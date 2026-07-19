import { useEffect, useRef, useState } from 'react'
import { Camera, Check } from 'lucide-react'
import captureSessionImg from '../assets/app-screens/capture-session.png'
import issueOriginalImg from '../assets/app-screens/issue-original.png'

// Same coordinates as the real issue #008 annotation (audit-snap-663
// lib/seed.ts) so the final frame matches the real Markup Studio
// screenshot exactly, not an invented mark-up.
const BOX = { x: 0.1, y: 0.16, w: 0.36, h: 0.34 }
const ARROW = { x1: 0.6, y1: 0.6, x2: 0.4, y2: 0.42 }
const LABEL = { x: 0.72, y: 0.6 }

const PHASES = [
  { name: 'idle', duration: 1600 },
  { name: 'press', duration: 160 },
  { name: 'flash', duration: 180 },
  { name: 'capture', duration: 550 },
  { name: 'settle', duration: 350 },
  { name: 'arrow', duration: 700 },
  { name: 'box', duration: 500 },
  { name: 'text', duration: 600 },
  { name: 'saved', duration: 750 },
  { name: 'hold', duration: 1300 },
]
// Index of the first "photo" phase (before this: capture-session screen;
// from this on: the plain-then-annotated photo).
const PHOTO_FROM = PHASES.findIndex((p) => p.name === 'capture')
const ORDER = PHASES.map((p) => p.name)
const atOrAfter = (phase, name) => ORDER.indexOf(phase) >= ORDER.indexOf(name)

/**
 * Looping capture -> markup -> save demo, built from real screenshots and
 * the app's actual annotation coordinates (not an invented UI). Purely
 * decorative (aria-hidden) - the surrounding copy/headings carry the real
 * information for screen readers. Under prefers-reduced-motion this
 * renders the single completed frame, no looping/motion at all.
 */
export default function CaptureAnimation({ maxWidth = 260 }) {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (reducedMotion) return undefined
    timeoutRef.current = setTimeout(() => {
      setPhaseIndex((i) => (i + 1) % PHASES.length)
    }, PHASES[phaseIndex].duration)
    return () => clearTimeout(timeoutRef.current)
  }, [phaseIndex, reducedMotion])

  const phase = reducedMotion ? 'hold' : PHASES[phaseIndex].name
  const showPhoto = reducedMotion || phaseIndex >= PHOTO_FROM
  const ratio = 844 / 390

  return (
    <div
      aria-hidden="true"
      style={{ width: maxWidth, maxWidth: '100%', position: 'relative', flexShrink: 0 }}
    >
      <div style={{
        position: 'relative', width: '100%', paddingTop: `${ratio * 100}%`,
        borderRadius: '18% / 8.3%',
        background: 'linear-gradient(160deg, #2A2A2A 0%, #111 50%, #1E1E1E 100%)',
        boxShadow: '0 2px 0 #555 inset, 0 -2px 0 #000 inset, 0 24px 64px rgba(0,0,0,0.45), 0 8px 20px rgba(0,0,0,0.3)',
      }}>
        <div style={{ position: 'absolute', left: '-0.9%', top: '15%', width: '0.9%', height: '4%', background: '#3A3A3A', borderRadius: '1px 0 0 1px' }} />
        <div style={{ position: 'absolute', left: '-0.9%', top: '23%', width: '0.9%', height: '5.5%', background: '#333', borderRadius: '1px 0 0 1px' }} />
        <div style={{ position: 'absolute', left: '-0.9%', top: '30%', width: '0.9%', height: '5.5%', background: '#333', borderRadius: '1px 0 0 1px' }} />
        <div style={{ position: 'absolute', right: '-0.9%', top: '19%', width: '0.9%', height: '7%', background: '#333', borderRadius: '0 1px 1px 0' }} />

        <div style={{ position: 'absolute', inset: '3%', borderRadius: '16% / 7.4%', background: '#0A0A0A', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: '16% / 7.4%' }}>
            {/* Capture-session background, visible until the shutter fires */}
            <img
              src={captureSessionImg}
              alt=""
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                opacity: showPhoto ? 0 : 1,
                transition: 'opacity 200ms ease',
              }}
            />
            {/* Markup Studio header text, fills the space above the photo
                card once we're past the capture moment */}
            <div style={{
              position: 'absolute', top: '6%', left: 0, right: 0, textAlign: 'center',
              color: '#fff', fontSize: 12, fontWeight: 700,
              opacity: showPhoto ? 1 : 0,
              transition: 'opacity 250ms ease 120ms',
            }}>
              Markup Studio
            </div>

            {/* The photo card — sized to the photo's own aspect ratio and
                centered (matching how the real Markup Studio letterboxes
                its canvas, not a full-bleed crop) so the box/arrow below
                map onto it without distortion. Appears with a tilt+settle,
                then carries the markup. */}
            <div style={{
              position: 'absolute', left: '50%', top: '52%', width: '82%', aspectRatio: '374 / 281',
              transform: `translate(-50%, -50%) ${phase === 'capture' ? 'rotate(-6deg) scale(0.92)' : 'rotate(0deg) scale(1)'}`,
              opacity: showPhoto ? 1 : 0,
              transition: 'opacity 180ms ease, transform 480ms cubic-bezier(0.22, 1, 0.36, 1)',
              borderRadius: 6, overflow: 'hidden', boxShadow: '0 10px 28px rgba(0,0,0,0.45)',
            }}>
              <img src={issueOriginalImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <rect
                  x={BOX.x * 100} y={BOX.y * 100} width={BOX.w * 100} height={BOX.h * 100}
                  fill="none" stroke="#E53935" strokeWidth="1.2" vectorEffect="non-scaling-stroke"
                  style={{
                    transformOrigin: `${(BOX.x + BOX.w / 2) * 100}% ${(BOX.y + BOX.h / 2) * 100}%`,
                    transform: atOrAfter(phase, 'box') ? 'scale(1)' : 'scale(0.6)',
                    opacity: atOrAfter(phase, 'box') ? 1 : 0,
                    transition: 'transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 200ms ease',
                  }}
                />
                <line
                  x1={ARROW.x1 * 100} y1={ARROW.y1 * 100} x2={ARROW.x2 * 100} y2={ARROW.y2 * 100}
                  stroke="#E53935" strokeWidth="1.4" strokeLinecap="round" vectorEffect="non-scaling-stroke"
                  pathLength="1"
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset: atOrAfter(phase, 'arrow') ? 0 : 1,
                    transition: 'stroke-dashoffset 550ms ease-out',
                  }}
                />
              </svg>
              <div
                style={{
                  position: 'absolute',
                  left: `${LABEL.x * 100}%`, top: `${LABEL.y * 100}%`,
                  transform: `translate(-50%, -50%) scale(${atOrAfter(phase, 'text') ? 1 : 0.7})`,
                  opacity: atOrAfter(phase, 'text') ? 1 : 0,
                  transition: 'transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 220ms ease',
                  background: '#E53935', color: '#fff', fontSize: 10, fontWeight: 800,
                  padding: '4px 8px', borderRadius: 4, whiteSpace: 'nowrap',
                }}
              >
                Door left open
              </div>
            </div>

            {/* Shutter flash */}
            <div style={{
              position: 'absolute', inset: 0, background: '#fff',
              opacity: phase === 'flash' ? 0.92 : 0,
              transition: phase === 'flash' ? 'opacity 60ms ease-out' : 'opacity 260ms ease-in',
              pointerEvents: 'none',
            }} />

            {/* Camera button, tap feedback, saved pulse */}
            <div style={{
              position: 'absolute', left: '50%', bottom: '9%', transform: 'translateX(-50%)',
              opacity: showPhoto ? 0 : 1,
              transition: 'opacity 150ms ease',
            }}>
              <div style={{
                width: 46, height: 46, borderRadius: '50%',
                background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '3px solid #3a7bff',
                transform: phase === 'press' ? 'scale(0.86)' : 'scale(1)',
                transition: 'transform 120ms ease',
              }}>
                <Camera size={18} color="#12181F" />
              </div>
            </div>
            <div style={{
              position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
              width: 44, height: 44, borderRadius: '50%', background: 'rgba(30,158,90,0.95)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: phase === 'saved' ? 1 : 0,
              scale: phase === 'saved' ? 1 : 0.5,
              transition: 'opacity 180ms ease, scale 220ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}>
              <Check size={22} color="#fff" strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
