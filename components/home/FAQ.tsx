'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/config'

export default function FAQ() {
  const { t } = useTranslation()
  const categories = t.faq.categories
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    // Reset to first tab and close all answers when locale data changes.
    setActiveTabIndex(0)
    setExpandedIndex(null)
  }, [categories])

  const activeCategory = categories[activeTabIndex] ?? categories[0]
  const items = activeCategory?.items ?? []

  return (
    <section id="faq" className="scroll-mt-24 py-20 bg-[#0D1117] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.14 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2F81F7]/25 bg-[#2F81F7]/8 mb-6">
            <div className="w-1 h-1 rounded-full bg-[#2F81F7]" />
            <span className="text-[#2F81F7] text-xs font-semibold uppercase tracking-widest">
              {t.faq.badge}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F0F6FC] leading-tight tracking-tight mb-4">
            {t.faq.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F81F7] to-[#60A5FA]">
              {t.faq.titleHighlight}
            </span>
          </h2>
          <p className="text-lg text-[#8B949E] max-w-xl mx-auto leading-relaxed">
            {t.faq.description}{' '}
            <a href="mailto:hola@summer87.com" className="text-[#2F81F7] hover:underline">
              hola@summer87.com
            </a>
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-8">
          {categories.map((category, index) => (
            <button
              key={category.title}
              onClick={() => {
                setActiveTabIndex(index)
                setExpandedIndex(null)
              }}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                activeTabIndex === index
                  ? 'bg-[#2F81F7]/15 text-[#2F81F7] border border-[#2F81F7]/30'
                  : 'text-[#484F58] hover:text-[#8B949E] border border-transparent hover:border-[#30363D]'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* FAQ items */}
        <div className="rounded-2xl border border-[#30363D] bg-[#161B22]/80 px-5 py-5 md:px-7 md:py-6">
          <div className="divide-y divide-[#30363D]/80">
            {items.length === 0 && (
              <div className="py-4 text-sm text-white/50">No hay preguntas configuradas para esta sección.</div>
            )}
            {items.map((item, index) => (
              <div key={`${activeTabIndex}-${index}`} className="py-4 md:py-5 first:pt-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full flex items-start justify-between gap-3 md:gap-4 text-left group focus-visible:outline-none"
                  aria-expanded={expandedIndex === index}
                >
                  <span className="text-[#F0F6FC] text-sm font-semibold group-hover:text-[#2F81F7] transition-colors leading-relaxed">
                    {item.question}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full border border-[#30363D] bg-[#21262D] flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200 ${
                      expandedIndex === index ? 'border-[#2F81F7] bg-[#2F81F7]/15 rotate-45' : ''
                    }`}
                    aria-hidden
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      stroke={expandedIndex === index ? '#2F81F7' : '#484F58'}
                      strokeWidth="1.5"
                    >
                      <path d="M5 2v6M2 5h6" strokeLinecap="round" />
                    </svg>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    expandedIndex === index ? 'max-h-[240px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pt-2">
                    <p className="text-sm text-white/60 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
