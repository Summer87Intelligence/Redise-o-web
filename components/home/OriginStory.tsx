'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/config'

export default function OriginStory() {
  const { t, locale } = useTranslation()
  const o = t.originStory
  const [expanded, setExpanded] = useState(false)
  const reduceMotion = useReducedMotion()

  return (
    <section id="origen" className="relative scroll-mt-24 py-16 bg-[#0D1117] border-b border-[#30363D]/40">
      <motion.div
        className="max-w-3xl mx-auto px-6 text-center"
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.08 }}
      >
        <div className="rounded-2xl border border-[#30363D] bg-[#161B22]/90 p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.22)]">
          <p className="text-[#2F81F7] text-xs font-semibold uppercase tracking-widest mb-3 text-center">{o.eyebrow}</p>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F0F6FC] mb-3 tracking-tight text-center">{o.title}</h2>

          <div className="relative mb-4 text-center">
            <p
              className={`text-[#8B949E] text-sm leading-relaxed text-center ${!expanded ? 'line-clamp-2' : ''}`}
            >
              {o.intro}
            </p>
            {!expanded && (
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#161B22] via-[#161B22]/85 to-transparent"
                aria-hidden
              />
            )}
          </div>

          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            aria-hidden={!expanded}
          >
            <div className="overflow-hidden min-h-0">
              <div className="pt-2 border-t border-[#30363D]/70">
                <div className="mt-6 space-y-5 text-white/70 text-sm leading-relaxed text-left">
                  {o.expandedParagraphs.map((paragraph: string, i: number) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                <blockquote className="mt-8 text-center text-[#F0F6FC] text-sm leading-relaxed font-medium max-w-2xl mx-auto px-2">
                  {o.highlight}
                </blockquote>

                <div className="mt-8 text-center">
                  <p className="text-white font-medium">{o.signatureName}</p>
                  <p className="text-white/50 text-sm">{o.signatureRole}</p>
                </div>

                <div className="flex justify-center pt-6">
                  <Link
                    href={`/${locale}#contacto`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#2F81F7] hover:text-[#60A5FA] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F81F7] rounded-md"
                  >
                    {o.expandedCta}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="text-sm font-semibold text-[#2F81F7] hover:text-[#60A5FA] transition-colors duration-200 inline-flex items-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F81F7] rounded-md"
              aria-expanded={expanded}
            >
              {expanded ? o.readLess : o.readMore}
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`transition-transform duration-300 ease-out ${expanded ? 'rotate-180' : ''}`}
                aria-hidden
              >
                <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
