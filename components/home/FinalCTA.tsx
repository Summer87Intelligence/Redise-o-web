'use client'

import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/config'

export default function FinalCTA() {
  const { t } = useTranslation()
  const extra = t.finalCtaExtra
  return (
    <section id="demo" className="py-24 bg-[#0A0E14] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(47,129,247,0.13) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(#F0F6FC 1px, transparent 1px), linear-gradient(90deg, #F0F6FC 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Urgency banner */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F85149]/20 bg-[#F85149]/6 mb-10">
          <div className="w-1.5 h-1.5 rounded-full bg-[#F85149] animate-pulse" />
          <span className="text-[#F85149] text-xs font-bold uppercase tracking-widest">
            {t.finalCta.urgency}
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#F0F6FC] leading-tight tracking-tight mb-6 text-balance">
          {t.finalCta.title}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F81F7] via-[#60A5FA] to-[#818CF8]">
            {t.finalCta.titleHighlight}
          </span>
        </h2>

        <p className="text-xl text-[#8B949E] leading-relaxed mb-4 max-w-2xl mx-auto">
          {t.finalCta.description}
        </p>
        <p className="text-base text-[#484F58] mb-12 max-w-xl mx-auto">
          {t.finalCta.sub}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Link
            href="/demo"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-[#2F81F7] hover:bg-[#388BFD] rounded-xl transition-all duration-150 shadow-[0_0_32px_rgba(47,129,247,0.4)] hover:shadow-[0_0_48px_rgba(47,129,247,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F81F7]"
          >
            {t.finalCta.ctaPrimary}
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="mailto:hola@summer87.com"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-[#8B949E] hover:text-[#F0F6FC] border border-[#30363D] hover:border-[#484F58] bg-[#161B22] hover:bg-[#21262D] rounded-xl transition-all duration-150"
          >
            {t.finalCta.ctaSecondary}
          </Link>
        </div>

        {/* Response time */}
        <p className="text-[#484F58] text-sm mb-12">
          {extra.responsePrefix}{' '}
          <span className="text-[#F0F6FC] font-semibold">{extra.responseHighlight}</span>{' '}
          {extra.responseSuffix}
        </p>

        {/* Trust signals */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
          {extra.trust.map((item: { value: string; label: string }, i: number) => (
            <div key={i} className="p-3 rounded-xl border border-[#30363D] bg-[#161B22]">
              <p className="text-[#F0F6FC] font-bold text-sm">{item.value}</p>
              <p className="text-[#484F58] text-xs mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial inline */}
        <div className="mt-12 max-w-xl mx-auto p-5 rounded-2xl border border-[#30363D] bg-[#161B22] text-left">
          <div className="flex gap-1 mb-3" aria-label={extra.starsAria}>
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="13" height="13" viewBox="0 0 13 13" fill="#D29922" aria-hidden>
                <path d="M6.5 1l1.545 3.13 3.455.502-2.5 2.436.59 3.44L6.5 8.875l-3.09 1.633.59-3.44L1.5 4.632l3.455-.502L6.5 1z" />
              </svg>
            ))}
          </div>
          <blockquote className="text-[#8B949E] text-sm leading-relaxed mb-3">
            &ldquo;{extra.quote}&rdquo;
          </blockquote>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2F81F7] to-[#1D4ED8] flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              M
            </div>
            <p className="text-[#484F58] text-xs">{extra.author}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
