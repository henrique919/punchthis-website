import { useEffect, useRef } from 'react'

// Hard ceiling on how long a section can stay hidden waiting for its
// IntersectionObserver to fire. Covers paused/throttled observers
// (backgrounded tabs), elements the observer never catches, and any other
// way "wait for JS to reveal this" can silently fail — nothing above this
// ever stays invisible forever.
const FAILSAFE_MS = 2500

/**
 * Attaches an IntersectionObserver to a container ref and adds
 * the 'visible' class to all .reveal / .reveal-fade children when they enter view.
 *
 * Content renders visible by default (see global.css) — the hidden
 * starting state only applies once 'js-reveal-ready' is present on <html>,
 * which this hook sets right before it starts observing.
 */
export function useReveal(threshold = 0.12) {
  const ref = useRef(null)

  useEffect(() => {
    document.documentElement.classList.add('js-reveal-ready')

    const el = ref.current
    if (!el) return

    const targets = el.querySelectorAll('.reveal, .reveal-fade')
    if (!targets.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    targets.forEach((t) => obs.observe(t))

    const failsafe = setTimeout(() => {
      targets.forEach((t) => t.classList.add('visible'))
    }, FAILSAFE_MS)

    return () => {
      obs.disconnect()
      clearTimeout(failsafe)
    }
  }, [threshold])

  return ref
}
