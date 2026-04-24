import { redirect } from 'next/navigation'
import { DEFAULT_LOCALE } from '@/lib/i18n/shared'

export default function ComoFuncionaRedirectPage() {
  redirect(`/${DEFAULT_LOCALE}/como-funciona`)
}
