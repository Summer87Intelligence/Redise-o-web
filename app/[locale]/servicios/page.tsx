import type { Metadata } from 'next'
import ServicesPageContent from '@/components/servicios/ServicesPageContent'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n/shared'

type Props = { params: { locale: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE
  const titleMap = {
    es: 'Servicios de inteligencia de negocio, IA aplicada y automatización | Summer87',
    en: 'Business intelligence, applied AI and automation services | Summer87',
    de: 'Business Intelligence, angewandte KI und Automatisierungsleistungen | Summer87',
  } as const
  const descriptionMap = {
    es: 'Neuroventas, motores inteligentes y Business Intelligence. Qué resuelve cada servicio, entregables y cómo agendar una reunión.',
    en: 'Neurosales, intelligent business engines, and Business Intelligence. What each service delivers and how to schedule a meeting.',
    de: 'Neurovertrieb, Business-Engines und Business Intelligence. Was geliefert wird und wie du ein Gespräch vereinbarst.',
  } as const
  return {
    title: titleMap[locale],
    description: descriptionMap[locale],
    alternates: {
      canonical: `/${locale}/servicios`,
      languages: { es: '/es/servicios', en: '/en/servicios', de: '/de/servicios' },
    },
  }
}

export default function ServicesPage() {
  return (
    <div className="pt-16">
      <ServicesPageContent />
    </div>
  )
}
