'use client'

import Link from 'next/link'
import { formatUSD, formatCompactUSD } from '@/lib/currency'
import { useTranslation } from '@/lib/i18n/config'

function MiniMetric({
  label,
  value,
  change,
  positive,
}: {
  label: string
  value: string
  change: string
  positive: boolean
}) {
  return (
    <div className="bg-[#21262D] rounded-xl p-3 border border-[#30363D]/60">
      <p className="text-[#484F58] text-[10px] uppercase tracking-widest font-medium mb-1.5">
        {label}
      </p>
      <p className="text-[#F0F6FC] font-bold text-base font-mono">{value}</p>
      <p className={`text-xs font-semibold mt-0.5 ${positive ? 'text-[#3FB950]' : 'text-[#F85149]'}`}>
        {change}
      </p>
    </div>
  )
}

function DashboardMockup({ t }: { t: ReturnType<typeof useTranslation>['t'] }) {
  return (
    <div className="relative">
      <div className="absolute -inset-8 bg-[radial-gradient(ellipse,rgba(47,129,247,0.08),transparent_70%)] pointer-events-none" />

      <div className="relative rounded-2xl border border-[#30363D] bg-[#161B22] shadow-[0_32px_96px_rgba(0,0,0,0.7),0_0_0_1px_rgba(48,54,61,0.8)] overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#30363D] bg-[#0D1117]/60">
          <div className="flex gap-1.5" aria-hidden>
            <div className="w-3 h-3 rounded-full bg-[#F85149]/50" />
            <div className="w-3 h-3 rounded-full bg-[#D29922]/50" />
            <div className="w-3 h-3 rounded-full bg-[#3FB950]/50" />
          </div>
          <div className="flex-1 mx-2">
            <div className="max-w-[200px] h-5 bg-[#21262D] rounded-md flex items-center px-3">
              <span className="text-[#484F58] text-[11px]">{t.heroMockup.appUrl}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#3FB950] animate-pulse" />
            <span className="text-[#3FB950] text-[11px] font-medium">{t.heroMockup.live}</span>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[#484F58] text-xs uppercase tracking-widest font-medium">
                {t.heroMockup.summaryEyebrow}
              </p>
              <p className="text-[#F0F6FC] font-semibold mt-0.5">{t.heroMockup.summaryTitle}</p>
            </div>
            <div className="text-right">
              <p className="text-[#484F58] text-xs">{t.heroMockup.date}</p>
              <p className="text-[#8B949E] text-xs">{t.heroMockup.timeAgo}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <MiniMetric label={t.heroMockup.metrics[0].label} value={t.heroMockup.metrics[0].value ?? formatCompactUSD(48200)} change={t.heroMockup.metrics[0].change} positive={true} />
            <MiniMetric label={t.heroMockup.metrics[1].label} value={t.heroMockup.metrics[1].value} change={t.heroMockup.metrics[1].change} positive={false} />
            <MiniMetric label={t.heroMockup.metrics[2].label} value={t.heroMockup.metrics[2].value} change={t.heroMockup.metrics[2].change} positive={true} />
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl border-l-[3px] border-[#D29922] bg-[#D29922]/6">
            <svg className="w-4 h-4 text-[#D29922] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
            </svg>
            <div>
              <p className="text-[#D29922] text-xs font-bold uppercase tracking-wide">{t.heroMockup.actionTitle}</p>
              <p className="text-[#8B949E] text-xs mt-0.5 leading-relaxed">
                {t.heroMockup.actionBody.replace('{{amount}}', formatUSD(4200))}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[#30363D] bg-[#0D1117]/70 p-4 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-md bg-[#2F81F7]/15 border border-[#2F81F7]/30 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2F81F7" strokeWidth="2.5" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <span className="text-[#2F81F7] text-xs font-bold">{t.heroMockup.copilotTitle}</span>
            </div>
            <div className="ml-7 bg-[#21262D] rounded-lg px-3 py-2">
              <p className="text-[#8B949E] text-xs italic">"{t.heroMockup.copilotQuestion}"</p>
            </div>
            <div className="ml-2 rounded-lg px-3 py-2.5 bg-[#2F81F7]/5 border border-[#2F81F7]/10">
              <p className="text-[#F0F6FC] text-xs leading-relaxed">
                {t.heroMockup.copilotAnswer}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -right-5 hidden lg:flex items-center gap-2.5 px-3.5 py-2.5 bg-[#161B22] border border-[#30363D] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="w-8 h-8 rounded-lg bg-[#3FB950]/10 border border-[#3FB950]/20 flex items-center justify-center flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3FB950" strokeWidth="2" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
          </svg>
        </div>
        <div>
          <p className="text-[#3FB950] text-sm font-bold font-mono">{t.heroMockup.floatingValue.replace('{{amount}}', formatUSD(12400))}</p>
          <p className="text-[#484F58] text-xs">{t.heroMockup.floatingLabel}</p>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const { t } = useTranslation()
  const narrative = t.heroExtraNarrative
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-[#0D1117]">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(47,129,247,0.09) 0%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(#F0F6FC 1px, transparent 1px), linear-gradient(90deg, #F0F6FC 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2F81F7]/30 bg-[#2F81F7]/8 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2F81F7] animate-pulse" />
              <span className="text-[#2F81F7] text-xs font-semibold uppercase tracking-widest">
                {t.hero.badge}
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[68px] xl:text-7xl font-black text-[#F0F6FC] leading-[1.04] tracking-tight mb-6 text-balance">
              {t.hero.title}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F81F7] via-[#60A5FA] to-[#818CF8]">
                {t.hero.titleHighlight}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#8B949E] leading-relaxed mb-4 max-w-xl mx-auto lg:mx-0">
              {t.hero.description}{' '}
              <strong className="text-[#F0F6FC]">{t.hero.descriptionStrong}</strong>
            </p>
            <p className="text-base text-[#484F58] leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              {t.hero.sub}
            </p>
            <p className="text-sm text-[#8B949E] leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              {narrative}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="#demo"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-[#2F81F7] hover:bg-[#388BFD] rounded-xl transition-all duration-150 shadow-[0_0_24px_rgba(47,129,247,0.35)] hover:shadow-[0_0_36px_rgba(47,129,247,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F81F7]"
              >
                {t.hero.ctaPrimary}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-[#8B949E] hover:text-[#F0F6FC] border border-[#30363D] hover:border-[#484F58] bg-[#161B22] hover:bg-[#21262D] rounded-xl transition-all duration-150"
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5" aria-hidden>
                  {[
                    ['M', 'from-[#2F81F7] to-[#1D4ED8]'],
                    ['C', 'from-[#7C3AED] to-[#5B21B6]'],
                    ['D', 'from-[#059669] to-[#047857]'],
                    ['A', 'from-[#D97706] to-[#B45309]'],
                  ].map(([letter, gradient], i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full border-2 border-[#0D1117] bg-gradient-to-br ${gradient} flex items-center justify-center text-xs font-bold text-white`}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#8B949E]">{t.hero.social}</p>
              </div>
              <div className="hidden sm:block w-px h-5 bg-[#30363D]" aria-hidden />
              <p className="text-sm text-[#484F58]">
                {t.hero.trial}
              </p>
            </div>
          </div>

          <div className="relative">
            <DashboardMockup t={t} />
          </div>
        </div>
      </div>
    </section>
  )
}
