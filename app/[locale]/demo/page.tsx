import type { Metadata } from 'next'
import DemoPage from '@/app/demo/page'
import { DEFAULT_LOCALE, SEO_BY_LOCALE, isLocale } from '@/lib/i18n/shared'

type Props = { params: { locale: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE
  const titleMap = {
    es: 'Reservar demo',
    en: 'Book a demo',
    de: 'Demo buchen',
  } as const
  return {
    title: titleMap[locale],
    description: SEO_BY_LOCALE[locale].description,
    alternates: {
      canonical: `/${locale}/demo`,
      languages: { es: '/es/demo', en: '/en/demo', de: '/de/demo' },
    },
  }
}

export default DemoPage
