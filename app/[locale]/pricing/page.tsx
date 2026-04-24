import type { Metadata } from 'next'
import PricingSection from '@/components/home/PricingSection'
import FinalCTA from '@/components/home/FinalCTA'
import { DEFAULT_LOCALE, SEO_BY_LOCALE, isLocale } from '@/lib/i18n/shared'

type Props = { params: { locale: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE
  const titleMap = {
    es: 'Pricing',
    en: 'Pricing',
    de: 'Preise',
  } as const
  return {
    title: titleMap[locale],
    description: SEO_BY_LOCALE[locale].description,
    alternates: {
      canonical: `/${locale}/pricing`,
      languages: { es: '/es/pricing', en: '/en/pricing', de: '/de/pricing' },
    },
  }
}

export default function PricingPage() {
  return (
    <div className="pt-16">
      <div className="bg-[#0D1117] py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-black text-[#F0F6FC] mb-4">
          Precios claros.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F81F7] to-[#60A5FA]">
            Sin sorpresas.
          </span>
        </h1>
        <p className="text-lg text-[#8B949E] max-w-xl mx-auto">
          Empezá con 14 días gratis. Escalá cuando tu negocio lo pida.
        </p>
      </div>
      <PricingSection />
      <FinalCTA />
    </div>
  )
}
