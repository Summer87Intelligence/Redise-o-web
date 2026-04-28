'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from '@/lib/i18n/config'
import { trackEvent } from '@/lib/analytics'
import LeadModal from '@/components/shared/LeadModal'
import FinalCTA from '@/components/home/FinalCTA'
import PricingSection from '@/components/home/PricingSection'

export default function ServicesPageContent() {
  const { t } = useTranslation()
  const d = t.servicesPageDetail
  const [leadOpen, setLeadOpen] = useState(false)

  useEffect(() => {
    trackEvent('view_servicios', { page: 'servicios' })
  }, [])

  return (
    <>
      <div className="bg-[#0D1117] py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-black text-[#F0F6FC] mb-2 text-balance">
            {d.pageTitle}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F81F7] to-[#60A5FA]">
              {d.pageSubtitle}
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#8B949E] leading-relaxed mt-4">{d.intro}</p>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-12 space-y-10">
          {d.items.map((item, i) => (
            <article
              key={i}
              className="rounded-2xl border border-[#30363D] bg-[#161B22] p-6 sm:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.2)]"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-[#F0F6FC] mb-2">{item.name}</h2>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#2F81F7] mb-2">{d.labels.solves}</h3>
              <p className="text-sm text-[#8B949E] leading-relaxed mb-4">{item.solves}</p>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#7C3AED] mb-2">{d.labels.forWho}</h3>
              <p className="text-sm text-[#8B949E] leading-relaxed mb-4">{item.forWho}</p>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#3FB950] mb-2">{d.labels.deliverables}</h3>
              <ul className="list-disc list-inside text-sm text-[#8B949E] space-y-1 mb-4">
                {item.deliverables.map((line, j) => (
                  <li key={j}>{line}</li>
                ))}
              </ul>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8B949E] mb-2">{d.labels.example}</h3>
              <p className="text-sm text-[#8B949E] leading-relaxed mb-6">{item.example}</p>
              <button
                type="button"
                onClick={() => {
                  trackEvent('click_agendar_reunion', { source: 'servicios', service: item.name })
                  setLeadOpen(true)
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#2F81F7] hover:bg-[#388BFD] rounded-xl transition-colors"
              >
                {d.cta}
              </button>
            </article>
          ))}
        </div>
      </div>
      <PricingSection />
      <FinalCTA />
      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} source="servicios" />
    </>
  )
}
