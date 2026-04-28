import { redirect } from 'next/navigation'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n/shared'

type Props = { params: { locale: string } }

export default function PricingPage({ params }: Props) {
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE
  redirect(`/${locale}/servicios`)
}
