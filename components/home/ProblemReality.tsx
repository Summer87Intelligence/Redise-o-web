'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/config'

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

function CardIcon({ index }: { index: number }) {
  const c = 'w-4 h-4 text-[#F85149]'
  if (index === 0) {
    return (
      <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    )
  }
  if (index === 1) {
    return (
      <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
  return (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
  )
}

export default function ProblemReality() {
  const { t } = useTranslation()
  const p = t.problemReality
  const reduceMotion = useReducedMotion()

  return (
    <section id="problema" className="scroll-mt-24 relative py-14 sm:py-16 bg-[#0D1117] border-b border-[#30363D]/40 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        aria-hidden
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(248,81,73,0.12) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.04 }}
        >
          <p className="text-[#F85149] text-xs font-bold uppercase tracking-[0.2em] mb-4">{p.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-black text-[#F0F6FC] leading-[1.15] tracking-tight text-balance">
            {p.title}{' '}
            <motion.span
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.14 }}
              className="text-[#2F81F7]"
            >
              {p.titleHighlight}
            </motion.span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#8B949E] leading-relaxed">{p.subtitle}</p>
        </motion.div>

        {/* Cards — staggered left → right */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.08 } } }}
        >
          {p.cards.map((card, i) => (
            <motion.div
              key={card.number}
              variants={CARD_VARIANTS}
              className="group relative flex flex-col rounded-2xl border border-[#F85149]/25 bg-[#161B22]/90 p-5 sm:p-6 shadow-[0_0_0_1px_rgba(248,81,73,0.06),inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#F85149]/40 hover:shadow-[0_0_0_1px_rgba(248,81,73,0.25),0_20px_60px_rgba(248,81,73,0.08)]"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <span
                  className="text-4xl sm:text-5xl font-black tabular-nums leading-none text-[#F85149]/25 group-hover:text-[#F85149]/35 transition-colors"
                  style={{ fontFeatureSettings: '"tnum"' }}
                >
                  {card.number}
                </span>
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#F85149]/20 bg-[#0D1117]">
                  <CardIcon index={i} />
                </span>
              </div>
              <h3 className="text-base sm:text-[1.05rem] font-bold text-[#F0F6FC] leading-snug mb-3 text-left">{card.title}</h3>
              <p className="text-sm text-[#8B949E] leading-relaxed text-left grow">{card.body}</p>
              <p className="mt-4 pt-4 border-t border-[#30363D]/80 text-left text-sm font-medium text-[#F85149]/90">{card.cost}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bridge */}
        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduceMotion ? 0 : 0.48, delay: reduceMotion ? 0 : 0.1 }}
        >
          <div className="rounded-2xl border border-[#2F81F7]/25 bg-[#2F81F7]/[0.07] px-5 sm:px-8 py-5 sm:py-6 text-center">
            <p className="text-sm sm:text-base text-[#C9D1D9] leading-relaxed max-w-3xl mx-auto">
              {p.bridge}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
