'use client'

import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/config'
import { motion, useReducedMotion } from 'framer-motion'

// Per-service visual identity — index matches servicesPillars.items order (0=Intelligence, 1=Copilot, 2=Automation)
const SERVICE_STYLES = [
  {
    accent: '#2F81F7',
    topGlow: 'rgba(47,129,247,0.09)',
    iconBg: 'bg-[#2F81F7]/10 border-[#2F81F7]/20',
    cardHover:
      'hover:-translate-y-[6px] hover:border-[#2F81F7]/45 hover:shadow-[0_20px_60px_rgba(47,129,247,0.16),0_0_0_1px_rgba(47,129,247,0.20)]',
    ctaBase: 'border-[#2F81F7]/35 text-[#2F81F7]',
    ctaHover: 'group-hover:bg-[#2F81F7] group-hover:border-[#2F81F7] group-hover:text-white',
  },
  {
    accent: '#7C3AED',
    topGlow: 'rgba(124,58,237,0.10)',
    iconBg: 'bg-[#7C3AED]/10 border-[#7C3AED]/20',
    cardHover:
      'hover:-translate-y-[6px] hover:border-[#7C3AED]/50 hover:shadow-[0_20px_60px_rgba(124,58,237,0.20),0_0_0_1px_rgba(124,58,237,0.24)]',
    ctaBase: 'border-[#7C3AED]/35 text-[#7C3AED]',
    ctaHover: 'group-hover:bg-[#7C3AED] group-hover:border-[#7C3AED] group-hover:text-white',
  },
  {
    accent: '#3FB950',
    topGlow: 'rgba(63,185,80,0.08)',
    iconBg: 'bg-[#3FB950]/10 border-[#3FB950]/20',
    cardHover:
      'hover:-translate-y-[6px] hover:border-[#3FB950]/40 hover:shadow-[0_20px_60px_rgba(63,185,80,0.13),0_0_0_1px_rgba(63,185,80,0.18)]',
    ctaBase: 'border-[#3FB950]/35 text-[#3FB950]',
    ctaHover: 'group-hover:bg-[#3FB950] group-hover:border-[#3FB950] group-hover:text-white',
  },
] as const

function IntelligenceIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  )
}

function CopilotIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>
  )
}

function AutomationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
    </svg>
  )
}

const ICONS = [<IntelligenceIcon key="int" />, <CopilotIcon key="cop" />, <AutomationIcon key="aut" />]

export default function ServicesPillars() {
  const { t, locale } = useTranslation()
  const pillars = t.servicesPillars.items
  const reduceMotion = useReducedMotion()
  const words = t.servicesPillars.title.trim().split(' ')
  const titlePrefix = words.slice(0, -1).join(' ')
  const titleHighlight = words.at(-1) ?? ''

  return (
    <section id="servicios" className="scroll-mt-24 py-20 bg-[#0D1117] relative overflow-hidden">
      {/* Section background glow — very low opacity, must not compete with Hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 65%, rgba(47,129,247,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.05 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2F81F7]/25 bg-[#2F81F7]/8 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2F81F7]" aria-hidden />
            <span className="text-[#2F81F7] text-xs font-semibold uppercase tracking-widest">
              {t.servicesPillars.badge}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F0F6FC] leading-tight tracking-tight mb-4">
            {titlePrefix}{' '}
            <motion.span
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.15 }}
              className="text-[#2F81F7]"
            >
              {titleHighlight}
            </motion.span>
          </h2>
          <p className="text-base text-[#8B949E] max-w-2xl mx-auto leading-relaxed">
            {t.servicesPillars.description}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.08 } } }}
        >
          {pillars.map((item, i) => {
            const svc = SERVICE_STYLES[i] ?? SERVICE_STYLES[0]

            return (
              <motion.article
                key={i}
                variants={{
                  hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.5, ease: 'easeOut' } },
                }}
                className={`group relative flex flex-col rounded-2xl border border-[#30363D] overflow-hidden bg-gradient-to-br from-[#161B22] to-[#0D1117] shadow-[0_1px_3px_rgba(0,0,0,0.5),0_0_0_1px_rgba(48,54,61,0.6)] transition-all duration-300 ease-out ${svc.cardHover}`}
              >
                {/* Left accent stripe */}
                <div
                  className="absolute inset-y-0 left-0 w-[2px]"
                  aria-hidden
                  style={{
                    background: `linear-gradient(to bottom, ${svc.accent}, ${svc.accent}55)`,
                  }}
                />

                {/* Top glow — reinforces card identity, fades naturally */}
                <div
                  className="absolute inset-x-0 top-0 h-28 pointer-events-none"
                  aria-hidden
                  style={{
                    background: `radial-gradient(ellipse 90% 100% at 50% 0%, ${svc.topGlow}, transparent)`,
                  }}
                />

                {/* Card content */}
                <div className="relative z-10 flex flex-col h-full p-6">

                  {/* Icon badge + title */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 ${svc.iconBg}`}
                      style={{ color: svc.accent }}
                    >
                      {ICONS[i]}
                    </div>
                    <h3 className="text-[#F0F6FC] font-bold text-lg leading-snug">{item.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-[#8B949E] text-sm leading-relaxed mb-5">
                    {item.description}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-3 mb-6">
                    {item.benefits.slice(0, 3).map((benefit, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-[#8B949E]">
                        <span
                          className="mt-[5px] w-[5px] h-[5px] rounded-full flex-shrink-0"
                          aria-hidden
                          style={{ background: svc.accent }}
                        />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA — separated, responds to card hover */}
                  <div className="mt-auto pt-4 border-t border-[#30363D]/50">
                    <Link
                      href={`/${locale}${item.ctaHref}`}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border bg-transparent transition-all duration-200 motion-safe:group-hover:scale-[1.02] ${svc.ctaBase} ${svc.ctaHover}`}
                    >
                      {item.ctaLabel}
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden
                      >
                        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
