'use client'

import Link from 'next/link'
import { useState } from 'react'
import { formatUSD } from '@/lib/currency'
import { useTranslation } from '@/lib/i18n/config'

export default function PricingSection() {
  const { t } = useTranslation()
  const [annual, setAnnual] = useState(true)
  const plans = t.pricingSection.plans

  return (
    <section id="pricing" className="scroll-mt-24 py-24 bg-[#0A0E14] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(47,129,247,0.04),transparent_60%)] pointer-events-none" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2F81F7]/25 bg-[#2F81F7]/8 mb-6">
            <div className="w-1 h-1 rounded-full bg-[#2F81F7]" />
            <span className="text-[#2F81F7] text-xs font-semibold uppercase tracking-widest">
              {t.pricing.badge}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F0F6FC] leading-tight tracking-tight mb-4 text-balance">
            {t.pricing.title}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F81F7] to-[#60A5FA]">
              {t.pricing.titleHighlight}
            </span>
          </h2>
          <p className="text-lg text-[#8B949E] max-w-xl mx-auto leading-relaxed mb-2">
            {t.pricing.description}
          </p>
          <p className="text-sm text-[#484F58] mb-8">
            {t.pricing.sub}
          </p>

          <div className="inline-flex items-center gap-3 p-1 rounded-xl border border-[#30363D] bg-[#161B22]">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                !annual ? 'bg-[#21262D] text-[#F0F6FC] shadow-card' : 'text-[#484F58] hover:text-[#8B949E]'
              }`}
            >
              {t.pricing.monthly}
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                annual ? 'bg-[#21262D] text-[#F0F6FC] shadow-card' : 'text-[#484F58] hover:text-[#8B949E]'
              }`}
            >
              {t.pricing.annual}
              <span className="px-1.5 py-0.5 rounded-md bg-[#3FB950]/15 border border-[#3FB950]/25 text-[#3FB950] text-xs font-bold">
                {t.pricing.save}
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative p-6 rounded-2xl border transition-all duration-200 flex flex-col ${
                plan.highlight
                  ? 'border-[#2F81F7] bg-[#161B22] shadow-[0_0_0_1px_rgba(47,129,247,0.3),0_16px_48px_rgba(47,129,247,0.1)]'
                  : 'border-[#30363D] bg-[#161B22] hover:border-[#484F58]'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-[#2F81F7] text-white text-xs font-bold shadow-glow-sm whitespace-nowrap">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-[#F0F6FC] font-black text-xl mb-1">{plan.name}</h3>
                <p className="text-[#484F58] text-xs">{plan.tagline}</p>
              </div>

              <p className="text-[#8B949E] text-xs leading-relaxed mb-5 italic border-l-2 border-[#30363D] pl-3">
                {plan.pitch}
              </p>

              <div className="mb-6 pb-6 border-b border-[#30363D]">
                {plan.priceMonthly !== null ? (
                  <>
                    <div className="flex items-end gap-2">
                      <span className="text-[#F0F6FC] font-black text-4xl font-mono">
                        {formatUSD(annual ? plan.priceAnnual! : plan.priceMonthly)}
                      </span>
                      <span className="text-[#484F58] text-sm mb-1.5">{t.pricingSection.perMonth}</span>
                      {annual && (
                        <span className="text-[#8B949E] text-xs mb-1.5 line-through">
                          {formatUSD(plan.priceMonthly)}
                        </span>
                      )}
                    </div>
                    <p className="text-[#484F58] text-xs mt-1">
                      {annual
                        ? `${t.pricingSection.billedAnnually} ${formatUSD(plan.priceAnnual! * 12)}${t.pricingSection.perYear}`
                        : t.pricingSection.billedMonthly}
                    </p>
                  </>
                ) : (
                  <div>
                    <p className="text-[#F0F6FC] font-black text-2xl mb-1">{t.pricingSection.customTitle}</p>
                    <p className="text-[#484F58] text-xs">{t.pricingSection.customSubtitle}</p>
                  </div>
                )}
              </div>

              <div className="flex-1 mb-6 space-y-2.5">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-[#3FB950] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className={`text-sm ${j === 0 && plan.name === 'Enterprise' ? 'text-[#F0F6FC] font-semibold' : 'text-[#8B949E]'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
                {plan.notIncluded.map((feature, j) => (
                  <div key={`no-${j}`} className="flex items-start gap-2.5 opacity-35">
                    <svg className="w-4 h-4 text-[#484F58] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-[#484F58] text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href={plan.ctaHref}
                className={`w-full text-center py-3.5 rounded-xl text-sm font-bold transition-all duration-150 ${
                  plan.highlight
                    ? 'bg-[#2F81F7] hover:bg-[#388BFD] text-white shadow-glow-sm hover:shadow-glow'
                    : 'border border-[#30363D] hover:border-[#484F58] bg-[#21262D] hover:bg-[#2A2F38] text-[#F0F6FC]'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {t.pricingSection.guarantees.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-5 rounded-xl border border-[#30363D] bg-[#161B22]">
              <div className="mt-0.5 flex-shrink-0">
                {i === 0 && (
                  <svg className="w-5 h-5 text-[#3FB950]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                )}
                {i === 1 && (
                  <svg className="w-5 h-5 text-[#2F81F7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                )}
                {i === 2 && (
                  <svg className="w-5 h-5 text-[#D29922]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                )}
              </div>
              <div>
                <p className="text-[#F0F6FC] font-semibold text-sm mb-1">{item.title}</p>
                <p className="text-[#484F58] text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
