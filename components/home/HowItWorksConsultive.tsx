'use client'

import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/config'

const STEP_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

const ARROW_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

function ArrowRight() {
  return (
    <svg className="w-5 h-5 text-[#484F58]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  )
}

export default function HowItWorksConsultive() {
  const { t } = useTranslation()
  const h = t.howItWorksConsultive
  const reduceMotion = useReducedMotion()
  const words = h.title.trim().split(' ')
  const titlePrefix = words.slice(0, -1).join(' ')
  const titleHighlight = words.at(-1) ?? ''

  return (
    <section id="como-funciona" className="scroll-mt-24 relative py-14 sm:py-16 bg-[#0A0D12] border-b border-[#30363D]/30">
      <div
        className="absolute inset-0 pointer-events-none opacity-90"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% -20%, rgba(47,129,247,0.08) 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 100% 50%, rgba(124,58,237,0.05) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.08 }}
        >
          <p className="text-[#2F81F7] text-xs font-bold uppercase tracking-[0.2em] mb-4">{h.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F0F6FC] leading-tight tracking-tight text-balance mb-4">
            {titlePrefix}{' '}
            <motion.span
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.18 }}
              className="text-[#2F81F7]"
            >
              {titleHighlight}
            </motion.span>
          </h2>
          <p className="text-base sm:text-lg text-[#8B949E] leading-relaxed">{h.subtitle}</p>
        </motion.div>

        {/* Steps — staggered with arrows fading in between */}
        <motion.div
          className="flex flex-col xl:flex-row xl:items-stretch gap-4 xl:gap-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.08 } } }}
        >
          {h.steps.map((step, i) => (
            <Fragment key={step.number}>
              <motion.div className="flex-1 min-w-0" variants={STEP_VARIANTS}>
                <div
                  className="h-full flex flex-col rounded-2xl border border-[#30363D] bg-[#161B22] p-5 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                  style={{ boxShadow: `inset 0 0 0 1px ${step.color}12` }}
                >
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className="text-3xl sm:text-4xl font-black tabular-nums leading-none"
                      style={{ color: step.color, opacity: 0.9 }}
                    >
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#F0F6FC] leading-snug mb-2 text-left">{step.title}</h3>
                  <p className="text-sm text-[#8B949E] leading-relaxed text-left mb-4">{step.body}</p>
                  <span
                    className="inline-flex self-start px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-semibold border mb-4"
                    style={{
                      color: step.color,
                      borderColor: `${step.color}40`,
                      backgroundColor: `${step.color}10`,
                    }}
                  >
                    {step.badge}
                  </span>
                  <ul className="mt-auto space-y-2 text-left">
                    {step.bullets.map((line) => (
                      <li key={line} className="flex gap-2.5 text-sm text-[#C9D1D9]">
                        <span
                          className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: step.color }}
                          aria-hidden
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
              {i < h.steps.length - 1 && (
                <motion.div
                  className="hidden xl:flex flex-shrink-0 w-8 items-center justify-center self-center"
                  variants={ARROW_VARIANTS}
                  aria-hidden
                >
                  <ArrowRight />
                </motion.div>
              )}
            </Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
