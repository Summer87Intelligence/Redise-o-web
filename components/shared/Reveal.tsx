'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Delay in seconds (e.g. 0.05 = 50ms), applied when the reveal starts */
  delay?: number
  /** Duration in seconds */
  duration?: number
  /** Initial vertical offset in pixels */
  y?: number
  /** If true, animate only the first time the element enters the viewport (default) */
  once?: boolean
}

function isElementInViewport(el: HTMLElement, rootMarginPx = 80) {
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight || document.documentElement.clientHeight
  const vw = window.innerWidth || document.documentElement.clientWidth
  const expandedTop = -rootMarginPx
  const expandedBottom = vh + rootMarginPx
  return rect.bottom > expandedTop && rect.top < expandedBottom && rect.right > 0 && rect.left < vw
}

export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.52,
  y = 16,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  const durationMs = Math.max(0, duration) * 1000
  const delayMs = Math.max(0, delay) * 1000
  const translateY = y

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReduceMotion(mediaQuery.matches)
    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)
    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  /** Immediate visibility check (IO can miss first paint / strict thresholds). */
  useLayoutEffect(() => {
    if (reduceMotion) return
    const node = ref.current
    if (!node) return
    if (isElementInViewport(node)) {
      setIsVisible(true)
    }
  }, [reduceMotion])

  useEffect(() => {
    if (reduceMotion) {
      setIsVisible(true)
      return
    }

    const node = ref.current
    if (!node) return

    let done = false
    /** Browser timers are numeric ids (Node typings use Timeout — avoid mismatch). */
    let failsafeId: number | undefined
    let observer: IntersectionObserver

    const onScroll = () => {
      if (!ref.current || !once) return
      if (isElementInViewport(ref.current)) {
        finishReveal()
      }
    }

    const finishReveal = () => {
      if (done) return
      done = true
      setIsVisible(true)
      observer.disconnect()
      window.removeEventListener('scroll', onScroll, true)
      if (failsafeId !== undefined) window.clearTimeout(failsafeId)
    }

    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return

        if (once) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            finishReveal()
          }
        } else {
          setIsVisible(entry.isIntersecting)
        }
      },
      {
        threshold: [0, 0.01, 0.08],
        /** Positive bottom margin triggers slightly before section enters view (fixes “stuck invisible”). */
        rootMargin: '0px 0px 15% 0px',
      }
    )

    observer.observe(node)

    /** Scroll fallback for browsers / edge cases where IO is flaky */
    window.addEventListener('scroll', onScroll, { passive: true, capture: true })
    onScroll()

    /** Last resort if IntersectionObserver never fires (once-only sections). */
    if (once) {
      failsafeId = window.setTimeout(() => finishReveal(), 4500)
    }

    return () => {
      done = true
      observer.disconnect()
      window.removeEventListener('scroll', onScroll, true)
      if (failsafeId !== undefined) window.clearTimeout(failsafeId)
    }
  }, [reduceMotion, once])

  const transition =
    reduceMotion
      ? 'none'
      : `opacity ${durationMs}ms ease-out ${delayMs}ms, transform ${durationMs}ms ease-out ${delayMs}ms`

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : `translateY(${translateY}px)`,
        transition,
        willChange: reduceMotion ? 'auto' : isVisible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
