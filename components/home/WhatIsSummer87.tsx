'use client'

import { useTranslation } from '@/lib/i18n/config'

const features = [
  {
    title: 'Te dice qué hacer, no solo qué pasó',
    description:
      'Cualquier herramienta te muestra que el margen bajó. Summer87 te dice por qué bajó, qué lo causó, y cuál es el primer movimiento que tenés que hacer hoy.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'Filtra el ruido. Solo ves lo que importa hoy.',
    description:
      'No te bombardea con 40 métricas. Cada mañana te dice las 3 cosas que merecen tu atención. Tu tiempo vale demasiado para perderlo interpretando dashboards.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
      </svg>
    ),
  },
  {
    title: 'Habla como un CFO, no como un analista',
    description:
      'Sin gráficos que hay que saber leer. Sin métricas sin contexto. Summer87 te habla en lenguaje de negocio: "tu CAC subió porque...", "tu cliente X está en riesgo porque...".',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    title: 'Detecta el problema antes de que lo notés',
    description:
      'Summer87 monitorea tus datos 24/7 y te alerta cuando algo se desvía del patrón. Te enterás de un problema cuando todavía podés resolverlo, no cuando ya te costó caro.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
  },
]

const isNot = [
  'Un software de contabilidad (no reemplaza a tu contador)',
  'Un CRM o ERP',
  'Un dashboard que configurás y olvidás',
  'Una herramienta que requiere analistas para funcionar',
  'Otro reporte que llega tarde y sin contexto',
  'Power BI con nombre diferente',
]

export default function WhatIsSummer87() {
  const { t } = useTranslation()
  const localizedFeatures = features.map((feature, i) => ({
    ...feature,
    title: t.whatIs.features[i]?.title ?? feature.title,
    description: t.whatIs.features[i]?.description ?? feature.description,
  }))
  const localizedIsNot = t.whatIs.isNotItems.length ? t.whatIs.isNotItems : isNot
  return (
    <section id="producto" className="scroll-mt-24 py-24 bg-[#0A0E14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2F81F7]/25 bg-[#2F81F7]/8 mb-6">
              <div className="w-1 h-1 rounded-full bg-[#2F81F7]" />
              <span className="text-[#2F81F7] text-xs font-semibold uppercase tracking-widest">
                {t.whatIs.badge}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F0F6FC] leading-tight tracking-tight mb-4 text-balance">
              {t.whatIs.title}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F81F7] to-[#60A5FA]">
                {t.whatIs.titleHighlight}
              </span>
            </h2>
            <p className="text-[#8B949E] text-lg leading-relaxed mb-10">
              {t.whatIs.description}
            </p>

            <div className="space-y-4">
              {localizedFeatures.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl border border-[#30363D] bg-[#161B22] hover:border-[#2F81F7]/30 hover:bg-[#161B22] transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#2F81F7]/10 border border-[#2F81F7]/20 flex items-center justify-center text-[#2F81F7] flex-shrink-0 group-hover:bg-[#2F81F7]/15 transition-colors">
                    {feat.icon}
                  </div>
                  <div>
                    <h3 className="text-[#F0F6FC] font-semibold text-sm mb-1">{feat.title}</h3>
                    <p className="text-[#8B949E] text-sm leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pt-20">
            <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-8 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[#F85149]/10 border border-[#F85149]/20 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F85149" strokeWidth="2.5" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#F0F6FC] font-bold text-lg">{t.whatIs.isNotTitle}</h3>
                  <p className="text-[#484F58] text-xs">{t.whatIs.isNotSub}</p>
                </div>
              </div>

              <ul className="space-y-3">
                {localizedIsNot.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border border-[#F85149]/30 bg-[#F85149]/8 flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#F85149" strokeWidth="2" aria-hidden>
                        <path d="M2 2l8 8M10 2L2 10" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="text-[#8B949E] text-sm line-through decoration-[#484F58]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-[#30363D]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#3FB950]/10 border border-[#3FB950]/20 flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3FB950" strokeWidth="2.5" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#3FB950] font-bold text-sm mb-1">
                      {t.whatIs.isTitle}
                    </p>
                    <p className="text-[#8B949E] text-sm leading-relaxed">
                      {t.whatIs.isDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {t.whatIs.stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-[#161B22] border border-[#30363D] text-center"
                >
                  <p className="text-[#2F81F7] font-black text-2xl font-mono">{stat.value}</p>
                  <p className="text-[#8B949E] text-xs mt-1 font-medium">{stat.label}</p>
                  <p className="text-[#484F58] text-[10px] mt-0.5">{stat.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
