'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/config'

function StatCounter({ value, color }: { value: string; color: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [displayed, setDisplayed] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    // Parse: optional prefix (+, $, €), number, optional suffix (%, h, M, K, x…)
    const match = value.match(/^([+\-$€]*)(\d+(?:\.\d+)?)(.*)$/)
    if (!match) return

    const prefix = match[1]
    const num = parseFloat(match[2])
    const suffix = match[3]
    const isFloat = !Number.isInteger(num)

    let rafId: number

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        observer.disconnect()

        const duration = 1200
        const start = performance.now()

        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          const current = num * eased
          const formatted = isFloat ? current.toFixed(1) : String(Math.round(current))
          setDisplayed(`${prefix}${formatted}${suffix}`)
          if (p < 1) {
            rafId = requestAnimationFrame(tick)
          } else {
            setDisplayed(value)
          }
        }

        rafId = requestAnimationFrame(tick)
      },
      { threshold: 0.2, rootMargin: '0px 0px -60px 0px' }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [value])

  return (
    <p ref={ref} className="font-black text-3xl font-mono mb-1" style={{ color }}>
      {displayed}
    </p>
  )
}

export default function Testimonials() {
  const { t } = useTranslation()
  const testimonials = t.testimonials.items
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [instantJump, setInstantJump] = useState(false)
  const reduceMotion = useReducedMotion()

  const visibleCount = useMemo(() => {
    if (viewportWidth >= 1024) return 3
    if (viewportWidth >= 640) return 2
    return 1
  }, [viewportWidth])

  const displayItems = useMemo(
    () => [...testimonials, ...testimonials.slice(0, visibleCount)],
    [testimonials, visibleCount]
  )

  useEffect(() => {
    const updateViewport = () => setViewportWidth(window.innerWidth)
    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)
    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)
    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    if (testimonials.length === 0) {
      setActiveIndex(0)
      return
    }
    setActiveIndex((prev) => prev % testimonials.length)
  }, [testimonials.length])

  useEffect(() => {
    if (prefersReducedMotion || isPaused || testimonials.length <= 1) return
    const interval = window.setInterval(() => {
      setActiveIndex((current) => current + 1)
    }, 6000)
    return () => window.clearInterval(interval)
  }, [prefersReducedMotion, isPaused, testimonials.length])

  const goPrev = () => {
    if (testimonials.length === 0) return
    setInstantJump(false)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goNext = () => {
    if (testimonials.length === 0) return
    setInstantJump(false)
    setActiveIndex((prev) => prev + 1)
  }

  const handleTransitionEnd = () => {
    if (testimonials.length === 0) return
    if (activeIndex < testimonials.length) return
    setInstantJump(true)
    setActiveIndex(0)
  }

  useEffect(() => {
    if (!instantJump) return
    const timeout = window.setTimeout(() => setInstantJump(false), 20)
    return () => window.clearTimeout(timeout)
  }, [instantJump])

  return (
    <section className="py-16 bg-[#0D1117] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(47,129,247,0.04),transparent_60%)] pointer-events-none" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.11 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2F81F7]/25 bg-[#2F81F7]/8 mb-6">
            <div className="w-1 h-1 rounded-full bg-[#2F81F7]" />
            <span className="text-[#2F81F7] text-xs font-semibold uppercase tracking-widest">
              {t.testimonials.badge}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F0F6FC] leading-tight tracking-tight mb-4 text-balance">
            {t.testimonials.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F81F7] to-[#60A5FA]">
              {t.testimonials.titleHighlight}
            </span>
          </h2>
          <p className="text-base text-[#8B949E] max-w-xl mx-auto leading-relaxed line-clamp-2">
            {t.testimonials.description}
          </p>
        </motion.div>

        <motion.div
          className="relative"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: reduceMotion ? 0 : 0.52, delay: reduceMotion ? 0 : 0.18 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <div
              className={`flex -mx-3 ${(prefersReducedMotion || instantJump) ? 'transition-none' : 'transition-[transform] duration-[600ms] ease-out'}`}
              style={{ transform: `translate3d(-${(activeIndex * 100) / visibleCount}%,0,0)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {displayItems.map((item, i) => (
                <article
                  key={`${item.author}-${i}`}
                  className="px-3 flex-shrink-0"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <div className="p-5 rounded-2xl border border-[#30363D] bg-[#161B22] h-full shadow-[0_8px_28px_rgba(0,0,0,0.22)] transition-all duration-[280ms] ease-out hover:-translate-y-1 hover:border-[#2F81F7]/40 hover:shadow-[0_20px_50px_rgba(47,129,247,0.12)]">
                    <div className="flex gap-1 mb-4" aria-label={t.testimonials.starsAria}>
                      {Array.from({ length: 5 }).map((_, j) => (
                        <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill="#D29922" aria-hidden>
                          <path d="M7 1l1.545 3.13 3.455.502-2.5 2.436.59 3.44L7 8.875l-3.09 1.633.59-3.44L2 4.632l3.455-.502L7 1z" />
                        </svg>
                      ))}
                    </div>

                    <blockquote className="text-[#8B949E] text-sm leading-relaxed mb-4 line-clamp-3">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>

                    <div
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold mb-4"
                      style={{ color: item.metricColor, backgroundColor: `${item.metricColor}12`, border: `1px solid ${item.metricColor}25` }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill={item.metricColor} aria-hidden>
                        <path d="M5 1l1.236 2.505L9 3.91l-2 1.948.472 2.752L5 7.5 2.528 8.61 3 5.858 1 3.91l2.764-.405L5 1z" />
                      </svg>
                      {item.metric}
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-[#30363D]">
                      <div
                        className={`w-9 h-9 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}
                      >
                        {item.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[#F0F6FC] text-sm font-semibold truncate">{item.author}</p>
                        <p className="text-[#484F58] text-xs truncate">
                          {item.role} · {item.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-[#30363D] bg-[#161B22]/90 text-[#8B949E] hover:text-[#F0F6FC] hover:border-[#484F58] transition-colors"
            aria-label="Previous testimonial"
          >
            <span aria-hidden>‹</span>
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-[#30363D] bg-[#161B22]/90 text-[#8B949E] hover:text-[#F0F6FC] hover:border-[#484F58] transition-colors"
            aria-label="Next testimonial"
          >
            <span aria-hidden>›</span>
          </button>

          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: Math.max(testimonials.length, 1) }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setInstantJump(false)
                  setActiveIndex(i)
                }}
                className={`h-1.5 rounded-full transition-all ${
                  (activeIndex % Math.max(testimonials.length, 1)) === i ? 'w-6 bg-[#2F81F7]' : 'w-1.5 bg-[#484F58] hover:bg-[#8B949E]'
                }`}
                aria-label={`Go to testimonial slide ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduceMotion ? 0 : 0.48, delay: reduceMotion ? 0 : 0.24 }}
        >
          {t.testimonials.stats.map((stat, i) => (
            <div key={i} className="text-center p-5 rounded-2xl border border-[#30363D] bg-[#161B22]">
              <StatCounter value={stat.value} color={stat.color} />
              <p className="text-[#484F58] text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
