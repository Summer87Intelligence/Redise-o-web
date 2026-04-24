import Link from 'next/link'
import type { Locale } from '@/lib/i18n/shared'
import { intentPageContent, type IntentSlug } from '@/lib/seo/intent-pages'

type Props = {
  locale: Locale
  slug: IntentSlug
  page: {
    h1: string
    intro: string
    whatIs: string
    howItWorks: string[]
    whenToUse: string[]
    forWho: string[]
    examples: string[]
    commonMistakes?: string[]
    ignoreConsequences?: string[]
    fixes?: string[]
    faqs: Array<{ question: string; answer: string }>
    keywordHeadings?: {
      whatIs?: string
      howItWorks?: string
      whenToUse?: string
      whoFor?: string
      examples?: string
      commonMistakes?: string
      ignoreConsequences?: string
      fixes?: string
      faq?: string
    }
    cta: {
      title: string
      body: string
      button: string
      problem?: string
      loss?: string
      action?: string
    }
    ui: {
      whatIs: string
      howItWorks: string
      whenToUse: string
      whoFor: string
      examples: string
      commonMistakes: string
      ignoreConsequences: string
      fixes: string
      faq: string
      leadTitle: string
      leadButton: string
      linksTitle: string
      linksCountLabel: string
      backHome: string
      problemLabel: string
      riskLabel: string
      actionLabel: string
      inputCompanySize: string
      inputMonthlyRevenue: string
      linkHome: string
      linkDemo: string
      linkPricing: string
      linkFaq: string
      linkHowItWorks: string
    }
  }
  related: Array<{ slug: IntentSlug }>
}

