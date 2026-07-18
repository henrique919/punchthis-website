import { useEffect, useRef } from 'react'

/**
 * Attaches an IntersectionObserver to a container ref and adds
 * the 'visible' class to all .reveal / .reveal-fade children when they enter view.
 */
export function useReveal(threshold = 0.12) {
  const ref = useRef(null)

  useEffect(() => {
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
    return () => obs.disconnect()
  }, [threshold])

  return ref
}
