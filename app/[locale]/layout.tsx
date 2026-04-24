import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { LanguageProvider } from '@/lib/i18n/config'
import {
  DEFAULT_LOCALE,
  LOCALES,
  SEO_BY_LOCALE,
  SITE_URL,
  isLocale,
  type Locale,
} from '@/lib/i18n/shared'

type LocaleLayoutProps = {
  children: React.ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE
  const seo = SEO_BY_LOCALE[locale]
  const canonicalPath = `/${locale}`

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: '%s | Summer87',
      default: seo.title,
    },
    description: seo.description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        es: '/es',
        en: '/en',
        de: '/de',
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'Summer87',
      locale: locale === 'es' ? 'es_ES' : locale === 'en' ? 'en_US' : 'de_DE',
      title: seo.title,
      description: seo.description,
      url: canonicalPath,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    },
    robots: { index: true, follow: true },
  }
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  if (!isLocale(params.locale)) notFound()
  const locale = params.locale as Locale

  return (
    <LanguageProvider initialLocale={locale}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </LanguageProvider>
  )
}
