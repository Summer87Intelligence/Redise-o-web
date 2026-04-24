'use client'
import { useTranslation } from '@/lib/i18n/config'

export default function Integrations() {
  const { t } = useTranslation()
  const integrations = t.integrations.items
  return (
    <section id="integraciones" className="py-24 bg-[#0A0E14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2F81F7]/25 bg-[#2F81F7]/8 mb-6">
            <div className="w-1 h-1 rounded-full bg-[#2F81F7]" />
            <span className="text-[#2F81F7] text-xs font-semibold uppercase tracking-widest">
              {t.integrations.badge}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F0F6FC] leading-tight tracking-tight mb-4 text-balance">
            {t.integrations.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F81F7] to-[#60A5FA]">
              {t.integrations.titleHighlight}
            </span>
          </h2>
          <p className="text-lg text-[#8B949E] max-w-xl mx-auto leading-relaxed">
            {t.integrations.description}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {integrations.map((integration, i) => (
            <div
              key={i}
              className="group flex items-center gap-3 p-4 rounded-xl border border-[#30363D] bg-[#161B22] hover:border-[#484F58] hover:bg-[#1A1F26] transition-all duration-200"
            >
              {/* Logo placeholder */}
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                style={{ backgroundColor: integration.color + '22', border: `1px solid ${integration.color}30` }}
              >
                <span style={{ color: integration.color }}>
                  {integration.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-[#F0F6FC] text-sm font-semibold truncate">{integration.name}</p>
                <p className="text-[#484F58] text-xs">{integration.category}</p>
              </div>
              <div className="ml-auto">
                <div className="w-4 h-4 rounded-full bg-[#3FB950]/15 border border-[#3FB950]/25 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3FB950]" />
                </div>
              </div>
            </div>
          ))}

          {/* +28 more card */}
          <div className="flex items-center justify-center p-4 rounded-xl border border-dashed border-[#30363D] bg-[#161B22]/50 col-span-1">
            <div className="text-center">
              <p className="text-[#2F81F7] font-black text-xl mb-1">+28</p>
              <p className="text-[#484F58] text-xs">{t.integrations.moreAvailable}</p>
            </div>
          </div>
        </div>

        {/* Bottom message */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-[#30363D] bg-[#161B22]">
            <div className="w-8 h-8 rounded-lg bg-[#2F81F7]/10 border border-[#2F81F7]/20 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2F81F7" strokeWidth="2" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-[#F0F6FC] text-sm font-semibold">{t.integrations.notFoundTitle}</p>
              <p className="text-[#8B949E] text-xs mt-0.5">
                {t.integrations.notFoundBody}
              </p>
            </div>
            <a
              href="mailto:hola@summer87.com"
              className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold text-[#2F81F7] border border-[#2F81F7]/30 hover:bg-[#2F81F7]/10 transition-colors"
            >
              {t.integrations.contact}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