export default function IntentPageTemplate({ locale, slug, page, related }: Props) {
  const coreLinks = [
    { href: `/${locale}`, label: page.ui.linkHome },
    { href: `/${locale}/demo`, label: page.ui.linkDemo },
    { href: `/${locale}/pricing`, label: page.ui.linkPricing },
    { href: `/${locale}/faq`, label: page.ui.linkFaq },
    { href: `/${locale}/como-funciona`, label: page.ui.linkHowItWorks },
  ]

  const internalLinks = [
    ...coreLinks,
    ...related.map((item) => ({ href: `/${locale}/${item.slug}`, label: intentPageContent[locale][item.slug].title })),
  ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <article className="pt-24 pb-16 bg-[#0D1117] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-black text-[#F0F6FC] leading-tight mb-6">{page.h1}</h1>
        <p className="text-lg text-[#8B949E] leading-relaxed mb-10">{page.intro}</p>

        <section className="mb-10 rounded-2xl border border-[#30363D] bg-[#161B22] p-6">
          <h2 className="text-2xl font-bold text-[#F0F6FC] mb-3">{page.keywordHeadings?.whatIs ?? page.ui.whatIs}</h2>
          <p className="text-[#8B949E] leading-relaxed">{page.whatIs}</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#F0F6FC] mb-4">{page.keywordHeadings?.howItWorks ?? page.ui.howItWorks}</h2>
          <ul className="space-y-3">
            {page.howItWorks.map((item) => (
              <li key={item} className="rounded-xl border border-[#30363D] bg-[#161B22] p-4 text-[#8B949E]">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-6">
            <h2 className="text-xl font-bold text-[#F0F6FC] mb-3">
              {page.keywordHeadings?.whenToUse ?? page.ui.whenToUse}
            </h2>
            <ul className="space-y-2 text-[#8B949E]">
              {page.whenToUse.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-6">
            <h2 className="text-xl font-bold text-[#F0F6FC] mb-3">
              {page.keywordHeadings?.whoFor ?? page.ui.whoFor}
            </h2>
            <ul className="space-y-2 text-[#8B949E]">
              {page.forWho.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#F0F6FC] mb-4">
            {page.keywordHeadings?.examples ?? page.ui.examples}
          </h2>
          <div className="space-y-3">
            {page.examples.map((item) => (
              <div key={item} className="rounded-xl border border-[#30363D] bg-[#161B22] p-4 text-[#8B949E]">
                {item}
              </div>
            ))}
          </div>
        </section>

        {page.commonMistakes && page.commonMistakes.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#F0F6FC] mb-4">
              {page.keywordHeadings?.commonMistakes ?? page.ui.commonMistakes}
            </h2>
            <div className="space-y-3">
              {page.commonMistakes.map((item) => (
                <div key={item} className="rounded-xl border border-[#30363D] bg-[#161B22] p-4 text-[#8B949E]">
                  {item}
                </div>
              ))}
            </div>
          </section>
        )}

        {page.ignoreConsequences && page.ignoreConsequences.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#F0F6FC] mb-4">
              {page.keywordHeadings?.ignoreConsequences ?? page.ui.ignoreConsequences}
            </h2>
            <ul className="space-y-3">
              {page.ignoreConsequences.map((item) => (
                <li key={item} className="rounded-xl border border-[#F85149]/30 bg-[#F85149]/10 p-4 text-[#8B949E]">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {page.fixes && page.fixes.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#F0F6FC] mb-4">
              {page.keywordHeadings?.fixes ?? page.ui.fixes}
            </h2>
            <ul className="space-y-3">
              {page.fixes.map((item) => (
                <li key={item} className="rounded-xl border border-[#3FB950]/30 bg-[#3FB950]/10 p-4 text-[#8B949E]">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#F0F6FC] mb-4">
            {page.keywordHeadings?.faq ?? page.ui.faq}
          </h2>
          <div className="rounded-2xl border border-[#30363D] bg-[#161B22] divide-y divide-[#30363D]">
            {page.faqs.map((item) => (
              <div key={item.question} className="p-5">
                <h3 className="text-[#F0F6FC] font-semibold mb-2">{item.question}</h3>
                <p className="text-[#8B949E]">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 rounded-2xl border border-[#30363D] bg-[#161B22] p-6">
          <h2 className="text-xl font-bold text-[#F0F6FC] mb-4">{page.ui.leadTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <input
              type="text"
              placeholder={page.ui.inputCompanySize}
              className="bg-[#0D1117] border border-[#30363D] rounded-lg px-3 py-2.5 text-sm text-[#F0F6FC] placeholder-[#484F58] outline-none"
            />
            <input
              type="text"
              placeholder={page.ui.inputMonthlyRevenue}
              className="bg-[#0D1117] border border-[#30363D] rounded-lg px-3 py-2.5 text-sm text-[#F0F6FC] placeholder-[#484F58] outline-none"
            />
          </div>
          <button className="px-5 py-3 rounded-xl text-sm font-bold text-white bg-[#2F81F7] hover:bg-[#388BFD] transition-colors">
            {page.ui.leadButton}
          </button>
        </section>

        <section className="mb-10 rounded-2xl border border-[#2F81F7]/30 bg-[#2F81F7]/10 p-6">
          <h2 className="text-2xl font-bold text-[#F0F6FC] mb-2">{page.cta.title}</h2>
          <p className="text-[#8B949E] mb-5">{page.cta.body}</p>
          <div className="space-y-2 mb-5 text-sm text-[#8B949E]">
            {page.cta.problem && <p><span className="text-[#F0F6FC] font-semibold">{page.ui.problemLabel}:</span> {page.cta.problem}</p>}
            {page.cta.loss && <p><span className="text-[#F0F6FC] font-semibold">{page.ui.riskLabel}:</span> {page.cta.loss}</p>}
            {page.cta.action && <p><span className="text-[#F0F6FC] font-semibold">{page.ui.actionLabel}:</span> {page.cta.action}</p>}
          </div>
          <Link
            href={`/${locale}/demo`}
            className="inline-flex items-center px-5 py-3 rounded-xl text-sm font-bold text-white bg-[#2F81F7] hover:bg-[#388BFD] transition-colors"
          >
            {page.cta.button}
          </Link>
        </section>

        <section className="rounded-2xl border border-[#30363D] bg-[#161B22] p-6">
          <h2 className="text-xl font-bold text-[#F0F6FC] mb-4">{page.ui.linksTitle}</h2>
          <p className="text-xs text-[#484F58] mb-3">
            {page.ui.linksCountLabel}: {internalLinks.length}
          </p>
          <div className="flex flex-wrap gap-3 mb-4">
            {internalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                  item.href.endsWith(`/${slug}`)
                    ? 'border-[#2F81F7] text-[#2F81F7] bg-[#2F81F7]/10'
                    : 'border-[#30363D] text-[#8B949E] hover:text-[#F0F6FC]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link href={`/${locale}`} className="text-sm text-[#2F81F7] hover:underline">
            {page.ui.backHome}
          </Link>
        </section>
      </div>
    </article>
  )
}
