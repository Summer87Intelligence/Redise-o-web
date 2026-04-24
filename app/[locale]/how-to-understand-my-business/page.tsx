import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import IntentPageTemplate from '@/components/seo/IntentPageTemplate'
import {
  INTENT_SLUGS,
  intentPageContent,
  type IntentSlug,
} from '@/lib/seo/intent-pages'
import { DEFAULT_LOCALE, LOCALES, SITE_URL, isLocale } from '@/lib/i18n/shared'

const slug: IntentSlug = 'how-to-understand-my-business'

const related = [
  { slug: 'how-to-understand-my-business' },
  { slug: 'business-cash-flow-analysis' },
  { slug: 'financial-decision-software' },
  { slug: 'why-businesses-fail-with-data' },
] as const

type Props = { params: { locale: string } }

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE
  const page = intentPageContent[locale][slug]

  return {
    metadataBase: new URL(SITE_URL),
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: `/${locale}/${slug}`,
      languages: {
        es: `/es/${slug}`,
        en: `/en/${slug}`,
        de: `/de/${slug}`,
      },
    },
    openGraph: {
      type: 'article',
      title: page.title,
      description: page.description,
      url: `/${locale}/${slug}`,
    },
  }
}

export default function HowToUnderstandBusinessPage({ params }: Props) {
  if (!isLocale(params.locale)) notFound()
  const locale = params.locale
  const page = intentPageContent[locale][slug]
  return <IntentPageTemplate locale={locale} slug={slug} page={page} related={[...related]} />
}
