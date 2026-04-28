'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useMemo, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from '@/lib/i18n/config'
import { isLocale, type Locale } from '@/lib/i18n/shared'
import { trackEvent } from '@/lib/analytics'

/** Home section order (top → bottom) for scroll spy */
const SECTION_IDS = [
  'inicio',
  'problema',
  'servicios',
  'como-funciona',
  'origen',
  'casos-de-uso',
  'faq',
] as const

const LANGUAGE_OPTIONS: Record<Locale, { code: string; label: string }> = {
  es: { code: 'ES', label: 'Español' },
  en: { code: 'EN', label: 'English' },
  de: { code: 'DE', label: 'Deutsch' },
}

function LanguageDropdown({
  locale,
  onSelect,
  className = '',
}: {
  locale: Locale
  onSelect: (targetLocale: Locale) => void
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(event.target as Node)) setOpen(false)
    }
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <div ref={rootRef} className={`relative inline-block ${className}`.trim()}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="w-full rounded-lg border border-[#30363D] bg-[#161B22] px-3 py-2 text-sm text-white/80 transition-colors hover:text-white hover:border-[#2F81F7]/40"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language selector"
      >
        {`${LANGUAGE_OPTIONS[locale].code} | ${LANGUAGE_OPTIONS[locale].label}`}
      </button>
      {open && (
        <div
          role="listbox"
          aria-label="Language options"
          className="absolute right-0 mt-2 min-w-[150px] overflow-hidden rounded-lg border border-[#30363D] bg-[#161B22] shadow-xl z-50"
        >
          {(Object.keys(LANGUAGE_OPTIONS) as Locale[]).map((item) => (
            <button
              key={item}
              type="button"
              role="option"
              aria-selected={locale === item}
              onClick={() => {
                onSelect(item)
                setOpen(false)
              }}
              className={`block w-full cursor-pointer px-3 py-2 text-left text-sm transition-colors ${
                locale === item
                  ? 'bg-[#2F81F7]/15 text-[#58A6FF]'
                  : 'text-white/75 hover:bg-[#21262D] hover:text-white'
              }`}
            >
              {`${LANGUAGE_OPTIONS[item].code} | ${LANGUAGE_OPTIONS[item].label}`}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const { t, locale } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  const isHome = useMemo(
    () => Boolean(pathname && (pathname === `/${locale}` || pathname === `/${locale}/`)),
    [pathname, locale]
  )

  const navLinks = useMemo(
    () => [
      { id: 'inicio' as const, label: t.navbar.home, href: `/${locale}#inicio` },
      { id: 'problema' as const, label: t.navbar.links.problem, href: `/${locale}#problema` },
      { id: 'servicios' as const, label: t.navbar.links.services, href: `/${locale}#servicios` },
      { id: 'como-funciona' as const, label: t.navbar.links.howItWorks, href: `/${locale}#como-funciona` },
      { id: 'origen' as const, label: t.navbar.links.origin, href: `/${locale}#origen` },
      { id: 'casos-de-uso' as const, label: t.navbar.links.useCases, href: `/${locale}#casos-de-uso` },
      { id: 'faq' as const, label: t.navbar.links.faq, href: `/${locale}#faq` },
    ],
    [t, locale]
  )

  const switchLocale = (targetLocale: Locale) => {
    if (targetLocale === locale) return
    trackEvent('change_language', { from: locale, to: targetLocale })
    if (!pathname) return
    const segments = pathname.split('/').filter(Boolean)
    if (segments.length === 0) {
      router.replace(`/${targetLocale}`)
      return
    }
    if (isLocale(segments[0])) {
      segments[0] = targetLocale
      router.replace(`/${segments.join('/')}`)
      return
    }
    router.replace(`/${targetLocale}/${segments.join('/')}`)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isHome) {
      setActiveSection('')
      return
    }

    const offset = 120
    const activationLine = offset + 80

    const updateActive = () => {
      const sections = (
        SECTION_IDS.map((id) => {
          const el = document.getElementById(id)
          if (!el) return null
          return { id, top: el.getBoundingClientRect().top }
        }).filter(Boolean) as Array<{ id: (typeof SECTION_IDS)[number]; top: number }>
      ).sort((a, b) => a.top - b.top)

      if (sections.length === 0) {
        setActiveSection('inicio')
        return
      }

      const active = sections
        .filter((section) => section.top <= activationLine)
        .at(-1)?.id ?? 'inicio'

      setActiveSection(active)
    }

    updateActive()
    requestAnimationFrame(updateActive)
    const hydrationTimer = window.setTimeout(updateActive, 0)
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive, { passive: true })
    return () => {
      window.clearTimeout(hydrationTimer)
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [isHome, pathname, locale])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0D1117]/80 backdrop-blur border-b border-white/10'
          : 'bg-[#0D1117]/55 backdrop-blur border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-200 ${scrolled ? 'h-14' : 'h-16'}`}>
          {/* Logo */}
          <Link href={`/${locale}#inicio`} className="flex items-center gap-3 group" aria-label={t.navbar.aria.home}>
            <div className="p-1 rounded-lg bg-white/[0.03] border border-white/10">
              <Image
                src="/summer87-logo.png"
                alt="Summer87"
                width={34}
                height={34}
                priority
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-md object-cover"
              />
            </div>
            <span className="font-semibold text-white text-lg tracking-tight">Summer87</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label={t.navbar.aria.nav}>
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => {
                  if (link.id === 'servicios') trackEvent('view_servicios', { from: 'navbar' })
                }}
                className={`px-3.5 py-2 text-sm rounded-md transition-all duration-200 border ${
                  activeSection === link.id
                    ? 'text-[#2F81F7] bg-[#2F81F7]/12 border-[#2F81F7]/25'
                    : 'text-white/70 hover:text-white border-transparent hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <LanguageDropdown locale={locale} onSelect={switchLocale} className="hidden md:block" />
            <Link
              href={`/${locale}/demo`}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#2F81F7] hover:bg-[#388BFD] rounded-lg transition-colors duration-150 shadow-glow-sm hover:shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F81F7]"
            >
              {t.navbar.cta}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-[#8B949E] hover:text-[#F0F6FC] hover:bg-[#161B22] transition-colors"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? t.navbar.aria.close : t.navbar.aria.open}
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M6 6l8 8M14 6l-8 8" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0D1117]/95 backdrop-blur-md border-b border-[#30363D]">
          <nav className="px-4 py-4 space-y-1" aria-label={t.navbar.aria.mobileMenu}>
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => {
                  if (link.id === 'servicios') trackEvent('view_servicios', { from: 'navbar' })
                  setMobileOpen(false)
                }}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                  activeSection === link.id
                    ? 'text-[#2F81F7] bg-[#2F81F7]/10 border-[#2F81F7]/20'
                    : 'text-[#8B949E] hover:text-[#F0F6FC] hover:bg-[#161B22] border-transparent'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/demo`}
              onClick={() => setMobileOpen(false)}
              className="block mt-2 px-3 py-3 text-center text-sm font-semibold text-white bg-[#2F81F7] hover:bg-[#388BFD] rounded-lg transition-colors"
            >
              {t.navbar.cta}
            </Link>
            <div className="pt-2">
              <LanguageDropdown
                locale={locale}
                onSelect={(targetLocale) => {
                  switchLocale(targetLocale)
                  setMobileOpen(false)
                }}
                className="w-full"
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
