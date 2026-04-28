'use client'

import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/config'

export default function PricingSection() {
  const { t, locale } = useTranslation()
  const lines = t.servicesSection.lines

  return (
    <section id="servicios" className="scroll-mt-24 py-24 bg-[#0A0E14] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(47,129,247,0.04),transparent_60%)] pointer-events-none" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2F81F7]/25 bg-[#2F81F7]/8 mb-6">
            <div className="w-1 h-1 rounded-full bg-[#2F81F7]" />
            <span className="text-[#2F81F7] text-xs font-semibold uppercase tracking-widest">
              {t.servicesSection.badge}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F0F6FC] leading-tight tracking-tight mb-4 text-balance">
            {t.servicesSection.title}
          </h2>
          <p className="text-lg text-[#8B949E] max-w-3xl mx-auto leading-relaxed mb-2">
            {t.servicesSection.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {lines.map((line, i) => (
            <div
              key={i}
              className="relative p-6 rounded-2xl border border-[#2F81F7]/30 bg-[#161B22] hover:border-[#2F81F7]/50 transition-all duration-200 flex flex-col shadow-[0_0_0_1px_rgba(47,129,247,0.16),0_16px_48px_rgba(47,129,247,0.08)]"
            >
              <div className="mb-4">
                <p className="text-[#2F81F7] text-xs font-bold uppercase tracking-wider mb-2">{line.label}</p>
                <h3 className="text-[#F0F6FC] font-black text-xl mb-1">{line.title}</h3>
                <p className="text-[#8B949E] text-sm">{line.short}</p>
              </div>

              <p className="text-[#8B949E] text-sm leading-relaxed mb-5 border-l-2 border-[#2F81F7]/30 pl-3">
                {line.description}
              </p>

              <div className="flex-1 mb-6 space-y-2.5">
                {line.benefits.map((feature, j) => (
                  <div key={j} className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-[#3FB950] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-sm text-[#8B949E]">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href={`/${locale}/demo`}
                className="w-full text-center py-3.5 rounded-xl text-sm font-bold transition-all duration-150 bg-[#2F81F7] hover:bg-[#388BFD] text-white shadow-glow-sm hover:shadow-glow"
              >
                {t.servicesSection.meetingCta}
              </Link>

              <div className="mt-4 flex items-center gap-4">
                <span className="text-[#484F58] text-xs uppercase tracking-wider">{t.servicesSection.contactLabel}</span>
                <a
                  href="https://wa.me/59898260258"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[#2F81F7] hover:underline"
                >
                  WhatsApp
                </a>
                <a
                  href="mailto:hola@summer87.ai"
                  className="text-sm font-semibold text-[#2F81F7] hover:underline"
                >
                  Email
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
