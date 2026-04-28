'use client'

import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/config'
import { trackEvent } from '@/lib/analytics'
import { motion, useReducedMotion } from 'framer-motion'

export default function FinalCTA() {
  const { t, locale } = useTranslation()
  const w = t.whatYouGet
  const reduceMotion = useReducedMotion()

  return (
    <section id="contacto" className="py-16 sm:py-24 bg-[#0A0E14] relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(47,129,247,0.13) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.015] pointer-events-none"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(#F0F6FC 1px, transparent 1px), linear-gradient(90deg, #F0F6FC 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.12 }}
          className="text-4xl sm:text-5xl font-black text-[#F0F6FC] leading-tight tracking-tight mb-4 text-balance"
        >
          {t.finalCta.title}
          <motion.span
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.22 }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F81F7] to-[#7C3AED] ml-2"
          >
            {t.finalCta.titleHighlight}
          </motion.span>
        </motion.h2>

        <motion.p
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduceMotion ? 0 : 0.48, delay: reduceMotion ? 0 : 0.16 }}
          className="text-base sm:text-lg text-[#8B949E] leading-relaxed mb-6 max-w-2xl mx-auto"
        >
          {t.finalCta.description}
        </motion.p>

        <motion.h3
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduceMotion ? 0 : 0.46, delay: reduceMotion ? 0 : 0.2 }}
          className="text-xs font-semibold uppercase tracking-widest text-[#484F58] mb-3"
        >
          {w.title}
        </motion.h3>

        <div className="relative mt-6 text-left">
          <div
            className="hidden lg:block absolute left-0 right-0 top-[26px] h-px bg-[#2F81F7]/20 pointer-events-none"
            aria-hidden
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {w.items.map((item, i) => (
            <motion.div
              key={i}
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: reduceMotion ? 0 : 0.42,
                delay: reduceMotion ? 0 : i * 0.08,
                ease: 'easeOut',
              }}
              className="relative rounded-xl border border-[#30363D]/70 bg-[#161B22]/90 px-3 py-2.5 sm:py-3 shadow-[inset_0_1px_0_rgba(240,246,252,0.04)] transition-all duration-300 ease-out hover:border-[#2F81F7]/40 hover:shadow-[0_16px_45px_rgba(47,129,247,0.10)] hover:-translate-y-[3px] group"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="text-[11px] tracking-[0.16em] font-semibold text-[#8B949E] group-hover:text-[#C9D1D9] transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#2F81F7]/60 group-hover:bg-[#58A6FF] group-hover:shadow-[0_0_10px_rgba(47,129,247,0.5)] transition-all" />
              </div>
              <p className="text-[13px] sm:text-sm text-[#C9D1D9] leading-snug">{item}</p>
            </motion.div>
          ))}
          </div>
        </div>

        <motion.div
          className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.28 }}
        >
          <Link
            href={`/${locale}/demo`}
            onClick={() => trackEvent('click_agendar_reunion', { source: 'final_cta' })}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-[#2F81F7] hover:bg-[#388BFD] rounded-xl transition-[background-color,box-shadow,transform] duration-200 ease-out motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98] cta-glow-pulse hover:shadow-[0_0_40px_rgba(47,129,247,0.52)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F81F7]"
          >
            {t.finalCta.ctaPrimary}
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="https://wa.me/59898260258"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('click_whatsapp', { source: 'final_cta' })}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-[#8B949E] hover:text-[#F0F6FC] border border-[#30363D] hover:border-[#484F58] bg-[#161B22] hover:bg-[#21262D] rounded-xl transition-all duration-150"
          >
            {t.finalCta.ctaSecondary}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
