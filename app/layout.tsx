import type { Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cookies } from 'next/headers'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n/shared'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#0D1117',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localeCookie = cookies().get('locale')?.value
  const htmlLang = localeCookie && isLocale(localeCookie) ? localeCookie : DEFAULT_LOCALE

  return (
    <html lang={htmlLang} className={inter.variable}>
      <body className="bg-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
