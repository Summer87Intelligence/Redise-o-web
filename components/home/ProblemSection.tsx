'use client'

import { formatUSD, formatCompactUSD } from '@/lib/currency'
import { useTranslation } from '@/lib/i18n/config'

const problems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
      </svg>
    ),
    headline: 'Your data lives in 5 tools. Your clarity lives in none.',
    body: 'Stripe tells you what you billed. QuickBooks tells you what you spent. The CRM tells you what you sold. None of them tell you what is actually happening or what to do about it.',
    cost: 'Real cost: decisions made with incomplete information, every single day.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    headline: 'When the report arrives, the moment has already passed.',
    body: `Month-end closes on the 10th of the following month. By then you have already made 10 decisions without the information you needed. A problem that could have cost ${formatUSD(5000)} now costs ${formatCompactUSD(50000)}.`,
    cost: 'Real cost: you always react late. And the delay eats into your margin.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
    headline: 'You know something is wrong. You do not know where.',
    body: 'The margin dropped. Is it CAC? Churn? Average ticket? All three? Without a layer that correlates the data, all you can do is guess. And guessing in business has a price.',
    cost: 'Real cost: time and money invested in the wrong problem.',
  },
]

export default function ProblemSection() {
  const { t } = useTranslation()
  const localizedProblems = problems.map((problem, i) => ({
    ...problem,
    headline: t.problem.cards[i]?.headline ?? problem.headline,
    body: t.problem.cards[i]?.body ?? problem.body,
    cost: t.problem.cards[i]?.cost ?? problem.cost,
  }))
  return (
    <section className="py-24 bg-[#0D1117] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(47,129,247,0.04),transparent_70%)] pointer-events-none" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#484F58] text-sm uppercase tracking-widest font-semibold mb-4">
            {t.problem.badge}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F0F6FC] leading-tight tracking-tight text-balance">
            {t.problem.title}
            <br />
            <span className="text-[#F85149]">{t.problem.titleHighlight}</span>
          </h2>
          <p className="mt-5 text-lg text-[#8B949E] max-w-xl mx-auto leading-relaxed">
            {t.problem.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {localizedProblems.map((problem, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-2xl bg-[#161B22] border border-[#30363D] hover:border-[#F85149]/40 hover:bg-[#1A1F26] transition-all duration-200"
              style={{ borderLeft: '3px solid #F85149' }}
            >
              <div className="w-10 h-10 rounded-xl bg-[#F85149]/10 border border-[#F85149]/20 flex items-center justify-center text-[#F85149] mb-5">
                {problem.icon}
              </div>
              <h3 className="text-[#F0F6FC] font-bold text-base mb-3 leading-snug">
                {problem.headline}
              </h3>
              <p className="text-[#8B949E] text-sm leading-relaxed mb-4">{problem.body}</p>
              <div className="pt-4 border-t border-[#30363D]/60">
                <p className="text-[#F85149] text-xs font-semibold leading-relaxed">{problem.cost}</p>
              </div>

              <div className="absolute top-5 right-5 text-[#F85149]/12 font-black text-5xl font-mono leading-none select-none">
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-start sm:items-center gap-4 px-6 py-4 rounded-2xl border border-[#2F81F7]/20 bg-[#2F81F7]/5 text-left sm:text-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2F81F7" strokeWidth="2" className="flex-shrink-0 mt-0.5 sm:mt-0" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            <p className="text-[#8B949E] text-sm max-w-xl">
              {t.problem.note}{' '}
              <span className="text-[#2F81F7] font-semibold">{t.problem.noteHighlight}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
