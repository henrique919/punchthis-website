import { useEffect, useRef, useState } from 'react'
import { Camera, Check } from 'lucide-react'
import captureSessionImg from '../assets/app-screens/capture-session.png'
import issueOriginalImg from '../assets/app-screens/issue-original.png'

// A fresh composition for this full-bleed vertical crop, not the exact
// static seed-data coordinates (those assume the photo's own 4:3 shape,
// which doesn't fit a phone screen without either cropping or letterboxing
// — see the commit message for why full-bleed won this trade-off). Same
// real photo, same real defect area (the drain/floor region), same
// "Door left open" text as the actual issue #008 record — just recomposed
// so the box/arrow/label all land inside what's actually visible after
// the crop, instead of running off both edges of the frame.
const BOX = { x: 0.16, y: 0.3, w: 0.68, h: 0.24 }
const ARROW = { x1: 0.78, y1: 0.68, x2: 0.62, y2: 0.55 }
const LABEL = { x: 0.5, y: 0.8 }
const PHOTO_OBJECT_POSITION = '30% 42%'

const PHASES = [
  { name: 'idle', duration: 1900 },
  { name: 'press', duration: 160 },
  { name: 'viewfinder', duration: 550 },
  { name: 'hold', duration: 950 },
  { name: 'flash', duration: 150 },
  { name: 'capture', duration: 550 },
  { name: 'settle', duration: 350 },
  { name: 'arrow', duration: 950 },
  { name: 'box', duration: 600 },
  { name: 'text', duration: 700 },
  { name: 'saved', duration: 850 },
  { name: 'final', duration: 1700 },
]
const ORDER = PHASES.map((p) => p.name)
const atOrAfter = (phase, name) => ORDER.indexOf(phase) >= ORDER.indexOf(name)

/**
 * Looping capture -> markup -> save demo, built from real screenshots.
 * Purely decorative (aria-hidden) - the surrounding copy/headings carry
 * the real information for screen readers. Under prefers-reduced-motion
 * this renders the single completed frame, no looping/motion at all.
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

  const phase = reducedMotion ? 'final' : PHASES[phaseIndex].name
  const showCamera = reducedMotion || atOrAfter(phase, 'viewfinder')
  const showShutterBtn = !reducedMotion && !atOrAfter(phase, 'flash')
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
            {/* List screen, visible until the camera opens */}
            <img
              src={captureSessionImg}
              alt=""
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                opacity: showCamera ? 0 : 1,
                transition: 'opacity 260ms ease',
              }}
            />

            {/* Camera opens on the real photo, full-bleed like an actual
                viewfinder/photo view - holds, then the shutter fires and
                the same frame carries the markup. */}
            <div style={{
              position: 'absolute', inset: 0,
              opacity: showCamera ? 1 : 0,
              transform: phase === 'capture' ? 'scale(1.035) rotate(-1.5deg)' : 'scale(1) rotate(0deg)',
              transition: 'opacity 350ms ease, transform 420ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}>
              <img
                src={issueOriginalImg}
                alt=""
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: PHOTO_OBJECT_POSITION, display: 'block' }}
              />
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <defs>
                  <marker id="capAnimArrowhead" markerWidth="10" markerHeight="10" refX="4" refY="5" orient="auto">
                    <path d="M0,0 L10,5 L0,10 Z" fill="#C62828" />
                  </marker>
                </defs>
                <rect
                  x={BOX.x * 100} y={BOX.y * 100} width={BOX.w * 100} height={BOX.h * 100}
                  fill="none" stroke="#C62828" strokeWidth="1.1" vectorEffect="non-scaling-stroke"
                  style={{
                    transformOrigin: `${(BOX.x + BOX.w / 2) * 100}% ${(BOX.y + BOX.h / 2) * 100}%`,
                    transform: atOrAfter(phase, 'box') ? 'scale(1)' : 'scale(0.6)',
                    opacity: atOrAfter(phase, 'box') ? 1 : 0,
                    transition: 'transform 340ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 220ms ease',
                  }}
                />
                <line
                  x1={ARROW.x1 * 100} y1={ARROW.y1 * 100} x2={ARROW.x2 * 100} y2={ARROW.y2 * 100}
                  stroke="#C62828" strokeWidth="1.6" strokeLinecap="round" vectorEffect="non-scaling-stroke"
                  markerEnd="url(#capAnimArrowhead)"
                  pathLength="1"
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset: atOrAfter(phase, 'arrow') ? 0 : 1,
                    opacity: atOrAfter(phase, 'arrow') ? 1 : 0,
                    transition: 'stroke-dashoffset 750ms ease-out, opacity 60ms ease',
                  }}
                />
              </svg>
              <div
                style={{
                  position: 'absolute',
                  left: `${LABEL.x * 100}%`, top: `${LABEL.y * 100}%`,
                  transform: `translate(-50%, -50%) scale(${atOrAfter(phase, 'text') ? 1 : 0.7})`,
                  opacity: atOrAfter(phase, 'text') ? 1 : 0,
                  transition: 'transform 280ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 230ms ease',
                  background: '#C62828', color: '#fff', fontSize: 12, fontWeight: 800,
                  padding: '5px 10px', borderRadius: 5, whiteSpace: 'nowrap',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.35)',
                }}
              >
                Door left open
              </div>
            </div>

            {/* Shutter flash */}
            <div style={{
              position: 'absolute', inset: 0, background: '#fff',
              opacity: phase === 'flash' ? 0.92 : 0,
              transition: phase === 'flash' ? 'opacity 55ms ease-out' : 'opacity 300ms ease-in',
              pointerEvents: 'none',
            }} />

            {/* Markup Studio header, once we're in the markup phases */}
            <div style={{
              position: 'absolute', top: '5%', left: 0, right: 0, textAlign: 'center',
              color: '#fff', fontSize: 12, fontWeight: 700, textShadow: '0 1px 4px rgba(0,0,0,0.6)',
              opacity: atOrAfter(phase, 'arrow') ? 1 : 0,
              transition: 'opacity 300ms ease 100ms',
            }}>
              Markup Studio
            </div>

            {/* Camera button, tap feedback */}
            <div style={{
              position: 'absolute', left: '50%', bottom: '9%', transform: 'translateX(-50%)',
              opacity: showShutterBtn ? 1 : 0,
              transition: 'opacity 200ms ease',
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

            {/* Saved pulse */}
            <div style={{
              position: 'absolute', left: '50%', top: '38%', transform: 'translate(-50%, -50%)',
              width: 44, height: 44, borderRadius: '50%', background: 'rgba(30,158,90,0.95)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: phase === 'saved' ? 1 : 0,
              scale: phase === 'saved' ? 1 : 0.5,
              transition: 'opacity 190ms ease, scale 230ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}>
              <Check size={22} color="#fff" strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
