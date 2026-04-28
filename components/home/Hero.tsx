'use client'

import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { formatUSD, formatCompactUSD } from '@/lib/currency'
import { useTranslation } from '@/lib/i18n/config'
import { trackEvent } from '@/lib/analytics'

// ─── hooks ────────────────────────────────────────────────────────────────────

function useCountUp(target: number | undefined, duration = 1200, delay = 700) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (target === undefined || target === 0) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setValue(target)
      return
    }
    let rafId: number
    const timerId = setTimeout(() => {
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setValue(Math.round(target * eased))
        if (p < 1) {
          rafId = requestAnimationFrame(tick)
        } else {
          setValue(target)
        }
      }
      rafId = requestAnimationFrame(tick)
    }, delay)
    return () => {
      clearTimeout(timerId)
      cancelAnimationFrame(rafId)
    }
  }, [target, duration, delay])

  return value
}

function useTypewriter(text: string, speed = 30, startDelay = 1200) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setDisplayed(text)
      setDone(true)
      return
    }
    let intervalId: ReturnType<typeof setInterval> | undefined
    let i = 0
    const timerId = setTimeout(() => {
      intervalId = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(intervalId)
          setDone(true)
        }
      }, speed)
    }, startDelay)
    return () => {
      clearTimeout(timerId)
      clearInterval(intervalId)
    }
  }, [text, speed, startDelay])

  return { displayed, done }
}

// ─── MiniMetric ───────────────────────────────────────────────────────────────

function MiniMetric({
  label,
  value,
  change,
  positive,
  countTo,
  format,
}: {
  label: string
  value: string
  change: string
  positive: boolean
  countTo?: number
  format?: (n: number) => string
}) {
  const counted = useCountUp(countTo, 1200, 700)
  const displayValue =
    countTo !== undefined
      ? format
        ? format(counted)
        : String(counted)
      : value

  return (
    <div className="bg-[#21262D] rounded-xl p-3 border border-[#30363D]/60">
      <p className="text-[#484F58] text-[10px] uppercase tracking-widest font-medium mb-1.5">
        {label}
      </p>
      <p className="text-[#F0F6FC] font-bold text-base font-mono">{displayValue}</p>
      <p className={`text-xs font-semibold mt-0.5 ${positive ? 'text-[#3FB950]' : 'text-[#F85149]'}`}>
        {change}
      </p>
    </div>
  )
}

// ─── DashboardMockup ──────────────────────────────────────────────────────────

