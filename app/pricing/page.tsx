import { redirect } from 'next/navigation'
import { DEFAULT_LOCALE } from '@/lib/i18n/shared'

export default function PricingRedirectPage() {
  redirect(`/${DEFAULT_LOCALE}/servicios`)
}
