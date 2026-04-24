'use client'
import { useTranslation } from '@/lib/i18n/config'

export default function UseCases() {
  const { t } = useTranslation()
  const cases = t.useCases.cases
  return (
    <section id="casos-de-uso" className="scroll-mt-24 py-24 bg-[#0D1117] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(124,58,237,0.05),transparent_60%)] pointer-events-none" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2F81F7]/25 bg-[#2F81F7]/8 mb-6">
            <div className="w-1 h-1 rounded-full bg-[#2F81F7]" />
            <span className="text-[#2F81F7] text-xs font-semibold uppercase tracking-widest">
              {t.useCases.badge}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F0F6FC] leading-tight tracking-tight mb-4 text-balance">
            {t.useCases.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F81F7] to-[#60A5FA]">
              {t.useCases.titleHighlight}
            </span>
          </h2>
          <p className="text-lg text-[#8B949E] max-w-xl mx-auto leading-relaxed">
            {t.useCases.description}
          </p>
        </div>

        {/* Cases grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl border border-[#30363D] bg-[#161B22] hover:bg-[#1A1F26] hover:border-[#484F58] transition-all duration-200"
            >
              {/* Industry header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: `${c.color}15`, border: `1px solid ${c.color}30`, color: c.color }}
                >
                  {c.icon}
                </div>
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: c.color }}
                  >
                    {c.industry}
                  </p>
                </div>
              </div>

              {/* Problem → Solution */}
              <div className="mb-5 space-y-3">
                <div className="flex items-start gap-2.5 p-3 rounded-lg border border-[#F85149]/15 bg-[#F85149]/5">
                  <svg className="w-4 h-4 text-[#F85149] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9.303 3.376c.866 1.5-.217 3.374-1.948 3.374H4.645c-1.73 0-2.813-1.874-1.948-3.374l7.578-13.48c.866-1.5 3.032-1.5 3.898 0l7.578 13.48z" />
                  </svg>
                  <p className="text-[#8B949E] text-sm leading-relaxed">
                    <span className="text-[#F85149] font-semibold">{t.useCases.problemLabel} </span>
                    {c.problem}
                  </p>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-lg border border-[#3FB950]/15 bg-[#3FB950]/5">
                  <svg className="w-4 h-4 text-[#3FB950] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                  <p className="text-[#8B949E] text-sm leading-relaxed">
                    <span className="text-[#3FB950] font-semibold">{t.useCases.solutionLabel} </span>
                    {c.solution}
                  </p>
                </div>
              </div>

              {/* Metrics tracked */}
              <div className="mb-5">
                <p className="text-[#484F58] text-xs uppercase tracking-widest font-medium mb-2">
                  {t.useCases.metricsLabel}
                </p>
                <div className="flex flex-wrap gap-2">
                  {c.metrics.map((m, j) => (
                    <span
                      key={j}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium text-[#8B949E] border border-[#30363D] bg-[#21262D]"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Result */}
              <div
                className="p-3 rounded-xl border-l-[3px]"
                style={{ borderLeftColor: c.color, backgroundColor: `${c.color}08` }}
              >
                <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: c.color }}>
                  {t.useCases.resultLabel}
                </p>
                <p className="text-[#F0F6FC] text-sm leading-relaxed">{c.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
