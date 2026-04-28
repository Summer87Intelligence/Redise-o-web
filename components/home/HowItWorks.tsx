'use client'
import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/config'

export default function HowItWorks() {
  const { t } = useTranslation()
  const steps = t.howItWorks.steps
  return (
    <section id="como-funciona" className="scroll-mt-24 py-24 bg-[#0D1117] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(47,129,247,0.04),transparent_60%)] pointer-events-none" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2F81F7]/25 bg-[#2F81F7]/8 mb-6">
            <div className="w-1 h-1 rounded-full bg-[#2F81F7]" />
            <span className="text-[#2F81F7] text-xs font-semibold uppercase tracking-widest">
              {t.howItWorks.badge}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F0F6FC] leading-tight tracking-tight mb-4 text-balance">
            {t.howItWorks.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F81F7] to-[#60A5FA]">
              {t.howItWorks.titleHighlight}
            </span>
          </h2>
          <p className="text-lg text-[#8B949E] max-w-xl mx-auto leading-relaxed">
            {t.howItWorks.description}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line desktop */}
          <div
            className="hidden lg:block absolute top-16 left-[16.666%] right-[16.666%] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #30363D 20%, #30363D 80%, transparent)' }}
            aria-hidden
          />

          <div className="grid lg:grid-cols-4 gap-6">
            {steps.map((step: { number: string; title: string; description: string; detail: string; color: string; items: string[] }, i: number) => (
              <div key={i} className="relative">
                {/* Step card */}
                <div className="group p-6 rounded-2xl border border-[#30363D] bg-[#161B22] hover:border-[#30363D] hover:bg-[#1A1F26] transition-all duration-200 h-full">
                  {/* Number circle */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg font-mono mb-6"
                    style={{ background: `${step.color}15`, border: `1px solid ${step.color}30`, color: step.color }}
                  >
                    {step.number}
                  </div>

                  <h3 className="text-[#F0F6FC] font-bold text-xl mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-[#8B949E] text-sm leading-relaxed mb-5">
                    {step.description}
                  </p>

                  {/* Detail badge */}
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-5"
                    style={{ background: `${step.color}12`, color: step.color, border: `1px solid ${step.color}25` }}
                  >
                    <div className="w-1 h-1 rounded-full" style={{ background: step.color }} />
                    {step.detail}
                  </div>

                  {/* Items */}
                  <ul className="space-y-2">
                    {step.items.map((item: string, j: number) => (
                      <li key={j} className="flex items-center gap-2.5">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          aria-hidden
                        >
                          <circle cx="7" cy="7" r="6" stroke={step.color} strokeOpacity="0.3" />
                          <path
                            d="M4.5 7l2 2 3-4"
                            stroke={step.color}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-[#8B949E] text-xs">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arrow between steps */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-16 -right-4 z-10 w-8 h-8 items-center justify-center" aria-hidden>
                    <div className="w-7 h-7 rounded-full bg-[#161B22] border border-[#30363D] flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#484F58" strokeWidth="1.5">
                        <path d="M2 6h8M7 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            href="#contacto"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-[#2F81F7] hover:bg-[#388BFD] rounded-xl transition-all duration-150 shadow-[0_0_24px_rgba(47,129,247,0.3)] hover:shadow-[0_0_36px_rgba(47,129,247,0.4)]"
          >
            {t.howItWorks.cta}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <p className="mt-3 text-[#484F58] text-sm">
            {t.howItWorks.note}
          </p>
        </div>
      </div>
    </section>
  )
}
