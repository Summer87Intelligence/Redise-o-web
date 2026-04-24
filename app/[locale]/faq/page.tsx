import type { Metadata } from 'next'
import FAQ from '@/components/home/FAQ'
import FinalCTA from '@/components/home/FinalCTA'
import { DEFAULT_LOCALE, SEO_BY_LOCALE, isLocale } from '@/lib/i18n/shared'

type Props = { params: { locale: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE
  const titleMap = {
    es: 'Preguntas frecuentes',
    en: 'Frequently asked questions',
    de: 'Häufige Fragen',
  } as const
  return {
    title: titleMap[locale],
    description: SEO_BY_LOCALE[locale].description,
    alternates: {
      canonical: `/${locale}/faq`,
      languages: { es: '/es/faq', en: '/en/faq', de: '/de/faq' },
    },
  }
}

export default function FAQPage() {
  return (
    <div className="pt-16">
      <FAQ />
      <FinalCTA />
    </div>
  )
}