function DashboardMockup({ t }: { t: ReturnType<typeof useTranslation>['t'] }) {
  const copilotText = t.heroMockup.copilotAnswer
  const { displayed, done } = useTypewriter(copilotText, copilotText.length > 120 ? 12 : 18)

  const insights = t.heroMockup.liveInsights
  const [insightIdx, setInsightIdx] = useState(0)
  const [insightVisible, setInsightVisible] = useState(true)
  const [isPulsing, setIsPulsing] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches || !insights || insights.length <= 1) return
    let fadeTimer: ReturnType<typeof setTimeout>
    let pulseTimer: ReturnType<typeof setTimeout>
    const intervalId = setInterval(() => {
      setInsightVisible(false)
      fadeTimer = setTimeout(() => {
        setInsightIdx(prev => (prev + 1) % insights.length)
        setInsightVisible(true)
        setIsPulsing(true)
        pulseTimer = setTimeout(() => setIsPulsing(false), 600)
      }, 320)
    }, 5200)
    return () => {
      clearInterval(intervalId)
      clearTimeout(fadeTimer)
      clearTimeout(pulseTimer)
    }
  }, [insights?.length])

  return (
    <div className="relative">
      <div className="absolute -inset-8 bg-[radial-gradient(ellipse,rgba(47,129,247,0.08),transparent_70%)] pointer-events-none" />

      <div className="relative rounded-2xl border border-[#30363D] bg-[#161B22] shadow-[0_32px_96px_rgba(0,0,0,0.7),0_0_0_1px_rgba(48,54,61,0.8)] overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#30363D] bg-[#0D1117]/60">
          <div className="flex gap-1.5" aria-hidden>
            <div className="w-3 h-3 rounded-full bg-[#F85149]/50" />
            <div className="w-3 h-3 rounded-full bg-[#D29922]/50" />
            <div className="w-3 h-3 rounded-full bg-[#3FB950]/50" />
          </div>
          <div className="flex-1 mx-2">
            <div className="max-w-[200px] h-5 bg-[#21262D] rounded-md flex items-center px-3">
              <span className="text-[#484F58] text-[11px]">{t.heroMockup.appUrl}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#3FB950] motion-safe:animate-pulse" />
            <span className="text-[#3FB950] text-[11px] font-medium">{t.heroMockup.live}</span>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[#484F58] text-xs uppercase tracking-widest font-medium">
                {t.heroMockup.summaryEyebrow}
              </p>
              <p className="text-[#F0F6FC] font-semibold mt-0.5">{t.heroMockup.summaryTitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <MiniMetric
              label={t.heroMockup.metrics[0].label}
              value={t.heroMockup.metrics[0].value ?? formatCompactUSD(48200)}
              change={t.heroMockup.metrics[0].change}
              positive={true}
              countTo={48200}
              format={formatCompactUSD}
            />
            <MiniMetric
              label={t.heroMockup.metrics[1].label}
              value={t.heroMockup.metrics[1].value}
              change={t.heroMockup.metrics[1].change}
              positive={false}
            />
            <MiniMetric
              label={t.heroMockup.metrics[2].label}
              value={t.heroMockup.metrics[2].value}
              change={t.heroMockup.metrics[2].change}
              positive={true}
            />
          </div>

          <div
            className="flex items-start gap-3 p-3 rounded-xl border-l-[3px] border-[#D29922] bg-[#D29922]/6"
            style={{
              boxShadow: isPulsing ? '0 0 0 1px rgba(210,153,34,0.32)' : 'none',
              transition: 'box-shadow 450ms ease-out',
            }}
          >
            <svg className="w-4 h-4 text-[#D29922] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
            </svg>
            <div>
              <p className="text-[#D29922] text-xs font-bold uppercase tracking-wide">{t.heroMockup.actionTitle}</p>
              <div className="relative" style={{ minHeight: '3rem' }}>
                <p
                  className="text-[#8B949E] text-xs mt-0.5 leading-relaxed transition-opacity duration-[320ms]"
                  style={{ opacity: insightVisible ? 1 : 0 }}
                >
                  {insights?.[insightIdx] ?? t.heroMockup.actionBody.replace('{{amount}}', formatUSD(4200))}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#30363D] bg-[#0D1117]/70 p-4 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-md bg-[#2F81F7]/15 border border-[#2F81F7]/30 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2F81F7" strokeWidth="2.5" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <span className="text-[#2F81F7] text-xs font-bold">{t.heroMockup.copilotTitle}</span>
            </div>
            <div className="ml-7 bg-[#21262D] rounded-lg px-3 py-2">
              <p className="text-[#8B949E] text-xs italic">"{t.heroMockup.copilotQuestion}"</p>
            </div>
            {/* Container with invisible full text to reserve space — prevents CLS */}
            <div className="ml-2 rounded-lg px-3 py-2.5 bg-[#2F81F7]/5 border border-[#2F81F7]/10 relative">
              <p className="text-[#F0F6FC] text-xs leading-relaxed opacity-0 select-none pointer-events-none" aria-hidden>
                {t.heroMockup.copilotAnswer}
              </p>
              <p className="text-[#F0F6FC] text-xs leading-relaxed absolute inset-0 px-3 py-2.5">
                {displayed}
                {!done && (
                  <span
                    className="inline-block w-[2px] h-3 bg-[#2F81F7] ml-0.5 align-middle animate-pulse"
                    aria-hidden
                  />
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge — spring entrance after dashboard */}
      <motion.div
        className="absolute -bottom-5 -right-5 hidden lg:flex items-center gap-2.5 px-3.5 py-2.5 bg-[#161B22] border border-[#30363D] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        initial={{ opacity: 0, scale: 0.85, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.9 }}
      >
        <div className="w-8 h-8 rounded-lg bg-[#3FB950]/10 border border-[#3FB950]/20 flex items-center justify-center flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3FB950" strokeWidth="2" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
          </svg>
        </div>
        <div>
          <p className="text-[#3FB950] text-sm font-bold font-mono">{t.heroMockup.floatingValue.replace('{{amount}}', formatUSD(12400))}</p>
          <p className="text-[#484F58] text-xs">{t.heroMockup.floatingLabel}</p>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const { t, locale } = useTranslation()
  const bullets = t.hero.bullets
  const reduceMotion = useReducedMotion()
  return (
    <section
      id="inicio"
      className="relative flex items-center overflow-hidden bg-[#0D1117] scroll-mt-24 pt-28 pb-20 min-h-0"
    >
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(47,129,247,0.09) 0%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0 -z-10 pointer-events-none blur-3xl animate-slow-pulse"
        aria-hidden
        style={{
          background:
            'radial-gradient(circle at center, rgba(47,129,247,0.13) 0%, rgba(124,58,237,0.08) 28%, rgba(34,211,238,0.07) 45%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 w-full">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left column — CSS animations already handle badge, h1, bullets */}
          <div className="text-center lg:text-left min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2F81F7]/30 bg-[#2F81F7]/8 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2F81F7] motion-safe:animate-pulse" />
              <span className="text-[#2F81F7] text-xs font-semibold uppercase tracking-widest">
                {t.hero.badge}
              </span>
            </div>

            <motion.h1
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: reduceMotion ? 0 : 0.5 }}
              className="text-5xl sm:text-6xl lg:text-[68px] xl:text-7xl font-black text-[#F0F6FC] leading-[1.04] tracking-tight mb-6 text-balance"
            >
              {t.hero.title}
              <br />
              <motion.span
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.1 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F81F7] to-[#7C3AED]"
              >
                {t.hero.titleHighlight}
              </motion.span>
            </motion.h1>

            <div className="mb-3 max-w-xl mx-auto lg:mx-0 space-y-2 text-left">
              <p className="text-lg sm:text-xl text-[#8B949E] leading-relaxed">{t.hero.description}</p>
              <p className="text-lg sm:text-xl text-[#8B949E] leading-relaxed">
                <strong className="font-semibold text-[#F0F6FC]">{t.hero.descriptionStrong}</strong>
              </p>
            </div>
            {bullets && bullets.length > 0 && (
              <ul className="mb-6 max-w-xl mx-auto lg:mx-0 space-y-2.5 text-left">
                {bullets.map((line, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 text-sm text-[#8B949E] leading-relaxed"
                  >
                    <span
                      className="hero-chip-entrance mt-0.5 w-1.5 h-1.5 rounded-full bg-[#2F81F7] flex-shrink-0"
                      style={{ '--chip-delay': `${0.1 + i * 0.05}s` } as CSSProperties}
                      aria-hidden
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href={`/${locale}/demo`}
                onClick={() => trackEvent('click_agendar_reunion', { source: 'hero' })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-[#2F81F7] hover:bg-[#388BFD] rounded-xl transition-[background-color,box-shadow,transform] duration-200 ease-out motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98] shadow-[0_0_24px_rgba(47,129,247,0.35)] hover:shadow-[0_0_40px_rgba(47,129,247,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F81F7]"
              >
                {t.hero.ctaPrimary}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="https://wa.me/59898260258"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('click_whatsapp', { source: 'hero' })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-[#8B949E] hover:text-[#F0F6FC] border border-[#30363D] hover:border-[#484F58] bg-[#161B22] hover:bg-[#21262D] rounded-xl transition-all duration-150"
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>

            <div className="mt-7 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5" aria-hidden>
                  {[
                    ['M', 'from-[#2F81F7] to-[#1D4ED8]'],
                    ['C', 'from-[#7C3AED] to-[#5B21B6]'],
                    ['D', 'from-[#059669] to-[#047857]'],
                    ['A', 'from-[#D97706] to-[#B45309]'],
                  ].map(([letter, gradient], i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full border-2 border-[#0D1117] bg-gradient-to-br ${gradient} flex items-center justify-center text-xs font-bold text-white`}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#8B949E]">{t.hero.social}</p>
              </div>
              <div className="hidden sm:block w-px h-5 bg-[#30363D]" aria-hidden />
              <p className="text-sm text-[#484F58]">
                {t.hero.statusNote}
              </p>
            </div>
          </div>

          {/* Right column — dashboard slides in from right */}
          <motion.div
            className="relative min-w-0"
            initial={{ opacity: 0, x: 64 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <DashboardMockup t={t} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
