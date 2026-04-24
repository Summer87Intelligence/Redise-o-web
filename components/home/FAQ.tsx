'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from '@/lib/i18n/config'

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-[#30363D] last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-4 text-left group focus-visible:outline-none"
        aria-expanded={open}
      >
        <span className="text-[#F0F6FC] text-sm font-semibold group-hover:text-[#2F81F7] transition-colors leading-relaxed">
          {q}
        </span>
        <div
          className={`w-5 h-5 rounded-full border border-[#30363D] bg-[#21262D] flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200 ${
            open ? 'border-[#2F81F7] bg-[#2F81F7]/15 rotate-45' : ''
          }`}
          aria-hidden
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke={open ? '#2F81F7' : '#484F58'} strokeWidth="1.5">
            <path d="M5 2v6M2 5h6" strokeLinecap="round" />
          </svg>
        </div>
      </button>
      {open && (
        <div className="pb-4 animate-fade-in">
          <p className="text-[#8B949E] text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  const { t } = useTranslation()
  const localizedFaqs = t.faq.categories
  const [activeCategory, setActiveCategory] = useState(localizedFaqs[0]?.title ?? '')
  useEffect(() => {
    setActiveCategory(localizedFaqs[0]?.title ?? '')
  }, [localizedFaqs])

  const currentItems = localizedFaqs.find((f) => f.title === activeCategory)?.items ?? []

  return (
    <section id="faq" className="scroll-mt-24 py-24 bg-[#0D1117] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
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
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {localizedFaqs.map((f) => (
            <button
              key={f.title}
              onClick={() => setActiveCategory(f.title)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                activeCategory === f.title
                  ? 'bg-[#2F81F7]/15 text-[#2F81F7] border border-[#2F81F7]/30'
                  : 'text-[#484F58] hover:text-[#8B949E] border border-transparent hover:border-[#30363D]'
              }`}
            >
              {f.title}
            </button>
          ))}
        </div>

        {/* FAQ items */}
        <div className="rounded-2xl border border-[#30363D] bg-[#161B22] px-6 divide-y divide-[#30363D]">
          {currentItems.map((item, i) => (
            <FAQItem key={i} q={item.question} a={item.answer} />
          ))}
        </div>
      </div>
    </section>
  )
}
