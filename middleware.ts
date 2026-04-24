import { NextResponse, type NextRequest } from 'next/server'
import { DEFAULT_LOCALE, LOCALES, STORAGE_KEY, isLocale } from '@/lib/i18n/shared'

function resolveLocale(request: NextRequest) {
  const cookieLocale = request.cookies.get(STORAGE_KEY)?.value
  if (cookieLocale && isLocale(cookieLocale)) return cookieLocale

  const acceptLanguage = request.headers.get('accept-language') ?? ''
  const preferred = acceptLanguage
    .split(',')
    .map((part) => part.trim().split(';')[0]?.slice(0, 2))
    .find((code): code is string => Boolean(code && isLocale(code)))

  return (preferred as (typeof LOCALES)[number] | undefined) ?? DEFAULT_LOCALE
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next()
  }

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )

  if (!pathnameHasLocale) {
    const locale = resolveLocale(request)
    const target = request.nextUrl.clone()
    target.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`

    const response = NextResponse.redirect(target)
    response.cookies.set(STORAGE_KEY, locale, { path: '/', maxAge: 60 * 60 * 24 * 365 })
    return response
  }

  const localeFromPath = pathname.split('/').filter(Boolean)[0]
  if (isLocale(localeFromPath)) {
    const response = NextResponse.next()
    response.cookies.set(STORAGE_KEY, localeFromPath, { path: '/', maxAge: 60 * 60 * 24 * 365 })
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
