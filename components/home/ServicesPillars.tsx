'use client'

import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/config'

export default function ServicesPillars() {
  const { t, locale } = useTranslation()
  const pillars = t.servicesPillars.items

  return (
    <section id="servicios" className="scroll-mt-24 py-24 bg-[#0D1117] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2F81F7]/25 bg-[#2F81F7]/8 mb-6">
            <div className="w-1 h-1 rounded-full bg-[#2F81F7]" />
            <span className="text-[#2F81F7] text-xs font-semibold uppercase tracking-widest">
              {t.servicesPillars.badge}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F0F6FC] leading-tight tracking-tight mb-4">
            {t.servicesPillars.title}
          </h2>
          <p className="text-lg text-[#8B949E] max-w-2xl mx-auto leading-relaxed">
            {t.servicesPillars.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((item, i) => (
            <article key={i} className="p-6 rounded-2xl border border-[#30363D] bg-[#161B22]">
              <h3 className="text-[#F0F6FC] font-bold text-xl mb-3">{item.title}</h3>
              <p className="text-[#8B949E] text-sm leading-relaxed mb-4">{item.description}</p>
              <ul className="space-y-2 mb-5">
                {item.benefits.map((benefit, j) => (
                  <li key={j} className="text-[#8B949E] text-sm flex items-start gap-2">
                    <span className="text-[#2F81F7]">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}${item.ctaHref}`}
                className="inline-flex items-center text-sm font-semibold text-[#2F81F7] hover:underline"
              >
                {item.ctaLabel}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
