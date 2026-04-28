'use client'

import { useTranslation } from '@/lib/i18n/config'
import { motion, useReducedMotion } from 'framer-motion'

const FEATURE_ICONS = [
  // Arrow pointing up-right (signal/direction)
  <svg key="f0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>,
  // Filter / funnel
  <svg key="f1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
  </svg>,
  // Chat bubble (language)
  <svg key="f2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
  </svg>,
  // Bell (alert/detect)
  <svg key="f3" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>,
]

export default function FinancialIntelligenceSection() {
  const { t } = useTranslation()
  const fi = t.financialIntelligence
  const reduceMotion = useReducedMotion()
  const words = fi.title.trim().split(' ')
  const titlePrefix = words.slice(0, -1).join(' ')
  const titleHighlight = words.at(-1) ?? ''

  return (
    <section id="producto" className="scroll-mt-24 py-20 bg-[#0A0E14] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 30% 50%, rgba(47,129,247,0.04) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 80% 40%, rgba(124,58,237,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : 0.45, delay: 0.02 }}
            className="text-[#2F81F7] text-xs font-bold uppercase tracking-[0.2em] mb-4"
          >
            {fi.eyebrow}
          </motion.p>
          <motion.h2
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : 0.48, delay: reduceMotion ? 0 : 0.08 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F0F6FC] leading-tight tracking-tight mb-4 text-balance max-w-3xl mx-auto"
          >
            {titlePrefix}{' '}
            <motion.span
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.18 }}
              className="text-[#2F81F7]"
            >
              {titleHighlight}
            </motion.span>
          </motion.h2>
          <motion.p
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 0.12 }}
            className="text-base sm:text-lg text-[#8B949E] leading-relaxed max-w-2xl mx-auto"
          >
            {fi.subtitle}
          </motion.p>
        </div>

        {/* Two-column body */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* Left — feature cards */}
          <div className="space-y-3">
            {fi.features.map((feat, i) => (
              <motion.div
                key={i}
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: reduceMotion ? 0 : 0.48,
                  delay: reduceMotion ? 0 : i * 0.07,
                  ease: 'easeOut',
                }}
                className="flex items-start gap-4 p-4 rounded-xl border border-[#30363D] bg-[#161B22] hover:-translate-y-1 hover:border-[#2F81F7]/35 hover:shadow-[0_20px_60px_rgba(47,129,247,0.10)] transition-all duration-300 ease-out group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#2F81F7]/10 border border-[#2F81F7]/20 flex items-center justify-center text-[#2F81F7] flex-shrink-0 group-hover:bg-[#2F81F7]/15 group-hover:text-[#58A6FF] group-hover:shadow-[0_0_18px_rgba(47,129,247,0.25)] group-hover:scale-[1.08] transition-all duration-300 ease-out">
                  {FEATURE_ICONS[i]}
                </div>
                <div>
                  <h3 className="text-[#F0F6FC] font-semibold text-sm mb-1 leading-snug">{feat.title}</h3>
                  <p className="text-[#8B949E] text-sm leading-relaxed">{feat.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right — is-not / is comparison */}
          <motion.div
            initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: reduceMotion ? 0 : 0.55,
              delay: reduceMotion ? 0 : 0.34,
              ease: 'easeOut',
            }}
            className="rounded-2xl border border-[#30363D] bg-[#161B22] p-7"
          >
            {/* Is NOT */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[#F85149]/10 border border-[#F85149]/20 flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F85149" strokeWidth="2.5" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-[#F0F6FC] font-bold text-base">{fi.isNotTitle}</h3>
            </div>

            <ul className="space-y-2.5 mb-7">
              {fi.isNotItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.34,
                    delay: reduceMotion ? 0 : 0.4 + i * 0.05,
                    ease: 'easeOut',
                  }}
                  className="flex items-center gap-3"
                >
                  <div className="w-4 h-4 rounded-full border border-[#F85149]/30 bg-[#F85149]/8 flex items-center justify-center flex-shrink-0">
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="#F85149" strokeWidth="2" aria-hidden>
                      <path d="M2 2l6 6M8 2L2 8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="text-[#8B949E] text-sm line-through decoration-[#484F58]">{item}</span>
                </motion.li>
              ))}
            </ul>

            {/* Divider */}
            <div className="border-t border-[#30363D] my-6" />

            {/* Is */}
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
              whileInView={
                reduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, boxShadow: '0 14px 36px rgba(63,185,80,0.08)' }
              }
              viewport={{ once: true }}
              transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 0.72, ease: 'easeOut' }}
              className="flex items-start gap-3 rounded-xl"
            >
              <div className="w-8 h-8 rounded-lg bg-[#3FB950]/10 border border-[#3FB950]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3FB950" strokeWidth="2.5" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <p className="text-[#3FB950] font-bold text-sm mb-1.5">{fi.isTitle}</p>
                <p className="text-[#8B949E] text-sm leading-relaxed">{fi.isDescription}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
